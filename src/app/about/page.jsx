import { SchemaScript, generateOrganizationSchema, generateBreadcrumbSchema } from "../../lib/schema";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { User, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

export const metadata = { 
  title: "About KaroTools — Free Tools for Indian Freelancers", 
  description: "KaroTools is built to help Indian freelancers, consultants, and small businesses access free tax, GST, invoice, and business tools.", 
  alternates: { canonical: "https://karotools.in/about" }  
};

export default function AboutPage() {
  return (
    <>
      <TrustPageLayout
        title="About KaroTools"
        subtitle="KaroTools is built to help Indian freelancers, consultants, creators, agencies, and small businesses access free tax, GST, invoice, and business tools."
        lastUpdated="July 2026"
      >
        <TrustSectionCard title="Why We Built This" icon={Heart}>
          <p style={{ marginBottom: "16px" }}>
            The Indian freelancing economy is growing rapidly, but navigating the complexities of GST, TDS, and Income Tax (like Section 44ADA) remains incredibly confusing. Most existing calculators are cluttered with ads, require account sign-ups, or lack mobile-friendly designs.
          </p>
          <p style={{ marginBottom: "16px" }}>
            We built KaroTools to solve this. Zero logins. Absolute privacy. Fast, accurate calculations based on publicly available information. Our goal is to provide a unified platform where Indian freelancers can quickly estimate their tax liability, generate compliance-ready invoices, and calculate their true hourly rates without relying on clunky spreadsheets.
          </p>
          <p>
            Whether you are a software developer working for international clients or a local consultant managing Indian clients, these tools are designed to streamline your administrative workflow so you can focus on your actual work.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="Who Maintains KaroTools?" icon={User}>
          <p style={{ marginBottom: "16px" }}>
            KaroTools is maintained by Dax Patel. While every effort is made to keep the tools highly accurate and up-to-date with current government guidelines, Dax is a software developer and researcher—not a Chartered Accountant (CA) or a legal advisor.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The calculators are built by translating official documentation, tax slabs, and legal rules into code. All tools are rigorously reviewed against the latest guidelines from the Income Tax Department and GST Portal.
          </p>
          <p>
            Because tax laws are nuanced and constantly evolving, these calculators serve as an educational starting point. To learn exactly how these formulas are derived, please read the <Link href="/methodology" className="text-[#38bdf8] hover:underline">Methodology</Link> and the <Link href="/sources" className="text-[#38bdf8] hover:underline">Sources</Link> pages.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="Our Commitment & Disclaimer" icon={ShieldCheck}>
          <p style={{ marginBottom: "16px" }}>
            <strong>Commitment to Transparency:</strong> We regularly monitor the Union Budget and GST Council meetings to keep our formulas updated. Our <Link href="/editorial-policy" className="text-[#38bdf8] hover:underline">Editorial Policy</Link> ensures that all guides and calculations remain objective, factual, and free from misleading marketing.
          </p>
          <p style={{ marginBottom: "16px" }}>
            We do not claim 100% accuracy because individual tax situations often involve unique exemptions, deductions, and state-specific laws that a generalized calculator cannot fully capture.
          </p>
          <div style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", borderRadius: "12px", padding: "20px", marginTop: "24px" }}>
            <strong style={{ color: "#eab308", display: "block", marginBottom: "8px" }}>Disclaimer:</strong> 
            <span style={{ color: "#fef08a", display: "block", marginBottom: "8px" }}>KaroTools is for educational purposes only. Our tools provide estimations based on publicly available information and are not a substitute for professional financial advice.</span>
            <span style={{ color: "#fef08a" }}>Users must verify all figures with official government sources or consult a qualified professional. For full terms, read our <Link href="/disclaimer" className="text-[#eab308] hover:underline">Disclaimer</Link>.</span>
          </div>
        </TrustSectionCard>
      </TrustPageLayout>
      <SchemaScript schema={generateOrganizationSchema()} />
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "About Us", url: "https://karotools.in/about"}])} />
    </>
  );
}
