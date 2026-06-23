import AdvanceTaxCalculator from "../../AdvanceTaxCalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = { title: "Free Advance Tax Calculator FY 2026-27 – KaroTools", description: "Calculate your Advance Tax installments and due dates for FY 2026-27. Free calculator for Indian freelancers, businesses, and professionals." };

export default function Page() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <AdvanceTaxCalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the Advance Tax Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools Advance Tax Calculator helps you determine your quarterly tax installments for FY 2026-27. It automatically calculates your total tax liability, subtracts any TDS, and divides the remaining amount into 15%, 45%, 75%, and 100% milestones based on government deadlines. Read our <Link href="/blog/advance-tax-for-freelancers-india" style={{ color: "#38bdf8", textDecoration: "none" }}>Advance Tax Guide</Link> for more details.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Net Tax Payable = Total Tax - TDS Deducted</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Q1 Installment = Net Tax Payable × 15%</p>
          </div>
        </div>
      </div>

      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools Advance Tax Calculator",
        url: "https://karotools.in/advance-tax-calculator",
        description: "Calculate your quarterly advance tax installments and due dates for FY 2026-27."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Advance Tax Calculator", url: "https://karotools.in/advance-tax-calculator" }
      ])} />
    </div>
  );
}
