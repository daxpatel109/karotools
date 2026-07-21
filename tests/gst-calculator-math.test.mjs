import test from 'node:test';
import assert from 'node:assert';
import { calculateGST } from '../src/lib/gstCalculatorMath.js';

test('₹1,000 exclusive at 18%, intra-state', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.taxable, '1000.00');
  assert.strictEqual(result.cgst, '90.00');
  assert.strictEqual(result.sgst, '90.00');
  assert.strictEqual(result.totalGst, '180.00');
  assert.strictEqual(result.final, '1180.00');
  assert.strictEqual(result.adjustment, '0.00');
  assert.strictEqual(result.igst, '0.00');
});

test('₹1,180 inclusive at 18%, intra-state', () => {
  const result = calculateGST({ inputStr: '1180', rateStr: '18', cessRateStr: '0', isInclusive: true, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.taxable, '1000.00');
  assert.strictEqual(result.cgst, '90.00');
  assert.strictEqual(result.sgst, '90.00');
  assert.strictEqual(result.totalGst, '180.00');
  assert.strictEqual(result.final, '1180.00');
  assert.strictEqual(result.adjustment, '0.00');
});

test('₹1,000 exclusive at 18%, inter-state', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: true, isWholeRupee: false });
  assert.strictEqual(result.taxable, '1000.00');
  assert.strictEqual(result.igst, '180.00');
  assert.strictEqual(result.cgst, '0.00');
  assert.strictEqual(result.sgst, '0.00');
  assert.strictEqual(result.totalGst, '180.00');
  assert.strictEqual(result.final, '1180.00');
});

test('₹1,180 inclusive at 18%, inter-state', () => {
  const result = calculateGST({ inputStr: '1180', rateStr: '18', cessRateStr: '0', isInclusive: true, isInterState: true, isWholeRupee: false });
  assert.strictEqual(result.taxable, '1000.00');
  assert.strictEqual(result.igst, '180.00');
  assert.strictEqual(result.totalGst, '180.00');
  assert.strictEqual(result.final, '1180.00');
});

test('₹100 inclusive at 18%, decimal mode (rounding split check)', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '18', cessRateStr: '0', isInclusive: true, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.taxable, '84.75');
  assert.strictEqual(result.cgst, '7.63');
  assert.strictEqual(result.sgst, '7.63');
  assert.strictEqual(result.totalGst, '15.26');
  assert.strictEqual(result.adjustment, '-0.01');
  assert.strictEqual(result.final, '100.00');
});

test('₹100 inclusive at 18%, whole-rupee mode', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '18', cessRateStr: '0', isInclusive: true, isInterState: false, isWholeRupee: true });
  assert.strictEqual(result.taxable, '85');
  assert.strictEqual(result.cgst, '8');
  assert.strictEqual(result.sgst, '8');
  assert.strictEqual(result.totalGst, '16');
  assert.strictEqual(result.adjustment, '-1');
  assert.strictEqual(result.final, '100');
});

test('0.25% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '0.25', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '2.50');
});

test('1.5% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '1.5', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '15.00');
});

test('3% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '3', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '30.00');
});

test('5% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '5', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '50.00');
});

test('12% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '12', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '120.00');
});

test('18% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '180.00');
});

test('28% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '28', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '280.00');
});

test('40% rate check', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '40', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '400.00');
});

test('custom percentage', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '12.34', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '12.34');
});

test('cess calculation', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '28', cessRateStr: '12', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.cess, '120.00');
  assert.strictEqual(result.final, '1400.00');
});

test('very small values', () => {
  const result = calculateGST({ inputStr: '0.01', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.final, '0.01');
  assert.strictEqual(result.cgst, '0.00'); // -0.00 check
});

test('documented maximum supported value', () => {
  const result = calculateGST({ inputStr: '999999999', rateStr: '40', cessRateStr: '22', isInclusive: true, isInterState: true, isWholeRupee: true });
  assert.strictEqual(result.taxable, '617283950');
  assert.strictEqual(result.igst, '246913580');
  assert.strictEqual(result.cess, '135802469');
  assert.strictEqual(result.final, '999999999');
});

test('parsing EXACT: "100" becomes ₹100.00', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.taxable, '100.00');
});

test('parsing EXACT: "100.5" becomes ₹100.50', () => {
  const result = calculateGST({ inputStr: '100.5', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.taxable, '100.50');
});

test('parsing EXACT: "0.01" remains ₹0.01', () => {
  const result = calculateGST({ inputStr: '0.01', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.taxable, '0.01');
});

test('more than two money decimals rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: '100.555', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('more than two percentage decimals rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: '100', rateStr: '18.555', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('scientific notation rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: '1e2', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('whitespace-only input rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: '   ', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('malformed input rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: 'abc', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('negative input rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: '-100', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('negative rate rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: '100', rateStr: '-18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('Infinity rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: 'Infinity', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('NaN rejected', () => {
  assert.strictEqual(calculateGST({ inputStr: 'NaN', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false }), null);
});

test('no output contains -0.00', () => {
  const result = calculateGST({ inputStr: '0', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.taxable, '0.00');
  assert.strictEqual(result.cgst, '0.00');
  assert.strictEqual(result.adjustment, '0.00');
});

test('integration: result object contains all fields needed by copy and history', () => {
  const result = calculateGST({ inputStr: '1000', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.ok('taxable' in result);
  assert.ok('cgst' in result);
  assert.ok('sgst' in result);
  assert.ok('igst' in result);
  assert.ok('totalGst' in result);
  assert.ok('cess' in result);
  assert.ok('adjustment' in result);
  assert.ok('hasAdjustment' in result);
  assert.ok('final' in result);
});

test('invariants: CGST equals SGST and total matching', () => {
  const res = calculateGST({ inputStr: '2345.67', rateStr: '18', cessRateStr: '0', isInclusive: true, isInterState: false, isWholeRupee: false });
  assert.strictEqual(res.cgst, res.sgst);

  // parse as float to add for check (since test asserts invariant dynamically)
  const taxable = parseFloat(res.taxable);
  const totalGst = parseFloat(res.totalGst);
  const cess = parseFloat(res.cess);
  const cgst = parseFloat(res.cgst);
  const sgst = parseFloat(res.sgst);
  const adj = parseFloat(res.adjustment);
  const final = parseFloat(res.final);

  assert.strictEqual((cgst + sgst).toFixed(2), totalGst.toFixed(2));
  assert.strictEqual((taxable + totalGst + cess + adj).toFixed(2), final.toFixed(2));
  assert.strictEqual(final.toFixed(2), '2345.67');
});

test('invariants: inter-state CGST/SGST zero', () => {
  const res = calculateGST({ inputStr: '1000', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: true, isWholeRupee: false });
  assert.strictEqual(res.cgst, '0.00');
  assert.strictEqual(res.sgst, '0.00');
  assert.strictEqual(res.totalGst, res.igst);
});
