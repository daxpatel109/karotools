import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const emptyItem = () => ({ desc: "", hsn: "", qty: 1, rate: "", discount: 0, gst: 18 });

const genInvoiceNo = () => {
  const y = new Date().getFullYear();
  const n = String(Math.floor(Math.random() * 9000) + 1000);
  return `INV-${y}-${n}`;
};

const validateGSTIN = (g) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(g);
const validatePhone = (p) => /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(p.replace(/\s/g, ""));
const fmtINR = (n) => Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 });

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState(() => {
    const saved = localStorage.getItem("inv_data");
    return saved ? JSON.parse(saved).invoice : { number: genInvoiceNo(), date: new Date().toISOString().split("T")[0], due: "", notes: "Payment due within 15 days. Thank you for your business!", status: "pending" };
  });
  const [seller, setSeller] = useState(() => {
    const saved = localStorage.getItem("inv_data");
    return saved ? JSON.parse(saved).seller : { name: "", address: "", gstin: "", phone: "", email: "" };
  });
  const [buyer, setBuyer] = useState(() => {
    const saved = localStorage.getItem("inv_data");
    return saved ? JSON.parse(saved).buyer : { name: "", address: "", gstin: "", phone: "", email: "" };
  });
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("inv_data");
    return saved ? JSON.parse(saved).items : [emptyItem()];
  });
  const [transType, setTransType] = useState("intra");
  const [rcm, setRcm] = useState(false);
  const [logo, setLogo] = useState(null);
  const [errors, setErrors] = useState({});
  const logoRef = useRef();

  useEffect(() => {
    localStorage.setItem("inv_data", JSON.stringify({ invoice, seller, buyer, items }));
  }, [invoice, seller, buyer, items]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free GST Invoice Generator India — Download PDF | KaroTools";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Create professional GST invoices instantly and download as PDF. Free GST invoice generator for Indian freelancers and businesses. No login required.";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://karotools.vercel.app/invoice-generator";

    // Software App Schema
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "KaroTools GST Invoice Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "WebBrowser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
      "description": "Create professional GST invoices instantly and download as PDF."
    });
    document.head.appendChild(schemaScript);

    // FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is a GST Invoice?", "acceptedAnswer": { "@type": "Answer", "text": "A GST invoice is an official document issued by a GST-registered business when selling goods or services." } },
        { "@type": "Question", "name": "Who needs to issue a GST Invoice in India?", "acceptedAnswer": { "@type": "Answer", "text": "Any GST-registered business with turnover above ₹40 lakhs (goods) or ₹20 lakhs (services) must issue GST invoices." } },
        { "@type": "Question", "name": "What is CGST, SGST and IGST?", "acceptedAnswer": { "@type": "Answer", "text": "CGST + SGST apply for intra-state transactions. IGST applies for inter-state transactions." } }
      ]
    });
    document.head.appendChild(faqSchemaScript);

    return () => {
      if (document.head.contains(schemaScript)) document.head.removeChild(schemaScript);
      if (document.head.contains(faqSchemaScript)) document.head.removeChild(faqSchemaScript);
    };
  }, []);

  // Auto-detect Intra/Inter state based on GSTIN prefixes
  useEffect(() => {
    if (seller.gstin && buyer.gstin && seller.gstin.length >= 2 && buyer.gstin.length >= 2) {
      const sCode = seller.gstin.substring(0, 2);
      const bCode = buyer.gstin.substring(0, 2);
      setTransType(sCode === bCode ? "intra" : "inter");
    }
  }, [seller.gstin, buyer.gstin]);

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

  const validate = () => {
    const e = {};
    if (seller.gstin && !validateGSTIN(seller.gstin)) e.sellerGstin = "Invalid GSTIN format";
    if (buyer.gstin && !validateGSTIN(buyer.gstin)) e.buyerGstin = "Invalid GSTIN format";
    if (seller.phone && !validatePhone(seller.phone)) e.sellerPhone = "Invalid phone number";
    if (buyer.phone && !validatePhone(buyer.phone)) e.buyerPhone = "Invalid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const statusColors = { paid: "#34d399", pending: "#f59e0b", overdue: "#f87171" };

  const downloadPDF = () => {
    if (!validate()) return;
    const doc = new jsPDF();
    const purple = [124, 58, 237];
    const dark = [15, 23, 42];
    const gray = [100, 116, 139];
    const light = [248, 250, 252];

    // Header
    doc.setFillColor(...purple);
    doc.rect(0, 0, 210, 45, "F");

    // Logo
    if (logo) {
      try { doc.addImage(logo, "JPEG", 14, 8, 25, 25); } catch (e) {}
    }

    const textStart = logo ? 45 : 14;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("TAX INVOICE", textStart, 20);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`No: ${invoice.number}`, textStart, 28);
    doc.text(`Date: ${invoice.date}`, textStart + 50, 28);
    if (invoice.due) doc.text(`Due: ${invoice.due}`, textStart + 100, 28);
    doc.text(`Reverse Charge: ${rcm ? "Yes" : "No"}`, textStart, 34);

    // Status badge
    const sc = invoice.status === "paid" ? [52, 211, 153] : invoice.status === "overdue" ? [248, 113, 113] : [245, 158, 11];
    doc.setFillColor(...sc);
    doc.roundedRect(155, 32, 40, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(invoice.status.toUpperCase(), 175, 37.5, { align: "center" });

    // Seller
    doc.setTextColor(...dark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("FROM", 14, 58);
    doc.setDrawColor(...purple);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 35, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    let sy = 65;
    if (seller.name) { doc.setTextColor(...dark); doc.setFont("helvetica", "bold"); doc.text(seller.name, 14, sy); doc.setFont("helvetica", "normal"); sy += 6; }
    if (seller.address) { doc.setTextColor(...gray); doc.text(seller.address, 14, sy); sy += 6; }
    if (seller.gstin) { doc.text(`GSTIN: ${seller.gstin}`, 14, sy); sy += 6; }
    if (seller.phone) { doc.text(`Phone: ${seller.phone}`, 14, sy); sy += 6; }
    if (seller.email) { doc.text(`Email: ${seller.email}`, 14, sy); }

    // Buyer
    doc.setTextColor(...dark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO", 120, 58);
    doc.setDrawColor(...purple);
    doc.line(120, 60, 145, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    let by = 65;
    if (buyer.name) { doc.setTextColor(...dark); doc.setFont("helvetica", "bold"); doc.text(buyer.name, 120, by); doc.setFont("helvetica", "normal"); by += 6; }
    if (buyer.address) { doc.setTextColor(...gray); doc.text(buyer.address, 120, by); by += 6; }
    if (buyer.gstin) { doc.text(`GSTIN: ${buyer.gstin}`, 120, by); by += 6; }
    if (buyer.phone) { doc.text(`Phone: ${buyer.phone}`, 120, by); by += 6; }
    if (buyer.email) { doc.text(`Email: ${buyer.email}`, 120, by); }

    // Items Table
    const hasDiscount = totals.discount > 0;
    const head = hasDiscount 
      ? [["#", "Description", "HSN/SAC", "Qty", "Rate", "Disc%", "Taxable", "GST%", "GST Amt", "Total"]]
      : [["#", "Description", "HSN/SAC", "Qty", "Rate (₹)", "Taxable (₹)", "GST%", "GST (₹)", "Total (₹)"]];

    autoTable(doc, {
      startY: 100,
      head: head,
      body: items.map((item, i) => {
        const c = calcItem(item);
        if (hasDiscount) {
          return [i + 1, item.desc || "-", item.hsn || "-", item.qty, fmtINR(item.rate), `${item.discount}%`, fmtINR(c.taxableBase), `${item.gst}%`, fmtINR(c.gstAmt), fmtINR(c.total)];
        }
        return [i + 1, item.desc || "-", item.hsn || "-", item.qty, fmtINR(item.rate), fmtINR(c.taxableBase), `${item.gst}%`, fmtINR(c.gstAmt), fmtINR(c.total)];
      }),
      headStyles: { fillColor: purple, textColor: 255, fontStyle: "bold", fontSize: 8, halign: "center" },
      bodyStyles: { textColor: dark, fontSize: 8, halign: "center" },
      columnStyles: { 1: { halign: "left" } },
      alternateRowStyles: { fillColor: light },
      margin: { left: 14, right: 14 },
    });

    const fy = doc.lastAutoTable.finalY + 8;

    // Notes
    if (invoice.notes) {
      doc.setFillColor(...light);
      doc.roundedRect(14, fy, 90, 30, 3, 3, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text("Notes / Terms:", 18, fy + 8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text(invoice.notes, 18, fy + 15, { maxWidth: 82 });
    }

    // Totals box
    doc.setFillColor(...light);
    doc.roundedRect(120, fy, 76, transType === "intra" ? 52 : 44, 3, 3, "F");
    doc.setFontSize(9);
    let ty = fy + 10;
    const rows = [
      ["Taxable Amount:", fmtINR(totals.base)],
      ...(transType === "intra"
        ? [["CGST:", fmtINR(totals.gst / 2)], ["SGST:", fmtINR(totals.gst / 2)]]
        : [["IGST:", fmtINR(totals.gst)]]),
    ];
    rows.forEach(([l, v]) => {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text(l, 124, ty);
      doc.setTextColor(...dark);
      doc.text(`₹${v}`, 192, ty, { align: "right" });
      ty += 8;
    });
    doc.setFillColor(...purple);
    doc.roundedRect(120, ty, 76, 12, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("TOTAL:", 124, ty + 8);
    doc.text(`₹${fmtINR(totals.total)}`, 192, ty + 8, { align: "right" });

    // Signature
    const sigY = fy + (transType === "intra" ? 62 : 54);
    doc.setDrawColor(...purple);
    doc.setLineWidth(0.3);
    doc.line(120, sigY + 15, 196, sigY + 15);
    doc.setFontSize(8);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signature", 158, sigY + 20, { align: "center" });
    doc.text(seller.name || "Business Name", 158, sigY + 26, { align: "center" });

    // Footer
    doc.setFillColor(...purple);
    doc.rect(0, 282, 210, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text("Generated by KaroTools.in — Free GST Invoice Generator for Indian Freelancers & Businesses", 105, 291, { align: "center" });

    doc.save(`${invoice.number}.pdf`);
  };

  const inp = {
    width: "100%", padding: "11px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", fontSize: "13px",
    color: "#f1f5f9", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s"
  };
  const lbl = {
    display: "block", fontWeight: "600", color: "#64748b",
    marginBottom: "5px", fontSize: "10px",
    letterSpacing: "0.08em", textTransform: "uppercase"
  };
  const sec = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px", padding: "24px", marginBottom: "14px"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080814", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
        input::placeholder,textarea::placeholder{color:#334155}
        input:focus,textarea:focus,select:focus{border-color:rgba(167,139,250,0.5)!important;outline:none}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        select option{background:#1e293b;color:#f1f5f9}
        .inv-details-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .inv-items-grid{display:grid;grid-template-columns:2fr 0.8fr 0.6fr 1fr 0.8fr 0.8fr auto;gap:8px;align-items:end}
        @media(min-width:640px){.inv-details-grid{grid-template-columns:1fr 1fr 1fr 1fr}}
        @media(max-width:639px){.inv-items-grid{grid-template-columns:1fr 1fr;gap:8px}}
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 20% 20%,rgba(124,58,237,0.1) 0%,transparent 60%)" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(8,8,20,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none" }}><span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>⚡ KaroTools</span></Link>
        <Link to="/" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>← Home</Link>
      </nav>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 20px 80px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "52px", marginBottom: "12px" }}>📄</div>
          <h1 style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#f1f5f9,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>GST Invoice Generator</h1>
          <p style={{ color: "#64748b" }}>Create professional GST invoices • Free • No login • Instant PDF download</p>
        </div>

        {/* Logo Upload */}
        <div style={sec}>
          <p style={{ ...lbl, marginBottom: "12px", fontSize: "12px" }}>🖼 Business Logo (Optional)</p>
          <div onClick={() => logoRef.current.click()} style={{ border: "2px dashed rgba(124,58,237,0.3)", borderRadius: "12px", padding: "20px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "rgba(124,58,237,0.05)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.6)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"}
          >
            {logo ? <img src={logo} alt="logo" style={{ height: "60px", objectFit: "contain" }} /> : <p style={{ color: "#64748b", fontSize: "14px" }}>Click to upload logo (PNG/JPG)</p>}
          </div>
          <input ref={logoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
            const file = e.target.files[0];
            if (file) { const r = new FileReader(); r.onload = ev => setLogo(ev.target.result); r.readAsDataURL(file); }
          }} />
        </div>

        {/* Invoice Details */}
        <div style={sec}>
          <p style={{ ...lbl, marginBottom: "14px", fontSize: "12px" }}>📋 Invoice Details</p>
          <div className="inv-details-grid">
            <div>
              <label style={lbl}>Invoice Number</label>
              <input value={invoice.number} onChange={e => setInvoice({ ...invoice, number: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Invoice Date</label>
              <input type="date" value={invoice.date} onChange={e => setInvoice({ ...invoice, date: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Due Date</label>
              <input type="date" value={invoice.due} onChange={e => setInvoice({ ...invoice, due: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Payment Status</label>
              <select value={invoice.status} onChange={e => setInvoice({ ...invoice, status: e.target.value })} style={{ ...inp, cursor: "pointer", color: statusColors[invoice.status] }}>
                <option value="pending">⏳ Pending</option>
                <option value="paid">✅ Paid</option>
                <option value="overdue">🔴 Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transaction Type & RCM */}
        <div style={sec}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
            <p style={{ ...lbl, marginBottom: "0", fontSize: "12px" }}>Transaction Type <span style={{ color: "#34d399", fontSize: "10px", marginLeft: "8px", fontWeight: "normal", textTransform: "none" }}>{seller.gstin?.length >= 2 && buyer.gstin?.length >= 2 && "(Auto-detected from GSTINs)"}</span></p>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
              <input type="checkbox" checked={rcm} onChange={e => setRcm(e.target.checked)} style={{ accentColor: "#7c3aed", width: "16px", height: "16px" }} />
              Reverse Charge Applicable (RCM)
            </label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[["intra", "🏙 Intra-State", "CGST + SGST"], ["inter", "🌐 Inter-State", "IGST only"]].map(([val, label, sub]) => (
              <button key={val} onClick={() => setTransType(val)} style={{ padding: "12px", borderRadius: "10px", border: "1px solid", borderColor: transType === val ? "#7c3aed" : "rgba(255,255,255,0.08)", background: transType === val ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)", color: transType === val ? "#a78bfa" : "#64748b", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                <div style={{ fontWeight: "700", fontSize: "13px" }}>{label}</div>
                <div style={{ fontSize: "11px", opacity: 0.7 }}>{sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Seller & Buyer */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          {[["🏢 Your Details", seller, setSeller, "seller"], ["👤 Client Details", buyer, setBuyer, "buyer"]].map(([title, state, setState, prefix]) => (
            <div key={title} style={sec}>
              <p style={{ ...lbl, marginBottom: "14px", fontSize: "12px" }}>{title}</p>
              {[
                ["Business Name", "name", "Your Business"],
                ["Address", "address", "City, State - PIN"],
                ["GSTIN", "gstin", "22AAAAA0000A1Z5"],
                ["Phone", "phone", "+91 98765 43210"],
                ["Email", "email", "hello@business.com"],
              ].map(([label, key, ph]) => (
                <div key={key} style={{ marginBottom: "8px" }}>
                  <label style={lbl}>{label}</label>
                  <input value={state[key]} onChange={e => { setState({ ...state, [key]: e.target.value }); setErrors({ ...errors, [`${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`]: "" }); }} placeholder={ph} style={{ ...inp, borderColor: errors[`${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`] ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)" }} />
                  {errors[`${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`] && <p style={{ color: "#f87171", fontSize: "11px", marginTop: "4px" }}>⚠ {errors[`${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`]}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Items */}
        <div style={sec}>
          <p style={{ ...lbl, marginBottom: "14px", fontSize: "12px" }}>📦 Items / Services</p>
          {items.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px", marginBottom: "10px", animation: "fadeIn 0.3s ease" }}>
              <div className="inv-items-grid">
                <div>
                  <label style={lbl}>Description</label>
                  <input value={item.desc} onChange={e => updateItem(i, "desc", e.target.value)} placeholder="Web Design Services" style={inp} />
                </div>
                <div>
                  <label style={lbl}>HSN/SAC</label>
                  <input value={item.hsn} onChange={e => updateItem(i, "hsn", e.target.value)} placeholder="998314" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Qty</label>
                  <input type="number" value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Rate (₹)</label>
                  <input type="number" value={item.rate} onChange={e => updateItem(i, "rate", e.target.value)} placeholder="5000" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Disc %</label>
                  <input type="number" value={item.discount} onChange={e => updateItem(i, "discount", e.target.value)} placeholder="0" style={inp} />
                </div>
                <div>
                  <label style={lbl}>GST %</label>
                  <select value={item.gst} onChange={e => updateItem(i, "gst", parseInt(e.target.value))} style={{ ...inp, cursor: "pointer" }}>
                    {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                  </select>
                </div>
                <button onClick={() => removeItem(i)} style={{ padding: "10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", color: "#f87171", cursor: "pointer", marginTop: "18px" }}>✕</button>
              </div>
              {item.rate && (
                <div style={{ marginTop: "8px", display: "flex", gap: "16px" }}>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>Taxable: <b style={{ color: "#60a5fa" }}>₹{fmtINR(calcItem(item).taxableBase)}</b></span>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>GST: <b style={{ color: "#a78bfa" }}>₹{fmtINR(calcItem(item).gstAmt)}</b></span>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>Total: <b style={{ color: "#34d399" }}>₹{fmtINR(calcItem(item).total)}</b></span>
                </div>
              )}
            </div>
          ))}
          <button onClick={addItem} style={{ width: "100%", padding: "12px", background: "rgba(124,58,237,0.08)", border: "1px dashed rgba(124,58,237,0.3)", borderRadius: "10px", color: "#a78bfa", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
            + Add Item / Service
          </button>
        </div>

        {/* Notes */}
        <div style={sec}>
          <label style={lbl}>📝 Notes / Terms & Conditions</label>
          <textarea value={invoice.notes} onChange={e => setInvoice({ ...invoice, notes: e.target.value })} rows={3} style={{ ...inp, resize: "vertical", lineHeight: "1.6" }} />
        </div>

        {/* Summary */}
        <div style={{ ...sec, background: "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(37,99,235,0.1))", border: "1px solid rgba(124,58,237,0.3)" }}>
          <p style={{ ...lbl, marginBottom: "16px", fontSize: "12px" }}>💰 Invoice Summary</p>
          {[
            { label: "Taxable Amount", value: totals.base, color: "#60a5fa" },
            ...(transType === "intra"
              ? [{ label: "CGST", value: totals.gst / 2, color: "#34d399" }, { label: "SGST", value: totals.gst / 2, color: "#f472b6" }]
              : [{ label: "IGST", value: totals.gst, color: "#fb923c" }])
          ].map(item => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: "#64748b" }}>{item.label}</span>
              <span style={{ fontWeight: "700", color: item.color }}>₹{fmtINR(item.value)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", background: "rgba(124,58,237,0.2)", borderRadius: "12px", marginTop: "8px" }}>
            <span style={{ fontWeight: "800", color: "#f1f5f9", fontSize: "18px", fontFamily: "'Syne',sans-serif" }}>Total Amount</span>
            <span style={{ fontWeight: "800", color: "#a78bfa", fontSize: "26px", fontFamily: "'Syne',sans-serif" }}>₹{fmtINR(totals.total)}</span>
          </div>
        </div>

        {/* Validation errors */}
        {Object.keys(errors).length > 0 && (
          <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "14px" }}>
            <p style={{ color: "#f87171", fontWeight: "600", fontSize: "14px" }}>⚠ Please fix these errors:</p>
            {Object.values(errors).map((e, i) => <p key={i} style={{ color: "#f87171", fontSize: "13px", marginTop: "4px" }}>• {e}</p>)}
          </div>
        )}

        {/* Download */}
        <button onClick={downloadPDF} style={{ width: "100%", padding: "18px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", borderRadius: "16px", color: "white", fontSize: "18px", fontWeight: "800", cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: "0 8px 30px rgba(124,58,237,0.4)", transition: "all 0.3s", marginBottom: "12px" }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
        >
          📥 Download Professional Invoice PDF
        </button>

        {/* SEO */}
        <div style={{ marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "48px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "28px" }}>About GST Invoice Generator</h2>
          {[
            { q: "What is a GST Invoice?", a: "A GST invoice is an official document issued by a GST-registered business when selling goods or services. It must include seller GSTIN, HSN/SAC codes, GST breakdown (CGST+SGST or IGST), and total amount." },
            { q: "Who needs to issue a GST Invoice in India?", a: "Any GST-registered business with turnover above ₹40 lakhs (goods) or ₹20 lakhs (services) must issue GST invoices. Freelancers providing B2B services, consultants, and agencies also need proper GST invoices." },
            { q: "What is CGST, SGST and IGST?", a: "CGST + SGST apply for intra-state (same state) transactions — split equally. IGST applies for inter-state transactions. This tool automatically calculates both based on your selection." },
            { q: "What is HSN/SAC code?", a: "HSN (Harmonized System Nomenclature) codes classify goods and SAC (Services Accounting Code) codes classify services under GST. For example, software services use SAC code 998314." },
            { q: "Is this invoice generator free?", a: "Yes! 100% free, no login required, no watermarks on PDF. Generate unlimited GST invoices and download instantly. Made for Indian freelancers and small businesses." },
          ].map(item => (
            <div key={item.q} style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#e2e8f0", marginBottom: "6px", fontFamily: "'Syne',sans-serif" }}>{item.q}</h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.7" }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}