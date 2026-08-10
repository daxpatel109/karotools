import AdvanceTaxCalculator from "../../AdvanceTaxCalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = { title: "Free Advance Tax Calculator FY 2026-27 – KaroTools", description: "Calculate your Advance Tax installments and due dates for FY 2026-27. Free calculator for Indian freelancers, businesses, and professionals.", alternates: { canonical: "https://karotools.in/advance-tax-calculator" }  };

export default function Page() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <AdvanceTaxCalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "20px" }}>How is Advance Tax Calculated?</h2>
          
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Advance tax operates on the principle of "pay as you earn." Instead of paying your entire tax liability at the end of the financial year, the Income Tax Department requires you to pay it in cumulative milestones throughout the year. Our calculator estimates your total annual tax liability, subtracts any TDS (Tax Deducted at Source) or TCS (Tax Collected at Source) that has already been paid on your behalf, and breaks down the remaining balance.
          </p>

          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>Who Needs to Pay Advance Tax?</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            Under Section 208 of the Income Tax Act, any individual, freelancer, professional, or business whose estimated tax liability for the financial year is <strong>₹10,000 or more</strong> (after deducting TDS/TCS) must pay advance tax. Senior citizens (aged 60 or above) who do not have income from a business or profession are exempt from this rule.
          </p>
          
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>The Cumulative Payment Schedule (Milestones)</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            Advance tax must be paid in four installments before the financial year ends. These are cumulative targets, meaning each percentage represents the total portion of your estimated annual tax that must be deposited by that date:
          </p>
          <div style={{ overflowX: "auto", marginBottom: "32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "var(--text-secondary)", fontSize: "16px", textAlign: "left", border: "1px solid var(--glass-border)", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--glass-border)" }}>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Milestone Deadline</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Cumulative Payment Required</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)" }}>June 15</td>
                  <td style={{ padding: "12px 16px" }}>15% of total estimated advance tax</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)" }}>September 15</td>
                  <td style={{ padding: "12px 16px" }}>45% of total estimated advance tax (less previous)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)" }}>December 15</td>
                  <td style={{ padding: "12px 16px" }}>75% of total estimated advance tax (less previous)</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)" }}>March 15</td>
                  <td style={{ padding: "12px 16px" }}>100% of total estimated advance tax (less previous)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", padding: "16px", borderRadius: "12px", marginBottom: "32px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "15px", margin: "0 0 8px 0" }}><strong>Note for Presumptive Taxation (Section 44AD / 44ADA):</strong></p>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: "0" }}>If you opt for the presumptive taxation scheme, you do not need to follow the four-installment schedule. Instead, you can pay <strong>100% of your advance tax by March 15</strong> in a single installment.</p>
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>What Happens If Payments Are Delayed?</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            Missing a deadline or paying less than the required percentage attracts penal interest under <strong>Section 234C</strong> (for deferred payment of advance tax) and <strong>Section 234B</strong> (for default in payment by the end of the year). The interest is generally charged at 1% per month or part of a month on the shortfall amount.
          </p>

          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>Assumptions & Methodology</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, paddingLeft: "20px", marginBottom: "32px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Calculation:</strong> Calculates net tax payable by subtracting TDS from total tax liability.</li>
            <li style={{ marginBottom: "8px" }}><strong>Milestones:</strong> Applies standard cumulative milestones (15%, 45%, 75%, 100%) for normal taxpayers.</li>
            <li style={{ marginBottom: "8px" }}><strong>Limitations:</strong> Does not calculate penal interest under Sections 234B/234C. It assumes the total estimated tax is accurate for the full year.</li>
            <li style={{ marginBottom: "8px" }}><strong>Sources:</strong> Rules and milestone dates are based on provisions of the Income Tax Act, 1961, as published by the <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>Income Tax Department of India</a>.</li>
          </ul>

          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "0" }}>
            For a deeper dive into filing and avoiding penalties, check out our comprehensive guide on <Link href="/blog/advance-tax-for-freelancers-india" style={{ color: "#38bdf8", textDecoration: "none" }}>Advance Tax for Freelancers</Link>. Ensure you never miss a deadline by checking our <Link href="/tools/tax-calendar-india-2026" style={{ color: "#f43f5e", textDecoration: "none" }}>Freelancer Tax Calendar 2026</Link>.
          </p>
        </div>
      </div>

      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools Advance Tax Calculator",
        url: "https://karotools.in/advance-tax-calculator",
        description: "Calculate your quarterly advance tax installments and due dates for FY 2026-27.",
        dateModified: "2026-08-10"
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Advance Tax Calculator", url: "https://karotools.in/advance-tax-calculator" }
      ])} />
    </div>
  );
}
