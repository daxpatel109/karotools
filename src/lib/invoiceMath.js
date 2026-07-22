// src/lib/invoiceMath.js

// Precision semantics:
// Quantity: 3 decimal places (scale 1,000)
// Monetary fields (Rate, Totals): 2 decimal places (scale 100)
// Percentages (Discount, GST): 3 decimal places (scale 1,000)

const SCALE_QTY = 1000n;
const SCALE_PCT = 1000n;

export function parseDecimal(str, decimals) {
    if (str === null || str === undefined) str = '';
    if (typeof str !== 'string') str = String(str);
    str = str.trim();
    if (str === '') return { error: 'Empty value' };

    // Check for invalid formats (NaN, Infinity, scientific notation)
    if (!/^-?\d+(\.\d+)?$/.test(str)) {
        return { error: 'Invalid format' };
    }

    let [intPart, fracPart = ''] = str.split('.');

    if (fracPart.length > decimals) {
        return { error: `Exceeds maximum ${decimals} decimal places` };
    }

    fracPart = fracPart.padEnd(decimals, '0');
    const isNegative = intPart.startsWith('-');
    if (isNegative) intPart = intPart.slice(1);

    let combined = intPart + fracPart;
    combined = combined.replace(/^0+/, '') || '0';

    let val = BigInt(combined);
    if (isNegative) val = -val;

    return { value: val };
}

export function formatDecimal(bigIntVal, decimals) {
    let isNeg = bigIntVal < 0n;
    if (isNeg) bigIntVal = -bigIntVal;

    let str = bigIntVal.toString();
    const padLen = decimals + 1;
    if (str.length < padLen) {
        str = str.padStart(padLen, '0');
    }
    const intPart = str.slice(0, str.length - decimals);
    const fracPart = str.slice(str.length - decimals);

    let res = intPart + '.' + fracPart;
    if (isNeg) res = '-' + res;
    return res;
}

export function roundHalfUp(value, divisor) {
    const half = divisor / 2n;
    const remainder = value % divisor;

    if (value >= 0n) {
        if (remainder >= half) return (value / divisor) + 1n;
        return value / divisor;
    } else {
        if (-remainder >= half) return (value / divisor) - 1n;
        return value / divisor;
    }
}

export function fmtINRString(valStr) {
    if (valStr === null || valStr === undefined || valStr === "") return "0.00";
    let str = String(valStr).trim();
    if (str === "" || str === "NaN" || str === "Infinity" || str === "-Infinity") return "0.00";

    let isNeg = false;
    if (str.startsWith('-')) {
        isNeg = true;
        str = str.substring(1);
    }

    if (!str.includes('.')) {
        str += ".00";
    } else {
        const parts = str.split('.');
        if (parts[1].length === 0) str += "00";
        else if (parts[1].length === 1) str += "0";
        else if (parts[1].length > 2) str = parts[0] + "." + parts[1].substring(0, 2);
    }

    let [intPart, decPart] = str.split('.');

    let lastThree = intPart.substring(intPart.length - 3);
    let otherDigits = intPart.substring(0, intPart.length - 3);
    if (otherDigits !== '') {
        lastThree = ',' + lastThree;
    }
    let res = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    if (res === "") res = "0";
    if (isNeg && res === "0" && decPart === "00") isNeg = false;

    return (isNeg ? "-" : "") + res + "." + decPart;
}

export function calcLineItem(qtyStr, rateStr, discountPctStr, gstRateStr, isInterState, descStr = "", hsnStr = "") {
    const safeStr = (s) => (s === null || s === undefined) ? '' : String(s).trim();
    const qRaw = safeStr(qtyStr);
    const rRaw = safeStr(rateStr);
    const dRaw = safeStr(discountPctStr);
    const gRaw = safeStr(gstRateStr);
    const desc = safeStr(descStr);
    const hsn = safeStr(hsnStr);

    const isBlank = (desc === '' && hsn === '' && (qRaw === '1' || qRaw === '') && rRaw === '' && (dRaw === '0' || dRaw === '') && (gRaw === '18' || gRaw === ''));

    if (isBlank) {
        return {
            valid: true,
            isBlank: true,
            grossBaseStr: "0.00",
            discountAmtStr: "0.00",
            taxableBaseStr: "0.00",
            cgstStr: "0.00",
            sgstStr: "0.00",
            igstStr: "0.00",
            totalGstStr: "0.00",
            finalTotalStr: "0.00"
        };
    }

    const q = parseDecimal(qRaw === '' ? '0' : qRaw, 3);
    const r = parseDecimal(rRaw === '' ? '0' : rRaw, 2);
    const d = parseDecimal(dRaw === '' ? '0' : dRaw, 3);
    const g = parseDecimal(gRaw === '' ? '0' : gRaw, 3);

    if (q.error) return { valid: false, error: `Quantity: ${q.error}`, isBlank: false };
    if (r.error) return { valid: false, error: `Rate: ${r.error}`, isBlank: false };
    if (d.error) return { valid: false, error: `Discount: ${d.error}`, isBlank: false };
    if (g.error) return { valid: false, error: `GST Rate: ${g.error}`, isBlank: false };

    const qty = q.value;
    const rate = r.value;
    const discPct = d.value;
    const gstPct = g.value;

    if (qty <= 0n) return { valid: false, error: 'Quantity must be greater than zero', isBlank: false };
    if (rate < 0n) return { valid: false, error: 'Rate cannot be negative', isBlank: false };
    if (discPct < 0n || discPct > (100n * SCALE_PCT)) return { valid: false, error: 'Discount must be between 0 and 100', isBlank: false };
    if (gstPct < 0n) return { valid: false, error: 'GST Rate cannot be negative', isBlank: false };

    if (rate === 0n && desc === '') return { valid: false, error: 'Description is required for zero-price items', isBlank: false };

    // Size limits to prevent BigInt memory attacks or layout breakage
    if (qty > 9999999000n) return { valid: false, error: 'Quantity too large', isBlank: false };
    if (rate > 99999999900n) return { valid: false, error: 'Rate too large', isBlank: false };

    // Gross = qty * rate (scaled down by qty scale)
    const grossBase = roundHalfUp(qty * rate, SCALE_QTY);

    // Discount = (gross * discPct) / 100
    const discAmt = roundHalfUp(grossBase * discPct, 100n * SCALE_PCT);

    const taxableBase = grossBase - discAmt;

    let cgst = 0n;
    let sgst = 0n;
    let igst = 0n;
    let totalGst;

    if (isInterState) {
        igst = roundHalfUp(taxableBase * gstPct, 100n * SCALE_PCT);
        totalGst = igst;
    } else {
        cgst = roundHalfUp(taxableBase * gstPct, 200n * SCALE_PCT);
        sgst = cgst; // Must be identically matched
        totalGst = cgst + sgst;
    }

    const finalTotal = taxableBase + totalGst;

    return {
        valid: true,
        grossBaseStr: formatDecimal(grossBase, 2),
        discountAmtStr: formatDecimal(discAmt, 2),
        taxableBaseStr: formatDecimal(taxableBase, 2),
        cgstStr: formatDecimal(cgst, 2),
        sgstStr: formatDecimal(sgst, 2),
        igstStr: formatDecimal(igst, 2),
        totalGstStr: formatDecimal(totalGst, 2),
        finalTotalStr: formatDecimal(finalTotal, 2)
    };
}

export function calcInvoiceTotals(lines) {
    let sumGross = 0n;
    let sumDiscount = 0n;
    let sumBase = 0n;
    let sumCgst = 0n;
    let sumSgst = 0n;
    let sumIgst = 0n;

    let hasInvalid = false;

    for (const line of lines) {
        if (!line.valid) {
            hasInvalid = true;
            continue;
        }
        sumGross += parseDecimal(line.grossBaseStr, 2).value;
        sumDiscount += parseDecimal(line.discountAmtStr, 2).value;
        sumBase += parseDecimal(line.taxableBaseStr, 2).value;
        sumCgst += parseDecimal(line.cgstStr, 2).value;
        sumSgst += parseDecimal(line.sgstStr, 2).value;
        sumIgst += parseDecimal(line.igstStr, 2).value;
    }

    const totalGst = sumCgst + sumSgst + sumIgst;
    const finalTotal = sumBase + totalGst;

    return {
        hasInvalid,
        grossStr: formatDecimal(sumGross, 2),
        discountStr: formatDecimal(sumDiscount, 2),
        baseStr: formatDecimal(sumBase, 2),
        cgstStr: formatDecimal(sumCgst, 2),
        sgstStr: formatDecimal(sumSgst, 2),
        igstStr: formatDecimal(sumIgst, 2),
        totalGstStr: formatDecimal(totalGst, 2),
        finalTotalStr: formatDecimal(finalTotal, 2)
    };
}
