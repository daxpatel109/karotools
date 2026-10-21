import Section44ADACalculator from "../../Section44ADACalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema, generateFAQSchema } from "../../lib/schema";
import Link from "next/link";

import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "44ADA Calculator for Freelancers India | KaroTools",
  description: "Calculate taxable income and estimated tax under Section 44ADA for eligible freelancers and professionals in India.",
  path: "/44ada-tax-calculator"
});

export default function Page() {
  const faqs = [
    {
      question: "How to calculate 44ADA tax for freelancers?",
      answer: "Section 44ADA lets eligible professionals estimate taxable income using presumptive taxation, usually by treating 50% of gross receipts as income where conditions apply."
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
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "8px" }}>Compare Taxation Methods</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Read our complete guide comparing normal taxation with presumptive taxation.</p>
            <Link href="/guides/section-44ada-vs-normal" style={{ color: "#38bdf8", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>compare 44ADA with normal taxation →</Link>
          </div>
          <div style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#a78bfa", marginBottom: "8px" }}>General Tax Calculator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Use our advanced tax calculator to compare regimes and check advance tax.</p>
            <Link href="/tax-calculator" style={{ color: "#a78bfa", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>Open Tax Calculator →</Link>
          </div>
          <div style={{ background: "rgba(236,72,153,0.05)", border: "1px solid rgba(236,72,153,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#ec4899", marginBottom: "8px" }}>44ADA Eligibility</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Learn about the ₹50L/₹75L limits and check if your profession qualifies.</p>
            <Link href="/blog/section-44ada-freelancers" style={{ color: "#ec4899", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>read our guide to Section 44ADA eligibility →</Link>
          </div>
          <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#10b981", marginBottom: "8px" }}>Need ITR-4 Filing Help?</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Consult a certified tax expert or e-file your presumptive return seamlessly.</p>
            <a
              href={process.env.NEXT_PUBLIC_AFFILIATE_TAX_URL || "https://cleartax.in"}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{ color: "#10b981", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}
            >
              Get Assisted Filing Support →
            </a>
          </div>
        </div>

        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the 44ADA Tax Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            Compute tax under Section 44ADA for FY 2026-27. It assumes 50% profit, applies the latest slabs, and factors Section 87A. To understand how this compares to maintaining books of accounts, <Link href="/guides/section-44ada-vs-normal" style={{ color: "#38bdf8", textDecoration: "none" }}>compare 44ADA with normal taxation</Link>.
          </p>
          <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Taxable Income = Gross Receipts × 50%</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Final Tax = Tax on Slabs + 4% Health & Education Cess</p>
          </div>
        </div>

        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>Assumptions & Methodology</h2>
          <ul style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.8, paddingLeft: "20px", marginBottom: "0" }}>
            <li style={{ marginBottom: "8px" }}><strong>Presumptive Rate:</strong> Assumes exactly 50% of gross receipts as taxable income under Section 44ADA.</li>
            <li style={{ marginBottom: "8px" }}><strong>Tax Slabs:</strong> Applies the New Tax Regime slab rates for FY 2026-27 (AY 2027-28) by default, as it is the default regime.</li>
            <li style={{ marginBottom: "8px" }}><strong>Rebates & Cess:</strong> Includes Section 87A rebate and the mandatory 4% Health & Education Cess.</li>
            <li style={{ marginBottom: "8px" }}><strong>Limitations:</strong> This tool is an estimator and assumes you satisfy all eligibility criteria for Section 44ADA. It does not account for other sources of income (like capital gains).</li>
            <li style={{ marginBottom: "0" }}><strong>Sources:</strong> Rules and limits are based on the Income Tax Act, 1961, as published by the <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>Income Tax Department</a>.</li>
          </ul>
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
        description: "Calculate your estimated income tax under Section 44ADA (Presumptive Taxation) for Indian freelancers using the New Tax Regime.",
        dateModified: "2026-08-10"
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "44ADA Tax Calculator", url: "https://karotools.in/44ada-tax-calculator" }
      ])} />
    </div>
  );
}
