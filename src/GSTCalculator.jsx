import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GSTCalculator() {
  const navigate = useNavigate();
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

  const activeRate = isCustom ? parseFloat(customRate) || 0 : gstRate;

  const presets = [
    { label: "🍽 Restaurant", rate: 5 },
    { label: "👔 Clothing", rate: 12 },
    { label: "💻 Electronics", rate: 18 },
    { label: "🚗 Luxury", rate: 28 },
    { label: "💊 Medicine", rate: 5 },
    { label: "🏠 Real Estate", rate: 12 },
  ];

  // Optimized useEffect: Removed transactionType as it doesn't affect calculation
  useEffect(() => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || activeRate <= 0 || activeRate > 100) { 
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
      basePercent: Math.round((base / total) * 100),
      gstPercent: Math.round((gst / total) * 100),
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
      // Safer history handling: Avoid rapid duplicate entries
      if (
        prev.length > 0 &&
        prev[0].amount === entry.amount &&
        prev[0].rate === entry.rate &&
        prev[0].type === entry.type &&
        prev[0].total === entry.total
      ) {
        return prev;
      }
      // Maximum 5 entries
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
      transactionType === "intra"
        ? `CGST: ₹${result.cgst} | SGST: ₹${result.sgst}`
        : `IGST: ₹${result.igst}`,
      `Total: ₹${result.total}`,
    ].join("\n");
    
    // Safely handle clipboard writing
    navigator.clipboard.writeText(lines)
      .then(() => {
        setCopied(true);
        addToHistory(); // Automatically save to history when copying
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        alert("Failed to copy to clipboard. Please check browser permissions.");
      });
  };

  // Safe formatter handling NaN values
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
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05050A", fontFamily: "'DM Sans', sans-serif", color: "#f1f5f9", selectionColor: "#fff", selectionBackground: "#7c3aed" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        ::selection { background: rgba(124, 58, 237, 0.4); color: white; }
        ::-moz-selection { background: rgba(124, 58, 237, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes countUp { from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)} }
        @keyframes glowPulse { 0%{box-shadow: 0 0 40px rgba(124,58,237,0.15)} 50%{box-shadow: 0 0 60px rgba(124,58,237,0.3)} 100%{box-shadow: 0 0 40px rgba(124,58,237,0.15)} }
        
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
          box-shadow: 0 12px 24px -10px rgba(124, 58, 237, 0.25);
        }
        .interactive-btn:active {
          transform: translateY(1px) scale(0.98);
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
          .responsive-grid-rates { grid-template-columns: repeat(5, 1fr); gap: 12px; }
        }

        .input-glow {
          transition: all 0.3s ease;
        }
        .input-glow:focus-within {
          border-color: rgba(167,139,250,0.6) !important;
          box-shadow: 0 0 0 4px rgba(124,58,237,0.15), inset 0 2px 4px rgba(0,0,0,0.2);
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
          background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-text {
          background: linear-gradient(135deg, #a78bfa, #60a5fa, #a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }

        @keyframes shine { to { background-position: 200% center; } }
      `}</style>

      {/* Ambient Premium Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "40%", width: "30%", height: "30%", background: "radial-gradient(circle, rgba(236,72,153,0.03) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {/* Navbar */}
      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif" }} className="brand-text">⚡ KaroTools</span>
          <button
            onClick={() => navigate("/")}
            className="interactive-btn"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#cbd5e1",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,58,237,0.15)";
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)";
              e.currentTarget.style.color = "#a78bfa";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            ← Home
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px", animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>🧮</span>
          </div>
          <h1 className="gradient-text" style={{ fontSize: "42px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", letterSpacing: "-0.02em" }}>GST Calculator</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "400", letterSpacing: "0.01em" }}>Professional GST calculation for Indian businesses • All slabs supported</p>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: "24px", animation: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", marginLeft: "4px" }}>Quick Presets</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { setPreset(p.label); setGstRate(p.rate); setIsCustom(false); }}
                className="preset-btn"
                style={{
                  border: "1px solid",
                  borderColor: preset === p.label ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.08)",
                  background: preset === p.label ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                  color: preset === p.label ? "#c4b5fd" : "#94a3b8",
                  boxShadow: preset === p.label ? "0 0 20px rgba(124,58,237,0.15)" : "none",
                }}>
                {p.label} <span style={{ opacity: 0.6, marginLeft: "4px" }}>· {p.rate}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="glass-panel" style={{ borderRadius: "28px", padding: "40px", marginBottom: "32px", animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>

          {/* Amount */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Amount (₹)</label>
            <div className="input-glow" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "4px 20px" }}>
              <span style={{ fontSize: "24px", color: "#64748b", fontWeight: "500", marginRight: "12px" }}>₹</span>
              <input type="number" value={amount} 
                onChange={e => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) setAmount(val);
                }} 
                placeholder="0.00"
                style={{ width: "100%", padding: "18px 0", background: "transparent", border: "none", fontSize: "28px", color: "#f8fafc", outline: "none", fontWeight: "800", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.02em" }}
              />
            </div>
          </div>

          {/* GST Rate */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>GST Rate</label>
            <div className="responsive-grid-rates">
              {[5, 12, 18, 28].map(rate => (
                <button key={rate} onClick={() => { setGstRate(rate); setIsCustom(false); setPreset(null); }}
                  className="interactive-btn"
                  style={{
                    padding: "16px", borderRadius: "14px", border: "1px solid",
                    borderColor: !isCustom && gstRate === rate ? "#8b5cf6" : "rgba(255,255,255,0.08)",
                    background: !isCustom && gstRate === rate ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(124,58,237,0.1))" : "rgba(255,255,255,0.02)",
                    color: !isCustom && gstRate === rate ? "#ddd6fe" : "#94a3b8",
                    fontWeight: "700", cursor: "pointer", fontSize: "16px",
                    boxShadow: !isCustom && gstRate === rate ? "0 4px 16px rgba(124,58,237,0.2), inset 0 1px 1px rgba(255,255,255,0.1)" : "none"
                  }}>
                  {rate}%
                </button>
              ))}
              <button onClick={() => setIsCustom(true)}
                className="interactive-btn"
                style={{
                  padding: "16px", borderRadius: "14px", border: "1px solid",
                  borderColor: isCustom ? "#8b5cf6" : "rgba(255,255,255,0.08)",
                  background: isCustom ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(124,58,237,0.1))" : "rgba(255,255,255,0.02)",
                  color: isCustom ? "#ddd6fe" : "#94a3b8",
                  fontWeight: "700", cursor: "pointer", fontSize: "15px",
                  boxShadow: isCustom ? "0 4px 16px rgba(124,58,237,0.2), inset 0 1px 1px rgba(255,255,255,0.1)" : "none"
                }}>
                Custom
              </button>
            </div>
            {isCustom && (
              <div style={{ marginTop: "16px", animation: "fadeIn 0.3s ease" }}>
                <div className="input-glow" style={{ borderRadius: "14px", border: "1px solid rgba(167,139,250,0.4)", background: "rgba(124,58,237,0.05)", display: "flex", alignItems: "center", padding: "0 16px" }}>
                  <input type="number" value={customRate} 
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "" || (Number(val) >= 0 && Number(val) <= 100)) setCustomRate(val);
                    }} 
                    placeholder="Enter custom percentage (e.g., 3)"
                    style={{ width: "100%", padding: "16px 0", background: "transparent", border: "none", fontSize: "16px", color: "#f8fafc", outline: "none", fontWeight: "600" }} />
                  <span style={{ color: "#a78bfa", fontWeight: "700" }}>%</span>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Type */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontWeight: "700", color: "#cbd5e1", marginBottom: "12px", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Transaction Type</label>
            <div className="responsive-grid">
              {[["intra", "🏙 Intra-State", "CGST + SGST"], ["inter", "🌐 Inter-State", "IGST only"]].map(([val, label, sub]) => (
                <button key={val} onClick={() => setTransactionType(val)}
                  className="interactive-btn"
                  style={{
                    padding: "16px 20px", borderRadius: "16px", border: "1px solid",
                    borderColor: transactionType === val ? "#8b5cf6" : "rgba(255,255,255,0.08)",
                    background: transactionType === val ? "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.05))" : "rgba(255,255,255,0.02)",
                    color: transactionType === val ? "#ddd6fe" : "#94a3b8",
                    cursor: "pointer", textAlign: "left",
                    boxShadow: transactionType === val ? "0 4px 16px rgba(124,58,237,0.15), inset 0 1px 1px rgba(255,255,255,0.1)" : "none"
                  }}>
                  <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "4px", color: transactionType === val ? "#fff" : "#cbd5e1" }}>{label}</div>
                  <div style={{ fontSize: "13px", color: transactionType === val ? "#a78bfa" : "#64748b", fontWeight: "500" }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Type + Round Off Grid */}
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
            <div onClick={() => setRoundOff(!roundOff)} style={{ width: "52px", height: "28px", borderRadius: "16px", background: roundOff ? "#8b5cf6" : "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative", transition: "background 0.3s", boxShadow: roundOff ? "0 0 12px rgba(139,92,246,0.4)" : "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
              <div style={{ position: "absolute", top: "4px", left: roundOff ? "28px" : "4px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div style={{ animation: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>

            {/* Total Hero */}
            <div style={{ background: "linear-gradient(145deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "28px", padding: "48px 32px", textAlign: "center", marginBottom: "24px", position: "relative", overflow: "hidden", animation: "glowPulse 4s infinite" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
              
              <p style={{ color: "#c4b5fd", fontSize: "13px", fontWeight: "800", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>Final Total Amount</p>
              <p style={{ fontSize: "64px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #ffffff, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "countUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)", lineHeight: 1, filter: "drop-shadow(0 4px 20px rgba(124,58,237,0.3))" }}>
                ₹{fmt(result.total)}
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.2)", padding: "8px 20px", borderRadius: "30px", marginTop: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.base)}</strong> Base</span>
                <span style={{ color: "#475569" }}>+</span>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}><strong style={{ color: "#cbd5e1" }}>₹{fmt(result.gst)}</strong> GST</span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="responsive-grid" style={{ gap: "16px", marginBottom: "24px" }}>
              {[
                { label: "Base Amount", value: result.base, color: "#93c5fd", icon: "💎" },
                { label: `Total GST (${activeRate}%)`, value: result.gst, color: "#c4b5fd", icon: "🏛" },
                ...(transactionType === "intra"
                  ? [{ label: "CGST (Central)", value: result.cgst, color: "#6ee7b7", icon: "🏛" }, { label: "SGST (State)", value: result.sgst, color: "#f9a8d4", icon: "🏛" }]
                  : [{ label: "IGST (Integrated)", value: result.igst, color: "#fdba74", icon: "🌐" }])
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

            {/* Bar */}
            <div className="glass-panel" style={{ borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
              <p style={{ color: "#cbd5e1", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>Visual Breakdown</p>
              <div style={{ height: "14px", borderRadius: "8px", overflow: "hidden", display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}>
                <div style={{ width: result.basePercent + "%", background: "linear-gradient(90deg, #2563eb, #60a5fa)", borderRadius: "8px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)" }}/>
                </div>
                <div style={{ width: result.gstPercent + "%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: "8px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)" }}/>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#3b82f6" }} />
                  <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: "600" }}>Base <span style={{ color: "#94a3b8", fontWeight: "500", marginLeft: "4px" }}>{result.basePercent}%</span></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#8b5cf6" }} />
                  <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: "600" }}>Tax <span style={{ color: "#94a3b8", fontWeight: "500", marginLeft: "4px" }}>{result.gstPercent}%</span></span>
                </div>
              </div>
            </div>

            {/* Formula */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Calculation Formula Used</p>
              <p style={{ color: "#a78bfa", fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.05em", background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(124,58,237,0.1)" }}>
                {type === "exclusive"
                  ? `GST = ₹${amount} × ${activeRate} ÷ 100 = ₹${result.gst}`
                  : `Base = ₹${amount} × 100 ÷ (100 + ${activeRate}) = ₹${result.base}`}
              </p>
            </div>

            {/* Action Buttons */}
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
                  background: copied ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1))" : "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(124,58,237,0.1))",
                  border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : "rgba(139,92,246,0.4)"}`,
                  borderRadius: "16px", color: copied ? "#6ee7b7" : "#ddd6fe",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  boxShadow: copied ? "0 4px 16px rgba(16,185,129,0.2)" : "0 4px 16px rgba(124,58,237,0.2)",
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

        {/* History */}
        {history.length > 0 && (
          <div className="glass-panel" style={{ marginTop: "40px", borderRadius: "24px", padding: "32px", animation: "fadeIn 0.6s ease" }}>
            <p style={{ color: "#cbd5e1", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🕒</span> Saved Calculations
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {history.map((h, i) => (
                <div key={i} onClick={() => setAmount(h.amount)} className="breakdown-card"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", cursor: "pointer" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#e2e8f0", fontSize: "15px", fontWeight: "600" }}>₹{fmt(h.amount)} <span style={{ color: "#64748b", fontWeight: "400" }}>@ {h.rate}%</span></span>
                    <span style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h.type} • {h.time}</span>
                  </div>
                  <span style={{ color: "#c4b5fd", fontWeight: "800", fontSize: "18px", fontFamily: "'Syne',sans-serif" }}>₹{fmt(h.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Info Section */}
        <div style={{ marginTop: "80px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          <div style={{ paddingTop: "64px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "32px", textAlign: "center" }}>Frequently Asked Questions</h2>
            <div className="responsive-grid" style={{ gap: "20px" }}>
              {[
                { q: "What is GST?", a: "GST (Goods and Services Tax) is India's unified indirect tax on goods and services, implemented July 1, 2017. It replaced VAT, service tax, and other cascading taxes to create a single national market." },
                { q: "What is IGST vs CGST/SGST?", a: "For intra-state transactions (within the same state), GST is split equally into CGST (Central) and SGST (State). For inter-state transactions, IGST (Integrated GST) is charged instead and collected by the central government." },
                { q: "What are GST slabs in India?", a: "India has 4 primary GST slabs: 5% (essential goods, restaurants), 12% (standard goods, clothing), 18% (most services, electronics, software), and 28% (luxury goods, automobiles, tobacco)." },
                { q: "How to calculate GST on a price?", a: "To add GST: multiply amount by GST rate and divide by 100. To remove GST from an inclusive price: divide the total by (1 + GST rate/100) to get the original base price before taxes." },
              ].map((item, i) => (
                <div key={item.q} className="glass-panel" style={{ padding: "28px", borderRadius: "20px", transition: "all 0.3s ease" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ background: "rgba(124,58,237,0.1)", color: "#a78bfa", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", flexShrink: 0, marginTop: "2px" }}>{i + 1}</div>
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
