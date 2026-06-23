import Link from 'next/link';
import TaxDisclaimer from './TaxDisclaimer';
import { SchemaScript, generateArticleSchema, generateBreadcrumbSchema } from '../../lib/schema';
import ContentTracker from '../ContentTracker';
import { formatSafeDateLong } from '../../lib/dateUtils';

export default function ArticleLayout({ children, meta = {} }) {
  const authorName = meta.author || "Dax Patel";
  
  const dateString = meta.dateModified || meta.datePublished;
  const displayDate = formatSafeDateLong(dateString);

  const isGuide = meta.path?.startsWith('/guides');
  const sectionName = isGuide ? "Guides" : "Blog";
  const sectionPath = isGuide ? "/guides" : "/blog";
  
  const breadcrumbItems = [
    { name: "Home", url: "https://karotools.in/" },
    { name: sectionName, url: `https://karotools.in${sectionPath}` },
    { name: meta.title, url: `https://karotools.in${meta.path}` }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  
  const articleSchema = generateArticleSchema({
    title: meta.title,
    description: meta.description,
    url: `https://karotools.in${meta.path}`,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    authorName: authorName
  });

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", selectionColor: "#fff", selectionBackground: "#0076ff" }}>
      <ContentTracker />
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(0,118,255, 0.4); color: white; }
        ::-moz-selection { background: rgba(0,118,255, 0.4); color: white; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .interactive-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .interactive-btn:hover {
          transform: translateY(-2px);
        }

        .home-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #cbd5e1;
          text-decoration: none;
        }
        .home-btn:hover {
          background: rgba(0,118,255, 0.15);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }

        /* MDX content styles */
        .mdx-content h1 { font-size: clamp(32px, 5vw, 48px); font-weight: 800; margin-bottom: 24px; color: #f8fafc; line-height: 1.1; font-family: 'Plus Jakarta Sans', sans-serif; }
        .mdx-content h2 { font-size: 28px; font-weight: 700; margin-top: 48px; margin-bottom: 24px; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; }
        .mdx-content h3 { font-size: 20px; font-weight: 600; margin-top: 32px; margin-bottom: 16px; color: #38bdf8; font-family: 'Plus Jakarta Sans', sans-serif; }
        .mdx-content p { color: #cbd5e1; line-height: 1.8; margin-bottom: 20px; font-size: 16px; }
        .mdx-content ul, .mdx-content ol { color: #cbd5e1; line-height: 1.8; margin-bottom: 20px; padding-left: 24px; }
        .mdx-content li { margin-bottom: 8px; }
        .mdx-content a { color: #38bdf8; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
        .mdx-content a:hover { border-bottom-color: #38bdf8; }
        .mdx-content strong { color: #f8fafc; font-weight: 600; }
        .mdx-content table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .mdx-content th, .mdx-content td { padding: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: left; }
        .mdx-content th { background: rgba(255,255,255,0.05); color: #f8fafc; font-weight: 600; }
      `}} />

      <SchemaScript schema={articleSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {meta.schemas && meta.schemas.map((schema, i) => (
        <SchemaScript key={i} schema={schema} />
      ))}

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,118,255, 0.05) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "40%", right: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(16,185,129, 0.03) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <Link href="/" className="interactive-btn home-btn" style={{ padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            ← Home
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>
        <article className="mdx-content">
          <header style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ marginBottom: "24px", fontSize: "14px", color: "#64748b", display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
              <span>›</span>
              <Link href={sectionPath} style={{ color: "#94a3b8", textDecoration: "none" }}>{sectionName}</Link>
              <span>›</span>
              <span style={{ color: "#cbd5e1" }}>{meta.title}</span>
            </div>
            <h1 style={{ marginBottom: "16px" }}>{meta.title}</h1>
            <p style={{ fontSize: "18px", color: "#94a3b8", marginBottom: "24px" }}>{meta.description}</p>
            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#64748b", alignItems: "center", flexWrap: "wrap" }}>
              <span>📅 {displayDate}</span>
              {meta.author === "Dax Patel" ? (
                <span>✍️ By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
              ) : (
                <span>✍️ By {authorName}</span>
              )}
            </div>
          </header>
          
          {children}

          <TaxDisclaimer />
          
          <div className="glass-panel" style={{ marginTop: "48px", padding: "32px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "250px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", margin: "0 0 8px 0" }}>Written by: {authorName}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                  Dax Patel creates practical GST, invoice, tax, and business tools for Indian freelancers, consultants, small businesses, and agencies through KaroTools.
                </p>
                <div style={{ display: "flex", gap: "16px", fontSize: "14px" }}>
                  <Link href="/about" style={{ color: "#38bdf8", textDecoration: "none" }}>About Us</Link>
                  <Link href="/contact" style={{ color: "#38bdf8", textDecoration: "none" }}>Contact Support</Link>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: "250px", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "24px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#cbd5e1", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Accuracy Note</h4>
                <p style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.6", margin: "0 0 12px 0" }}>
                  This guide is written for educational purposes and is updated periodically. GST and Income Tax rules may change. Please verify with the official GST portal, Income Tax portal, CBIC notifications, or your CA before filing.
                </p>
                <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                  Last updated: {displayDate}
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: "48px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginBottom: "24px" }}>Related Guides & Tools</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
              <Link href="/gst-calculator" className="interactive-btn glass-panel" style={{ padding: "20px", borderRadius: "12px", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🧮</span>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Calculator</strong>
                <span style={{ color: "#94a3b8", fontSize: "14px" }}>Calculate inclusive/exclusive GST.</span>
              </Link>
              <Link href="/invoice-generator" className="interactive-btn glass-panel" style={{ padding: "20px", borderRadius: "12px", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>📄</span>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Invoice Generator</strong>
                <span style={{ color: "#94a3b8", fontSize: "14px" }}>Create compliant GST invoices online.</span>
              </Link>
              <Link href="/blog/gst-registration-threshold" className="interactive-btn glass-panel" style={{ padding: "20px", borderRadius: "12px", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🏛️</span>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Registration Rules</strong>
                <span style={{ color: "#94a3b8", fontSize: "14px" }}>Do you need GST registration?</span>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
