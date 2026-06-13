import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Complete SAC & HSN Codes List For India — KaroTools",
  description: "Learn the difference between HSN and SAC codes for GST invoicing in India. Discover the exact 6-digit SAC codes for developers, designers, and consultants.",
  openGraph: {
    title: "HSN vs SAC Codes for Indian Freelancers",
    description: "Learn the difference between HSN and SAC codes for GST invoicing in India.",
    url: "https://karotools.in/blog/hsn-sac-codes-freelancers",
    images: ["https://karotools.in/og-image.png"],
  }
};

export default function BlogPost() {
  return (
    <div style={{ backgroundColor: "#020617", minHeight: "100vh", color: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar (Static Placeholder for Guide) */}
      <nav style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "24px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>
            Karo<span style={{ color: "#38bdf8" }}>Tools</span>
          </Link>
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            ← Back to Blog
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <article>
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>GST Guide</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Syne', sans-serif", lineHeight: "1.1", marginBottom: "24px", color: "#fff" }}>
              HSN vs SAC Codes for Indian Freelancers: The 2026 Guide
            </h1>
            <p style={{ fontSize: "18px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>
              If you have crossed the GST registration threshold or are voluntarily registering for GST, you have likely encountered a confusing field on your invoice template: HSN/SAC Code. What does it mean?
            </p>
          </header>

          <div style={{ fontSize: "16px", color: "#cbd5e1", lineHeight: "1.8" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>What is an HSN Code?</h2>
            <p style={{ marginBottom: "20px" }}>
              <strong>HSN (Harmonized System of Nomenclature)</strong> is a globally accepted 6-digit classification system used to identify <strong>Goods</strong>. If you are selling physical products (e.g., a direct-to-consumer brand, dropshipping, or selling custom hardware), you will use an HSN code. 
            </p>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>What is an SAC Code?</h2>
            <p style={{ marginBottom: "20px" }}>
              <strong>SAC (Services Accounting Code)</strong> is a system established by the Central Board of Indirect Taxes and Customs (CBIC) in India specifically to classify <strong>Services</strong>. 
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>Rule of thumb:</strong> 99% of Indian freelancers (developers, designers, consultants, writers) provide services, not physical goods. Therefore, <strong>freelancers use SAC codes, not HSN codes.</strong> All SAC codes begin with the number <strong>99</strong>.
            </p>

            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "24px", margin: "40px 0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "16px" }}>Common SAC Codes for Freelancers (2026)</h3>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><strong>998311:</strong> Management consulting and management services.</li>
                <li><strong>998313:</strong> Information technology (IT) consulting and support services. (Best for Software Developers)</li>
                <li><strong>998314:</strong> Information technology (IT) design and development services.</li>
                <li><strong>998391:</strong> Specialty design services including interior design, fashion design, industrial design, and other specialty design services. (Best for UI/UX & Graphic Designers)</li>
                <li><strong>998361:</strong> Advertising Services. (Best for Marketers & Copywriters)</li>
              </ul>
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>Is it mandatory to include SAC codes on invoices?</h2>
            <p style={{ marginBottom: "20px" }}>
              According to the latest CBIC guidelines, taxpayers with an aggregate turnover of up to ₹5 Crores in the preceding financial year are required to mention a <strong>4-digit HSN/SAC code</strong> on B2B invoices. If your turnover exceeds ₹5 Crores, a 6-digit code is mandatory. 
            </p>

            <div style={{ backgroundColor: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>Ready to generate your GST Invoice?</h3>
              <p style={{ color: "#94a3b8", marginBottom: "24px", fontSize: "15px" }}>
                Don't struggle with Excel templates. Use our free tool to instantly generate a professional PDF invoice with built-in SAC code fields and automatic IGST/CGST calculations.
              </p>
              <Link href="/gst-invoice-generator" style={{ display: "inline-block", backgroundColor: "#38bdf8", color: "#020617", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", textDecoration: "none", transition: "all 0.2s" }}>
                Open Free Invoice Generator →
              </Link>
            </div>

            <div style={{ marginTop: "48px", padding: "20px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
              <strong>Disclaimer:</strong> The information provided on KaroTools is for general informational purposes only and does not constitute professional financial, tax, or legal advice. Tax laws in India frequently change, and while we strive for accuracy, you should always consult with a qualified Chartered Accountant (CA) or legal professional before making any compliance decisions. KaroTools is not responsible for any errors, omissions, or actions taken based on this content.
            </div>

          </div>
        </article>
      </main>
    </div>
  );
}
