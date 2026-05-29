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
    metaDescription.content = "Calculate your exact freelance hourly, daily, and monthly rates based on your expenses and desired profit margin. Free tool for Indian freelancers.";
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

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", selectionColor: "#fff", selectionBackground: "#0ea5e9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(14, 165, 233, 0.4); color: white; }
        ::-moz-selection { background: rgba(14, 165, 233, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%{box-shadow: 0 0 40px rgba(14, 165, 233, 0.15)} 50%{box-shadow: 0 0 60px rgba(14, 165, 233, 0.3)} 100%{box-shadow: 0 0 40px rgba(14, 165, 233, 0.15)} }

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
        .interactive-btn:active {
          transform: translateY(1px) scale(0.98);
        }

        .preset-btn {
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
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

        /* Custom Range Slider */
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          margin-top: -8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(14, 165, 233, 0.2);
          transition: all 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4), 0 0 0 6px rgba(14, 165, 233, 0.4);
          transform: scale(1.1);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        input[type=range]:focus { outline: none; }

        .responsive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .responsive-grid { grid-template-columns: 1fr 1fr; }
        }
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

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>💰</span>
          </div>
          <h1 style={{ fontSize: "42px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", letterSpacing: "-0.02em", background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Freelance Rate Calculator</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "400", letterSpacing: "0.01em" }}>Calculate your exact hourly, daily & monthly minimums.</p>
        </div>

        {/* Quick Presets */}
        <div style={{ marginBottom: "32px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", marginLeft: "4px" }}>Industry Presets</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => applyPreset(p)} className="preset-btn">
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="glass-panel" style={{ borderRadius: "28px", padding: "40px", marginBottom: "32px", animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          
          <div className="responsive-grid">
            {/* Monthly Expenses */}
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>Monthly Expenses</span>
                <span style={{ fontSize: "15px", fontWeight: "800", color: "#38bdf8" }}>₹{fmt(monthlyExpenses)}</span>
              </label>
              <input type="range" min="10000" max="200000" step="5000" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #0ea5e9 ${(monthlyExpenses-10000)/1900}%, rgba(255,255,255,0.1) ${(monthlyExpenses-10000)/1900}%)` }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "12px", fontWeight: "500" }}>
                <span>₹10K</span><span>₹2L</span>
              </div>
            </div>

            {/* Desired Savings */}
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>Desired Savings</span>
                <span style={{ fontSize: "15px", fontWeight: "800", color: "#14b8a6" }}>₹{fmt(desiredSavings)}</span>
              </label>
              <input type="range" min="0" max="100000" step="5000" value={desiredSavings} onChange={e => setDesiredSavings(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #14b8a6 ${(desiredSavings)/1000}%, rgba(255,255,255,0.1) ${(desiredSavings)/1000}%)` }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "12px", fontWeight: "500" }}>
                <span>₹0</span><span>₹1L</span>
              </div>
            </div>

            {/* Working Days */}
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>Days / Month</span>
                <span style={{ fontSize: "15px", fontWeight: "800", color: "#e2e8f0" }}>{workingDays} Days</span>
              </label>
              <input type="range" min="10" max="30" step="1" value={workingDays} onChange={e => setWorkingDays(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #64748b ${(workingDays-10)*5}%, rgba(255,255,255,0.1) ${(workingDays-10)*5}%)` }} />
            </div>

            {/* Hours per Day */}
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>Billable Hrs / Day</span>
                <span style={{ fontSize: "15px", fontWeight: "800", color: "#e2e8f0" }}>{hoursPerDay} Hrs</span>
              </label>
              <input type="range" min="2" max="12" step="1" value={hoursPerDay} onChange={e => setHoursPerDay(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #64748b ${(hoursPerDay-2)*10}%, rgba(255,255,255,0.1) ${(hoursPerDay-2)*10}%)` }} />
            </div>
          </div>

          {/* Profit Margin (Full Width) */}
          <div style={{ background: "linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(255,255,255,0.02))", padding: "24px", borderRadius: "16px", border: "1px solid rgba(14, 165, 233, 0.2)", marginTop: "16px" }}>
            <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#bae6fd", textTransform: "uppercase", letterSpacing: "0.05em" }}>Profit Margin / Buffer</span>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "#38bdf8" }}>{profitMargin}%</span>
            </label>
            <input type="range" min="0" max="100" step="5" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))}
              style={{ background: `linear-gradient(90deg, #0ea5e9 ${profitMargin}%, rgba(255,255,255,0.1) ${profitMargin}%)` }} />
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "12px" }}>Accounts for sick days, dry spells, and business growth.</p>
          </div>
        </div>

        {/* Results Section */}
        <div style={{ animation: "fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          
          {/* Main Hero Rate */}
          <div style={{ background: "linear-gradient(145deg, rgba(14, 165, 233, 0.15), rgba(20,184,166,0.1))", border: "1px solid rgba(14, 165, 233, 0.3)", borderRadius: "28px", padding: "48px 32px", textAlign: "center", marginBottom: "24px", position: "relative", overflow: "hidden", animation: "glowPulse 4s infinite" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
            
            <p style={{ color: "#bae6fd", fontSize: "13px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Your Minimum Hourly Rate</p>
            <p style={{ fontSize: "64px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #ffffff, #bae6fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, filter: "drop-shadow(0 4px 20px rgba(14, 165, 233, 0.3))" }}>
              ₹{fmt(hourlyRate)}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "16px", fontWeight: "500" }}>Don't accept projects that pay less than this equivalent.</p>
          </div>

          {/* Breakdown Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Daily Rate", value: dailyRate, color: "#93c5fd", icon: "☀️" },
              { label: "Weekly Rate", value: weeklyRate, color: "#5eead4", icon: "📅" },
              { label: "Monthly Target", value: projectRate, color: "#fcd34d", icon: "🎯" },
            ].map((item, idx) => (
              <div key={item.label} className="glass-panel" style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "transform 0.3s", cursor: "default" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  <p style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                </div>
                <p style={{ fontSize: "28px", fontWeight: "800", color: item.color, fontFamily: "'Syne',sans-serif", textShadow: `0 4px 12px ${item.color}40` }}>₹{fmt(item.value)}</p>
              </div>
            ))}
          </div>

          {/* Formula Transparency */}
          <div style={{ background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "16px", padding: "24px", marginBottom: "48px" }}>
            <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>How this is calculated</p>
            <div style={{ color: "#cbd5e1", fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.02em", background: "rgba(0,0,0,0.2)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(14, 165, 233, 0.1)", lineHeight: "2" }}>
              <span style={{ color: "#94a3b8" }}>1. Target:</span> (₹{fmt(monthlyExpenses)} Expenses + ₹{fmt(desiredSavings)} Savings) × {1 + profitMargin/100} Margin = <strong style={{color: "#38bdf8"}}>₹{fmt(projectRate)}</strong><br/>
              <span style={{ color: "#94a3b8" }}>2. Daily:</span> ₹{fmt(projectRate)} ÷ {workingDays} Days = <strong style={{color: "#14b8a6"}}>₹{fmt(dailyRate)}</strong><br/>
              <span style={{ color: "#94a3b8" }}>3. Hourly:</span> ₹{fmt(dailyRate)} ÷ {hoursPerDay} Hours = <strong style={{color: "#bae6fd"}}>₹{fmt(hourlyRate)}</strong>
            </div>
          </div>
        </div>

        {/* SEO FAQ Section */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          <div style={{ paddingTop: "64px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "32px", textAlign: "center" }}>Pricing FAQs</h2>
            <div className="responsive-grid" style={{ gap: "20px" }}>
              {[
                { q: "Why add a profit margin?", a: "Employees get paid time off, health insurance, and hardware provided by their employer. Freelancers pay out of pocket. The margin covers taxes, software licenses, sick days, and business growth." },
                { q: "What are non-billable hours?", a: "Hours spent pitching clients, sending emails, doing taxes, or learning new skills. If you work 8 hours a day, usually only 5-6 are actually billable to a client." },
                { q: "Hourly vs Project-Based?", a: "Use your hourly rate to calculate an internal baseline. Then, quote the client a fixed project fee. This ensures you are rewarded for efficiency rather than penalized for working quickly." },
                { q: "Are Indian rates different?", a: "While living expenses in India are lower, if you are providing global quality work to global clients, you should charge closer to global rates. Don't compete solely on price." },
              ].map((item, i) => (
                <div key={item.q} className="glass-panel" style={{ padding: "28px", borderRadius: "20px", transition: "all 0.3s ease" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", flexShrink: 0, marginTop: "2px" }}>{i + 1}</div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9", fontFamily: "'Syne',sans-serif", lineHeight: "1.4" }}>{item.q}</h3>
                  </div>
                  <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.7", paddingLeft: "36px" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
