import Link from 'next/link';
import { getMdxPages } from '../../lib/mdx';
import { generateMetadata } from '../../lib/seo';
import { SchemaScript, generateBreadcrumbSchema } from '../../lib/schema';

export const metadata = generateMetadata({
  title: 'KaroTools Blog | Tax & Business Guides for Indian Freelancers',
  description: 'Read the latest guides on GST registration, composition schemes, invoicing, and tax compliance for freelancers and small businesses in India.',
  path: '/blog',
  keywords: [
    "GST guide India",
    "GST registration online India",
    "GST composition scheme limit 2026",
    "GST return filing due date 2026",
    "GST late fee calculator India",
    "IGST vs CGST explained India",
    "GST for freelancers India",
    "GST registration threshold small business",
    "GST invoice mandatory fields India"
  ]
});

export default function BlogIndex() {
  const posts = getMdxPages('blog');

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>
      <style>{`
        .article-card { transition: transform 0.2s, background 0.2s; background: rgba(255,255,255,0.02); }
        .article-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.04); }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,118,255, 0.05) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255, 255, 255, 0.02)", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", backdropFilter: "blur(24px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/guides" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center" }}>All Guides</Link>
            <Link href="/" style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#cbd5e1", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Home</Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 100px", position: "relative", zIndex: 1 }}>
        <header style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: "800", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}>KaroTools Blog</h1>
          <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            GST, tax, invoicing, freelancer and small business guides for India.
          </p>
          <div style={{ marginTop: "32px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/gst-calculator" style={{ background: "rgba(0,118,255,0.1)", border: "1px solid rgba(0,118,255,0.3)", color: "#38bdf8", padding: "10px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST Calculator</Link>
            <Link href="/invoice-generator" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", padding: "10px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Invoice Generator</Link>
          </div>
        </header>

        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "32px", color: "#f8fafc", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Featured Articles</h2>
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
                <div style={{ marginTop: "20px", fontSize: "12px", color: "#64748b" }}>
                  Last updated: {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </article>
            </Link>
          ))}
          {posts.length === 0 && (
            <p style={{ color: "#64748b" }}>No articles published yet.</p>
          )}
        </div>
      </main>
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Blog", url: "https://karotools.in/blog" }
      ])} />
    </div>
  );
}
