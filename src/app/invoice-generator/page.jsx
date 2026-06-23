import InvoiceGenerator from "../../InvoiceGenerator";
import TaxDisclaimer from "../../components/article/TaxDisclaimer";
import { generateMetadata } from "../../lib/seo";
import { generateFAQSchema, SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Free GST Invoice Generator | KaroTools",
  description: "Create professional GST-compliant invoices with logo and PDF download. Free invoice generator for Indian freelancers.",
  path: "/invoice-generator",
  keywords: [
    "free gst invoice generator india",
    "gst invoice format",
    "gst bill format",
    "create gst invoice online",
    "gst billing software free"
  ]
});

export default function Page() {
  const faqs = [
    {
      question: "Is this GST invoice generator completely free?",
      answer: "Yes! The KaroTools GST Invoice Generator is 100% free to use. There are no watermarks, no login required, and no limits on how many invoices you can generate."
    },
    {
      question: "What details are mandatory in a GST invoice?",
      answer: "A legally valid GST invoice must include your GSTIN, the buyer's GSTIN (if applicable), invoice number, date, HSN/SAC codes for items, and a clear breakdown of CGST, SGST, or IGST depending on the place of supply."
    },
    {
      question: "When should I charge IGST instead of CGST/SGST?",
      answer: "You charge IGST for inter-state supply (when the buyer is in a different state from you). You charge CGST + SGST for intra-state supply (when the buyer is in the same state)."
    },
    {
      question: "Can I download my invoice as a PDF?",
      answer: "Yes, you can click the 'Print/PDF' button after filling out your details to instantly download a professional, client-ready PDF invoice."
    },
    {
      question: "Does this invoice format work for freelancers?",
      answer: "Absolutely. Freelancers, consultants, and small businesses can use this format. Make sure to enter your appropriate SAC code for the services provided."
    }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* The Interactive Generator (Client Component) */}
      <InvoiceGenerator />

      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the GST Invoice Generator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools GST Invoice Generator helps you create professional tax invoices instantly. It automatically calculates CGST and SGST for local sales, or IGST for inter-state sales based on the GST rate you select. Once your details are filled, you can download a compliant PDF. Learn more in our <Link href="/guides/gst-invoice-format-excel" style={{ color: "#38bdf8", textDecoration: "none" }}>GST Invoice Format Guide</Link>.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Intra-state Tax = CGST (Rate/2) + SGST (Rate/2)</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Inter-state Tax = IGST (Full Rate)</p>
          </div>
        </div>
      </div>

      {/* SEO Content & Guide (Server Component) */}
      <article style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px 100px", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", position: "relative", zIndex: 1 }}>
        
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "40px", marginBottom: "40px", marginTop: "40px" }}>
          
          <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "var(--text-primary)" }}>Free GST Invoice Generator India</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Creating a professional tax invoice shouldn't be complicated. Our free GST Invoice Generator allows you to instantly generate a legally compliant bill without needing complex accounting software or struggling with a <Link href="/guides/gst-invoice-format-excel" style={{ color: "#38bdf8", textDecoration: "none" }}>GST invoice format in Excel</Link>. Simply fill in your details, add your items, and click generate!
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "var(--text-primary)" }}>What Details Are Required in a GST Invoice?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            If you have recently completed your <Link href="/blog/how-to-register-gst-online" style={{ color: "#38bdf8", textDecoration: "none" }}>GST registration</Link>, it's critical to format your bills correctly. Under Indian law, your tax invoice must include:
          </p>
          <ul style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px", paddingLeft: "20px" }}>
            <li>Your Business Name, Address, and <strong>GSTIN</strong></li>
            <li>Buyer's Name, Address, and GSTIN (if they are a registered business)</li>
            <li>Unique, consecutive <strong>Invoice Number</strong> and Date of Issue</li>
            <li><strong>HSN/SAC Code</strong> for each item or service</li>
            <li>Taxable value of supply</li>
            <li>Rate and exact amount of taxes (CGST, SGST, IGST)</li>
          </ul>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "var(--text-primary)" }}>CGST, SGST and IGST in GST Invoice</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Our generator automatically handles the tax math. However, understanding the difference is key to compliance. Read our complete guide on <Link href="/guides/igst-vs-cgst-explained-india" style={{ color: "#38bdf8", textDecoration: "none" }}>IGST vs CGST vs SGST</Link> to learn exactly when to apply each tax type. In short: charge IGST if your client is in a different state, and CGST + SGST if they are in the same state. Note that if you are opted into the <Link href="/blog/gst-composition-scheme-limits" style={{ color: "#38bdf8", textDecoration: "none" }}>GST Composition Scheme</Link>, you issue a "Bill of Supply" instead of a tax invoice and cannot collect GST.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "var(--text-primary)" }}>GST Invoice Format for Freelancers and Small Businesses</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Whether you are a freelance designer, developer, or a small shop owner, this tool automatically generates the perfect GST bill format. It calculates totals, subtracts discounts, and breaks down the taxes. If you only know the final total price and need to extract the base amount for the invoice, you can use our <Link href="/gst-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>Reverse GST Calculator</Link> first.
          </p>

        </div>

        {/* FAQ SECTION */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "24px", color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel" style={{ padding: "24px", borderRadius: "16px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>{faq.question}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <TaxDisclaimer />

      </article>

      <SchemaScript schema={generateFAQSchema(faqs)} />
      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools GST Invoice Generator",
        url: "https://karotools.in/invoice-generator",
        description: "Create professional GST-compliant invoices instantly with auto-calculated CGST, SGST, and IGST. Download as PDF."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Invoice Generator", url: "https://karotools.in/invoice-generator" }
      ])} />
    </div>
  );
}
