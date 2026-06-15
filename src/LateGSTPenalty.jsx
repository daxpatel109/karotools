"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LateGSTPenalty() {
  const [dueDate, setDueDate] = useState(() => {
    const today = new Date();
    // Default to 20th of current month
    const defaultDue = new Date(today.getFullYear(), today.getMonth(), 20);
    return defaultDue.toISOString().split("T")[0];
  });
  const [filingDate, setFilingDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [isNil, setIsNil] = useState(false);
  const [liability, setLiability] = useState("");
  const [result, setResult] = useState(null);

  // SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Late GST Penalty Calculator India | KaroTools";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Instantly calculate your late fee and 18% interest penalty for delayed GSTR-3B or GSTR-1 filing in India. Free tool for freelancers.";

    // FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the late fee for GST filing in India?", "acceptedAnswer": { "@type": "Answer", "text": "The standard late fee is ₹50 per day for normal returns (₹25 CGST + ₹25 SGST) and ₹20 per day for Nil returns." } },
        { "@type": "Question", "name": "How is interest calculated on late GST payments?", "acceptedAnswer": { "@type": "Answer", "text": "Interest is charged at 18% per annum on the net tax liability, calculated for the exact number of days delayed." } },
        { "@type": "Question", "name": "Do I have to pay a penalty for a Nil Return?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. A penalty of ₹20 per day applies for late filing of Nil returns even if tax liability is zero." } }
      ]
    });
    document.head.appendChild(faqSchemaScript);

    return () => {
      if (document.head.contains(faqSchemaScript)) document.head.removeChild(faqSchemaScript);
    };
  }, []);

  useEffect(() => {
    const dDate = new Date(dueDate);
    const fDate = new Date(filingDate);
    const taxAmt = parseFloat(liability) || 0;

    if (isNaN(dDate.getTime()) || isNaN(fDate.getTime())) {
      setResult(null);
      return;
    }

    // Calculate difference in time
    const diffTime = fDate.getTime() - dDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      setResult({ days: 0, lateFee: 0, interest: 0, total: 0 });
      return;
    }

    // Late Fee Calculation
    const feePerDay = isNil ? 20 : 50;
    const maxCap = isNil ? 500 : 2000; // Simplified cap for small taxpayers (Turnover < 1.5Cr)
    
    let calculatedLateFee = feePerDay * diffDays;
    if (calculatedLateFee > maxCap) {
      calculatedLateFee = maxCap;
    }

    // Interest Calculation (18% p.a. on liability)
    let calculatedInterest = 0;
    if (!isNil && taxAmt > 0) {
      calculatedInterest = (taxAmt * 18 / 100) * (diffDays / 365);
    }

    setResult({
      days: diffDays,
      lateFee: calculatedLateFee,
      interest: calculatedInterest,
      total: calculatedLateFee + calculatedInterest
    });

  }, [dueDate, filingDate, isNil, liability]);

  const fmt = (val) => Number(val).toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(239, 68, 68, 0.4); color: white; }
        ::-moz-selection { background: rgba(239, 68, 68, 0.4); color: white; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .interactive-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .interactive-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(239, 68, 68, 0.25);
        }

        .home-btn:hover {
          background: rgba(239, 68, 68, 0.15) !important;
          border-color: rgba(248, 113, 113, 0.4) !important;
          color: #f87171 !important;
        }

        .input-glow:focus-within {
          border-color: rgba(248, 113, 113, 0.5) !important;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
        }
      `}} />

      {/* Ambient background (Red tint for Penalty) */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/logo.png" alt="KaroTools" style={{ height: "56px", margin: "0 -24px 0 0", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <Link href="/" className="interactive-btn home-btn" style={{ padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1", textDecoration: "none" }}>
            ← Home
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>
        
        <div style={{ textAlign: "center", marginBottom: "48px", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.02))", border: "1px solid rgba(239, 68, 68, 0.2)", marginBottom: "20px" }}>
            <span style={{ fontSize: "36px" }}>⚠️</span>
          </div>
          <h1 style={{ fontSize: "42px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "12px", background: "linear-gradient(135deg, #ffffff 0%, #fca5a5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>Late GST Penalty</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px" }}>Calculate late fees (₹50/day) & 18% interest instantly</p>
        </div>

        <div className="glass-panel" style={{ borderRadius: "28px", padding: "40px", marginBottom: "32px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
            {/* Due Date */}
            <div>
              <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Due Date</label>
              <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "12px 20px" }}>
                <span style={{ fontSize: "20px", marginRight: "12px" }}>📅</span>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", fontSize: "18px", color: "#f8fafc", outline: "none", fontWeight: "600", fontFamily: "'DM Sans',sans-serif" }} />
              </div>
            </div>

            {/* Filing Date */}
            <div>
              <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Actual Filing Date</label>
              <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "12px 20px" }}>
                <span style={{ fontSize: "20px", marginRight: "12px" }}>📝</span>
                <input type="date" value={filingDate} onChange={e => setFilingDate(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", fontSize: "18px", color: "#f8fafc", outline: "none", fontWeight: "600", fontFamily: "'DM Sans',sans-serif" }} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Return Type</label>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "6px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <button onClick={() => setIsNil(false)} style={{ flex: 1, padding: "14px", background: !isNil ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))" : "transparent", border: "none", borderRadius: "12px", color: !isNil ? "#fff" : "#64748b", fontWeight: "700", fontSize: "15px", cursor: "pointer", transition: "all 0.3s", boxShadow: !isNil ? "0 4px 12px rgba(0,0,0,0.1)" : "none" }}>
                Normal Return (₹50/day)
              </button>
              <button onClick={() => setIsNil(true)} style={{ flex: 1, padding: "14px", background: isNil ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))" : "transparent", border: "none", borderRadius: "12px", color: isNil ? "#fff" : "#64748b", fontWeight: "700", fontSize: "15px", cursor: "pointer", transition: "all 0.3s", boxShadow: isNil ? "0 4px 12px rgba(0,0,0,0.1)" : "none" }}>
                Nil Return (₹20/day)
              </button>
            </div>
          </div>

          {!isNil && (
            <div>
              <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Net Tax Liability (₹)</label>
              <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "8px 20px" }}>
                <span style={{ fontSize: "24px", color: "#64748b", fontWeight: "500", marginRight: "12px" }}>₹</span>
                <input type="number" value={liability} onChange={e => setLiability(e.target.value)} placeholder="0.00" style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", fontSize: "28px", color: "#f8fafc", outline: "none", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }} />
              </div>
              <p style={{ marginTop: "12px", fontSize: "13px", color: "#64748b" }}>*Interest of 18% p.a. is calculated on this unpaid tax amount.</p>
            </div>
          )}
        </div>

        {/* RESULTS CARD */}
        {result && (
          <div className="glass-panel" style={{ borderRadius: "28px", padding: "40px", animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)", background: "linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, rgba(2,6,23,0) 100%)", borderTopColor: "rgba(239, 68, 68, 0.3)" }}>
            
            {result.days === 0 ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#4ade80", marginBottom: "8px" }}>Filed on Time!</h2>
                <p style={{ color: "#94a3b8" }}>You have 0 days of delay. No penalty or interest applies.</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "36px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Total Days Delayed</p>
                  <h2 style={{ fontSize: "48px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#fff", lineHeight: 1 }}>
                    {result.days} <span style={{ fontSize: "24px", color: "#94a3b8", fontWeight: "600" }}>Days</span>
                  </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "24px", textAlign: "center" }}>
                    <p style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Late Fee Penalty</p>
                    <p style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>₹{fmt(result.lateFee)}</p>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "24px", textAlign: "center" }}>
                    <p style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>18% Interest</p>
                    <p style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>₹{fmt(result.interest)}</p>
                  </div>
                </div>

                <div style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.1))", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "20px", padding: "32px", textAlign: "center", boxShadow: "0 20px 40px rgba(239, 68, 68, 0.1)" }}>
                  <p style={{ color: "#fca5a5", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Total Amount Payable</p>
                  <p style={{ fontSize: "56px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    ₹{fmt(result.total)}
                  </p>
                </div>
              </>
            )}

          </div>
        )}

        {/* DISCLAIMER */}
        <div style={{ marginTop: "32px", padding: "20px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "16px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "24px" }}>⚠️</span>
          <div>
            <h4 style={{ color: "#fbbf24", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>IMPORTANT DISCLAIMER</h4>
            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6 }}>
              This tool provides estimated calculations based on standard Indian GST rules (₹50/day normal, ₹20/day nil) and Section 50 interest rates (18% p.a.). Actual penalties may vary based on portal calculations, turnover caps, and government notifications. Please consult a Chartered Accountant (CA) before making final tax payments.
            </p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div style={{ marginTop: "64px", animation: "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "24px", color: "#f8fafc" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { q: "What is the late fee for GST filing in India?", a: "The standard late fee is ₹50 per day for normal returns (₹25 CGST + ₹25 SGST) and ₹20 per day for Nil returns (₹10 CGST + ₹10 SGST). This is often capped based on your business turnover." },
              { q: "How is interest calculated on late GST payments?", a: "Under Section 50 of the CGST Act, interest is charged at 18% per annum on the net tax liability (the actual tax you owe in cash). It is calculated precisely for the exact number of days delayed." },
              { q: "Do I have to pay a penalty for a Nil Return?", a: "Yes. Even if your business had zero sales and zero tax liability, you are still legally required to file a Nil return. If you file late, a penalty of ₹20 per day applies." },
            ].map((faq, i) => (
              <div key={i} className="glass-panel" style={{ padding: "20px 24px", borderRadius: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9", marginBottom: "8px" }}>{faq.q}</h3>
                <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
