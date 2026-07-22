import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePdfSlices } from '../src/lib/pdfPagination.js';

const baseConfig = {
    canvasWidthPx: 800,
    pdfPageWidthMm: 210,
    pdfPageHeightMm: 297,
    marginTopMm: 10,
    marginBottomMm: 10,
    marginLeftMm: 10,
    marginRightMm: 10
};

test('pdfPagination - ordinary hard slicing (no boundaries)', () => {
    const config = { ...baseConfig, canvasHeightPx: 2500 };
    const slices = calculatePdfSlices(config);

    assert.ok(slices.length > 1);
    assert.equal(slices[0].sourceY, 0);
    assert.equal(slices[0].sourceHeight + slices[1].sourceHeight + (slices[2] ? slices[2].sourceHeight : 0), 2500);
});

test('pdfPagination - row-boundary selection before page boundary', () => {
    // Page capacity is ~1166 pixels.
    // Let's create a boundary at 1000.
    const config = {
        ...baseConfig,
        canvasHeightPx: 1500,
        boundaries: [
            { type: 'item-row', top: 900, bottom: 1000 },
            { type: 'item-row', top: 1000, bottom: 1200 } // crosses 1166
        ]
    };

    const slices = calculatePdfSlices(config);
    assert.equal(slices.length, 2);
    // Should break at 1000 before the crossing element
    assert.equal(slices[0].sourceHeight, 1000);
    assert.equal(slices[1].sourceY, 1000);
    assert.equal(slices[1].sourceHeight, 220); // maxMeaningful is 1200 + 20 = 1220
    assert.equal(slices[0].sourceHeight + slices[1].sourceHeight, 1220);
});

test('pdfPagination - safe breakpoint exactly at page boundary', () => {
    // 800 / 190 = 4.2105
    // height = 277 * 4.2105 = 1166
    const config = {
        ...baseConfig,
        canvasHeightPx: 1500,
        boundaries: [
            { type: 'item-row', top: 0, bottom: 1166 },
            { type: 'item-row', top: 1166, bottom: 1300 }
        ]
    };

    const slices = calculatePdfSlices(config);
    assert.equal(slices[0].sourceHeight, 1166);
    assert.equal(slices[1].sourceY, 1166);
});

test('pdfPagination - multiple row boundaries', () => {
    const config = {
        ...baseConfig,
        canvasHeightPx: 2000,
        boundaries: [
            { type: 'item-row', top: 0, bottom: 500 },
            { type: 'item-row', top: 500, bottom: 1000 },
            { type: 'item-row', top: 1000, bottom: 1500 } // crosses 1166
        ]
    };

    const slices = calculatePdfSlices(config);
    assert.equal(slices[0].sourceHeight, 1000);
});

test('pdfPagination - footer group moved to the next page', () => {
    const config = {
        ...baseConfig,
        canvasHeightPx: 2000,
        boundaries: [
            { type: 'item-row', top: 0, bottom: 900 },
            { type: 'totals-bank', top: 900, bottom: 1100 },
            { type: 'terms-qr', top: 1100, bottom: 1300 } // crosses 1166
        ]
    };

    // Group from 900 to 1300 doesn't cross the max height of slice (1166).
    // Wait, the group starts at 900 and ends at 1300. (400px tall). Fits in one page.
    // It crosses 1166, so it should be moved entirely to the next page. Break at 900.
    const slices = calculatePdfSlices(config);
    assert.equal(slices[0].sourceHeight, 900);
    assert.equal(slices[1].sourceY, 900);
});

test('pdfPagination - block taller than one complete page', () => {
    const config = {
        ...baseConfig,
        canvasHeightPx: 3000,
        boundaries: [
            { type: 'item-row', top: 0, bottom: 1500 } // Taller than 1166
        ]
    };

    const slices = calculatePdfSlices(config);
    // Hard slice because we can't keep it together
    assert.equal(slices[0].sourceHeight, 1166);
});

test('pdfPagination - trailing white-space exclusion', () => {
    const config = {
        ...baseConfig,
        canvasHeightPx: 2000,
        boundaries: [
            { type: 'item-row', top: 0, bottom: 500 }
        ]
    };
    // meaningful content ends at 500 + 20 = 520
    const slices = calculatePdfSlices(config);
    assert.equal(slices.length, 1);
    assert.equal(slices[0].sourceHeight, 520);
});

test('pdfPagination - tiny final remainder', () => {
    const config = {
        ...baseConfig,
        canvasHeightPx: 1166 + 3,
        boundaries: [
            { type: 'item-row', top: 0, bottom: 1166 + 3 }
        ]
    };
    // meaning content ends at 1169 + 20 = 1189, bounded by canvasHeightPx (1169)
    // page 1 is 1166, remaining is 3
    // 3 <= EMPTY_TOLERANCE (5), so it is excluded!
    const slices = calculatePdfSlices(config);
    assert.equal(slices.length, 1);
    assert.equal(slices[0].sourceHeight, 1166);
});

test('pdfPagination - prevention of infinite loops', () => {
    // If slice height is <= 0 it should return empty array
    const config = {
        ...baseConfig,
        pdfPageHeightMm: 20 // 20 - 20 margin = 0
    };
    const slices = calculatePdfSlices(config);
    assert.equal(slices.length, 0);
});
