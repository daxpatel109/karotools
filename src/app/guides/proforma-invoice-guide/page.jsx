import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Easy Proforma Invoice Complete Guide India — KaroTools",
  description: "Learn what a proforma invoice is, when freelancers should send one, and how to create a free professional PDF quotation for Indian clients.",
  openGraph: {
    title: "How to Create a Proforma Invoice",
    description: "Everything Indian freelancers need to know about Proforma Invoices vs standard Tax Invoices.",
    url: "https://karotools.in/guides/proforma-invoice-guide",
    images: ["https://karotools.in/og-image.png"],
  }
};

export default function BlogPost() {
  return (
    <div style={{ backgroundColor: "#020617", minHeight: "100vh", color: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <Link href="/guides" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            ← Back to Guides
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <article>
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>Business Guide</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: "1.1", marginBottom: "24px", color: "#fff" }}>
              Proforma Invoice vs Tax Invoice: What Freelancers Need to Know
            </h1>

            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#64748b", alignItems: "center", marginBottom: "24px" }}>
              <span>?? June 15, 2026</span>
              <span>?? By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
            </div>
          </header>

          <div style={{ fontSize: "16px", color: "#cbd5e1", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "20px" }}>
              Before a freelance project officially starts, corporate clients often ask for a "Proforma Invoice." If you're used to only sending an invoice after the work is completed, this can be confusing.
            </p>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>What is a Proforma Invoice?</h2>
            <p style={{ marginBottom: "20px" }}>
              A proforma invoice is essentially a <strong>preliminary bill of sale or quotation</strong> sent to a buyer in advance of a delivery of goods or services. It declares the seller's commitment to provide the specified services at the specified prices.
            </p>
            <p style={{ marginBottom: "20px" }}>
              Unlike a standard Tax Invoice, a Proforma Invoice does not trigger a demand for immediate payment, and it is <strong>not a legally binding financial document</strong> for accounting purposes. Your client cannot use a proforma invoice to claim Input Tax Credit (ITC) for GST.
            </p>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>When should you send one?</h2>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
              <li><strong>Advance Payments:</strong> If you require a 50% upfront deposit before starting a project, clients often need a Proforma Invoice to process the advance payment internally.</li>
              <li><strong>Budget Approval:</strong> When a client's finance team needs to approve the estimated cost of your project before issuing a Purchase Order (PO).</li>
            </ul>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>How to create one using KaroTools</h2>
            <p style={{ marginBottom: "20px" }}>
              You don't need a separate software tool to create a Proforma Invoice. You can use our standard GST Invoice Generator.
            </p>
            <p style={{ marginBottom: "20px" }}>
              Simply open the tool, and in the "Invoice Settings" panel, change the document title from <strong>"TAX INVOICE"</strong> to <strong>"PROFORMA INVOICE"</strong>. Fill in your estimated line items and download the PDF. Once the project is complete, you can generate the final Tax Invoice.
            </p>

            <div style={{ backgroundColor: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>Create your Proforma Invoice for Free</h3>
              <p style={{ color: "#94a3b8", marginBottom: "24px", fontSize: "15px" }}>
                Generate a beautiful, watermark-free PDF in seconds. Completely free and runs securely in your browser.
              </p>
              <Link href="/gst-invoice-generator" style={{ display: "inline-block", backgroundColor: "#38bdf8", color: "#020617", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", textDecoration: "none", transition: "all 0.2s" }}>
                Open Invoice Generator →
              </Link>
            </div>

            <div style={{ marginTop: "48px", padding: "20px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
              <strong>Disclaimer:</strong> The information provided on KaroTools is for general informational purposes only and does not constitute professional financial, tax, or legal advice. Tax laws in India frequently change, and while we strive for accuracy, you should always consult with a qualified Chartered Accountant (CA) or legal professional before making any compliance decisions. KaroTools is not responsible for any errors, omissions, or actions taken based on this content.
            </div>

          </div>
        
          <div style={{ marginTop: "48px", padding: "32px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", margin: "0 0 8px 0" }}>Written by: KaroTools Editorial Team</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
              KaroTools creates free GST, tax, invoice, and business calculators for Indian freelancers and small businesses.
            </p>
          </div>
          
          <div style={{ marginTop: "48px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", margin: "0 0 24px 0" }}>Related Guides & Tools</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
              <Link href="/gst-calculator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Calculator</strong>
              </Link>
              <Link href="/invoice-generator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Invoice Generator</strong>
              </Link>
              <Link href="/blog/gst-registration-threshold" style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Registration Rules</strong>
              </Link>
            </div>
          </div>
        </article>

      </main>
    </div>
  );
}
