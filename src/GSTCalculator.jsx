import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState(18);
  const [customRate, setCustomRate] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [type, setType] = useState("exclusive");
  const [transactionType, setTransactionType] = useState("intra");
  const [roundOff, setRoundOff] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [preset, setPreset] = useState(null);

  // 🚀 BUG FIX: Safely parse custom rates to prevent 0% from crashing the app
  const activeRate = isCustom ? (customRate === "" ? 0 : Number(customRate)) : Number(gstRate);

  const presets = [
    { label: "🍽 Restaurant", rate: 5 },
    { label: "👔 Clothing", rate: 12 },
    { label: "💻 Electronics", rate: 18 },
    { label: "🚗 Luxury", rate: 28 },
    { label: "💊 Medicine", rate: 5 },
    { label: "🏠 Real Estate", rate: 12 },
    { label: "🥛 Food/Milk", rate: 0 },
    { label: "🥇 Gold", rate: 3 },
  ];

  // 🚀 ADVANCED SEO: Dual JSON-LD Schema Injection for Google Rich Snippets
  useEffect(() => {
    document.title = "GST Calculator India | Free CGST, SGST & IGST Tool | KaroTools";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Free online GST calculator for India. Instantly calculate exclusive and inclusive GST, CGST, SGST, and IGST for all tax slabs including 0%, 5%, 12%, 18%, and 28%.";

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "KaroTools GST Calculator",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "WebBrowser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
          "description": "Calculate IGST, CGST, and SGST instantly with this free GST Calculator."
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are GST slabs in India?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "India has primary GST slabs: 0% (essential items like milk), 3% (gold), 5% (restaurants, medicines), 12% (standard goods), 18% (services, electronics), and 28% (luxury goods)."
              }
            },
            {
              "@type": "Question",
              "name": "What is IGST vs CGST/SGST?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For intra-state transactions, GST is split equally into CGST (Central) and SGST (State). For inter-state transactions, IGST (Integrated GST) is charged."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(schemaScript);

    return () => {
      if (document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript);
      }
    };
  }, []);

  // 🚀 BUG FIX: Calculation Engine Update
  useEffect(() => {
    const amt = Number(amount);
    
    // We strictly use activeRate < 0 now, allowing 0% to safely pass and calculate!
    if (amount === "" || isNaN(amt) || amt <= 0 || isNaN(activeRate) || activeRate < 0 || activeRate > 100) { 
      setResult(null); 
      return; 
    }

    let base, gst, total;
    if (type === "exclusive") {
      base = amt;
      gst = (amt * activeRate) / 100;
      total = amt + gst;
    } else {
      total = amt;
      base = (amt * 100) / (100 + activeRate);
      gst = total - base;
    }

    if (roundOff) {
      base = Math.round(base);
      gst = Math.round(gst);
      total = Math.round(total);
    }

    const r = {
      base: base.toFixed(roundOff ? 0 : 2),
      gst: gst.toFixed(roundOff ? 0 : 2),
      total: total.toFixed(roundOff ? 0 : 2),
      cgst: (gst / 2).toFixed(roundOff ? 0 : 2),
      sgst: (gst / 2).toFixed(roundOff ? 0 : 2),
      igst: gst.toFixed(roundOff ? 0 : 2),
      basePercent: total > 0 ? Math.round((base / total) * 100) : 0,
      gstPercent: total > 0 ? Math.round((gst / total) * 100) : 0,
    };
    setResult(r);
  }, [amount, activeRate, type, roundOff]);

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
      return [entry, ...prev.slice(0, 4)];
    });
  };

  const copyResult = () => {
    if (!result) return;
    const lines = [
      `GST Calculation — KaroTools`,
      `Amount: ₹${amount} | Rate: ${activeRate}% | Type: ${type}`,
      `Base Amount: ₹${result.base}`,
      `GST (${activeRate}%): ₹${result.gst}`,
      transactionType === "intra" ? `CGST: ₹${result.cgst} | SGST: ₹${result.sgst}` : `IGST: ₹${result.igst}`,
      `Total: ₹${result.total}`,
    ].join("\n");
    
    navigator.clipboard.writeText(lines)
      .then(() => {
        setCopied(true);
        addToHistory(); 
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy."));
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
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", selectionColor: "#fff", selectionBackground: "#0ea5e9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(14, 165, 233, 0.4); color: white; }
        ::-moz-selection { background: rgba(14, 165, 233, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
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
        .interactive-btn:active { transform: translateY(1px) scale(0.98); }

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
          white-space: nowrap;
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
        @media (min-width: 640px) { .responsive-grid { grid-template-columns: 1fr 1fr; } }

        .responsive-grid-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) { .responsive-grid-3 { grid-template-columns: 1fr 1fr 1fr; } }

        /* Dynamic Fluid Grid for 7 buttons */
        .responsive-grid-rates {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
          gap: 10px;
        }

        .input-glow { transition: all 0.3s ease; }
        .input-glow:focus-within {
          border-color: rgba(56, 189, 248, 0.6) !important;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15), inset 0 2px 4px rgba(0,0,0,0.2);
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .breakdown-card { transition: all 0.3s ease; }
        .breakdown-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.15) !important;
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

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      {/* Navbar */}
      <header className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif" }} className="brand-text">⚡ KaroTools</span>
          <Link to="/" className="interactive-btn home-btn" style={{ padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            ← Home
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>

        {/* Hero Title */}
        <section style={{ textAlign: "center", marginBottom: "48px", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>🧮</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 42px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", letterSpacing: "-0.02em", background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>GST Calculator</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "400", letterSpacing: "0.01em" }}>Professional GST calculation for Indian businesses</p>
        </section>

        {/* Dynamic Mobile-Scrollable Presets */}
        <section style={{ marginBottom: "24px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "nowrap", overflowX: "auto", paddingBottom: "8px", WebkitOverflowScrolling: "touch" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { setPreset(p.label); setGstRate(p.rate); setIsCustom(false); setCustomRate(""); }}
                className="preset-btn"
                aria-label={`Apply preset ${p.label}`}
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
        </section>

        {/* Main Interface */}
        <section className="glass-panel" style={{ borderRadius: "28px", padding: "clamp(24px, 5vw, 40px)", marginBottom: "32px", animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>

          {/* Amount Input */}
          <div style={{ marginBottom: "32px" }}>
            <label htmlFor="base-amount" style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Amount (₹)</label>
            <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "4px 20px" }}>
              <span style={{ fontSize: "24px", color: "#64748b", fontWeight: "500", marginRight: "12px" }}>₹</span>
              <input id="base-amount" type="number" value={amount} 
                onChange={e => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) setAmount(val);
                }} 
                placeholder="0.00"
                style={{ width: "100%", padding: "18px 0", background: "transparent", border: "none", fontSize: "clamp(22px, 5vw, 28px)", color: "#f8fafc", outline: "none", fontWeight: "800", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.02em" }}
              />
            </div>
          </div>

          {/* GST Rate Buttons */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>GST Rate</label>
            <div className="responsive-grid-rates">
              {[0, 3, 5, 12, 18, 28].map(rate => (
                <button key={rate} onClick={() => { setGstRate(rate); setIsCustom(false); setPreset(null); setCustomRate(""); }}
                  className="interactive-btn"
                  aria-label={`Set GST Rate to ${rate}%`}
                  style={{
                    padding: "clamp(12px, 2vw, 16px)", borderRadius: "14px", border: "1px solid",
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
                aria-label="Set Custom GST Rate"
                style={{
                  padding: "clamp(12px, 2vw, 16px)", borderRadius: "14px", border: "1px solid",
                  borderColor: isCustom ? "#0ea5e9" : "rgba(255,255,255,0.08)",
                  background: isCustom ? "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(20, 184, 166, 0.1))" : "rgba(255,255,255,0.02)",
                  color: isCustom ? "#bae6fd" : "#94a3b8",
                  fontWeight: "700", cursor: "pointer", fontSize: "14px",
                  boxShadow: isCustom ? "0 4px 16px rgba(14, 165, 233, 0.2), inset 0 1px 1px rgba(255,255,255,0.1)" : "none"
                }}>
                Custom
              </button>
            </div>
            
            {/* Custom Input */}
            {isCustom && (
              <div style={{ marginTop: "16px", animation: "fadeIn 0.3s ease" }}>
                <div className="input-glow" style={{ borderRadius: "14px", border: "1px solid rgba(56, 189, 248, 0.4)", background: "rgba(14, 165, 233, 0.05)", display: "flex", alignItems: "center", padding: "0 16px" }}>
                  <input id="custom-gst" type="number" value={customRate} 
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "" || (Number(val) >= 0 && Number(val) <= 100)) setCustomRate(val);
                    }} 
                    placeholder="Enter Custom % (e.g. 18)"
                    style={{ width: "100%", padding: "16px 0", background: "transparent", border: "none", fontSize: "16px", color: "#f8fafc", outline: "none", fontWeight: "600" }} />
                  <span style={{ color: "#38bdf8", fontWeight: "700" }}>%</span>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Type */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Transaction Setup</label>
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

          {/* Type Grid */}
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

          {/* Round off toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s ease" }}>
            <div>
              <p style={{ color: "#cbd5e1", fontWeight: "700", fontSize: "15px", marginBottom: "2px" }}>Auto Round Off</p>
              <p style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>e.g. ₹1180.42 → ₹1180.00</p>
            </div>
            <div onClick={() => setRoundOff(!roundOff)} role="switch" aria-checked={roundOff} style={{ width: "52px", height: "28px", borderRadius: "16px", background: roundOff ? "#0ea5e9" : "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative", transition: "background 0.3s", boxShadow: roundOff ? "0 0 12px rgba(14, 165, 233, 0.4)" : "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
              <div style={{ position: "absolute", top: "4px", left: roundOff ? "28px" : "4px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </section>

        {/* Dynamic Results Section */}
        {result && (
          <section style={{ animation: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>

            {/* Total Hero Banner */}
            <div style={{ background: "linear-gradient(145deg, rgba(14, 165, 233, 0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(14, 165, 233, 0.3)", borderRadius: "28px", padding: "clamp(32px, 6vw, 48px) clamp(20px, 4vw, 32px)", textAlign: "center", marginBottom: "24px", position: "relative", overflow: "hidden", animation: "glowPulse 4s infinite" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
              
              <p style={{ color: "#bae6fd", fontSize: "13px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>Final Total Amount</p>
              <p style={{ fontSize: "clamp(40px, 8vw, 64px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #ffffff, #bae6fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, filter: "drop-shadow(0 4px 20px rgba(14, 165, 233, 0.3))", wordBreak: "break-word" }}>
                ₹{fmt(result.total)}
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.2)", padding: "8px 20px", borderRadius: "30px", marginTop: "24px", border: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", justifyContent: "center" }}>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.base)}</strong> Base</span>
                <span style={{ color: "#475569" }}>+</span>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.gst)}</strong> GST</span>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="responsive-grid" style={{ gap: "16px", marginBottom: "24px" }}>
              {[
                { label: "Base Amount", value: result.base, color: "#93c5fd", icon: "💎" },
                { label: `Total GST (${activeRate}%)`, value: result.gst, color: "#bae6fd", icon: "🏛" },
                ...(transactionType === "intra"
                  ? [{ label: "CGST (Central)", value: result.cgst, color: "#5eead4", icon: "🏛" }, { label: "SGST (State)", value: result.sgst, color: "#7dd3fc", icon: "🏛" }]
                  : [{ label: "IGST (Integrated)", value: result.igst, color: "#fcd34d", icon: "🌐" }])
              ].map((item, idx) => (
                <div key={item.label} className="breakdown-card glass-panel" style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", animation: `fadeIn 0.5s ease ${(idx + 1) * 0.1}s both` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "16px" }}>{item.icon}</span>
                    <p style={{ color: "#94a3b8", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                  </div>
                  <p style={{ fontSize: "clamp(24px, 5vw, 28px)", fontWeight: "800", color: item.color, fontFamily: "'Syne',sans-serif", textShadow: `0 4px 12px ${item.color}40`, wordBreak: "break-word" }}>₹{fmt(item.value)}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="responsive-grid-3">
              <button onClick={addToHistory} className="interactive-btn" aria-label="Save Result"
                style={{
                  width: "100%", padding: "18px",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))",
                  border: "1px solid rgba(59,130,246,0.3)", borderRadius: "16px", color: "#93c5fd",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}>
                💾 Save
              </button>
              
              <button onClick={copyResult} className="interactive-btn" aria-label="Copy Result"
                style={{
                  width: "100%", padding: "18px",
                  background: copied ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1))" : "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(20, 184, 166, 0.1))",
                  border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : "rgba(14, 165, 233, 0.4)"}`,
                  borderRadius: "16px", color: copied ? "#6ee7b7" : "#bae6fd",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  boxShadow: copied ? "0 4px 16px rgba(16,185,129,0.2)" : "0 4px 16px rgba(14, 165, 233, 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}>
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
              
              <button onClick={clearAll} className="interactive-btn" aria-label="Clear All"
                style={{
                  width: "100%", padding: "18px",
                  background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(220,38,38,0.05))",
                  border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", color: "#fca5a5",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}>
                🗑 Clear
              </button>
            </div>
          </section>
        )}

        {/* History Panel */}
        {history.length > 0 && (
          <section className="glass-panel" style={{ marginTop: "40px", borderRadius: "24px", padding: "32px", animation: "fadeIn 0.6s ease" }}>
            <p style={{ color: "#cbd5e1", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🕒</span> Saved Calculations
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {history.map((h, i) => (
                <div key={i + h.time} onClick={() => setAmount(h.amount)} className="breakdown-card"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", cursor: "pointer", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#e2e8f0", fontSize: "15px", fontWeight: "600" }}>₹{fmt(h.amount)} <span style={{ color: "#64748b", fontWeight: "400" }}>@ {h.rate}%</span></span>
                    <span style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h.type} • {h.time}</span>
                  </div>
                  <span style={{ color: "#bae6fd", fontWeight: "800", fontSize: "18px", fontFamily: "'Syne',sans-serif" }}>₹{fmt(h.total)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEO FAQ Section */}
        <section style={{ marginTop: "80px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          <div style={{ paddingTop: "64px" }}>
            <h2 style={{ fontSize: "clamp(24px, 5vw, 28px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "32px", textAlign: "center" }}>Pricing & Tax Guidance</h2>
            <div className="responsive-grid" style={{ gap: "24px" }}>
              {[
                { q: "What are GST slabs in India (Updated)?", a: "India categorizes taxes into primary slabs: 0% (essential items like milk, vegetables), 3% (gold, silver), 5% (restaurants, medicines), 12% (standard goods), 18% (most services, software), and 28% (luxury goods, automobiles)." },
                { q: "What is GST on restaurant food?", a: "Restaurant GST is 5% for non-AC and standalone restaurants. AC restaurants in hotels with a room tariff below ₹7,500 also charge 5%. ITC (Input Tax Credit) is not available." },
                { q: "What is IGST vs CGST/SGST?", a: "For intra-state transactions (within the same state), GST is split equally into CGST (Central) and SGST (State). For inter-state transactions, IGST (Integrated GST) is charged." },
                { q: "What is GST on freelance services?", a: "Freelance services such as web development, design, and consulting are taxed at 18% GST. Freelancers with an annual turnover exceeding ₹20 lakhs must register for GST." }
              ].map((item, i) => (
                <div key={item.q} className="glass-panel" style={{ padding: "clamp(24px, 4vw, 32px)", borderRadius: "20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ background: "rgba(14, 165, 233, 0.15)", color: "#38bdf8", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", flexShrink: 0, marginTop: "2px", boxShadow: "0 0 12px rgba(14, 165, 233, 0.2)" }}>
                      {i + 1}
                    </div>
                    <h3 style={{ fontSize: "clamp(16px, 3vw, 18px)", fontWeight: "700", color: "#f1f5f9", fontFamily: "'Syne',sans-serif", lineHeight: "1.4" }}>{item.q}</h3>
                  </div>
                  <p style={{ fontSize: "clamp(14px, 2.5vw, 15px)", color: "#94a3b8", lineHeight: "1.8", paddingLeft: "44px" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
