import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RateCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [desiredSavings, setDesiredSavings] = useState(20000);
  const [workingDays, setWorkingDays] = useState(22);
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [profitMargin, setProfitMargin] = useState(20);

  // SEO Injection
  useEffect(() => {
    document.title = "Freelance Hourly Rate Calculator India | KaroTools";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Calculate your exact freelance hourly, daily, and monthly rates based on your expenses and desired profit margin. Free hybrid calculator tool for Indian freelancers.";
  }, []);

  // Calculation Logic
  const monthlyTarget = monthlyExpenses + desiredSavings;
  const withProfit = monthlyTarget * (1 + profitMargin / 100);
  const dailyRate = Math.round(withProfit / workingDays);
  const hourlyRate = Math.round(dailyRate / hoursPerDay);
  const projectRate = Math.round(withProfit);
  const weeklyRate = Math.round(dailyRate * 5);

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

  // 🚀 NEXT-LEVEL HYBRID INPUT COMPONENT
  const HybridInput = ({ label, value, setter, min, max, step, prefix = "", suffix = "", color = "#0ea5e9" }) => {
    // Calculate percentage for the dynamic slider fill
    const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

    return (
      <div className="glass-panel hybrid-input-card" style={{ borderRadius: "20px", padding: "24px", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <label style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
          
          {/* Precision Text Input */}
          <div className="input-focus-wrap" style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "8px 16px", transition: "all 0.3s ease", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
            {prefix && <span style={{ color: "#64748b", fontWeight: "700", marginRight: "6px", fontSize: "16px" }}>{prefix}</span>}
            <input 
              type="number" 
              value={value === 0 ? "" : value} 
              onChange={(e) => setter(e.target.value === "" ? 0 : Number(e.target.value))}
              onBlur={() => {
                // Auto-correct out of bounds numbers when user clicks away
                if(value < min) setter(min);
                if(value > max) setter(max);
              }}
              style={{ background: "transparent", border: "none", color: color, fontSize: "20px", fontWeight: "800", width: "80px", textAlign: "right", outline: "none", fontFamily: "'Syne', sans-serif" }}
            />
            {suffix && <span style={{ color: "#64748b", fontWeight: "700", marginLeft: "6px", fontSize: "14px" }}>{suffix}</span>}
          </div>
        </div>
        
        {/* Dynamic Range Slider */}
        <div style={{ position: "relative", width: "100%", padding: "10px 0" }}>
          <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={value} 
            onChange={(e) => setter(Number(e.target.value))}
            style={{ 
              background: `linear-gradient(90deg, ${color} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)` 
            }} 
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
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(14, 165, 233, 0.4); color: white; }
        ::-moz-selection { background: rgba(14, 165, 233, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%{box-shadow: 0 0 50px rgba(14, 165, 233, 0.15)} 50%{box-shadow: 0 0 80px rgba(14, 165, 233, 0.3)} 100%{box-shadow: 0 0 50px rgba(14, 165, 233, 0.15)} }

        /* Hide Number Input Spinners */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
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
          animation: shine 4s linear infinite;
        }
        @keyframes shine { to { background-position: 200% center; } }

        /* Hybrid Input Focus States */
        .input-focus-wrap:focus-within {
          border-color: rgba(56, 189, 248, 0.6) !important;
          background: rgba(14, 165, 233, 0.1) !important;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15), inset 0 2px 4px rgba(0,0,0,0.2) !important;
        }
        .hybrid-input-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.12);
        }

        /* Custom Range Slider Upgrade */
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

        /* Responsive Grids */
        .responsive-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 768px) { .responsive-grid { grid-template-columns: 1fr 1fr; } }
        
        /* Mobile Specific Padding Adjustments */
        .mobile-pad { padding: 40px 20px 80px; }
        @media (min-width: 640px) { .mobile-pad { padding: 56px 24px 100px; } }
      `}} />

      {/* Ambient Premium Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      {/* Navbar */}
      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif" }} className="brand-text">⚡ KaroTools</span>
          <Link to="/" className="interactive-btn" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1", textDecoration: "none", padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            ← Home
          </Link>
        </div>
      </nav>

      <div className="mobile-pad" style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>💎</span>
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", letterSpacing: "-0.02em", background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rate Calculator</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "400", letterSpacing: "0.01em" }}>Find your perfect hourly, daily & monthly baseline.</p>
        </div>

        {/* Quick Presets (Scrollable on mobile) */}
        <div style={{ marginBottom: "32px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", marginLeft: "4px" }}>Career Presets</p>
          <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px", WebkitOverflowScrolling: "touch" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => applyPreset(p)} className="preset-btn">
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hybrid Inputs Grid */}
        <div style={{ animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)", marginBottom: "40px" }}>
          <div className="responsive-grid">
            <HybridInput label="Monthly Expenses" value={monthlyExpenses} setter={setMonthlyExpenses} min={10000} max={250000} step={1000} prefix="₹" color="#0ea5e9" />
            <HybridInput label="Desired Savings" value={desiredSavings} setter={setDesiredSavings} min={0} max={200000} step={1000} prefix="₹" color="#14b8a6" />
            <HybridInput label="Working Days / Month" value={workingDays} setter={setWorkingDays} min={5} max={30} step={1} suffix="Days" color="#8b5cf6" />
            <HybridInput label="Billable Hrs / Day" value={hoursPerDay} setter={setHoursPerDay} min={1} max={14} step={1} suffix="Hrs" color="#f43f5e" />
          </div>
          
          <div style={{ marginTop: "20px" }}>
            <HybridInput label="Profit Margin / Buffer (Sick days, Taxes, Growth)" value={profitMargin} setter={setProfitMargin} min={0} max={100} step={1} suffix="%" color="#f59e0b" />
          </div>
        </div>

        {/* Results Section */}
        <div style={{ animation: "fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          
          {/* Main Hero Rate */}
          <div style={{ background: "linear-gradient(145deg, rgba(14, 165, 233, 0.15), rgba(20,184,166,0.1))", border: "1px solid rgba(14, 165, 233, 0.3)", borderRadius: "28px", padding: "48px 24px", textAlign: "center", marginBottom: "24px", position: "relative", overflow: "hidden", animation: "glowPulse 4s infinite" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
            
            <p style={{ color: "#bae6fd", fontSize: "14px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Minimum Hourly Rate</p>
            <p style={{ fontSize: "64px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #ffffff, #bae6fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, filter: "drop-shadow(0 4px 20px rgba(14, 165, 233, 0.3))" }}>
              ₹{fmt(hourlyRate)}
            </p>
            <div style={{ display: "inline-flex", background: "rgba(0,0,0,0.25)", padding: "10px 20px", borderRadius: "30px", marginTop: "24px", border: "1px solid rgba(255,255,255,0.05)", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px", color: "#cbd5e1" }}>Never accept a project below this equivalent.</span>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="responsive-grid" style={{ marginBottom: "32px" }}>
            {[
              { label: "Daily Rate Target", value: dailyRate, color: "#93c5fd", icon: "☀️" },
              { label: "Weekly Baseline", value: weeklyRate, color: "#a78bfa", icon: "📅" },
              { label: "Total Monthly Goal", value: projectRate, color: "#fcd34d", icon: "🎯" },
            ].map((item, idx) => (
              <div key={item.label} className="glass-panel" style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "transform 0.3s", cursor: "default" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  <p style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                </div>
                <p style={{ fontSize: "32px", fontWeight: "800", color: item.color, fontFamily: "'Syne',sans-serif", textShadow: `0 4px 12px ${item.color}40` }}>₹{fmt(item.value)}</p>
              </div>
            ))}
          </div>

          {/* Transparent Formula */}
          <div style={{ background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "20px", padding: "24px", marginBottom: "48px" }}>
            <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>The Math Behind This</p>
            <div style={{ color: "#cbd5e1", fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.02em", background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", lineHeight: "2.2", overflowX: "auto" }}>
              <span style={{ color: "#94a3b8" }}>1. Base Target:</span> (₹{fmt(monthlyExpenses)} Expenses + ₹{fmt(desiredSavings)} Savings) × {1 + profitMargin/100} Margin = <strong style={{color: "#fcd34d"}}>₹{fmt(projectRate)}/mo</strong><br/>
              <span style={{ color: "#94a3b8" }}>2. Daily Break:</span> ₹{fmt(projectRate)} ÷ {workingDays} Working Days = <strong style={{color: "#93c5fd"}}>₹{fmt(dailyRate)}/day</strong><br/>
              <span style={{ color: "#94a3b8" }}>3. Hourly Rate:</span> ₹{fmt(dailyRate)} ÷ {hoursPerDay} Billable Hours = <strong style={{color: "#bae6fd"}}>₹{fmt(hourlyRate)}/hr</strong>
            </div>
          </div>
        </div>

        {/* SEO FAQ Section */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          <div style={{ paddingTop: "64px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "32px", textAlign: "center" }}>Pricing Guidance</h2>
            <div className="responsive-grid" style={{ gap: "24px" }}>
              {[
                { q: "Why do I need a profit margin?", a: "Traditional jobs provide paid time off, health insurance, provident funds, and hardware. Freelancers must pay for all of this out-of-pocket. Your margin covers software, taxes, sick days, and ensures your business can grow." },
                { q: "What are 'Billable' hours?", a: "If you sit at your desk for 8 hours, you usually only do 5-6 hours of actual client work. The rest is spent answering emails, pitching new clients, invoicing, and learning. Only calculate your rate based on strictly billable hours." },
                { q: "Should I charge hourly or per project?", a: "Use this hourly rate calculator to find your internal baseline. Once you know your hourly rate, estimate how long a project will take, multiply it by this rate, and quote a Flat Project Fee. Clients prefer flat fees." },
                { q: "How do I handle Indian vs Global rates?", a: "While the cost of living in India may be lower, your skill level is global. If you are delivering the same quality as a freelancer in the US or UK, your rates should reflect the value you provide, not just your geography." },
              ].map((item, i) => (
                <div key={item.q} className="glass-panel" style={{ padding: "32px", borderRadius: "20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ background: "rgba(14, 165, 233, 0.15)", color: "#38bdf8", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", flexShrink: 0, marginTop: "2px", boxShadow: "0 0 12px rgba(14, 165, 233, 0.2)" }}>{i + 1}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9", fontFamily: "'Syne',sans-serif", lineHeight: "1.4" }}>{item.q}</h3>
                  </div>
                  <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.8", paddingLeft: "44px" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
