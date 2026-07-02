import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import Navbar from "../../components/Navbar";

export const metadata = { 
  title: "Disclaimer | KaroTools", 
  description: "Legal and tax disclaimer for KaroTools. Our tools are for educational purposes only.", 
  alternates: { canonical: "https://karotools.in/disclaimer" }  
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-['DM_Sans']">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#818cf8] text-center">
          Legal & Tax Disclaimer
        </h1>
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] mt-12 space-y-6">
          <p className="text-xl font-bold text-yellow-400 mb-6">Important Notice: Please read carefully.</p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <strong>1. Not a Tax or Legal Advisor:</strong> KaroTools is a software utility platform, not a Chartered Accountancy firm, law firm, or professional tax advisor. The creators and maintainers of KaroTools do not provide personalized tax, legal, or financial advice.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <strong>2. Educational Purposes Only:</strong> All calculators, generators, guides, and blog posts on this website are provided for informational and educational purposes only. They are designed to help you estimate your tax liability based on simplified, standard scenarios.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <strong>3. Verify with Official Sources:</strong> Tax laws in India (Income Tax Act, 1961, CGST Act, 2017) are complex and subject to frequent amendments. You must always verify the outputs of our tools with the official government portals (e.g., incometaxindia.gov.in, gst.gov.in) before filing returns or making payments.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <strong>4. No Liability:</strong> KaroTools and its maintainers shall not be held liable for any penalties, financial losses, legal actions, or damages resulting from decisions made based on the information or calculations provided on this website. Use the tools at your own risk.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            By using KaroTools, you acknowledge that you have read, understood, and agreed to this disclaimer.
          </p>
        </div>
      </div>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Disclaimer", url: "https://karotools.in/disclaimer"}])} />
    </div>
  );
}
