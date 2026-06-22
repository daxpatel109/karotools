import GSTCalculator from "../../GSTCalculator";
import TaxDisclaimer from "../../components/article/TaxDisclaimer";
import { generateMetadata } from "../../lib/seo";
import { generateFAQSchema, SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Reverse GST Calculator India: How to Remove GST from Price",
  description: "Learn how to remove GST from a price or calculate GST inclusive price. Free reverse GST calculator India for 18%, 12%, and 5% tax slabs.",
  path: "/gst-calculator",
  keywords: [
    "how to remove gst from price",
    "how to calculate gst inclusive price",
    "reverse GST calculation",
    "GST inclusive price formula",
    "GST exclusive price formula",
    "remove 18% GST from total amount",
    "GST calculator India"
  ]
});

export default function Page() {
  const faqs = [
    {
      question: "How do I remove GST from a price?",
      answer: "To remove GST from a total price, divide the total amount by (1 + GST Percentage). For example, to remove 18% GST, divide the total amount by 1.18. This gives you the original base price before tax."
    },
    {
      question: "How do I calculate GST inclusive price?",
      answer: "To calculate a GST inclusive price, multiply the base price by (1 + GST Percentage). For example, a ₹1,000 item with 18% GST becomes ₹1,000 × 1.18 = ₹1,180."
    },
    {
      question: "What is reverse GST calculation?",
      answer: "Reverse GST calculation is the process of finding the original base amount and the exact tax amount when you only know the final total price that already includes GST."
    },
    {
      question: "How do I remove 18% GST from ₹1,180?",
      answer: "Using the reverse GST formula: Base Amount = 1180 / 1.18 = ₹1,000. The GST amount removed is ₹180."
    },
    {
      question: "Is reverse GST different for CGST/SGST and IGST?",
      answer: "The total reverse GST amount is the same. However, for intra-state sales, the removed GST amount is split evenly between CGST and SGST. For inter-state sales, the entire removed amount is classified as IGST."
    },
    {
      question: "Can I use KaroTools GST Calculator for reverse GST?",
      answer: "Yes! Simply toggle our GST Calculator India tool to 'Inclusive', enter the final amount, and it will instantly perform a reverse GST calculation for you."
    }
  ];

  return (
    <div style={{ background: "#020617", minHeight: "100vh" }}>
      {/* The Interactive Calculator (Client Component) */}
      <GSTCalculator />

      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f1f5f9", marginBottom: "16px" }}>How does the GST Calculator work?</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools GST Calculator helps you add GST to a base amount or remove GST from an inclusive price using the selected Indian GST rate. To add GST, it calculates the GST amount and adds it to the base amount. To remove GST, it calculates the base amount first and separates the GST amount. Read our <Link href="/guides/gst-for-freelancers-india" style={{ color: "#38bdf8", textDecoration: "none" }}>GST Guide for Freelancers</Link> for more details.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "#e2e8f0", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Base Amount = Gross Price × 100 / (100 + GST Rate)</p>
            <p style={{ color: "#e2e8f0", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>GST Amount = Gross Price - Base Amount</p>
            <p style={{ color: "#e2e8f0", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Final Price = Base Amount + GST Amount</p>
          </div>
        </div>
      </div>

      {/* SEO Content & Guide (Server Component) */}
      <article style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px 100px", color: "#f8fafc", fontFamily: "'DM Sans', sans-serif", position: "relative", zIndex: 1 }}>
        
        <div className="glass-panel" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "40px", marginBottom: "40px" }}>
          
          <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>How to Remove GST from Price</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Often, you might know the final price of a product or service, but you need to figure out exactly how much of that price is tax. Whether you are generating a bill using a <Link href="/guides/gst-invoice-format-excel" style={{ color: "#38bdf8", textDecoration: "none" }}>GST invoice format in Excel</Link> or using our <Link href="/invoice-generator" style={{ color: "#38bdf8", textDecoration: "none" }}>Free Invoice Generator</Link>, you must list the exact base amount and the tax amount separately.
          </p>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            This process is called <strong>reverse GST calculation</strong>. It allows you to find the exact tax component hidden within a final price tag.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>Reverse GST Calculation Formula</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            If the total price already includes GST, you can find the original base amount using the <strong>GST inclusive price formula</strong>:
          </p>
          
          <div style={{ background: "rgba(56, 189, 248, 0.05)", borderLeft: "4px solid #38bdf8", padding: "20px", borderRadius: "0 12px 12px 0", marginBottom: "24px" }}>
            <p style={{ color: "#e2e8f0", fontSize: "16px", fontWeight: "600", marginBottom: "8px", fontFamily: "monospace" }}>
              Base Amount = Total Amount × 100 / (100 + GST Rate)
            </p>
            <p style={{ color: "#e2e8f0", fontSize: "16px", fontWeight: "600", fontFamily: "monospace" }}>
              GST Amount = Total Amount - Base Amount
            </p>
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>Example: Remove 18% GST from ₹1,180</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            Let's say a client pays you ₹1,180 total for freelance services. To legally bill them, you need to <strong>remove 18% GST from the total amount</strong>:
          </p>
          <ul style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px", paddingLeft: "20px" }}>
            <li><strong>Base Amount</strong> = ₹1,180 × 100 / (100 + 18)</li>
            <li><strong>Base Amount</strong> = ₹1,180 × 100 / 118 = <strong>₹1,000</strong></li>
            <li><strong>GST Amount</strong> = ₹1,180 - ₹1,000 = <strong>₹180</strong></li>
          </ul>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>GST Inclusive vs GST Exclusive Price</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Understanding the difference is critical before <Link href="/blog/how-to-register-gst-online" style={{ color: "#38bdf8", textDecoration: "none" }}>registering for GST</Link>:
          </p>
          <ul style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px", paddingLeft: "20px" }}>
            <li><strong>GST Inclusive:</strong> The final price the customer pays (Base + Tax). Use the reverse formula above to find the tax.</li>
            <li><strong>GST Exclusive:</strong> The raw base price. To find the final price, you use the <strong>GST exclusive price formula</strong>: <code style={{ color: "#f8fafc", background: "#1e293b", padding: "2px 6px", borderRadius: "4px" }}>Total = Base Amount × (1 + GST%)</code>.</li>
          </ul>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>CGST/SGST vs IGST in Reverse GST</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Once you extract the GST amount, you must categorize it based on your buyer's location. If the sale is within your state (intra-state), divide the extracted tax equally into CGST and SGST. If the sale is to another state (inter-state), the entire amount is booked as IGST. Note: Businesses under the <Link href="/blog/gst-composition-scheme-limits" style={{ color: "#38bdf8", textDecoration: "none" }}>GST Composition Scheme</Link> cannot collect tax, so these formulas do not apply to their customer bills.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>When Should You Use Reverse GST?</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            You should use a <strong>GST calculator India</strong> to do reverse calculations when:
            <br/><br/>
            1. You are running a retail shop and quote final MRPs to customers.<br/>
            2. You agreed on a fixed net payout with a freelance client and need to back-calculate your base fee for the invoice.<br/>
            3. You are filing returns and need to verify tax amounts to avoid a <Link href="/late-gst-penalty-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>Late GST Penalty</Link>.
          </p>

        </div>

        {/* FAQ SECTION */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "24px", color: "#f8fafc" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel" style={{ padding: "24px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9", marginBottom: "12px" }}>{faq.question}</h3>
                <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <TaxDisclaimer />

      </article>

      <SchemaScript schema={generateFAQSchema(faqs)} />
      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools GST Calculator",
        url: "https://karotools.in/gst-calculator",
        description: "Free online GST calculator for India. Add or remove GST from prices instantly with CGST/SGST/IGST breakdown."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "GST Calculator", url: "https://karotools.in/gst-calculator" }
      ])} />
    </div>
  );
}
