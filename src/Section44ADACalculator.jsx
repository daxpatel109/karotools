"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Section44ADACalculator() {
  const [grossReceipts, setGrossReceipts] = useState("");
  const [actualExpenses, setActualExpenses] = useState("");
  const [cashExceeds5Percent, setCashExceeds5Percent] = useState(false);

  useEffect(() => {
    const savedGross = localStorage.getItem("tax_gross");
    if (savedGross) setGrossReceipts(savedGross);
  }, []);

  useEffect(() => {
    localStorage.setItem("tax_gross", grossReceipts);
  }, [grossReceipts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "44ADA vs Normal Tax Calculator for Freelancers | KaroTools";
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Compare Section 44ADA vs Normal Tax Regime side-by-side. Calculate your estimated income tax and find out which tax scheme saves you more money.";

    // Software App & FAQ Schema for SEO
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Freelance Tax Calculator (Section 44ADA vs Normal)",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "WebBrowser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
          "description": "Calculate and compare estimated income tax for Indian freelancers under Section 44ADA (Presumptive) and Normal Taxation using the New Tax Regime."
        }
      ]
    });
    document.head.appendChild(schemaScript);

    return () => {
      if (document.head.contains(schemaScript)) document.head.removeChild(schemaScript);
    };
  }, []);

  const computeTax = (profit, receipts) => {
    let tax = 0;
    let slabBreakdown = [];

    if (profit > 400000) {
      const slab1 = Math.min(profit - 400000, 400000);
      tax += slab1 * 0.05;
      slabBreakdown.push({ range: "₹4L - ₹8L", rate: "5%", tax: slab1 * 0.05 });

      if (profit > 800000) {
        const slab2 = Math.min(profit - 800000, 400000);
        tax += slab2 * 0.10;
        slabBreakdown.push({ range: "₹8L - ₹12L", rate: "10%", tax: slab2 * 0.10 });

        if (profit > 1200000) {
          const slab3 = Math.min(profit - 1200000, 400000);
          tax += slab3 * 0.15;
          slabBreakdown.push({ range: "₹12L - ₹16L", rate: "15%", tax: slab3 * 0.15 });

          if (profit > 1600000) {
            const slab4 = Math.min(profit - 1600000, 400000);
            tax += slab4 * 0.20;
            slabBreakdown.push({ range: "₹16L - ₹20L", rate: "20%", tax: slab4 * 0.20 });

            if (profit > 2000000) {
              const slab5 = Math.min(profit - 2000000, 400000);
              tax += slab5 * 0.25;
              slabBreakdown.push({ range: "₹20L - ₹24L", rate: "25%", tax: slab5 * 0.25 });

              if (profit > 2400000) {
                const slab6 = profit - 2400000;
                tax += slab6 * 0.30;
                slabBreakdown.push({ range: "> ₹24L", rate: "30%", tax: slab6 * 0.30 });
              }
            }
          }
        }
      }
    }

    let rebate87A = 0;
    let marginalRelief = 0;

    if (profit <= 1200000) {
      rebate87A = tax;
      tax = 0;
    } else {
      const excessIncome = profit - 1200000;
      if (tax > excessIncome) {
        marginalRelief = tax - excessIncome;
        tax = excessIncome;
      }
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      taxableIncome: profit,
      baseTax: tax + rebate87A + marginalRelief,
      rebate87A,
      marginalRelief,
      cess,
      totalTax,
      slabBreakdown
    };
  };

  const calculateComparison = () => {
    const receipts = Number(grossReceipts);
    if (!receipts || receipts <= 0) return null;

    const expenses = Number(actualExpenses) || 0;

    // 44ADA Calculation
    const deemedProfit = receipts * 0.50;
    const adaResult = computeTax(deemedProfit, receipts);
    const adaTakeHome = receipts - adaResult.totalTax - expenses; // Actual cash left

    // Normal Calculation
    const normalProfit = Math.max(0, receipts - expenses);
    const normalResult = computeTax(normalProfit, receipts);
    const normalTakeHome = receipts - normalResult.totalTax - expenses;

    const limit = cashExceeds5Percent ? 5000000 : 7500000;
    const isOverLimit = receipts > limit;

    return {
      receipts,
      expenses,
      ada: adaResult,
      normal: normalResult,
      adaTakeHome,
      normalTakeHome,
      isOverLimit,
      limit,
      diff: Math.abs(adaResult.totalTax - normalResult.totalTax),
      winner: adaResult.totalTax <= normalResult.totalTax ? "ada" : "normal"
    };
  };

  const fmt = (n) => Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  const data = calculateComparison();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)", paddingBottom: "100px" }}>
      
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 5vw 0" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", color: "#34d399", fontWeight: "700", letterSpacing: "0.08em" }}>🇮🇳 AS PER NEW TAX REGIME</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "16px", color: "var(--text-primary)", lineHeight: 1.1 }}>
            Freelance Tax Calculator <br />
            <span style={{ background: "linear-gradient(135deg,#34d399,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>44ADA vs Actual Expenses</span>
          </h1>

          {/* COMPLIANCE BADGE */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "6px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            FY 2026-27 Updated
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Enter your income and expenses below. We'll automatically compare Section 44ADA against the Normal method to tell you which saves you more tax. Section 44ADA allows eligible professionals to declare 50% of gross professional receipts as presumptive income. The remaining 50% is treated as deemed business expenses. Final tax depends on tax regime, rebates, other income, deductions, and eligibility.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(350px, 100%), 1fr))", gap: "32px" }}>
          
          {/* Input Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-bg)", borderRadius: "20px", padding: "32px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}><span>💰</span> Your Annual Finances</h2>
              
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Gross Receipts (FY 2026-27)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: "18px", fontWeight: "600" }}>₹</span>
                  <input 
                    type="number" 
                    value={grossReceipts} 
                    onChange={e => setGrossReceipts(e.target.value)} 
                    placeholder="2000000" 
                    style={{ width: "100%", padding: "16px 16px 16px 42px", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", fontSize: "18px", fontWeight: "600", color: "var(--text-primary)", outline: "none", boxSizing: "border-box", transition: "all 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(16,185,129,0.5)"}
                    onBlur={e => e.target.style.borderColor = "var(--border-color)"}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actual Business Expenses</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: "18px", fontWeight: "600" }}>₹</span>
                  <input 
                    type="number" 
                    value={actualExpenses} 
                    onChange={e => setActualExpenses(e.target.value)} 
                    placeholder="e.g. 500000" 
                    style={{ width: "100%", padding: "16px 16px 16px 42px", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", fontSize: "18px", fontWeight: "600", color: "var(--text-primary)", outline: "none", boxSizing: "border-box", transition: "all 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(16,185,129,0.5)"}
                    onBlur={e => e.target.style.borderColor = "var(--border-color)"}
                  />
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "10px", lineHeight: 1.5 }}>
                  Optional. Used to compare if Normal Tax is better than 44ADA.
                </p>
              </div>

              <div style={{ marginTop: "16px", background: "var(--glass-bg)", padding: "16px", borderRadius: "12px", border: "1px solid var(--glass-bg)" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={cashExceeds5Percent}
                    onChange={e => setCashExceeds5Percent(e.target.checked)}
                    style={{ marginTop: "4px", width: "16px", height: "16px", accentColor: "#10b981" }}
                  />
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", display: "block", marginBottom: "4px" }}>
                      Cash Receipts exceed 5%?
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5, display: "block" }}>
                      The ₹75 lakh 44ADA limit generally applies when cash receipts do not exceed 5% of total receipts. Otherwise, the usual limit may be ₹50 lakh.
                    </span>
                  </div>
                </label>
              </div>

              {data && data.isOverLimit && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "20px", marginTop: "16px" }}>
                  <h3 style={{ margin: "0 0 10px 0", color: "#f87171", fontSize: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>⛔</span> Not Eligible for Section 44ADA
                  </h3>
                  <p style={{ margin: 0, color: "#fca5a5", fontSize: "14px", lineHeight: 1.6 }}>
                    Your gross receipts exceed the <strong>₹{data.limit === 5000000 ? "50 Lakh" : "75 Lakh"}</strong> limit. You must maintain full books of accounts and calculate tax under the Normal Method.
                  </p>
                </div>
              )}
              
              <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "16px", padding: "16px", marginTop: "16px" }}>
                <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.6 }}>
                  <strong>Note:</strong> Section 44ADA applies only to specified professionals. If you are unsure whether your profession qualifies, verify with a CA before filing.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div style={{ background: "linear-gradient(135deg, var(--glass-bg), rgba(255,255,255,0.01))", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden" }}>
            
            <div style={{ position: "absolute", top: 0, right: 0, width: "150px", height: "150px", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

            {!data ? (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", opacity: 0.5 }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧮</div>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>Enter your finances to see comparison</p>
              </div>
            ) : (
              <div style={{ position: "relative", zIndex: 1 }}>
                
                {/* Recommendation Banner */}
                {data.isOverLimit ? (
                  <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.2)", borderRadius: "16px", padding: "20px", marginBottom: "32px", textAlign: "center" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "700", color: "#fb7185", textTransform: "uppercase" }}>Required Method</p>
                    <p style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "var(--text-primary)" }}>Normal Provisions (Actual Expenses)</p>
                  </div>
                ) : (
                  <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "20px", marginBottom: "32px", textAlign: "center" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "700", color: "#34d399", textTransform: "uppercase" }}>Recommended Method</p>
                    <p style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "var(--text-primary)" }}>
                      {data.winner === "ada" ? "Section 44ADA" : "Normal Provisions (Actual Expenses)"}
                    </p>
                    {data.diff > 0 && (
                      <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#a7f3d0" }}>
                        Based on your inputs, this method may reduce your estimated tax by ₹{fmt(data.diff)}.
                      </p>
                    )}
                  </div>
                )}

                {/* Side by Side Comparison */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                  {/* 44ADA Column */}
                  <div style={{ opacity: data.isOverLimit ? 0.3 : 1, position: "relative", filter: data.isOverLimit ? "grayscale(100%)" : "none" }}>
                    {data.isOverLimit && (
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,0,0,0.8)", padding: "12px 16px", borderRadius: "12px", color: "#fca5a5", fontSize: "14px", fontWeight: "700", textAlign: "center", width: "85%", zIndex: 10, border: "1px solid rgba(248,113,113,0.3)", backdropFilter: "blur(4px)" }}>
                        Section 44ADA<br/><span style={{fontSize: "12px", fontWeight: "500", color: "#fecaca"}}>Not available for this input</span>
                      </div>
                    )}
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", marginBottom: "16px" }}>Section 44ADA</p>
                    
                    <div style={{ marginBottom: "12px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 4px 0" }}>Taxable Income</p>
                      <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", margin: 0 }}>₹{fmt(data.ada.taxableIncome)}</p>
                    </div>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 4px 0" }}>Total Tax Payable</p>
                      <p style={{ fontSize: "20px", fontWeight: "800", color: data.winner === "ada" && !data.isOverLimit ? "#34d399" : "var(--text-primary)", margin: 0 }}>₹{fmt(data.ada.totalTax)}</p>
                    </div>

                    <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 4px 0" }}>Cash in Pocket</p>
                      <p style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>₹{fmt(data.adaTakeHome)}</p>
                    </div>
                  </div>

                  {/* Normal Column */}
                  <div>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", marginBottom: "16px" }}>Actual Expenses</p>
                    
                    <div style={{ marginBottom: "12px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 4px 0" }}>Taxable Income</p>
                      <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", margin: 0 }}>₹{fmt(data.normal.taxableIncome)}</p>
                    </div>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 4px 0" }}>Total Tax Payable</p>
                      <p style={{ fontSize: "20px", fontWeight: "800", color: data.winner === "normal" || data.isOverLimit ? "#34d399" : "var(--text-primary)", margin: 0 }}>₹{fmt(data.normal.totalTax)}</p>
                    </div>

                    <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 4px 0" }}>Cash in Pocket</p>
                      <p style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>₹{fmt(data.normalTakeHome)}</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown of Winning Method */}
                <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "24px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>
                    Breakdown of {data.isOverLimit ? "Actual Expenses" : (data.winner === "ada" ? "Section 44ADA" : "Actual Expenses")} Calculation:
                  </p>
                  
                  {(() => {
                    const activeResult = data.isOverLimit ? data.normal : (data.winner === "ada" ? data.ada : data.normal);
                    return (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {activeResult.slabBreakdown.map((slab, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--text-secondary)" }}>
                            <span>{slab.range} <span style={{ opacity: 0.5 }}>(@ {slab.rate})</span></span>
                            <span>₹{fmt(slab.tax)}</span>
                          </div>
                        ))}
                        
                        {activeResult.rebate87A > 0 && (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#34d399", fontWeight: "500" }}>
                              <span>Section 87A Rebate</span>
                              <span>- ₹{fmt(activeResult.rebate87A)}</span>
                            </div>
                            <p style={{ margin: "-8px 0 0 0", color: "var(--text-secondary)", fontSize: "11px", fontStyle: "italic" }}>
                              *Note: Special-rate incomes (like short-term capital gains) may have different rebate rules.
                            </p>
                          </>
                        )}

                        {activeResult.cess > 0 && (
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--text-secondary)" }}>
                            <span>Health & Ed. Cess (4%)</span>
                            <span>₹{fmt(activeResult.cess)}</span>
                          </div>
                        )}
                        
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", color: "var(--text-primary)", fontWeight: "700", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "4px" }}>
                          <span>Final Tax</span>
                          <span>₹{fmt(activeResult.totalTax)}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>
            )}
          </div>

          <div style={{ marginTop: "32px", textAlign: "center", background: "rgba(56,189,248,0.05)", border: "1px dashed rgba(56,189,248,0.2)", padding: "24px", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--text-primary)", margin: "0 0 8px 0" }}>Want to see real examples and detailed rules?</h3>
            <Link href="/blog/section-44ada-freelancers" style={{ color: "#38bdf8", textDecoration: "none", fontSize: "15px", fontWeight: "600" }}>
              Read the Full Section 44ADA Guide →
            </Link>
          </div>

          <div style={{ marginTop: "64px", borderTop: "1px solid var(--glass-bg)", paddingTop: "48px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "28px", textAlign: "center" }}>Frequently Asked Questions</h2>
            {[
              { q: "What is Section 44ADA?", a: "Section 44ADA is a presumptive taxation scheme for specified professionals in India. Section 44ADA allows eligible professionals to declare 50% of gross professional receipts as presumptive income. The remaining 50% is treated as deemed business expenses. Final tax depends on tax regime, rebates, other income, deductions, and eligibility." },
              { q: "When should I choose the Actual Expenses method?", a: "If your actual business expenses (software, internet, travel, freelancer payouts) are significantly MORE than 50% of your revenue, the actual expenses method will save you more tax. However, you must maintain proper books of accounts and invoices." },
              { q: "Who is eligible for Section 44ADA?", a: "Section 44ADA applies only to specified resident professionals. Some IT/software, consulting, legal, medical, engineering, accounting, architecture and interior decoration professionals may qualify depending on the exact nature of services. The normal limit is ₹50 lakh, with a possible ₹75 lakh limit when cash/non-specified receipts do not exceed 5%. Verify with a CA if unsure." },
              { q: "Can I claim standard deduction under 44ADA?", a: "No. The standard deduction of ₹75,000 (New Regime) applies only to salaried employees and pensioners. Freelancers using 44ADA cannot claim this deduction." }
            ].map(item => (
              <div key={item.q} style={{ marginBottom: "24px", background: "var(--glass-bg)", padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-bg)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#38bdf8", marginBottom: "8px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.q}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px dashed var(--border-color)", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: "1.6", margin: 0 }}>
              <strong>Disclaimer:</strong> KaroTools provides free calculators, templates, and educational resources for informational purposes only. The results, documents, and data generated by our tools are estimates and should <strong>not</strong> be considered legal, tax, financial, or professional advice. The developers and owners of KaroTools assume no liability or responsibility for any errors, omissions, or financial losses arising from the use of this website. Please consult a qualified professional or Chartered Accountant before making any business, legal, or financial decisions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
