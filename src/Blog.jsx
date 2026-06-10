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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "44px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", textAlign: "left" }}>
          
          {/* Post 1: MSME 45-Day Rule */}
          <Link to="/blog/msme-45-day-rule" style={{ display: "flex", flexDirection: "column", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer", height: "100%" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.05)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em" }}>LEGAL & TAX</span>
              <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>By Dax Patel • June 6, 2026</span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "16px", lineHeight: "1.4" }}>
              The Freelancer's Guide to the MSME 45-Day Payment Rule (Section 43B(h))
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px 0", flexGrow: 1 }}>
              Learn how the government protects Indian freelancers from late payments, and how to enforce the 45-day rule with your clients.
            </p>
            <div style={{ color: "#a78bfa", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginTop: "auto" }}>
              Read Article <span>→</span>
            </div>
          </Link>

          {/* Post 2: 44ADA Guide */}
          <Link to="/blog/section-44ada-freelancers" style={{ display: "flex", flexDirection: "column", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer", height: "100%" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(14,165,233,0.05)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(14,165,233,0.1)", color: "#38bdf8", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em" }}>TAX SAVINGS</span>
              <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>By Dax Patel • June 7, 2026</span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "16px", lineHeight: "1.4" }}>
              Section 44ADA for Freelancers: The Ultimate Tax Saving Guide
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px 0", flexGrow: 1 }}>
              Learn how Section 44ADA allows you to claim 50% of your income as completely tax-free.
            </p>
            <div style={{ color: "#38bdf8", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginTop: "auto" }}>
              Read Article <span>→</span>
            </div>
          </Link>

          {/* Post 3: Advance Tax Guide */}
          <Link to="/blog/advance-tax-for-freelancers-india" style={{ display: "flex", flexDirection: "column", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer", height: "100%" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(244,63,94,0.05)"; e.currentTarget.style.borderColor = "rgba(244,63,94,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(244,63,94,0.1)", color: "#fb7185", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em" }}>COMPLIANCE</span>
              <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>By Dax Patel • June 7, 2026</span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "16px", lineHeight: "1.4" }}>
              How to Calculate Advance Tax for Freelancers in India
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px 0", flexGrow: 1 }}>
              Avoid Section 234B and 234C penalties. Learn how to calculate and pay your Advance Tax in installments.
            </p>
            <div style={{ color: "#fb7185", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginTop: "auto" }}>
              Read Article <span>→</span>
            </div>
          </Link>

          {/* Post 4: Salary vs Freelance */}
          <Link to="/blog/freelance-hourly-rate-vs-salary-india" style={{ display: "flex", flexDirection: "column", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer", height: "100%" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.05)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em" }}>PRICING</span>
              <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>By Dax Patel • June 7, 2026</span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "16px", lineHeight: "1.4" }}>
              Freelance Hourly Rate vs Salary: How Much Should I Charge?
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px 0", flexGrow: 1 }}>
              Why direct salary conversion makes you lose money. Learn how to factor in unpaid leaves and software expenses.
            </p>
            <div style={{ color: "#34d399", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginTop: "auto" }}>
              Read Article <span>→</span>
            </div>
          </Link>

          {/* Post 5: Free GST Invoice Guide */}
          <Link to="/blog/make-gst-invoice-online-free" style={{ display: "flex", flexDirection: "column", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer", height: "100%" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.05)"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em" }}>INVOICING</span>
              <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>By Dax Patel • June 7, 2026</span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "16px", lineHeight: "1.4" }}>
              How to Make a GST Invoice Online for Free (No Watermarks)
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px 0", flexGrow: 1 }}>
              Stop using messy Excel templates. Learn the 5 mandatory fields required on Indian tax invoices and generate professional PDFs.
            </p>
            <div style={{ color: "#fbbf24", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginTop: "auto" }}>
              Read Article <span>→</span>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
