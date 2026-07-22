
export function buildUpiPaymentUri({ payeeAddress, payeeName, amount }) {
    if (!payeeAddress || typeof payeeAddress !== 'string') {
        return { valid: false, error: 'Payee address is missing or invalid' };
    }
    if (!amount || typeof amount !== 'string') {
        return { valid: false, error: 'Amount is missing or invalid' };
    }

    const pa = payeeAddress.trim();
    if (!pa.includes('@')) {
        return { valid: false, error: 'Payee address must contain exactly one @ symbol' };
    }
    if (pa.split('@').length > 2) {
        return { valid: false, error: 'Payee address must contain exactly one @ symbol' };
    }
    // eslint-disable-next-line no-control-regex
    if (/[\s\r\n\t\0\x0B\x0C?&=/#%]/.test(pa)) {
        return { valid: false, error: 'Payee address contains invalid characters' };
    }

    // Amount validation
    const am = amount.trim();
    if (!/^\d+\.\d{2}$/.test(am)) {
        return { valid: false, error: 'Amount must be a canonical two-decimal string' };
    }
    if (am === '0.00' || am.startsWith('-')) {
        return { valid: false, error: 'Amount must be positive' };
    }

    // Payee Name fallback/trim
    let pn = (payeeName && typeof payeeName === 'string') ? payeeName.trim() : "";
    if (!pn) {
        pn = "Business";
    }

    // Build URI using URLSearchParams for safe encoding
    const params = new URLSearchParams();
    params.set('pa', pa);
    params.set('pn', pn);
    params.set('am', am);
    params.set('cu', 'INR');

    return {
        valid: true,
        uri: `upi://pay?${params.toString()}`
    };
}
