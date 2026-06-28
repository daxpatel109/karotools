import { SchemaScript, generateBreadcrumbSchema, generateArticleSchema } from "../../../lib/schema";
export const metadata = { title: "Complete GST Guide For Indian Freelancers — KaroTools", description: "A comprehensive guide to GST for Indian freelancers. Learn about registration limits, composition schemes, invoicing, and return filing.", alternates: { canonical: "https://karotools.in/guides/gst-for-freelancers-india" }  };
import Link from "next/link";
import React from "react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is GST mandatory for freelancers in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "GST is mandatory for freelancers only if their aggregate annual turnover exceeds ₹20 Lakhs (₹10 Lakhs in special category states) or if they export services without an LUT. Voluntary registration is optional." }
    },
    {
      "@type": "Question",
      "name": "What is the GST rate for freelance services?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most freelance services like software development, design, and consulting fall under the 18% GST slab." }
    },
    {
      "@type": "Question",
      "name": "Do I need to charge GST to international clients?",
      "acceptedAnswer": { "@type": "Answer", "text": "No, if you file a Letter of Undertaking (LUT) at the start of the financial year, export of services is considered zero-rated, meaning you charge 0% GST." }
    },
    {
      "@type": "Question",
      "name": "Can I claim Input Tax Credit (ITC) as a freelancer?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, if you are GST registered, you can claim ITC on business expenses like laptops, software, and internet bills, provided you have a valid Tax Invoice." }
    },
    {
      "@type": "Question",
      "name": "What happens if I cross the ₹20 Lakh threshold?",
      "acceptedAnswer": { "@type": "Answer", "text": "You must apply for GST registration within 30 days of crossing the ₹20 Lakh threshold and start charging GST on subsequent invoices." }
    }
  ]
};

export default function Guide1() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)", lineHeight: "1.8", paddingBottom: "80px" }}>
      
      
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 20px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", background: "var(--bg-primary)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--glass-bg)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
            <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
              Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
            </span>
          </div>
        </Link>
        <Link href="/guides" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Back to Guides</Link>
      </nav>

      <article style={{ maxWidth: "760px", margin: "60px auto 0", padding: "0 24px" }}>
        
        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(0,118,255,0.1)", color: "#0076ff", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>TAX & COMPLIANCE</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>8 min read</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.15, marginBottom: "32px", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          The Complete Guide to GST for Freelancers in India
        </h1>

            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "var(--text-secondary)", alignItems: "center", marginBottom: "24px" }}>
          <span>June 15, 2026</span>
          <span>By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
        </div>

        <div style={{ fontSize: "18px", color: "var(--text-primary)", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>
            One of the most confusing aspects of starting a freelance business in India is understanding GST (Goods and Services Tax). Do you need to register? What rate do you charge? What if your clients are overseas? Let's break it down simply.
          </p>

          <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "12px", padding: "20px", margin: "24px 0" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "#38bdf8", fontSize: "18px", fontWeight: "700" }}>⚡ Quick Answer</h3>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Indian freelancers only need to register for GST if their annual income exceeds ₹20 Lakhs (or if mandatory conditions apply). When registered, you typically charge 18% GST. For international clients, you charge 0% GST by filing a free LUT (Letter of Undertaking) every year.
            </p>
          </div>

          <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", padding: "20px", margin: "24px 0" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "var(--text-primary)", fontSize: "16px", fontWeight: "700" }}>Table of Contents</h3>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#38bdf8", lineHeight: "1.8", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "8px" }}>
              <li><a href="#when-to-register" style={{ color: "#38bdf8", textDecoration: "none" }}>1. When Should Freelancers Register?</a></li>
              <li><a href="#registration-documents" style={{ color: "#38bdf8", textDecoration: "none" }}>2. Documents Required for GST</a></li>
              <li><a href="#applicable-rates" style={{ color: "#38bdf8", textDecoration: "none" }}>3. What GST Rate Applies?</a></li>
              <li><a href="#international-clients" style={{ color: "#38bdf8", textDecoration: "none" }}>4. Dealing with International Clients</a></li>
              <li><a href="#compliant-invoices" style={{ color: "#38bdf8", textDecoration: "none" }}>5. How to Create a GST Invoice</a></li>
              <li><a href="#how-to-file" style={{ color: "#38bdf8", textDecoration: "none" }}>6. How to File GST Returns</a></li>
              <li><a href="#common-mistakes" style={{ color: "#38bdf8", textDecoration: "none" }}>7. Common Mistakes to Avoid</a></li>
              <li><a href="#faq" style={{ color: "#38bdf8", textDecoration: "none" }}>8. Frequently Asked Questions (FAQ)</a></li>
            </ul>
          </div>

          <h2 id="when-to-register" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "16px", marginBottom: "8px" }}>
            When Should Freelancers Register for GST?
          </h2>
          <div style={{ background: "rgba(0,0,0,0.2)", padding: "16px", borderRadius: "12px", borderLeft: "4px solid #0076ff", marginBottom: "16px" }}>
            <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6" }}>Freelancers in India must register for GST when their aggregate annual turnover exceeds ₹20 Lakhs (₹10 Lakhs in special category states) or if they provide OIDAR services to unregistered entities.</p>
          </div>
          <p>
            As a freelancer (which falls under the "services" category), you are only required to register for GST if your aggregate turnover (total revenue before expenses) exceeds <strong>₹20 Lakhs in a financial year</strong> (₹10 Lakhs for special category states).
          </p>
          <p>
            <strong>Exceptions:</strong> If you sell through an e-commerce operator or provide OIDAR (Online Information Database Access and Retrieval) services to unregistered entities, you may need mandatory registration regardless of turnover.
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "24px", marginBottom: "24px", textAlign: "left", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px", color: "var(--text-primary)" }}>Feature</th>
                <th style={{ padding: "12px", color: "var(--text-primary)" }}>GST Registered</th>
                <th style={{ padding: "12px", color: "var(--text-primary)" }}>Not Registered</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", color: "var(--text-secondary)" }}>Invoicing</td>
                <td style={{ padding: "12px", color: "var(--text-primary)" }}>Must issue "Tax Invoice"</td>
                <td style={{ padding: "12px", color: "var(--text-primary)" }}>Must issue "Bill of Supply"</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", color: "var(--text-secondary)" }}>Input Tax Credit (ITC)</td>
                <td style={{ padding: "12px", color: "var(--text-primary)" }}>Can claim ITC on expenses</td>
                <td style={{ padding: "12px", color: "var(--text-primary)" }}>Cannot claim ITC</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", color: "var(--text-secondary)" }}>Compliance</td>
                <td style={{ padding: "12px", color: "var(--text-primary)" }}>Monthly/Quarterly returns</td>
                <td style={{ padding: "12px", color: "var(--text-primary)" }}>None</td>
              </tr>
            </tbody>
          </table>
          
          <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "12px" }}>Make compliant GST Invoices instantly with our free Invoice Generator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Whether you need a Tax Invoice or a Bill of Supply, our free invoice generator has you covered.</p>
            <Link href="/invoice-generator" style={{ display: "inline-block", background: "linear-gradient(135deg, #0076ff, #005ae6)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>Use Free GST Invoice Generator</Link>
          </div>

          <h2 id="registration-documents" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>
            Documents Required for GST Registration
          </h2>
          <p>If you cross the <Link href="/blog/gst-registration-threshold" style={{ color: "#38bdf8" }}>GST registration threshold</Link> or opt for voluntary registration, you will need the following documents:</p>
          <ul style={{ paddingLeft: "24px", color: "var(--text-secondary)", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>PAN Card:</strong> Mandatory for the applicant.</li>
            <li style={{ marginBottom: "8px" }}><strong>Aadhaar Card:</strong> Required for Aadhaar authentication.</li>
            <li style={{ marginBottom: "8px" }}><strong>Proof of Business Address:</strong> Electricity bill, rent agreement, or NOC from the owner.</li>
            <li style={{ marginBottom: "8px" }}><strong>Bank Account Proof:</strong> Cancelled cheque or bank statement.</li>
            <li style={{ marginBottom: "8px" }}><strong>Photograph:</strong> Passport size photo of the applicant.</li>
          </ul>

          <h2 id="applicable-rates" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>
            What GST Rate Applies to Freelancers?
          </h2>
          <p>
            For most professional and technical services (like software development, graphic design, content writing, consulting), the applicable GST rate is <strong>18%</strong>.
          </p>
          
          <div style={{ background: "rgba(0,118,255,0.05)", border: "1px solid rgba(0,118,255,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0076ff", marginBottom: "12px" }}>Calculate GST instantly with our free GST Calculator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "20px" }}>
              Use our free tool to instantly calculate inclusive or exclusive GST amounts for your freelance projects.
            </p>
            <Link href="/gst-calculator" style={{ display: "inline-block", background: "linear-gradient(135deg, #0076ff, #005ae6)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Use Free GST Calculator
            </Link>
          </div>

          <h2 id="international-clients" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>
            Dealing with International Clients (LUT)
          </h2>
          <p>
            If you provide services to clients outside India and receive payment in foreign convertible currency, this is considered an "Export of Service." Exports are <strong>zero-rated</strong> under GST.
          </p>
          <p>
            However, to invoice international clients without charging 18% GST, you must file a <strong>Letter of Undertaking (LUT)</strong> on the GST portal at the beginning of every financial year.
          </p>

          <h2 id="compliant-invoices" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>
            How to Create a GST-Compliant Invoice (Step-by-Step)
          </h2>
          <p>
            Once you have a GSTIN, your invoices must contain specific elements to be legally valid. Follow these steps:
          </p>
          <ul style={{ paddingLeft: "24px", color: "var(--text-secondary)" }}>
            <li style={{ marginBottom: "12px" }}><strong>Step 1: Add GSTINs:</strong> Include your GSTIN and the Client's GSTIN (if they have one).</li>
            <li style={{ marginBottom: "12px" }}><strong>Step 2: Sequential Numbering:</strong> Ensure your Invoice Number is sequential (e.g., INV-001, INV-002).</li>
            <li style={{ marginBottom: "12px" }}><strong>Step 3: Dates:</strong> Add the Date of Issue.</li>
            <li style={{ marginBottom: "12px" }}><strong>Step 4: HSN/SAC Code:</strong> Include the <Link href="/guides/hsn-sac-codes-freelancers" style={{ color: "#38bdf8" }}>SAC Code (Services Accounting Code)</Link> for your specific service.</li>
            <li style={{ marginBottom: "12px" }}><strong>Step 5: Tax Breakdown:</strong> Apply proper CGST/SGST breakdown (for intra-state) or IGST (for inter-state). Read our <Link href="/guides/igst-vs-cgst-explained-india" style={{ color: "#38bdf8" }}>CGST vs IGST guide</Link> for clarity.</li>
          </ul>

          <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f59e0b", marginBottom: "12px" }}>Create your invoice instantly with our free GST Invoice Generator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "20px" }}>
              Don't pay for expensive invoicing software. Use our generator to create legally perfect PDF invoices in seconds.
            </p>
            <Link href="/gst-invoice-generator" style={{ display: "inline-block", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Use Free GST Invoice Generator
            </Link>
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
        
          <h2 id="how-to-file" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>How to File GST Returns as a Freelancer?</h2>
          <p>
            If you are registered under the regular GST scheme, you will typically need to file GSTR-1 and GSTR-3B.
          </p>
          <ul style={{ paddingLeft: "24px", color: "var(--text-secondary)" }}>
            <li style={{ marginBottom: "12px" }}><strong>GSTR-1:</strong> Where you declare your outbound supplies (the invoices you raised).</li>
            <li style={{ marginBottom: "12px" }}><strong>GSTR-3B:</strong> Where you declare the actual tax you have collected and the Input Tax Credit you are claiming, and where you pay the net tax liability.</li>
          </ul>
          <p>
            If you have opted for the QRMP (Quarterly Return Monthly Payment) scheme, your compliance burden is reduced, allowing you to file returns quarterly rather than monthly, though tax payments are still monthly. Don't forget, if you file late, use our <Link href="/late-gst-penalty-calculator" style={{ color: "#38bdf8" }}>Late GST Penalty Calculator</Link> to estimate fees.
          </p>

          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginTop: "24px", marginBottom: "12px" }}>Practical Example for Service-Based Freelancers</h3>
          <p>
            Let's look at a concrete example. Suppose you are a freelance graphic designer based in Maharashtra. 
            You design a brand identity for a client located in Delhi and charge ₹50,000 for your services. 
            Because this is an inter-state transaction (from Maharashtra to Delhi), you are legally required to be registered for GST (since inter-state service supply necessitates registration, though some recent notifications provide exemptions up to ₹20 Lakhs, many corporate clients mandate it anyway).
          </p>
          <p>
            On your invoice, you will apply the standard 18% GST rate for professional services. 
            Your invoice breakdown will look like this:
          </p>
          <ul style={{ paddingLeft: "24px", color: "var(--text-secondary)", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>Base Service Fee: ₹50,000</li>
            <li style={{ marginBottom: "8px" }}>IGST (18%): ₹9,000</li>
            <li style={{ marginBottom: "8px" }}><strong>Total Invoice Value: ₹59,000</strong></li>
          </ul>
          <p>
            When the client pays you ₹59,000, you keep your ₹50,000 revenue. The ₹9,000 is collected on behalf of the government and must be deposited when you file your GSTR-3B return. If you purchased a new laptop for ₹1,00,000 (which included ₹18,000 in GST) to do this work, you can claim that ₹18,000 as Input Tax Credit (ITC). This means your ₹9,000 liability is completely offset by your ITC, and you pay ₹0 in cash for that month, while carrying forward the remaining ₹9,000 ITC to future months.
          </p>

          <h2 id="common-mistakes" style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>Common Mistakes to Avoid</h2>
          <p>
            To stay compliant and stress-free, avoid these common GST mistakes:
          </p>
          <ul style={{ paddingLeft: "24px", color: "var(--text-secondary)", marginBottom: "32px" }}>
            <li style={{ marginBottom: "12px" }}><strong>Ignoring the Threshold:</strong> Monitor your aggregate annual turnover closely. Register immediately if you cross ₹20 Lakhs.</li>
            <li style={{ marginBottom: "12px" }}><strong>Using Bill of Supply Incorrectly:</strong> Never use a standard "Bill of Supply" if you are registered and charging GST. You must issue a formal "Tax Invoice".</li>
            <li style={{ marginBottom: "12px" }}><strong>Losing Expense Invoices:</strong> Keep strict digital copies of every expense receipt on which you plan to claim Input Tax Credit (ITC).</li>
            <li style={{ marginBottom: "12px" }}><strong>Mixing Funds:</strong> Do not treat GST collected as your income. It belongs to the government and must be paid by the 20th of the following month.</li>
            <li style={{ marginBottom: "12px" }}><strong>Forgetting LUT for Exports:</strong> If you work with international clients via Upwork or direct wire transfers, file your Letter of Undertaking (LUT) at the start of every financial year (April 1st).</li>
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

        </article>

    
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "gst for freelancers india", url: "https://karotools.in/guides/gst-for-freelancers-india"}])} />
      <SchemaScript schema={generateArticleSchema({title: "Complete GST Guide for Indian Freelancers (2026)", description: "Learn everything about GST for freelancers in India: registration rules, 18% rate, export of services (LUT), and invoicing.", url: "https://karotools.in/guides/gst-for-freelancers-india", datePublished: "2026-06-15"})} />
</div>
  );
}
