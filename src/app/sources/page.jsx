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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {sources.map((source, idx) => {
            const Icon = source.icon;
            return (
              <div key={idx} className="trust-card" style={{ padding: "32px", borderRadius: "24px", border: "1px solid var(--glass-border)", background: "var(--glass-bg)", display: "flex", flexDirection: "column", height: "100%", boxShadow: "var(--card-shadow)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ padding: "12px", background: "rgba(56,189,248,0.1)", borderRadius: "12px", border: "1px solid rgba(56,189,248,0.2)" }}>
                      <Icon style={{ width: "24px", height: "24px", color: "#38bdf8" }} />
                    </div>
                    <h2 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text-primary)", lineHeight: "1.3" }}>{source.name}</h2>
                  </div>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="trust-link" style={{ color: "var(--text-secondary)", padding: "8px" }} title="Visit Official Website">
                    <ExternalLink style={{ width: "20px", height: "20px" }} />
                  </a>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.7", flexGrow: 1, marginTop: "8px" }}>{source.desc}</p>
              </div>
            );
          })}
        </div>
      </TrustPageLayout>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Official Sources", url: "https://karotools.in/sources"}])} />
    </>
  );
}
