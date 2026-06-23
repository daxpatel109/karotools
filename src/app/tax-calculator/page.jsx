import TaxCalculator from "../../TaxCalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = { title: "Best Income Tax Calculators For FY 2026-27 – KaroTools", description: "Choose the right tax calculator for your freelance business. Section 44ADA (Presumptive), Normal Regime (>75L), or Advance Tax liability." };

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
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>44ADA Taxable Income = Gross Receipts × 50%</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Normal Taxable Income = Gross Receipts - Actual Expenses</p>
          </div>
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
    </div>
  );
}
