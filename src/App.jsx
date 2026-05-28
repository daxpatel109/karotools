import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── SEO Keywords targeted ────────────────────────────────────────
// free gst calculator india, gst invoice generator free, freelance tools india,
// free invoice generator india, bio generator instagram india,
// freelance rate calculator india, free business tools india

// ── Cursor ───────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      setTimeout(() => { if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; } }, 70);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 8, height: 8, background: "#0ea5e9", borderRadius: "50%", pointerEvents: "none", zIndex: 99999, transform: "translate(-50%,-50%)", boxShadow: "0 0 12px #0ea5e9, 0 0 24px #0ea5e9" }} />
      <div ref={ring} style={{ position: "fixed", width: 32, height: 32, border: "1.5px solid rgba(14,165,233,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 99998, transform: "translate(-50%,-50%)", transition: "left 0.07s ease, top 0.07s ease" }} />
    </>
  );
}

// ── Scroll reveal hook ───────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Tool Card ────────────────────────────────────────────────────
function ToolCard({ tool, index, onClick }) {
  const cardRef = useRef(null);
  const [ref, visible] = useReveal();

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -10;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 10;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5}px 40px rgba(14,165,233,0.18), 0 24px 48px rgba(0,0,0,0.5)`;
  };
  const onLeave = () => {
    if (cardRef.current) { cardRef.current.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateY(0)"; cardRef.current.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)"; }
  };

  const accent = ["#0ea5e9","#14b8a6","#3b82f6","#8b5cf6","#f59e0b","#10b981","#ef4444","#ec4899"][index % 8];

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s` }}>
      <div ref={cardRef} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 20, padding: 28, cursor: tool.page ? "pointer" : "default", transition: "transform 0.18s ease, box-shadow 0.18s ease", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden", minHeight: 180 }}>
        {/* Glow line */}
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
        {/* Hover shimmer */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${accent}08, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${accent}22, ${accent}08)`, border: `1px solid ${accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 14 }}>{tool.icon}</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 6, fontFamily: "'Syne',sans-serif" }}>{tool.name}</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 14 }}>{tool.description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ background: `${accent}18`, color: accent, padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: `1px solid ${accent}28`, letterSpacing: "0.06em", textTransform: "uppercase" }}>{tool.category}</span>
          {tool.page ? <span style={{ color: accent, fontSize: 16, opacity: 0.8 }}>→</span> : <span style={{ fontSize: 10, color: "#334155", fontWeight: 700, letterSpacing: "0.1em" }}>SOON</span>}
        </div>
      </div>
    </div>
  );
}

// ── Section reveal wrapper ───────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ── Counter animation ─────────────────────────────────────────────
function Counter({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(t);
  }, [visible, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Main Home ────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const heroRef = useRef(null);

  useEffect(() => {
    // SEO Meta
    document.title = "KaroTools — Free GST Calculator, Invoice Generator & Business Tools for Indian Freelancers";
    const setMeta = (name, content, prop = false) => {
      let el = document.querySelector(`meta[${prop ? "property" : "name"}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el[prop ? "setAttribute" : "name"] = name; if (prop) el.setAttribute("property", name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Free online tools for Indian freelancers & small businesses — GST Calculator, Invoice Generator, Email Generator, Bio Generator, Rate Calculator. No login required.");
    setMeta("keywords", "free gst calculator india, gst invoice generator free, freelance tools india, free invoice generator india, bio generator instagram india, freelance rate calculator india, gst calculator online india, free business tools india, karotools");
    setMeta("robots", "index, follow");
    setMeta("author", "KaroTools");
    setMeta("og:title", "KaroTools — Free Business Tools for Indian Freelancers", true);
    setMeta("og:description", "GST Calculator, Invoice Generator, Email Writer & more — 100% free, no login needed.", true);
    setMeta("og:type", "website", true);
    setMeta("og:url", "https://karotools.in", true);

    // Schema.org JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "KaroTools",
      "url": "https://karotools.in",
      "description": "Free online business tools for Indian freelancers and small businesses",
      "potentialAction": { "@type": "SearchAction", "target": "https://karotools.in/?q={search_term_string}", "query-input": "required name=search_term_string" }
    };
    let ldScript = document.querySelector("#ld-json");
    if (!ldScript) { ldScript = document.createElement("script"); ldScript.id = "ld-json"; ldScript.type = "application/ld+json"; document.head.appendChild(ldScript); }
    ldScript.text = JSON.stringify(schema);
  }, []);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  // Parallax hero
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tools = [
    { icon: "🧮", name: "GST Calculator", description: "Live GST calculation for all slabs — 5%, 12%, 18%, 28%. CGST, SGST & IGST support.", category: "Finance", page: "/gst-calculator", keywords: "gst calculator" },
    { icon: "📄", name: "Invoice Generator", description: "Professional GST invoices with PDF download. Logo upload, GSTIN validation, HSN/SAC codes.", category: "Finance", page: "/invoice-generator", keywords: "invoice generator" },
    { icon: "📧", name: "Email Generator", description: "10 email types — cold outreach, follow-up, payment reminder, proposal & more.", category: "AI Tool", page: "/email-generator", keywords: "email generator" },
    { icon: "📱", name: "Bio Generator", description: "Instagram, LinkedIn & Twitter bios — professional, creative & minimal styles.", category: "AI Tool", page: "/bio-generator", keywords: "bio generator" },
    { icon: "💰", name: "Rate Calculator", description: "Calculate your perfect freelance hourly, daily & monthly rate in INR.", category: "Finance", page: "/rate-calculator", keywords: "rate calculator" },
    { icon: "📝", name: "Proposal Generator", description: "Win more clients with AI-written project proposals tailored for Indian freelancers.", category: "AI Tool", keywords: "proposal" },
    { icon: "🏢", name: "Business Name Generator", description: "Find the perfect name for your Indian startup or freelance business instantly.", category: "AI Tool", keywords: "business name" },
    { icon: "📋", name: "Contract Generator", description: "Generate professional freelance contracts and service agreements in seconds.", category: "Legal", keywords: "contract" },
  ];

  const filters = ["All", "Finance", "AI Tool", "Legal"];

  const filtered = tools.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()) || t.keywords?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || t.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { num: 8, suffix: "+", label: "Free Tools" },
    { num: 0, suffix: "₹", label: "Forever Free", pre: true },
    { num: 100, suffix: "%", label: "No Login" },
    { num: 50, suffix: "K+", label: "Calculations Done" },
  ];

  const faqs = [
    { q: "Is KaroTools completely free?", a: "Yes! All tools on KaroTools are 100% free. No login, no subscription, no hidden charges. Built for Indian freelancers and small businesses." },
    { q: "Do I need to create an account?", a: "No account needed. Just visit the tool, fill in your details, and use it instantly. We believe in zero-friction tools." },
    { q: "Can I download invoices as PDF?", a: "Yes! Our GST Invoice Generator lets you download professional PDF invoices instantly with CGST/SGST/IGST breakdown, your logo, and digital signature area." },
    { q: "Are the GST calculations accurate?", a: "Absolutely. Our GST Calculator follows official Indian GST rules — including CGST + SGST for intra-state and IGST for inter-state transactions across all four slabs." },
    { q: "Who is KaroTools built for?", a: "KaroTools is built specifically for Indian freelancers, consultants, designers, developers, and small business owners who need quick, reliable business tools without the complexity." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 3px; }

        @keyframes fadeInUp { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes pulse { 0%,100% { opacity:0.6; transform:scale(1); } 50% { opacity:1; transform:scale(1.15); } }
        @keyframes floatY { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-18px); } }
        @keyframes rotateRing { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes gridFade { from { opacity:0; } to { opacity:1; } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }

        input::placeholder { color: #334155; }
        .nav-link:hover { color: #f1f5f9 !important; background: rgba(255,255,255,0.05) !important; }
        .search-input:focus { border-color: rgba(14,165,233,0.5) !important; box-shadow: 0 0 0 4px rgba(14,165,233,0.1) !important; outline: none; }
        .filter-btn:hover { background: rgba(255,255,255,0.07) !important; }
        .faq-item:hover { border-color: rgba(14,165,233,0.2) !important; background: rgba(14,165,233,0.03) !important; }
        .social-link:hover { color: #0ea5e9 !important; }
      `}</style>

      <Cursor />

      {/* Fixed ambient glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* Dot grid background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px", animation: "gridFade 1.5s ease" }} />

      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 72, display: "flex", alignItems: "center", padding: "0 40px", justifyContent: "space-between", background: scrolled ? "rgba(2,6,23,0.92)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.4s ease", animation: "slideDown 0.6s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 0 20px rgba(14,165,233,0.4)" }}>⚡</div>
          <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #0ea5e9, #14b8a6, #0ea5e9)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>KaroTools</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {["Tools", "About", "Contact"].map(item => (
            <button key={item} className="nav-link" style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#94a3b8", fontSize: 14, fontWeight: 500, borderRadius: 8, transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>{item}</button>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />
          <button style={{ padding: "9px 20px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "'Syne',sans-serif", boxShadow: "0 4px 16px rgba(14,165,233,0.3)", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >Start Free →</button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", overflow: "hidden" }}>

        {/* Floating rings */}
        <div ref={heroRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[280, 440, 600, 760].map((size, i) => (
            <div key={size} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, border: `1px solid rgba(14,165,233,${0.06 - i * 0.012})`, borderRadius: "50%", transform: "translate(-50%,-50%)", animation: `rotateRing ${20 + i * 8}s linear infinite ${i % 2 ? "reverse" : ""}` }} />
          ))}
        </div>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)", borderRadius: 50, padding: "7px 18px", marginBottom: 32, animation: "fadeInUp 0.6s 0.1s both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 13, color: "#38bdf8", fontWeight: 700, letterSpacing: "0.06em" }}>FREE TOOLS FOR INDIAN FREELANCERS</span>
        </div>

        {/* H1 — SEO primary keyword */}
        <h1 style={{ fontSize: "clamp(38px, 7vw, 82px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", lineHeight: 1.08, marginBottom: 24, animation: "fadeInUp 0.7s 0.15s both", letterSpacing: "-0.03em" }}>
          <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 40%, #14b8a6 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 5s linear infinite" }}>
            Karo Business,
          </span>
          <br />
          <span style={{ color: "#f1f5f9" }}>Bina Hassle Ke.</span>
        </h1>

        {/* Description — SEO secondary */}
        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#94a3b8", maxWidth: 560, lineHeight: 1.65, marginBottom: 44, animation: "fadeInUp 0.7s 0.25s both" }}>
          Free GST Calculator, Invoice Generator, Email Writer & more — built for <strong style={{ color: "#cbd5e1" }}>Indian freelancers & small businesses</strong>. No login. No fees. Forever.
        </p>

        {/* CTA Row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 64, flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 0.7s 0.35s both" }}>
          <button onClick={() => document.getElementById("tools").scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "16px 36px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "'Syne',sans-serif", boxShadow: "0 8px 32px rgba(14,165,233,0.35)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(14,165,233,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,165,233,0.35)"; }}
          >Explore Tools →</button>
          <button onClick={() => navigate("/gst-calculator")}
            style={{ padding: "16px 32px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, color: "#cbd5e1", fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >🧮 GST Calculator</button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 0.7s 0.45s both" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "0 32px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.pre ? s.suffix : ""}<Counter end={s.num} suffix={s.pre ? "" : s.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "floatY 2.5s ease infinite" }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(180deg, transparent, #0ea5e9)" }} />
          <span style={{ fontSize: 11, color: "#334155", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── TOOLS SECTION ───────────────────────────────────────── */}
      <section id="tools" style={{ position: "relative", zIndex: 1, padding: "80px 40px 100px", maxWidth: 1240, margin: "0 auto" }}>

        {/* Section header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>FREE TOOLS</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em" }}>
              Everything You Need to<br /><span style={{ background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Run Your Business</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 16 }}>Click any tool — no login, no signup, no cost.</p>
          </div>
        </Reveal>

        {/* Search + Filter */}
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", maxWidth: 400, flex: 1, minWidth: 260 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: 16 }}>🔍</span>
              <input
                className="search-input"
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search tools..."
                style={{ width: "100%", padding: "13px 16px 13px 44px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 15, color: "#f1f5f9", boxSizing: "border-box", transition: "all 0.3s", fontFamily: "'DM Sans',sans-serif" }}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {filters.map(f => (
                <button key={f} className="filter-btn" onClick={() => setActiveFilter(f)}
                  style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid", borderColor: activeFilter === f ? "rgba(14,165,233,0.5)" : "rgba(255,255,255,0.08)", background: activeFilter === f ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,0.03)", color: activeFilter === f ? "#38bdf8" : "#94a3b8", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} onClick={() => tool.page && navigate(tool.page)} />
          ))}
        </div>
      </section>

      {/* ── WHY KAROTOOLS ───────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 40px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#14b8a6", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>WHY KAROTOOLS</p>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", letterSpacing: "-0.02em" }}>Built for India. By Freelancers.</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: "🔓", title: "Zero Login", desc: "No account, no email, no password. Just open and use. Your privacy matters." },
              { icon: "₹", title: "Always Free", desc: "Every tool on KaroTools is free forever. We don't lock features behind paywalls." },
              { icon: "🇮🇳", title: "India-First", desc: "GST slabs, INR formatting, CGST/SGST/IGST — built for the Indian tax system." },
              { icon: "⚡", title: "Instant Results", desc: "No loading spinners. No API calls for basic tools. Results appear as you type." },
              { icon: "📱", title: "Mobile Ready", desc: "Works perfectly on phone, tablet or laptop. Use anywhere, anytime." },
              { icon: "🔒", title: "Data Private", desc: "We don't store your invoice data, GST numbers or business details. Ever." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "28px 24px", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,0.05)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ — SEO GOLD ──────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 40px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>FAQ</p>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.08}>
                <div className="faq-item" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 28px", transition: "all 0.3s" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>{f.q}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto", background: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(20,184,166,0.08))", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 28, padding: "60px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)" }} />
            <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 14, letterSpacing: "-0.02em" }}>Start Using KaroTools Today</h2>
            <p style={{ fontSize: 16, color: "#94a3b8", marginBottom: 36, maxWidth: 460, margin: "0 auto 36px" }}>Join thousands of Indian freelancers who save hours every week with our free tools.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/gst-calculator")} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Syne',sans-serif", boxShadow: "0 8px 24px rgba(14,165,233,0.3)", cursor: "pointer" }}>GST Calculator →</button>
              <button onClick={() => navigate("/invoice-generator")} style={{ padding: "14px 32px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#cbd5e1", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Invoice Generator →</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
                <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
              </div>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, maxWidth: 280 }}>Free online business tools for Indian freelancers and small businesses. GST calculator, invoice generator, email generator & more.</p>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Tools</p>
              {["GST Calculator", "Invoice Generator", "Email Generator", "Bio Generator", "Rate Calculator"].map(t => (
                <p key={t} className="social-link" style={{ fontSize: 14, color: "#475569", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}>{t}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Company</p>
              {["About", "Blog", "Contact", "Privacy Policy"].map(t => (
                <p key={t} className="social-link" style={{ fontSize: 14, color: "#475569", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}>{t}</p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: "#334155" }}>© 2026 KaroTools.in — Made with ❤️ in India 🇮🇳</p>
            <p style={{ fontSize: 13, color: "#1e293b" }}>Free GST Calculator · Free Invoice Generator · Free Business Tools India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
