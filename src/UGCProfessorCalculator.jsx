"use client";
import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, IndianRupee, Shield, Download, PieChart, Info, Building } from 'lucide-react';

const UGC_LEVELS = [
  { level: "Level 10 (Assistant Professor)", basePay: 57700 },
  { level: "Level 11 (Asst. Prof Sr. Scale)", basePay: 68900 },
  { level: "Level 12 (Asst. Prof Sel. Grade)", basePay: 79800 },
  { level: "Level 13A (Associate Professor)", basePay: 131400 },
  { level: "Level 14 (Professor)", basePay: 144200 },
  { level: "Level 15 (Senior Professor)", basePay: 182200 },
];

export default function UGCProfessorCalculator() {
  const [academicLevel, setAcademicLevel] = useState(UGC_LEVELS[0]);
  const [basicPay, setBasicPay] = useState(UGC_LEVELS[0].basePay);
  const [daPercent, setDaPercent] = useState(50);
  const [hraPercent, setHraPercent] = useState(27);
  const [cityType, setCityType] = useState('X');
  const [taxRegime, setTaxRegime] = useState('new');
  const [custom80c, setCustom80c] = useState(150000);

  // Update base pay when level changes
  useEffect(() => {
    setBasicPay(academicLevel.basePay);
  }, [academicLevel]);

  // Derived Values (Monthly)
  const daAmount = Math.round(basicPay * (daPercent / 100));
  const hraAmount = Math.round(basicPay * (hraPercent / 100));
  const taBase = cityType === 'X' ? 7200 : 3600;
  const taDaAmount = Math.round(taBase * (daPercent / 100));
  const totalTaAmount = taBase + taDaAmount;
  
  const grossMonthly = basicPay + daAmount + hraAmount + totalTaAmount;
  const grossAnnual = grossMonthly * 12;

  // Deductions (Monthly)
  const npsTier1 = Math.round((basicPay + daAmount) * 0.10);
  const professionalTax = 200; // Average
  
  // Tax Calculation (Annual)
  const calculateTax = () => {
    const standardDeduction = 50000;
    const ptAnnual = professionalTax * 12;
    const npsAnnual = npsTier1 * 12;
    let taxableIncome = grossAnnual - standardDeduction;

    if (taxRegime === 'old') {
      const exemption80C = Math.min(150000, custom80c + npsAnnual); // Max 1.5L
      const exemption80CCD1B = 50000; // Extra NPS
      const hraExemption = hraAmount * 12; // Assuming rent covers HRA for simplicity
      taxableIncome = taxableIncome - ptAnnual - exemption80C - exemption80CCD1B - hraExemption;
      if (taxableIncome < 0) taxableIncome = 0;

      let tax = 0;
      if (taxableIncome > 250000) {
        if (taxableIncome <= 500000) {
          tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
          tax = 12500 + (taxableIncome - 500000) * 0.20;
        } else {
          tax = 112500 + (taxableIncome - 1000000) * 0.30;
        }
      }
      // Rebate 87A (Up to 5 Lakhs)
      if (taxableIncome <= 500000) tax = 0;
      const cess = tax * 0.04;
      return Math.round(tax + cess);
    } else {
      // New Regime (FY 2026-27 assumptions)
      // NPS employer contribution is allowed, but employee 10% is not typically 80C, though 80CCD(2) applies.
      // We'll just apply standard deduction.
      if (taxableIncome < 0) taxableIncome = 0;
      let tax = 0;
      
      if (taxableIncome > 300000) {
        if (taxableIncome <= 700000) {
          tax = (taxableIncome - 300000) * 0.05;
        } else if (taxableIncome <= 1000000) {
          tax = 20000 + (taxableIncome - 700000) * 0.10;
        } else if (taxableIncome <= 1200000) {
          tax = 50000 + (taxableIncome - 1000000) * 0.15;
        } else if (taxableIncome <= 1500000) {
          tax = 80000 + (taxableIncome - 1200000) * 0.20;
        } else {
          tax = 140000 + (taxableIncome - 1500000) * 0.30;
        }
      }
      
      // Rebate 87A (Up to 7 Lakhs in New Regime)
      if (taxableIncome <= 700000) {
        tax = 0;
      }
      
      const cess = tax * 0.04;
      return Math.round(tax + cess);
    }
  };

  const annualTax = calculateTax();
  const monthlyTds = Math.round(annualTax / 12);
  const totalDeductions = npsTier1 + professionalTax + monthlyTds;
  const netInHand = grossMonthly - totalDeductions;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px", letterSpacing: "-0.02em" }}>
          UGC Professor Salary Calculator <span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>(7th CPC)</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
          Calculate your exact in-hand salary, DA, HRA, and TDS deductions based on the latest 7th Pay Commission Academic Levels.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr lg:1fr", gap: "32px" }}>
        {/* INPUTS COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <Building style={{ color: "#0076ff" }} />
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>Academic Profile</h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>UGC Academic Level</label>
                <select 
                  value={academicLevel.level}
                  onChange={(e) => setAcademicLevel(UGC_LEVELS.find(l => l.level === e.target.value))}
                  style={{ width: "100%", padding: "16px", borderRadius: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontSize: "16px", fontWeight: "500", outline: "none" }}
                >
                  {UGC_LEVELS.map(l => (
                    <option key={l.level} value={l.level}>{l.level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Basic Pay (Cell 1)</label>
                <div style={{ position: "relative" }}>
                  <IndianRupee size={20} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
                  <input 
                    type="number"
                    value={basicPay}
                    onChange={(e) => setBasicPay(Number(e.target.value))}
                    style={{ width: "100%", padding: "16px 16px 16px 48px", borderRadius: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontSize: "16px", fontWeight: "600", outline: "none" }}
                  />
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>DA Percentage (%)</label>
                  <input 
                    type="number"
                    value={daPercent}
                    onChange={(e) => setDaPercent(Number(e.target.value))}
                    style={{ width: "100%", padding: "16px", borderRadius: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontSize: "16px", fontWeight: "600", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>City Type (HRA)</label>
                  <select 
                    value={cityType}
                    onChange={(e) => {
                      setCityType(e.target.value);
                      if (e.target.value === 'X') setHraPercent(27);
                      if (e.target.value === 'Y') setHraPercent(18);
                      if (e.target.value === 'Z') setHraPercent(9);
                    }}
                    style={{ width: "100%", padding: "16px", borderRadius: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontSize: "16px", fontWeight: "600", outline: "none" }}
                  >
                    <option value="X">Class X (27%)</option>
                    <option value="Y">Class Y (18%)</option>
                    <option value="Z">Class Z (9%)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* TAX REGIME */}
          <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <Shield style={{ color: "#38bdf8" }} />
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>Tax Settings</h2>
            </div>
            
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
              <button 
                onClick={() => setTaxRegime('new')}
                style={{ flex: 1, padding: "16px", borderRadius: "12px", background: taxRegime === 'new' ? "rgba(0,118,255,0.1)" : "rgba(0,0,0,0.2)", border: `1px solid ${taxRegime === 'new' ? "#0076ff" : "var(--border-color)"}`, color: taxRegime === 'new' ? "#38bdf8" : "var(--text-secondary)", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
              >
                New Tax Regime
              </button>
              <button 
                onClick={() => setTaxRegime('old')}
                style={{ flex: 1, padding: "16px", borderRadius: "12px", background: taxRegime === 'old' ? "rgba(0,118,255,0.1)" : "rgba(0,0,0,0.2)", border: `1px solid ${taxRegime === 'old' ? "#0076ff" : "var(--border-color)"}`, color: taxRegime === 'old' ? "#38bdf8" : "var(--text-secondary)", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
              >
                Old Tax Regime
              </button>
            </div>
            
            {taxRegime === 'old' && (
              <div style={{ padding: "16px", background: "rgba(234,179,8,0.05)", border: "1px solid rgba(234,179,8,0.2)", borderRadius: "12px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <Info size={16} style={{ display: "inline", marginRight: "8px", color: "#eab308" }} />
                Assuming full HRA exemption and ₹1.5L 80C deductions for simplicity in the Old Regime calculation.
              </div>
            )}
          </div>
        </div>

        {/* OUTPUT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Main Output Card */}
          <div className="glass-panel" style={{ background: "linear-gradient(135deg, rgba(0,118,255,0.1) 0%, rgba(0,0,0,0.4) 100%)", border: "1px solid rgba(0,118,255,0.2)", borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "rgba(0,118,255,0.1)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
            
            <p style={{ color: "#38bdf8", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Estimated Net Salary (Monthly)</p>
            <div style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: "800", color: "#fff", marginBottom: "8px", fontFamily: "'Plus Jakarta Sans',sans-serif", display: "flex", alignItems: "center" }}>
              {formatCurrency(netInHand)}
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px" }}>Gross: {formatCurrency(grossMonthly)} | Deductions: {formatCurrency(totalDeductions)}</p>
          </div>

          {/* Breakdown Card */}
          <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <PieChart style={{ color: "#10b981" }} />
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>Monthly Breakdown</h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-secondary)" }}>Basic Pay</span>
                <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{formatCurrency(basicPay)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-secondary)" }}>Dearness Allowance (DA @ {daPercent}%)</span>
                <span style={{ color: "#10b981", fontWeight: "600" }}>+ {formatCurrency(daAmount)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-secondary)" }}>House Rent Allowance (HRA @ {hraPercent}%)</span>
                <span style={{ color: "#10b981", fontWeight: "600" }}>+ {formatCurrency(hraAmount)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-secondary)" }}>Transport Allowance (TA + DA)</span>
                <span style={{ color: "#10b981", fontWeight: "600" }}>+ {formatCurrency(totalTaAmount)}</span>
              </div>
              
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px 0" }} />
              
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-secondary)" }}>NPS Contribution (10%)</span>
                <span style={{ color: "#ef4444", fontWeight: "600" }}>- {formatCurrency(npsTier1)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-secondary)" }}>Estimated Income Tax (TDS)</span>
                <span style={{ color: "#ef4444", fontWeight: "600" }}>- {formatCurrency(monthlyTds)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                <span style={{ color: "var(--text-secondary)" }}>Professional Tax</span>
                <span style={{ color: "#ef4444", fontWeight: "600" }}>- {formatCurrency(professionalTax)}</span>
              </div>
            </div>
            
            <div style={{ marginTop: "24px", padding: "16px", background: "rgba(0,118,255,0.05)", borderRadius: "12px", border: "1px solid rgba(0,118,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>Total Annual Tax Liability:</span>
              <span style={{ color: "#38bdf8", fontWeight: "700", fontSize: "18px" }}>{formatCurrency(annualTax)}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
