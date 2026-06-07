import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | KaroTools India";
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Ambient background */}
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#8b5cf6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>Home</Link>
          <Link to="/about" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>About</Link>
          <button onClick={() => window.location.href = "/"} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>Try Tools</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "120px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "64px", marginBottom: "24px", animation: "float 3s ease-in-out infinite" }}>📚</div>
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`}</style>
        
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "24px", color: "#f1f5f9", lineHeight: 1.1 }}>
          The KaroTools Blog
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "20px", lineHeight: "1.7", maxWidth: "600px", margin: "0 auto 40px" }}>
          We are currently writing the ultimate guides on freelancing, tax filing, and client management in India. 
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", textAlign: "left" }}>
          
          {/* Blog Post Card */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px", transition: "all 0.3s", cursor: "pointer", position: "relative", overflow: "hidden" }}
               onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.background = "rgba(139,92,246,0.05)" }}
               onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)" }}
               onClick={() => window.location.href = "/blog/msme-45-day-rule"}>
            
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
              <span style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em" }}>LEGAL & TAX</span>
              <span style={{ color: "#64748b", fontSize: "12px" }}>June 6, 2026</span>
            </div>
            
            <h2 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "16px", lineHeight: "1.3" }}>
              The Freelancer's Guide to the MSME 45-Day Payment Rule (Section 43B(h))
            </h2>
            
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
              Learn how the government protects Indian freelancers from late payments, and how to enforce the 45-day rule with your clients.
            </p>
            
            <div style={{ color: "#a78bfa", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              Read Article <span>→</span>
            </div>
          </div>

          {/* Post 2: 44ADA Guide */}
          <Link to="/blog/section-44ada-freelancers" style={{ display: "block", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
              <span style={{ background: "rgba(14,165,233,0.1)", color: "#38bdf8", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>TAX SAVINGS</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>June 7, 2026 • 7 min read</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "16px" }}>
              Section 44ADA for Freelancers: The Ultimate Tax Saving Guide (FY 2025-26)
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
              Learn how Section 44ADA for freelancers allows you to claim 50% of your income as completely tax-free. The ultimate Indian presumptive taxation guide.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}
