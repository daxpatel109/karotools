import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { ExternalLink, Landmark, Receipt, FileText, Building2 } from "lucide-react";

export const metadata = { 
  title: "Official Sources | KaroTools", 
  description: "View the list of official Indian government portals and resources used to build KaroTools calculators.", 
  alternates: { canonical: "https://karotools.in/sources" }  
};

export default function SourcesPage() {
  const sources = [
    { 
      name: "Income Tax Department of India", 
      url: "https://www.incometax.gov.in/", 
      desc: "Used for Section 44ADA, Advance Tax, and general Income Tax rules.",
      icon: Landmark
    },
    { 
      name: "Goods and Services Tax (GST) Portal", 
      url: "https://www.gst.gov.in/", 
      desc: "Used for GST registration thresholds, HSN/SAC codes, and return deadlines.",
      icon: Receipt
    },
    { 
      name: "Central Board of Indirect Taxes and Customs (CBIC)", 
      url: "https://www.cbic.gov.in/", 
      desc: "Used for GST rate notifications and official indirect tax acts.",
      icon: FileText
    },
    { 
      name: "Ministry of Corporate Affairs (MCA)", 
      url: "https://www.mca.gov.in/", 
      desc: "Used for company compliance and incorporation data where applicable.",
      icon: Building2
    }
  ];

  return (
    <>
      <TrustPageLayout
        title="Official Sources"
        subtitle="We rely on publicly available data from the Government of India. Below are the primary portals we use to verify our calculators and guides."
        lastUpdated="February 2026"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {sources.map((source, idx) => {
            const Icon = source.icon;
            return (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[#38bdf8] transition-colors flex flex-col h-full shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[rgba(56,189,248,0.1)] rounded-xl border border-[rgba(56,189,248,0.2)]">
                      <Icon className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] leading-tight">{source.name}</h2>
                  </div>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[#38bdf8] transition-colors p-2" title="Visit Official Website">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed flex-grow mt-2">{source.desc}</p>
              </div>
            );
          })}
        </div>
      </TrustPageLayout>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Official Sources", url: "https://karotools.in/sources"}])} />
    </>
  );
}
