import { useState } from "react";

const FAQS = [
  ["How do I calculate my freelance hourly rate?",
   "Divide your monthly expenses by total working hours, then add your desired profit margin. For example: ₹30,000 expenses ÷ 176 hours × 1.3 (30% profit) = ₹221/hr."],
  ["What is a good hourly rate for Indian freelancers?",
   "It depends on your skill and experience. Beginners: ₹300–800/hr. Mid-level: ₹800–2,000/hr. Senior/specialist: ₹2,000–5,000+/hr. Always price above your break-even point."],
  ["Should I charge per hour or per project?",
   "Project-based pricing is better for clients (predictable cost) and often earns you more. Use your hourly rate to estimate project hours, then add a 20–30% buffer for revisions."],
  ["What expenses should I include?",
   "Include rent, internet, software subscriptions, equipment EMI, food, transport, insurance, taxes, and savings. Always price for ALL costs, not just obvious ones."],
  ["What profit margin should freelancers use?",
   "Minimum 30% for sustainability. Aim for 40–50% to account for unpaid time (client calls, revisions, admin). Higher skills = higher margin justified."],
];

export default function RateCalculator({ onBack }) {
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [workingDays,    setWorkingDays]    = useState(22);
  const [hoursPerDay,    setHoursPerDay]    = useState(8);
  const [profitMargin,   setProfitMargin]   = useState(30);
  const [tax,            setTax]            = useState(0);
  const [result,         setResult]         = useState(null);
  const [copied,         setCopied]         = useState(false);

  const calculate = () => {
    if (!monthlyExpense) return;
    const expense    = parseFloat(monthlyExpense);
    const totalHours = workingDays * hoursPerDay;
    const baseRate   = expense / totalHours;
    const withProfit = baseRate * (1 + profitMargin / 100);
    const withTax    = withProfit * (1 + tax / 100);
    const daily      = withTax * hoursPerDay;
    const monthly    = daily * workingDays;
    const project40  = withTax * 40;
    const project80  = withTax * 80;

    setResult({
      hourly:    Math.ceil(withTax),
      daily:     Math.ceil(daily),
      monthly:   Math.ceil(monthly),
      project40: Math.ceil(project40),
      project80: Math.ceil(project80),
      breakEven: Math.ceil(baseRate),
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = [
      "💰 My Freelance Rates — KaroTools",
      `⏰ Hourly: ₹${result.hourly.toLocaleString("en-IN")}/hr`,
      `📅 Daily: ₹${result.daily.toLocaleString("en-IN")}/day`,
      `📆 Monthly: ₹${result.monthly.toLocaleString("en-IN")}/mo`,
      `🚀 Small Project (40hrs): ₹${result.project40.toLocaleString("en-IN")}`,
      `💼 Large Project (80hrs): ₹${result.project80.toLocaleString("en-IN")}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fmt = (v) => `₹${Number(v).toLocaleString("en-IN")}`;

  // ── Slider ──────────────────────────────────────────────────────
  const Slider = ({ label, value, min, max, step = 1, unit = "", onChange }) => (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <label style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
        <span style={{ fontSize: "15px", fontWeight: "800", color: "#a78bfa", fontFamily: "'Syne',sans-serif" }}>{value}{unit}</span>
      </div>
      <div style={{ position: "relative", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "6px" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%", borderRadius: "6px",
          width: `${((value - min) / (max - min)) * 100}%`,
          background: "linear-gradient(90deg,#7c3aed,#2563eb)",
        }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            width: "100%", opacity: 0, height: "24px", cursor: "pointer", margin: 0,
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        <span style={{ fontSize: "11px", color: "#334155" }}>{min}{unit}</span>
        <span style={{ fontSize: "11px", color: "#334155" }}>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#080814", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
        input::placeholder{color:#334155}
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes countUp{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(167,139,250,0.3)}50%{box-shadow:0 0 40px rgba(167,139,250,0.7)}}
      `}</style>

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 20% 20%,rgba(124,58,237,0.12) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 80%,rgba(37,99,235,0.08) 0%,transparent 60%)" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, height: "70px", display: "flex", alignItems: "center", padding: "0 40px", justifyContent: "space-between", background: "rgba(8,8,20,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </div>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>← Back</button>
      </nav>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 20px 80px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "700", letterSpacing: "0.08em" }}>FREE · NO LOGIN · INSTANT RESULTS</span>
          </div>
          <div style={{ fontSize: "52px", marginBottom: "12px" }}>💰</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "10px", background: "linear-gradient(135deg,#f1f5f9,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Freelance Rate Calculator
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>Calculate your perfect freelance rate in INR — hourly, daily & per project</p>
        </div>

        {/* Main Card */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px", backdropFilter: "blur(20px)", marginBottom: "20px" }}>

          {/* Monthly Expenses */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
              Monthly Expenses (₹)
            </label>
            <input
              type="number"
              value={monthlyExpense}
              onChange={e => setMonthlyExpense(e.target.value)}
              placeholder="e.g. 30000 (rent + food + bills + subscriptions)"
              style={{
                width: "100%", padding: "16px 20px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px", fontSize: "22px",
                color: "#f1f5f9", outline: "none",
                boxSizing: "border-box", fontWeight: "700",
                fontFamily: "'Syne',sans-serif",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.target.style.borderColor = "rgba(167,139,250,0.5)"; e.target.style.boxShadow = "0 0 24px rgba(124,58,237,0.2)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            />
            <p style={{ fontSize: "12px", color: "#475569", marginTop: "8px" }}>
              💡 Include: rent, internet, food, transport, tools, EMIs, savings
            </p>
          </div>

          {/* Sliders */}
          <Slider label="Working Days Per Month" value={workingDays} min={10} max={30} onChange={setWorkingDays} unit=" days" />
          <Slider label="Hours Per Day" value={hoursPerDay} min={2} max={12} onChange={setHoursPerDay} unit=" hrs" />
          <Slider label="Profit Margin" value={profitMargin} min={10} max={100} onChange={setProfitMargin} unit="%" />
          <Slider label="Tax Buffer (GST/IT)" value={tax} min={0} max={30} onChange={setTax} unit="%" />

          {/* Quick presets */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "10px" }}>Quick Presets</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { label: "🎓 Beginner", expense: 20000, days: 22, hrs: 8, profit: 20 },
                { label: "💼 Mid-Level", expense: 40000, days: 22, hrs: 8, profit: 35 },
                { label: "🚀 Senior", expense: 80000, days: 20, hrs: 8, profit: 50 },
                { label: "🌍 Global Client", expense: 50000, days: 20, hrs: 6, profit: 60 },
              ].map(p => (
                <button key={p.label} onClick={() => { setMonthlyExpense(p.expense); setWorkingDays(p.days); setHoursPerDay(p.hrs); setProfitMargin(p.profit); }}
                  style={{ padding: "8px 14px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#64748b", fontSize: "13px", cursor: "pointer", transition: "all 0.2s", fontWeight: "600" }}
                  onMouseEnter={e => { e.target.style.borderColor = "rgba(167,139,250,0.4)"; e.target.style.color = "#a78bfa"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.color = "#64748b"; }}
                >{p.label}</button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button onClick={calculate} style={{
            width: "100%", padding: "18px",
            background: "linear-gradient(135deg,#7c3aed,#2563eb)",
            border: "none", borderRadius: "14px", color: "#fff",
            fontSize: "17px", fontWeight: "700", cursor: "pointer",
            fontFamily: "'Syne',sans-serif", letterSpacing: "0.02em",
            boxShadow: "0 4px 30px rgba(124,58,237,0.4)", transition: "all 0.2s",
          }}>
            💰 Calculate My Rate
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>

            {/* Hero hourly */}
            <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.2))", border: "1px solid rgba(124,58,237,0.4)", borderRadius: "20px", padding: "32px", textAlign: "center", marginBottom: "14px", boxShadow: "0 0 50px rgba(124,58,237,0.2)" }}>
              <p style={{ color: "#a78bfa", fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>Your Minimum Hourly Rate</p>
              <p style={{ fontSize: "64px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#f1f5f9,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "countUp 0.3s ease", lineHeight: 1 }}>
                ₹{result.hourly.toLocaleString("en-IN")}
              </p>
              <p style={{ color: "#475569", fontSize: "13px", marginTop: "10px" }}>per hour · includes {profitMargin}% profit{tax > 0 ? ` + ${tax}% tax` : ""}</p>
              <div style={{ marginTop: "12px", display: "inline-block", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "20px", padding: "4px 14px" }}>
                <span style={{ fontSize: "12px", color: "#4ade80", fontWeight: "700" }}>Break-even: ₹{result.breakEven.toLocaleString("en-IN")}/hr</span>
              </div>
            </div>

            {/* Rate grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              {[
                { label: "Daily Rate", value: fmt(result.daily), sub: `${workingDays} days/mo`, color: "#60a5fa", icon: "📅" },
                { label: "Monthly Target", value: fmt(result.monthly), sub: `${workingDays}d × ${hoursPerDay}h`, color: "#a78bfa", icon: "📆" },
                { label: "Small Project", value: fmt(result.project40), sub: "40 hrs estimate", color: "#34d399", icon: "🚀" },
                { label: "Large Project", value: fmt(result.project80), sub: "80 hrs estimate", color: "#f472b6", icon: "💼" },
              ].map(item => (
                <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px" }}>
                  <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>{item.icon} {item.label}</p>
                  <p style={{ fontSize: "24px", fontWeight: "800", color: item.color, fontFamily: "'Syne',sans-serif" }}>{item.value}</p>
                  <p style={{ fontSize: "11px", color: "#334155", marginTop: "4px" }}>{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Breakdown bar */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "14px" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>Rate Breakdown</p>
              <div style={{ display: "flex", gap: "4px", height: "10px", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ flex: 100, background: "linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius: "6px 0 0 6px" }} title="Base" />
                <div style={{ flex: profitMargin, background: "linear-gradient(90deg,#7c3aed,#a78bfa)" }} title="Profit" />
                {tax > 0 && <div style={{ flex: tax, background: "linear-gradient(90deg,#f97316,#fb923c)", borderRadius: "0 6px 6px 0" }} title="Tax" />}
              </div>
              <div style={{ display: "flex", gap: "16px", marginTop: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "12px", color: "#60a5fa" }}>■ Base cost</span>
                <span style={{ fontSize: "12px", color: "#a78bfa" }}>■ Profit {profitMargin}%</span>
                {tax > 0 && <span style={{ fontSize: "12px", color: "#fb923c" }}>■ Tax {tax}%</span>}
              </div>
            </div>

            {/* Copy */}
            <button onClick={handleCopy} style={{
              width: "100%", padding: "16px",
              background: copied ? "rgba(52,211,153,0.15)" : "rgba(124,58,237,0.15)",
              border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(124,58,237,0.3)"}`,
              borderRadius: "14px", color: copied ? "#34d399" : "#a78bfa",
              fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s",
            }}>
              {copied ? "✅ Copied to Clipboard!" : "📋 Copy My Rates"}
            </button>
          </div>
        )}

        {/* SEO Tips */}
        <div style={{ marginTop: "40px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "16px" }}>
            📈 Rate Tips for Indian Freelancers
          </h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {[
              ["🌍 International Clients", "Charge in USD/EUR. Even ₹2,000/hr feels cheap to Western clients but is excellent INR income."],
              ["📊 Review Quarterly", "Raise your rates every 6–12 months. Inflation + skill growth = higher rates justified."],
              ["🚫 Avoid Underpricing", "Low rates attract bad clients. Premium pricing signals quality and attracts serious buyers."],
              ["💡 Value-Based Pricing", "Charge based on client ROI, not just your time. A landing page worth ₹5L in sales = charge ₹30–50k."],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: "12px", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "10px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#a78bfa", minWidth: "130px" }}>{t}</span>
                <span style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "40px" }}>
          {FAQS.map(item => (
            <div key={item[0]} style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px", fontFamily: "'Syne',sans-serif" }}>{item[0]}</h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7" }}>{item[1]}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
