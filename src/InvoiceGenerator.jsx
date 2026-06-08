import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

const emptyItem = () => ({ desc: "", hsn: "", qty: 1, rate: "", discount: 0, gst: 18 });

const genInvoiceNo = () => {
  const y = new Date().getFullYear();
  const n = String(Math.floor(Math.random() * 9000) + 1000);
  return `INV-${y}-${n}`;
};

const fmtINR = (n) => Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const INDIAN_STATES = [
  "Select State", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", 
  "Lakshadweep", "Delhi", "Puducherry"
];

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState(() => {
    const saved = localStorage.getItem("inv_data_v2");
    return saved ? JSON.parse(saved).invoice : { number: genInvoiceNo(), date: new Date().toISOString().split("T")[0], due: "", notes: "Payment due within 15 days. Thank you for your business!" };
  });
  const [seller, setSeller] = useState(() => {
    const saved = localStorage.getItem("inv_data_v2");
    return saved ? JSON.parse(saved).seller : { name: "", address: "", state: "Select State", gstin: "", pan: "", udyam: "", phone: "", email: "", logo: "" };
  });
  const [buyer, setBuyer] = useState(() => {
    const saved = localStorage.getItem("inv_data_v2");
    return saved ? JSON.parse(saved).buyer : { name: "", address: "", state: "Select State", gstin: "", phone: "", email: "" };
  });
  const [bank, setBank] = useState(() => {
    const saved = localStorage.getItem("inv_data_v2");
    return saved ? JSON.parse(saved).bank : { accName: "", accNo: "", ifsc: "", upi: "" };
  });
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("inv_data_v2");
    return saved ? JSON.parse(saved).items : [emptyItem()];
  });
  const [transType, setTransType] = useState("intra");
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef();

  useEffect(() => {
    localStorage.setItem("inv_data_v2", JSON.stringify({ invoice, seller, buyer, bank, items }));
  }, [invoice, seller, buyer, bank, items]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free GST Invoice Generator with MSME Compliance | KaroTools";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Create professional GST invoices instantly with built-in MSME 45-day payment rule protections. Download as PDF. Free for Indian freelancers.";

    // JSON-LD FAQ Schema natively injected
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the MSME 45-day payment rule?", "acceptedAnswer": { "@type": "Answer", "text": "Under Section 43B(h) of the Income Tax Act, buyers must pay MSME registered businesses within 45 days. If delayed, the buyer cannot claim the expense for tax deductions and must pay compound interest to the MSME." } },
        { "@type": "Question", "name": "How does this generator enforce MSME rules?", "acceptedAnswer": { "@type": "Answer", "text": "When you enter your Udyam Registration Number, this generator automatically injects a legally-backed warning onto the invoice footer reminding the client of the 45-day payment mandate." } },
        { "@type": "Question", "name": "What is CGST, SGST and IGST?", "acceptedAnswer": { "@type": "Answer", "text": "CGST and SGST are applied to transactions within the same state (intra-state). IGST is applied when the buyer and seller are in different states (inter-state)." } }
      ]
    };
    let script = document.getElementById("faq-schema-inv");
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-schema-inv";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify(faqSchema);

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, []);

  // Auto-detect Intra/Inter state based on State Dropdown (Overrides GSTIN prefix logic)
  useEffect(() => {
    if (seller.state && buyer.state && seller.state !== "Select State" && buyer.state !== "Select State") {
      setTransType(seller.state === buyer.state ? "intra" : "inter");
    } else if (seller.gstin && buyer.gstin && seller.gstin.length >= 2 && buyer.gstin.length >= 2) {
      // Fallback to GSTIN if states aren't selected
      const sCode = seller.gstin.substring(0, 2);
      const bCode = buyer.gstin.substring(0, 2);
      setTransType(sCode === bCode ? "intra" : "inter");
    } else {
      setTransType("intra"); // Default
    }
  }, [seller.state, buyer.state, seller.gstin, buyer.gstin]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500000) return alert("Logo must be under 500KB");
    const reader = new FileReader();
    reader.onload = (ev) => setSeller({ ...seller, logo: ev.target.result });
    reader.readAsDataURL(file);
  };

  const clearData = () => {
    if(window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      localStorage.removeItem("inv_data_v2");
      window.location.reload();
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Invoice Number", invoice.number],
      ["Invoice Date", invoice.date],
      ["Seller Name", seller.name],
      ["Buyer Name", buyer.name],
      ["Taxable Amount", totals.base.toFixed(2)],
      ["Total Amount", totals.total.toFixed(2)],
      [""],
      ["Description", "HSN/SAC", "Qty", "Rate", "GST %", "Total"]
    ];
    items.forEach(item => {
      const c = calcItem(item);
      rows.push([item.desc, item.hsn, item.qty, item.rate, item.gst, c.total.toFixed(2)]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Invoice_${invoice.number}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic Notes Injection for MSME
  const defaultNotes = "Payment due within 15 days. Thank you for your business!";
  const msmeWarning = "\n\nAs per Section 43B(h) of the MSME Act, payments delayed beyond 45 days attract compound interest at 3x the RBI bank rate, and the buyer will forfeit tax deductions on this invoice amount.";
  
  const updateItem = (i, k, v) => { const u = [...items]; u[i] = { ...u[i], [k]: v }; setItems(u); };
  const addItem = () => setItems([...items, emptyItem()]);
  const removeItem = (i) => items.length > 1 && setItems(items.filter((_, idx) => idx !== i));

  const calcItem = (item) => {
    const grossBase = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
    const discountAmt = (grossBase * (parseFloat(item.discount) || 0)) / 100;
    const taxableBase = grossBase - discountAmt;
    const gstAmt = (taxableBase * item.gst) / 100;
    return { grossBase, discountAmt, taxableBase, gstAmt, total: taxableBase + gstAmt };
  };

  const totals = items.reduce((a, item) => {
    const c = calcItem(item);
    return { gross: a.gross + c.grossBase, discount: a.discount + c.discountAmt, base: a.base + c.taxableBase, gst: a.gst + c.gstAmt, total: a.total + c.total };
  }, { gross: 0, discount: 0, base: 0, gst: 0, total: 0 });

  const downloadPDF = async () => {
    if (!previewRef.current || isExporting) return;
    setIsExporting(true);
    
    // Temporarily remove transform to capture full resolution
    const a4Container = document.getElementById("a4-container");
    const originalTransform = a4Container ? a4Container.style.transform : "";
    if (a4Container) a4Container.style.transform = "scale(1)";
    
    // Give browser a frame to apply the transform
    await new Promise(r => setTimeout(r, 50));

    try {
      // Temporarily scale up for high-res PDF
      const canvas = await html2canvas(previewRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`INV-${invoice.number || '0001'}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Error generating PDF. Please try again.");
    } finally {
      // Restore transform
      if (a4Container) a4Container.style.transform = originalTransform;
      setIsExporting(false);
    }
  };

  const inp = { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", fontSize: "14px", color: "#f8fafc", outline: "none", transition: "all 0.2s", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" };
  const lbl = { display: "block", fontWeight: "600", color: "#64748b", marginBottom: "8px", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" };
  const sec = { paddingBottom: "32px", marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.05)" };

  const finalNotes = seller.udyam && !invoice.notes.includes("Section 43B(h)") 
    ? invoice.notes + msmeWarning 
    : invoice.notes;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans',sans-serif", color: "#f8fafc" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        input::placeholder,textarea::placeholder{color:#475569}
        input:focus,textarea:focus,select:focus{border-color:rgba(14,165,233,0.5)!important;outline:none}
        select option{background:#0f172a;color:#f8fafc}
        
        /* A4 Live Preview Scaling */
        .a4-preview-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .a4-scale-container {
           /* width/height will be set by media queries */
           width: 794px;
           height: 1123px;
        }
        .a4-container {
          width: 794px;
          min-height: 1123px;
          background: white;
          color: #0f172a;
          padding: 20mm;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          transform-origin: top left;
        }
        @media (min-width: 1201px) {
           .a4-container { transform: scale(1); }
        }
        @media (max-width: 1200px) {
           .a4-scale-container { width: calc(794px * 0.95); height: calc(1123px * 0.95); }
           .a4-container { transform: scale(0.95); }
        }
        @media (max-width: 992px) {
           .a4-scale-container { width: calc(794px * 0.8); height: calc(1123px * 0.8); }
           .a4-container { transform: scale(0.8); }
        }
        @media (max-width: 768px) {
           .a4-scale-container { width: calc(794px * 0.45); height: calc(1123px * 0.45); }
           .a4-container { transform: scale(0.45); }
        }
        @media (max-width: 430px) {
           .a4-scale-container { width: calc(794px * 0.40); height: calc(1123px * 0.40); }
           .a4-container { transform: scale(0.40); }
        }

        /* Responsive Layouts */
        .workspace-layout {
          display: flex;
          height: calc(100vh - 70px);
          overflow: hidden;
        }
        .editor-sidebar {
          width: 480px;
          min-width: 480px;
          background: #080c17;
          border-right: 1px solid rgba(255,255,255,0.05);
          overflow-y: auto;
          padding: 40px;
        }
        .editor-sidebar::-webkit-scrollbar { width: 6px; }
        .editor-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .canvas-area {
          flex: 1;
          background-color: #020617;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          gap: 32px;
        }
        .split-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .split-3-col {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        .items-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 0.8fr 1fr 1fr auto;
          gap: 12px;
          align-items: end;
          min-width: 700px;
        }
        
        @media (max-width: 1200px) {
          .workspace-layout {
             flex-direction: column;
             height: auto;
             overflow: visible;
          }
          .editor-sidebar {
             width: 100%;
             min-width: auto;
             border-right: none;
             border-bottom: 1px solid rgba(255,255,255,0.05);
             padding: 24px 16px;
          }
          .canvas-area {
             padding: 32px 0;
             overflow: hidden;
          }
        }
        @media (max-width: 768px) {
          .split-2-col, .split-3-col {
            grid-template-columns: 1fr !important;
          }
          nav {
            padding: 0 20px !important;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#38bdf8,#5eead4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </Link>
        <Link to="/" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>Home</Link>
      </nav>

      <div className="workspace-layout">
          
          {/* LEFT: Editor Sidebar */}
          <div className="editor-sidebar">
            
            <div style={{ marginBottom: "40px" }}>
              <span style={{ background: "rgba(14,165,233,0.1)", color: "#38bdf8", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em", border: "1px solid rgba(14,165,233,0.2)" }}>PRO WORKSPACE</span>
              <h1 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Syne',sans-serif", margin: "16px 0 8px 0", color: "#f8fafc", letterSpacing: "-0.5px" }}>
                Invoice Editor
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Configure your beautiful, legal-grade invoice.</p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", gap: "16px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10b981", fontSize: "12px", fontWeight: "600", background: "rgba(16,185,129,0.1)", padding: "6px 12px", borderRadius: "12px", flexShrink: 0, border: "1px solid rgba(16,185,129,0.2)" }}>
                <span style={{ fontSize: "14px" }}>✅</span> Auto-saved
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={exportCSV} style={{ background: "transparent", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                  📥 Export CSV
                </button>
                <button onClick={clearData} style={{ background: "transparent", border: "1px solid rgba(244,63,94,0.3)", color: "#fb7185", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                  Clear Data
                </button>
              </div>
            </div>

            <div style={sec}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", marginBottom: "20px" }}>1. Invoice Details</h2>
              <div className="split-3-col">
                <div><label style={lbl}>Invoice No</label><input value={invoice.number} onChange={e => setInvoice({...invoice, number: e.target.value})} style={inp}/></div>
                <div><label style={lbl}>Invoice Date</label><input type="date" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} style={inp}/></div>
                <div><label style={lbl}>Due Date</label><input type="date" value={invoice.due} onChange={e => setInvoice({...invoice, due: e.target.value})} style={inp}/></div>
              </div>
            </div>

            <div style={sec}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", marginBottom: "20px" }}>2. Your Details</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={lbl}>Company Logo (Optional)</label>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ ...inp, padding: "8px" }} />
                    {seller.logo && <div style={{ marginTop: "8px", color: "#38bdf8", fontSize: "12px" }}>Logo uploaded successfully.</div>}
                  </div>
                  <div><label style={lbl}>Business Name *</label><input value={seller.name} onChange={e => setSeller({...seller, name: e.target.value})} style={inp}/></div>
                  <div><label style={lbl}>Address</label><textarea value={seller.address} onChange={e => setSeller({...seller, address: e.target.value})} style={{...inp, height: "80px", resize: "none"}}/></div>
                  <div>
                    <label style={lbl}>State (For GST Split)</label>
                    <select value={seller.state} onChange={e => setSeller({...seller, state: e.target.value})} style={inp}>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="split-2-col">
                    <div><label style={lbl}>GSTIN (Optional)</label><input value={seller.gstin} onChange={e => setSeller({...seller, gstin: e.target.value})} style={inp} maxLength={15}/></div>
                    <div><label style={lbl}>PAN (Optional)</label><input value={seller.pan} onChange={e => setSeller({...seller, pan: e.target.value})} style={inp} maxLength={10}/></div>
                  </div>
                  <div className="split-2-col">
                    <div><label style={lbl}>Email (Optional)</label><input value={seller.email} onChange={e => setSeller({...seller, email: e.target.value})} style={inp}/></div>
                    <div><label style={lbl}>Phone (Optional)</label><input value={seller.phone} onChange={e => setSeller({...seller, phone: e.target.value})} style={inp}/></div>
                  </div>
                  <div><label style={lbl}>Udyam Registration No (Optional)</label><input value={seller.udyam} onChange={e => setSeller({...seller, udyam: e.target.value})} style={inp} placeholder="Activates MSME 45-day rule"/></div>
                </div>
            </div>

            <div style={sec}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", marginBottom: "20px" }}>3. Client Details</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div><label style={lbl}>Client Name *</label><input value={buyer.name} onChange={e => setBuyer({...buyer, name: e.target.value})} style={inp}/></div>
                  <div><label style={lbl}>Address</label><textarea value={buyer.address} onChange={e => setBuyer({...buyer, address: e.target.value})} style={{...inp, height: "80px", resize: "none"}}/></div>
                  <div>
                    <label style={lbl}>State (For GST Split)</label>
                    <select value={buyer.state} onChange={e => setBuyer({...buyer, state: e.target.value})} style={inp}>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>GSTIN (Optional)</label><input value={buyer.gstin} onChange={e => setBuyer({...buyer, gstin: e.target.value})} style={inp} maxLength={15}/></div>
                  <div className="split-2-col">
                    <div><label style={lbl}>Email (Optional)</label><input value={buyer.email} onChange={e => setBuyer({...buyer, email: e.target.value})} style={inp}/></div>
                    <div><label style={lbl}>Phone (Optional)</label><input value={buyer.phone} onChange={e => setBuyer({...buyer, phone: e.target.value})} style={inp}/></div>
                  </div>
                </div>
            </div>

            <div style={sec}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", margin: 0 }}>4. Items</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <label style={{ fontSize: "12px", color: "#94a3b8" }}>Tax Type:</label>
                  <select value={transType} onChange={e => setTransType(e.target.value)} style={{...inp, width: "auto", padding: "6px 12px", cursor: "pointer"}}>
                    <option value="intra">Intra-state (CGST + SGST)</option>
                    <option value="inter">Inter-state (IGST)</option>
                  </select>
                </div>
              </div>

              <div className="items-wrapper">
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {items.map((item, i) => (
                    <div key={i} style={{ background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="items-grid">
                        <div><label style={lbl}>Description</label><input value={item.desc} onChange={e => updateItem(i, "desc", e.target.value)} style={inp}/></div>
                        <div><label style={lbl}>HSN/SAC</label><input value={item.hsn} onChange={e => updateItem(i, "hsn", e.target.value)} style={inp}/></div>
                        <div><label style={lbl}>Qty</label><input type="number" value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} style={inp}/></div>
                        <div><label style={lbl}>Rate</label><input type="number" value={item.rate} onChange={e => updateItem(i, "rate", e.target.value)} style={inp}/></div>
                        <div>
                          <label style={lbl}>GST %</label>
                          <select value={item.gst} onChange={e => updateItem(i, "gst", parseInt(e.target.value))} style={inp}>
                            {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                          </select>
                        </div>
                        <button onClick={() => removeItem(i)} style={{ padding: "12px", background: "rgba(244,63,94,0.1)", color: "#fb7185", border: "none", borderRadius: "8px", cursor: "pointer" }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={addItem} style={{ width: "100%", padding: "12px", marginTop: "16px", background: "rgba(14,165,233,0.1)", border: "1px dashed rgba(14,165,233,0.3)", borderRadius: "8px", color: "#38bdf8", fontWeight: "600", cursor: "pointer" }}>+ Add Item</button>
            </div>

            <div className="split-2-col">
              <div style={sec}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", marginBottom: "20px" }}>5. Bank Details</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div><label style={lbl}>Account Name</label><input value={bank.accName} onChange={e => setBank({...bank, accName: e.target.value})} style={inp}/></div>
                  <div><label style={lbl}>Account Number</label><input value={bank.accNo} onChange={e => setBank({...bank, accNo: e.target.value})} style={inp}/></div>
                  <div><label style={lbl}>IFSC Code</label><input value={bank.ifsc} onChange={e => setBank({...bank, ifsc: e.target.value})} style={inp}/></div>
                  <div><label style={lbl}>UPI ID (Optional)</label><input value={bank.upi} onChange={e => setBank({...bank, upi: e.target.value})} style={inp}/></div>
                </div>
              </div>
              <div style={sec}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", marginBottom: "20px" }}>6. Terms & Notes</h2>
                <textarea value={invoice.notes} onChange={e => setInvoice({...invoice, notes: e.target.value})} style={{...inp, height: "160px", resize: "none"}} />
              </div>
            </div>

          </div>

          {/* RIGHT: Live Preview Canvas */}
          <div className="canvas-area">
            
            <button onClick={downloadPDF} disabled={isExporting} style={{ position: "sticky", top: "0px", zIndex: 10, width: "100%", maxWidth: "794px", padding: "18px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", color: "white", fontSize: "16px", fontWeight: "800", fontFamily: "'Syne',sans-serif", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.2)", cursor: isExporting ? "wait" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(14,165,233,0.3), inset 0 2px 4px rgba(255,255,255,0.3)", transition: "all 0.2s" }} onMouseEnter={e => {e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(14,165,233,0.4), inset 0 2px 4px rgba(255,255,255,0.3)";}} onMouseLeave={e => {e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(14,165,233,0.3), inset 0 2px 4px rgba(255,255,255,0.3)";}}>
              {isExporting ? "⏳ Generating High-Res PDF..." : "📥 Download Legal PDF"}
            </button>

            <div className="a4-preview-wrapper">
              <div className="a4-scale-container">
                {/* Actual A4 Canvas */}
                <div ref={previewRef} id="a4-container" className="a4-container">
                {/* Header Teal Line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "linear-gradient(90deg, #0ea5e9, #14b8a6)" }} />
                
                {/* Invoice Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", marginTop: "10px" }}>
                  <div style={{ flex: 1 }}>
                    {seller.logo ? (
                      <img src={seller.logo} alt="Company Logo" style={{ maxHeight: "80px", maxWidth: "250px", objectFit: "contain", marginBottom: "16px" }} />
                    ) : (
                      <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#0ea5e9", margin: "0 0 16px 0", letterSpacing: "-1px" }}>TAX INVOICE</h1>
                    )}
                    <div style={{ display: "flex", gap: "24px" }}>
                      <div><div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Invoice No</div><div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{invoice.number || "-"}</div></div>
                      <div><div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Invoice Date</div><div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{invoice.date || "-"}</div></div>
                      {invoice.due && <div><div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Due Date</div><div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{invoice.due}</div></div>}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px 0", color: "#0f172a" }}>{seller.name || "Your Business Name"}</h2>
                    <p style={{ fontSize: "12px", color: "#475569", margin: 0, whiteSpace: "pre-wrap", maxWidth: "250px", marginLeft: "auto" }}>{seller.address}</p>
                    {seller.state !== "Select State" && <p style={{ fontSize: "12px", color: "#475569", margin: "4px 0 0 0" }}><strong>State:</strong> {seller.state}</p>}
                    {seller.gstin && <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0 0" }}><strong>GSTIN:</strong> {seller.gstin}</p>}
                    {seller.pan && <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0 0" }}><strong>PAN:</strong> {seller.pan}</p>}
                    {seller.udyam && <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0 0" }}><strong>UDYAM:</strong> {seller.udyam}</p>}
                  </div>
                </div>

                {/* Bill To */}
                <div style={{ marginBottom: "40px", padding: "20px", background: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #0ea5e9" }}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>Bill To</div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px 0", color: "#0f172a" }}>{buyer.name || "Client Name"}</h3>
                  {buyer.address && <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 4px 0", whiteSpace: "pre-wrap" }}>{buyer.address}</p>}
                  {buyer.state !== "Select State" && <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 2px 0" }}><strong>State:</strong> {buyer.state}</p>}
                  {buyer.gstin && <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 2px 0" }}><strong>GSTIN:</strong> {buyer.gstin}</p>}
                  {buyer.email && <p style={{ fontSize: "13px", color: "#475569", margin: "0" }}><strong>Email:</strong> {buyer.email}</p>}
                </div>

                {/* Items Table */}
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "left" }}>Description</th>
                      <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "left" }}>HSN/SAC</th>
                      <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "right" }}>Qty</th>
                      <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "right" }}>Rate (₹)</th>
                      {transType === "intra" ? (
                        <>
                          <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "right" }}>CGST</th>
                          <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "right" }}>SGST</th>
                        </>
                      ) : (
                        <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "right" }}>IGST</th>
                      )}
                      <th style={{ padding: "12px 8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", textTransform: "uppercase", borderBottom: "2px solid #cbd5e1", textAlign: "right" }}>Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => {
                      const c = calcItem(item);
                      return (
                        <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                          <td style={{ padding: "16px 8px", fontSize: "13px", color: "#0f172a" }}>{item.desc || "-"}</td>
                          <td style={{ padding: "16px 8px", fontSize: "13px", color: "#475569" }}>{item.hsn || "-"}</td>
                          <td style={{ padding: "16px 8px", fontSize: "13px", color: "#475569", textAlign: "right" }}>{item.qty}</td>
                          <td style={{ padding: "16px 8px", fontSize: "13px", color: "#475569", textAlign: "right" }}>{fmtINR(item.rate)}</td>
                          {transType === "intra" ? (
                            <>
                              <td style={{ padding: "16px 8px", fontSize: "13px", color: "#475569", textAlign: "right" }}>{item.gst / 2}%</td>
                              <td style={{ padding: "16px 8px", fontSize: "13px", color: "#475569", textAlign: "right" }}>{item.gst / 2}%</td>
                            </>
                          ) : (
                            <td style={{ padding: "16px 8px", fontSize: "13px", color: "#475569", textAlign: "right" }}>{item.gst}%</td>
                          )}
                          <td style={{ padding: "16px 8px", fontSize: "13px", color: "#0f172a", fontWeight: "600", textAlign: "right" }}>{fmtINR(c.total)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Totals & Bank Layout */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
                  
                  {/* Bank Details */}
                  <div style={{ width: "50%", paddingRight: "40px" }}>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>Bank Details</div>
                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "8px", fontSize: "12px", color: "#475569" }}>
                      <div style={{ fontWeight: "600" }}>Account Name:</div><div>{bank.accName || "-"}</div>
                      <div style={{ fontWeight: "600" }}>Account No:</div><div>{bank.accNo || "-"}</div>
                      <div style={{ fontWeight: "600" }}>IFSC Code:</div><div>{bank.ifsc || "-"}</div>
                      {bank.upi && <><div style={{ fontWeight: "600" }}>UPI ID:</div><div>{bank.upi}</div></>}
                    </div>
                  </div>

                  {/* Totals Box */}
                  <div style={{ width: "40%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#475569" }}>
                      <span>Taxable Amount</span>
                      <span>₹{fmtINR(totals.base)}</span>
                    </div>
                    {transType === "intra" ? (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#475569" }}>
                          <span>CGST</span><span>₹{fmtINR(totals.gst / 2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#475569" }}>
                          <span>SGST</span><span>₹{fmtINR(totals.gst / 2)}</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#475569" }}>
                        <span>IGST</span><span>₹{fmtINR(totals.gst)}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "2px solid #cbd5e1", fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
                      <span>Total Amount</span>
                      <span>₹{fmtINR(totals.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Terms / MSME Rule */}
                <div style={{ padding: "20px", background: seller.udyam ? "rgba(14,165,233,0.05)" : "#f8fafc", border: seller.udyam ? "1px solid rgba(14,165,233,0.2)" : "1px solid #e2e8f0", borderRadius: "8px", marginBottom: "60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1, paddingRight: "20px" }}>
                    <div style={{ fontSize: "11px", color: seller.udyam ? "#0ea5e9" : "#64748b", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>Terms & Conditions</div>
                    <p style={{ fontSize: "12px", color: "#475569", margin: 0, whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                      {finalNotes}
                    </p>
                  </div>
                  {bank.upi && totals.total > 0 && (
                    <div style={{ textAlign: "center", background: "#fff", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <QRCodeCanvas value={`upi://pay?pa=${bank.upi}&pn=${seller.name || "Business"}&am=${totals.total}&cu=INR`} size={80} />
                      <div style={{ fontSize: "9px", color: "#64748b", marginTop: "6px", fontWeight: "700", textTransform: "uppercase" }}>Scan to Pay</div>
                    </div>
                  )}
                </div>

                {/* Signature Block */}
                <div style={{ position: "absolute", bottom: "30mm", right: "20mm", textAlign: "center", width: "200px" }}>
                  <div style={{ borderBottom: "1px solid #0f172a", height: "40px", marginBottom: "8px" }}></div>
                  <div style={{ fontSize: "12px", color: "#0f172a", fontWeight: "700" }}>Authorized Signatory</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>For {seller.name || "Company Name"}</div>
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Universal Legal Disclaimer (Moved out of app canvas) */}
      <div style={{ padding: "40px 20px", background: "#020617", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.6", margin: "0 auto", maxWidth: "800px", fontFamily: "'DM Sans',sans-serif" }}>
          <strong>Disclaimer:</strong> All calculators and tools on KaroTools.in are provided for educational and informational purposes only. While we strive to keep the logic updated with the latest Indian tax laws (FY 2025-26), the results generated are estimates and do not constitute professional financial, legal, or tax advice. We strongly recommend consulting a certified Chartered Accountant or legal professional before making any business decisions or filing your taxes. KaroTools is not responsible for any financial loss, penalties, or compliance errors resulting from the use of this website.
        </p>
      </div>

    </div>
  );
}