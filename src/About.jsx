import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | KaroTools India";
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <svg width="38" height="38" viewBox="0 0 100 100" fill="none" style={{ filter: "drop-shadow(0 4px 12px rgba(14, 165, 233, 0.3))" }}>
    <defs>
      <linearGradient id="kCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="kPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <polygon points="15,10 35,10 35,31 25,41 15,41" fill="url(#kCyan)" stroke="url(#kCyan)" strokeWidth="8" strokeLinejoin="round" />
    <polygon points="15,59 25,59 35,69 35,90 15,90" fill="url(#kCyan)" stroke="url(#kCyan)" strokeWidth="8" strokeLinejoin="round" />
    <polygon points="45,40 70,15 80,25 55,50" fill="url(#kPurple)" stroke="url(#kPurple)" strokeWidth="8" strokeLinejoin="round" />
    <polygon points="45,60 55,50 80,75 70,85" fill="url(#kPurple)" stroke="url(#kPurple)" strokeWidth="8" strokeLinejoin="round" />
  </svg>
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>Home</Link>
          <Link to="/blog" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>Blog</Link>
          <button onClick={() => window.location.href = "/"} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>Try Tools</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px" }}>
          <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "700", letterSpacing: "0.08em" }}>🇮🇳 MADE IN INDIA</span>
        </div>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "24px", background: "linear-gradient(135deg,#ffffff,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1 }}>
          Empowering Indian Freelancers
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.7", maxWidth: "600px", margin: "0 auto" }}>
          KaroTools is on a mission to build the absolute best free business tools for the modern Indian workforce. No logins, no fees, no hassle.
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 100px" }}>
        
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "48px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "20px" }}>The Problem We're Solving</h2>
          <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.8", marginBottom: "20px" }}>
            As a freelancer in India, you have a hundred things to worry about: finding clients, delivering work, managing taxes, and getting paid. The last thing you need is software that slows you down.
          </p>
          <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.8" }}>
            We noticed that most free tools out there (like GST calculators or invoice generators) were either terribly designed, cluttered with intrusive ads, or forced you to create an account just to use them. We decided to change that.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.05), transparent)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: "24px", padding: "32px" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>🔓</div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "12px" }}>Zero Login Policy</h3>
            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.7" }}>Your time is valuable. Our tools are instantly accessible the moment you open the website. We never ask for your email address.</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.05), transparent)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "24px", padding: "32px" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>🔒</div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "12px" }}>Absolute Privacy</h3>
            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.7" }}>Because we have no database, your financial data (GSTINs, client names, invoice amounts) never leaves your browser. It's mathematically impossible for us to read your data.</p>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "48px", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "20px" }}>Join the Community</h2>
          <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.8", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            KaroTools is growing every day. We are constantly building new tools to make your business run smoother.
          </p>
          <Link to="/" style={{ display: "inline-block", padding: "16px 36px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "700", textDecoration: "none", boxShadow: "0 8px 24px rgba(139,92,246,0.3)", transition: "transform 0.2s" }} onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>
            Explore the Tools
          </Link>
        </div>

      </div>
    </div>
  );
}
