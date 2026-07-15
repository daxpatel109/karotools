"use client";

import React, { useState, useMemo } from 'react';
import FIREChart from './FIREChart';
import { motion } from 'framer-motion';

function formatCurrency(val) {
  if (isNaN(val)) return '₹0';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function FIRECalculator() {
  const [age, setAge] = useState(30);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [corpus, setCorpus] = useState(1000000);
  const [sip, setSip] = useState(25000);
  const [roi, setRoi] = useState(12);
  const [inflation, setInflation] = useState(6);
  const [swr, setSwr] = useState(3.5);

  const { chartData, fireAge, targetRegular, targetLean, targetFat, isRoiLow, isAlreadyFire } = useMemo(() => {
    let currentAge = Math.min(Math.max(Number(age) || 0, 18), 80);
    let currentWealth = Math.min(Math.max(Number(corpus) || 0, 0), 1000000000);
    let currentMonthlyExp = Math.min(Math.max(Number(monthlyExpenses) || 0, 0), 10000000);
    let currentSip = Math.min(Math.max(Number(sip) || 0, 0), 10000000);
    let currentRoi = Math.min(Math.max(Number(roi) || 0, 0), 30);
    let currentInflation = Math.min(Math.max(Number(inflation) || 0, 0), 20);
    let currentSwr = Math.min(Math.max(Number(swr) || 3.5, 3), 4);
    
    let currentAnnualExp = currentMonthlyExp * 12;
    let targetRegularMultiplier = 100 / currentSwr;
    let targetLeanMultiplier = 15;
    let targetFatMultiplier = 50;

    let fireAge = null;
    let data = [];
    
    const isRoiLow = currentRoi <= currentInflation;
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
      let monthlyRate = currentRoi / 100 / 12;
      for (let m = 0; m < 12; m++) {
        tempWealth = tempWealth * (1 + monthlyRate) + currentSip;
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
        targetRegularFinal = futureTarget;
        targetLeanFinal = futureAnnualExp * targetLeanMultiplier;
        targetFatFinal = futureAnnualExp * targetFatMultiplier;
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
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>

      {isRoiLow && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: 12, padding: "16px", marginBottom: "32px", color: "#fca5a5", textAlign: "center", fontWeight: "600" }}
          role="alert"
          aria-live="assertive"
        >
          ⚠️ Warning: Your Expected ROI is less than or equal to Inflation. Your real return may be too low to outpace expenses. Consider adjusting your investment strategy.
        </motion.div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "32px" }}>
        
        {/* Inputs Section */}
        <div className="glass-panel" style={{ borderRadius: "24px", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px", color: "var(--text-primary)" }}>Your Financials</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="input-group">
              <label htmlFor="fire-age-input" style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Current Age</label>
              <input id="fire-age-input" type="number" inputMode="decimal" min="18" max="80" value={age} onChange={(e) => setAge(e.target.value)}
                aria-label="Current Age"
                style={{ width: "100%", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 16px", color: "var(--text-primary)", fontSize: "16px", outline: "none" }} />
            </div>
            <div className="input-group">
              <label htmlFor="fire-expenses-input" style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Monthly Exp (₹)</label>
              <input id="fire-expenses-input" type="number" inputMode="decimal" min="0" max="10000000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)}
                aria-label="Monthly Expenses in INR"
                style={{ width: "100%", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 16px", color: "var(--text-primary)", fontSize: "16px", outline: "none" }} />
            </div>
            <div className="input-group">
              <label htmlFor="fire-corpus-input" style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Current Corpus (₹)</label>
              <input id="fire-corpus-input" type="number" inputMode="decimal" min="0" max="1000000000" value={corpus} onChange={(e) => setCorpus(e.target.value)}
                aria-label="Current Corpus in INR"
                style={{ width: "100%", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 16px", color: "var(--text-primary)", fontSize: "16px", outline: "none" }} />
            </div>
            <div className="input-group">
              <label htmlFor="fire-sip-input" style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Monthly SIP (₹)</label>
              <input id="fire-sip-input" type="number" inputMode="decimal" min="0" max="10000000" value={sip} onChange={(e) => setSip(e.target.value)}
                aria-label="Monthly SIP Investment in INR"
                style={{ width: "100%", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 16px", color: "var(--text-primary)", fontSize: "16px", outline: "none" }} />
            </div>
            <div className="input-group">
              <label htmlFor="fire-roi-input" style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Nominal ROI (%)</label>
              <input id="fire-roi-input" type="number" inputMode="decimal" min="0" max="30" value={roi} onChange={(e) => setRoi(e.target.value)}
                aria-label="Expected Nominal Rate of Return percentage"
                style={{ width: "100%", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 16px", color: "var(--text-primary)", fontSize: "16px", outline: "none" }} />
            </div>
            <div className="input-group">
              <label htmlFor="fire-inflation-input" style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Inflation (%)</label>
              <input id="fire-inflation-input" type="number" inputMode="decimal" min="0" max="20" value={inflation} onChange={(e) => setInflation(e.target.value)}
                aria-label="Expected Inflation Rate percentage"
                style={{ width: "100%", background: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 16px", color: "var(--text-primary)", fontSize: "16px", outline: "none" }} />
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label htmlFor="fire-swr-slider" style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600" }}>Safe Withdrawal Rate (SWR)</label>
              <span style={{ fontSize: "14px", color: "#38bdf8", fontWeight: "700" }} aria-hidden="true">{swr}%</span>
            </div>
            <input id="fire-swr-slider" type="range" min="3" max="4" step="0.1" value={swr} onChange={(e) => setSwr(e.target.value)}
              aria-label="Safe Withdrawal Rate Slider" aria-valuemin="3" aria-valuemax="4" aria-valuenow={swr} aria-describedby="swr-help"
              style={{ width: "100%", accentColor: "#0076ff", cursor: "pointer" }} />
            <p id="swr-help" style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "8px" }}>
              *Global rule is 4%. Indian experts suggest 3% - 3.5% due to higher long-term inflation.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="glass-panel" style={{ background: "linear-gradient(135deg, rgba(0,118,255,0.1), rgba(0,198,255,0.05))", border: "1px solid rgba(0,118,255,0.2)", borderRadius: "24px", padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h2 style={{ fontSize: "18px", color: "var(--text-secondary)", fontWeight: "600", marginBottom: "12px" }}>
              {isAlreadyFire ? "🎉 You have already reached FIRE today" : "You will reach FIRE at Age"}
            </h2>
            <div style={{ fontSize: "clamp(48px, 8vw, 64px)", fontWeight: "800", color: "var(--text-primary)", lineHeight: 1, textShadow: "0 4px 24px rgba(0,118,255,0.4)", marginBottom: "16px" }}>
              {isAlreadyFire ? "🔥" : (fireAge !== null ? fireAge : "85+")}
            </div>
            <p style={{ fontSize: "15px", color: "var(--text-primary)" }}>
              {fireAge !== null && !isAlreadyFire ? `That's in ${fireAge - age} years.` : ""}
              {fireAge === null && "You might need to increase your SIP or ROI to reach FIRE earlier."}
            </p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "16px" }}>
            <motion.div variants={itemVariants} className="glass-panel" style={{ borderRadius: "16px", padding: "20px 12px", textAlign: "center" }}>
              <h3 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Lean FIRE</h3>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px", wordBreak: "break-all" }}>{formatCurrency(targetLean)}</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>15x Expenses<br/>(Essentials Only)</div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel" style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "16px", padding: "20px 12px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: "#10b981", color: "#fff", fontSize: "10px", padding: "2px 8px", borderRadius: "10px", fontWeight: "800" }}>TARGET</div>
              <h3 style={{ fontSize: "14px", color: "#34d399", marginBottom: "8px", fontWeight: "600" }}>Regular FIRE</h3>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "4px", wordBreak: "break-all" }}>{formatCurrency(targetRegular)}</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{(100/swr).toFixed(1)}x Expenses<br/>(Current Lifestyle)</div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel" style={{ borderRadius: "16px", padding: "20px 12px", textAlign: "center" }}>
              <h3 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>Fat FIRE</h3>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px", wordBreak: "break-all" }}>{formatCurrency(targetFat)}</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>50x Expenses<br/>(Premium Lifestyle)</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-panel" style={{ marginTop: "40px", borderRadius: "24px", padding: "32px" }} role="region" aria-label="Wealth Accumulation Chart">
        <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "32px", color: "var(--text-primary)" }}>Wealth Accumulation vs Target</h2>
        <div style={{ width: "100%", height: 320 }}>
          <FIREChart chartData={chartData} />
        </div>
        <p className="sr-only" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>
          This chart shows your portfolio growing over time compared to your FIRE target. Your portfolio reaches your FIRE target at age {fireAge !== null ? fireAge : "85+"}.
        </p>
      </div>

    </div>
  );
}
