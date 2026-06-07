
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

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
      <div ref={dot} style={{ position: "fixed", width: 8, height: 8, background: "#0ea5e9", borderRadius: "50%", pointerEvents: "none", zIndex: 99999, transform: "translate(-50%,-50%)", boxShadow: "0 0 12px #0ea5e9, 0 0 24px #0ea5e9", transition: "transform 0.1s" }} />
      <div ref={ring} style={{ position: "fixed", width: 36, height: 36, border: "1.5px solid rgba(14,165,233,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 99998, transform: "translate(-50%,-50%)", transition: "left 0.07s ease, top 0.07s ease" }} />
    </>
  );
}

// ── Scroll Reveal ────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 40 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

// ── Counter ──────────────────────────────────────────────────────
function Counter({ end, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const step = end / 50;
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(cur));
    }, 25);
    return () => clearInterval(t);
  }, [visible, end]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ── 3D Tool Card ─────────────────────────────────────────────────
function ToolCard({ tool, index, onClick }) {
  const cardRef = useRef(null);
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -12;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 12;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
    el.style.boxShadow = `${-ry * 2}px ${rx * 2}px 48px rgba(14,165,233,0.2), 0 32px 64px rgba(0,0,0,0.5)`;
  };

  const onLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)";
      cardRef.current.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
    }
    setHovered(false);
  };

  const accents = ["#0ea5e9","#14b8a6","#3b82f6","#8b5cf6","#f59e0b","#10b981","#ef4444","#ec4899"];
  const accent = accents[index % accents.length];

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(48px)", transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s` }}>
      <div ref={cardRef} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={() => setHovered(true)}
        style={{ background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)", backdropFilter: "blur(24px)", border: `1px solid ${hovered ? `${accent}30` : "rgba(255,255,255,0.07)"}`, borderRadius: 24, padding: "28px 24px", cursor: tool.page ? "pointer" : "default", transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.3s, border-color 0.3s", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden", minHeight: 190 }}>

        {/* Top glow line */}
        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s" }} />

        {/* Background radial */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${accent}12, transparent 70%)`, pointerEvents: "none" }} />

        {/* Icon */}
        <div style={{ width: 54, height: 54, borderRadius: 16, background: `linear-gradient(135deg, ${accent}25, ${accent}08)`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16, boxShadow: `0 4px 16px ${accent}20` }}>
          {tool.icon}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 8, fontFamily: "'Syne',sans-serif", letterSpacing: "-0.01em" }}>{tool.name}</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65, marginBottom: 18 }}>{tool.description}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ background: `${accent}15`, color: accent, padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: `1px solid ${accent}25`, letterSpacing: "0.06em", textTransform: "uppercase" }}>{tool.category}</span>
          {tool.page
            ? <span style={{ color: accent, fontSize: 18, fontWeight: 700, opacity: 0.8, transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>→</span>
            : <span style={{ fontSize: 10, color: "#1e293b", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>SOON</span>}
        </div>
      </div>
    </div>
  );
}

// ── Floating Particle ─────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, dur: Math.random() * 12 + 8, delay: Math.random() * 6
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: p.x + "%", top: p.y + "%", width: p.size, height: p.size, borderRadius: "50%", background: `rgba(14,165,233,${Math.random() * 0.3 + 0.1})`, animation: `particleFloat ${p.dur}s ${p.delay}s infinite ease-in-out alternate`, boxShadow: `0 0 ${p.size * 4}px rgba(14,165,233,0.4)` }} />
      ))}
    </div>
  );
}

// ── Main Home ─────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);

  // SEO Setup
  useEffect(() => {
    document.title = "KaroTools — Free GST Calculator, Invoice Generator & Business Tools for Indian Freelancers";

    const metas = [
      ["description", "Free online tools for Indian freelancers & small businesses — GST Calculator, GST Invoice Generator, Email Generator, Bio Generator, Freelance Rate Calculator. No login required. 100% free."],
      ["keywords", "free gst calculator india, gst invoice generator free india, freelance tools india, free invoice generator india, gst calculator online, bio generator instagram india, freelance rate calculator india, free business tools india, karotools, gst calculator 2026"],
      ["robots", "index, follow"],
      ["author", "KaroTools"],
      ["og:title", "KaroTools — Free Business Tools for Indian Freelancers"],
      ["og:description", "GST Calculator, Invoice Generator, Email Writer & more — 100% free, no login needed."],
      ["og:type", "website"],
      ["og:url", "https://karotools.in"],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", "KaroTools — Free GST Calculator & Invoice Generator India"],
      ["twitter:description", "Free tools for Indian freelancers. GST Calculator, Invoice Generator, Email Generator & more."],
    ];

    metas.forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(name.includes(":") ? "property" : "name", name); document.head.appendChild(el); }
      el.content = content;
    });

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://karotools.in";

    // JSON-LD Schema
    const schemas = [
      { "@context": "https://schema.org", "@type": "WebSite", "name": "KaroTools", "url": "https://karotools.in", "description": "Free online business tools for Indian freelancers and small businesses", "potentialAction": { "@type": "SearchAction", "target": "https://karotools.in/?q={search_term_string}", "query-input": "required name=search_term_string" } },
      { "@context": "https://schema.org", "@type": "Organization", "name": "KaroTools", "url": "https://karotools.in", "description": "Free GST Calculator, Invoice Generator & Business Tools for Indian Freelancers" },
    ];
    schemas.forEach((schema, i) => {
      let sc = document.querySelector(`#ld-json-${i}`);
      if (!sc) { sc = document.createElement("script"); sc.id = `ld-json-${i}`; sc.type = "application/ld+json"; document.head.appendChild(sc); }
      sc.text = JSON.stringify(schema);
    });
  }, []);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  // Parallax
  useEffect(() => {
    const onScroll = () => { if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tools = [
    { icon: "🧮", name: "GST Calculator", description: "Live GST calculation for all slabs — 5%, 12%, 18%, 28%. CGST, SGST & IGST with custom rates and presets.", category: "Finance", page: "/gst-calculator" },
    { icon: "📄", name: "Invoice Generator", description: "Professional GST invoices with PDF download. GSTIN validation, HSN/SAC codes, logo upload, signature area.", category: "Finance", page: "/invoice-generator" },
    { icon: "🏛️", name: "Tax Calculator (44ADA)", description: "Visual income tax estimator for freelancers using Presumptive Taxation (50% tax-free income).", category: "Finance", page: "/tax-calculator" },
    { icon: "🏢", name: "Normal Tax Calculator", description: "Calculate standard tax (New Regime) without 44ADA for high-income freelancers or agencies.", category: "Finance", page: "/normal-tax-calculator" },
    { icon: "📧", name: "Email Generator", description: "10 email types — cold outreach, follow-up, payment reminder, proposal & more. 4 tones, no AI needed.", category: "AI Tool", page: "/email-generator" },
    { icon: "📱", name: "Bio Generator", description: "Instagram, LinkedIn & Twitter bios — professional, creative & minimal styles. Template-based, instant.", category: "AI Tool", page: "/bio-generator" },
    { icon: "💰", name: "Rate Calculator", description: "Calculate your perfect freelance hourly, daily & monthly rate in INR based on your expenses.", category: "Finance", page: "/rate-calculator" },
    { icon: "📝", name: "Proposal Generator", description: "Win more clients with AI-written project proposals tailored for Indian freelancers.", category: "AI Tool" },
    { icon: "📋", name: "Contract Generator", description: "Generate professional freelance contracts and service agreements in seconds.", category: "Legal", page: "/contract-generator" },
  ];

  const filters = ["All", "Finance", "AI Tool", "Legal"];

  const filtered = tools.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || t.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { end: 8, suffix: "+", label: "Free Tools", icon: "🛠" },
    { end: 0, suffix: "₹", label: "Forever Free", icon: "💎", pre: true },
    { end: 100, suffix: "%", label: "No Login", icon: "🔓" },
    { end: 10, suffix: "K+", label: "Users Served", icon: "🇮🇳" },
  ];

  const features = [
    { icon: "🔓", title: "Zero Login Required", desc: "No account, no email, no password. Just open any tool and use it instantly. Your privacy is our priority." },
    { icon: "₹", title: "100% Free Forever", desc: "Every single tool on KaroTools is completely free. No premium plans, no feature locks, no hidden charges." },
    { icon: "🇮🇳", title: "Built for India", desc: "GST slabs, INR formatting, CGST/SGST/IGST — every tool is designed around Indian tax laws and business norms." },
    { icon: "⚡", title: "Instant Results", desc: "No loading spinners for basic tools. Results appear live as you type. Engineered for speed." },
    { icon: "📱", title: "Works on Any Device", desc: "Fully responsive on phone, tablet and laptop. Use KaroTools from anywhere, anytime." },
    { icon: "🔒", title: "Your Data Stays Private", desc: "We never store your invoice data, GSTIN numbers or business details. Everything stays on your device." },
  ];

  const faqs = [
    { q: "Is KaroTools completely free to use?", a: "Yes! All tools on KaroTools are 100% free — no login, no subscription, no hidden charges. We built this for Indian freelancers who shouldn't have to pay just to calculate GST or generate an invoice." },
    { q: "Do I need to create an account?", a: "Absolutely not. There's zero sign-up required. Just visit any tool, fill in your details, and get your result instantly. We believe in friction-free tools." },
    { q: "Can I download my GST invoice as a PDF?", a: "Yes! Our GST Invoice Generator lets you download a professional PDF invoice instantly — with your logo, GSTIN, CGST/SGST or IGST breakdown, HSN/SAC codes, payment status, and authorized signature area." },
    { q: "Are the GST calculations accurate and up-to-date?", a: "Absolutely. Our GST Calculator follows official Indian GST rules — including CGST + SGST for intra-state transactions and IGST for inter-state transactions across all four slabs (5%, 12%, 18%, 28%). We also support custom GST rates." },
    { q: "What tools does KaroTools offer?", a: "Currently KaroTools offers: GST Calculator, GST Invoice Generator, Email Generator (10 types), Bio Generator (Instagram/LinkedIn/Twitter), and Freelance Rate Calculator. More tools like Proposal Generator and Contract Generator are coming soon." },
    { q: "Who is KaroTools built for?", a: "KaroTools is built specifically for Indian freelancers, consultants, UI/UX designers, web developers, content writers, photographers, and small business owners who need fast, reliable business tools without complexity." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#0ea5e9, #14b8a6); border-radius: 4px; }

        @keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes rotateRing { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes particleFloat { 0%{transform:translateY(0) scale(1);opacity:0.2} 100%{transform:translateY(-50px) scale(1.3);opacity:0.7} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradientShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes borderGlow { 0%,100%{box-shadow:0 0 20px rgba(14,165,233,0.2)} 50%{box-shadow:0 0 40px rgba(14,165,233,0.5)} }

        input::placeholder { color: #1e293b; }
        .nav-btn:hover { color: #f1f5f9 !important; background: rgba(255,255,255,0.06) !important; }
        .search-box:focus { border-color: rgba(14,165,233,0.5) !important; box-shadow: 0 0 0 4px rgba(14,165,233,0.08) !important; outline: none; background: rgba(255,255,255,0.06) !important; }
        .filter-chip:hover { background: rgba(255,255,255,0.08) !important; color: #f1f5f9 !important; }
        .feature-card:hover { transform: translateY(-6px) !important; border-color: rgba(14,165,233,0.2) !important; background: rgba(14,165,233,0.04) !important; }
        .faq-card:hover { border-color: rgba(14,165,233,0.2) !important; background: rgba(14,165,233,0.03) !important; }
        .footer-link:hover { color: #0ea5e9 !important; }
        .cta-btn-primary:hover { transform: translateY(-3px) !important; box-shadow: 0 20px 48px rgba(14,165,233,0.45) !important; }
        .cta-btn-secondary:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(14,165,233,0.3) !important; }

        .desktop-nav { display: flex; gap: 4px; alignItems: center; }
        .mobile-nav-toggle { display: none; background: transparent; border: none; color: #f8fafc; font-size: 24px; cursor: pointer; padding: 4px; }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block; }
        }
      `}</style>

      <Cursor />
      <Particles />

      {/* Ambient background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-15%", width: "65%", height: "65%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-15%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(14,165,233,0.03) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Dot grid */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 72, display: "flex", alignItems: "center", padding: "0 5vw", justifyContent: "space-between", background: scrolled ? "rgba(2,6,23,0.95)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.4s ease", animation: "slideDown 0.6s ease" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 0 20px rgba(14,165,233,0.4)", animation: "borderGlow 3s infinite" }}>⚡</div>
          <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #0ea5e9, #14b8a6, #0ea5e9)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>KaroTools</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="desktop-nav">
          <button className="nav-btn" onClick={() => document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" })} style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#64748b", fontSize: 14, fontWeight: 500, borderRadius: 8, transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>Tools</button>
          <button className="nav-btn" onClick={() => navigate("/about")} style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#64748b", fontSize: 14, fontWeight: 500, borderRadius: 8, transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>About</button>
          <button className="nav-btn" onClick={() => navigate("/blog")} style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#64748b", fontSize: 14, fontWeight: 500, borderRadius: 8, transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>Blog</button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />
          <button className="cta-btn-primary" onClick={() => document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "9px 22px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "'Syne',sans-serif", boxShadow: "0 4px 20px rgba(14,165,233,0.3)", transition: "all 0.3s", cursor: "pointer" }}>
            Try Free Tools →
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="mobile-nav-toggle" onClick={() => setIsMobileMenuOpen(true)}>
          ☰
        </button>
      </nav>

      {/* ── MOBILE MENU OVERLAY ────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(2,6,23,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", animation: "slideDown 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 5vw", height: 72, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>KaroTools</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: "transparent", border: "none", color: "#f8fafc", fontSize: 32, cursor: "pointer", padding: "4px" }}>×</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "40px 5vw" }}>
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" }); }} style={{ background: "transparent", border: "none", color: "#f1f5f9", fontSize: 24, fontWeight: 700, fontFamily: "'Syne',sans-serif", textAlign: "left" }}>Tools</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate("/about"); }} style={{ background: "transparent", border: "none", color: "#f1f5f9", fontSize: 24, fontWeight: 700, fontFamily: "'Syne',sans-serif", textAlign: "left" }}>About</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate("/blog"); }} style={{ background: "transparent", border: "none", color: "#f1f5f9", fontSize: 24, fontWeight: 700, fontFamily: "'Syne',sans-serif", textAlign: "left" }}>Blog</button>
            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "16px 0" }} />
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" }); }}
              style={{ padding: "16px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", border: "none", borderRadius: 12, color: "#fff", fontSize: 18, fontWeight: 700, fontFamily: "'Syne',sans-serif", textAlign: "center" }}>
              Explore Free Tools →
            </button>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "130px 24px 80px", overflow: "hidden" }}>

        {/* Rotating rings */}
        <div ref={heroRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[300, 460, 620, 780, 940].map((size, i) => (
            <div key={size} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, border: `1px solid rgba(14,165,233,${0.07 - i * 0.012})`, borderRadius: "50%", animation: `rotateRing ${18 + i * 7}s linear infinite ${i % 2 ? "reverse" : ""}` }} />
          ))}
        </div>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 50, padding: "8px 20px", marginBottom: 36, animation: "fadeInUp 0.6s 0.1s both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 12, color: "#38bdf8", fontWeight: 700, letterSpacing: "0.08em" }}>🇮🇳 FREE TOOLS FOR INDIAN FREELANCERS & BUSINESSES</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: "clamp(40px, 7.5vw, 88px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", lineHeight: 1.06, marginBottom: 28, animation: "fadeInUp 0.7s 0.2s both", letterSpacing: "-0.03em", maxWidth: 900 }}>
          <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 40%, #14b8a6 80%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 5s linear infinite, fadeInUp 0.7s 0.2s both" }}>
            Karo Business,
          </span>
          <br />
          <span style={{ color: "#e2e8f0" }}>Bina Hassle Ke. 🚀</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "clamp(16px, 2.2vw, 21px)", color: "#94a3b8", maxWidth: 580, lineHeight: 1.7, marginBottom: 48, animation: "fadeInUp 0.7s 0.3s both" }}>
          Free <strong style={{ color: "#cbd5e1" }}>GST Calculator</strong>, <strong style={{ color: "#cbd5e1" }}>Invoice Generator</strong>, Email Writer & more — built for <strong style={{ color: "#cbd5e1" }}>Indian freelancers & small businesses</strong>. No login. No fees. Forever.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 14, marginBottom: 72, flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 0.7s 0.4s both" }}>
          <button className="cta-btn-primary" onClick={() => document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "17px 40px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", border: "none", borderRadius: 14, color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: "'Syne',sans-serif", boxShadow: "0 8px 32px rgba(14,165,233,0.35)", transition: "all 0.3s", cursor: "pointer" }}>
            Explore All Tools →
          </button>
          <button className="cta-btn-secondary" onClick={() => navigate("/gst-calculator")}
            style={{ padding: "17px 36px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, color: "#cbd5e1", fontSize: 17, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all 0.3s", cursor: "pointer" }}>
            🧮 GST Calculator
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 0.7s 0.5s both" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "0 36px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.pre ? s.suffix : ""}<Counter end={s.end} suffix={s.pre ? "" : s.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "#475569", fontWeight: 500, marginTop: 6 }}>{s.icon} {s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "floatY 2.5s ease infinite" }}>
          <div style={{ width: 1, height: 52, background: "linear-gradient(180deg, transparent, #0ea5e9)" }} />
          <span style={{ fontSize: 10, color: "#1e293b", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── TOOLS SECTION ───────────────────────────────────── */}
      <section id="tools-section" style={{ position: "relative", zIndex: 1, padding: "100px 5vw", maxWidth: 1280, margin: "0 auto" }}>

        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— FREE TOOLS —</p>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 14, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Everything You Need to<br />
              <span style={{ background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Run Your Freelance Business</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>Click any tool — no login, no signup, no cost. Ever.</p>
          </div>
        </Reveal>

        {/* Search + Filter */}
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, marginBottom: 44, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#334155", fontSize: 16 }}>🔍</span>
              <input className="search-box" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..."
                style={{ width: "100%", padding: "14px 16px 14px 46px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 15, color: "#f1f5f9", boxSizing: "border-box", transition: "all 0.3s", fontFamily: "'DM Sans',sans-serif" }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filters.map(f => (
                <button key={f} className="filter-chip" onClick={() => setActiveFilter(f)}
                  style={{ padding: "11px 22px", borderRadius: 10, border: "1px solid", borderColor: activeFilter === f ? "rgba(14,165,233,0.5)" : "rgba(255,255,255,0.07)", background: activeFilter === f ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.02)", color: activeFilter === f ? "#38bdf8" : "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(290px, 100%), 1fr))", gap: 22 }}>
          {filtered.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} onClick={() => tool.page && navigate(tool.page)} />
          ))}
        </div>
      </section>

      {/* ── FEATURE STRIP ───────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#14b8a6", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— WHY KAROTOOLS —</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", letterSpacing: "-0.025em" }}>
                Built for India.<br />By Freelancers, for Freelancers.
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="feature-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px 26px", transition: "all 0.35s ease", cursor: "default" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TOOLS HIGHLIGHT ──────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— MOST USED —</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", letterSpacing: "-0.02em" }}>Most Popular Tools</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 20 }}>
            {[
              { icon: "🧮", title: "Free GST Calculator India", desc: "Calculate CGST, SGST & IGST instantly. All slabs, custom rates, round-off toggle, visual breakdown & copy result.", link: "/gst-calculator", keyword: "33,000+ monthly searches" },
              { icon: "📄", title: "Free GST Invoice Generator", desc: "Create professional GST invoices with PDF download. Your logo, GSTIN, HSN/SAC codes — no software needed.", link: "/invoice-generator", keyword: "28,000+ monthly searches" },
              { icon: "📧", title: "Free Business Email Generator", desc: "Generate cold outreach, follow-up, payment reminder & proposal emails. 10 types, 4 tones, instant results.", link: "/email-generator", keyword: "15,000+ monthly searches" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div onClick={() => navigate(item.link)} style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.06), rgba(20,184,166,0.03))", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 20, padding: "32px 28px", cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(14,165,233,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 10, fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 20 }}>{item.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#0ea5e9", fontWeight: 700, background: "rgba(14,165,233,0.1)", padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(14,165,233,0.2)" }}>🔥 {item.keyword}</span>
                    <span style={{ color: "#0ea5e9", fontWeight: 700 }}>Try Now →</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— FAQ —</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
              <p style={{ color: "#64748b", marginTop: 12, fontSize: 15 }}>Everything you need to know about KaroTools</p>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="faq-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 28px", transition: "all 0.3s" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>{f.q}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75 }}>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Reveal>
          <div style={{ maxWidth: 820, margin: "0 auto", background: "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(20,184,166,0.06))", border: "1px solid rgba(14,165,233,0.18)", borderRadius: 28, padding: "8vw 5vw", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: 1, background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.6), transparent)" }} />
            <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)" }} />
            <div style={{ fontSize: 52, marginBottom: 24 }}>🚀</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 16, letterSpacing: "-0.025em" }}>
              Start Using KaroTools Today — It's Free
            </h2>
            <p style={{ fontSize: 17, color: "#94a3b8", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Join thousands of Indian freelancers who save hours every week with our free business tools.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cta-btn-primary" onClick={() => navigate("/gst-calculator")} style={{ padding: "15px 36px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "'Syne',sans-serif", boxShadow: "0 8px 28px rgba(14,165,233,0.35)", cursor: "pointer", transition: "all 0.3s" }}>
                🧮 GST Calculator →
              </button>
              <button className="cta-btn-secondary" onClick={() => navigate("/invoice-generator")} style={{ padding: "15px 32px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#cbd5e1", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
                📄 Invoice Generator →
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "56px 5vw 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 48, marginBottom: 56 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
                <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, maxWidth: 300 }}>Free online GST calculator, invoice generator and business tools for Indian freelancers and small businesses. No login required.</p>
              <p style={{ fontSize: 12, color: "#64748b", marginTop: 16 }}>© 2026 KaroTools.in — Made with ❤️ in India 🇮🇳</p>
            </div>

            {/* Tools */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Tools</p>
              {["GST Calculator", "Invoice Generator", "Contract Generator", "Bio Generator", "Rate Calculator"].map(t => (
                <p key={t} className="footer-link" style={{ fontSize: 14, color: "#94a3b8", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}>{t}</p>
              ))}
            </div>

            {/* Company */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Company</p>
              {[
                { name: "About Us", path: "/" },
                { name: "Blog", path: "/" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Use", path: "/terms" }
              ].map(t => (
                <Link key={t.name} to={t.path} className="footer-link" style={{ display: "block", textDecoration: "none", fontSize: 14, color: "#94a3b8", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}>{t.name}</Link>
              ))}
            </div>

            {/* Resources */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Resources</p>
              {["GST Guide India", "Invoice Format", "Freelance Tips", "Rate Guide", "GST Slabs 2026"].map(t => (
                <p key={t} className="footer-link" style={{ fontSize: 14, color: "#94a3b8", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}>{t}</p>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "#64748b" }}>Free GST Calculator India · Free Invoice Generator India · Free Business Tools for Freelancers</p>
            <p style={{ fontSize: 12, color: "#64748b" }}>KaroTools.in — Karo Business, Bina Hassle Ke</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

