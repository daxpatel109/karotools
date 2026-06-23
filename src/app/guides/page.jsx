import Link from 'next/link';
import { getMdxPages } from '../../lib/mdx';
import { generateMetadata } from '../../lib/seo';
import { SchemaScript, generateBreadcrumbSchema } from '../../lib/schema';

export const metadata = generateMetadata({
  title: 'Free Business & Tax Guides for Indian Freelancers | KaroTools',
  description: 'Practical guides on GST registration, composition schemes, invoicing, and tax compliance for freelancers and small businesses in India.',
  path: '/guides',
  keywords: [
    "free GST guides for Indian freelancers",
    "GST invoice format Excel free",
    "GST calculator India",
    "GST invoice generator free",
    "business tools for freelancers India",
    "tax tools for Indian freelancers",
    "how to calculate GST inclusive price",
    "how to remove GST from price"
  ]
});

export default function GuidesIndex() {
  const posts = getMdxPages('guides').sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>
      <style>{`
        .article-card { transition: transform 0.2s, background 0.2s; background: rgba(255,255,255,0.02); }
        .article-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.04); }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(16,185,129, 0.05) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 24px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", background: "rgba(255, 255, 255, 0.02)", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", backdropFilter: "blur(24px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", flexShrink: 0 }}>
            <Link href="/blog" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>Blog</Link>
            <Link href="/" style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#cbd5e1", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Home</Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 100px", position: "relative", zIndex: 1 }}>
        <header style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 48px)", fontWeight: "800", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}>Free Business Guides for Indian Freelancers</h1>
          <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Step-by-step tutorials to master your taxes, compliance, and invoicing.
          </p>
        </header>

        <div style={{ background: "rgba(0,118,255,0.05)", border: "1px solid rgba(0,118,255,0.2)", borderRadius: "16px", padding: "32px", textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "20px", color: "#fff", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Need a quick answer?</h2>
          <p style={{ color: "#94a3b8", marginBottom: "24px" }}>Use our interactive tools to calculate taxes or generate an invoice instantly.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/gst-calculator" style={{ background: "#0076ff", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>GST Calculator</Link>
            <Link href="/invoice-generator" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>Invoice Generator</Link>
          </div>
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "32px", color: "#f8fafc", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>GST Guides</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {posts.map(post => (
            <Link href={post.path} key={post.slug} style={{ textDecoration: "none" }}>
              <article className="article-card" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                  <span style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 10px", borderRadius: "20px" }}>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f1f5f9", marginBottom: "12px", lineHeight: "1.4", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{post.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", flexGrow: 1 }}>{post.description}</p>
        </article>

            </Link>
          ))}
        </div>
      </main>
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Guides", url: "https://karotools.in/guides" }
      ])} />
    </div>
  );
}
