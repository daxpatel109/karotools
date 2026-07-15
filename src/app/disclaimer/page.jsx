import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { AlertTriangle, Info, BookText, ShieldX } from "lucide-react";

export const metadata = { 
  title: "KaroTools Disclaimer for Tax & Finance Calculators", 
  description: "Legal and tax disclaimer for KaroTools. Our tools are for educational purposes only.", 
  alternates: { canonical: "https://karotools.in/disclaimer" }  
};

export default function DisclaimerPage() {
  return (
    <>
      <TrustPageLayout
        title="Legal & Tax Disclaimer"
        subtitle="Important notice regarding the use of our calculators and content."
        lastUpdated="July 2026"
      >
        <div style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", borderRadius: "16px", padding: "24px", marginBottom: "32px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <AlertTriangle style={{ width: "32px", height: "32px", color: "#eab308", flexShrink: 0, marginTop: "4px" }} />
          <p style={{ color: "#fef08a", fontSize: "18px", lineHeight: "1.7", margin: 0, fontWeight: "500" }}>
            Please read this disclaimer carefully before using any tool, calculator, or guide on KaroTools.
          </p>
        </div>

        <TrustSectionCard title="1. Not a Tax or Legal Advisor" icon={ShieldX}>
          <p style={{ marginBottom: "16px" }}>
            KaroTools is a software utility platform, not a Chartered Accountancy firm, law firm, or professional tax advisor. The creators and maintainers of KaroTools do not provide personalized tax, legal, or financial advice under any circumstances.
          </p>
          <p>
            Any communication with the maintainer (Dax Patel), whether through email, social media, or support channels, should be treated strictly as technical or software support. It does not constitute a client-advisor relationship. You can read more about the creator on our <Link href="/about" className="text-[#38bdf8] hover:underline">About</Link> page.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="2. Educational Purposes Only" icon={BookText}>
          <p style={{ marginBottom: "16px" }}>
            All calculators, generators, guides, and blog posts on this website are provided for informational and educational purposes only. They are designed to help you estimate your tax liability based on simplified, standard scenarios.
          </p>
          <p>
            While our tools (such as the GST Calculator or 44ADA Calculator) use mathematical models derived from current tax brackets, they cannot possibly account for every nuance of your specific financial situation. Deductions, previous year carry-forward losses, late filing penalties, and state-level professional taxes can drastically alter your final tax obligation.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="3. Verify with Official Sources" icon={Info}>
          <p style={{ marginBottom: "16px" }}>
            Tax laws in India (including the Income Tax Act of 1961 and the CGST Act of 2017) are complex and subject to frequent amendments, notifications, and interpretations by tax tribunals.
          </p>
          <p style={{ marginBottom: "16px" }}>
            You must always verify the outputs of our tools with the official government portals before filing returns, issuing legally binding invoices to clients, or making advance tax payments. 
          </p>
          <p>
            We maintain a list of the portals we use to build our logic on our <Link href="/sources" className="text-[#38bdf8] hover:underline">Sources</Link> page. Please read our <Link href="/methodology" className="text-[#38bdf8] hover:underline">Methodology</Link> to understand exactly how our calculators process this data.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="4. Limitation of Liability" icon={AlertTriangle}>
          <p style={{ marginBottom: "16px" }}>
            KaroTools and its maintainer (Dax Patel) shall not be held liable for any penalties, financial losses, legal actions, or damages resulting from decisions made based on the information, estimates, or documents (such as PDF invoices) generated on this website.
          </p>
          <p>
            Use these tools at your own risk. By using this website, you explicitly agree that you are solely responsible for your own tax compliance, filings, and financial well-being.
          </p>
        </TrustSectionCard>

        <p className="text-center text-[var(--text-secondary)] italic mt-12">
          By using KaroTools, you acknowledge that you have read, understood, and agreed to this disclaimer.
        </p>
      </TrustPageLayout>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Disclaimer", url: "https://karotools.in/disclaimer"}])} />
    </>
  );
}
