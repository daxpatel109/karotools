import { SchemaScript, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";
import TrustPageLayout, { TrustSectionCard } from "../../components/TrustPageLayout";
import { ExternalLink, Landmark, Receipt, FileText, Building2 } from "lucide-react";

export const metadata = { 
  title: "Official Sources Used by KaroTools Calculators", 
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
        subtitle="We strictly rely on publicly available data from the Government of India."
        lastUpdated="July 2026"
      >
        <div style={{ marginBottom: "40px", fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.8" }}>
          <p style={{ marginBottom: "16px" }}>
            At KaroTools, we believe that financial tools should be built on transparent, verifiable data. Our calculators do not invent rules, guess tax slabs, or use arbitrary percentages. Every mathematical formula running under the hood is directly derived from official documentation published by the Government of India.
          </p>
          <p>
            Whether you are calculating presumptive income under Section 44ADA, checking a GST rate for an invoice, or estimating advance tax, the underlying logic is sourced from the portals listed below. We encourage you to visit these official sites to verify any information and stay updated on the latest compliance requirements.
          </p>
        </div>
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

        <div style={{ marginTop: "48px", background: "rgba(56,189,248,0.05)", padding: "32px", borderRadius: "16px", border: "1px solid rgba(56,189,248,0.2)", fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.8" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Our Relationship with these Sources</h3>
          <p style={{ marginBottom: "16px" }}>
            KaroTools is an independent, privately maintained utility platform. We are <strong>not affiliated with, endorsed by, or connected to</strong> the Income Tax Department, the Ministry of Finance, the CBIC, the MCA, or any other government entity.
          </p>
          <p style={{ marginBottom: "16px" }}>
            We simply read the publicly available acts, notifications, and circulars provided on these websites and build user-friendly interfaces (like our GST or Tax calculators) around them to make life easier for freelancers and small business owners.
          </p>
          <p style={{ marginBottom: 0 }}>
            Because tax rules are subject to frequent amendments, notifications, and interpretations, we cannot guarantee 100% real-time accuracy. Always cross-check the final numbers on the official e-filing portals before submitting your returns. For more details on how we process this data, please read our <Link href="/methodology" style={{ color: "#38bdf8", textDecoration: "underline" }}>Methodology</Link> and our full <Link href="/disclaimer" style={{ color: "#38bdf8", textDecoration: "underline" }}>Disclaimer</Link>.
          </p>
        </div>
      </TrustPageLayout>
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Official Sources", url: "https://karotools.in/sources"}])} />
    </>
  );
}
