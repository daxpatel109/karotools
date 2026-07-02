import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { Search, Code, RefreshCcw, AlertTriangle, Bug } from "lucide-react";
import Link from "next/link";

export const metadata = { 
  title: "Calculation Methodology | KaroTools", 
  description: "Learn how KaroTools calculates GST, TDS, and Income Tax for Indian freelancers. Discover our sources and update processes.", 
  alternates: { canonical: "https://karotools.in/methodology" }  
};

export default function MethodologyPage() {
  return (
    <>
      <TrustPageLayout
        title="Calculation Methodology"
        subtitle="Transparency in how we build and maintain our tax and finance tools."
        lastUpdated="February 2026"
      >
        <TrustSectionCard title="1. How Calculators Are Designed" icon={Code}>
          <p>
            Our tools are designed specifically for Indian freelancers, consultants, and small businesses. We reverse-engineer complex tax slabs and compliance requirements into simple, user-friendly inputs. All logic is processed locally on your device for absolute privacy.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="2. Selection of Formulas & Sources" icon={Search}>
          <p>
            We base our formulas strictly on publicly available information published by the Government of India. For example, our 44ADA calculator strictly adheres to the limits defined by the Income Tax Department, while our GST tools use standard CGST, SGST, and IGST rates mandated by the CBIC.
          </p>
          <p>
            You can view the full list of our data sources on our <Link href="/sources" style={{ color: "#38bdf8", textDecoration: "underline" }}>Official Sources page</Link>.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="3. Versioning & Update Process" icon={RefreshCcw}>
          <p>
            Tax rules change frequently. We prominently display a "Last Updated" badge on our tools (e.g., "Updated for FY 2025-26"). Whenever the Union Budget is passed or a new GST notification is issued, our team reviews the changes internally and updates the logic accordingly.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="4. Why Calculations May Differ" icon={AlertTriangle}>
          <p>
            KaroTools provides estimations based on standard scenarios. Your actual tax liability may differ due to specific exemptions, prior year carry-forwards, late fees, or state-specific professional taxes. Our tools are for educational purposes only. Always consult a qualified tax professional before filing.
          </p>
        </TrustSectionCard>

        <TrustSectionCard title="5. Reporting Issues" icon={Bug}>
          <p>
            If you notice an outdated rule or incorrect calculation, please email us at <a href="mailto:daxpatel093@gmail.com" className="text-[#38bdf8] hover:underline">daxpatel093@gmail.com</a>. We correct verified issues as quickly as possible.
          </p>
        </TrustSectionCard>
      </TrustPageLayout>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Methodology", url: "https://karotools.in/methodology"}])} />
    </>
  );
}
