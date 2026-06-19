"use client";
import { useEffect } from "react";
import Link from "next/link";

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
      title: "Section 44ADA Calculator",
      subtitle: "For Freelancers < ₹75L",
      desc: "Get a flat 50% deduction on your income. Perfect for software developers, consultants, and creators under the presumptive taxation scheme.",
      icon: "⚡",
      path: "/44ada-tax-calculator",
      color: "#0076ff",
      bg: "rgba(0,118,255,0.1)",
      popular: true
    },
    {
      title: "Income Tax Calculator",
      subtitle: "Actual Expense Method",
      desc: "Calculate your exact tax liability under the New Tax Regime by claiming actual business expenses. Perfect for agencies and high earners.",
      icon: "⚖️",
      path: "/normal-tax-calculator",
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.1)",
      popular: false
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
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", paddingBottom: "100px" }}>
      

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 5vw", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
            <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
              Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
            </span>
          </div>
        </Link>
        <Link href="/" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Home</Link>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 5vw 0" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "16px", color: "#f8fafc", lineHeight: 1.1 }}>
            Income Tax <span style={{ background: "linear-gradient(135deg,#0076ff,#005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculators</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(16px, 3vw, 18px)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Indian tax laws are complex. Choose the calculator that fits your specific freelance situation.
          </p>
        </div>

        {/* Hub Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {calculators.map((calc, idx) => (
            <Link key={idx} href={calc.path} style={{ textDecoration: 'none', display: 'block' }}>
              <div 
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
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
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
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
                <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "8px" }}>{calc.title}</h2>
                <p style={{ fontSize: "13px", fontWeight: "700", color: calc.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>{calc.subtitle}</p>
                <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
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
