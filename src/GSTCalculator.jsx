"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

export default function GSTCalculator() {
  const params = useParams();
  const keyword = params?.keyword;

  let seoTitle = "Free Online GST Calculator India | KaroTools";
  let seoH1 = "GST Calculator";
  let seoDesc = "Calculate IGST, CGST, and SGST instantly. A free, accurate, and fast GST calculator built for Indian freelancers and small businesses.";
  
  if (keyword === "reverse-gst-calculator") {
    seoTitle = "Reverse GST Calculator India | KaroTools";
    seoH1 = "Reverse GST Calculator";
    seoDesc = "Calculate Reverse GST instantly to find the exact base amount before tax. Perfect for Indian freelancers and businesses.";
  } else if (keyword === "18-percent-gst-calculator") {
    seoTitle = "18% GST Calculator India | KaroTools";
    seoH1 = "18% GST Calculator";
    seoDesc = "Calculate 18% GST exactly. Instantly find CGST, SGST, and IGST for the 18 percent tax slab in India.";
  } else if (keyword === "gst-calculator-for-freelancers") {
    seoTitle = "GST Calculator for Indian Freelancers | KaroTools";
    seoH1 = "Freelance GST Calculator";
  } else if (keyword === "inclusive-exclusive-gst-calculator") {
    seoTitle = "Inclusive & Exclusive GST Calculator | KaroTools";
    seoH1 = "Inclusive/Exclusive GST Calculator";
  }

  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState(18);
  const [customRate, setCustomRate] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [cessRate, setCessRate] = useState(0);
  const [type, setType] = useState("exclusive");
  const [transactionType, setTransactionType] = useState("intra");
  const [roundOff, setRoundOff] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [preset, setPreset] = useState(null);

  const activeRate = isCustom ? (customRate === "" ? NaN : Number(customRate)) : Number(gstRate);

  // Auto-configure tool based on keyword
  useEffect(() => {
    if (keyword === "reverse-gst-calculator") {
      setType("inclusive");
    } else if (keyword === "18-percent-gst-calculator") {
      setGstRate(18);
      setIsCustom(false);
    }
  }, [keyword]);

  const presets = [
    { label: "🍽 Restaurant", rate: 5 },
    { label: "👔 Clothing", rate: 12 },
    { label: "💻 Electronics", rate: 18 },
    { label: "🚗 Luxury", rate: 28 },
    { label: "💊 Medicine", rate: 5 },
    { label: "🏠 Real Estate", rate: 12 },
    { label: "🥛 Milk/Food", rate: 0 },
    { label: "🥇 Gold", rate: 3 },
  ];

  // SERP SEO & Schema Injection (Only for dynamic keyword routes)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!keyword) return;

    document.title = seoTitle;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = seoDesc;

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "KaroTools GST Calculator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "WebBrowser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
      "description": "Calculate IGST, CGST, and SGST instantly with this free GST Calculator."
    });
    document.head.appendChild(schemaScript);

    // FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What are GST slabs in India 2026?", "acceptedAnswer": { "@type": "Answer", "text": "India has 6 GST slabs: 0%, 0.25%, 3%, 5%, 12%, 18%, and 28%." } },
        { "@type": "Question", "name": "What is GST on restaurant food?", "acceptedAnswer": { "@type": "Answer", "text": "Restaurant GST is 5% for non-AC restaurants and standalone restaurants. AC restaurants in hotels with room tariff below ₹7500 also charge 5%. No ITC is available." } },
        { "@type": "Question", "name": "What is GST on gold in India?", "acceptedAnswer": { "@type": "Answer", "text": "GST on gold is 3% on the value of gold, plus 5% on making charges." } },
        { "@type": "Question", "name": "What is IGST vs CGST/SGST?", "acceptedAnswer": { "@type": "Answer", "text": "For intra-state transactions, GST splits equally into CGST (Central) + SGST (State). For inter-state transactions, IGST (Integrated GST) is charged." } }
      ]
    });
    document.head.appendChild(faqSchemaScript);

    return () => {
      if (document.head.contains(schemaScript)) document.head.removeChild(schemaScript);
      if (document.head.contains(faqSchemaScript)) document.head.removeChild(faqSchemaScript);
    };
  }, [keyword, seoTitle, seoDesc]);

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem("gst_amount", amount);
    localStorage.setItem("gst_rate", gstRate);
    localStorage.setItem("gst_customRate", customRate);
    localStorage.setItem("gst_isCustom", isCustom);
    localStorage.setItem("gst_cessRate", cessRate);
    localStorage.setItem("gst_type", type);
    localStorage.setItem("gst_transactionType", transactionType);
    localStorage.setItem("gst_roundOff", roundOff);
    if (preset) localStorage.setItem("gst_preset", preset); else localStorage.removeItem("gst_preset");
  }, [amount, gstRate, customRate, isCustom, cessRate, type, transactionType, roundOff, preset]);

  useEffect(() => {
    const amt = parseFloat(amount);
    
    if (amount === "" || isNaN(amt) || amt <= 0 || isNaN(activeRate) || activeRate < 0 || activeRate > 100) { 
      setResult(null); 
      return; 
    }

    let base, gst, cess, total;
    if (type === "exclusive") {
      base = amt;
      gst = (amt * activeRate) / 100;
      cess = (amt * cessRate) / 100;
      total = amt + gst + cess;
    } else {
      total = amt;
      base = (amt * 100) / (100 + activeRate + cessRate);
      gst = (base * activeRate) / 100;
      cess = (base * cessRate) / 100;
    }

    if (roundOff) {
      base = Math.round(base);
      gst = Math.round(gst);
      cess = Math.round(cess);
      total = Math.round(total);
    }

    const r = {
      base: base.toFixed(roundOff ? 0 : 2),
      gst: gst.toFixed(roundOff ? 0 : 2),
      cess: cess.toFixed(roundOff ? 0 : 2),
      total: total.toFixed(roundOff ? 0 : 2),
      cgst: (gst / 2).toFixed(roundOff ? 0 : 2),
      sgst: (gst / 2).toFixed(roundOff ? 0 : 2),
      igst: gst.toFixed(roundOff ? 0 : 2),
      basePercent: total > 0 ? Math.round((base / total) * 100) : 0,
      gstPercent: total > 0 ? Math.round((gst / total) * 100) : 0,
      cessPercent: total > 0 ? Math.round((cess / total) * 100) : 0,
    };
    setResult(r);

    // Fire event once per successful calculation update (debounced essentially by the user stopping typing)
    const timeoutId = setTimeout(() => {
      if (type === "exclusive") {
        sendGAEvent("event", "gst_calculator_used", { tool_name: "GST Calculator", gst_rate: activeRate });
      } else {
        sendGAEvent("event", "gst_reverse_gst_used", { tool_name: "GST Calculator", gst_rate: activeRate });
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [amount, activeRate, type, roundOff, cessRate]);

  const addToHistory = () => {
    if (!result) return;
    const entry = {
      amount: amount,
      rate: activeRate,
      type,
      total: result.total,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };
    setHistory(prev => {
      if (prev.length > 0 && prev[0].amount === entry.amount && prev[0].rate === entry.rate && prev[0].type === entry.type && prev[0].total === entry.total) {
        return prev;
      }
      const newHist = [entry, ...prev.slice(0, 4)];
      localStorage.setItem("gst_history", JSON.stringify(newHist));
      return newHist;
    });
  };

  const copyResult = () => {
    if (!result) return;
    sendGAEvent("event", "gst_calculated", { event_category: "Calculator", event_label: type });
    const lines = [
      `GST Calculation — KaroTools`,
      `Amount: ₹${amount} | Rate: ${activeRate}% | Type: ${type}`,
      `Base Amount: ₹${result.base}`,
      `GST (${activeRate}%): ₹${result.gst}`,
      transactionType === "intra"
        ? `CGST: ₹${result.cgst} | SGST: ₹${result.sgst}`
        : `IGST: ₹${result.igst}`,
      `Total: ₹${result.total}`,
    ].join("\n");
    
    navigator.clipboard.writeText(lines)
      .then(() => {
        setCopied(true);
        addToHistory(); 
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy to clipboard. Please check browser permissions."));
  };

  const fmt = (val) => isNaN(Number(val)) ? "0" : Number(val).toLocaleString("en-IN");

  const clearAll = () => {
    setAmount("");
    setCustomRate("");
    setResult(null);
    setHistory([]);
    setGstRate(18);
    setType("exclusive");
    setTransactionType("intra");
    setRoundOff(false);
    setPreset(null);
    setIsCustom(false);
    setCessRate(0);
    ["gst_amount", "gst_rate", "gst_customRate", "gst_isCustom", "gst_cessRate", "gst_type", "gst_transactionType", "gst_roundOff", "gst_preset", "gst_history"].forEach(k => localStorage.removeItem(k));
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)", selectionColor: "#fff", selectionBackground: "#0076ff" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(0,118,255, 0.4); color: white; }
        ::-moz-selection { background: rgba(0,118,255, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes countUp { from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)} }
        @keyframes glowPulse { 0%{box-shadow: 0 0 40px rgba(0,118,255, 0.15)} 50%{box-shadow: 0 0 60px rgba(0,118,255, 0.3)} 100%{box-shadow: 0 0 40px rgba(0,118,255, 0.15)} }
        
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        input::placeholder { color: #475569; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 var(--border-color);
        }

        .interactive-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .interactive-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(0,118,255, 0.25);
        }
        .interactive-btn:active {
          transform: translateY(1px) scale(0.98);
        }

        .home-btn {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          text-decoration: none;
        }
        .home-btn:hover {
          background: rgba(0,118,255, 0.15);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }

        .preset-btn {
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .preset-btn:hover {
          transform: translateY(-1px);
          background: var(--glass-border) !important;
        }

        .responsive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .responsive-grid { grid-template-columns: 1fr 1fr; }
        }

        .responsive-grid-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .responsive-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
        }

        .responsive-grid-rates {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (min-width: 640px) {
          .responsive-grid-rates { grid-template-columns: repeat(7, 1fr); gap: 12px; }
        }

        .input-glow {
          transition: all 0.3s ease;
        }
        .input-glow:focus-within {
          border-color: rgba(56, 189, 248, 0.6) !important;
          box-shadow: 0 0 0 4px rgba(0,118,255, 0.15), inset 0 2px 4px rgba(0,0,0,0.2);
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .breakdown-card {
          transition: all 0.3s ease;
        }
        .breakdown-card:hover {
          transform: translateY(-4px);
          background: var(--glass-bg) !important;
          border-color: rgba(255,255,255,0.15) !important;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-text {
          background: linear-gradient(135deg, #0076ff, #00c6ff, #0076ff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }

        @keyframes shine { to { background-position: 200% center; } }
      `}} />

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,118,255, 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,198,255, 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "40%", width: "30%", height: "30%", background: "radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <Navbar />

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: "48px", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, var(--glass-bg), rgba(255,255,255,0.01))", border: "1px solid var(--border-color)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>🧮</span>
          </div>
          <h1 className="gradient-text" style={{ fontSize: "42px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "12px", letterSpacing: "-0.02em" }}>{seoH1}</h1>

          {/* COMPLIANCE BADGE */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "6px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            Updated for GST Calculations
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "6px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            FY 2026-27 Compliant
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "16px", fontWeight: "400", letterSpacing: "0.01em" }}>Professional GST calculation for Indian businesses • All slabs supported</p>
        </div>

        <div style={{ marginBottom: "24px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", marginLeft: "4px" }}>Quick Presets</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { 
                setPreset(p.label); 
                setGstRate(p.rate); 
                setIsCustom(false); 
                setCustomRate(""); 
                sendGAEvent("event", "gst_rate_changed", { new_rate: p.rate, preset: p.label });
              }}
                className="preset-btn"
                style={{
                  border: "1px solid",
                  borderColor: preset === p.label ? "rgba(56, 189, 248, 0.6)" : "var(--glass-border)",
                  background: preset === p.label ? "rgba(0,118,255, 0.15)" : "var(--glass-bg)",
                  color: preset === p.label ? "#bae6fd" : "var(--text-secondary)",
                  boxShadow: preset === p.label ? "0 0 20px rgba(0,118,255, 0.15)" : "none",
                }}>
                {p.label} <span style={{ opacity: 0.6, marginLeft: "4px" }}>· {p.rate}%</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ borderRadius: "28px", padding: "40px", marginBottom: "32px", animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Amount (₹)</label>
            <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid var(--border-color)", background: "var(--glass-bg)", display: "flex", alignItems: "center", padding: "4px 20px" }}>
              <span style={{ fontSize: "24px", color: "var(--text-secondary)", fontWeight: "500", marginRight: "12px" }}>₹</span>
              <input type="number" inputMode="decimal" value={amount} 
                onWheel={(e) => e.target.blur()}
                onChange={e => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) setAmount(val);
                }} 
                placeholder="0.00"
                style={{ width: "100%", padding: "18px 0", background: "transparent", border: "none", fontSize: "28px", color: "var(--text-primary)", outline: "none", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>GST Rate</label>
            <div className="responsive-grid-rates">
              {[0, 3, 5, 12, 18, 28].map(rate => (
                <button key={rate} onClick={() => { 
                  setGstRate(rate); 
                  setIsCustom(false); 
                  setPreset(null); 
                  setCustomRate(""); 
                  sendGAEvent("event", "gst_rate_changed", { new_rate: rate });
                }}
                  className="interactive-btn"
                  style={{
                    padding: "16px", borderRadius: "14px", border: "1px solid",
                    borderColor: !isCustom && gstRate === rate ? "#0076ff" : "var(--glass-border)",
                    background: !isCustom && gstRate === rate ? "linear-gradient(135deg, rgba(0,118,255, 0.2), rgba(0,198,255, 0.1))" : "var(--glass-bg)",
                    color: !isCustom && gstRate === rate ? "#bae6fd" : "var(--text-secondary)",
                    fontWeight: "700", cursor: "pointer", fontSize: "16px",
                    boxShadow: !isCustom && gstRate === rate ? "0 4px 16px rgba(0,118,255, 0.2), inset 0 1px 1px var(--border-color)" : "none"
                  }}>
                  {rate}%
                </button>
              ))}
              
              <button onClick={() => { setIsCustom(true); setPreset(null); }}
                className="interactive-btn"
                style={{
                  padding: "16px", borderRadius: "14px", border: "1px solid",
                  borderColor: isCustom ? "#0076ff" : "var(--glass-border)",
                  background: isCustom ? "linear-gradient(135deg, rgba(0,118,255, 0.2), rgba(0,198,255, 0.1))" : "var(--glass-bg)",
                  color: isCustom ? "#bae6fd" : "var(--text-secondary)",
                  fontWeight: "700", cursor: "pointer", fontSize: "15px",
                  boxShadow: isCustom ? "0 4px 16px rgba(0,118,255, 0.2), inset 0 1px 1px var(--border-color)" : "none"
                }}>
                Custom
              </button>
            </div>
            
            {isCustom && (
              <div style={{ marginTop: "16px", animation: "fadeIn 0.3s ease" }}>
                <div className="input-glow" style={{ borderRadius: "14px", border: "1px solid rgba(56, 189, 248, 0.4)", background: "rgba(0,118,255, 0.05)", display: "flex", alignItems: "center", padding: "0 16px" }}>
                  <input type="number" inputMode="decimal" value={customRate} 
                    onWheel={(e) => e.target.blur()}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "" || (Number(val) >= 0 && Number(val) <= 100)) setCustomRate(val);
                    }} 
                    placeholder="Enter custom percentage (e.g., 3)"
                    style={{ width: "100%", padding: "16px 0", background: "transparent", border: "none", fontSize: "16px", color: "var(--text-primary)", outline: "none", fontWeight: "600" }} />
                  <span style={{ color: "#38bdf8", fontWeight: "700" }}>%</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Compensation Cess (Optional)</label>
            <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid var(--border-color)", background: "var(--glass-bg)", display: "flex", alignItems: "center", padding: "4px 20px" }}>
              <input type="number" inputMode="decimal" value={cessRate === 0 ? "" : cessRate} 
                onWheel={(e) => e.target.blur()}
                onChange={e => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) setCessRate(val === "" ? 0 : Number(val));
                }} 
                placeholder="0"
                style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", fontSize: "18px", color: "var(--text-primary)", outline: "none", fontWeight: "600", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              />
              <span style={{ fontSize: "18px", color: "var(--text-secondary)", fontWeight: "500", marginLeft: "12px" }}>%</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "11px", marginTop: "8px", paddingLeft: "4px" }}>Applicable mostly on 28% slab goods like automobiles, tobacco, and aerated drinks.</p>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Transaction Type</label>
            <div className="responsive-grid">
              {[["intra", "🏙 Intra-State", "CGST + SGST"], ["inter", "🌐 Inter-State", "IGST only"]].map(([val, label, sub]) => (
                <button key={val} onClick={() => setTransactionType(val)}
                  className="interactive-btn"
                  style={{
                    padding: "16px 20px", borderRadius: "16px", border: "1px solid",
                    borderColor: transactionType === val ? "#0076ff" : "var(--glass-border)",
                    background: transactionType === val ? "linear-gradient(135deg, rgba(0,118,255, 0.15), rgba(0,198,255, 0.05))" : "var(--glass-bg)",
                    color: transactionType === val ? "#bae6fd" : "var(--text-secondary)",
                    cursor: "pointer", textAlign: "left",
                    boxShadow: transactionType === val ? "0 4px 16px rgba(0,118,255, 0.15), inset 0 1px 1px var(--border-color)" : "none"
                  }}>
                  <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "4px", color: transactionType === val ? "#fff" : "var(--text-primary)" }}>{label}</div>
                  <div style={{ fontSize: "13px", color: transactionType === val ? "#38bdf8" : "var(--text-secondary)", fontWeight: "500" }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="responsive-grid" style={{ marginBottom: "16px" }}>
            {[["exclusive", "➕ Add GST (Exclusive)", "#0076ff", "rgba(0,118,255,0.2)"], ["inclusive", "➖ Remove GST (Inclusive)", "#ec4899", "rgba(236,72,153,0.2)"]].map(([val, label, color, bg]) => (
              <button key={val} onClick={() => setType(val)}
                className="interactive-btn"
                style={{
                  padding: "16px 20px", borderRadius: "16px", border: "1px solid",
                  borderColor: type === val ? color : "var(--glass-border)",
                  background: type === val ? bg : "var(--glass-bg)",
                  color: type === val ? "#fff" : "var(--text-secondary)",
                  fontWeight: "700", cursor: "pointer", fontSize: "15px",
                  boxShadow: type === val ? `0 4px 16px ${bg}, inset 0 1px 1px var(--border-color)` : "none"
                }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", background: "var(--glass-bg)", borderRadius: "16px", border: "1px solid var(--glass-border)", transition: "all 0.3s ease" }}>
            <div>
              <p style={{ color: "var(--text-primary)", fontWeight: "700", fontSize: "15px", marginBottom: "2px" }}>Auto Round Off</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "500" }}>e.g. ₹1180.42 → ₹1180.00</p>
            </div>
            <div onClick={() => setRoundOff(!roundOff)} style={{ width: "52px", height: "28px", borderRadius: "16px", background: roundOff ? "#0076ff" : "var(--border-color)", cursor: "pointer", position: "relative", transition: "background 0.3s", boxShadow: roundOff ? "0 0 12px rgba(0,118,255, 0.4)" : "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
              <div style={{ position: "absolute", top: "4px", left: roundOff ? "28px" : "4px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </div>

        {result && (
          <div style={{ animation: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>

            <div style={{ background: type === "inclusive" ? "linear-gradient(145deg, rgba(0,198,255,0.15), rgba(16,185,129,0.1))" : "linear-gradient(145deg, rgba(0,118,255, 0.15), rgba(0,118,255,0.1))", border: type === "inclusive" ? "1px solid rgba(0,198,255,0.35)" : "1px solid rgba(0,118,255, 0.3)", borderRadius: "28px", padding: "48px 32px", textAlign: "center", marginBottom: "24px", position: "relative", overflow: "hidden", animation: "glowPulse 4s infinite" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />

              {type === "exclusive" ? (
                <>
                  <p style={{ color: "#bae6fd", fontSize: "13px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>Final Total Amount</p>
                  <p style={{ fontSize: "clamp(36px, 10vw, 64px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "linear-gradient(135deg, #ffffff, #bae6fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "countUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)", lineHeight: 1.1, wordBreak: "break-word", filter: "drop-shadow(0 4px 20px rgba(0,118,255, 0.3))" }}>
                    ₹{fmt(result.total)}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.2)", padding: "8px 20px", borderRadius: "30px", marginTop: "24px", border: "1px solid var(--glass-bg)", flexWrap: "wrap", justifyContent: "center" }}>
                    <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "var(--text-primary)" }}>₹{fmt(result.base)}</strong> Base</span>
                    <span style={{ color: "#475569" }}>+</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "var(--text-primary)" }}>₹{fmt(result.gst)}</strong> GST</span>
                    {cessRate > 0 && (
                      <>
                        <span style={{ color: "#475569" }}>+</span>
                        <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "var(--text-primary)" }}>₹{fmt(result.cess)}</strong> Cess</span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,198,255,0.12)", border: "1px solid rgba(0,198,255,0.25)", borderRadius: "50px", padding: "5px 14px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "11px", color: "#2dd4bf", fontWeight: "700", letterSpacing: "0.08em" }}>GST REMOVED FROM ₹{fmt(result.total)}</span>
                  </div>
                  <p style={{ color: "#99f6e4", fontSize: "13px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>Base Amount (GST Removed)</p>
                  <p style={{ fontSize: "clamp(36px, 10vw, 64px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "linear-gradient(135deg, #ffffff, #99f6e4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "countUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)", lineHeight: 1.1, wordBreak: "break-word", filter: "drop-shadow(0 4px 20px rgba(0,198,255,0.3))" }}>
                    ₹{fmt(result.base)}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.2)", padding: "8px 20px", borderRadius: "30px", marginTop: "24px", border: "1px solid var(--glass-bg)", flexWrap: "wrap", justifyContent: "center" }}>
                    <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "var(--text-primary)" }}>₹{fmt(result.base)}</strong> Base</span>
                    <span style={{ color: "#475569" }}>+</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#2dd4bf" }}>₹{fmt(result.gst)}</strong> GST</span>
                    {cessRate > 0 && (
                      <>
                        <span style={{ color: "#475569" }}>+</span>
                        <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#2dd4bf" }}>₹{fmt(result.cess)}</strong> Cess</span>
                      </>
                    )}
                    <span style={{ color: "#475569" }}>=</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "var(--text-primary)" }}>₹{fmt(result.total)}</strong> Paid</span>
                  </div>
                </>
              )}
            </div>


            <div className="responsive-grid" style={{ gap: "16px", marginBottom: "24px" }}>
              {[
                { label: "Base Amount", value: result.base, color: "#93c5fd", icon: "💎" },
                { label: `Total GST (${activeRate}%)`, value: result.gst, color: "#bae6fd", icon: "🏛" },
                ...(cessRate > 0 ? [{ label: `Cess (${cessRate}%)`, value: result.cess, color: "#f87171", icon: "🔥" }] : []),
                ...(transactionType === "intra"
                  ? [
                    { label: (
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        CGST
                        <span className="tooltip-container" tabIndex="0" title="Central Goods and Services Tax: Collected by the Central Government on intra-state sales.">
                          <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4m0-4h.01"></path></svg>
                        </span>
                      </span>
                    ), value: result.cgst, color: "#5eead4", icon: "🏛" }, 
                    { label: (
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        SGST
                        <span className="tooltip-container" tabIndex="0" title="State Goods and Services Tax: Collected by the State Government on intra-state sales.">
                          <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4m0-4h.01"></path></svg>
                        </span>
                      </span>
                    ), value: result.sgst, color: "#7dd3fc", icon: "🏛" }
                  ]
                  : [{ label: (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      IGST
                      <span className="tooltip-container" tabIndex="0" title="Integrated Goods and Services Tax: Collected by the Central Government on inter-state sales.">
                        <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4m0-4h.01"></path></svg>
                      </span>
                    </span>
                  ), value: result.igst, color: "#fcd34d", icon: "🌐" }])
              ].map((item, idx) => (
                <div key={item.label} className="breakdown-card glass-panel" style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", animation: `fadeIn 0.5s ease ${(idx + 1) * 0.1}s both` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "16px" }}>{item.icon}</span>
                    <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                  </div>
                  <p style={{ fontSize: "28px", fontWeight: "800", color: item.color, fontFamily: "'Plus Jakarta Sans',sans-serif", textShadow: `0 4px 12px ${item.color}40` }}>₹{fmt(item.value)}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel" style={{ borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
              <p style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>Visual Breakdown</p>
              <div style={{ height: "14px", borderRadius: "8px", overflow: "hidden", display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
                <div style={{ width: result.basePercent + "%", background: "linear-gradient(90deg, #2563eb, #60a5fa)", borderRadius: "8px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)" }}/>
                </div>
                <div style={{ width: result.gstPercent + "%", background: "linear-gradient(90deg, #0076ff, #00c6ff)", borderRadius: "8px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)" }}/>
                </div>
                {cessRate > 0 && (
                  <div style={{ width: result.cessPercent + "%", background: "linear-gradient(90deg, #ef4444, #f87171)", borderRadius: "8px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)" }}/>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#0076ff" }} />
                  <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "600" }}>Base <span style={{ color: "var(--text-secondary)", fontWeight: "500", marginLeft: "4px" }}>{result.basePercent}%</span></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#0076ff" }} />
                  <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "600" }}>Tax <span style={{ color: "var(--text-secondary)", fontWeight: "500", marginLeft: "4px" }}>{result.gstPercent}%</span></span>
                </div>
                {cessRate > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#ef4444" }} />
                    <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "600" }}>Cess <span style={{ color: "var(--text-secondary)", fontWeight: "500", marginLeft: "4px" }}>{result.cessPercent}%</span></span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px dashed var(--border-color)", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Calculation Formula Used</p>
              <p style={{ color: "#38bdf8", fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.05em", background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(0,118,255, 0.1)" }}>
                {type === "exclusive"
                  ? `GST = ₹${amount} × ${activeRate} ÷ 100 = ₹${result.gst}${cessRate > 0 ? `\nCess = ₹${amount} × ${cessRate} ÷ 100 = ₹${result.cess}` : ""}`
                  : `Base = ₹${amount} × 100 ÷ (100 + ${activeRate} + ${cessRate}) = ₹${result.base}`}
              </p>
            </div>

            <div className="responsive-grid-3">
              <button onClick={addToHistory} className="interactive-btn"
                style={{
                  width: "100%", padding: "18px",
                  background: "linear-gradient(135deg, rgba(0,118,255,0.15), rgba(37,99,235,0.05))",
                  border: "1px solid rgba(0,118,255,0.3)",
                  borderRadius: "16px", color: "#93c5fd",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}>
                💾 Save Result
              </button>
              
              <button onClick={copyResult} className="interactive-btn"
                style={{
                  width: "100%", padding: "18px",
                  background: copied ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1))" : "linear-gradient(135deg, rgba(0,118,255, 0.2), rgba(0,198,255, 0.1))",
                  border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : "rgba(0,118,255, 0.4)"}`,
                  borderRadius: "16px", color: copied ? "#6ee7b7" : "#bae6fd",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  boxShadow: copied ? "0 4px 16px rgba(16,185,129,0.2)" : "0 4px 16px rgba(0,118,255, 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}>
                {copied ? "✓ Copied!" : "📋 Copy Result"}
              </button>
              
              <button
                onClick={clearAll}
                className="interactive-btn"
                style={{
                  width: "100%", padding: "18px",
                  background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(220,38,38,0.05))",
                  border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", color: "#fca5a5",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}>
                🗑 Clear All
              </button>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="glass-panel" style={{ marginTop: "40px", borderRadius: "24px", padding: "32px", animation: "fadeIn 0.6s ease" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🕒</span> Saved Calculations
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {history.map((h, i) => (
                <div key={i + h.time} onClick={() => setAmount(h.amount)} className="breakdown-card"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "var(--glass-bg)", border: "1px solid var(--glass-bg)", borderRadius: "16px", cursor: "pointer" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: "600" }}>₹{fmt(h.amount)} <span style={{ color: "var(--text-secondary)", fontWeight: "400" }}>@ {h.rate}%</span></span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h.type} • {h.time}</span>
                  </div>
                  <span style={{ color: "#bae6fd", fontWeight: "800", fontSize: "18px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>₹{fmt(h.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
