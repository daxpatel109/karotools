import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import Navbar from "../../components/Navbar";
import { ExternalLink } from "lucide-react";

export const metadata = { 
  title: "Official Sources | KaroTools", 
  description: "View the list of official Indian government portals and resources used to build KaroTools calculators.", 
  alternates: { canonical: "https://karotools.in/sources" }  
};

export default function SourcesPage() {
  const sources = [
    { name: "Income Tax Department of India", url: "https://www.incometax.gov.in/", desc: "Used for Section 44ADA, Advance Tax, and general Income Tax rules." },
    { name: "Goods and Services Tax (GST) Portal", url: "https://www.gst.gov.in/", desc: "Used for GST registration thresholds, HSN/SAC codes, and return deadlines." },
    { name: "Central Board of Indirect Taxes and Customs (CBIC)", url: "https://www.cbic.gov.in/", desc: "Used for GST rate notifications and official indirect tax acts." },
    { name: "Ministry of Corporate Affairs (MCA)", url: "https://www.mca.gov.in/", desc: "Used for company compliance and incorporation data where applicable." }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-['DM_Sans']">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#818cf8] text-center">
          Official Sources
        </h1>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12">
          We rely on publicly available data from the Government of India. Below are the primary portals we use to verify our calculators and guides.
        </p>
        <div className="grid gap-6">
          {sources.map((source, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[#38bdf8] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">{source.name}</h2>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:text-white transition-colors" title="Visit Official Website">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <p className="text-[var(--text-secondary)] m-0">{source.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Official Sources", url: "https://karotools.in/sources"}])} />
    </div>
  );
}
