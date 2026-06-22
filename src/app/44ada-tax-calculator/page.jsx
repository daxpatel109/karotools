import Section44ADACalculator from "../../Section44ADACalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = { title: "Best Free 44ADA Tax Calculator FY 2026-27 – KaroTools", description: "Calculate your estimated income tax under Section 44ADA (Presumptive Taxation) for Indian freelancers using the New Tax Regime." };

export default function Page() {
  return (
    <div style={{ background: "#020617", minHeight: "100vh" }}>
      <Section44ADACalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f1f5f9", marginBottom: "16px" }}>How does the 44ADA Tax Calculator work?</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools 44ADA Calculator helps Indian freelancers compute their tax liability under the Presumptive Taxation Scheme for FY 2026-27. It assumes 50% of your gross receipts as taxable profit, applies the latest tax slabs, and factors in the Section 87A rebate. Read our <Link href="/guides/section-44ada-vs-normal" style={{ color: "#38bdf8", textDecoration: "none" }}>Section 44ADA Guide</Link> for more details.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "#e2e8f0", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Taxable Income = Gross Receipts × 50%</p>
            <p style={{ color: "#e2e8f0", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Final Tax = Tax on Slabs + 4% Health & Education Cess</p>
          </div>
        </div>
      </div>

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
