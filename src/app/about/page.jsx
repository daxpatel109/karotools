import { SchemaScript, generateOrganizationSchema, generateBreadcrumbSchema } from "../../lib/schema";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { User, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

export const metadata = { 
  title: "About Us | KaroTools", 
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
          <p>
            The Indian freelancing economy is growing rapidly, but navigating the complexities of GST, TDS, and Income Tax (like Section 44ADA) remains incredibly confusing. Most existing calculators are cluttered with ads, require account sign-ups, or lack mobile-friendly designs.
          </p>
          <p>
            We built KaroTools to solve this. Zero logins. Absolute privacy. Fast, accurate calculations based on publicly available information.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="Who Maintains KaroTools?" icon={User}>
          <p>
            KaroTools is maintained by Dax Patel and a small team dedicated to building high-quality utility software. While we strive to make our tools highly accurate and up-to-date, we are software developers and researchers—not Chartered Accountants (CAs) or legal advisors.
          </p>
          <p>
            All tools and calculators are rigorously reviewed internally based on the latest guidelines from the Income Tax Department and GST Portal.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="Our Commitment & Disclaimer" icon={ShieldCheck}>
          <p>
            <strong>Commitment to Accuracy:</strong> We regularly monitor the Union Budget and GST Council meetings to keep our formulas updated. You can read more on our <Link href="/methodology" className="text-[#38bdf8] hover:underline">Methodology page</Link>.
          </p>
          <div style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", borderRadius: "12px", padding: "20px", marginTop: "24px" }}>
            <strong style={{ color: "#eab308", display: "block", marginBottom: "8px" }}>Disclaimer:</strong> 
            <span style={{ color: "#fef08a" }}>KaroTools is for educational purposes only. Our tools provide estimations based on publicly available information. Users must verify with official government sources or consult a qualified tax professional for personal advice.</span>
          </div>
        </TrustSectionCard>
      </TrustPageLayout>
      <SchemaScript schema={generateOrganizationSchema()} />
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "About Us", url: "https://karotools.in/about"}])} />
    </>
  );
}
