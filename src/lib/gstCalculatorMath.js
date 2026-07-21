// src/lib/gstCalculatorMath.js

export function calculateGST({ inputStr, rateStr, cessRateStr, isInclusive, isInterState, isWholeRupee }) {
  // Reject invalid or negative inputs
  const inputNum = parseFloat(inputStr);
  const rateNum = parseFloat(rateStr);
  const cessNum = parseFloat(cessRateStr || '0');

  if (isNaN(inputNum) || inputNum < 0 || isNaN(rateNum) || rateNum < 0 || isNaN(cessNum) || cessNum < 0) {
    return null;
  }
  
  if (inputNum === 0) {
    return {
      taxable: "0.00",
      cgst: "0.00",
      sgst: "0.00",
      igst: "0.00",
      cess: "0.00",
      totalGst: "0.00",
      adjustment: "0.00",
      final: "0.00",
      hasAdjustment: false
    };
  }

  // Convert to basis points and integer scale
  const scale = isWholeRupee ? 1 : 100;
  const toInt = (val) => Math.round(val * scale);
  
  // Rate as a decimal factor
  const rateFactor = rateNum / 100;
  const cessFactor = cessNum / 100;

  const inputInt = toInt(inputNum);
  let taxableInt;
  if (isInclusive) {
    // Math.round logic on floating point result, but based strictly on scaled integer input representation
    taxableInt = toInt(inputNum / (1 + rateFactor + cessFactor));
  } else {
    taxableInt = inputInt;
  }

  let cgstInt = 0;
  let sgstInt = 0;
  let igstInt = 0;
  
  const cessInt = Math.round(taxableInt * cessFactor);

  if (isInterState) {
    igstInt = Math.round(taxableInt * rateFactor);
  } else {
    cgstInt = Math.round(taxableInt * (rateFactor / 2));
    sgstInt = cgstInt; // Invariant constraint
  }

  const totalGstInt = igstInt + cgstInt + sgstInt;
  
  let finalTotalInt = taxableInt + totalGstInt + cessInt;
  let adjustmentInt = 0;

  if (isInclusive) {
    adjustmentInt = inputInt - finalTotalInt;
    finalTotalInt += adjustmentInt;
  }

  const fmt = (valInt) => {
    // Prevent negative zero (-0.00)
    const normalized = valInt === 0 ? 0 : valInt;
    return (normalized / scale).toFixed(isWholeRupee ? 0 : 2);
  };

  return {
    taxable: fmt(taxableInt),
    cgst: fmt(cgstInt),
    sgst: fmt(sgstInt),
    igst: fmt(igstInt),
    cess: fmt(cessInt),
    totalGst: fmt(totalGstInt),
    adjustment: fmt(adjustmentInt),
    final: fmt(finalTotalInt),
    hasAdjustment: adjustmentInt !== 0
  };
}
