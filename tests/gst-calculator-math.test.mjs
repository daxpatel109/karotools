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

test('₹100 inclusive at 18%, two-decimal mode (rounding split check)', () => {
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
  const result = calculateGST({ inputStr: '100', rateStr: '0.25', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '0.26');
});

test('1.5% rate check', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '1.5', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '1.50');
});

test('3% rate check', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '3', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '3.00');
});

test('5% rate check', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '5', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '5.00');
});

test('12% rate check', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '12', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '12.00');
});

test('18% rate check', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '18.00');
});

test('28% rate check', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '28', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '28.00');
});

test('40% rate check', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '40', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '40.00');
});

test('custom decimal rate (12.34%)', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '12.34', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.totalGst, '12.34');
});

test('cess (12%) calculation', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '28', cessRateStr: '12', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.cess, '12.00');
  assert.strictEqual(result.final, '140.00');
});

test('very small monetary value', () => {
  const result = calculateGST({ inputStr: '0.01', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result.final, '0.01');
  assert.strictEqual(result.cgst, '0.00');
  assert.strictEqual(result.sgst, '0.00'); // prevents -0.00
});

test('very large safe monetary value', () => {
  const result = calculateGST({ inputStr: '999999999', rateStr: '40', cessRateStr: '22', isInclusive: true, isInterState: true, isWholeRupee: true });
  assert.strictEqual(result.taxable, '617283950');
  assert.strictEqual(result.igst, '246913580');
  assert.strictEqual(result.cess, '135802469');
  assert.strictEqual(result.final, '999999999');
});

test('empty input', () => {
  const result = calculateGST({ inputStr: '', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result, null);
});

test('malformed input', () => {
  const result = calculateGST({ inputStr: 'abc', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result, null);
});

test('negative input', () => {
  const result = calculateGST({ inputStr: '-100', rateStr: '18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result, null);
});

test('negative rate', () => {
  const result = calculateGST({ inputStr: '100', rateStr: '-18', cessRateStr: '0', isInclusive: false, isInterState: false, isWholeRupee: false });
  assert.strictEqual(result, null);
});
