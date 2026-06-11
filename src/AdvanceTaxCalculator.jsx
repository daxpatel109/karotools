"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdvanceTaxCalculator() {
  const [totalTax, setTotalTax] = useState("");
  const [tds, setTds] = useState("");
  const [isPresumptive, setIsPresumptive] = useState(false);

  // SEO & Scroll Reset
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free Advance Tax Calculator India | FY 2025-26";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Calculate your Advance Tax installments and due dates for FY 2025-26. Free calculator for Indian freelancers, businesses, and professionals.";

    // JSON-LD Schema
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Advance Tax Calculator India",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "WebBrowser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
          "description": "Calculate your Advance Tax installments and due dates for FY 2025-26."
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Who needs to pay Advance Tax in India?", "acceptedAnswer": { "@type": "Answer", "text": "Any person whose estimated total tax liability for the year (after deducting TDS) is ₹10,000 or more is required to pay Advance Tax." } },
            { "@type": "Question", "name": "What are the due dates for Advance Tax?", "acceptedAnswer": { "@type": "Answer", "text": "For normal taxpayers: 15% by June 15, 45% by Sept 15, 75% by Dec 15, and 100% by March 15. For those under presumptive taxation (44AD/44ADA), 100% is due by March 15." } },
            { "@type": "Question", "name": "Are senior citizens required to pay Advance Tax?", "acceptedAnswer": { "@type": "Answer", "text": "Senior citizens (aged 60 years or more) who do not have any income from a business or profession are exempt from paying Advance Tax." } },
            { "@type": "Question", "name": "What happens if I miss an Advance Tax payment?", "acceptedAnswer": { "@type": "Answer", "text": "If you fail to pay or short-pay your Advance Tax, you will be liable to pay interest under Section 234B and 234C at the rate of 1% per month or part of a month." } }
          ]
        }
      ]
    });
    document.head.appendChild(schemaScript);

    return () => {
      if (document.head.contains(schemaScript)) document.head.removeChild(schemaScript);
    };
  }, []);

  const num = (val) => Number(val) || 0;
  const netLiability = Math.max(0, num(totalTax) - num(tds));
  const requiresAdvanceTax = netLiability >= 10000;

  let installments = [];
  if (requiresAdvanceTax) {
    if (isPresumptive) {
      installments = [
        { date: "15th March", percentage: "100%", amount: netLiability, desc: "Final Installment" }
      ];
    } else {
      const q1 = Math.round(netLiability * 0.15);
      const q2 = Math.round(netLiability * 0.45) - q1;
      const q3 = Math.round(netLiability * 0.75) - (q1 + q2);
      const q4 = netLiability - (q1 + q2 + q3);
      installments = [
        { date: "15th June", percentage: "15%", amount: q1, desc: "First Installment" },
        { date: "15th September", percentage: "45%", amount: q2, desc: "Second Installment" },
        { date: "15th December", percentage: "75%", amount: q3, desc: "Third Installment" },
        { date: "15th March", percentage: "100%", amount: q4, desc: "Final Installment" }
      ];
    }
  }

  const fmt = (val) => Number(val).toLocaleString("en-IN");

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <header style={{ padding: "24px 5vw", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 0, background: "rgba(2,6,23,0.8)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <Link href="/" style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8", textDecoration: "none", padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>Explore Tools →</Link>
      </header>

      <div style={{ padding: "60px 5vw", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", background: "rgba(245,158,11,0.1)", color: "#fcd34d", borderRadius: "20px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>FY 2025-26</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", margin: "0 0 16px 0", lineHeight: "1.1", letterSpacing: "-1px" }}>Advance Tax Calculator</h1>
          <p style={{ fontSize: "16px", color: "#94a3b8", margin: 0, maxWidth: "600px", marginInline: "auto" }}>Instantly calculate your advance tax liability, installment amounts, and due dates under Indian tax laws.</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "grid", gap: "24px", marginBottom: "32px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Total Estimated Tax Liability (₹)</label>
              <input type="number" placeholder="e.g. 50000" value={totalTax} onChange={(e) => setTotalTax(e.target.value)} style={{ width: "100%", padding: "16px 20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#f8fafc", fontSize: "18px", fontWeight: "600", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#f59e0b"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>The total tax you expect to pay for the entire financial year.</p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>TDS Already Deducted (₹)</label>
              <input type="number" placeholder="e.g. 10000" value={tds} onChange={(e) => setTds(e.target.value)} style={{ width: "100%", padding: "16px 20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#f8fafc", fontSize: "18px", fontWeight: "600", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#f59e0b"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Any Tax Deducted at Source (TDS) or TCS collected so far.</p>
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", padding: "20px", borderRadius: "12px" }}>
              <input type="checkbox" checked={isPresumptive} onChange={(e) => setIsPresumptive(e.target.checked)} style={{ marginTop: "4px", width: "18px", height: "18px", accentColor: "#f59e0b" }} />
              <div>
                <span style={{ display: "block", fontSize: "15px", fontWeight: "700", color: "#f8fafc", marginBottom: "4px" }}>Opting for Presumptive Taxation?</span>
                <span style={{ display: "block", fontSize: "13px", color: "#94a3b8", lineHeight: "1.5" }}>Check this if you file returns under Section 44AD or 44ADA. Presumptive taxpayers only need to pay advance tax in one single installment.</span>
              </div>
            </label>
          </div>

          <div style={{ background: "#0f172a", borderRadius: "16px", padding: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "16px" }}>
              <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "600" }}>Net Tax Liability</span>
              <span style={{ fontSize: "clamp(20px, 6vw, 24px)", fontWeight: "800", color: "#f8fafc", wordBreak: "break-all" }}>₹{fmt(netLiability)}</span>
            </div>

            {!requiresAdvanceTax && netLiability > 0 && (
              <div style={{ padding: "16px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "12px", color: "#34d399", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>✅</span> No Advance Tax required! Liability is below ₹10,000.
              </div>
            )}
            {!requiresAdvanceTax && netLiability === 0 && (
              <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "12px", color: "#64748b", fontSize: "14px", textAlign: "center" }}>
                Enter your details above to see the calculation.
              </div>
            )}

            {requiresAdvanceTax && (
              <div>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>Payment Schedule</p>
                <div style={{ display: "grid", gap: "12px" }}>
                  {installments.map((inst, i) => (
                    <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#e2e8f0" }}>{inst.date}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{inst.desc} ({inst.percentage})</div>
                      </div>
                      <div style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f59e0b", wordBreak: "break-all" }}>
                        ₹{fmt(inst.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO FAQs */}
        <div style={{ marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "48px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "28px", textAlign: "center" }}>Frequently Asked Questions</h2>
          {[
            { q: "Who needs to pay Advance Tax in India?", a: "Any person whose estimated total tax liability for the year (after deducting TDS) is ₹10,000 or more is required to pay Advance Tax." },
            { q: "What are the due dates for Advance Tax?", a: "For normal taxpayers: 15% by June 15, 45% by Sept 15, 75% by Dec 15, and 100% by March 15. For those under presumptive taxation (44AD/44ADA), 100% is due by March 15." },
            { q: "Are senior citizens required to pay Advance Tax?", a: "Senior citizens (aged 60 years or more) who do not have any income from a business or profession are exempt from paying Advance Tax." },
            { q: "What happens if I miss an Advance Tax payment?", a: "If you fail to pay or short-pay your Advance Tax, you will be liable to pay interest under Section 234B and 234C at the rate of 1% per month or part of a month." }
          ].map(item => (
            <div key={item.q} style={{ marginBottom: "24px", background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#f59e0b", marginBottom: "8px", fontFamily: "'Syne',sans-serif" }}>{item.q}</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Universal Legal Disclaimer */}
        <div style={{ marginTop: "40px", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.6", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
            <strong>Disclaimer:</strong> All calculators and tools on KaroTools.in are provided for educational and informational purposes only. While we strive to keep the logic updated with the latest Indian tax laws (FY 2025-26), the results generated are estimates and do not constitute professional financial, legal, or tax advice. We strongly recommend consulting a certified Chartered Accountant or legal professional before making any business decisions or filing your taxes. KaroTools is not responsible for any financial loss, penalties, or compliance errors resulting from the use of this website.
          </p>
        </div>

      </div>
    </div>
  );
}
