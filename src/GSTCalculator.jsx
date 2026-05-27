import { useState, useEffect, useRef } from "react";
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
  const animRef = useRef(null);

  const activeRate = isCustom ? parseFloat(customRate) || 0 : gstRate;

  const presets = [
    { label: "🍽 Restaurant", rate: 5 },
    { label: "👔 Clothing", rate: 12 },
    { label: "💻 Electronics", rate: 18 },
    { label: "🚗 Luxury", rate: 28 },
    { label: "💊 Medicine", rate: 5 },
    { label: "🏠 Real Estate", rate: 12 },
  ];

  useEffect(() => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || activeRate <= 0) { setResult(null); return; }

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
  }, [amount, activeRate, type, transactionType, roundOff]);

  const addToHistory = () => {
    if (!result) return;
    const entry = {
      amount: amount,
      rate: activeRate,
      type,
      total: result.total,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };
    setHistory(prev => [entry, ...prev.slice(0, 4)]);
  };

  useEffect(() => {
    if (result) addToHistory();
  }, [result]);

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
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fmt = (val) => Number(val).toLocaleString("en-IN");

  return (
    <div style={{ minHeight: "100vh", background: "#080814", fontFamily: "'DM Sans', sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
        @keyframes countUp { from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)} }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
        input::placeholder{color:#334155}
      `}</style>

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(37,99,235,0.08) 0%, transparent 60%)" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(8,8,20,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>⚡ KaroTools</span>
    <button
  onClick={() => navigate("/")}
  style={{
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }}
  onMouseEnter={(e) => {
    e.target.style.background = "rgba(124,58,237,0.15)";
    e.target.style.color = "#a78bfa";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "rgba(255,255,255,0.05)";
    e.target.style.color = "#94a3b8";
  }}
>
  ← Home
</button>
      </nav>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 20px 80px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "52px", marginBottom: "12px" }}>🧮</div>
          <h1 style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#f1f5f9,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>GST Calculator</h1>
          <p style={{ color: "#64748b" }}>Live GST calculation for Indian businesses • All slabs supported</p>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>Quick Presets</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { setPreset(p.label); setGstRate(p.rate); setIsCustom(false); }}
                style={{ padding: "8px 14px", borderRadius: "20px", border: "1px solid", borderColor: preset === p.label ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.08)", background: preset === p.label ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)", color: preset === p.label ? "#a78bfa" : "#64748b", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                {p.label} · {p.rate}%
              </button>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px", backdropFilter: "blur(20px)", marginBottom: "20px" }}>

          {/* Amount */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#94a3b8", marginBottom: "10px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Amount (₹)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 10000"
              style={{ width: "100%", padding: "16px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", fontSize: "22px", color: "#f1f5f9", outline: "none", boxSizing: "border-box", fontWeight: "700", fontFamily: "'Syne',sans-serif" }}
              onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>

          {/* GST Rate */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#94a3b8", marginBottom: "10px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>GST Rate</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
              {[5, 12, 18, 28].map(rate => (
                <button key={rate} onClick={() => { setGstRate(rate); setIsCustom(false); setPreset(null); }}
                  style={{ padding: "14px", borderRadius: "12px", border: "1px solid", borderColor: !isCustom && gstRate === rate ? "#7c3aed" : "rgba(255,255,255,0.08)", background: !isCustom && gstRate === rate ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)", color: !isCustom && gstRate === rate ? "#a78bfa" : "#64748b", fontWeight: "700", cursor: "pointer", fontSize: "15px", transition: "all 0.2s" }}>
                  {rate}%
                </button>
              ))}
              <button onClick={() => setIsCustom(true)}
                style={{ padding: "14px", borderRadius: "12px", border: "1px solid", borderColor: isCustom ? "#7c3aed" : "rgba(255,255,255,0.08)", background: isCustom ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)", color: isCustom ? "#a78bfa" : "#64748b", fontWeight: "700", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}>
                Custom
              </button>
            </div>
            {isCustom && (
              <input type="number" value={customRate} onChange={e => setCustomRate(e.target.value)} placeholder="Enter custom rate e.g. 3"
                style={{ marginTop: "10px", width: "100%", padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.4)", borderRadius: "12px", fontSize: "16px", color: "#f1f5f9", outline: "none", boxSizing: "border-box" }} />
            )}
          </div>

          {/* Transaction Type */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#94a3b8", marginBottom: "10px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Transaction Type</label>
            <div style={{ display: "grid", gridTemplateColumns:
  window.innerWidth < 768
    ? "1fr"
    : "1fr 1fr", gap: "10px" }}>
              {[["intra", "🏙 Intra-State", "CGST + SGST"], ["inter", "🌐 Inter-State", "IGST only"]].map(([val, label, sub]) => (
                <button key={val} onClick={() => setTransactionType(val)}
                  style={{ padding: "14px", borderRadius: "12px", border: "1px solid", borderColor: transactionType === val ? "#7c3aed" : "rgba(255,255,255,0.08)", background: transactionType === val ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)", color: transactionType === val ? "#a78bfa" : "#64748b", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                  <div style={{ fontWeight: "700", fontSize: "14px" }}>{label}</div>
                  <div style={{ fontSize: "11px", marginTop: "2px", opacity: 0.7 }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Type + Round Off */}
          <div style={{ display: "grid", gridTemplateColumns:
  window.innerWidth < 768
    ? "1fr"
    : "1fr 1fr", gap: "10px" }}>
            {[["exclusive", "➕ Add GST"], ["inclusive", "➖ Remove GST"]].map(([val, label]) => (
              <button key={val} onClick={() => setType(val)}
                style={{ padding: "14px", borderRadius: "12px", border: "1px solid", borderColor: type === val ? "#2563eb" : "rgba(255,255,255,0.08)", background: type === val ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.03)", color: type === val ? "#60a5fa" : "#64748b", fontWeight: "700", cursor: "pointer", fontSize: "14px", transition: "all 0.2s" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Round off toggle */}
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p style={{ color: "#94a3b8", fontWeight: "600", fontSize: "14px" }}>Round Off</p>
              <p style={{ color: "#475569", fontSize: "12px" }}>₹1180.42 → ₹1180</p>
            </div>
            <div onClick={() => setRoundOff(!roundOff)} style={{ width: "44px", height: "24px", borderRadius: "12px", background: roundOff ? "#7c3aed" : "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative", transition: "background 0.3s" }}>
              <div style={{ position: "absolute", top: "3px", left: roundOff ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", background: "white", transition: "left 0.3s" }} />
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>

            {/* Total Hero */}
            <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.2))", border: "1px solid rgba(124,58,237,0.4)", borderRadius: "20px", padding: "32px", textAlign: "center", marginBottom: "14px", boxShadow: "0 0 50px rgba(124,58,237,0.2)" }}>
              <p style={{ color: "#a78bfa", fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>Total Amount</p>
              <p style={{ fontSize: "56px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#f1f5f9,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "countUp 0.3s ease", lineHeight: 1 }}>
                ₹{fmt(result.total)}
              </p>
              <p style={{ color: "#475569", fontSize: "13px", marginTop: "10px" }}>
                ₹{fmt(result.base)} base + ₹{fmt(result.gst)} GST
              </p>
            </div>

            {/* Breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              {[
                { label: "Base Amount", value: result.base, color: "#60a5fa" },
                { label: `GST (${activeRate}%)`, value: result.gst, color: "#a78bfa" },
                ...(transactionType === "intra"
                  ? [{ label: "CGST", value: result.cgst, color: "#34d399" }, { label: "SGST", value: result.sgst, color: "#f472b6" }]
                  : [{ label: "IGST", value: result.igst, color: "#fb923c" }])
              ].map(item => (
                <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px" }}>
                  <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>{item.label}</p>
                  <p style={{ fontSize: "22px", fontWeight: "800", color: item.color, fontFamily: "'Syne',sans-serif" }}>₹{fmt(item.value)}</p>
                </div>
              ))}
            </div>

            {/* Bar */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", marginBottom: "14px" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>GST Breakdown</p>
              <div style={{ height: "10px", borderRadius: "6px", overflow: "hidden", display: "flex", gap: "2px", background: "rgba(255,255,255,0.05)" }}>
                <div style={{ width: result.basePercent + "%", background: "linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius: "6px", transition: "width 0.5s ease" }} />
                <div style={{ width: result.gstPercent + "%", background: "linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius: "6px", transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                <span style={{ fontSize: "12px", color: "#60a5fa" }}>■ Base {result.basePercent}%</span>
                <span style={{ fontSize: "12px", color: "#a78bfa" }}>■ GST {result.gstPercent}%</span>
              </div>
            </div>

            {/* Formula */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "16px 20px", marginBottom: "14px" }}>
              <p style={{ color: "#475569", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Formula Used</p>
              <p style={{ color: "#64748b", fontSize: "13px", fontFamily: "monospace" }}>
                {type === "exclusive"
                  ? `GST = ₹${amount} × ${activeRate} ÷ 100 = ₹${result.gst}`
                  : `Base = ₹${amount} × 100 ÷ (100 + ${activeRate}) = ₹${result.base}`}
              </p>
            </div>

            {/* Copy */}
            <button onClick={copyResult} style={{ width: "100%", padding: "16px", background: copied ? "rgba(52,211,153,0.15)" : "rgba(124,58,237,0.15)", border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(124,58,237,0.3)"}`, borderRadius: "14px", color: copied ? "#34d399" : "#a78bfa", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s" }}>
              {copied ? "✅ Copied to Clipboard!" : "📋 Copy Result"}
            </button>
            <button
  onClick={() => {
    setAmount("");
    setCustomRate("");
    setResult(null);
    setHistory([]);
    setGstRate(18);
    setType("exclusive");
    setTransactionType("intra");
    setRoundOff(false);
    setPreset(null);
  }}
  style={{
    width: "100%",
    marginTop: "12px",
    padding: "16px",
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "14px",
    color: "#f87171",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  }}
>
  🗑 Clear Calculator
</button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ marginTop: "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
            <p style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>Recent Calculations</p>
            {history.map((h, i) => (
              <div key={i} onClick={() => setAmount(h.amount)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: "pointer" }}>
                <span style={{ color: "#94a3b8", fontSize: "14px" }}>₹{fmt(h.amount)} @ {h.rate}%</span>
                <span style={{ color: "#a78bfa", fontWeight: "700", fontSize: "14px" }}>₹{fmt(h.total)}</span>
              </div>
            ))}
          </div>
        )}

        {/* SEO */}
        <div style={{ marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "48px" }}>
          {[
            { q: "What is GST?", a: "GST (Goods and Services Tax) is India's unified indirect tax on goods and services, implemented July 1, 2017. It replaced VAT, service tax, and other cascading taxes." },
            { q: "What is IGST vs CGST/SGST?", a: "For intra-state transactions, GST is split equally into CGST (Central) and SGST (State). For inter-state transactions, IGST (Integrated GST) is charged instead — collected by the central government." },
            { q: "What are GST slabs in India?", a: "India has 4 GST slabs: 5% (essential goods, restaurants), 12% (standard goods, clothing), 18% (most services, electronics, software), and 28% (luxury goods, automobiles, tobacco)." },
            { q: "How to calculate GST on a price?", a: "To add GST: multiply amount by GST rate and divide by 100. To remove GST from an inclusive price: divide by (1 + GST rate/100) to get the base price." },
          ].map(item => (
            <div key={item.q} style={{ marginBottom: "28px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px", fontFamily: "'Syne',sans-serif" }}>{item.q}</h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7" }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
