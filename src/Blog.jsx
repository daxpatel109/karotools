"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const featuredPost = {
  title: "GST Registration Limit for Freelancers in India: The ₹20 Lakh Threshold Explained",
  slug: "/blog/gst-registration-threshold",
  category: "COMPLIANCE",
  date: "June 14, 2026",
  readTime: "9 min read",
  description: "Do Indian freelancers need to register for GST? Learn about the ₹20 Lakh turnover limit, voluntary registration, and when to charge IGST for international clients.",
  color: "#c084fc", 
  bg: "rgba(168,85,247,0.1)"
};

const allPosts = [
  {
    title: "How to Make GST Invoice Online Free in 2026 — Step-by-Step Guide",
    slug: "/blog/how-to-make-gst-invoice-online-free",
    category: "INVOICING",
    date: "June 13, 2026",
    readTime: "7 min read",
    description: "No software. No signup. No cost. Create a professional, GST-compliant invoice in under 2 minutes.",
    color: "#fbbf24", 
    bg: "rgba(245,158,11,0.1)"
  },
  {
    title: "Section 44ADA for Freelancers: The Ultimate Tax Saving Guide",
    slug: "/blog/section-44ada-freelancers",
    category: "TAX SAVINGS",
    date: "June 7, 2026",
    readTime: "7 min read",
    description: "Learn how Section 44ADA allows you to claim 50% of your income as completely tax-free.",
    color: "#38bdf8", 
    bg: "rgba(56,189,248,0.1)"
  },
  {
    title: "How to Calculate Advance Tax for Freelancers in India",
    slug: "/blog/advance-tax-for-freelancers-india",
    category: "COMPLIANCE",
    date: "June 7, 2026",
    readTime: "6 min read",
    description: "Avoid Section 234B and 234C penalties. Learn how to calculate and pay your Advance Tax in installments.",
    color: "#fb7185", 
    bg: "rgba(244,63,94,0.1)"
  },
  {
    title: "Freelance Hourly Rate vs Salary: How Much Should I Charge?",
    slug: "/blog/freelance-hourly-rate-vs-salary-india",
    category: "PRICING",
    date: "June 7, 2026",
    readTime: "8 min read",
    description: "Why direct salary conversion makes you lose money. Learn how to factor in unpaid leaves and software expenses.",
    color: "#34d399", 
    bg: "rgba(16,185,129,0.1)"
  },
  {
    title: "The Freelancer's Guide to the MSME 45-Day Payment Rule",
    slug: "/blog/msme-45-day-rule",
    category: "LEGAL",
    date: "June 6, 2026",
    readTime: "5 min read",
    description: "Learn how the government protects Indian freelancers from late payments, and how to enforce the 45-day rule.",
    color: "#a78bfa", 
    bg: "rgba(167,139,250,0.1)"
  }
];

const categories = ["All", "Compliance", "Tax Savings", "Invoicing", "Pricing", "Legal"];

export default function Blog() {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | KaroTools India";
  }, []);

  const filteredPosts = filter === "All" 
    ? allPosts 
    : allPosts.filter(p => p.category.toUpperCase() === filter.toUpperCase());

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", position: "relative", overflow: "hidden" }}>
      
      {/* Ambient backgrounds */}
      <div style={{ position: "absolute", top: "0", left: "20%", width: "60%", height: "40%", background: "radial-gradient(ellipse, rgba(0,118,255,0.06) 0%, transparent 60%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 20px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
            <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
              Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
            </span>
          </div>
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>Home</Link>
          <button onClick={() => window.location.href = "/"} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9", padding: "6px 12px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>Try Tools</button>
        </div>
      </nav>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px 120px", position: "relative", zIndex: 1 }}>
        
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "16px", color: "#fff", lineHeight: 1.1 }}>
            Insights for Indian <br/>Freelancers & Founders
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
            The ultimate guides on tax compliance, pricing strategies, and client management in India.
          </p>
        </div>

        {/* Featured Hero Article */}
        <Link href={featuredPost.slug} style={{ display: "block", textDecoration: "none", background: "linear-gradient(145deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.8) 100%)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(32px, 5vw, 48px)", marginBottom: "64px", position: "relative", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 48px -12px rgba(168,85,247,0.15)"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
          
          <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(circle at top right, rgba(168,85,247,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 10, maxWidth: "700px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: featuredPost.bg, color: featuredPost.color, padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>FEATURED • {featuredPost.category}</span>
              <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}>{featuredPost.date}</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#fff", marginBottom: "20px", lineHeight: "1.2" }}>
              {featuredPost.title}
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "17px", lineHeight: "1.6", marginBottom: "32px", maxWidth: "600px" }}>
              {featuredPost.description}
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#fff", fontWeight: "600", fontSize: "15px", background: "rgba(255,255,255,0.1)", padding: "10px 20px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
              Read Article →
            </div>
          </div>
        </Link>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? "#fff" : "rgba(255,255,255,0.03)",
                color: filter === cat ? "#020617" : "#94a3b8",
                border: filter === cat ? "1px solid #fff" : "1px solid rgba(255,255,255,0.1)",
                padding: "8px 20px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { if (filter !== cat) e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { if (filter !== cat) e.currentTarget.style.color = "#94a3b8"; }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b" }}>
            <p style={{ fontSize: "18px" }}>No articles found for this category yet.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {filteredPosts.map((post, idx) => (
              <Link key={idx} href={post.slug} style={{ display: "flex", flexDirection: "column", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "pointer", height: "100%", position: "relative", overflow: "hidden" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
                
                <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: `radial-gradient(circle at 50% 0%, ${post.bg} 0%, transparent 50%)`, opacity: 0.5, pointerEvents: "none" }} />

                <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 10 }}>
                  <span style={{ color: post.color, fontSize: "11px", fontWeight: "800", letterSpacing: "0.06em" }}>{post.category}</span>
                  <span style={{ color: "#475569", fontSize: "12px" }}>•</span>
                  <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>{post.readTime}</span>
                </div>
                
                <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "16px", lineHeight: "1.4", position: "relative", zIndex: 10 }}>
                  {post.title}
                </h2>
                
                <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px 0", flexGrow: 1, position: "relative", zIndex: 10 }}>
                  {post.description}
                </p>
                
                <div style={{ color: post.color, fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px", marginTop: "auto", position: "relative", zIndex: 10 }}>
                  Read Article <span style={{ fontSize: "16px", transition: "transform 0.2s" }} className="arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div style={{ marginTop: "100px", padding: "48px 32px", background: "linear-gradient(135deg, rgba(0,118,255,0.1), rgba(0,90,230,0.1))", borderRadius: "24px", border: "1px solid rgba(0,118,255,0.2)", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#fff", marginBottom: "16px" }}>Run your freelance business smoothly</h2>
          <p style={{ color: "#cbd5e1", fontSize: "17px", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>Calculate taxes, generate invoices, and draft contracts in seconds. 100% Free.</p>
          <button onClick={() => window.location.href = "/"} style={{ background: "#0076ff", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,118,255,0.3)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform="none"}>
            Explore Free Tools →
          </button>
        </div>

      </main>
      
      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px", textAlign: "center", color: "#64748b", fontSize: "14px", position: "relative", zIndex: 10 }}>
        © 2026 KaroTools.in — Made for Indian Freelancers
      </footer>
    </div>
  );
}
