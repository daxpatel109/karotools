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
    document.title = "Non-44ADA Income Tax Calculator for High Earners (>₹75L)";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Calculate your exact freelance tax liability under the New Tax Regime (FY 2025-26) if you earn over ₹75 Lakhs or have high actual expenses (No 44ADA).";

    // JSON-LD FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do freelancers earning over ₹20 Lakhs need GST registration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GST registration requirements depend on the nature of services, place of supply, export status, and applicable GST provisions. Many service providers exceeding ₹20 lakh turnover may be required to register for GST, but individual circumstances can differ."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use Section 44ADA if my income is above ₹75 Lakhs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Section 44ADA (Presumptive Taxation for Professionals) is strictly capped at ₹75 Lakhs of gross receipts (provided cash receipts don't exceed 5%). If you cross this limit, you must maintain regular books of accounts and calculate tax on actual profits, as shown in this calculator."
          }
        },
        {
          "@type": "Question",
          "name": "How is Advance Tax calculated for freelancers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If your total tax liability for the year exceeds ₹10,000, you are required to pay Advance Tax in four installments: 15% by June 15, 45% by Sept 15, 75% by Dec 15, and 100% by March 15. Failing to do so attracts interest penalties under Sections 234B and 234C."
          }
        },
        {
          "@type": "Question",
          "name": "What expenses can a freelancer legally claim?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under the normal taxation method, freelancers can deduct expenses wholly and exclusively incurred for their profession. This includes software subscriptions, internet bills, domain hosting, coworking space rent, professional fees, and depreciation on assets like laptops and mobile phones."
          }
        }
      ]
    };

    let script = document.getElementById("faq-schema-normal");
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-schema-normal";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify(faqSchema);

    return () => {
      if (script) document.head.removeChild(script);
    };
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
    
    const profitMargin = gross > 0 ? ((taxableIncome / gross) * 100).toFixed(1) : 0;
    
    // Eligible for 44ADA if gross is under 75L. 
    // It is *beneficial* if their actual profit margin is > 50% (expenses < 50%).
    const is44ADAEligible = gross > 0 && gross <= 7500000;
    
    let adaSavings = 0;
    let adaTotalTax = 0;
    if (is44ADAEligible) {
      const adaProfit = gross * 0.5;
      let t = rawTaxOn(adaProfit);
      if (adaProfit <= 1200000) {
        t = 0;
      } else if (adaProfit <= 1270000) {
        const excess = adaProfit - 1200000;
        if (t > excess) t = excess;
      }
      adaTotalTax = t + (t * 0.04);
      adaSavings = Math.max(0, totalTax - adaTotalTax);
    }

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
      effectiveRate,
      profitMargin,
      is44ADAEligible,
      adaSavings,
      adaTotalTax
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <Link to="/" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>Home</Link>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "60px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "1000px", width: "100%", display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ background: "rgba(244,63,94,0.1)", color: "#fb7185", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>FY 2025-26 (NEW REGIME)</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 42px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", margin: "0 0 16px 0", lineHeight: 1.1 }}>
              <span style={{ color: "#f8fafc" }}>Income Tax Calculator</span><br/>
              <span style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>(Non-44ADA / &gt;₹75L)</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
              Calculate tax under normal provisions (claiming actual expenses) if you are not eligible for the 44ADA 50% flat deduction.
            </p>
          </div>

          {parseFloat(grossIncome) <= 7500000 && parseFloat(grossIncome) > 0 && (
            <div style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{ fontSize: "24px" }}>ℹ️</div>
              <p style={{ margin: 0, color: "#e0f2fe", fontSize: "15px", lineHeight: "1.5" }}>
                This is the actual expense method. If your net profit margin is below 50%, this is your primary way to calculate taxes.
              </p>
              <Link to="/tax-calculator" style={{ background: "#0ea5e9", color: "#fff", textDecoration: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", marginTop: "4px", transition: "opacity 0.2s" }} onMouseEnter={e => e.target.style.opacity = 0.9} onMouseLeave={e => e.target.style.opacity = 1}>
                Check if 44ADA is Better
              </Link>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "32px", alignItems: "start" }}>
            
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
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fef08a", fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>GST Check Recommended</div>
                    <div style={{ color: "#fde047", fontSize: "13px", opacity: 0.8, lineHeight: 1.5, marginBottom: "8px" }}>If your services are taxable, you may need to register for GST once turnover exceeds ₹20 Lakhs.</div>
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
                <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px", marginBottom: "12px" }}>Include actual business-related expenses only.</p>
              </div>
            </div>

            {/* Results Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
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

              <div style={{ paddingTop: "24px", borderTop: "1px dashed rgba(255,255,255,0.1)", marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                  <span style={{ color: "#f8fafc", fontSize: "18px", fontWeight: "600" }}>Total Tax Payable</span>
                  <span style={{ fontSize: "clamp(24px, 8vw, 36px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f43f5e", lineHeight: 1, wordBreak: "break-all" }}>
                    {formatCurrency(results.totalTax)}
                  </span>
                </div>
                <div style={{ textAlign: "right", color: "#64748b", fontSize: "14px" }}>
                  Effective Tax Rate: {results.effectiveRate}%
                </div>
              </div>

              {/* Take Home Income Card */}
              <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "20px", marginBottom: "32px" }}>
                <h4 style={{ color: "#34d399", fontSize: "14px", fontWeight: "700", marginBottom: "16px", marginTop: 0 }}>💰 Net Take-Home Income</h4>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a7f3d0", fontSize: "14px", marginBottom: "8px" }}>
                  <span>Revenue:</span>
                  <span>{formatCurrency(parseFloat(grossIncome) || 0)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a7f3d0", fontSize: "14px", marginBottom: "8px" }}>
                  <span>Expenses:</span>
                  <span>- {formatCurrency(parseFloat(expenses) || 0)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#fca5a5", fontSize: "14px", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px dashed rgba(16,185,129,0.2)" }}>
                  <span>Tax Payable:</span>
                  <span>- {formatCurrency(results.totalTax)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981", fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif" }}>
                  <span>Net After Tax:</span>
                  <span>{formatCurrency(Math.max(0, (parseFloat(grossIncome) || 0) - (parseFloat(expenses) || 0) - results.totalTax))}</span>
                </div>
              </div>

              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "16px" }}>
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
                  {results.is44ADAEligible && results.adaSavings > 0 ? " Note: Since your expenses are less than 50% of your revenue and you earn under ₹75L, you might save tax by opting for Section 44ADA instead." : ""}
                </p>
              </div>

            </div>
          </div>
          
          {/* SEO FAQs */}
          <div style={{ marginTop: "60px", padding: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "32px", textAlign: "center" }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>Do freelancers earning over ₹20 Lakhs need GST registration?</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>GST registration requirements depend on the nature of services, place of supply, export status, and applicable GST provisions. Many service providers exceeding ₹20 lakh turnover may be required to register for GST, but individual circumstances can differ.</p>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>Can I use Section 44ADA if my income is above ₹75 Lakhs?</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>No. Section 44ADA (Presumptive Taxation for Professionals) is strictly capped at ₹75 Lakhs of gross receipts (provided cash receipts don't exceed 5%). If you cross this limit, you must maintain regular books of accounts and calculate tax on actual profits, as shown in this calculator.</p>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>How is Advance Tax calculated for freelancers?</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>If your total tax liability for the year exceeds ₹10,000, you are required to pay Advance Tax in four installments: 15% by June 15, 45% by Sept 15, 75% by Dec 15, and 100% by March 15. Failing to do so attracts interest penalties under Sections 234B and 234C.</p>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>What expenses can a freelancer legally claim?</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Under the normal taxation method, freelancers can deduct expenses wholly and exclusively incurred for their profession. This includes software subscriptions, internet bills, domain hosting, coworking space rent, professional fees, and depreciation on assets like laptops and mobile phones.</p>
              </div>
            </div>
          </div>

          {/* Universal Legal Disclaimer */}
          <div style={{ marginTop: "40px", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.6", margin: 0 }}>
              <strong>Disclaimer:</strong> KaroTools provides free calculators, templates, and educational resources for informational purposes only. The results, documents, and data generated by our tools are estimates and should <strong>not</strong> be considered legal, tax, financial, or professional advice. The developers and owners of KaroTools assume no liability or responsibility for any errors, omissions, or financial losses arising from the use of this website. Please consult a qualified professional or Chartered Accountant before making any business, legal, or financial decisions.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
