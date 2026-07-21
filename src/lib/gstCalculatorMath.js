// src/lib/gstCalculatorMath.js

export function parseMoney(str) {
  if (typeof str !== 'string') return null;
  if (!/^\d+(\.\d{1,2})?$/.test(str)) return null;
  const parts = str.split('.');
  return BigInt(parts[0] + (parts[1] || '').padEnd(2, '0'));
}

export function parseRate(str) {
  if (typeof str !== 'string') return null;
  if (!/^\d+(\.\d{1,2})?$/.test(str)) return null;
  const parts = str.split('.');
  return BigInt(parts[0] + (parts[1] || '').padEnd(2, '0'));
}

export function roundDivision(num, den) {
  if (den <= 0n) throw new Error("Denominator must be > 0");
  const q = num / den;
  const r = num % den;
  // Tie-breaking: round half up for non-negative numbers
  if (r * 2n >= den) {
    return q + 1n;
  }
  return q;
}

export function calculateGST({ inputStr, rateStr, cessRateStr, isInclusive, isInterState, isWholeRupee }) {
  const enteredPaise = parseMoney(inputStr);
  const gstRateBps = parseRate(rateStr);
  const cessRateBps = parseRate(cessRateStr || "0");

  if (enteredPaise === null || gstRateBps === null || cessRateBps === null) {
    return null;
  }

  const RATE_DENOMINATOR = 10000n;

  let enteredUnit = enteredPaise;
  if (isWholeRupee) {
    enteredUnit = roundDivision(enteredPaise, 100n);
  }

  let taxableUnit;
  if (isInclusive) {
    taxableUnit = roundDivision(enteredUnit * RATE_DENOMINATOR, RATE_DENOMINATOR + gstRateBps + cessRateBps);
  } else {
    taxableUnit = enteredUnit;
  }

  let cgstUnit = 0n;
  let sgstUnit = 0n;
  let igstUnit = 0n;

  if (isInterState) {
    igstUnit = roundDivision(taxableUnit * gstRateBps, RATE_DENOMINATOR);
  } else {
    cgstUnit = roundDivision(taxableUnit * gstRateBps, 20000n);
    sgstUnit = cgstUnit;
  }

  const totalGstUnit = igstUnit + cgstUnit + sgstUnit;
  const cessUnit = roundDivision(taxableUnit * cessRateBps, RATE_DENOMINATOR);
  const calculatedTotalUnit = taxableUnit + totalGstUnit + cessUnit;

  let adjustmentUnit = 0n;
  let finalTotalUnit = calculatedTotalUnit;

  if (isInclusive) {
    adjustmentUnit = enteredUnit - calculatedTotalUnit;
    finalTotalUnit = calculatedTotalUnit + adjustmentUnit;
  }

  const formatOutput = (unit) => {
    const isNeg = unit < 0n;
    const abs = isNeg ? -unit : unit;
    if (isWholeRupee) {
      const s = abs.toString();
      return (s === "0") ? "0" : (isNeg ? "-" + s : s);
    } else {
      const s = abs.toString().padStart(3, '0');
      const intPart = s.slice(0, -2) || "0";
      const decPart = s.slice(-2);
      const res = `${intPart}.${decPart}`;
      return (res === "0.00") ? "0.00" : (isNeg ? "-" + res : res);
    }
  };

  return {
    taxable: formatOutput(taxableUnit),
    cgst: formatOutput(cgstUnit),
    sgst: formatOutput(sgstUnit),
    igst: formatOutput(igstUnit),
    cess: formatOutput(cessUnit),
    totalGst: formatOutput(totalGstUnit),
    adjustment: formatOutput(adjustmentUnit),
    final: formatOutput(finalTotalUnit),
    hasAdjustment: adjustmentUnit !== 0n
  };
}
