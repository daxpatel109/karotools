import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";
import SalaryVsFreelanceCalculator from "../../SalaryVsFreelanceCalculator";

export const metadata = { title: "Free Salary vs Freelance Rate Calculator – KaroTools", description: "Compare salary to freelance rates. Calculate the exact hourly, daily, and monthly rate needed as an Indian freelancer to maintain your lifestyle.", alternates: { canonical: "https://karotools.in/salary-vs-freelance" }  };

export default function Page() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <SalaryVsFreelanceCalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the Salary vs Freelance Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools Salary vs Freelance Calculator helps professionals in India compare their full-time CTC with equivalent freelance rates. It calculates the premium needed to cover self-employment taxes, lost benefits (like PF and health insurance), and unpaid time off. Try our <Link href="/freelance-rate-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>Freelance Rate Calculator</Link> to build custom rates from scratch.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Adjusted Freelance Target = CTC + Value of Benefits + Tax Differential</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Equivalent Hourly Rate = Adjusted Freelance Target / Billable Hours</p>
          </div>
        </div>
      </div>

      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools Salary vs Freelance Calculator",
        url: "https://karotools.in/salary-vs-freelance",
        description: "Compare your full-time salary with equivalent freelance rates in India. Calculates the premium needed to cover taxes and lost benefits."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Salary vs Freelance Calculator", url: "https://karotools.in/salary-vs-freelance" }
      ])} />
    </div>
  );
}
