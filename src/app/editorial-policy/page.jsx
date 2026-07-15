import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import Link from "next/link";
import { BookOpen, CheckCircle, RefreshCw, Cpu, ShieldAlert } from "lucide-react";

export const metadata = { 
  title: "KaroTools Editorial Policy for Tax & Finance Guides", 
  description: "Read the editorial and fact-checking policy of KaroTools. We prioritize accuracy and official sources.", 
  alternates: { canonical: "https://karotools.in/editorial-policy" }  
};

export default function EditorialPolicyPage() {
  return (
    <>
      <TrustPageLayout
        title="Editorial Policy"
        subtitle="Our commitment to accuracy, objective information, and strict adherence to official sources."
        lastUpdated="July 2026"
      >
        <TrustSectionCard title="1. Source-First Content Strategy" icon={BookOpen}>
          <p style={{ marginBottom: "16px" }}>
            Every calculator, guide, and blog post on KaroTools is built with a strictly "source-first" approach. We do not invent rules, assume tax brackets, or interpret grey areas of financial law to make our tools look better. We strictly rely on explicit guidelines published by the Income Tax Department, the Goods and Services Tax (GST) Portal, and the Central Board of Indirect Taxes and Customs (CBIC).
          </p>
          <p>
            When writing guides about complex topics—such as navigating Section 44ADA or understanding GST registration thresholds—we prioritize clarity over sensationalism. You will not find clickbait titles guaranteeing "100% tax savings" or "secret loopholes" here. We focus solely on educational, factual compliance information.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="2. Fact-Checking & Review Process" icon={CheckCircle}>
          <p style={{ marginBottom: "16px" }}>
            Before any new tool or calculator is published to the live site, it undergoes internal testing against real-world scenarios and official government tax calculators (where those are available for cross-referencing). 
          </p>
          <p style={{ marginBottom: "16px" }}>
            We are fully transparent about our credentials: KaroTools is maintained by a software developer (Dax Patel), not a panel of Chartered Accountants or legal experts. We do not claim that our calculators have been "CA reviewed" or "Government Approved." 
          </p>
          <p>
            Instead, we rely on translating publicly available mathematical formulas directly into code. You can learn exactly how we do this by reading our <Link href="/methodology" style={{ color: "#38bdf8", textDecoration: "underline" }}>Methodology</Link> page.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="3. Regular Updates and Corrections" icon={RefreshCw}>
          <p style={{ marginBottom: "16px" }}>
            Financial regulations are never static. We systematically update our content annually (typically immediately following the Union Budget) and periodically throughout the year as new major GST notifications arise. 
          </p>
          <p>
            If a calculation error or outdated reference is identified, we prioritize fixing it. We encourage users to verify our tools, and if you spot an inconsistency, you can report it directly to <a href="mailto:daxpatel093@gmail.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>daxpatel093@gmail.com</a>. Verified corrections are deployed as quickly as technically possible.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="4. Transparent Use of AI Tools" icon={Cpu}>
          <p style={{ marginBottom: "16px" }}>
            In the modern era of software development, AI tools may be used to assist in writing boilerplate code, formatting JSON schemas, checking spelling, or structuring HTML layouts. 
          </p>
          <p>
            However, our policy is absolute: <strong>no financial advice, tax rule, legal claim, or calculator logic is generated autonomously by AI</strong> without strict human verification against an official source. Human oversight is mandatory for any compliance-related content. For a list of our verified sources, see our <Link href="/sources" style={{ color: "#38bdf8", textDecoration: "underline" }}>Sources</Link> page.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="5. No Financial or Tax Advice" icon={ShieldAlert}>
          <p style={{ marginBottom: "16px" }}>
            KaroTools exists to make estimations easier, but we do not provide personalized financial, investment, or tax advice. Because every freelancer's situation involves unique variables—like previous investments under 80C, capital gains from other sources, or state-specific professional taxes—generalized tools can only go so far.
          </p>
          <p>
            We urge all users to use our output for preliminary budgeting only. Please review our full <Link href="/disclaimer" className="text-[#38bdf8] hover:underline">Disclaimer</Link> to understand your responsibilities as a user, and always verify your final numbers with a qualified professional before filing. You can also read more <Link href="/about" className="text-[#38bdf8] hover:underline">About KaroTools</Link> and our mission.
          </p>
        </TrustSectionCard>
      </TrustPageLayout>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Editorial Policy", url: "https://karotools.in/editorial-policy"}])} />
    </>
  );
}
