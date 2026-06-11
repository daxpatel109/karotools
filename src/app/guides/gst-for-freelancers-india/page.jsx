import Link from "next/link";

export default function Guide1() {
  
  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", lineHeight: "1.8", paddingBottom: "80px" }}>
      
      
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 20px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
            <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
              Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
            </span>
          </div>
        </Link>
        <Link href="/guides" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Back to Guides</Link>
      </nav>

      <article style={{ maxWidth: "760px", margin: "60px auto 0", padding: "0 24px" }}>
        
        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(0,118,255,0.1)", color: "#0076ff", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>TAX & COMPLIANCE</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>8 min read</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", lineHeight: 1.15, marginBottom: "32px", color: "#f8fafc", letterSpacing: "-0.02em" }}>
          The Complete Guide to GST for Freelancers in India
        </h1>

        <div style={{ fontSize: "18px", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>
            One of the most confusing aspects of starting a freelance business in India is understanding GST (Goods and Services Tax). Do you need to register? What rate do you charge? What if your clients are overseas? Let's break it down simply.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            1. Do you need to register for GST?
          </h2>
          <p>
            As a freelancer (which falls under the "services" category), you are only required to register for GST if your aggregate turnover (total revenue before expenses) exceeds <strong>₹20 Lakhs in a financial year</strong> (₹10 Lakhs for special category states).
          </p>
          <p>
            <strong>Exceptions:</strong> If you sell through an e-commerce operator or provide OIDAR (Online Information Database Access and Retrieval) services to unregistered entities, you may need mandatory registration regardless of turnover.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            2. What GST Rate Applies to Freelancers?
          </h2>
          <p>
            For most professional and technical services (like software development, graphic design, content writing, consulting), the applicable GST rate is <strong>18%</strong>.
          </p>
          
          <div style={{ background: "rgba(0,118,255,0.05)", border: "1px solid rgba(0,118,255,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0076ff", marginBottom: "12px" }}>Need to calculate GST on a project?</h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "20px" }}>
              Use our free tool to instantly calculate inclusive or exclusive GST amounts.
            </p>
            <Link href="/gst-calculator" style={{ display: "inline-block", background: "linear-gradient(135deg, #0076ff, #005ae6)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Open GST Calculator →
            </Link>
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            3. Dealing with International Clients (LUT)
          </h2>
          <p>
            If you provide services to clients outside India and receive payment in foreign convertible currency, this is considered an "Export of Service." Exports are <strong>zero-rated</strong> under GST.
          </p>
          <p>
            However, to invoice international clients without charging 18% GST, you must file a <strong>Letter of Undertaking (LUT)</strong> on the GST portal at the beginning of every financial year.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            4. How to Create a GST-Compliant Invoice
          </h2>
          <p>
            Once you have a GSTIN, your invoices must contain specific elements to be legally valid:
          </p>
          <ul style={{ paddingLeft: "24px", color: "#94a3b8" }}>
            <li style={{ marginBottom: "12px" }}>Your GSTIN and the Client's GSTIN (if they have one)</li>
            <li style={{ marginBottom: "12px" }}>Invoice Number (must be sequential)</li>
            <li style={{ marginBottom: "12px" }}>Date of Issue</li>
            <li style={{ marginBottom: "12px" }}>SAC Code (Services Accounting Code) for your specific service</li>
            <li style={{ marginBottom: "12px" }}>Proper CGST/SGST breakdown (for intra-state) or IGST (for inter-state)</li>
          </ul>

          <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f59e0b", marginBottom: "12px" }}>Generate Free GST Invoices</h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "20px" }}>
              Don't pay for expensive invoicing software. Use our generator to create legally perfect PDF invoices in seconds.
            </p>
            <Link href="/gst-invoice-generator" style={{ display: "inline-block", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Create GST Invoice →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
