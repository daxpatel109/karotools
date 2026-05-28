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

  const activeRate = isCustom ? parseFloat(customRate) || 0 : gstRate;

  const presets = [
    { label: "🍽 Restaurant", rate: 5 },
    { label: "👔 Clothing", rate: 12 },
    { label: "💻 Electronics", rate: 18 },
    { label: "🚗 Luxury", rate: 28 },
    { label: "💊 Medicine", rate: 5 },
    { label: "🏠 Real Estate", rate: 12 },
  ];

  // SERP SEO Injection
  useEffect(() => {
    document.title = "Free Online GST Calculator India | KaroTools";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Calculate IGST, CGST, and SGST instantly. A free, accurate, and fast GST calculator built for Indian freelancers and small businesses.";
  }, []);

  // Calculation Logic
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
      if (
        prev.length > 0 &&
        prev[0].amount === entry.amount &&
        prev[0].rate === entry.rate &&
        prev[0].type === entry.type &&
        prev[0].total === entry.total
      ) {
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
      .catch(() => {
        alert("Failed to copy to clipboard. Please check browser permissions.");
      });
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
          .responsive-grid-rates { grid-template-columns: repeat(5, 1fr); gap: 12px; }
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
