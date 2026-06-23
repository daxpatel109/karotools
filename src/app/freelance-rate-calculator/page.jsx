import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";
import RateCalculator from "../../RateCalculator";

export const metadata = {
  title: "Freelance Rate Calculator India | KaroTools",
  description: "Find your ideal freelance hourly, daily or monthly rate in INR based on expenses, income goals and billable hours.",
  alternates: {
    canonical: "https://karotools.in/freelance-rate-calculator",
  },
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <RateCalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the Freelance Rate Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools Freelance Rate Calculator helps Indian freelancers calculate the exact hourly or daily rate they need to charge to hit their annual income goals. It factors in your personal expenses, business costs, desired profit margin, and total billable hours. Compare your results using our <Link href="/salary-vs-freelance" style={{ color: "#38bdf8", textDecoration: "none" }}>Salary vs Freelance Calculator</Link>.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Total Target Income = Personal Expenses + Business Costs + Desired Profit</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Hourly Rate = Total Target Income / Total Billable Hours</p>
          </div>
        </div>
      </div>

      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools Freelance Rate Calculator",
        url: "https://karotools.in/freelance-rate-calculator",
        description: "Calculate your optimal freelance hourly and daily rates based on expenses, taxes, and billable hours."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Freelance Rate Calculator", url: "https://karotools.in/freelance-rate-calculator" }
      ])} />
    </div>
  );
}
