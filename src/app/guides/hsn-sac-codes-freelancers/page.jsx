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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do freelancers use HSN or SAC codes?",
      "acceptedAnswer": { "@type": "Answer", "text": "Freelancers provide services, so they use SAC (Services Accounting Code) instead of HSN codes." }
    },
    {
      "@type": "Question",
      "name": "What is the SAC code for software developers?",
      "acceptedAnswer": { "@type": "Answer", "text": "The SAC code 998314 is commonly used for Information technology (IT) design and development services." }
    },
    {
      "@type": "Question",
      "name": "What is the SAC code for graphic designers?",
      "acceptedAnswer": { "@type": "Answer", "text": "The SAC code 998391 is commonly used for specialty design services, which includes graphic and UI/UX design." }
    },
    {
      "@type": "Question",
      "name": "Is it mandatory to put an SAC code on invoices?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, if you are GST registered, you must include at least a 4-digit SAC code on B2B invoices (or a 6-digit code if your turnover exceeds ₹5 Crores)." }
    },
    {
      "@type": "Question",
      "name": "What happens if I use the wrong SAC code?",
      "acceptedAnswer": { "@type": "Answer", "text": "Using an incorrect SAC code can result in applying the wrong GST rate, which may lead to compliance notices and penalties from the GST department." }
    }
  ]
};

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
          <span>June 15, 2026</span>
          <span>By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
        </div>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
              Confused by the HSN/SAC code field on your GST invoice? Here is everything freelancers need to know about SAC codes and when to use them.
            </p>
          </header>

          <div style={{ fontSize: "16px", color: "var(--text-primary)", lineHeight: "1.8" }}>
            
            <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "12px", padding: "20px", margin: "24px 0" }}>
              <h3 style={{ margin: "0 0 12px 0", color: "#10b981", fontSize: "18px", fontWeight: "700" }}>⚡ Quick Answer</h3>
              <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Freelancers provide services, so they use <strong>SAC codes</strong> (which start with 99), not HSN codes. Software developers typically use <strong>998314</strong>, designers use <strong>998391</strong>, and consultants use <strong>998311</strong>. It is mandatory for GST-registered freelancers to include this code on their B2B tax invoices.
              </p>
            </div>

            <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", padding: "20px", margin: "24px 0" }}>
              <h3 style={{ margin: "0 0 12px 0", color: "var(--text-primary)", fontSize: "16px", fontWeight: "700" }}>Table of Contents</h3>
              <ul style={{ margin: 0, paddingLeft: "20px", color: "#38bdf8", lineHeight: "1.8", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "8px" }}>
                <li><a href="#what-is-hsn" style={{ color: "#38bdf8", textDecoration: "none" }}>1. What is an HSN Code?</a></li>
                <li><a href="#what-is-sac" style={{ color: "#38bdf8", textDecoration: "none" }}>2. What is an SAC Code?</a></li>
                <li><a href="#hsn-vs-sac" style={{ color: "#38bdf8", textDecoration: "none" }}>3. HSN vs SAC: The Difference</a></li>
                <li><a href="#common-codes" style={{ color: "#38bdf8", textDecoration: "none" }}>4. Common SAC Codes for Freelancers</a></li>
                <li><a href="#is-it-mandatory" style={{ color: "#38bdf8", textDecoration: "none" }}>5. Is it Mandatory on Invoices?</a></li>
                <li><a href="#common-mistakes" style={{ color: "#38bdf8", textDecoration: "none" }}>6. Common Mistakes to Avoid</a></li>
                <li><a href="#invoice-checklist" style={{ color: "#38bdf8", textDecoration: "none" }}>7. GST Invoice Checklist</a></li>
                <li><a href="#faq" style={{ color: "#38bdf8", textDecoration: "none" }}>8. Frequently Asked Questions (FAQ)</a></li>
              </ul>
            </div>

            <h2 id="what-is-hsn" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>What is an HSN Code?</h2>
            <p style={{ marginBottom: "20px" }}>
              <strong>HSN (Harmonized System of Nomenclature)</strong> is a globally accepted 6-digit classification system used to identify <strong>Goods</strong>. If you are selling physical products (e.g., a direct-to-consumer brand, dropshipping, or selling custom hardware), you will use an HSN code. 
            </p>

            <h2 id="what-is-sac" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>What is an SAC Code?</h2>
            <p style={{ marginBottom: "20px" }}>
              <strong>SAC (Services Accounting Code)</strong> is a system established by the Central Board of Indirect Taxes and Customs (CBIC) in India specifically to classify <strong>Services</strong>. 
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>Rule of thumb:</strong> 99% of Indian freelancers (developers, designers, consultants, writers) provide services, not physical goods. Therefore, <strong>freelancers use SAC codes, not HSN codes.</strong> All SAC codes begin with the number <strong>99</strong>. Read our <Link href="/guides/gst-for-freelancers-india" style={{ color: "#38bdf8" }}>comprehensive GST guide</Link> for more basics.
            </p>

            <h2 id="hsn-vs-sac" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>What is the Difference Between HSN and SAC Codes?</h2>
            <p style={{ marginBottom: "20px" }}>
              In simple words, HSN (Harmonized System of Nomenclature) codes are used globally to classify physical goods and products. SAC (Services Accounting Code) codes are used in India specifically to classify services. Since freelancers provide services like writing, designing, or coding, you will almost always use SAC codes on your invoices instead of HSN codes.
            </p>

            <div id="common-codes" style={{ backgroundColor: "var(--glass-bg)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "24px", margin: "40px 0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "16px" }}>Common SAC Codes for Freelancers (2026)</h3>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><strong>998311:</strong> Management consulting and management services.</li>
                <li><strong>998313:</strong> Information technology (IT) consulting and support services. (Best for Software Developers)</li>
                <li><strong>998314:</strong> Information technology (IT) design and development services.</li>
                <li><strong>998391:</strong> Specialty design services including interior design, fashion design, industrial design, and other specialty design services. (Best for UI/UX & Graphic Designers)</li>
                <li><strong>998361:</strong> Advertising Services. (Best for Marketers & Copywriters)</li>
              </ul>
            </div>

            <h2 id="is-it-mandatory" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>Is it mandatory to include SAC codes on invoices?</h2>
            <p style={{ marginBottom: "20px" }}>
              According to the latest CBIC guidelines, taxpayers with an aggregate turnover of up to ₹5 Crores in the preceding financial year are required to mention a <strong>4-digit HSN/SAC code</strong> on B2B invoices. If your turnover exceeds ₹5 Crores, a 6-digit code is mandatory. 
            </p>
            <p style={{ marginBottom: "20px" }}>
              If you are registered for GST, you must include a valid SAC code on your B2B (Business to Business) tax invoices. For B2C (Business to Consumer) invoices, it is highly recommended to include it as well. It tells the government exactly what type of service you provided, ensuring the correct GST rate is applied to the transaction. Need to find out if you must register? Check our <Link href="/blog/gst-registration-threshold" style={{ color: "#38bdf8" }}>GST threshold guide</Link>.
            </p>

            <div style={{ backgroundColor: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "32px", marginTop: "48px", marginBottom: "48px", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#38bdf8", marginBottom: "16px" }}>Generate compliant invoices instantly with our free GST Invoice Generator</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "24px", fontSize: "15px" }}>
                Don't struggle with Excel templates. Use our free tool to instantly generate a professional PDF invoice with built-in SAC code fields and automatic IGST/CGST calculations.
              </p>
              <Link href="/invoice-generator" style={{ display: "inline-block", backgroundColor: "#38bdf8", color: "var(--bg-primary)", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", textDecoration: "none", transition: "all 0.2s" }}>
                Use Free GST Invoice Generator
              </Link>
            </div>

            <h2 id="common-mistakes" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>Common Mistakes to Avoid</h2>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
              <li style={{ marginBottom: "12px" }}><strong>Mixing Goods and Services:</strong> Never use an HSN code for a pure service. Always use an SAC code (starting with 99) for freelance services.</li>
              <li style={{ marginBottom: "12px" }}><strong>Using Outdated Codes:</strong> Ensure you are using the latest 6-digit SAC code as mandated by the CBIC. Using 4-digit codes on B2B invoices can lead to rejection by the client's finance team.</li>
              <li style={{ marginBottom: "12px" }}><strong>Incorrect GST Rates:</strong> The SAC code determines the GST rate (usually 18% for freelance services). Ensure the rate matches the code. You can use our <Link href="/gst-calculator" style={{ color: "#38bdf8" }}>GST calculator</Link> to check amounts.</li>
            </ul>

            <h2 id="invoice-checklist" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>Practical Checklist Before Sending a GST Invoice</h2>
            <p style={{ marginBottom: "16px" }}>Always verify these details before sending your invoice to a client:</p>
            <ul style={{ paddingLeft: "20px", marginBottom: "40px" }}>
              <li style={{ marginBottom: "8px" }}>Does the invoice have a unique invoice number and date?</li>
              <li style={{ marginBottom: "8px" }}>Is your GSTIN and the client's GSTIN clearly stated?</li>
              <li style={{ marginBottom: "8px" }}>Have you included the correct 6-digit SAC code for each line item?</li>
              <li style={{ marginBottom: "8px" }}>Is the <Link href="/guides/igst-vs-cgst-explained-india" style={{ color: "#38bdf8" }}>IGST or CGST/SGST</Link> breakdown calculated correctly based on the place of supply?</li>
              <li style={{ marginBottom: "8px" }}>Have you signed the invoice (digitally or physically)?</li>
            </ul>

            <h2 id="faq" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "40px", marginBottom: "24px" }}>Frequently Asked Questions (FAQ)</h2>
            <div itemScope itemType="https://schema.org/FAQPage" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
              {faqSchema.mainEntity.map((faq, idx) => (
                <details key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", overflow: "hidden" }} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <summary 
                    style={{ width: "100%", textAlign: "left", padding: "16px", background: "transparent", border: "none", color: "#38bdf8", fontWeight: "700", fontSize: "16px", cursor: "pointer" }}
                  >
                    <span itemProp="name">{faq.name}</span>
                  </summary>
                  <div style={{ padding: "0 16px 16px", color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6" }} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text" style={{ margin: 0 }}>{faq.acceptedAnswer.text}</p>
                  </div>
                </details>
              ))}
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

        </article>

      </main>
    
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "hsn sac codes freelancers", url: "https://karotools.in/guides/hsn-sac-codes-freelancers"}])} />
      <SchemaScript schema={generateArticleSchema({title: "SAC Codes for Freelancers (Software, Design, Consulting)", description: "Find the correct SAC codes and GST rates for freelance software developers, designers, consultants, and writers in India.", url: "https://karotools.in/guides/hsn-sac-codes-freelancers", datePublished: "2026-06-16"})} />
</div>
  );
}
