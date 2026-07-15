import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { Search, Code, RefreshCcw, AlertTriangle, Bug } from "lucide-react";
import Link from "next/link";

export const metadata = { 
  title: "KaroTools Calculator Methodology & Source Process", 
  description: "Learn how KaroTools calculates GST, TDS, and Income Tax for Indian freelancers. Discover our sources and update processes.", 
  alternates: { canonical: "https://karotools.in/methodology" }  
};

export default function MethodologyPage() {
  return (
    <>
      <TrustPageLayout
        title="Calculation Methodology & Process"
        subtitle="Transparency in how we build and maintain our tax and finance tools."
        lastUpdated="July 2026"
      >
        <TrustSectionCard title="1. How Calculators Are Designed" icon={Code}>
          <p style={{ marginBottom: "16px" }}>
            Our tools are designed specifically for Indian freelancers, consultants, and small businesses. We take complex tax slabs, exemptions, and compliance requirements and translate them into simple, user-friendly computational models. 
          </p>
          <p style={{ marginBottom: "16px" }}>
            Every calculation runs locally on your device within your web browser. This means that sensitive financial data—such as your gross receipts or expected tax liability—is never transmitted to a backend server or saved in an external database. We prioritize privacy by design.
          </p>
          <p>
            The formulas behind these calculators use hardcoded logic based on the most recent tax brackets. For example, our tools default to the New Tax Regime where applicable, as it is the default regime for current financial years, while providing educational comparisons against older tax structures.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="2. Selection of Formulas & Sources" icon={Search}>
          <p style={{ marginBottom: "16px" }}>
            We base our mathematical formulas strictly on publicly available information published by the Government of India. We do not invent rules or tax brackets. 
          </p>
          <p style={{ marginBottom: "16px" }}>
            For example, our presumptive taxation calculators (like the 44ADA calculator) strictly adhere to the 50% profit margin estimation limit and the ₹75 Lakh gross receipt threshold defined by the Income Tax Department. Similarly, our GST invoice tools use standard CGST, SGST, and IGST rate logic as mandated by the Central Board of Indirect Taxes and Customs (CBIC).
          </p>
          <p>
            To understand exactly where our data originates from, please review the complete list of references on our <Link href="/sources" style={{ color: "#38bdf8", textDecoration: "underline" }}>Official Sources</Link> page. Our <Link href="/editorial-policy" style={{ color: "#38bdf8", textDecoration: "underline" }}>Editorial Policy</Link> also governs how we choose to display this data.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="3. Versioning & Update Process" icon={RefreshCcw}>
          <p style={{ marginBottom: "16px" }}>
            Tax rules and compliance deadlines change frequently in India. To maintain utility, we prominently display a "Last Updated" badge on our tools (for instance, noting that a tool is "Updated for FY 2026-27").
          </p>
          <p>
            Whenever the annual Union Budget is passed or a major new GST notification is officially issued, the maintainer reviews the changes. The underlying codebase is then updated to reflect the new slab rates, surcharge limits, or cess percentages. This process ensures that the fundamental logic reflects current, publicly available guidelines rather than outdated historical data.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="4. Why Calculations May Differ" icon={AlertTriangle}>
          <p style={{ marginBottom: "16px" }}>
            KaroTools provides generalized estimations based on standard tax scenarios. We do not claim 100% accuracy for individual cases. Your actual final tax liability may differ significantly from our calculator's output due to several factors.
          </p>
          <p style={{ marginBottom: "16px" }}>
            These factors include specific industry exemptions, prior year carry-forward losses, delayed payment interest, late filing penalties, state-specific professional taxes, and complex investments that our simplified models do not account for.
          </p>
          <p>
            Because of these inherent limitations, our tools are provided for educational and preliminary budgeting purposes only. Always consult a qualified Chartered Accountant (CA) or tax professional before making final financial decisions or filing your actual income tax returns. Read our full <Link href="/disclaimer" style={{ color: "#38bdf8", textDecoration: "underline" }}>Disclaimer</Link> for more information.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="5. Reporting Issues & Corrections" icon={Bug}>
          <p style={{ marginBottom: "16px" }}>
            While we conduct rigorous internal reviews, software bugs or outdated references can occasionally occur. If you notice an outdated rule, a broken link to a source, or an incorrect calculation step, we encourage user feedback.
          </p>
          <p>
            Please email us at <a href="mailto:daxpatel093@gmail.com" className="text-[#38bdf8] hover:underline">daxpatel093@gmail.com</a>. Verified issues are documented and the codebase is updated as quickly as possible to ensure the tools remain a helpful resource for the freelance community. You can also learn more about the creator on our <Link href="/about" style={{ color: "#38bdf8", textDecoration: "underline" }}>About</Link> page.
          </p>
        </TrustSectionCard>
      </TrustPageLayout>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Methodology", url: "https://karotools.in/methodology"}])} />
    </>
  );
}
