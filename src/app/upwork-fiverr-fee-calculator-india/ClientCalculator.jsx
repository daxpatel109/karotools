"use client";

import { useState, useEffect, useMemo } from "react";

export default function ClientCalculator() {
  // Inputs
  const [amount, setAmount] = useState(500);
  const [currency, setCurrency] = useState("USD");
  const [platform, setPlatform] = useState("Upwork");
  const [platformFeePercent, setPlatformFeePercent] = useState(10);
  const [gstinProvided, setGstinProvided] = useState(false);
  const [gstPercent, setGstPercent] = useState(18);
  const [withholdingEnabled, setWithholdingEnabled] = useState(false);
  const [withholdingPercent, setWithholdingPercent] = useState(0.1);
  const [payoutMethod, setPayoutMethod] = useState("Direct Bank");
  const [exchangeRate, setExchangeRate] = useState(83);
  const [fxMarkupPercent, setFxMarkupPercent] = useState(2);
  const [withdrawalFee, setWithdrawalFee] = useState(0.99); // typical Upwork direct to local bank fee
  const [bankReceivingFee, setBankReceivingFee] = useState(0);

  // Auto-fill logic when platform or payout method or currency changes
  const handlePlatformChange = (val) => {
    setPlatform(val);
    if (val === "Upwork") setPlatformFeePercent(10);
    else if (val === "Fiverr") setPlatformFeePercent(20);
    else if (val === "Freelancer.com") setPlatformFeePercent(10);
    else if (val === "Custom") setPlatformFeePercent(0);
  };

  const handleCurrencyChange = (val) => {
    setCurrency(val);
    if (val === "USD") setExchangeRate(83);
    else if (val === "EUR") setExchangeRate(90);
    else if (val === "GBP") setExchangeRate(105);
    else if (val === "INR") setExchangeRate(1);
  };

  const handlePayoutMethodChange = (val) => {
    setPayoutMethod(val);
    if (val === "Wise") setFxMarkupPercent(1);
    else if (val === "Payoneer") setFxMarkupPercent(2.5);
    else if (val === "Direct Bank") setFxMarkupPercent(2);
    else if (val === "PayPal") setFxMarkupPercent(3.5);
    else if (val === "Custom") setFxMarkupPercent(0);
  };

  // Safe Math
  const numAmount = parseFloat(amount) || 0;
  const numExchangeRate = parseFloat(exchangeRate) || 0;
  const numPlatformFee = parseFloat(platformFeePercent) || 0;
  const numGst = parseFloat(gstPercent) || 0;
  const numWithholding = parseFloat(withholdingPercent) || 0;
  const numWithdrawalFee = parseFloat(withdrawalFee) || 0;
  const numBankReceivingFee = parseFloat(bankReceivingFee) || 0;
  const numFxMarkup = parseFloat(fxMarkupPercent) || 0;

  // Formula Spec
  const grossINR = numAmount * numExchangeRate;
  
  const platformFeeForeign = (numAmount * numPlatformFee) / 100;
  const platformFeeINR = platformFeeForeign * numExchangeRate;

  const gstOnPlatformFeeINR = !gstinProvided ? (platformFeeINR * numGst) / 100 : 0;

  const withholdingForeign = withholdingEnabled ? (numAmount * numWithholding) / 100 : 0;
  const withholdingINR = withholdingForeign * numExchangeRate;

  const withdrawalFeeForeign = numWithdrawalFee;
  const withdrawalFeeINR = withdrawalFeeForeign * numExchangeRate;

  const bankFeeINR = numBankReceivingFee;

  const amountAfterPlatformForeign = numAmount - platformFeeForeign - withholdingForeign - withdrawalFeeForeign;
  // Prevent negative payout logic issues
  const safeAmountAfterPlatform = Math.max(0, amountAfterPlatformForeign);

  const convertedAfterDeductionsINR = safeAmountAfterPlatform * numExchangeRate;
  const fxMarkupLossINR = (convertedAfterDeductionsINR * numFxMarkup) / 100;

  const estimatedFinalINR = Math.max(0, grossINR - platformFeeINR - gstOnPlatformFeeINR - withholdingINR - withdrawalFeeINR - bankFeeINR - fxMarkupLossINR);

  const effectiveDeductionPercent = grossINR > 0 ? ((grossINR - estimatedFinalINR) / grossINR) * 100 : 0;

  // Lowest payout method logic
  const payoutMethods = [
    { name: "Wise", fx: 1 },
    { name: "Payoneer", fx: 2.5 },
    { name: "Direct Bank", fx: 2 },
    { name: "PayPal", fx: 3.5 },
    { name: "Custom", fx: numFxMarkup } // User's custom inputs
  ];

  const calculateMethodINR = (fxRate) => {
    const loss = (convertedAfterDeductionsINR * fxRate) / 100;
    return Math.max(0, grossINR - platformFeeINR - gstOnPlatformFeeINR - withholdingINR - withdrawalFeeINR - bankFeeINR - loss);
  };

  let maxINR = estimatedFinalINR;
  payoutMethods.forEach(pm => {
    const testINR = calculateMethodINR(pm.fx);
    if (testINR > maxINR) {
      maxINR = testINR;
    }
  });

  const potentialSavings = maxINR - estimatedFinalINR;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 24px)", display: "flex", flexWrap: "wrap", gap: "clamp(16px, 4vw, 32px)", fontFamily: "var(--font-inter, sans-serif)", overflowX: "hidden" }}>
      {/* Input Section */}
      <div style={{ flex: "1 1 320px", background: "var(--bg-secondary)", padding: "clamp(16px, 5vw, 32px)", borderRadius: "16px", border: "1px solid var(--border-color)", minWidth: 0 }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>Project & Fee Assumptions</h2>
        
        {/* Basic Inputs */}
        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>Project Amount</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ flex: "1 1 120px", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "16px" }} />
              <select value={currency} onChange={(e) => handleCurrencyChange(e.target.value)} style={{ width: "100px", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "16px" }}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>Exchange Rate to INR (Editable assumption)</label>
            <input type="number" inputMode="decimal" step="0.01" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "16px" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>Platform</label>
            <select value={platform} onChange={(e) => handlePlatformChange(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "16px" }}>
              <option value="Upwork">Upwork</option>
              <option value="Fiverr">Fiverr</option>
              <option value="Freelancer.com">Freelancer.com</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>Platform Fee % (Editable assumption)</label>
            <input type="number" inputMode="decimal" step="0.1" value={platformFeePercent} onChange={(e) => setPlatformFeePercent(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "16px" }} />
          </div>

          <div style={{ padding: "16px", background: "var(--bg-primary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: !gstinProvided ? "16px" : "0" }}>
              <span style={{ fontSize: "15px", color: "var(--text-primary)" }}>GSTIN Provided to Platform?</span>
              <input type="checkbox" checked={gstinProvided} onChange={(e) => setGstinProvided(e.target.checked)} style={{ width: "20px", height: "20px" }} />
            </label>
            {!gstinProvided && (
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>GST estimate on platform fees % (Assumption)</label>
                <input type="number" inputMode="decimal" step="0.1" value={gstPercent} onChange={(e) => setGstPercent(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "10px 14px", borderRadius: "8px", fontSize: "15px" }} />
              </div>
            )}
          </div>

          <div style={{ padding: "16px", background: "var(--bg-primary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: withholdingEnabled ? "16px" : "0" }}>
              <span style={{ fontSize: "15px", color: "var(--text-primary)" }}>Indian Withholding / TDS Deducted?</span>
              <input type="checkbox" checked={withholdingEnabled} onChange={(e) => setWithholdingEnabled(e.target.checked)} style={{ width: "20px", height: "20px" }} />
            </label>
            {withholdingEnabled && (
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>Indian withholding % (Editable assumption)</label>
                <input type="number" inputMode="decimal" step="0.01" value={withholdingPercent} onChange={(e) => setWithholdingPercent(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "10px 14px", borderRadius: "8px", fontSize: "15px" }} />
              </div>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>Payout Method</label>
            <select value={payoutMethod} onChange={(e) => handlePayoutMethodChange(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "16px" }}>
              <option value="Wise">Wise</option>
              <option value="Payoneer">Payoneer</option>
              <option value="Direct Bank">Direct Bank (e.g. Upwork to Local)</option>
              <option value="PayPal">PayPal</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
             <div style={{ flex: "1 1 130px", minWidth: 0 }}>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>FX Markup Loss %</label>
              <input type="number" inputMode="decimal" step="0.1" value={fxMarkupPercent} onChange={(e) => setFxMarkupPercent(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "15px" }} />
            </div>
            <div style={{ flex: "1 1 130px", minWidth: 0 }}>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>Fixed Withdrawal Fee ({currency})</label>
              <input type="number" inputMode="decimal" step="0.01" value={withdrawalFee} onChange={(e) => setWithdrawalFee(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "15px" }} />
            </div>
          </div>
          
          <div>
            <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>Indian Bank Receiving Fee (INR)</label>
            <input type="number" inputMode="decimal" step="1" value={bankReceivingFee} onChange={(e) => setBankReceivingFee(e.target.value)} style={{ width: "100%", minWidth: 0, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "12px 16px", borderRadius: "8px", fontSize: "15px" }} />
          </div>

        </div>
      </div>

      {/* Output Section */}
      <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
        
        {/* Main Highlight Card */}
        <div style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)", padding: "clamp(16px, 5vw, 32px)", borderRadius: "16px", color: "#fff", boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)" }}>
          <div style={{ fontSize: "15px", opacity: 0.9, marginBottom: "8px" }}>Estimated Final INR in Bank</div>
          <div style={{ fontSize: "42px", fontWeight: "800", letterSpacing: "-1px", marginBottom: "16px" }}>
            ₹{Math.round(estimatedFinalINR).toLocaleString("en-IN")}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "16px" }}>
            <span style={{ fontSize: "14px", opacity: 0.9 }}>Gross Project Value</span>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>₹{Math.round(grossINR).toLocaleString("en-IN")}</span>
          </div>
          <div style={{ fontSize: "14px", marginTop: "12px", background: "var(--glass-bg)", padding: "10px 14px", borderRadius: "8px" }}>
            Estimated deduction: <strong>{effectiveDeductionPercent.toFixed(1)}%</strong> of gross project value
          </div>
        </div>

        {/* Deductions Breakdown */}
        <div style={{ background: "var(--bg-secondary)", padding: "clamp(16px, 5vw, 32px)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "20px" }}>Deductions Breakdown</h2>
          
          <div style={{ display: "grid", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "15px", flex: 1 }}>Platform Fee Estimate</span>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: "#ef4444", fontWeight: "600" }}>-₹{Math.round(platformFeeINR).toLocaleString("en-IN")}</div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>({platformFeeForeign.toFixed(2)} {currency})</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "15px", flex: 1 }}>GST Estimate on Platform Fees</span>
              <div style={{ textAlign: "right", flexShrink: 0, maxWidth: "180px" }}>
                {gstinProvided ? (
                  <div style={{ fontSize: "12px", color: "#10b981", lineHeight: "1.3" }}>
                    GST estimate not added as direct cost in this calculation. Verify platform invoice and input-credit treatment with your tax advisor.
                  </div>
                ) : (
                  <div style={{ color: "#ef4444", fontWeight: "600" }}>-₹{Math.round(gstOnPlatformFeeINR).toLocaleString("en-IN")}</div>
                )}
              </div>
            </div>

            {withholdingEnabled && (
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px", flex: 1 }}>Indian Withholding Tax / TDS</span>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: "#ef4444", fontWeight: "600" }}>-₹{Math.round(withholdingINR).toLocaleString("en-IN")}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary, #94a3b8)" }}>({withholdingForeign.toFixed(2)} {currency})</div>
                </div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "15px", flex: 1 }}>Withdrawal + Bank Fee</span>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: "#ef4444", fontWeight: "600" }}>-₹{Math.round(withdrawalFeeINR).toLocaleString("en-IN")}</div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>({withdrawalFeeForeign.toFixed(2)} {currency})</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "15px", flex: 1 }}>FX Markup Loss Estimate</span>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: "#ef4444", fontWeight: "600" }}>-₹{Math.round(fxMarkupLossINR).toLocaleString("en-IN")}</div>
              </div>
            </div>
            {numBankReceivingFee > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "4px" }}>
                <span style={{ color: "var(--text-secondary, #94a3b8)", fontSize: "15px" }}>Indian Bank Receiving Fee</span>
                <div style={{ color: "#ef4444", fontWeight: "600" }}>-₹{Math.round(bankFeeINR).toLocaleString("en-IN")}</div>
              </div>
            )}
          </div>
        </div>

        {/* Savings Card */}
        {potentialSavings > 50 && (
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: "#10b981", fontSize: "16px", fontWeight: "700", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span role="img" aria-label="bulb">💡</span> What you could save
            </h3>
            <p style={{ color: "var(--text-secondary, #94a3b8)", fontSize: "14px", lineHeight: "1.5" }}>
              You could save approximately <strong>₹{Math.round(potentialSavings).toLocaleString("en-IN")}</strong> compared with this payout method, based on the lowest estimated payout-cost method.
            </p>
          </div>
        )}
        {potentialSavings <= 50 && (
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: "#10b981", fontSize: "16px", fontWeight: "700", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span role="img" aria-label="check">✅</span> Optimal Payout Method
            </h3>
            <p style={{ color: "var(--text-secondary, #94a3b8)", fontSize: "14px", lineHeight: "1.5" }}>
              This appears to be the lowest estimated payout-cost method based on your assumptions.
            </p>
          </div>
        )}

        <div style={{ fontSize: "12px", color: "var(--text-secondary, #94a3b8)", lineHeight: "1.6", padding: "16px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
          <strong>Assumptions used:</strong> Platform fee ({numPlatformFee}%), GST estimate on platform fees ({numGst}%), GSTIN provided ({gstinProvided ? "Yes" : "No"}), Indian withholding ({numWithholding}%), Payout method ({payoutMethod}), Exchange rate ({numExchangeRate}), FX markup ({numFxMarkup}%), Withdrawal fee ({numWithdrawalFee}), Bank receiving fee ({numBankReceivingFee}).
          <br /><br />
          <em>Disclaimer: This calculator is an estimate only. It does not determine tax filing liability, GST compliance, or actual remittance compliance. Please verify platform fees, payout charges, exchange rates, and tax treatment with official sources or a tax professional.</em>
        </div>

      </div>
    </div>
  );
}
