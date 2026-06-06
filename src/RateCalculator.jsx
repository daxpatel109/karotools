import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function RateCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [desiredSavings, setDesiredSavings] = useState(20000);
  const [workingDays, setWorkingDays] = useState(22);
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [profitMargin, setProfitMargin] = useState(20);

  // 🚀 SEO Meta & JSON-LD Schema Injection
  useEffect(() => {
    document.title = "3D Freelance Rate & Tier Calculator | KaroTools";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Calculate your exact freelance rates and auto-generate SaaS-style tiered pricing packages. Free premium tool with PDF reports.";

    // Software Application Schema for Google Rich Snippets
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "KaroTools Freelance Rate Calculator",
      "operatingSystem": "WebBrowser",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": "A free, 3D interactive tool for freelancers to calculate hourly rates and auto-generate client pricing tiers."
    });
    document.head.appendChild(schemaScript);

    return () => {
      if (document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript);
      }
    };
  }, []);

  // Calculation Logic
  const monthlyTarget = monthlyExpenses + desiredSavings;
  const withProfit = monthlyTarget * (1 + profitMargin / 100);
  const dailyRate = Math.round(withProfit / workingDays);
  const hourlyRate = Math.round(dailyRate / hoursPerDay);
  const projectRate = Math.round(withProfit);
  const weeklyRate = Math.round(dailyRate * 5);

  // SaaS Tier Generator
  const tierStarter = Math.round(hourlyRate * 10);
  const tierPro = Math.round(hourlyRate * 25);
  const tierElite = Math.round(hourlyRate * 50);

  const fmt = (val) => isNaN(Number(val)) ? "0" : Number(val).toLocaleString("en-IN");

  const presets = [
    { label: "🌱 Beginner", expenses: 20000, savings: 10000, days: 22, hours: 8, margin: 10 },
    { label: "🚀 Mid-Level", expenses: 40000, savings: 20000, days: 22, hours: 6, margin: 25 },
    { label: "⚡ Expert", expenses: 70000, savings: 40000, days: 20, hours: 5, margin: 40 },
    { label: "💎 Premium", expenses: 100000, savings: 60000, days: 18, hours: 4, margin: 60 },
  ];

  const applyPreset = (preset) => {
    setMonthlyExpenses(preset.expenses);
    setDesiredSavings(preset.savings);
    setWorkingDays(preset.days);
    setHoursPerDay(preset.hours);
    setProfitMargin(preset.margin);
  };

  // 🚀 3D ENGINE
  const handleMouseMove = (e, ref) => {
    if (!ref.current || window.innerWidth < 768) return; 
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    ref.current.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(14, 165, 233, 0.3)`;
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    ref.current.style.boxShadow = `0 24px 60px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)`;
  };

  const heroRef = useRef(null);
  const starterRef = useRef(null);
  const proRef = useRef(null);
  const eliteRef = useRef(null);

  const handleDownloadReport = () => window.print();

  // 🚀 FLUID HYBRID INPUT
  const HybridInput = ({ label, value, setter, min, max, step, prefix = "", suffix = "", color = "#0ea5e9" }) => {
    const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

    return (
      <div className="glass-panel hybrid-input-card no-print" style={{ borderRadius: "20px", padding: "clamp(16px, 3vw, 24px)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.08em", flex: "1 1 120px", wordWrap: "break-word" }}>{label}</label>
          
          <div className="input-focus-wrap" style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "8px 16px", transition: "all 0.3s ease", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)", flex: "1 1 auto", minWidth: "160px" }}>
            {prefix && <span style={{ color: "#64748b", fontWeight: "700", marginRight: "6px", fontSize: "16px" }}>{prefix}</span>}
            <input 
              type="number" 
              value={value === 0 ? "" : value} 
              onChange={(e) => setter(e.target.value === "" ? 0 : Number(e.target.value))}
              onBlur={() => {
                if(value < min) setter(min);
                if(value > max) setter(max);
              }}
              style={{ background: "transparent", border: "none", color: color, fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "800", width: "100%", flex: 1, textAlign: "right", outline: "none", fontFamily: "'Syne', sans-serif", letterSpacing: "1px" }}
            />
            {suffix && <span style={{ color: "#64748b", fontWeight: "700", marginLeft: "6px", fontSize: "14px" }}>{suffix}</span>}
          </div>
        </div>
        
        <div style={{ position: "relative", width: "100%", padding: "10px 0" }}>
          <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={value} 
            onChange={(e) => setter(Number(e.target.value))}
            style={{ background: `linear-gradient(90deg, ${color} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)` }} 
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "8px", fontWeight: "600" }}>
          <span>{prefix}{fmt(min)}{suffix}</span>
          <span>{prefix}{fmt(max)}{suffix}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", selectionColor: "#fff", selectionBackground: "#0ea5e9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(14, 165, 233, 0.4); color: white; }
        ::-moz-selection { background: rgba(14, 165, 233, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }

        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          transform-style: preserve-3d;
        }

        .interactive-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .interactive-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(14, 165, 233, 0.25);
        }
        .interactive-btn:active { transform: translateY(1px) scale(0.98); }

        .preset-btn {
          padding: 12px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          white-space: nowrap;
        }
        .preset-btn:hover {
          transform: translateY(-2px);
          background: rgba(14, 165, 233, 0.15);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.15);
        }

        .brand-text {
          background: linear-gradient(135deg, #0ea5e9, #14b8a6, #0ea5e9);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .input-focus-wrap:focus-within {
          border-color: rgba(56, 189, 248, 0.6) !important;
          background: rgba(14, 165, 233, 0.1) !important;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15), inset 0 2px 4px rgba(0,0,0,0.2) !important;
        }

        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
          cursor: grab;
        }
        input[type=range]:active { cursor: grabbing; }
        
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ffffff;
          margin-top: -10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 6px rgba(255, 255, 255, 0.1);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        input[type=range]::-webkit-slider-thumb:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 0 8px rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          border-radius: 4px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
        }
        input[type=range]:focus { outline: none; }

        .responsive-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .tier-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 768px) { 
          .responsive-grid { grid-template-columns: 1fr 1fr; } 
          .tier-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        
        .mobile-pad { padding: 40px 20px 80px; }
        @media (min-width: 640px) { .mobile-pad { padding: 56px 24px 100px; } }

        /* Print formatting */
        @media print {
          body { background: #ffffff !important; color: #000000 !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .glass-panel { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; box-shadow: none !important; color: #0f172a !important; break-inside: avoid; transform: none !important; }
          .brand-text, .text-gradient { -webkit-text-fill-color: #0f172a !important; background: none !important; color: #0f172a !important; }
          h1, h2, h3, p, span, div { color: #0f172a !important; }
          .print-header { border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px; }
        }
      `}} />

      {/* Ambient Premium Background */}
      <div className="no-print" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      <nav className="glass-panel no-print" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "24px" }}>⚡</span>
            <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif" }} className="brand-text">KaroTools</span>
          </div>
          <Link to="/" className="interactive-btn" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1", textDecoration: "none", padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            ← Home
          </Link>
        </div>
      </nav>

      <div className="print-only print-header" style={{ display: "none", textAlign: "center", paddingTop: "20px" }}>
        <h1 style={{ fontSize: "32px", fontFamily: "'Syne',sans-serif", margin: "0 0 10px 0" }}>Freelance Rate Strategy & Proposal</h1>
        <p style={{ margin: 0, fontSize: "16px", color: "#64748b" }}>Generated securely via KaroTools • {new Date().toLocaleDateString('en-IN')}</p>
      </div>

      <div className="mobile-pad" style={{ maxWidth: "1024px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div className="no-print" style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 48px)", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>💎</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", letterSpacing: "-0.02em", background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rate & Tier Matrix</h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(14px, 3vw, 16px)", fontWeight: "400", letterSpacing: "0.01em" }}>Design your financial baseline and auto-generate client packages.</p>
        </div>

        <div className="no-print" style={{ marginBottom: "32px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "12px", WebkitOverflowScrolling: "touch" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => applyPreset(p)} className="preset-btn">
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="no-print" style={{ animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)", marginBottom: "40px" }}>
          <div className="responsive-grid">
            <HybridInput label="Monthly Expenses" value={monthlyExpenses} setter={setMonthlyExpenses} min={10000} max={500000} step={1000} prefix="₹" color="#0ea5e9" />
            <HybridInput label="Desired Savings" value={desiredSavings} setter={setDesiredSavings} min={0} max={300000} step={1000} prefix="₹" color="#14b8a6" />
            <HybridInput label="Working Days / Month" value={workingDays} setter={setWorkingDays} min={5} max={30} step={1} suffix="Days" color="#8b5cf6" />
            <HybridInput label="Billable Hrs / Day" value={hoursPerDay} setter={setHoursPerDay} min={1} max={14} step={1} suffix="Hrs" color="#f43f5e" />
          </div>
          <div style={{ marginTop: "20px" }}>
            <HybridInput label="Profit Margin / Buffer" value={profitMargin} setter={setProfitMargin} min={0} max={100} step={1} suffix="%" color="#f59e0b" />
          </div>
        </div>

        {/* Dynamic 3D Result Section */}
        <div style={{ animation: "fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          
          <div 
            ref={heroRef}
            onMouseMove={(e) => handleMouseMove(e, heroRef)}
            onMouseLeave={() => handleMouseLeave(heroRef)}
            style={{ background: "linear-gradient(145deg, rgba(14, 165, 233, 0.15), rgba(20,184,166,0.1))", border: "1px solid rgba(14, 165, 233, 0.3)", borderRadius: "28px", padding: "clamp(32px, 6vw, 48px) clamp(20px, 4vw, 24px)", textAlign: "center", marginBottom: "48px", position: "relative", transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out", transformStyle: "preserve-3d" }}
          >
            <div className="no-print" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
            
            <p style={{ color: "#bae6fd", fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", transform: "translateZ(30px)", wordWrap: "break-word" }}>Base Minimum Hourly Rate</p>
            <p className="text-gradient" style={{ fontSize: "clamp(48px, 10vw, 72px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #ffffff, #bae6fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, filter: "drop-shadow(0 4px 20px rgba(14, 165, 233, 0.3))", transform: "translateZ(50px)", wordBreak: "break-word" }}>
              ₹{fmt(hourlyRate)}
            </p>
            
            <div className="responsive-grid no-print" style={{ marginTop: "40px", gap: "12px", transform: "translateZ(20px)" }}>
              {[
                { label: "Daily Rate Target", value: dailyRate, color: "#93c5fd", icon: "☀️" },
                { label: "Weekly Target", value: weeklyRate, color: "#a78bfa", icon: "📅" },
                { label: "Monthly Goal", value: projectRate, color: "#fcd34d", icon: "🎯" },
              ].map((item) => (
                <div key={item.label} style={{ background: "rgba(0,0,0,0.3)", borderRadius: "16px", padding: "clamp(12px, 2vw, 16px)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{item.icon}</span>
                    <span style={{ color: "#94a3b8", fontSize: "clamp(10px, 2vw, 12px)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "800", color: item.color, fontFamily: "'Syne',sans-serif" }}>₹{fmt(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SAAS PACKAGE GENERATOR */}
          <div style={{ marginBottom: "48px" }}>
            <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ flex: "1 1 300px" }}>
                <h2 style={{ fontSize: "clamp(24px, 5vw, 28px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "8px" }}>Client Packaging Matrix</h2>
                <p style={{ color: "#94a3b8", fontSize: "clamp(14px, 3vw, 15px)" }}>Never quote hourly again. Pitch these SaaS-style productized tiers based on your rate.</p>
              </div>
              <button onClick={handleDownloadReport} className="interactive-btn" style={{ padding: "12px 24px", background: "linear-gradient(135deg, #0ea5e9, #2563eb)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", fontSize: "14px", display: "flex", gap: "8px", alignItems: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(14, 165, 233, 0.3)", whiteSpace: "nowrap" }}>
                📄 Export PDF Report
              </button>
            </div>

            <div className="tier-grid">
              {/* Starter Tier */}
              <div 
                ref={starterRef}
                onMouseMove={(e) => handleMouseMove(e, starterRef)}
                onMouseLeave={() => handleMouseLeave(starterRef)}
                className="glass-panel" 
                style={{ borderRadius: "20px", padding: "clamp(24px, 4vw, 32px)", borderTop: "4px solid #94a3b8", transition: "transform 0.1s ease-out", transformStyle: "preserve-3d" }}
              >
                <h3 style={{ fontSize: "clamp(18px, 4vw, 20px)", fontWeight: "800", color: "#f8fafc", fontFamily: "'Syne',sans-serif", transform: "translateZ(20px)" }}>Starter / Audit</h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", transform: "translateZ(20px)", minHeight: "40px" }}>Perfect for quick audits or minimal viable setups.</p>
                <div style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "800", color: "#e2e8f0", fontFamily: "'Syne',sans-serif", marginBottom: "24px", transform: "translateZ(40px)", wordBreak: "break-word" }}>₹{fmt(tierStarter)}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#cbd5e1", fontSize: "14px", transform: "translateZ(10px)" }}>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#38bdf8" }}>✓</span> ~10 Hours of Focus</li>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#38bdf8" }}>✓</span> Standard Delivery</li>
                  <li style={{ display: "flex", gap: "8px" }}><span style={{ color: "#38bdf8" }}>✓</span> 1 Revision Round</li>
                </ul>
              </div>

              {/* Standard/Pro Tier */}
              <div 
                ref={proRef}
                onMouseMove={(e) => handleMouseMove(e, proRef)}
                onMouseLeave={() => handleMouseLeave(proRef)}
                className="glass-panel" 
                style={{ borderRadius: "20px", padding: "clamp(24px, 4vw, 32px)", background: "linear-gradient(180deg, rgba(14, 165, 233, 0.1) 0%, rgba(255,255,255,0.02) 100%)", borderTop: "4px solid #0ea5e9", position: "relative", transition: "transform 0.1s ease-out", transformStyle: "preserve-3d" }}
              >
                <div className="no-print" style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%) translateZ(30px)", background: "#0ea5e9", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", whiteSpace: "nowrap" }}>Most Popular</div>
                <h3 style={{ fontSize: "clamp(18px, 4vw, 20px)", fontWeight: "800", color: "#38bdf8", fontFamily: "'Syne',sans-serif", transform: "translateZ(20px)" }}>Professional</h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", transform: "translateZ(20px)", minHeight: "40px" }}>The standard engagement for complete execution.</p>
                <div style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "800", color: "#fff", fontFamily: "'Syne',sans-serif", marginBottom: "24px", transform: "translateZ(40px)", wordBreak: "break-word" }}>₹{fmt(tierPro)}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#cbd5e1", fontSize: "14px", transform: "translateZ(10px)" }}>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#38bdf8" }}>✓</span> ~25 Hours of Focus</li>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#38bdf8" }}>✓</span> Priority Delivery</li>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#38bdf8" }}>✓</span> 3 Revision Rounds</li>
                  <li style={{ display: "flex", gap: "8px" }}><span style={{ color: "#38bdf8" }}>✓</span> Strategy Session</li>
                </ul>
              </div>

              {/* Elite Tier */}
              <div 
                ref={eliteRef}
                onMouseMove={(e) => handleMouseMove(e, eliteRef)}
                onMouseLeave={() => handleMouseLeave(eliteRef)}
                className="glass-panel" 
                style={{ borderRadius: "20px", padding: "clamp(24px, 4vw, 32px)", borderTop: "4px solid #14b8a6", transition: "transform 0.1s ease-out", transformStyle: "preserve-3d" }}
              >
                <h3 style={{ fontSize: "clamp(18px, 4vw, 20px)", fontWeight: "800", color: "#14b8a6", fontFamily: "'Syne',sans-serif", transform: "translateZ(20px)" }}>Premium Retainer</h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", transform: "translateZ(20px)", minHeight: "40px" }}>High-touch involvement. Acts as an integrated team.</p>
                <div style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "800", color: "#e2e8f0", fontFamily: "'Syne',sans-serif", marginBottom: "24px", transform: "translateZ(40px)", wordBreak: "break-word" }}>₹{fmt(tierElite)}<span style={{ fontSize: "16px", color: "#64748b" }}>/mo</span></div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#cbd5e1", fontSize: "14px", transform: "translateZ(10px)" }}>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#14b8a6" }}>✓</span> ~50 Hours of Focus</li>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#14b8a6" }}>✓</span> White-Glove Support</li>
                  <li style={{ marginBottom: "12px", display: "flex", gap: "8px" }}><span style={{ color: "#14b8a6" }}>✓</span> Unlimited Revisions</li>
                  <li style={{ display: "flex", gap: "8px" }}><span style={{ color: "#14b8a6" }}>✓</span> Weekly Sync Calls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 SEO FAQ Section */}
        <div className="no-print" style={{ position: "relative", marginTop: "40px" }}>
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          
          <div style={{ paddingTop: "64px", paddingBottom: "20px" }}>
            <h2 style={{ fontSize: "clamp(24px, 5vw, 28px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "32px", textAlign: "center" }}>Freelance Pricing FAQs</h2>
            
            <div className="responsive-grid" style={{ gap: "24px" }}>
              {[
                { q: "Why do I need a Profit Margin buffer?", a: "Traditional jobs provide paid time off, health insurance, hardware, and provident funds. Freelancers pay for this out-of-pocket. The margin covers software licenses, sick days, taxes, and ensures your freelance business can actually grow rather than just survive." },
                { q: "What are 'Billable' vs 'Non-Billable' hours?", a: "If you work 8 hours a day, you usually only do 5-6 hours of actual client work. The rest is spent on admin, answering emails, pitching, and invoicing. You must calculate your minimum rate based only on the hours you can strictly bill to a client." },
                { q: "Should I quote my hourly rate directly to clients?", a: "Generally, no. Use this calculator to find your internal baseline. Once you know your minimum hourly rate, estimate how long a project will take, multiply it by this rate, and pitch a Flat Project Package (like the tiers above). Clients prefer predictable flat fees over open-ended hourly contracts." },
                { q: "Does this calculation include GST or TDS?", a: "This calculator helps you find your base take-home requirement. If you are registered for GST in India, you should add 18% GST on top of your final quoted price. Additionally, consider client TDS (Tax Deducted at Source) deductions when calculating your final cash flow." }
              ].map((item, i) => (
                <div key={item.q} className="glass-panel" style={{ padding: "clamp(24px, 4vw, 32px)", borderRadius: "20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ background: "rgba(14, 165, 233, 0.15)", color: "#38bdf8", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", flexShrink: 0, marginTop: "2px", boxShadow: "0 0 12px rgba(14, 165, 233, 0.2)" }}>
                      {i + 1}
                    </div>
                    <h3 style={{ fontSize: "clamp(16px, 3vw, 18px)", fontWeight: "700", color: "#f1f5f9", fontFamily: "'Syne',sans-serif", lineHeight: "1.4" }}>{item.q}</h3>
                  </div>
                  <p style={{ fontSize: "clamp(14px, 2.5vw, 15px)", color: "#94a3b8", lineHeight: "1.8", paddingLeft: "44px" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
