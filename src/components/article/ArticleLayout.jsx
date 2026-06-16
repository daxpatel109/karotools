import Link from 'next/link';
import TaxDisclaimer from './TaxDisclaimer';
import { SchemaScript, generateArticleSchema } from '../../lib/schema';
import ContentTracker from '../ContentTracker';

export default function ArticleLayout({ children, meta }) {
  const articleSchema = generateArticleSchema({
    title: meta.title,
    description: meta.description,
    url: `https://karotools.in${meta.path}`,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
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
            <h1 style={{ marginBottom: "16px" }}>{meta.title}</h1>
            <p style={{ fontSize: "18px", color: "#94a3b8", marginBottom: "24px" }}>{meta.description}</p>
            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#64748b" }}>
              <span>Last updated: {new Date(meta.dateModified || meta.datePublished).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>
          
          {children}

          <TaxDisclaimer />
        </article>
      </main>
    </div>
  );
}
