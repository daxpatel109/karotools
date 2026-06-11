"use client";
import { useEffect } from "react";
import Link from "next/link";

const guides = [
  {
    title: "The Complete Guide to GST for Freelancers in India",
    description: "Learn when to register for GST, what rates apply to different freelance services, and how to stay compliant without hiring expensive accountants.",
    slug: "gst-for-freelancers-india",
    category: "Tax & Compliance",
    readTime: "8 min read",
    color: "#0ea5e9"
  },
  {
    title: "How to Price Your Freelance Services",
    description: "Stop undercharging. Learn proven frameworks for calculating your hourly rate, moving to project-based pricing, and negotiating with Indian and international clients.",
    slug: "how-to-price-freelance-services",
    category: "Freelance Basics",
    readTime: "6 min read",
    color: "#10b981"
  },
  {
    title: "Understanding Section 44ADA vs Normal Taxation",
    description: "A deep dive into Presumptive Taxation. Discover if you qualify for the massive 50% tax-free bracket and how it compares to calculating strict expenses.",
    slug: "section-44ada-vs-normal",
    category: "Tax & Compliance",
    readTime: "7 min read",
    color: "#8b5cf6"
  }
];

export default function GuidesHub() {
  useEffect(() => {
    document.title = "Freelancer Guides & Resources | KaroTools";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", paddingBottom: "100px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 5vw", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
            <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
              Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
            </span>
          </div>
        </Link>
        <Link href="/" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Home</Link>
      </nav>

      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 5vw 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "20px", color: "#f8fafc", lineHeight: 1.1 }}>
          The Freelancer's <br/>
          <span style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Knowledge Hub</span>
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "18px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Practical, no-nonsense guides to help Indian freelancers navigate taxes, pricing, contracts, and business growth.
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 5vw" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
          {guides.map((guide, idx) => (
            <Link href={`/guides/${guide.slug}`} key={idx} style={{ textDecoration: "none" }}>
              <div 
                style={{ 
                  background: "rgba(255,255,255,0.02)", 
                  border: "1px solid rgba(255,255,255,0.05)", 
                  borderRadius: "24px", 
                  padding: "32px", 
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = guide.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Subtle top glow */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: guide.color, opacity: 0.8 }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em", color: guide.color, textTransform: "uppercase", background: `${guide.color}22`, padding: "4px 10px", borderRadius: "20px" }}>
                    {guide.category}
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>{guide.readTime}</span>
                </div>
                
                <h2 style={{ fontSize: "22px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "16px", lineHeight: 1.3 }}>
                  {guide.title}
                </h2>
                
                <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                  {guide.description}
                </p>

                <div style={{ marginTop: "24px", display: "flex", alignItems: "center", color: guide.color, fontWeight: "600", fontSize: "14px", gap: "8px" }}>
                  Read Guide <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
