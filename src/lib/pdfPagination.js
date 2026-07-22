export function calculatePdfSlices({
    canvasWidthPx,
    canvasHeightPx,
    pdfPageWidthMm,
    pdfPageHeightMm,
    marginTopMm,
    marginBottomMm,
    marginLeftMm,
    marginRightMm,
    boundaries = []
}) {
    if (
        canvasWidthPx <= 0 ||
        canvasHeightPx <= 0 ||
        pdfPageWidthMm <= 0 ||
        pdfPageHeightMm <= 0 ||
        marginTopMm < 0 ||
        marginBottomMm < 0 ||
        marginLeftMm < 0 ||
        marginRightMm < 0
    ) {
        return [];
    }

    const printableWidthMm = pdfPageWidthMm - marginLeftMm - marginRightMm;
    const printableHeightMm = pdfPageHeightMm - marginTopMm - marginBottomMm;

    if (printableWidthMm <= 0 || printableHeightMm <= 0) {
        return [];
    }

    const scalePxPerMm = canvasWidthPx / printableWidthMm;
    const sliceHeightPx = Math.floor(printableHeightMm * scalePxPerMm);

    if (sliceHeightPx <= 0) {
        return [];
    }

    // Determine the last meaningful pixel to capture
    let maxMeaningfulY = canvasHeightPx;
    if (boundaries && boundaries.length > 0) {
        // Find the maximum bottom value of any boundary
        let maxB = 0;
        for (const b of boundaries) {
            if (b.bottom > maxB) maxB = b.bottom;
        }
        // Add a small padding allowance (e.g., 20 pixels)
        maxMeaningfulY = Math.min(canvasHeightPx, Math.ceil(maxB + 20));
    }

    const slices = [];
    let currentY = 0;
    let pageNumber = 1;
    // Tolerance for antialiasing / trailing whitespace empty slices
    const EMPTY_TOLERANCE = 5;

    while (currentY < maxMeaningfulY) {
        let remainingPx = maxMeaningfulY - currentY;

        // If the remaining content is tiny and just trailing whitespace, stop
        if (remainingPx <= EMPTY_TOLERANCE && pageNumber > 1) {
            break;
        }

        let maxSourceYForThisPage = currentY + sliceHeightPx;
        let safeBreak = maxSourceYForThisPage;

        if (maxSourceYForThisPage < maxMeaningfulY && boundaries && boundaries.length > 0) {
            // We need to paginate. Find the best safe break point.
            // A safe break is the 'bottom' of any boundary that is <= maxSourceYForThisPage,
            // and > currentY.

            // However, critical blocks must be kept together.
            // If a critical block (e.g. totals, terms, signature) starts before maxSourceYForThisPage
            // but ends after it, we should break BEFORE this block (i.e. at its 'top').

            // Let's identify the elements crossing the maxSourceYForThisPage boundary.
            const crossingBlocks = boundaries.filter(b => b.top > currentY && b.top < maxSourceYForThisPage && b.bottom > maxSourceYForThisPage);
            let chosenBreak;

            if (crossingBlocks.length > 0) {
                // Find the highest crossing block
                crossingBlocks.sort((a, b) => a.top - b.top);
                const firstCross = crossingBlocks[0];

                // If this block itself is taller than the page, we can't keep it together,
                // we must hard slice it (fallback).
                if ((firstCross.bottom - firstCross.top) > sliceHeightPx) {
                    chosenBreak = maxSourceYForThisPage;
                } else {
                    // Break before this block
                    chosenBreak = Math.floor(firstCross.top);
                }
            } else {
                // No block crosses the boundary, but let's find the closest boundary bottom <= maxSourceYForThisPage
                const validBottoms = boundaries.map(b => Math.floor(b.bottom)).filter(b => b > currentY && b <= maxSourceYForThisPage);
                if (validBottoms.length > 0) {
                    chosenBreak = Math.max(...validBottoms);
                } else {
                    // Fallback to hard slice
                    chosenBreak = maxSourceYForThisPage;
                }
            }

            // Grouping logic: "footer group" (totals-bank, terms-qr, signature).
            // If any of these are separated, we might want to move them together.
            // The simplest approach is: treat them individually as indivisible.
            // Wait, "If the combined footer cannot fit in the remaining space: move the complete footer group to the next page".
            const footerTypes = ['totals-bank', 'terms-qr', 'signature'];
            const footerBlocks = boundaries.filter(b => footerTypes.includes(b.type));

            if (footerBlocks.length > 0) {
                const footerTop = Math.min(...footerBlocks.map(b => b.top));
                const footerBottom = Math.max(...footerBlocks.map(b => b.bottom));

                // If the footer group starts on this page, but doesn't fully fit
                if (footerTop > currentY && footerTop < maxSourceYForThisPage && footerBottom > maxSourceYForThisPage) {
                    // Does the whole footer group fit on a single page?
                    if ((footerBottom - footerTop) <= sliceHeightPx) {
                        // Yes, move the whole group to the next page by breaking before it
                        chosenBreak = Math.floor(footerTop);
                    }
                }
            }

            if (chosenBreak > currentY) {
                safeBreak = chosenBreak;
            }
        }

        const sourceHeight = Math.min(safeBreak - currentY, maxMeaningfulY - currentY);

        // Safety check to prevent infinite loops (0 height slice)
        if (sourceHeight <= 0) {
            break;
        }

        slices.push({
            sourceY: currentY,
            sourceHeight: sourceHeight,
            destinationX: marginLeftMm,
            destinationY: marginTopMm,
            destinationWidth: printableWidthMm,
            destinationHeight: sourceHeight / scalePxPerMm,
            pageNumber: pageNumber
        });

        currentY += sourceHeight;
        pageNumber++;
    }

    return slices;
}
