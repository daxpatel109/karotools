import { useState } from "react";

function RateCalculator() {
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [workingDays, setWorkingDays] = useState(22);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [profitMargin, setProfitMargin] = useState(30);
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!monthlyExpense) return;

    const expense = parseFloat(monthlyExpense);
    const totalHours = workingDays * hoursPerDay;
    const baseRate = expense / totalHours;
    const finalRate = baseRate * (1 + profitMargin / 100);
    const dailyRate = finalRate * hoursPerDay;
    const monthlyRate = dailyRate * workingDays;

    setResult({
      hourlyRate: finalRate.toFixed(0),
      dailyRate: dailyRate.toFixed(0),
      monthlyRate: monthlyRate.toFixed(0),
      projectRate: (finalRate * 40).toFixed(0),
    });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>

      {/* Navbar */}
      <nav style={{ backgroundColor: "#ffffff", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        <h1 style={{ color: "#6366f1", fontSize: "24px", fontWeight: "800" }}>KaroTools</h1>
        <a href="/" style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>← Back to Home</a>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: "600px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "40px", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}>

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>💰</div>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#1e293b" }}>Freelance Rate Calculator</h2>
            <p style={{ color: "#64748b", marginTop: "8px" }}>Calculate your perfect freelance rate in INR</p>
          </div>

          {/* Monthly Expense */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Monthly Expenses (₹)
            </label>
            <input
              type="number"
              value={monthlyExpense}
              onChange={e => setMonthlyExpense(e.target.value)}
              placeholder="e.g. 30000"
              style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "2px solid #e2e8f0", fontSize: "16px", outline: "none" }}
            />
          </div>

          {/* Working Days */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Working Days Per Month: {workingDays}
            </label>
            <input
              type="range" min="10" max="30" value={workingDays}
              onChange={e => setWorkingDays(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          {/* Hours Per Day */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Hours Per Day: {hoursPerDay}
            </label>
            <input
              type="range" min="2" max="12" value={hoursPerDay}
              onChange={e => setHoursPerDay(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          {/* Profit Margin */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Profit Margin: {profitMargin}%
            </label>
            <input
              type="range" min="10" max="100" value={profitMargin}
              onChange={e => setProfitMargin(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculate}
            style={{ width: "100%", padding: "16px", backgroundColor: "#6366f1", color: "white", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "700", cursor: "pointer" }}
          >
            Calculate My Rate 💰
          </button>

          {/* Result */}
          {result && (
            <div style={{ marginTop: "28px", backgroundColor: "#f8fafc", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontWeight: "700", color: "#1e293b", marginBottom: "16px", fontSize: "18px" }}>Your Rates</h3>
              {[
                { label: "⏰ Hourly Rate", value: `₹${result.hourlyRate}/hr` },
                { label: "📅 Daily Rate", value: `₹${result.dailyRate}/day` },
                { label: "📆 Monthly Rate", value: `₹${result.monthlyRate}/month` },
                { label: "🚀 Project Rate (40hrs)", value: `₹${result.projectRate}` },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", fontWeight: "500" }}>{item.label}</span>
                  <span style={{ fontWeight: "700", color: "#6366f1", fontSize: "18px" }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RateCalculator;