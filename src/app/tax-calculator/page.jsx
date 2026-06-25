import TaxCalculator from "../../TaxCalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema, generateFAQSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = { title: "Best Income Tax Calculators For FY 2026-27 – KaroTools", description: "Choose the right tax calculator for your freelance business. Section 44ADA (Presumptive), Normal Regime (>75L), or Advance Tax liability.", alternates: { canonical: "https://karotools.in/tax-calculator" }  };

export default function Page() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <TaxCalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the Income Tax Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools Tax Calculator Hub helps Indian freelancers find their exact tax liability for FY 2026-27. It automatically applies the New Tax Regime slabs and calculates Section 87A rebates. If you are eligible, it allows you to compute presumptive tax under Section 44ADA. See our <Link href="/guides/section-44ada-vs-normal" style={{ color: "#38bdf8", textDecoration: "none" }}>Section 44ADA Guide</Link> for detailed comparisons.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px", marginBottom: "32px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>44ADA Taxable Income = Gross Receipts × 50%</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Normal Taxable Income = Gross Receipts - Actual Expenses</p>
          </div>
          
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "24px", marginTop: "32px" }}>Frequently Asked Questions</h2>

          <h3 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>What is the difference between Old and New Tax Regimes?</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
            Under the Old Tax Regime, you can claim deductions like 80C (up to ₹1.5L for LIC, PPF, ELSS), 80D (Health Insurance), and HRA. The New Tax Regime offers lower tax rates but does not allow most of these deductions. For FY 2026-27, the New Tax Regime is the default, and it provides a full tax rebate for income up to ₹7,00,000 under Section 87A. For most freelancers without significant investments, the new regime is highly beneficial.
          </p>

          <h3 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does Section 44ADA benefit freelancers?</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
            Section 44ADA of the Income Tax Act allows specific professionals (like software developers, consultants, and designers) to declare exactly 50% of their gross receipts as profit, without needing to maintain detailed books of accounts or expense proofs. This is a massive compliance relief and often results in lower tax liability. However, it is only applicable if your total gross receipts in the financial year are under ₹75 Lakhs.
          </p>

          <h3 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>When should I pay Advance Tax?</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
            If your total estimated tax liability for the year exceeds ₹10,000 after adjusting for TDS, you are required to pay Advance Tax in four installments (June, September, December, and March). Failing to pay advance tax leads to a 1% per month penalty under sections 234B and 234C. Our tax calculator helps you estimate your final liability so you can plan your advance tax payments accordingly.
          </p>
        </div>
      </div>

      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools Income Tax Calculators",
        url: "https://karotools.in/tax-calculator",
        description: "Income tax calculator hub for Indian freelancers. Compute tax liability for FY 2026-27 under Normal Regime or Section 44ADA."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Tax Calculator Hub", url: "https://karotools.in/tax-calculator" }
      ])} />
      <SchemaScript schema={generateFAQSchema([
        { question: "What is the difference between Old and New Tax Regimes?", answer: "Under the Old Tax Regime, you can claim deductions like 80C, 80D, and HRA. The New Tax Regime offers lower tax rates but does not allow most deductions. For FY 2026-27, the New Tax Regime is the default and provides a full tax rebate for income up to ₹7,00,000 under Section 87A." },
        { question: "How does Section 44ADA benefit freelancers?", answer: "Section 44ADA allows specific professionals to declare exactly 50% of their gross receipts as profit without maintaining detailed books. This is a massive compliance relief if gross receipts are under ₹75 Lakhs." },
        { question: "When should I pay Advance Tax?", answer: "If your total estimated tax liability exceeds ₹10,000 after TDS, you must pay Advance Tax in four installments (June, September, December, March) to avoid 1% monthly penalty." }
      ])} />
    </div>
  );
}
