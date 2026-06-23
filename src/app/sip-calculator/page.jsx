import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";
import SIPCalculator from "../../SIPCalculator";

export const metadata = { title: "Instant Free SIP Calculator For India – KaroTools", description: "Calculate your Mutual Fund and SIP returns in India. Free compounding calculator showing invested amount vs expected returns over time." };

export default function Page() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <SIPCalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the SIP Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools SIP Calculator helps you forecast the future value of your mutual fund investments. It uses the compound interest formula to calculate wealth accumulation over time based on your monthly investment, expected return rate, and time horizon. Plan your retirement using our <Link href="/fire-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>FIRE Calculator</Link>.
          </p>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>FV = P × [((1 + r)ⁿ - 1) / r] × (1 + r)</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Where P = SIP Amount, r = Monthly Rate of Return, n = Total Months</p>
          </div>
        </div>
      </div>

      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools SIP Calculator",
        url: "https://karotools.in/sip-calculator",
        description: "Calculate mutual fund SIP returns and compound interest growth for investments in India."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "SIP Calculator", url: "https://karotools.in/sip-calculator" }
      ])} />
    </div>
  );
}
