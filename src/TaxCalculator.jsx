import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TaxCalculator() {
  const [grossReceipts, setGrossReceipts] = useState(() => localStorage.getItem("tax_gross") || "");

  useEffect(() => {
    localStorage.setItem("tax_gross", grossReceipts);
  }, [grossReceipts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free Section 44ADA Income Tax Calculator for Freelancers";
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Calculate your estimated income tax under Section 44ADA (Presumptive Taxation) for Indian freelancers using the New Tax Regime.";
  }, []);

  const calculateTax = () => {
    const receipts = Number(grossReceipts);
    if (!receipts || receipts <= 0) return null;

    // Presumptive Taxation 44ADA: 50% deemed profit
    const deemedProfit = receipts * 0.50;
    
    // Standard Deduction under New Tax Regime (from FY 2023-24)
    const standardDeduction = 50000;
    
    let taxableIncome = deemedProfit - standardDeduction;
    if (taxableIncome < 0) taxableIncome = 0;

    let tax = 0;
    let slabBreakdown = [];

    if (taxableIncome > 300000) {
      // Slab 1: 3L to 6L @ 5%
      const slab1 = Math.min(taxableIncome - 300000, 300000);
      tax += slab1 * 0.05;
      slabBreakdown.push({ range: "₹3L - ₹6L", rate: "5%", tax: slab1 * 0.05 });

      if (taxableIncome > 600000) {
        // Slab 2: 6L to 9L @ 10%
        const slab2 = Math.min(taxableIncome - 600000, 300000);
        tax += slab2 * 0.10;
        slabBreakdown.push({ range: "₹6L - ₹9L", rate: "10%", tax: slab2 * 0.10 });

        if (taxableIncome > 900000) {
          // Slab 3: 9L to 12L @ 15%
          const slab3 = Math.min(taxableIncome - 900000, 300000);
          tax += slab3 * 0.15;
          slabBreakdown.push({ range: "₹9L - ₹12L", rate: "15%", tax: slab3 * 0.15 });

          if (taxableIncome > 1200000) {
            // Slab 4: 12L to 15L @ 20%
            const slab4 = Math.min(taxableIncome - 1200000, 300000);
            tax += slab4 * 0.20;
            slabBreakdown.push({ range: "₹12L - ₹15L", rate: "20%", tax: slab4 * 0.20 });

            if (taxableIncome > 1500000) {
              // Slab 5: Above 15L @ 30%
              const slab5 = taxableIncome - 1500000;
              tax += slab5 * 0.30;
              slabBreakdown.push({ range: "Above ₹15L", rate: "30%", tax: slab5 * 0.30 });
            }
          }
        }
      }
    }

    // Section 87A Rebate: Full rebate if income <= 7L (New Tax Regime)
    let rebate87A = 0;
    if (taxableIncome <= 700000) {
      rebate87A = tax;
      tax = 0;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const takeHome = receipts - totalTax;

    return {
      receipts,
      deemedProfit,
      standardDeduction,
      taxableIncome,
      slabBreakdown,
      rebate87A,
      taxBeforeCess: tax,
      cess,
      totalTax,
      takeHome
    };
  };

  const fmt = (n) => Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  const data = calculateTax();

  const isOverLimit = Number(grossReceipts) > 7500000;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", paddingBottom: "100px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 5vw", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#8b5cf6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </Link>
        <Link to="/" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Home</Link>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 5vw 0" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", color: "#34d399", fontWeight: "700", letterSpacing: "0.08em" }}>🇮🇳 AS PER NEW TAX REGIME</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "16px", color: "#f8fafc", lineHeight: 1.1 }}>
            Freelance Tax Calculator <br />
            <span style={{ background: "linear-gradient(135deg,#34d399,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Section 44ADA</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Calculate exactly how much income tax you owe as an Indian freelancer under the Presumptive Taxation Scheme (where 50% of your income is tax-free).
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(350px, 100%), 1fr))", gap: "32px" }}>
          
          {/* Input Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "32px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}><span>💰</span> Your Annual Income</h2>
              
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Gross Receipts (FY 2024-25)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: "18px", fontWeight: "600" }}>₹</span>
                  <input 
                    type="number" 
                    value={grossReceipts} 
                    onChange={e => setGrossReceipts(e.target.value)} 
                    placeholder="2000000" 
                    style={{ width: "100%", padding: "16px 16px 16px 42px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "18px", fontWeight: "600", color: "#f1f5f9", outline: "none", boxSizing: "border-box", transition: "all 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(16,185,129,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "10px", lineHeight: 1.5 }}>
                  Enter your total freelance income (before any expenses) for the financial year.
                </p>
              </div>

              {isOverLimit && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "12px", padding: "16px" }}>
                  <p style={{ margin: 0, color: "#f87171", fontSize: "14px", lineHeight: 1.6 }}>
                    <strong>⚠️ Limit Exceeded:</strong> Section 44ADA is generally only applicable if your gross receipts are up to ₹75 Lakhs (provided cash receipts are &le; 5%). You may need to maintain full books of accounts.
                  </p>
                </div>
              )}
            </div>

            {/* Explainer Box */}
            <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.05), transparent)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "20px", padding: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#34d399", marginBottom: "12px" }}>How 44ADA Works</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                Under Section 44ADA, the government assumes that 50% of your freelance income goes towards business expenses (internet, laptop, software, etc.). You don't need to show any expense proofs. <strong>You only pay tax on the remaining 50%.</strong>
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden" }}>
            
            {/* Glow effect */}
            <div style={{ position: "absolute", top: 0, right: 0, width: "150px", height: "150px", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

            {!data ? (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", opacity: 0.5 }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧮</div>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Enter your income to see tax calculation</p>
              </div>
            ) : (
              <div style={{ position: "relative", zIndex: 1 }}>
                
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Estimated Tax Liability</p>
                  <h2 style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: data.totalTax === 0 ? "#34d399" : "#f8fafc", margin: 0, lineHeight: 1 }}>
                    ₹{fmt(data.totalTax)}
                  </h2>
                  {data.totalTax === 0 && <p style={{ fontSize: "14px", color: "#34d399", fontWeight: "600", marginTop: "12px" }}>🎉 100% Tax Free via Section 87A Rebate</p>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  {/* Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                    <span style={{ fontSize: "15px", color: "#94a3b8" }}>Gross Receipts</span>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: "#e2e8f0" }}>₹{fmt(data.receipts)}</span>
                  </div>

                  {/* Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                    <span style={{ fontSize: "15px", color: "#94a3b8" }}>Deemed Profit (50% <span style={{ color: "#34d399" }}>Tax-Free</span>)</span>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: "#e2e8f0" }}>₹{fmt(data.deemedProfit)}</span>
                  </div>

                  {/* Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                    <span style={{ fontSize: "15px", color: "#94a3b8" }}>Standard Deduction</span>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: "#e2e8f0" }}>- ₹{fmt(data.standardDeduction)}</span>
                  </div>

                  {/* Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                    <span style={{ fontSize: "16px", color: "#f8fafc", fontWeight: "600" }}>Net Taxable Income</span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#f8fafc" }}>₹{fmt(data.taxableIncome)}</span>
                  </div>

                  {/* Slab Breakdown */}
                  {data.slabBreakdown.length > 0 && (
                    <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", padding: "16px", margin: "8px 0" }}>
                      <p style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", marginBottom: "12px" }}>Tax Slabs Breakdown</p>
                      {data.slabBreakdown.map((slab, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#cbd5e1", marginBottom: "8px" }}>
                          <span>{slab.range} <span style={{ opacity: 0.5 }}>(@ {slab.rate})</span></span>
                          <span>₹{fmt(slab.tax)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Row */}
                  {data.rebate87A > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                      <span style={{ fontSize: "15px", color: "#34d399", fontWeight: "500" }}>Section 87A Rebate</span>
                      <span style={{ fontSize: "15px", fontWeight: "600", color: "#34d399" }}>- ₹{fmt(data.rebate87A)}</span>
                    </div>
                  )}

                  {/* Row */}
                  {data.totalTax > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                      <span style={{ fontSize: "15px", color: "#94a3b8" }}>Health & Education Cess (4%)</span>
                      <span style={{ fontSize: "15px", fontWeight: "600", color: "#e2e8f0" }}>₹{fmt(data.cess)}</span>
                    </div>
                  )}

                  {/* Highlight Box */}
                  <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "16px", padding: "20px", marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ display: "block", fontSize: "13px", color: "#34d399", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Net Take Home</span>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>After paying taxes</span>
                    </div>
                    <span style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
                      ₹{fmt(data.takeHome)}
                    </span>
                  </div>

                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
