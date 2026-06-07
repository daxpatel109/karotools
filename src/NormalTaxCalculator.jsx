import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function NormalTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState("8000000");
  const [expenses, setExpenses] = useState("5000000");
  const reportRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Freelance Tax Calculator (Non-44ADA) | KaroTools";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Calculate your exact freelance tax liability under the New Tax Regime (FY 2025-26) if you earn over ₹75 Lakhs or have high actual expenses (No 44ADA).";
  }, []);

  const calculateNormalTax = (grossStr, expStr) => {
    const gross = parseFloat(grossStr) || 0;
    const exp = parseFloat(expStr) || 0;
    const taxableIncome = Math.max(0, gross - exp);

    const slabs = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 },
      { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.30 }
    ];

    const rawTaxOn = (inc) => {
      let t = 0; let rem = inc; let pLimit = 0;
      for (const slab of slabs) {
        const range = slab.limit - pLimit;
        const taxableInSlab = Math.max(0, Math.min(rem, range));
        t += taxableInSlab * slab.rate;
        rem -= taxableInSlab;
        pLimit = slab.limit;
        if (rem <= 0) break;
      }
      return t;
    };

    let tax = rawTaxOn(taxableIncome);

    // Section 87A Rebate & Marginal Relief
    let rebate = 0;
    let marginalRelief87A = 0;

    if (taxableIncome <= 1200000) {
      rebate = tax;
      tax = 0;
    } else if (taxableIncome <= 1270000) {
      const excessIncome = taxableIncome - 1200000;
      if (tax > excessIncome) {
        marginalRelief87A = tax - excessIncome;
        tax = excessIncome;
      }
    }

    // Surcharge & Marginal Relief for Surcharge
    let surchargeRate = 0;
    let surcharge = 0;
    let marginalReliefSurcharge = 0;

    if (taxableIncome > 5000000) {
      if (taxableIncome <= 10000000) {
        surchargeRate = 0.10;
        surcharge = tax * surchargeRate;
        const taxOn50L = rawTaxOn(5000000);
        const excessIncome = taxableIncome - 5000000;
        if (tax + surcharge > taxOn50L + excessIncome) {
          marginalReliefSurcharge = (tax + surcharge) - (taxOn50L + excessIncome);
          surcharge -= marginalReliefSurcharge;
        }
      } else if (taxableIncome <= 20000000) {
        surchargeRate = 0.15;
        surcharge = tax * surchargeRate;
        const taxOn1Cr = rawTaxOn(10000000);
        const surchargeOn1Cr = taxOn1Cr * 0.10;
        const totalTaxOn1Cr = taxOn1Cr + surchargeOn1Cr;
        const excessIncome = taxableIncome - 10000000;
        if (tax + surcharge > totalTaxOn1Cr + excessIncome) {
          marginalReliefSurcharge = (tax + surcharge) - (totalTaxOn1Cr + excessIncome);
          surcharge -= marginalReliefSurcharge;
        }
      } else {
        surchargeRate = 0.25;
        surcharge = tax * surchargeRate;
        const taxOn2Cr = rawTaxOn(20000000);
        const surchargeOn2Cr = taxOn2Cr * 0.15;
        const totalTaxOn2Cr = taxOn2Cr + surchargeOn2Cr;
        const excessIncome = taxableIncome - 20000000;
        if (tax + surcharge > totalTaxOn2Cr + excessIncome) {
          marginalReliefSurcharge = (tax + surcharge) - (totalTaxOn2Cr + excessIncome);
          surcharge -= marginalReliefSurcharge;
        }
      }
    }

    const taxBeforeCess = tax + surcharge;
    const cess = taxBeforeCess * 0.04;
    const totalTax = taxBeforeCess + cess;
    const effectiveRate = gross > 0 ? ((totalTax / gross) * 100).toFixed(1) : 0;

    return {
      taxableIncome,
      baseTax: rawTaxOn(taxableIncome),
      rebate,
      marginalRelief87A,
      surchargeRate: surchargeRate * 100,
      surcharge,
      marginalReliefSurcharge,
      taxBeforeCess,
      cess,
      totalTax,
      effectiveRate
    };
  };

  const results = calculateNormalTax(grossIncome, expenses);

  const downloadPDF = async () => {
    if (!reportRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: "#020617" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Tax_Report_KaroTools.pdf");
    } catch (e) {
      console.error(e);
    }
    setIsExporting(false);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Background gradients */}
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#f43f5e,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#fda4af,#f9a8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </Link>
        <Link to="/" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>Home</Link>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "60px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "1000px", width: "100%", display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ background: "rgba(244,63,94,0.1)", color: "#fb7185", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>FY 2025-26 (NEW REGIME)</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", margin: "20px 0 16px 0", color: "#f8fafc" }}>
              High-Income Freelance Tax Calculator
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "18px", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
              For freelancers earning &gt; ₹75L or agencies with actual expenses &gt; 50%. (Not eligible for 44ADA).
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", alignItems: "start" }}>
            
            {/* Input Form */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Syne',sans-serif", marginBottom: "24px", color: "#e2e8f0" }}>Income & Expenses</h2>
              
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Total Gross Receipts (₹)</label>
                <input 
                  type="number"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  style={{ width: "100%", padding: "16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "18px", outline: "none", transition: "border 0.2s" }}
                  onFocus={(e) => e.target.style.borderColor = "#f43f5e"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  placeholder="e.g. 8000000"
                />
              </div>

              {parseFloat(grossIncome) > 2000000 && (
                <div style={{ padding: "16px", background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)", borderRadius: "12px", marginBottom: "24px", display: "flex", gap: "12px", alignItems: "start" }}>
                  <div style={{ fontSize: "20px" }}>⚠️</div>
                  <div>
                    <div style={{ color: "#fef08a", fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>GST Registration Required</div>
                    <div style={{ color: "#fde047", fontSize: "13px", opacity: 0.8, lineHeight: 1.5 }}>Your gross receipts exceed ₹20 Lakhs. You are legally required to register for GST.</div>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Total Actual Expenses (₹)</label>
                <input 
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  style={{ width: "100%", padding: "16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "18px", outline: "none", transition: "border 0.2s" }}
                  onFocus={(e) => e.target.style.borderColor = "#f43f5e"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  placeholder="e.g. 5000000"
                />
                <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>Include rent, salaries, software, laptop depreciation, etc.</p>
              </div>

              <div style={{ padding: "20px", background: "rgba(244,63,94,0.05)", borderRadius: "12px", border: "1px solid rgba(244,63,94,0.1)" }}>
                <div style={{ color: "#fb7185", fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>Net Taxable Profit</div>
                <div style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Syne',sans-serif" }}>{formatCurrency(results.taxableIncome)}</div>
              </div>
            </div>

            {/* Results Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {/* Results Output */}
              <div ref={reportRef} style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "linear-gradient(90deg, #f43f5e, #ec4899)" }} />
                
                <h2 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Syne',sans-serif", marginBottom: "32px", color: "#e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Tax Breakdown</span>
                  <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "20px" }}>New Regime</span>
                </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "15px" }}>
                  <span>Base Tax on Profit</span>
                  <span>{formatCurrency(results.baseTax)}</span>
                </div>
                
                {results.rebate > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#34d399", fontSize: "15px" }}>
                    <span>Section 87A Rebate</span>
                    <span>- {formatCurrency(results.rebate)}</span>
                  </div>
                )}
                
                {results.marginalRelief87A > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#34d399", fontSize: "15px" }}>
                    <span>Marginal Relief (87A)</span>
                    <span>- {formatCurrency(results.marginalRelief87A)}</span>
                  </div>
                )}

                {results.surcharge > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#fb7185", fontSize: "15px" }}>
                    <span>Surcharge ({results.surchargeRate}%)</span>
                    <span>+ {formatCurrency(results.surcharge + results.marginalReliefSurcharge)}</span>
                  </div>
                )}

                {results.marginalReliefSurcharge > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#34d399", fontSize: "15px" }}>
                    <span>Marginal Relief (Surcharge)</span>
                    <span>- {formatCurrency(results.marginalReliefSurcharge)}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "15px" }}>
                  <span>Health & Ed. Cess (4%)</span>
                  <span>+ {formatCurrency(results.cess)}</span>
                </div>
              </div>

              <div style={{ paddingTop: "24px", borderTop: "1px dashed rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                  <span style={{ color: "#f8fafc", fontSize: "18px", fontWeight: "600" }}>Total Tax Payable</span>
                  <span style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f43f5e", lineHeight: 1 }}>
                    {formatCurrency(results.totalTax)}
                  </span>
                </div>
                <div style={{ textAlign: "right", color: "#64748b", fontSize: "14px" }}>
                  Effective Tax Rate: {results.effectiveRate}%
                </div>
              </div>
              
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
                <button onClick={downloadPDF} disabled={isExporting} style={{ flex: 1, padding: "16px", background: "linear-gradient(135deg, #f43f5e, #ec4899)", color: "white", fontSize: "16px", fontWeight: "700", borderRadius: "12px", border: "none", cursor: isExporting ? "wait" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", transition: "transform 0.2s, opacity 0.2s", opacity: isExporting ? 0.7 : 1 }}>
                  {isExporting ? "Exporting..." : "↓ Download PDF Report"}
                </button>
              </div>

              {/* Advance Tax Schedule */}
              {results.totalTax >= 10000 && (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px", marginTop: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#e2e8f0", marginBottom: "8px" }}>Advance Tax Schedule</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "24px", lineHeight: 1.5 }}>
                    Since your tax exceeds ₹10,000, you must pay in 4 quarterly installments to avoid 234B/234C penalties.
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px dashed rgba(255,255,255,0.05)" }}>
                      <div><div style={{ color: "#f8fafc", fontSize: "14px", fontWeight: "600" }}>15 June</div><div style={{ color: "#64748b", fontSize: "12px" }}>15% of Total Tax</div></div>
                      <div style={{ color: "#f43f5e", fontWeight: "700" }}>{formatCurrency(results.totalTax * 0.15)}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px dashed rgba(255,255,255,0.05)" }}>
                      <div><div style={{ color: "#f8fafc", fontSize: "14px", fontWeight: "600" }}>15 Sept</div><div style={{ color: "#64748b", fontSize: "12px" }}>45% Cumulative</div></div>
                      <div style={{ color: "#f43f5e", fontWeight: "700" }}>{formatCurrency(results.totalTax * 0.30)}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px dashed rgba(255,255,255,0.05)" }}>
                      <div><div style={{ color: "#f8fafc", fontSize: "14px", fontWeight: "600" }}>15 Dec</div><div style={{ color: "#64748b", fontSize: "12px" }}>75% Cumulative</div></div>
                      <div style={{ color: "#f43f5e", fontWeight: "700" }}>{formatCurrency(results.totalTax * 0.30)}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><div style={{ color: "#f8fafc", fontSize: "14px", fontWeight: "600" }}>15 March</div><div style={{ color: "#64748b", fontSize: "12px" }}>100% Cumulative</div></div>
                      <div style={{ color: "#f43f5e", fontWeight: "700" }}>{formatCurrency(results.totalTax * 0.25)}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Summary */}
              <div style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.1)", borderRadius: "16px", padding: "20px", marginTop: "32px" }}>
                <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
                  <strong>Tax Summary:</strong> A freelancer or agency earning {formatCurrency(parseFloat(grossIncome) || 0)} with {formatCurrency(parseFloat(expenses) || 0)} in business expenses has a taxable profit of {formatCurrency(results.taxableIncome)}. 
                  Under the New Tax Regime for FY 2025-26, the estimated tax liability is <strong>{formatCurrency(results.totalTax)}</strong> (an effective tax rate of {results.effectiveRate}%).
                  {parseFloat(grossIncome) <= 7500000 && parseFloat(expenses) < parseFloat(grossIncome) * 0.5 ? " Note: Since your expenses are less than 50% of your revenue and you earn under ₹75L, you might save tax by opting for Section 44ADA instead." : ""}
                </p>
              </div>

            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
