/* global URL */
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUpiPaymentUri } from '../src/lib/upiPaymentUri.js';

test('buildUpiPaymentUri - normal cases', () => {
    const res = buildUpiPaymentUri({ payeeAddress: 'name@bank', payeeName: 'Dax Patel', amount: '1180.00' });
    assert.ok(res.valid);
    const url = new URL(res.uri);
    assert.equal(url.protocol, 'upi:');
    assert.equal(url.hostname, 'pay'); // url parsing parses it as upi://pay
    assert.equal(url.searchParams.get('pa'), 'name@bank');
    assert.equal(url.searchParams.get('pn'), 'Dax Patel');
    assert.equal(url.searchParams.get('am'), '1180.00');
    assert.equal(url.searchParams.get('cu'), 'INR');
});

test('buildUpiPaymentUri - business name special characters', () => {
    const cases = [
        'Dax & Co',
        'Dax + Patel',
        'Test#fragment',
        'ગુજરાતી / हिन्दी',
    ];
    for (const pn of cases) {
        const res = buildUpiPaymentUri({ payeeAddress: 'test@ybl', payeeName: pn, amount: '100.00' });
        assert.ok(res.valid);
        const url = new URL(res.uri);
        assert.equal(url.searchParams.get('pn'), pn);
    }
});

test('buildUpiPaymentUri - VPA validation', () => {
    // missing @
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'namebank', payeeName: 'Test', amount: '100.00' }).valid);
    // multiple @
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'name@bank@sbi', payeeName: 'Test', amount: '100.00' }).valid);
    // whitespace inside VPA
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'name @bank', payeeName: 'Test', amount: '100.00' }).valid);
    // empty VPA
    assert.ok(!buildUpiPaymentUri({ payeeAddress: '', payeeName: 'Test', amount: '100.00' }).valid);

    // surrounding whitespace is trimmed
    const res = buildUpiPaymentUri({ payeeAddress: '  name@bank  ', payeeName: 'Test', amount: '100.00' });
    assert.ok(res.valid);
    assert.equal(new URL(res.uri).searchParams.get('pa'), 'name@bank');
});

test('buildUpiPaymentUri - Amount validation', () => {
    // missing/malformed
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '' }).valid);
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '100' }).valid);
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '100.0' }).valid);
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '100.000' }).valid);
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: 'NaN' }).valid);
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: 'Infinity' }).valid);
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '1e3' }).valid);

    // zero amount
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '0.00' }).valid);

    // negative amount
    assert.ok(!buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '-100.00' }).valid);

    // exact values
    const exact1 = buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '1180.00' });
    assert.ok(exact1.valid);
    assert.equal(new URL(exact1.uri).searchParams.get('am'), '1180.00');

    const exact2 = buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '296.47' });
    assert.ok(exact2.valid);
    assert.equal(new URL(exact2.uri).searchParams.get('am'), '296.47');

    const exact3 = buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Test', amount: '999999999999.99' }); // maximum supported exact
    assert.ok(exact3.valid);
    assert.equal(new URL(exact3.uri).searchParams.get('am'), '999999999999.99');
});

test('buildUpiPaymentUri - Security Checks', () => {
    // Injection via seller name
    const res1 = buildUpiPaymentUri({ payeeAddress: 'a@b', payeeName: 'Dax & am=1.00', amount: '100.00' });
    const url1 = new URL(res1.uri);
    assert.equal(url1.searchParams.get('pn'), 'Dax & am=1.00');
    assert.equal(url1.searchParams.get('am'), '100.00');

    // Injection via VPA with ? or & or line breaks or control chars
    const invalidVpas = [
        'name?@bank',
        'name&@bank',
        'name\n@bank',
        'name\x0B@bank'
    ];
    for (const vpa of invalidVpas) {
        assert.ok(!buildUpiPaymentUri({ payeeAddress: vpa, payeeName: 'Test', amount: '100.00' }).valid);
    }
});
