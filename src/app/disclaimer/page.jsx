import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { AlertTriangle, Info, BookText, ShieldX } from "lucide-react";

export const metadata = { 
  title: "Disclaimer | KaroTools", 
  description: "Legal and tax disclaimer for KaroTools. Our tools are for educational purposes only.", 
  alternates: { canonical: "https://karotools.in/disclaimer" }  
};

export default function DisclaimerPage() {
  return (
    <>
      <TrustPageLayout
        title="Legal & Tax Disclaimer"
        subtitle="Important notice regarding the use of our calculators and content."
        lastUpdated="February 2026"
      >
        <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
          <p className="text-yellow-200 text-lg leading-relaxed m-0 font-medium">
            Please read this disclaimer carefully before using any tool, calculator, or guide on KaroTools.
          </p>
        </div>

        <TrustSectionCard title="1. Not a Tax or Legal Advisor" icon={ShieldX}>
          <p>
            KaroTools is a software utility platform, not a Chartered Accountancy firm, law firm, or professional tax advisor. The creators and maintainers of KaroTools do not provide personalized tax, legal, or financial advice.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="2. Educational Purposes Only" icon={BookText}>
          <p>
            All calculators, generators, guides, and blog posts on this website are provided for informational and educational purposes only. They are designed to help you estimate your tax liability based on simplified, standard scenarios.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="3. Verify with Official Sources" icon={Info}>
          <p>
            Tax laws in India (Income Tax Act, 1961, CGST Act, 2017) are complex and subject to frequent amendments. You must always verify the outputs of our tools with the official government portals (e.g., incometaxindia.gov.in, gst.gov.in) before filing returns or making payments.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="4. No Liability" icon={AlertTriangle}>
          <p>
            KaroTools and its maintainers shall not be held liable for any penalties, financial losses, legal actions, or damages resulting from decisions made based on the information or calculations provided on this website. Use the tools at your own risk.
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
