import { SchemaScript, generateBreadcrumbSchema, generateArticleSchema } from "../../../lib/schema";
import Link from "next/link";
import React from "react";

export const metadata = { title: "Complete SAC & HSN Codes List For India — KaroTools",
  description: "Learn the difference between HSN and SAC codes for GST invoicing in India. Discover the exact 6-digit SAC codes for developers, designers, and consultants.",
  openGraph: {
    title: "HSN vs SAC Codes for Indian Freelancers",
    description: "Learn the difference between HSN and SAC codes for GST invoicing in India.",
    url: "https://karotools.in/guides/hsn-sac-codes-freelancers",
    images: ["https://karotools.in/og-image.png"],
  }, alternates: { canonical: "https://karotools.in/guides/hsn-sac-codes-freelancers" }  };

export default function BlogPost() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar (Static Placeholder for Guide) */}
      <nav style={{ padding: "20px 0", borderBottom: "1px solid var(--glass-bg)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.5px" }}>
            Karo<span style={{ color: "#38bdf8" }}>Tools</span>
          </Link>
          <Link href="/guides" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            ← Back to Guides
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <article>
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>GST Guide</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: "1.1", marginBottom: "24px", color: "#fff" }}>
              HSN vs SAC Codes for Indian Freelancers: The 2026 Guide
            </h1>

            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "var(--text-secondary)", alignItems: "center", marginBottom: "24px" }}>
              <span>?? June 15, 2026</span>
              <span>?? By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
            </div>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
              If you have crossed the GST registration threshold or are voluntarily registering for GST, you have likely encountered a confusing field on your invoice template: HSN/SAC Code. What does it mean?
            </p>
          </header>

          <div style={{ fontSize: "16px", color: "var(--text-primary)", lineHeight: "1.8" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>What is an HSN Code?</h2>
            <p style={{ marginBottom: "20px" }}>
              <strong>HSN (Harmonized System of Nomenclature)</strong> is a globally accepted 6-digit classification system used to identify <strong>Goods</strong>. If you are selling physical products (e.g., a direct-to-consumer brand, dropshipping, or selling custom hardware), you will use an HSN code. 
            </p>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>What is an SAC Code?</h2>
            <p style={{ marginBottom: "20px" }}>
              <strong>SAC (Services Accounting Code)</strong> is a system established by the Central Board of Indirect Taxes and Customs (CBIC) in India specifically to classify <strong>Services</strong>. 
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>Rule of thumb:</strong> 99% of Indian freelancers (developers, designers, consultants, writers) provide services, not physical goods. Therefore, <strong>freelancers use SAC codes, not HSN codes.</strong> All SAC codes begin with the number <strong>99</strong>.
            </p>

            <div style={{ backgroundColor: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "24px", margin: "40px 0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "16px" }}>Common SAC Codes for Freelancers (2026)</h3>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><strong>998311:</strong> Management consulting and management services.</li>
                <li><strong>998313:</strong> Information technology (IT) consulting and support services. (Best for Software Developers)</li>
                <li><strong>998314:</strong> Information technology (IT) design and development services.</li>
                <li><strong>998391:</strong> Specialty design services including interior design, fashion design, industrial design, and other specialty design services. (Best for UI/UX & Graphic Designers)</li>
                <li><strong>998361:</strong> Advertising Services. (Best for Marketers & Copywriters)</li>
              </ul>
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>Is it mandatory to include SAC codes on invoices?</h2>
            <p style={{ marginBottom: "20px" }}>
              According to the latest CBIC guidelines, taxpayers with an aggregate turnover of up to ₹5 Crores in the preceding financial year are required to mention a <strong>4-digit HSN/SAC code</strong> on B2B invoices. If your turnover exceeds ₹5 Crores, a 6-digit code is mandatory. 
            </p>

            <div style={{ backgroundColor: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>Ready to generate your GST Invoice?</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "24px", fontSize: "15px" }}>
                Don't struggle with Excel templates. Use our free tool to instantly generate a professional PDF invoice with built-in SAC code fields and automatic IGST/CGST calculations.
              </p>
              <Link href="/gst-invoice-generator" style={{ display: "inline-block", backgroundColor: "#38bdf8", color: "var(--bg-primary)", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", textDecoration: "none", transition: "all 0.2s" }}>
                Open Free Invoice Generator →
              </Link>
            </div>

            <div style={{ marginTop: "48px", padding: "20px", backgroundColor: "var(--glass-bg)", border: "1px solid var(--glass-bg)", borderRadius: "8px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              <strong>Disclaimer:</strong> The information provided on KaroTools is for general informational purposes only and does not constitute professional financial, tax, or legal advice. Tax laws in India frequently change, and while we strive for accuracy, you should always consult with a qualified Chartered Accountant (CA) or legal professional before making any compliance decisions. KaroTools is not responsible for any errors, omissions, or actions taken based on this content.
            </div>

          </div>
        
          <div style={{ marginTop: "48px", padding: "32px", borderRadius: "16px", border: "1px solid var(--glass-border)", background: "var(--glass-bg)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", margin: "0 0 8px 0" }}>Written by: Dax Patel</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
              Dax Patel creates practical GST, invoice, tax, and business tools for Indian freelancers, consultants, small businesses, and agencies through KaroTools.
            </p>
          </div>
          
          <div style={{ marginTop: "48px", borderTop: "1px solid var(--border-color)", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", margin: "0 0 24px 0" }}>Related Guides & Tools</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
              <Link href="/gst-calculator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-border)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--glass-bg)" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "16px" }}>GST Calculator</strong>
              </Link>
              <Link href="/invoice-generator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-border)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--glass-bg)" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "16px" }}>GST Invoice Generator</strong>
              </Link>
              <Link href="/blog/gst-registration-threshold" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-border)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--glass-bg)" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "16px" }}>GST Registration Rules</strong>
              </Link>
            </div>
          </div>
        
          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>What is the Difference Between HSN and SAC Codes?</h2>
          <p>
            HSN (Harmonized System of Nomenclature) codes are internationally recognized codes used to classify physical goods. 
            SAC (Services Accounting Code) codes are issued by the Central Board of Indirect Taxes and Customs (CBIC) in India strictly to classify services. 
            Since freelancers primarily provide services (like coding, writing, designing, consulting), they will almost always use SAC codes on their invoices, not HSN codes. 
            Using the wrong code can lead to incorrect GST rate application and potential compliance notices from the GST department.
          </p>
          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>How Do I Find My Specific SAC Code?</h2>
          <p>
            Finding the correct SAC code involves understanding the broad categories of services defined under GST. 
            For example, IT and software development services generally fall under heading 9983, specifically 998314 for IT design and development services. 
            Consulting services might fall under 998311, while advertising and marketing services fall under 99836.
            If your exact service isn't listed, you must choose the closest matching category or consult a Chartered Accountant. 
            It is mandatory to display the SAC code on all B2B (Business to Business) tax invoices, and it is highly recommended for B2C (Business to Consumer) invoices as well to ensure total compliance.
          </p>

        </article>

      </main>
    
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "hsn sac codes freelancers", url: "https://karotools.in/guides/hsn-sac-codes-freelancers"}])} />
      <SchemaScript schema={generateArticleSchema({title: "SAC Codes for Freelancers (Software, Design, Consulting)", description: "Find the correct SAC codes and GST rates for freelance software developers, designers, consultants, and writers in India.", url: "https://karotools.in/guides/hsn-sac-codes-freelancers", datePublished: "2026-06-16"})} />
</div>
  );
}
