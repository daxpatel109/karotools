import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export const metadata = { 
  title: "Calculation Methodology | KaroTools", 
  description: "Learn how KaroTools calculates GST, TDS, and Income Tax for Indian freelancers. Discover our sources and update processes.", 
  alternates: { canonical: "https://karotools.in/methodology" }  
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-['DM_Sans']">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#818cf8] text-center">
          Calculation Methodology
        </h1>
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 text-[#38bdf8]">1. How Calculators Are Designed</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our tools are designed specifically for Indian freelancers, consultants, and small businesses. We reverse-engineer complex tax slabs and compliance requirements into simple, user-friendly inputs. All logic is processed locally on your device for absolute privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 text-[#38bdf8]">2. Selection of Formulas & Official Sources</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We base our formulas strictly on publicly available information published by the Government of India. For example, our 44ADA calculator strictly adheres to the limits defined by the Income Tax Department, while our GST tools use standard CGST, SGST, and IGST rates mandated by the CBIC.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You can view the full list of our data sources on our <Link href="/sources" className="text-[#38bdf8] hover:underline">Official Sources page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 text-[#38bdf8]">3. Versioning & Update Process</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Tax rules change frequently. We prominently display a "Last Updated" badge on our tools (e.g., "Updated for FY 2025-26"). Whenever the Union Budget is passed or a new GST notification is issued, our team reviews the changes internally and updates the logic accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 text-[#38bdf8]">4. Why Calculations May Differ</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              KaroTools provides estimations based on standard scenarios. Your actual tax liability may differ due to specific exemptions, prior year carry-forwards, late fees, or state-specific professional taxes. Our tools are for educational purposes only. Always consult a qualified tax professional before filing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 text-[#38bdf8]">5. Reporting Issues</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              If you notice an outdated rule or incorrect calculation, please email us at <a href="mailto:daxpatel093@gmail.com" className="text-[#38bdf8] hover:underline">daxpatel093@gmail.com</a>. We correct verified issues as quickly as possible.
            </p>
          </section>
        </div>
      </div>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Methodology", url: "https://karotools.in/methodology"}])} />
    </div>
  );
}
