/* global console, process */
/* eslint-disable no-unused-vars */
export function runCalculatorTest({
  amount = 500,
  currency = "USD",
  platform = "Fiverr",
  platformFeePercent = 20,
  gstinProvided = false,
  gstPercent = 18,
  withholdingEnabled = false,
  withholdingPercent = 1,
  payoutMethod = "Direct to Indian Bank (INR)",
  exchangeRate = 83.50,
  fxMarkupPercent = 2,
  withdrawalFee = 0,
  bankReceivingFee = 0
}) {
  const numAmount = parseFloat(amount) || 0;
  const numPlatformFee = parseFloat(platformFeePercent) || 0;
  const numGst = parseFloat(gstPercent) || 0;
  const numWithholding = parseFloat(withholdingPercent) || 0;
  const numExchangeRate = parseFloat(exchangeRate) || 0;
  const numFxMarkup = parseFloat(fxMarkupPercent) || 0;
  const numWithdrawalFee = parseFloat(withdrawalFee) || 0;
  const numBankReceivingFee = parseFloat(bankReceivingFee) || 0;

  // 1. Platform Fee
  const platformFeeForeign = numAmount * (numPlatformFee / 100);
  const platformFeeINR = platformFeeForeign * numExchangeRate;

  // 2. GST on Platform Fee
  const isIndiaB2B = gstinProvided;
  let gstOnPlatformFeeForeign = 0;
  if (!isIndiaB2B) {
    gstOnPlatformFeeForeign = platformFeeForeign * (numGst / 100);
  }
  const gstOnPlatformFeeINR = gstOnPlatformFeeForeign * numExchangeRate;

  // 3. Indian Withholding (e.g., 194O or TDS)
  let withholdingForeign = 0;
  if (withholdingEnabled) {
    withholdingForeign = numAmount * (numWithholding / 100);
  }
  const withholdingINR = withholdingForeign * numExchangeRate;

  // 4. Withdrawal Provider Deductions (e.g., Upwork $0.99 fee)
  const withdrawalFeeForeign = numWithdrawalFee;
  const withdrawalFeeINR = withdrawalFeeForeign * numExchangeRate;

  // Amount after platform fees, taxes, and withdrawal fees
  const amountToConvertForeign = numAmount - platformFeeForeign - gstOnPlatformFeeForeign - withholdingForeign - withdrawalFeeForeign;
  const amountToConvertINR = amountToConvertForeign * numExchangeRate;

  // 5. FX Markup Loss (e.g., Payoneer 2% spread)
  let fxMarkupLossINR = 0;
  if (currency !== "INR") {
    fxMarkupLossINR = amountToConvertINR * (numFxMarkup / 100);
  }

  // 6. Bank Receiving Fee (Fixed INR fee charged by Indian bank)
  const bankFeeINR = numBankReceivingFee;

  // 7. Final Take-Home Payout
  const takeHomeINR = amountToConvertINR - fxMarkupLossINR - bankFeeINR;

  return {
    takeHomeINR,
    platformFeeForeign,
    gstOnPlatformFeeForeign,
    withholdingForeign,
    withdrawalFeeForeign,
    fxMarkupLossINR,
    bankFeeINR
  };
}

const tests = [
  {
    name: "Fiverr with 20% platform fee",
    inputs: { platform: "Fiverr", platformFeePercent: 20, amount: 100, exchangeRate: 83.5, fxMarkupPercent: 0 },
    verify: (res) => Math.round(res.takeHomeINR) === Math.round(6379.4)
  },
  {
    name: "Upwork with 10% platform fee",
    inputs: { platform: "Upwork", platformFeePercent: 10, amount: 100, exchangeRate: 83.5, fxMarkupPercent: 0 },
    verify: (res) => Math.round(res.takeHomeINR) === Math.round(7364.7)
  },
  {
    name: "GSTIN enabled (no GST deducted)",
    inputs: { platform: "Fiverr", platformFeePercent: 20, amount: 100, gstinProvided: true, gstPercent: 18, exchangeRate: 83.5, fxMarkupPercent: 0 },
    verify: (res) => res.gstOnPlatformFeeForeign === 0
  },
  {
    name: "GSTIN disabled (18% GST on platform fee)",
    inputs: { platform: "Fiverr", platformFeePercent: 20, amount: 100, gstinProvided: false, gstPercent: 18, exchangeRate: 83.5, fxMarkupPercent: 0 },
    verify: (res) => Math.round(res.gstOnPlatformFeeForeign * 100)/100 === 3.6
  },
  {
    name: "TDS or withholding (1%)",
    inputs: { platform: "Upwork", platformFeePercent: 10, amount: 100, withholdingEnabled: true, withholdingPercent: 1, exchangeRate: 83.5, fxMarkupPercent: 0 },
    verify: (res) => res.withholdingForeign === 1
  },
  {
    name: "FX markup (2%)",
    inputs: { platform: "Fiverr", platformFeePercent: 20, amount: 100, exchangeRate: 83.5, fxMarkupPercent: 2 },
    verify: (res) => {
      // Amount before FX = $100 - $20 - $3.6 = 76.4
      // INR = 76.4 * 83.5 = 6379.4
      // 2% markup = 127.588
      return Math.round(res.fxMarkupLossINR * 100)/100 === 127.59
    }
  },
  {
    name: "Withdrawal-provider deduction ($1)",
    inputs: { platform: "Fiverr", platformFeePercent: 20, amount: 100, withdrawalFee: 1, exchangeRate: 83.5, fxMarkupPercent: 0 },
    verify: (res) => res.withdrawalFeeForeign === 1 && Math.round(res.takeHomeINR) === Math.round(6295.9)
  },
  {
    name: "Indian bank receiving fee (₹50)",
    inputs: { platform: "Fiverr", platformFeePercent: 20, amount: 100, bankReceivingFee: 50, exchangeRate: 83.5, fxMarkupPercent: 0 },
    verify: (res) => res.bankFeeINR === 50 && Math.round(res.takeHomeINR) === Math.round(6379.4 - 50)
  },
  {
    name: "Example values matching live calculation logic (Order 10000 INR)",
    inputs: { platform: "Fiverr", platformFeePercent: 20, amount: 10000, currency: "INR", exchangeRate: 1, fxMarkupPercent: 0, gstinProvided: true },
    verify: (res) => Math.round(res.takeHomeINR) === 8000
  }
];

let allPassed = true;
tests.forEach(t => {
  const result = runCalculatorTest(t.inputs);
  const passed = t.verify(result);
  console.log(`${passed ? "✅" : "❌"} ${t.name}`);
  if (!passed) {
    allPassed = false;
    console.log("   Got:", result);
  }
});

if (allPassed) {
  console.log("\nALL CALCULATOR TESTS PASSED!");
  process.exit(0);
} else {
  console.log("\nSOME TESTS FAILED.");
  process.exit(1);
}
