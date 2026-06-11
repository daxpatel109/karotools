"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // SEO Injection
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SIP Calculator India - Free Mutual Fund Returns Calculator | KaroTools";
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free SIP Calculator India",
      "url": "https://karotools.in/sip-calculator",
      "description": "Calculate your Mutual Fund and SIP returns in India. Free compounding calculator showing invested amount vs expected returns over time.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    };

    let script = document.querySelector("#sip-schema");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "sip-schema";
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify(schema);
  }, []);

  // SIP Math Logic
  // Formula: M = P * ({[1 + i]^n - 1} / i) * (1 + i)
  const calculateSIP = () => {
    const P = monthlyInvestment;
    const i = (returnRate / 100) / 12;
    const n = timePeriod * 12;
    
    if (returnRate === 0) {
      return {
        totalInvested: P * n,
        estReturns: 0,
        totalValue: P * n
      };
    }

    const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvested = P * n;
    const estReturns = M - totalInvested;

    return {
      totalInvested: Math.round(totalInvested),
      estReturns: Math.round(estReturns),
      totalValue: Math.round(M)
    };
  };

  const results = calculateSIP();

  // Helper for formatting numbers in Indian format
  const formatINR = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const percentageInvested = (results.totalInvested / results.totalValue) * 100;
  const percentageReturns = (results.estReturns / results.totalValue) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Background Orbs */}
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Navbar */}
      <nav style={{ padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>Home</Link>
          <Link href="/blog" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>Blog</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 24px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", padding: "8px 16px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em", display: "inline-block", marginBottom: "16px" }}>
            COMPOUNDING CALCULATOR
          </span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            SIP Return Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "18px", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Calculate the future value of your monthly Mutual Fund investments and see the true power of compounding.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "32px" }}>
          
          {/* Controls Panel */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Syne',sans-serif", marginBottom: "32px", color: "#f8fafc" }}>Investment Details</h2>
            
            {/* Monthly Investment */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <label style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8" }}>Monthly Investment</label>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#34d399", background: "rgba(16,185,129,0.1)", padding: "4px 12px", borderRadius: "8px" }}>
                  {formatINR(monthlyInvestment)}
                </span>
              </div>
              <input 
                type="range" 
                min="500" max="100000" step="500"
                value={monthlyInvestment} 
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#10b981", height: "6px", borderRadius: "10px", outline: "none", WebkitAppearance: "none", background: "rgba(255,255,255,0.1)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#475569", fontWeight: "600" }}>
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Expected Return */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <label style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8" }}>Expected Return Rate (p.a)</label>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#f8fafc", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: "8px" }}>
                  {returnRate}%
                </span>
              </div>
              <input 
                type="range" 
                min="1" max="30" step="0.5"
                value={returnRate} 
                onChange={(e) => setReturnRate(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#10b981", height: "6px", borderRadius: "10px", outline: "none", WebkitAppearance: "none", background: "rgba(255,255,255,0.1)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#475569", fontWeight: "600" }}>
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Time Period */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <label style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8" }}>Time Period</label>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#f8fafc", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: "8px" }}>
                  {timePeriod} {timePeriod === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input 
                type="range" 
                min="1" max="40" step="1"
                value={timePeriod} 
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#10b981", height: "6px", borderRadius: "10px", outline: "none", WebkitAppearance: "none", background: "rgba(255,255,255,0.1)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#475569", fontWeight: "600" }}>
                <span>1 Yr</span>
                <span>40 Yrs</span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(2,6,23,0))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3 style={{ fontSize: "16px", color: "#34d399", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.05em" }}>ESTIMATED TOTAL VALUE</h3>
              <div style={{ fontSize: "clamp(32px, 8vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#fff", marginBottom: "40px", lineHeight: 1.1, wordBreak: "break-all" }}>
                {formatINR(results.totalValue)}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "24px", marginBottom: "40px" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#3b82f6" }}></div>
                    Total Invested
                  </div>
                  <div style={{ fontSize: "clamp(18px, 5vw, 24px)", fontWeight: "700", color: "#f8fafc", wordBreak: "break-all" }}>
                    {formatINR(results.totalInvested)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#10b981" }}></div>
                    Wealth Gained
                  </div>
                  <div style={{ fontSize: "clamp(18px, 5vw, 24px)", fontWeight: "700", color: "#34d399", wordBreak: "break-all" }}>
                    {formatINR(results.estReturns)}
                  </div>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div style={{ width: "100%", height: "24px", borderRadius: "12px", background: "#0f172a", display: "flex", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: `${percentageInvested}%`, background: "#3b82f6", transition: "width 0.3s ease" }}></div>
                <div style={{ width: `${percentageReturns}%`, background: "#10b981", transition: "width 0.3s ease" }}></div>
              </div>
            </div>

            {/* Decor */}
            <div style={{ position: "absolute", bottom: "-30px", right: "-30px", fontSize: "200px", opacity: 0.03, pointerEvents: "none" }}>₹</div>
          </div>
        </div>

        {/* SEO Text Content below calculator */}
        <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "60px", maxWidth: "800px", margin: "80px auto 0" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "24px", color: "#f1f5f9" }}>How does a SIP Calculator work?</h2>
          <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.7", marginBottom: "24px" }}>
            A Systematic Investment Plan (SIP) allows you to invest a fixed amount of money at regular intervals into mutual funds. The true power of a SIP comes from <strong>compounding</strong>, where your returns start generating their own returns over time.
          </p>
          <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.7", marginBottom: "60px" }}>
            This free SIP calculator uses the standard compound interest formula to project the future value of your investments in India, assuming a constant rate of return. While mutual funds are subject to market risks, historical data for Indian index funds (like Nifty 50) shows an average long-term return of 12% to 15%.
          </p>

          <h2 style={{ fontSize: "32px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "32px", color: "#f1f5f9" }}>Frequently Asked Questions (FAQ)</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f8fafc", marginBottom: "12px" }}>What is a good expected return rate to input?</h3>
              <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
                If you are investing in Indian equity mutual funds or index funds (like the Nifty 50) for a long-term horizon (7+ years), a conservative and realistic expected return rate is typically between <strong>10% to 12% per annum</strong>. Small-cap funds may offer higher returns but come with much higher risk.
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f8fafc", marginBottom: "12px" }}>Are SIP returns taxable in India?</h3>
              <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
                Yes. For equity mutual funds, if you hold the investment for more than 1 year, the gains are classified as Long Term Capital Gains (LTCG). Currently, LTCG over ₹1 Lakh in a financial year is taxed at 10% (plus applicable surcharge and cess) without indexation benefits.
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f8fafc", marginBottom: "12px" }}>What is the formula used in this SIP calculator?</h3>
              <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
                We use the standard mathematical compounding formula: <strong>M = P × ({"{[1 + i]^n - 1}"} / i) × (1 + i)</strong>. Where 'M' is the total maturity amount, 'P' is the monthly investment, 'i' is the monthly interest rate (annual rate / 12 / 100), and 'n' is the total number of months.
              </p>
            </div>
          </div>
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
