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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {/* Popular Free Tools */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Popular Free Tools</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/gst-calculator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST Calculator</Link>
                <Link href="/tax-calculator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Income Tax Calculator</Link>
                <Link href="/invoice-generator" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST Invoice Generator</Link>
                <Link href="/upwork-fiverr-fee-calculator-india" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Upwork & Fiverr Payout Calculator</Link>
                <Link href="/salary-vs-freelance" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Salary vs Freelance Calculator</Link>
              </div>
            </div>

            {/* Guides for Indian Freelancers */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Guides for Indian Freelancers</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/guides/gst-for-freelancers-india" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST for Freelancers Guide</Link>
                <Link href="/guides/section-44ada-vs-normal" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Section 44ADA vs Normal Tax</Link>
                <Link href="/guides/how-to-price-freelance-services" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>How to Price Freelance Services</Link>
                <Link href="/guides/proforma-invoice-guide" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Proforma Invoice Guide</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <SchemaScript schema={generateOrganizationSchema()} />
    </>
  );
}
