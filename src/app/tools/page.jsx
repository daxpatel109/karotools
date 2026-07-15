import { generateOrganizationSchema, generateBreadcrumbSchema, SchemaScript } from "../../lib/schema";
import Link from "next/link";
import { Wrench } from "lucide-react";

export const metadata = {
  title: "All Free Tools for Indian Freelancers – KaroTools",
  description: "Browse all free financial tools by KaroTools, including GST calculators, invoice generators, freelance rate calculators, and FIRE calculators.",
  alternates: {
    canonical: "https://karotools.in/tools",
  },
};

export default function ToolsPage() {
  return (
    <>
      <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
        
        {/* Header Section */}
        <div style={{ 
          padding: "64px 24px", 
          background: "var(--card-bg)", 
          borderBottom: "1px solid var(--card-border)",
          textAlign: "center"
        }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "16px", background: "rgba(56,189,248,0.1)", color: "#38bdf8", marginBottom: "24px" }}>
              <Wrench size={28} />
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 40px)", fontWeight: "800", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}>
              Free Business Tools for Indian Freelancers
            </h1>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "24px" }}>
              Access our complete suite of free financial tools built specifically for Indian freelancers and small businesses. No login required, ever.
            </p>
            
            <div style={{ textAlign: "left", background: "rgba(255,255,255,0.03)", padding: "24px", borderRadius: "16px", border: "1px solid var(--glass-border)", fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
              <p style={{ marginBottom: "16px" }}>
                Managing freelance finances in India requires more than just a basic calculator. Whether you are dealing with GST compliance, figuring out presumptive taxation under Section 44ADA, or simply trying to price your next big client project, having the right tools can save you hours of administrative work.
              </p>
              <p style={{ marginBottom: "16px" }}>
                This hub contains all of KaroTools' calculators and generators designed for everyday freelance workflows. You can use our <strong>GST tools</strong> to calculate exclusive/inclusive rates and instantly generate professional PDF invoices. Our <strong>tax calculators</strong> help you estimate your tax liability and compare regimes, while our <strong>freelance pricing tools</strong> (like the Rate Calculator and Platform Fee Calculator) ensure you maintain your target take-home pay after platform cuts and currency conversion.
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Disclaimer:</strong> KaroTools provides educational estimates based on publicly available information. While we strive to keep our formulas updated, these tools do not constitute professional financial or tax advice. Please review our <Link href="/methodology" style={{ color: "#38bdf8", textDecoration: "none" }}>Methodology</Link>, <Link href="/sources" style={{ color: "#38bdf8", textDecoration: "none" }}>Sources</Link>, and <Link href="/disclaimer" style={{ color: "#38bdf8", textDecoration: "none" }}>Disclaimer</Link>, and always consult a qualified Chartered Accountant before making financial decisions or filing returns.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "24px" }}>
              
              {/* Tool Card: GST Calculator */}
              <Link href="/gst-calculator" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "20px", 
                  padding: "32px",
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer"
                }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#38bdf8", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Live GST Calculator</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                    Calculate exclusive and inclusive GST instantly. Get accurate IGST, CGST, and SGST breakdowns for your invoices.
                  </p>
                </div>
              </Link>

              {/* Tool Card: Invoice Generator */}
              <Link href="/invoice-generator" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "20px", 
                  padding: "32px",
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer"
                }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#10b981", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Free Invoice Generator</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                    Generate professional PDF invoices with GST calculations built-in. No watermarks and perfectly formatted for Indian businesses.
                  </p>
                </div>
              </Link>

              {/* Tool Card: Freelance Rate Calculator */}
              <Link href="/freelance-rate-calculator" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "20px", 
                  padding: "32px",
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer"
                }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#f59e0b", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Freelance Rate Calculator</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                    Determine your ideal hourly or project rate based on your target annual income, expenses, and billable hours.
                  </p>
                </div>
              </Link>

              {/* Tool Card: 44ADA Calculator */}
              <Link href="/44ada-tax-calculator" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "20px", 
                  padding: "32px",
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer"
                }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#8b5cf6", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Section 44ADA Tax Calculator</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                    Calculate your presumptive taxation benefits under Section 44ADA for professionals in India.
                  </p>
                </div>
              </Link>

              {/* Tool Card: Upwork Fee Calculator */}
              <Link href="/upwork-fiverr-fee-calculator-india" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "20px", 
                  padding: "32px",
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer"
                }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#ec4899", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Upwork/Fiverr Fee Calculator</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                    Calculate your exact take-home pay in INR after platform fees, currency conversion, and withdrawal charges.
                  </p>
                </div>
              </Link>

              {/* Tool Card: FIRE Calculator */}
              <Link href="/fire-calculator" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "20px", 
                  padding: "32px",
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer"
                }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#14b8a6", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>FIRE Calculator (India)</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                    Financial Independence, Retire Early. Calculate exactly how much corpus you need to retire in India based on your expenses.
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
      <SchemaScript schema={generateOrganizationSchema()} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Tools", url: "https://karotools.in/tools" }
      ])} />
    </>
  );
}
