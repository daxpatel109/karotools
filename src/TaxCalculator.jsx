"use client";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function TaxCalculatorHub() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Freelance Income Tax Calculators India | KaroTools";
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Choose the right tax calculator for your freelance business. Section 44ADA (Presumptive), Normal Regime (>75L), or Advance Tax liability.";
  }, []);

  const calculators = [
    {
      title: "Freelance Tax Calculator",
      subtitle: "44ADA vs Actual Expenses",
      desc: "Compare Section 44ADA vs Normal Provisions side-by-side to find out which tax scheme saves you more money.",
      icon: "⚖️",
      path: "/44ada-tax-calculator",
      color: "#0076ff",
      bg: "rgba(0,118,255,0.1)",
      popular: true
    },
    {
      title: "Advance Tax Calculator",
      subtitle: "Quarterly Tax Payments",
      desc: "Calculate exactly how much you need to pay in the 4 quarterly advance tax installments (15%, 45%, 75%, 100%) to avoid 234B/234C penalties.",
      icon: "📅",
      path: "/advance-tax-calculator",
      color: "#00c6ff",
      bg: "rgba(0,198,255,0.1)",
      popular: false
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)", paddingBottom: "100px" }}>
      

      {/* Navbar */}
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 5vw 0" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "16px", color: "var(--text-primary)", lineHeight: 1.1 }}>
            Income Tax <span style={{ background: "linear-gradient(135deg,#0076ff,#005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculators</span>
          </h1>

          {/* COMPLIANCE BADGE */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "6px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            FY 2026-27 Updated
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "clamp(16px, 3vw, 18px)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Indian tax laws are complex. Choose the calculator that fits your specific freelance situation.
          </p>
        </div>

        {/* Hub Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {calculators.map((calc, idx) => (
            <Link key={idx} href={calc.path} style={{ textDecoration: 'none', display: 'block' }}>
              <div 
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "24px",
                  padding: "32px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = calc.color;
                  e.currentTarget.style.boxShadow = `0 10px 30px ${calc.bg}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {calc.popular && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: calc.color, color: "#fff", fontSize: "11px", fontWeight: "800", padding: "4px 10px", borderRadius: "20px", textTransform: "uppercase" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ width: "56px", height: "56px", background: calc.bg, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "24px" }}>
                  {calc.icon}
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "8px" }}>{calc.title}</h2>
                <p style={{ fontSize: "13px", fontWeight: "700", color: calc.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>{calc.subtitle}</p>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                  {calc.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
