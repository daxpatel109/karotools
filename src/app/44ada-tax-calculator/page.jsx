import Section44ADACalculator from "../../Section44ADACalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema, generateFAQSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = { title: "Best Free 44ADA Tax Calculator FY 2026-27 – KaroTools", description: "Calculate your estimated income tax under Section 44ADA (Presumptive Taxation) for Indian freelancers using the New Tax Regime.", alternates: { canonical: "https://karotools.in/44ada-tax-calculator" }  };

export default function Page() {
  const faqs = [
    {
      question: "How to calculate 44ADA tax for freelancers?",
      answer: "To calculate 44ADA tax for freelancers, you only need to declare 50% of your total gross receipts as your taxable business income. For example, if you earn ₹10 Lakhs, only ₹5 Lakhs is taxable. Then, you apply the normal income tax slab rates to that 50% amount to find your final tax liability."
    },
    {
      question: "Which ITR form should a freelancer file in India, ITR-3 or ITR-4?",
      answer: "A freelancer in India should file ITR-4 (Sugam) if they are opting for the presumptive taxation scheme under Section 44ADA, which allows them to declare 50% of income as profit. If a freelancer chooses to declare their actual profits (which may be lower than 50%) and maintain detailed books of accounts, they must file ITR-3."
    }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Section44ADACalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        
        {/* Related Guides / Tools CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "8px" }}>Section 44ADA Guide</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Read our complete guide comparing normal taxation with presumptive taxation.</p>
            <Link href="/guides/section-44ada-vs-normal" style={{ color: "#38bdf8", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>Read the Guide →</Link>
          </div>
          <div style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#a78bfa", marginBottom: "8px" }}>General Tax Calculator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Use our advanced tax calculator to compare regimes and check advance tax.</p>
            <Link href="/tax-calculator" style={{ color: "#a78bfa", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>Open Tax Calculator →</Link>
          </div>
        </div>

        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the 44ADA Tax Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            Compute tax under Section 44ADA for FY 2026-27. It assumes 50% profit, applies the latest slabs, and factors Section 87A. Read our <Link href="/guides/section-44ada-vs-normal" style={{ color: "#38bdf8", textDecoration: "none" }}>44ADA Guide</Link>.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Taxable Income = Gross Receipts × 50%</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Final Tax = Tax on Slabs + 4% Health & Education Cess</p>
          </div>
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

      </div>

      <SchemaScript schema={generateFAQSchema(faqs)} />
      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools 44ADA Tax Calculator",
        url: "https://karotools.in/44ada-tax-calculator",
        description: "Calculate your estimated income tax under Section 44ADA (Presumptive Taxation) for Indian freelancers using the New Tax Regime."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "44ADA Tax Calculator", url: "https://karotools.in/44ada-tax-calculator" }
      ])} />
    </div>
  );
}
