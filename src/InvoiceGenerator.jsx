import { useState, useRef } from "react";

// ── Constants ─────────────────────────────────────────────────────
const GST_RATES = [0, 5, 12, 18, 28];

const INVOICE_TEMPLATES = ["Modern", "Classic", "Minimal"];

const PAYMENT_TERMS = [
  "Due on Receipt",
  "Net 7 Days",
  "Net 15 Days",
  "Net 30 Days",
  "Net 45 Days",
  "Net 60 Days",
];

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" },
  { code: "USD", symbol: "$", label: "US Dollar ($)" },
  { code: "EUR", symbol: "€", label: "Euro (€)" },
  { code: "GBP", symbol: "£", label: "British Pound (£)" },
];

const FAQS = [
  ["What is a GST Invoice?",
   "A GST invoice is a document issued by a GST-registered business listing goods/services sold, their value, and the GST charged. It is required for input tax credit claims in India."],
  ["Is this invoice legally valid in India?",
   "This tool generates invoices following GST invoice format guidelines. For legal compliance, ensure your GSTIN is valid and you are registered under GST. Consult a CA for complex cases."],
  ["What details are mandatory on a GST invoice?",
   "Supplier name, address & GSTIN, invoice number & date, recipient details, HSN/SAC code, taxable value, GST rate & amount (CGST + SGST or IGST), and total amount."],
  ["What is the difference between CGST, SGST, and IGST?",
   "For intra-state sales: CGST (Central GST) + SGST (State GST) each at half the total rate. For inter-state sales: IGST (Integrated GST) at the full rate, collected by the central government."],
  ["Can freelancers in India issue GST invoices?",
   "Yes. Freelancers with annual turnover above ₹20 lakh (₹10 lakh in special category states) must register for GST and issue proper tax invoices for their services."],
];

// ── Helpers ───────────────────────────────────────────────────────
function fmt(val, symbol = "₹") {
  return `${symbol}${Number(val || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function numberToWords(num) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Lakh", "Crore"];

  if (num === 0) return "Zero";
  if (num < 0) return "Minus " + numberToWords(-num);

  function convertHundreds(n) {
    let str = "";
    if (n >= 100) { str += ones[Math.floor(n / 100)] + " Hundred "; n %= 100; }
    if (n >= 20) { str += tens[Math.floor(n / 10)] + " "; n %= 10; }
    if (n > 0) str += ones[n] + " ";
    return str;
  }

  let result = "";
  let intPart = Math.floor(num);
  const decPart = Math.round((num - intPart) * 100);

  const parts = [];
  parts.push(intPart % 1000); intPart = Math.floor(intPart / 1000);
  parts.push(intPart % 100);  intPart = Math.floor(intPart / 100);
  parts.push(intPart % 100);  intPart = Math.floor(intPart / 100);
  parts.push(intPart % 100);

  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] !== 0) result += convertHundreds(parts[i]) + (scales[i] ? scales[i] + " " : "");
  }

  result = result.trim() + " Rupees";
  if (decPart > 0) result += " and " + convertHundreds(decPart).trim() + " Paise";
  return result + " Only";
}

function generateInvoiceNo() {
  const d = new Date();
  return `INV-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function dueDate(term) {
  const d = new Date();
  const days = { "Due on Receipt": 0, "Net 7 Days": 7, "Net 15 Days": 15, "Net 30 Days": 30, "Net 45 Days": 45, "Net 60 Days": 60 };
  d.setDate(d.getDate() + (days[term] || 0));
  return d.toISOString().split("T")[0];
}

// ── Styles ────────────────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", background: "#080814", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" },
  inner: { maxWidth: "900px", margin: "0 auto", padding: "100px 20px 80px", position: "relative", zIndex: 1 },
  card: {
    background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
    backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px", padding: "32px", marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "13px", fontWeight: "700", color: "#94a3b8",
    letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px",
    display: "flex", alignItems: "center", gap: "8px",
  },
  label: { display: "block", fontSize: "12px", fontWeight: "700", color: "#64748b", marginBottom: "8px", letterSpacing: "0.06em", textTransform: "uppercase" },
  input: {
    width: "100%", padding: "12px 16px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", fontSize: "14px", color: "#f1f5f9",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s,box-shadow 0.2s",
    fontFamily: "'DM Sans',sans-serif",
  },
  select: {
    width: "100%", padding: "12px 16px", background: "#0f0f23",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
    fontSize: "14px", color: "#f1f5f9", outline: "none",
    boxSizing: "border-box", cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
  },
  chip: (active) => ({
    padding: "7px 14px", borderRadius: "50px", cursor: "pointer", fontSize: "13px", fontWeight: "600",
    border: `1px solid ${active ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.1)"}`,
    background: active ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.03)",
    color: active ? "#a78bfa" : "#94a3b8", transition: "all 0.2s",
  }),
};

function InputField({ label, value, onChange, placeholder, type = "text", style = {} }) {
  return (
    <div style={style}>
      <label style={S.label}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} style={S.input}
        onFocus={e => { e.target.style.borderColor = "rgba(167,139,250,0.5)"; e.target.style.boxShadow = "0 0 16px rgba(124,58,237,0.15)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );
}

// ── Print / PDF styles injected at runtime ─────────────────────────
const PRINT_CSS = `
@media print {
  body > *:not(#invoice-print-root) { display: none !important; }
  #invoice-print-root { display: block !important; }
  @page { size: A4; margin: 12mm; }
}
`;

// ── Invoice Preview ───────────────────────────────────────────────
function InvoicePreview({ data, currency }) {
  const { from, to, invoice, items, notes, txType, template } = data;
  const sym = currency.symbol;

  const subtotal = items.reduce((s, it) => s + (it.qty * it.rate), 0);
  const totalGst = items.reduce((s, it) => {
    const base = it.qty * it.rate;
    return s + (base * it.gst / 100);
  }, 0);
  const grandTotal = subtotal + totalGst;
  const inWords = numberToWords(Math.round(grandTotal));

  const isModern = template === "Modern";
  const isClassic = template === "Classic";

  return (
    <div id="invoice-preview" style={{
      background: "#fff", color: "#1a1a2e",
      fontFamily: isModern ? "'DM Sans',sans-serif" : "'Georgia',serif",
      borderRadius: "16px", overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      minWidth: "600px",
    }}>
      {/* Header */}
      <div style={{
        background: isModern ? "linear-gradient(135deg,#7c3aed,#2563eb)" : isClassic ? "#1a1a2e" : "#f8fafc",
        padding: "32px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: isMinimal(template) ? "#1a1a2e" : "#fff", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.5px" }}>
            {from.name || "Your Business"}
          </div>
          {from.gstin && <div style={{ fontSize: "12px", color: isMinimal(template) ? "#64748b" : "rgba(255,255,255,0.8)", marginTop: "4px" }}>GSTIN: {from.gstin}</div>}
          <div style={{ fontSize: "12px", color: isMinimal(template) ? "#64748b" : "rgba(255,255,255,0.7)", marginTop: "2px", maxWidth: "240px" }}>{from.address}</div>
          {from.email && <div style={{ fontSize: "12px", color: isMinimal(template) ? "#64748b" : "rgba(255,255,255,0.7)", marginTop: "2px" }}>{from.email}</div>}
          {from.phone && <div style={{ fontSize: "12px", color: isMinimal(template) ? "#64748b" : "rgba(255,255,255,0.7)" }}>{from.phone}</div>}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "32px", fontWeight: "800", color: isMinimal(template) ? "#7c3aed" : "#fff", fontFamily: "'Syne',sans-serif" }}>INVOICE</div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: isMinimal(template) ? "#475569" : "rgba(255,255,255,0.9)", marginTop: "4px" }}>{invoice.number}</div>
          <div style={{ fontSize: "12px", color: isMinimal(template) ? "#94a3b8" : "rgba(255,255,255,0.7)", marginTop: "2px" }}>
            Date: {invoice.date}<br />
            Due: {invoice.due}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div style={{ padding: "24px 40px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Bill To</div>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a2e" }}>{to.name || "Client Name"}</div>
          {to.gstin && <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>GSTIN: {to.gstin}</div>}
          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{to.address}</div>
          {to.email && <div style={{ fontSize: "12px", color: "#64748b" }}>{to.email}</div>}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Payment Terms</div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a2e" }}>{invoice.terms}</div>
          {invoice.poNumber && <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>PO#: {invoice.poNumber}</div>}
        </div>
      </div>

      {/* Items Table */}
      <div style={{ padding: "24px 40px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: isModern ? "rgba(124,58,237,0.08)" : "#f8fafc" }}>
              {["#", "Description", "HSN/SAC", "Qty", "Rate", "GST%", "Amount"].map((h, i) => (
                <th key={h} style={{
                  padding: "10px 12px", textAlign: i === 0 ? "center" : i >= 3 ? "right" : "left",
                  color: "#64748b", fontWeight: "700", fontSize: "11px",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  borderBottom: "1px solid #e2e8f0",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => {
              const base = it.qty * it.rate;
              const gstAmt = base * it.gst / 100;
              const total = base + gstAmt;
              return (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px", textAlign: "center", color: "#94a3b8", fontSize: "12px" }}>{i + 1}</td>
                  <td style={{ padding: "12px", color: "#1a1a2e", fontWeight: "600" }}>
                    {it.description || "—"}
                    {it.detail && <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{it.detail}</div>}
                  </td>
                  <td style={{ padding: "12px", color: "#64748b", fontSize: "12px" }}>{it.hsn || "—"}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#475569" }}>{it.qty}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#475569" }}>{sym}{Number(it.rate).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#475569" }}>{it.gst}%</td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: "700", color: "#1a1a2e" }}>{sym}{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ padding: "0 40px 24px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ minWidth: "280px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}>
            <span style={{ color: "#64748b" }}>Subtotal</span>
            <span style={{ fontWeight: "600", color: "#1a1a2e" }}>{fmt(subtotal, sym)}</span>
          </div>
          {txType === "intra" ? (
            <>
              {[...new Set(items.map(i => i.gst))].filter(g => g > 0).map(rate => {
                const base = items.filter(i => i.gst === rate).reduce((s, i) => s + i.qty * i.rate, 0);
                return (
                  <div key={rate}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "12px" }}>
                      <span style={{ color: "#94a3b8" }}>CGST ({rate / 2}%)</span>
                      <span style={{ color: "#475569" }}>{fmt(base * rate / 200, sym)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f1f5f9", fontSize: "12px" }}>
                      <span style={{ color: "#94a3b8" }}>SGST ({rate / 2}%)</span>
                      <span style={{ color: "#475569" }}>{fmt(base * rate / 200, sym)}</span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f1f5f9", fontSize: "12px" }}>
              <span style={{ color: "#94a3b8" }}>IGST</span>
              <span style={{ color: "#475569" }}>{fmt(totalGst, sym)}</span>
            </div>
          )}
          <div style={{
            display: "flex", justifyContent: "space-between", padding: "14px 16px", marginTop: "8px",
            background: isModern ? "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(37,99,235,0.08))" : "#f8fafc",
            borderRadius: "10px", border: isModern ? "1px solid rgba(124,58,237,0.2)" : "1px solid #e2e8f0",
          }}>
            <span style={{ fontWeight: "800", fontSize: "15px", color: "#1a1a2e" }}>Total</span>
            <span style={{ fontWeight: "800", fontSize: "20px", color: isModern ? "#7c3aed" : "#1a1a2e", fontFamily: "'Syne',sans-serif" }}>{fmt(grandTotal, sym)}</span>
          </div>
        </div>
      </div>

      {/* Amount in words */}
      <div style={{ margin: "0 40px 24px", padding: "12px 16px", background: "#f8fafc", borderRadius: "8px", borderLeft: `3px solid ${isModern ? "#7c3aed" : "#64748b"}` }}>
        <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>Amount in Words: </span>
        <span style={{ fontSize: "12px", color: "#475569", fontStyle: "italic" }}>{inWords}</span>
      </div>

      {/* Notes + Bank */}
      {(notes.note || notes.bank) && (
        <div style={{ padding: "0 40px 24px", display: "grid", gridTemplateColumns: notes.note && notes.bank ? "1fr 1fr" : "1fr", gap: "20px" }}>
          {notes.note && (
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Notes</div>
              <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.6" }}>{notes.note}</p>
            </div>
          )}
          {notes.bank && (
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Bank Details</div>
              <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.7", whiteSpace: "pre-line" }}>{notes.bank}</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{
        padding: "16px 40px",
        background: isModern ? "linear-gradient(135deg,rgba(124,58,237,0.06),rgba(37,99,235,0.04))" : "#f8fafc",
        borderTop: "1px solid #e2e8f0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: "11px", color: "#94a3b8" }}>Generated by KaroTools.vercel.app</span>
        {from.sign && <div style={{ fontSize: "12px", color: "#64748b", textAlign: "right" }}>
          <div style={{ borderTop: "1px solid #cbd5e1", paddingTop: "4px", marginTop: "20px" }}>Authorised Signatory</div>
        </div>}
      </div>
    </div>
  );
}

function isMinimal(t) { return t === "Minimal"; }

// ── Main Component ─────────────────────────────────────────────────
export default function InvoiceGenerator({ onBack }) {
  const printRef = useRef(null);

  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [template, setTemplate] = useState("Modern");
  const [txType, setTxType] = useState("intra");
  const [previewOpen, setPreviewOpen] = useState(false);

  const [from, setFrom] = useState({ name: "", gstin: "", address: "", email: "", phone: "", sign: false });
  const [to, setTo] = useState({ name: "", gstin: "", address: "", email: "" });
  const [invoice, setInvoice] = useState({
    number: generateInvoiceNo(),
    date: today(),
    due: dueDate("Net 30 Days"),
    terms: "Net 30 Days",
    poNumber: "",
  });
  const [items, setItems] = useState([
    { description: "", detail: "", hsn: "", qty: 1, rate: "", gst: 18 },
  ]);
  const [notes, setNotes] = useState({ note: "", bank: "" });

  // Item helpers
  const addItem = () => setItems(p => [...p, { description: "", detail: "", hsn: "", qty: 1, rate: "", gst: 18 }]);
  const removeItem = (i) => setItems(p => p.filter((_, idx) => idx !== i));
  const updateItem = (i, key, val) => setItems(p => p.map((it, idx) => idx === i ? { ...it, [key]: key === "qty" || key === "rate" ? (val === "" ? "" : Number(val)) : key === "gst" ? Number(val) : val } : it));

  const subtotal = items.reduce((s, it) => s + (Number(it.qty) * Number(it.rate || 0)), 0);
  const totalGst = items.reduce((s, it) => s + (Number(it.qty) * Number(it.rate || 0) * it.gst / 100), 0);
  const grandTotal = subtotal + totalGst;

  const handlePrint = () => {
    const style = document.createElement("style");
    style.innerHTML = PRINT_CSS;
    document.head.appendChild(style);

    const preview = document.getElementById("invoice-preview");
    if (!preview) { setPreviewOpen(true); setTimeout(handlePrint, 300); return; }

    const printRoot = document.createElement("div");
    printRoot.id = "invoice-print-root";
    printRoot.style.cssText = "display:none;position:fixed;top:0;left:0;width:100%;z-index:99999;background:#fff;padding:20px;";
    printRoot.innerHTML = preview.outerHTML;
    document.body.appendChild(printRoot);
    window.print();
    document.body.removeChild(printRoot);
    document.head.removeChild(style);
  };

  const data = { from, to, invoice, items, notes, txType, template };

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        input::placeholder,textarea::placeholder{color:#334155}
        select option{background:#0f0f23;color:#f1f5f9}
        textarea{resize:vertical}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(167,139,250,0.3)}50%{box-shadow:0 0 40px rgba(167,139,250,0.7)}}
        .item-row:hover .remove-btn{opacity:1!important}
        @media(max-width:600px){.grid-2{grid-template-columns:1fr!important}.grid-3{grid-template-columns:1fr!important}}
      `}</style>

      {/* BG mesh */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 20% 20%,rgba(124,58,237,0.13) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 80%,rgba(37,99,235,0.09) 0%,transparent 60%)" }} />

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "64px", display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between", background: "rgba(8,8,20,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setPreviewOpen(!previewOpen)} style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>
            {previewOpen ? "✏️ Edit" : "👁️ Preview"}
          </button>
          <button onClick={handlePrint} style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", color: "#fff", padding: "8px 20px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: "700", boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}>
            🖨️ Download PDF
          </button>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>← Back</button>
        </div>
      </nav>

      <div style={S.inner}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px", animation: "fadeInUp 0.5s both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "700", letterSpacing: "0.08em" }}>FREE GST INVOICE · PDF DOWNLOAD</span>
          </div>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📄</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", background: "linear-gradient(135deg,#f1f5f9,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Invoice Generator
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Create professional GST invoices for Indian freelancers & businesses — free, no login needed.
          </p>
        </div>

        {/* ── PREVIEW MODE ── */}
        {previewOpen && (
          <div style={{ animation: "fadeInUp 0.4s both", marginBottom: "20px", overflowX: "auto" }}>
            <InvoicePreview data={data} currency={currency} />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={handlePrint} style={{ padding: "14px 40px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,0.4)", fontFamily: "'Syne',sans-serif" }}>
                🖨️ Download PDF
              </button>
            </div>
          </div>
        )}

        {/* ── EDIT MODE ── */}
        {!previewOpen && (
          <>
            {/* Template + Settings */}
            <div style={{ ...S.card, animation: "fadeInUp 0.5s 0.05s both" }}>
              <div style={S.sectionTitle}>⚙️ Invoice Settings</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }} className="grid-3">
                <div>
                  <label style={S.label}>Template</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {INVOICE_TEMPLATES.map(t => (
                      <button key={t} onClick={() => setTemplate(t)} style={S.chip(template === t)}>{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={S.label}>Transaction Type</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setTxType("intra")} style={S.chip(txType === "intra")}>🏙 Intra-State</button>
                    <button onClick={() => setTxType("inter")} style={S.chip(txType === "inter")}>🌐 Inter-State</button>
                  </div>
                </div>
                <div>
                  <label style={S.label}>Currency</label>
                  <select value={currency.code} onChange={e => setCurrency(CURRENCIES.find(c => c.code === e.target.value))} style={S.select}>
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Invoice meta */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" }} className="grid-2">
                <InputField label="Invoice Number" value={invoice.number} onChange={v => setInvoice(p => ({ ...p, number: v }))} placeholder="INV-2025-001" />
                <InputField label="Invoice Date" value={invoice.date} onChange={v => setInvoice(p => ({ ...p, date: v }))} type="date" />
                <div>
                  <label style={S.label}>Payment Terms</label>
                  <select value={invoice.terms} onChange={e => setInvoice(p => ({ ...p, terms: e.target.value, due: dueDate(e.target.value) }))} style={S.select}>
                    {PAYMENT_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <InputField label="Due Date" value={invoice.due} onChange={v => setInvoice(p => ({ ...p, due: v }))} type="date" />
              </div>
            </div>

            {/* From / To */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="grid-2">

              {/* From */}
              <div style={S.card}>
                <div style={S.sectionTitle}>🏢 Your Details (From)</div>
                <div style={{ display: "grid", gap: "14px" }}>
                  <InputField label="Business / Your Name *" value={from.name} onChange={v => setFrom(p => ({ ...p, name: v }))} placeholder="Raj Patel Designs" />
                  <InputField label="GSTIN (optional)" value={from.gstin} onChange={v => setFrom(p => ({ ...p, gstin: v }))} placeholder="22AAAAA0000A1Z5" />
                  <div>
                    <label style={S.label}>Address</label>
                    <textarea value={from.address} onChange={e => setFrom(p => ({ ...p, address: e.target.value }))} placeholder="Street, City, State, PIN" rows={2}
                      style={{ ...S.input, resize: "vertical" }}
                      onFocus={e => { e.target.style.borderColor = "rgba(167,139,250,0.5)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                  </div>
                  <InputField label="Email" value={from.email} onChange={v => setFrom(p => ({ ...p, email: v }))} placeholder="you@email.com" type="email" />
                  <InputField label="Phone" value={from.phone} onChange={v => setFrom(p => ({ ...p, phone: v }))} placeholder="+91 98765 43210" />
                </div>
              </div>

              {/* To */}
              <div style={S.card}>
                <div style={S.sectionTitle}>👤 Client Details (Bill To)</div>
                <div style={{ display: "grid", gap: "14px" }}>
                  <InputField label="Client Name *" value={to.name} onChange={v => setTo(p => ({ ...p, name: v }))} placeholder="Acme Corp" />
                  <InputField label="Client GSTIN (optional)" value={to.gstin} onChange={v => setTo(p => ({ ...p, gstin: v }))} placeholder="27BBBBB0000B1Z1" />
                  <div>
                    <label style={S.label}>Client Address</label>
                    <textarea value={to.address} onChange={e => setTo(p => ({ ...p, address: e.target.value }))} placeholder="Street, City, State, PIN" rows={2}
                      style={{ ...S.input, resize: "vertical" }}
                      onFocus={e => { e.target.style.borderColor = "rgba(167,139,250,0.5)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                  </div>
                  <InputField label="Client Email" value={to.email} onChange={v => setTo(p => ({ ...p, email: v }))} placeholder="client@company.com" type="email" />
                  <InputField label="PO Number (optional)" value={invoice.poNumber} onChange={v => setInvoice(p => ({ ...p, poNumber: v }))} placeholder="PO-12345" />
                </div>
              </div>
            </div>

            {/* Items */}
            <div style={{ ...S.card, animation: "fadeInUp 0.5s 0.15s both" }}>
              <div style={S.sectionTitle}>📦 Line Items</div>

              {/* Table Header */}
              <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1.5fr 1fr 0.8fr 32px", gap: "8px", marginBottom: "8px", padding: "0 4px" }}>
                {["Description", "Qty", "Rate (₹)", "GST %", "Amount", ""].map((h, i) => (
                  <div key={i} style={{ fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: i >= 1 ? "right" : "left" }}>{h}</div>
                ))}
              </div>

              {items.map((it, i) => {
                const base = Number(it.qty) * Number(it.rate || 0);
                const gstAmt = base * it.gst / 100;
                const total = base + gstAmt;
                return (
                  <div key={i} className="item-row" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px", marginBottom: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1.5fr 1fr 0.8fr 32px", gap: "8px", alignItems: "center" }}>
                      <input value={it.description} onChange={e => updateItem(i, "description", e.target.value)} placeholder={`Item ${i + 1} description`} style={{ ...S.input, fontSize: "13px", padding: "10px 12px" }} onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      <input type="number" value={it.qty} onChange={e => updateItem(i, "qty", e.target.value)} style={{ ...S.input, fontSize: "13px", padding: "10px 12px", textAlign: "right" }} onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      <input type="number" value={it.rate} onChange={e => updateItem(i, "rate", e.target.value)} placeholder="0.00" style={{ ...S.input, fontSize: "13px", padding: "10px 12px", textAlign: "right" }} onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      <select value={it.gst} onChange={e => updateItem(i, "gst", e.target.value)} style={{ ...S.select, fontSize: "13px", padding: "10px 12px" }}>
                        {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                      </select>
                      <div style={{ textAlign: "right", fontSize: "13px", fontWeight: "700", color: "#a78bfa" }}>
                        {currency.symbol}{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(i)} style={{ opacity: items.length === 1 ? 0.2 : 0, width: "28px", height: "28px", background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "6px", color: "#f87171", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s" }} disabled={items.length === 1}>✕</button>
                    </div>
                    {/* HSN + detail row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "8px", marginTop: "8px" }}>
                      <input value={it.hsn} onChange={e => updateItem(i, "hsn", e.target.value)} placeholder="HSN/SAC code" style={{ ...S.input, fontSize: "12px", padding: "8px 12px", color: "#94a3b8" }} onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      <input value={it.detail} onChange={e => updateItem(i, "detail", e.target.value)} placeholder="Additional description (optional)" style={{ ...S.input, fontSize: "12px", padding: "8px 12px", color: "#94a3b8" }} onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                    </div>
                  </div>
                );
              })}

              <button onClick={addItem} style={{ width: "100%", padding: "12px", background: "rgba(124,58,237,0.08)", border: "1px dashed rgba(124,58,237,0.3)", borderRadius: "10px", color: "#a78bfa", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>
                + Add Item
              </button>

              {/* Summary */}
              <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ minWidth: "260px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Subtotal</span>
                    <span style={{ color: "#f1f5f9", fontWeight: "600" }}>{fmt(subtotal, currency.symbol)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Total GST</span>
                    <span style={{ color: "#f1f5f9", fontWeight: "600" }}>{fmt(totalGst, currency.symbol)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(37,99,235,0.15))", borderRadius: "8px", border: "1px solid rgba(124,58,237,0.3)" }}>
                    <span style={{ color: "#a78bfa", fontWeight: "700" }}>Grand Total</span>
                    <span style={{ color: "#fff", fontWeight: "800", fontSize: "18px", fontFamily: "'Syne',sans-serif" }}>{fmt(grandTotal, currency.symbol)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes + Bank */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="grid-2">
              <div style={S.card}>
                <div style={S.sectionTitle}>📝 Notes</div>
                <textarea value={notes.note} onChange={e => setNotes(p => ({ ...p, note: e.target.value }))} placeholder="Thank you for your business! Payment can be made via bank transfer or UPI." rows={4}
                  style={{ ...S.input, width: "100%", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
              <div style={S.card}>
                <div style={S.sectionTitle}>🏦 Bank Details</div>
                <textarea value={notes.bank} onChange={e => setNotes(p => ({ ...p, bank: e.target.value }))} placeholder={`Bank: HDFC Bank\nAccount: 1234567890\nIFSC: HDFC0001234\nUPI: yourname@upi`} rows={4}
                  style={{ ...S.input, width: "100%", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
              <button onClick={() => setPreviewOpen(true)} style={{ padding: "16px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "12px", color: "#a78bfa", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}>
                👁️ Preview Invoice
              </button>
              <button onClick={handlePrint} style={{ padding: "16px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,0.4)", fontFamily: "'Syne',sans-serif" }}>
                🖨️ Download PDF
              </button>
            </div>
          </>
        )}

        {/* SEO Tips */}
        <div style={{ ...S.card, marginTop: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "16px" }}>📈 GST Invoice Tips for Indian Freelancers</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {[
              ["📋 Invoice Number", "Use a sequential format like INV-2025-001. Never repeat or skip numbers — GST portal tracks sequences."],
              ["🏷️ HSN/SAC Code", "Freelancers providing services use SAC codes. IT services = 9983, Design = 9983, Content = 9983, Consulting = 9983."],
              ["⏱️ Time Limit", "Issue invoice within 30 days of service for regular businesses, 45 days for banking companies."],
              ["💾 Record Keeping", "Keep invoice copies for 6 years. GST returns must match your issued invoices exactly."],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: "12px", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "10px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#a78bfa", minWidth: "120px" }}>{t}</span>
                <span style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ ...S.card, marginTop: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "16px" }}>❓ Frequently Asked Questions</h3>
          {FAQS.map(([q, a]) => (
            <div key={q} style={{ marginBottom: "14px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#e2e8f0", marginBottom: "6px" }}>{q}</div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>{a}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
