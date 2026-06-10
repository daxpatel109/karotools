import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function GSTCalculator() {
  const { keyword } = useParams();

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

  const [amount, setAmount] = useState(() => localStorage.getItem("gst_amount") || "");
  const [gstRate, setGstRate] = useState(() => Number(localStorage.getItem("gst_rate")) || 18);
  const [customRate, setCustomRate] = useState(() => localStorage.getItem("gst_customRate") || "");
  const [isCustom, setIsCustom] = useState(() => localStorage.getItem("gst_isCustom") === "true");
  const [cessRate, setCessRate] = useState(() => Number(localStorage.getItem("gst_cessRate")) || 0);
  const [type, setType] = useState(() => localStorage.getItem("gst_type") || "exclusive");
  const [transactionType, setTransactionType] = useState(() => localStorage.getItem("gst_transactionType") || "intra");
  const [roundOff, setRoundOff] = useState(() => localStorage.getItem("gst_roundOff") === "true");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("gst_history")) || []; } catch { return []; }
  });
  const [preset, setPreset] = useState(() => localStorage.getItem("gst_preset") || null);

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

  // SERP SEO & Schema Injection
  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, []);

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
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", selectionColor: "#fff", selectionBackground: "#0ea5e9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(14, 165, 233, 0.4); color: white; }
        ::-moz-selection { background: rgba(14, 165, 233, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes countUp { from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)} }
        @keyframes glowPulse { 0%{box-shadow: 0 0 40px rgba(14, 165, 233, 0.15)} 50%{box-shadow: 0 0 60px rgba(14, 165, 233, 0.3)} 100%{box-shadow: 0 0 40px rgba(14, 165, 233, 0.15)} }
        
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        input::placeholder { color: #475569; }

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

        .home-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #cbd5e1;
          text-decoration: none;
        }
        .home-btn:hover {
          background: rgba(14, 165, 233, 0.15);
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
          background: rgba(255,255,255,0.08) !important;
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
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15), inset 0 2px 4px rgba(0,0,0,0.2);
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .breakdown-card {
          transition: all 0.3s ease;
        }
        .breakdown-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.15) !important;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-text {
          background: linear-gradient(135deg, #0ea5e9, #14b8a6, #0ea5e9);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }

        @keyframes shine { to { background-position: 200% center; } }
      `}} />

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "40%", width: "30%", height: "30%", background: "radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none" }}><div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div></Link>
          
          <Link
            to="/"
            className="interactive-btn home-btn"
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ← Home
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: "48px", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>🧮</span>
          </div>
          <h1 className="gradient-text" style={{ fontSize: "42px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", letterSpacing: "-0.02em" }}>{seoH1}</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "400", letterSpacing: "0.01em" }}>Professional GST calculation for Indian businesses • All slabs supported</p>
        </div>

        <div style={{ marginBottom: "24px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", marginLeft: "4px" }}>Quick Presets</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { setPreset(p.label); setGstRate(p.rate); setIsCustom(false); setCustomRate(""); }}
                className="preset-btn"
                style={{
                  border: "1px solid",
                  borderColor: preset === p.label ? "rgba(56, 189, 248, 0.6)" : "rgba(255,255,255,0.08)",
                  background: preset === p.label ? "rgba(14, 165, 233, 0.15)" : "rgba(255,255,255,0.03)",
                  color: preset === p.label ? "#bae6fd" : "#94a3b8",
                  boxShadow: preset === p.label ? "0 0 20px rgba(14, 165, 233, 0.15)" : "none",
                }}>
                {p.label} <span style={{ opacity: 0.6, marginLeft: "4px" }}>· {p.rate}%</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ borderRadius: "28px", padding: "40px", marginBottom: "32px", animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Amount (₹)</label>
            <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "4px 20px" }}>
              <span style={{ fontSize: "24px", color: "#64748b", fontWeight: "500", marginRight: "12px" }}>₹</span>
              {/* 🚀 SCROLL BUG FIX APPLIED HERE */}
              <input type="number" value={amount} 
                onWheel={(e) => e.target.blur()}
                onChange={e => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) setAmount(val);
                }} 
                placeholder="0.00"
                style={{ width: "100%", padding: "18px 0", background: "transparent", border: "none", fontSize: "28px", color: "#f8fafc", outline: "none", fontWeight: "800", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.02em" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>GST Rate</label>
            <div className="responsive-grid-rates">
              {[0, 3, 5, 12, 18, 28].map(rate => (
                <button key={rate} onClick={() => { setGstRate(rate); setIsCustom(false); setPreset(null); setCustomRate(""); }}
                  className="interactive-btn"
                  style={{
                    padding: "16px", borderRadius: "14px", border: "1px solid",
                    borderColor: !isCustom && gstRate === rate ? "#0ea5e9" : "rgba(255,255,255,0.08)",
                    background: !isCustom && gstRate === rate ? "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(20, 184, 166, 0.1))" : "rgba(255,255,255,0.02)",
                    color: !isCustom && gstRate === rate ? "#bae6fd" : "#94a3b8",
                    fontWeight: "700", cursor: "pointer", fontSize: "16px",
                    boxShadow: !isCustom && gstRate === rate ? "0 4px 16px rgba(14, 165, 233, 0.2), inset 0 1px 1px rgba(255,255,255,0.1)" : "none"
                  }}>
                  {rate}%
                </button>
              ))}
              
              <button onClick={() => { setIsCustom(true); setPreset(null); }}
                className="interactive-btn"
                style={{
                  padding: "16px", borderRadius: "14px", border: "1px solid",
                  borderColor: isCustom ? "#0ea5e9" : "rgba(255,255,255,0.08)",
                  background: isCustom ? "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(20, 184, 166, 0.1))" : "rgba(255,255,255,0.02)",
                  color: isCustom ? "#bae6fd" : "#94a3b8",
                  fontWeight: "700", cursor: "pointer", fontSize: "15px",
                  boxShadow: isCustom ? "0 4px 16px rgba(14, 165, 233, 0.2), inset 0 1px 1px rgba(255,255,255,0.1)" : "none"
                }}>
                Custom
              </button>
            </div>
            
            {isCustom && (
              <div style={{ marginTop: "16px", animation: "fadeIn 0.3s ease" }}>
                <div className="input-glow" style={{ borderRadius: "14px", border: "1px solid rgba(56, 189, 248, 0.4)", background: "rgba(14, 165, 233, 0.05)", display: "flex", alignItems: "center", padding: "0 16px" }}>
                  {/* 🚀 SCROLL BUG FIX APPLIED HERE TOO */}
                  <input type="number" value={customRate} 
                    onWheel={(e) => e.target.blur()}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "" || (Number(val) >= 0 && Number(val) <= 100)) setCustomRate(val);
                    }} 
                    placeholder="Enter custom percentage (e.g., 3)"
                    style={{ width: "100%", padding: "16px 0", background: "transparent", border: "none", fontSize: "16px", color: "#f8fafc", outline: "none", fontWeight: "600" }} />
                  <span style={{ color: "#38bdf8", fontWeight: "700" }}>%</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Compensation Cess (Optional)</label>
            <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "4px 20px" }}>
              <input type="number" value={cessRate === 0 ? "" : cessRate} 
                onWheel={(e) => e.target.blur()}
                onChange={e => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) setCessRate(val === "" ? 0 : Number(val));
                }} 
                placeholder="0"
                style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", fontSize: "18px", color: "#f8fafc", outline: "none", fontWeight: "600", fontFamily: "'Syne',sans-serif" }}
              />
              <span style={{ fontSize: "18px", color: "#64748b", fontWeight: "500", marginLeft: "12px" }}>%</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "11px", marginTop: "8px", paddingLeft: "4px" }}>Applicable mostly on 28% slab goods like automobiles, tobacco, and aerated drinks.</p>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Transaction Type</label>
            <div className="responsive-grid">
              {[["intra", "🏙 Intra-State", "CGST + SGST"], ["inter", "🌐 Inter-State", "IGST only"]].map(([val, label, sub]) => (
                <button key={val} onClick={() => setTransactionType(val)}
                  className="interactive-btn"
                  style={{
                    padding: "16px 20px", borderRadius: "16px", border: "1px solid",
                    borderColor: transactionType === val ? "#0ea5e9" : "rgba(255,255,255,0.08)",
                    background: transactionType === val ? "linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(20, 184, 166, 0.05))" : "rgba(255,255,255,0.02)",
                    color: transactionType === val ? "#bae6fd" : "#94a3b8",
                    cursor: "pointer", textAlign: "left",
                    boxShadow: transactionType === val ? "0 4px 16px rgba(14, 165, 233, 0.15), inset 0 1px 1px rgba(255,255,255,0.1)" : "none"
                  }}>
                  <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "4px", color: transactionType === val ? "#fff" : "#cbd5e1" }}>{label}</div>
                  <div style={{ fontSize: "13px", color: transactionType === val ? "#38bdf8" : "#64748b", fontWeight: "500" }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="responsive-grid" style={{ marginBottom: "16px" }}>
            {[["exclusive", "➕ Add GST (Exclusive)", "#3b82f6", "rgba(59,130,246,0.2)"], ["inclusive", "➖ Remove GST (Inclusive)", "#ec4899", "rgba(236,72,153,0.2)"]].map(([val, label, color, bg]) => (
              <button key={val} onClick={() => setType(val)}
                className="interactive-btn"
                style={{
                  padding: "16px 20px", borderRadius: "16px", border: "1px solid",
                  borderColor: type === val ? color : "rgba(255,255,255,0.08)",
                  background: type === val ? bg : "rgba(255,255,255,0.02)",
                  color: type === val ? "#fff" : "#94a3b8",
                  fontWeight: "700", cursor: "pointer", fontSize: "15px",
                  boxShadow: type === val ? `0 4px 16px ${bg}, inset 0 1px 1px rgba(255,255,255,0.1)` : "none"
                }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s ease" }}>
            <div>
              <p style={{ color: "#cbd5e1", fontWeight: "700", fontSize: "15px", marginBottom: "2px" }}>Auto Round Off</p>
              <p style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>e.g. ₹1180.42 → ₹1180.00</p>
            </div>
            <div onClick={() => setRoundOff(!roundOff)} style={{ width: "52px", height: "28px", borderRadius: "16px", background: roundOff ? "#0ea5e9" : "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative", transition: "background 0.3s", boxShadow: roundOff ? "0 0 12px rgba(14, 165, 233, 0.4)" : "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
              <div style={{ position: "absolute", top: "4px", left: roundOff ? "28px" : "4px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </div>

        {result && (
          <div style={{ animation: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>

            <div style={{ background: type === "inclusive" ? "linear-gradient(145deg, rgba(20,184,166,0.15), rgba(16,185,129,0.1))" : "linear-gradient(145deg, rgba(14, 165, 233, 0.15), rgba(59,130,246,0.1))", border: type === "inclusive" ? "1px solid rgba(20,184,166,0.35)" : "1px solid rgba(14, 165, 233, 0.3)", borderRadius: "28px", padding: "48px 32px", textAlign: "center", marginBottom: "24px", position: "relative", overflow: "hidden", animation: "glowPulse 4s infinite" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />

              {type === "exclusive" ? (
                <>
                  <p style={{ color: "#bae6fd", fontSize: "13px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>Final Total Amount</p>
                  <p style={{ fontSize: "64px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #ffffff, #bae6fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "countUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)", lineHeight: 1, filter: "drop-shadow(0 4px 20px rgba(14, 165, 233, 0.3))" }}>
                    ₹{fmt(result.total)}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.2)", padding: "8px 20px", borderRadius: "30px", marginTop: "24px", border: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", justifyContent: "center" }}>
                    <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.base)}</strong> Base</span>
                    <span style={{ color: "#475569" }}>+</span>
                    <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.gst)}</strong> GST</span>
                    {cessRate > 0 && (
                      <>
                        <span style={{ color: "#475569" }}>+</span>
                        <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.cess)}</strong> Cess</span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.25)", borderRadius: "50px", padding: "5px 14px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "11px", color: "#2dd4bf", fontWeight: "700", letterSpacing: "0.08em" }}>GST REMOVED FROM ₹{fmt(result.total)}</span>
                  </div>
                  <p style={{ color: "#99f6e4", fontSize: "13px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>Base Amount (GST Removed)</p>
                  <p style={{ fontSize: "64px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #ffffff, #99f6e4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "countUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)", lineHeight: 1, filter: "drop-shadow(0 4px 20px rgba(20,184,166,0.3))" }}>
                    ₹{fmt(result.base)}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.2)", padding: "8px 20px", borderRadius: "30px", marginTop: "24px", border: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", justifyContent: "center" }}>
                    <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.base)}</strong> Base</span>
                    <span style={{ color: "#475569" }}>+</span>
                    <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#2dd4bf" }}>₹{fmt(result.gst)}</strong> GST</span>
                    {cessRate > 0 && (
                      <>
                        <span style={{ color: "#475569" }}>+</span>
                        <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#2dd4bf" }}>₹{fmt(result.cess)}</strong> Cess</span>
                      </>
                    )}
                    <span style={{ color: "#475569" }}>=</span>
                    <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.total)}</strong> Paid</span>
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
                  ? [{ label: "CGST (Central)", value: result.cgst, color: "#5eead4", icon: "🏛" }, { label: "SGST (State)", value: result.sgst, color: "#7dd3fc", icon: "🏛" }]
                  : [{ label: "IGST (Integrated)", value: result.igst, color: "#fcd34d", icon: "🌐" }])
              ].map((item, idx) => (
                <div key={item.label} className="breakdown-card glass-panel" style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", animation: `fadeIn 0.5s ease ${(idx + 1) * 0.1}s both` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "16px" }}>{item.icon}</span>
                    <p style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                  </div>
                  <p style={{ fontSize: "28px", fontWeight: "800", color: item.color, fontFamily: "'Syne',sans-serif", textShadow: `0 4px 12px ${item.color}40` }}>₹{fmt(item.value)}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel" style={{ borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
              <p style={{ color: "#cbd5e1", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>Visual Breakdown</p>
              <div style={{ height: "14px", borderRadius: "8px", overflow: "hidden", display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
                <div style={{ width: result.basePercent + "%", background: "linear-gradient(90deg, #2563eb, #60a5fa)", borderRadius: "8px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)" }}/>
                </div>
                <div style={{ width: result.gstPercent + "%", background: "linear-gradient(90deg, #0ea5e9, #14b8a6)", borderRadius: "8px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden" }}>
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
                  <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#3b82f6" }} />
                  <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: "600" }}>Base <span style={{ color: "#94a3b8", fontWeight: "500", marginLeft: "4px" }}>{result.basePercent}%</span></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#0ea5e9" }} />
                  <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: "600" }}>Tax <span style={{ color: "#94a3b8", fontWeight: "500", marginLeft: "4px" }}>{result.gstPercent}%</span></span>
                </div>
                {cessRate > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#ef4444" }} />
                    <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: "600" }}>Cess <span style={{ color: "#94a3b8", fontWeight: "500", marginLeft: "4px" }}>{result.cessPercent}%</span></span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Calculation Formula Used</p>
              <p style={{ color: "#38bdf8", fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.05em", background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(14, 165, 233, 0.1)" }}>
                {type === "exclusive"
                  ? `GST = ₹${amount} × ${activeRate} ÷ 100 = ₹${result.gst}${cessRate > 0 ? `\nCess = ₹${amount} × ${cessRate} ÷ 100 = ₹${result.cess}` : ""}`
                  : `Base = ₹${amount} × 100 ÷ (100 + ${activeRate} + ${cessRate}) = ₹${result.base}`}
              </p>
            </div>

            <div className="responsive-grid-3">
              <button onClick={addToHistory} className="interactive-btn"
                style={{
                  width: "100%", padding: "18px",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))",
                  border: "1px solid rgba(59,130,246,0.3)",
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
                  background: copied ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1))" : "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(20, 184, 166, 0.1))",
                  border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : "rgba(14, 165, 233, 0.4)"}`,
                  borderRadius: "16px", color: copied ? "#6ee7b7" : "#bae6fd",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  boxShadow: copied ? "0 4px 16px rgba(16,185,129,0.2)" : "0 4px 16px rgba(14, 165, 233, 0.2)",
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
            <p style={{ color: "#cbd5e1", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🕒</span> Saved Calculations
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {history.map((h, i) => (
                <div key={i + h.time} onClick={() => setAmount(h.amount)} className="breakdown-card"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", cursor: "pointer" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#e2e8f0", fontSize: "15px", fontWeight: "600" }}>₹{fmt(h.amount)} <span style={{ color: "#64748b", fontWeight: "400" }}>@ {h.rate}%</span></span>
                    <span style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h.type} • {h.time}</span>
                  </div>
                  <span style={{ color: "#bae6fd", fontWeight: "800", fontSize: "18px", fontFamily: "'Syne',sans-serif" }}>₹{fmt(h.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: "80px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          <div style={{ paddingTop: "64px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "32px", textAlign: "center" }}>Frequently Asked Questions</h2>
            <div className="responsive-grid" style={{ gap: "20px" }}>
              {[
                { q: "What are GST slabs in India 2026?", a: "India has 6 GST slabs: 0% (essential items like milk, vegetables, books), 0.25% (rough precious stones), 3% (gold, silver), 5% (essential goods, restaurants, medicines), 12% (standard goods, clothing above ₹1000), 18% (most services, electronics, software), and 28% (luxury goods, automobiles, tobacco, cement)." },
                { q: "What is GST on restaurant food?", a: "Restaurant GST is 5% for non-AC restaurants and standalone restaurants. AC restaurants in hotels with room tariff below ₹7500 also charge 5%. No ITC (Input Tax Credit) is available on restaurant services." },
                { q: "What is GST on gold in India?", a: "GST on gold is 3% on the value of gold, plus 5% on making charges. This applies to gold jewellery, coins, and bars across India." },
                { q: "What is GST on freelance services?", a: "Freelance services like web development, design, content writing, and consulting are taxed at 18% GST. Freelancers with annual turnover above ₹20 lakhs must register for GST." },
                { q: "What is IGST vs CGST/SGST?", a: "For intra-state transactions (same state), GST splits equally into CGST (Central) + SGST (State). For inter-state transactions, IGST (Integrated GST) is charged instead — collected by the central government and shared with states." },
                { q: "What is GST on clothing?", a: "Clothing and garments below ₹1000 are taxed at 5% GST. Garments above ₹1000 are taxed at 12% GST. This applies to readymade garments and apparel sold across India." },
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

        {/* Universal Legal Disclaimer */}
        <div style={{ marginTop: "40px", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.6", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
            <strong>Disclaimer:</strong> All calculators and tools on KaroTools.in are provided for educational and informational purposes only. While we strive to keep the logic updated with the latest Indian tax laws (FY 2025-26), the results generated are estimates and do not constitute professional financial, legal, or tax advice. We strongly recommend consulting a certified Chartered Accountant or legal professional before making any business decisions or filing your taxes. KaroTools is not responsible for any financial loss, penalties, or compliance errors resulting from the use of this website.
          </p>
        </div>

      </div>
    </div>
  );
}
