import { SchemaScript, generateOrganizationSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { ShieldCheck, User } from "lucide-react";

export const metadata = { 
  title: "About Us | KaroTools", 
  description: "KaroTools is built to help Indian freelancers, consultants, and small businesses access free tax, GST, invoice, and business tools.", 
  alternates: { canonical: "https://karotools.in/about" }  
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-['DM_Sans']">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#818cf8]">
          About KaroTools
        </h1>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl mx-auto">
          KaroTools is built to help Indian freelancers, consultants, creators, agencies, and small businesses access free tax, GST, invoice, and business tools.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-12">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4">Why We Built This</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            The Indian freelancing economy is growing rapidly, but navigating the complexities of GST, TDS, and Income Tax (like Section 44ADA) remains incredibly confusing. Most existing calculators are cluttered with ads, require account sign-ups, or lack mobile-friendly designs.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            We built KaroTools to solve this. Zero logins. Absolute privacy. Fast, accurate calculations based on publicly available information.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-[#38bdf8]" /> Who Maintains KaroTools?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            KaroTools is maintained by Dax Patel and a small team dedicated to building high-quality utility software. While we strive to make our tools highly accurate and up-to-date, we are software developers and researchers—not Chartered Accountants (CAs) or legal advisors. 
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            All tools and calculators are rigorously reviewed internally based on the latest guidelines from the Income Tax Department and GST Portal.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-dashed border-[#38bdf8] bg-[#38bdf8] bg-opacity-5">
          <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#38bdf8]" /> Our Commitment & Disclaimer
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            <strong>Commitment to Accuracy:</strong> We regularly monitor the Union Budget and GST Council meetings to keep our formulas updated. You can read more on our <Link href="/methodology" className="text-[#38bdf8] hover:underline">Methodology page</Link>.
          </p>
          <p className="text-yellow-200 leading-relaxed text-sm p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-xl mt-6">
            <strong>Disclaimer:</strong> KaroTools is for educational purposes only. Our tools provide estimations based on publicly available information. Users must verify with official government sources or consult a qualified tax professional for personal advice.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Link href="/editorial-policy" className="glass-panel px-6 py-3 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-colors text-sm">
            Editorial Policy
          </Link>
          <Link href="/sources" className="glass-panel px-6 py-3 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-colors text-sm">
            Official Sources
          </Link>
          <Link href="/disclaimer" className="glass-panel px-6 py-3 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-colors text-sm">
            Full Disclaimer
          </Link>
        </div>
      </div>

      <SchemaScript schema={generateOrganizationSchema()} />
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "About Us", url: "https://karotools.in/about"}])} />
    </div>
  );
}
