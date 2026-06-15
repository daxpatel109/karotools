"use client";

import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

function formatCurrency(val) {
  if (isNaN(val)) return '₹0';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

export default function FIRECalculator() {
  const [age, setAge] = useState(30);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [corpus, setCorpus] = useState(1000000);
  const [sip, setSip] = useState(25000);
  const [roi, setRoi] = useState(12);
  const [inflation, setInflation] = useState(6);
  const [swr, setSwr] = useState(3.5);

  const { chartData, fireAge, targetRegular, targetLean, targetFat, isRoiLow, isAlreadyFire } = useMemo(() => {
    let currentAge = Number(age);
    let currentWealth = Number(corpus);
    let currentMonthlyExp = Number(monthlyExpenses);
    let currentAnnualExp = currentMonthlyExp * 12;
    
    let targetRegularMultiplier = 100 / Number(swr);
    let targetLeanMultiplier = 15;
    let targetFatMultiplier = 50;

    let fireAge = null;
    let data = [];
    
    const isRoiLow = Number(roi) <= Number(inflation);
    let targetRegularFinal = 0;
    let targetLeanFinal = 0;
    let targetFatFinal = 0;

    let initialTarget = currentAnnualExp * targetRegularMultiplier;
    
    data.push({
      age: currentAge,
      wealth: Math.round(currentWealth),
      fireTarget: Math.round(initialTarget)
    });

    let isAlreadyFire = currentWealth >= initialTarget;
    if (isAlreadyFire) {
      fireAge = currentAge;
      targetRegularFinal = initialTarget;
      targetLeanFinal = currentAnnualExp * targetLeanMultiplier;
      targetFatFinal = currentAnnualExp * targetFatMultiplier;
    }

    let tempWealth = currentWealth;

    for (let year = 1; year <= 100; year++) {
      let nextAge = currentAge + year;
      
      // Inflate expenses separately
      let futureAnnualExp = currentAnnualExp * Math.pow(1 + Number(inflation) / 100, year);
      let futureTarget = futureAnnualExp * targetRegularMultiplier;
      
      // Nominal compounding of portfolio
      let monthlyRate = Number(roi) / 100 / 12;
      for (let m = 0; m < 12; m++) {
        tempWealth = tempWealth * (1 + monthlyRate) + Number(sip);
      }
      
      data.push({
        age: nextAge,
        wealth: Math.round(tempWealth),
        fireTarget: Math.round(futureTarget)
      });
      
      if (fireAge === null && tempWealth >= futureTarget) {
        fireAge = nextAge;
        targetRegularFinal = futureTarget;
        targetLeanFinal = futureAnnualExp * targetLeanMultiplier;
        targetFatFinal = futureAnnualExp * targetFatMultiplier;
      }
      
      // Break logic: stop projecting a bit after hitting FIRE, or stop at age 85
      if (fireAge !== null && nextAge >= fireAge + 10) {
        break;
      }
      if (nextAge >= 85 && fireAge === null) {
        break; 
      }
    }

    return { 
      chartData: data, 
      fireAge, 
      targetRegular: targetRegularFinal, 
      targetLean: targetLeanFinal, 
      targetFat: targetFatFinal,
      isRoiLow,
      isAlreadyFire 
    };
  }, [age, monthlyExpenses, corpus, sip, roi, inflation, swr]);

  return (
    <div style={{ padding: "40px 5vw", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#0b0f19", color: "#f1f5f9", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", color: "#f8fafc", marginBottom: "16px", lineHeight: 1.1 }}>
            FIRE Calculator India
          </h1>
          <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto" }}>
            Calculate your Financial Independence & Retire Early (FIRE) number. We use nominal compounding and separate Indian inflation models to accurately project your future.
          </p>
        </div>

        {isRoiLow && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: 12, padding: "16px", marginBottom: "32px", color: "#fca5a5", textAlign: "center", fontWeight: "600" }}>
            ⚠️ Warning: Your Expected ROI is less than or equal to Inflation. Your real return may be too low to outpace expenses. Consider adjusting your investment strategy.
          </motion.div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "32px" }}>
          
          {/* Inputs Section */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px", color: "#f8fafc" }}>Your Financials</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="input-group">
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Current Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                  style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "16px", outline: "none" }} />
              </div>
              <div className="input-group">
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Monthly Exp (₹)</label>
                <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)}
                  style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "16px", outline: "none" }} />
              </div>
              <div className="input-group">
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Current Corpus (₹)</label>
                <input type="number" value={corpus} onChange={(e) => setCorpus(e.target.value)}
                  style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "16px", outline: "none" }} />
              </div>
              <div className="input-group">
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Monthly SIP (₹)</label>
                <input type="number" value={sip} onChange={(e) => setSip(e.target.value)}
                  style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "16px", outline: "none" }} />
              </div>
              <div className="input-group">
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Nominal ROI (%)</label>
                <input type="number" value={roi} onChange={(e) => setRoi(e.target.value)}
                  style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "16px", outline: "none" }} />
              </div>
              <div className="input-group">
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Inflation (%)</label>
                <input type="number" value={inflation} onChange={(e) => setInflation(e.target.value)}
                  style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "16px", outline: "none" }} />
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600" }}>Safe Withdrawal Rate (SWR)</label>
                <span style={{ fontSize: "14px", color: "#38bdf8", fontWeight: "700" }}>{swr}%</span>
              </div>
              <input type="range" min="3" max="4" step="0.1" value={swr} onChange={(e) => setSwr(e.target.value)}
                style={{ width: "100%", accentColor: "#0076ff", cursor: "pointer" }} />
              <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
                *Global rule is 4%. Indian experts suggest 3% - 3.5% due to higher long-term inflation.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(0,118,255,0.1), rgba(0,198,255,0.05))", border: "1px solid rgba(0,118,255,0.2)", borderRadius: "24px", padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <h2 style={{ fontSize: "18px", color: "#94a3b8", fontWeight: "600", marginBottom: "12px" }}>
                {isAlreadyFire ? "🎉 You've already reached FIRE!" : "You will reach FIRE at Age"}
              </h2>
              <div style={{ fontSize: "clamp(48px, 8vw, 64px)", fontWeight: "800", color: "#fff", lineHeight: 1, textShadow: "0 4px 24px rgba(0,118,255,0.4)", marginBottom: "16px" }}>
                {fireAge !== null ? fireAge : "85+"}
              </div>
              <p style={{ fontSize: "15px", color: "#cbd5e1" }}>
                {fireAge !== null && !isAlreadyFire ? `That's in ${fireAge - age} years.` : ""}
                {fireAge === null && "You might need to increase your SIP or ROI to reach FIRE earlier."}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px 12px", textAlign: "center" }}>
                <h3 style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Lean FIRE</h3>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9", marginBottom: "4px", wordBreak: "break-all" }}>{formatCurrency(targetLean)}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>15x Expenses<br/>(Essentials Only)</div>
              </div>
              <div style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "16px", padding: "20px 12px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: "#10b981", color: "#fff", fontSize: "10px", padding: "2px 8px", borderRadius: "10px", fontWeight: "800" }}>TARGET</div>
                <h3 style={{ fontSize: "14px", color: "#34d399", marginBottom: "8px", fontWeight: "600" }}>Regular FIRE</h3>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "4px", wordBreak: "break-all" }}>{formatCurrency(targetRegular)}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>{(100/swr).toFixed(1)}x Expenses<br/>(Current Lifestyle)</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px 12px", textAlign: "center" }}>
                <h3 style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "8px", fontWeight: "600" }}>Fat FIRE</h3>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9", marginBottom: "4px", wordBreak: "break-all" }}>{formatCurrency(targetFat)}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>50x Expenses<br/>(Premium Lifestyle)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div style={{ marginTop: "40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "32px", color: "#f8fafc" }}>Wealth Accumulation vs Target</h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWealth" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0076ff" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="age" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} width={60} />
                <Tooltip 
                  contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value) => formatCurrency(value)}
                  labelFormatter={(label) => `Age: ${label}`}
                />
                <Area type="monotone" dataKey="wealth" name="Your Portfolio" stroke="url(#colorWealth)" strokeWidth={3} fill="url(#colorWealth)" fillOpacity={0.3} />
                <Area type="monotone" dataKey="fireTarget" name="FIRE Target" stroke="#fca5a5" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ marginTop: "40px", fontSize: "12px", color: "#475569", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px" }}>
          <p>Educational estimate only, not financial advice. Calculations assume steady nominal ROI and separate inflation rates compounded annually. Actual market returns and inflation may vary significantly over time. Please consult a SEBI registered investment advisor before making financial decisions.</p>
        </div>

      </div>
    </div>
  );
}
