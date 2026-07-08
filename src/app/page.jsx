import Home from "../Home";
import { SchemaScript, generateOrganizationSchema } from "../lib/schema";
import Link from "next/link";

export const metadata = {
  title: "Free Tax, GST & Business Tools for Freelancers – KaroTools",
  description: "KaroTools offers free Indian financial tools like GST calculator, invoice generator, FIRE calculator and more for freelancers and small businesses. No login required.",
  alternates: {
    canonical: "https://karotools.in",
  },
  openGraph: {
    title: "Free Tax, GST & Business Tools for Freelancers – KaroTools",
    description: "KaroTools offers free Indian financial tools like GST calculator, invoice generator, FIRE calculator and more for freelancers and small businesses. No login required.",
    url: "https://karotools.in",
    siteName: "KaroTools",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Home />
      <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", padding: "0 24px 64px 24px", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* AEO Block */}
          <div style={{ background: "var(--card-bg)", backdropFilter: "blur(24px)", border: "1px solid var(--card-border)", borderRadius: "24px", padding: "32px", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>What is KaroTools?</h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
              KaroTools provides free, easy-to-use financial tools for Indian freelancers. Calculate your taxes, GST, and generate professional invoices in seconds without giving away your data.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginBottom: "48px" }}>
            {/* Popular Free Tools */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Popular Free Tools</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/gst-calculator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST Calculator</Link>
                <Link href="/tax-calculator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Income Tax Calculator</Link>
                <Link href="/invoice-generator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST Invoice Generator</Link>
                <Link href="/upwork-fiverr-fee-calculator-india" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Upwork & Fiverr Payout Calculator</Link>
                <Link href="/freelance-rate-calculator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Freelance Rate Calculator</Link>
                <Link href="/fire-calculator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>FIRE Calculator</Link>
                <Link href="/salary-vs-freelance" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Salary vs Freelance Calculator</Link>
                <Link href="/ugc-professor-salary-calculator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>UGC Professor Salary Calculator</Link>
              </div>
            </div>

            {/* GST & Invoice Tools */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>GST & Invoice Tools</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/gst-calculator" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Live GST Calculator</Link>
                <Link href="/invoice-generator" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Free Invoice Generator</Link>
                <Link href="/guides/gst-for-freelancers-india" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST for Freelancers Guide</Link>
                <Link href="/guides/how-to-make-gst-invoice-online-free" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>How to Make GST Invoice Online</Link>
                <Link href="/guides/how-to-register-gst-online" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>How to Register for GST</Link>
                <Link href="/guides/hsn-sac-codes-freelancers" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>HSN & SAC Codes for Freelancers</Link>
              </div>
            </div>

            {/* Freelancer Tax Toolkit */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Freelancer Tax Toolkit</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/44ada-tax-calculator" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Understand Section 44ADA</Link>
                <Link href="/guides/section-44ada-vs-normal" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>44ADA vs Normal Scheme</Link>
                <Link href="/advance-tax-calculator" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Calculate Advance Tax</Link>
                <Link href="/guides/how-to-price-freelance-services" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Price Your Services</Link>
              </div>
            </div>
          </div>

          {/* Why Trust KaroTools Section */}
          <div style={{ background: "var(--card-bg)", backdropFilter: "blur(24px)", border: "1px solid var(--card-border)", borderRadius: "24px", padding: "32px", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Why Trust KaroTools?</h2>
            <ul style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.8", margin: 0, paddingLeft: "20px" }}>
              <li><strong>Free Forever:</strong> Tools for Indian freelancers and small businesses, with absolutely no login required.</li>
              <li><strong>Educational Focus:</strong> Built to help you understand taxes using clear formulas and real-world examples.</li>
              <li><strong>Reliable Data:</strong> Calculations are designed using publicly available information and official sources where applicable.</li>
              <li><strong>Transparent:</strong> Read about our <Link href="/methodology" style={{ color: "#38bdf8", textDecoration: "none" }}>Calculation Methodology</Link> and <Link href="/editorial-policy" style={{ color: "#38bdf8", textDecoration: "none" }}>Editorial Policy</Link>.</li>
            </ul>
          </div>

          {/* Footer & Disclaimer */}
          <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "32px", marginTop: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px", padding: "16px", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "12px", display: "inline-block" }}>
              <strong>Disclaimer:</strong> KaroTools provides educational calculators and tools. Results are estimates and should be verified with official sources or a qualified professional before making financial decisions.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", fontSize: "14px", fontWeight: "500" }}>
              <Link href="/tools" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>All Tools</Link>
              <Link href="/about" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>About</Link>
              <Link href="/methodology" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Methodology</Link>
              <Link href="/sources" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Sources</Link>
              <Link href="/editorial-policy" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Editorial Policy</Link>
              <Link href="/disclaimer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Disclaimer</Link>
              <Link href="/privacy-policy" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Privacy Policy</Link>
              <Link href="/contact" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Contact</Link>
            </div>
          </div>

        </div>
      </div>
      <SchemaScript schema={generateOrganizationSchema()} />
    </>
  );
}
