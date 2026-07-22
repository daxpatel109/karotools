import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDecimal, formatDecimal, calcLineItem, calcInvoiceTotals, fmtINRString } from '../src/lib/invoiceMath.js';

test('parseDecimal', () => {
    assert.equal(parseDecimal('100.50', 2).value, 10050n);
    assert.equal(parseDecimal('100.500', 3).value, 100500n);
    assert.equal(parseDecimal('-100.50', 2).value, -10050n);
    assert.equal(parseDecimal('0.00', 2).value, 0n);
    assert.equal(parseDecimal('', 2).error, 'Empty value');
    assert.ok(parseDecimal('1.2.3', 2).error);
    assert.ok(parseDecimal('1E3', 2).error, 'Rejects scientific notation');
    assert.ok(parseDecimal('NaN', 2).error);
    assert.ok(parseDecimal('Infinity', 2).error);
    assert.ok(parseDecimal('100.123', 2).error, 'Excessive precision');
});

test('formatDecimal', () => {
    assert.equal(formatDecimal(10050n, 2), '100.50');
    assert.equal(formatDecimal(50n, 2), '0.50');
    assert.equal(formatDecimal(5n, 2), '0.05');
    assert.equal(formatDecimal(0n, 2), '0.00');
    assert.equal(formatDecimal(-10050n, 2), '-100.50');
});

test('fmtINRString', () => {
    assert.equal(fmtINRString('0.00'), '0.00');
    assert.equal(fmtINRString('100.26'), '100.26');
    assert.equal(fmtINRString('1180.00'), '1,180.00');
    assert.equal(fmtINRString('1234567.89'), '12,34,567.89');
    assert.equal(fmtINRString('99999999999999999.99'), '99,99,99,99,99,99,99,999.99');
    assert.equal(fmtINRString('-1234567.89'), '-12,34,567.89');
    assert.equal(fmtINRString(''), '0.00');
    assert.equal(fmtINRString('NaN'), '0.00');
    assert.equal(fmtINRString('Infinity'), '0.00');
    assert.equal(fmtINRString('-0.00'), '0.00');
});

test('calcLineItem - ₹1,000 at 18%, intra-State', () => {
    const res = calcLineItem('1', '1000', '0', '18', false, 'Item');
    assert.ok(res.valid);
    assert.equal(res.taxableBaseStr, '1000.00');
    assert.equal(res.cgstStr, '90.00');
    assert.equal(res.sgstStr, '90.00');
    assert.equal(res.totalGstStr, '180.00');
    assert.equal(res.finalTotalStr, '1180.00');
});

test('calcLineItem - ₹1,000 at 18%, inter-State', () => {
    const res = calcLineItem('1', '1000', '0', '18', true, 'Item');
    assert.ok(res.valid);
    assert.equal(res.taxableBaseStr, '1000.00');
    assert.equal(res.cgstStr, '0.00');
    assert.equal(res.sgstStr, '0.00');
    assert.equal(res.igstStr, '180.00');
    assert.equal(res.totalGstStr, '180.00');
    assert.equal(res.finalTotalStr, '1180.00');
});

test('calcLineItem - 2.5 × ₹100.50 at 18%', () => {
    const res = calcLineItem('2.5', '100.50', '0', '18', false, 'Item');
    assert.ok(res.valid);
    assert.equal(res.taxableBaseStr, '251.25');
    assert.equal(res.cgstStr, '22.61');
    assert.equal(res.sgstStr, '22.61');
    assert.equal(res.totalGstStr, '45.22');
    assert.equal(res.finalTotalStr, '296.47');
});

test('calcLineItem - ₹100 at 0.25%', () => {
    const res = calcLineItem('1', '100', '0', '0.25', false, 'Item');
    assert.ok(res.valid);
    assert.equal(res.taxableBaseStr, '100.00');
    assert.equal(res.cgstStr, '0.13');
    assert.equal(res.sgstStr, '0.13');
    assert.equal(res.totalGstStr, '0.26');
    assert.equal(res.finalTotalStr, '100.26');
});

test('calcLineItem - percentage discount and max discount', () => {
    const res = calcLineItem('2', '500', '10', '18', false, 'Item');
    assert.ok(res.valid);
    assert.equal(res.grossBaseStr, '1000.00');
    assert.equal(res.discountAmtStr, '100.00');
    assert.equal(res.taxableBaseStr, '900.00');
    assert.equal(res.totalGstStr, '162.00');
    assert.equal(res.finalTotalStr, '1062.00');

    const max = calcLineItem('1', '100', '100', '18', false, 'Item');
    assert.ok(max.valid);
    assert.equal(max.discountAmtStr, '100.00');
    assert.equal(max.taxableBaseStr, '0.00');
    assert.equal(max.finalTotalStr, '0.00');

    const overMax = calcLineItem('1', '100', '101', '18', false, 'Item');
    assert.ok(!overMax.valid);
});

test('calcLineItem - Validation edges and Blanks', () => {
    // zero quantity on nonblank row
    assert.ok(!calcLineItem('0', '100', '0', '18', false, 'Item').valid, 'Zero qty should fail');
    assert.ok(!calcLineItem('-1', '100', '0', '18', false, 'Item').valid, 'Negative qty should fail');
    assert.ok(!calcLineItem('1', '-100', '0', '18', false, 'Item').valid, 'Negative rate should fail');

    // valid zero-price item (promotional)
    const zeroPrice = calcLineItem('1', '0', '0', '18', false, 'Free Sample');
    assert.ok(zeroPrice.valid, 'Zero price should be valid with desc');
    assert.equal(zeroPrice.finalTotalStr, '0.00');

    // zero price missing description
    const zeroPriceNoDesc = calcLineItem('1', '0', '0', '18', false, '');
    assert.ok(!zeroPriceNoDesc.valid, 'Zero price must have description');

    // completely blank draft row
    const blankRow = calcLineItem('1', '', '0', '18', false, '', '');
    assert.ok(blankRow.valid);
    assert.ok(blankRow.isBlank);

    // description with zero quantity
    const descZeroQty = calcLineItem('0', '100', '0', '18', false, 'Item');
    assert.ok(!descZeroQty.valid);

    // partially completed invalid row
    const partialInvalid = calcLineItem('1', '-100', '0', '18', false, 'Item');
    assert.ok(!partialInvalid.valid);
});

test('calcInvoiceTotals - aggregation and row filtering', () => {
    const lines = [
        calcLineItem('1', '1000', '0', '5', false, 'Item 1'), // Base 1000, CGST 25, SGST 25
        calcLineItem('2', '500', '10', '12', false, 'Item 2') // Base 900, CGST 54, SGST 54
    ];

    const totals = calcInvoiceTotals(lines);
    assert.equal(totals.baseStr, '1900.00');
    assert.equal(totals.cgstStr, '79.00');
    assert.equal(totals.sgstStr, '79.00');
    assert.equal(totals.totalGstStr, '158.00');
    assert.equal(totals.finalTotalStr, '2058.00');

    // valid invoice plus one untouched extra row
    const linesWithBlank = [...lines, calcLineItem('1', '', '0', '18', false, '', '')];
    const totalsWithBlank = calcInvoiceTotals(linesWithBlank);
    assert.ok(!totalsWithBlank.hasInvalid);
    assert.equal(totalsWithBlank.finalTotalStr, '2058.00');

    // valid invoice plus one partially completed invalid row
    const linesWithInvalid = [...lines, calcLineItem('1', '-100', '0', '18', false, 'Invalid')];
    const totalsWithInvalid = calcInvoiceTotals(linesWithInvalid);
    assert.ok(totalsWithInvalid.hasInvalid);
});

test('calcLineItem - Extreme / excessive limits', () => {
    const excessivePrecision = calcLineItem('1.1234', '100', '0', '18', false, 'Item');
    assert.ok(!excessivePrecision.valid, 'Too many decimals in qty');

    const excessiveRate = calcLineItem('1', '100.123', '0', '18', false, 'Item');
    assert.ok(!excessiveRate.valid, 'Too many decimals in rate');

    const maxVals = calcLineItem('9999999', '9999999', '0', '18', false, 'Item');
    assert.ok(maxVals.valid);

    const overMaxVals = calcLineItem('10000000', '9999999', '0', '18', false, 'Item');
    assert.ok(!overMaxVals.valid);
});
