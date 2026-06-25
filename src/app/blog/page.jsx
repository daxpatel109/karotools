import Link from 'next/link';
import { getMdxPages } from '../../lib/mdx';
import { generateMetadata } from '../../lib/seo';
import { SchemaScript, generateBreadcrumbSchema } from '../../lib/schema';
import { formatSafeDate } from '../../lib/dateUtils';

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
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)" }}>
      <style>{`
        .article-card { transition: transform 0.2s, background 0.2s; background: var(--glass-bg); }
        .article-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.04); }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,118,255, 0.05) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 24px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", background: "rgba(255, 255, 255, 0.02)", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", backdropFilter: "blur(24px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", flexShrink: 0 }}>
            <Link href="/guides" style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>All Guides</Link>
            <Link href="/" style={{ padding: "8px 16px", borderRadius: "8px", background: "var(--glass-bg)", border: "1px solid var(--border-color)", color: "var(--text-primary)", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Home</Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 100px", position: "relative", zIndex: 1 }}>
        <header style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: "800", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}>KaroTools Blog</h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
            GST, tax, invoicing, and compliance guides tailored for Indian freelancers, agencies, and small businesses. We break down complex Indian tax rules into simple, actionable steps so you can focus on growing your business. Explore our articles on advance tax, 44ADA presumptive taxation, GST limits, return due dates, and hourly rate calculations to stay compliant and profitable in 2026.
          </p>
          <div style={{ marginTop: "32px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/gst-calculator" style={{ background: "rgba(0,118,255,0.1)", border: "1px solid rgba(0,118,255,0.3)", color: "#38bdf8", padding: "10px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>GST Calculator</Link>
            <Link href="/invoice-generator" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", padding: "10px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Invoice Generator</Link>
          </div>
        </header>

        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "32px", color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Featured Articles</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {posts.map(post => (
            <Link href={post.path} key={post.slug} style={{ textDecoration: "none" }}>
              <article className="article-card" style={{ border: "1px solid var(--glass-border)", borderRadius: "16px", padding: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", fontSize: "12px", color: "var(--text-secondary)", fontWeight: "600" }}>
                  <span style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 10px", borderRadius: "20px" }}>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", lineHeight: "1.4", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{post.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", flexGrow: 1 }}>{post.description}</p>
                <div style={{ marginTop: "20px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  Last updated: {formatSafeDate(post.date)}
                </div>
        </article>

            </Link>
          ))}
          {posts.length === 0 && (
            <p style={{ color: "var(--text-secondary)" }}>No articles published yet.</p>
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
