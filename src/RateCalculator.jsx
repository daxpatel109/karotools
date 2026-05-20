import { useState } from "react";

export default function RateCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [desiredSavings, setDesiredSavings] = useState(20000);
  const [workingDays, setWorkingDays] = useState(22);
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [profitMargin, setProfitMargin] = useState(20);

  const monthlyTarget = monthlyExpenses + desiredSavings;
  const withProfit = monthlyTarget * (1 + profitMargin / 100);
  const dailyRate = Math.round(withProfit / workingDays);
  const hourlyRate = Math.round(dailyRate / hoursPerDay);
  const projectRate = Math.round(withProfit);
  const weeklyRate = Math.round(dailyRate * 5);

  return (
    <div style={{ minHeight: "100vh", background: "#080814", fontFamily: "'DM Sans', sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 1000, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(8,8,20,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => window.location.href = "/"} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "8px 14px", color: "#a78bfa", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            ← Back
          </button>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rate Calculator</span>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>💰</div>
          <h1 style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", marginBottom: "12px", background: "linear-gradient(135deg, #f1f5f9, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Freelance Rate Calculator</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px" }}>Calculate your ideal hourly, daily & monthly rate in INR</p>
        </div>

        {/* Calculator Card */}
        <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "36px" }}>
          {/* Monthly Expenses */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0" }}>Monthly Expenses</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#a78bfa" }}>₹{monthlyExpenses.toLocaleString()}</span>
            </label>
            <input type="range" min="10000" max="200000" step="5000" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: "6px", borderRadius: "3px", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
              <span>₹10K</span><span>₹2L</span>
            </div>
          </div>

          {/* Desired Savings */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0" }}>Desired Monthly Savings</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#a78bfa" }}>₹{desiredSavings.toLocaleString()}</span>
            </label>
            <input type="range" min="0" max="100000" step="5000" value={desiredSavings} onChange={e => setDesiredSavings(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: "6px", borderRadius: "3px", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
              <span>₹0</span><span>₹1L</span>
            </div>
          </div>

          {/* Working Days */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0" }}>Working Days/Month</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#a78bfa" }}>{workingDays} days</span>
            </label>
            <input type="range" min="15" max="30" step="1" value={workingDays} onChange={e => setWorkingDays(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: "6px", borderRadius: "3px", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
              <span>15</span><span>30</span>
            </div>
          </div>

          {/* Hours per Day */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0" }}>Hours/Day</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#a78bfa" }}>{hoursPerDay} hrs</span>
            </label>
            <input type="range" min="2" max="12" step="1" value={hoursPerDay} onChange={e => setHoursPerDay(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: "6px", borderRadius: "3px", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
              <span>2 hrs</span><span>12 hrs</span>
            </div>
          </div>

          {/* Profit Margin */}
          <div style={{ marginBottom: "36px" }}>
            <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0" }}>Profit Margin</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#a78bfa" }}>{profitMargin}%</span>
            </label>
            <input type="range" min="0" max="100" step="5" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: "6px", borderRadius: "3px", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
              <span>0%</span><span>100%</span>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
            {[
              { label: "Hourly Rate", value: `₹${hourlyRate.toLocaleString()}`, color: "#7c3aed" },
              { label: "Daily Rate", value: `₹${dailyRate.toLocaleString()}`, color: "#2563eb" },
              { label: "Weekly Rate", value: `₹${weeklyRate.toLocaleString()}`, color: "#0891b2" },
              { label: "Monthly Rate", value: `₹${projectRate.toLocaleString()}`, color: "#059669" },
            ].map(item => (
              <div key={item.label} style={{ background: `${item.color}11`, border: `1px solid ${item.color}33`, borderRadius: "16px", padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                <div style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne', sans-serif", color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Formula */}
          <div style={{ marginTop: "24px", padding: "16px", background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: "12px" }}>
            <div style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "700", marginBottom: "8px" }}>📐 FORMULA</div>
            <div style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.8" }}>
              Monthly Target = Expenses (₹{monthlyExpenses.toLocaleString()}) + Savings (₹{desiredSavings.toLocaleString()}) = ₹{monthlyTarget.toLocaleString()}<br />
              With {profitMargin}% margin = ₹{Math.round(withProfit).toLocaleString()}<br />
              Daily = ₹{Math.round(withProfit).toLocaleString()} ÷ {workingDays} days = ₹{dailyRate.toLocaleString()}<br />
              Hourly = ₹{dailyRate.toLocaleString()} ÷ {hoursPerDay} hrs = ₹{hourlyRate.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div style={{ marginTop: "32px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px", color: "#e2e8f0" }}>⚡ Quick Presets</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { label: "Beginner", expenses: 20000, savings: 10000, days: 22, hours: 8, margin: 10 },
              { label: "Mid-Level", expenses: 40000, savings: 20000, days: 22, hours: 6, margin: 25 },
              { label: "Expert", expenses: 70000, savings: 40000, days: 20, hours: 5, margin: 40 },
              { label: "Premium", expenses: 100000, savings: 60000, days: 18, hours: 4, margin: 60 },
            ].map(preset => (
              <button key={preset.label} onClick={() => { setMonthlyExpenses(preset.expenses); setDesiredSavings(preset.savings); setWorkingDays(preset.days); setHoursPerDay(preset.hours); setProfitMargin(preset.margin); }}
                style={{ padding: "10px 18px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "10px", color: "#a78bfa", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.background = "rgba(124,58,237,0.2)"; e.target.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(124,58,237,0.1)"; e.target.style.transform = "scale(1)"; }}
              >{preset.label}</button>
            ))}
          </div>
        </div>

        {/* SEO FAQ */}
        <div style={{ marginTop: "48px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "36px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne', sans-serif", marginBottom: "24px", color: "#f1f5f9" }}>❓ Frequently Asked Questions</h2>
          {[
            { q: "How do I decide my freelance rate in India?", a: "Calculate your monthly expenses, add desired savings, factor in non-billable hours, and add a profit margin of 20-50% depending on your experience level." },
            { q: "What's the average freelance rate in India?", a: "Beginner freelancers charge ₹300-800/hr, mid-level ₹800-2000/hr, and experts charge ₹2000-5000+/hr depending on the skill and industry." },
            { q: "Should I charge hourly or project-based?", a: "For small tasks, hourly works best. For defined scope projects, charge per project (usually 1.5x your hourly calculation) to account for scope creep." },
            { q: "How many hours should I bill per day?", a: "Most freelancers can effectively bill 5-6 hours per day. The rest goes to admin, marketing, learning, and communication." },
          ].map((faq, i) => (
            <div key={i} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>{faq.q}</h4>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
