import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SalaryVsFreelanceCalculator() {
  const [monthlySalary, setMonthlySalary] = useState("100000");
  const [annualBonus, setAnnualBonus] = useState("100000");
  const [monthlyExpenses, setMonthlyExpenses] = useState("5000");
  const [leaves, setLeaves] = useState("30");
  const [billableHours, setBillableHours] = useState("5");

  // SEO & Scroll Reset
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Salary vs Freelance Calculator India | KaroTools";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Compare your current salary to freelance rates. Calculate the exact hourly, daily, and monthly rate you need to charge as a freelancer in India to maintain your lifestyle.";

    // JSON-LD Schema
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Salary vs Freelance Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "WebBrowser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
          "description": "Calculate equivalent freelance hourly and daily rates compared to a full-time salaried job in India."
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Why do freelancers need to charge more than salaried employees?", "acceptedAnswer": { "@type": "Answer", "text": "Freelancers do not get paid for weekends, holidays, or sick days. They also have to pay for their own software licenses, hardware, health insurance, and PF out of pocket." } },
            { "@type": "Question", "name": "What are billable vs non-billable hours?", "acceptedAnswer": { "@type": "Answer", "text": "Billable hours are the hours you can strictly charge a client for. In an 8-hour workday, a freelancer usually only bills 4-6 hours. The rest is spent on admin, emails, and pitching." } }
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

  // Logic
  const totalSalaryComp = (num(monthlySalary) * 12) + num(annualBonus);
  const totalFreelanceExpenses = num(monthlyExpenses) * 12;
  
  // Most freelancers need a 10-15% profit buffer to account for dry spells
  const drySpellBuffer = Math.round(totalSalaryComp * 0.15); 
  
  const targetAnnualRevenue = totalSalaryComp + totalFreelanceExpenses + drySpellBuffer;

  const totalDaysInYear = 365;
  const weekends = 104;
  const totalWorkingDays = Math.max(1, totalDaysInYear - weekends - num(leaves));

  const dailyRate = Math.round(targetAnnualRevenue / totalWorkingDays);
  const hourlyRate = Math.round(dailyRate / Math.max(1, num(billableHours)));
  const targetMonthlyRevenue = Math.round(targetAnnualRevenue / 12);

  const fmt = (val) => Number(val).toLocaleString("en-IN");

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <header style={{ padding: "24px 5vw", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 0, background: "rgba(2,6,23,0.8)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <svg width="38" height="38" viewBox="0 0 100 100" fill="none" style={{ filter: "drop-shadow(0 4px 12px rgba(14, 165, 233, 0.3))" }}>
    <defs>
      <linearGradient id="kCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="kPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <polygon points="15,10 35,10 35,31 25,41 15,41" fill="url(#kCyan)" stroke="url(#kCyan)" strokeWidth="8" strokeLinejoin="round" />
    <polygon points="15,59 25,59 35,69 35,90 15,90" fill="url(#kCyan)" stroke="url(#kCyan)" strokeWidth="8" strokeLinejoin="round" />
    <polygon points="45,40 70,15 80,25 55,50" fill="url(#kPurple)" stroke="url(#kPurple)" strokeWidth="8" strokeLinejoin="round" />
    <polygon points="45,60 55,50 80,75 70,85" fill="url(#kPurple)" stroke="url(#kPurple)" strokeWidth="8" strokeLinejoin="round" />
  </svg>
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <Link to="/" style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8", textDecoration: "none", padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>Explore Tools →</Link>
      </header>

      <div style={{ padding: "60px 5vw", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", background: "rgba(16,185,129,0.1)", color: "#34d399", borderRadius: "20px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Transition Calculator</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", margin: "0 0 16px 0", lineHeight: "1.1", letterSpacing: "-1px" }}>Salary vs Freelance</h1>
          <p style={{ fontSize: "16px", color: "#94a3b8", margin: 0, maxWidth: "600px", marginInline: "auto" }}>Find out exactly how much you need to charge as a freelancer to maintain your current full-time salaried lifestyle.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          {/* Left Panel - Inputs */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "24px" }}>Your Job Metrics</h2>
            
            <div style={{ display: "grid", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>In-Hand Monthly Salary (₹)</label>
                <input type="number" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} style={{ width: "100%", padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#f8fafc", fontSize: "16px", fontWeight: "600", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#10b981"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Annual Bonus (₹)</label>
                <input type="number" value={annualBonus} onChange={(e) => setAnnualBonus(e.target.value)} style={{ width: "100%", padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#f8fafc", fontSize: "16px", fontWeight: "600", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#10b981"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", margin: "8px 0" }}></div>

              <h2 style={{ fontSize: "18px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "4px" }}>Freelance Estimates</h2>

              <div>
                <label style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}><span>Freelance Expenses / Month</span> <span style={{color: "#10b981"}}>₹{fmt(monthlyExpenses)}</span></label>
                <input type="range" min="0" max="50000" step="1000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} style={{ width: "100%", accentColor: "#10b981" }} />
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Software, hardware, internet, health insurance.</p>
              </div>

              <div>
                <label style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}><span>Days off per year</span> <span style={{color: "#10b981"}}>{leaves} Days</span></label>
                <input type="range" min="0" max="100" step="1" value={leaves} onChange={(e) => setLeaves(e.target.value)} style={{ width: "100%", accentColor: "#10b981" }} />
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Holidays, sick days, vacations (excluding weekends).</p>
              </div>

              <div>
                <label style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}><span>Billable Hours / Day</span> <span style={{color: "#10b981"}}>{billableHours} Hours</span></label>
                <input type="range" min="1" max="12" step="1" value={billableHours} onChange={(e) => setBillableHours(e.target.value)} style={{ width: "100%", accentColor: "#10b981" }} />
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Time actually spent coding/designing for a client.</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div style={{ background: "linear-gradient(180deg, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "auto" }}>
              <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#34d399", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>Your Freelance Target</h2>
              
              <div style={{ marginBottom: "32px" }}>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "4px" }}>Target Hourly Rate</div>
                <div style={{ fontSize: "clamp(36px, 8vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#fff", lineHeight: "1", wordBreak: "break-all" }}>₹{fmt(hourlyRate)}<span style={{ fontSize: "16px", color: "#64748b", fontWeight: "600" }}>/hr</span></div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Daily Rate</div>
                  <div style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: "800", color: "#f8fafc", fontFamily: "'Syne',sans-serif", wordBreak: "break-all" }}>₹{fmt(dailyRate)}</div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Monthly Target</div>
                  <div style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: "800", color: "#f8fafc", fontFamily: "'Syne',sans-serif", wordBreak: "break-all" }}>₹{fmt(targetMonthlyRevenue)}</div>
                </div>
              </div>

              <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#f8fafc", marginBottom: "12px" }}>Why so high?</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", color: "#94a3b8", display: "grid", gap: "10px" }}>
                  <li style={{ display: "flex", gap: "8px" }}><span style={{ color: "#ef4444" }}>-</span> You only bill {billableHours} hrs/day.</li>
                  <li style={{ display: "flex", gap: "8px" }}><span style={{ color: "#ef4444" }}>-</span> You lose {weekends + num(leaves)} days to weekends/leaves.</li>
                  <li style={{ display: "flex", gap: "8px" }}><span style={{ color: "#ef4444" }}>-</span> You pay ₹{fmt(totalFreelanceExpenses)}/yr in expenses.</li>
                  <li style={{ display: "flex", gap: "8px" }}><span style={{ color: "#10b981" }}>+</span> Included 15% safety buffer for dry spells.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SEO FAQs */}
        <div style={{ marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "48px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "28px", textAlign: "center" }}>Frequently Asked Questions</h2>
          {[
            { q: "Why do freelancers need to charge more than salaried employees?", a: "Traditional jobs provide paid time off, health insurance, hardware, and provident funds. Freelancers pay for this out-of-pocket. The margin covers software licenses, sick days, taxes, and ensures your freelance business can actually grow rather than just survive." },
            { q: "What are 'Billable' vs 'Non-Billable' hours?", a: "If you work 8 hours a day, you usually only do 4-6 hours of actual client work. The rest is spent on admin, answering emails, pitching, and invoicing. You must calculate your minimum rate based only on the hours you can strictly bill to a client." },
            { q: "What is the 15% safety buffer?", a: "Freelancers experience 'dry spells' where they have no clients. A 15% premium is added to your baseline to ensure you can still pay your rent during slow months." }
          ].map(item => (
            <div key={item.q} style={{ marginBottom: "24px", background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#10b981", marginBottom: "8px", fontFamily: "'Syne',sans-serif" }}>{item.q}</h3>
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
