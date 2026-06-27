"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import ScrollPathSection from "./ScrollPathSection";

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
      <div ref={dot} style={{ position: "fixed", width: 8, height: 8, background: "#0076ff", borderRadius: "50%", pointerEvents: "none", zIndex: 99999, transform: "translate(-50%,-50%)", boxShadow: "0 0 12px #0076ff, 0 0 24px #0076ff", transition: "transform 0.1s" }} />
      <div ref={ring} style={{ position: "fixed", width: 36, height: 36, border: "1.5px solid rgba(0,118,255,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 99998, transform: "translate(-50%,-50%)", transition: "left 0.07s ease, top 0.07s ease" }} />
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
function ToolCard({ tool, index }) {
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
    el.style.boxShadow = `${-ry * 2}px ${rx * 2}px 48px rgba(0,118,255,0.2), 0 32px 64px rgba(0,0,0,0.5)`;
  };

  const onLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)";
      cardRef.current.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
    }
    setHovered(false);
  };

  const accents = ["#0076ff","#00c6ff","#0076ff","#005ae6","#f59e0b","#10b981","#ef4444","#ec4899"];
  const accent = accents[index % accents.length];

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(48px)", transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s` }}>
      <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={() => setHovered(true)}
        style={{ background: "var(--card-bg)", backdropFilter: "blur(24px)", border: `1px solid ${hovered ? `${accent}60` : "var(--card-border)"}`, borderRadius: 24, padding: "28px 24px", cursor: tool.page ? "pointer" : "default", transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.3s, border-color 0.3s", boxShadow: hovered ? "var(--card-hover-shadow)" : "var(--card-shadow)", position: "relative", overflow: "hidden", minHeight: 190 }}>

        {/* Top glow line */}
        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s" }} />

        {/* Background radial */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${accent}12, transparent 70%)`, pointerEvents: "none" }} />

        {/* Icon */}
        <div style={{ width: 54, height: 54, borderRadius: 16, background: `linear-gradient(135deg, ${accent}25, ${accent}08)`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16, boxShadow: `0 4px 16px ${accent}20` }}>
          {tool.icon}
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.01em" }}>{tool.name}</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 18 }}>{tool.description}</p>

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

// ── Floating Icons ─────────────────────────────────────────────
function FloatingIcons() {
  const svgs = [
    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line><line x1="12" y1="10" x2="12" y2="14"></line></svg>',
    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 3h12M6 8h12M9 13h6M10 21l6-8H8"></path></svg>',
    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>',
    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>'
  ];

  const icons = Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 24 + 16, dur: Math.random() * 20 + 15, delay: Math.random() * 6,
    svg: svgs[i % svgs.length],
    rot: Math.random() * 360
  }));
  
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", display: "var(--particle-svg-display)" }}>
      {icons.map(p => (
        <div key={p.id} 
             style={{ position: "absolute", left: p.x + "%", top: p.y + "%", width: p.size, height: p.size, 
                      color: "var(--accent-color)", opacity: 0.15,
                      animation: `particleFloat ${p.dur}s ${p.delay}s infinite ease-in-out alternate`, 
                      transform: `rotate(${p.rot}deg)` }} 
             dangerouslySetInnerHTML={{__html: p.svg}} />
      ))}
    </div>
  );
}

// ── Floating Particle (Dark Mode) ──────────────────────────────
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, dur: Math.random() * 12 + 8, delay: Math.random() * 6
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", display: "var(--particle-circle-display)" }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: p.x + "%", top: p.y + "%", width: p.size, height: p.size, borderRadius: "50%", background: `rgba(0,118,255,${Math.random() * 0.3 + 0.1})`, animation: `particleFloat ${p.dur}s ${p.delay}s infinite ease-in-out alternate`, boxShadow: `0 0 ${p.size * 4}px rgba(0,118,255,0.4)` }} />
      ))}
    </div>
  );
}

// ── Popular Tool Card ─────────────────────────────────────────────
function PopularToolCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const accents = ["#0076ff","#00c6ff","#0076ff","#005ae6","#f59e0b","#10b981","#ef4444","#ec4899"];
  const accent = accents[index % accents.length];

  return (
    <Link href={item.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', background: "var(--card-bg)", backdropFilter: "blur(24px)", border: `1px solid ${hovered ? `${accent}60` : "var(--card-border)"}`, borderRadius: 24, padding: "28px 24px", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.3s, border-color 0.3s", boxShadow: hovered ? "var(--card-hover-shadow)" : "var(--card-shadow)", position: "relative", overflow: "hidden", minHeight: 190, transform: hovered ? "translateY(-4px)" : "translateY(0)" }}>
        
        {/* Top glow line */}
        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s" }} />

        {/* Background radial */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${accent}12, transparent 70%)`, pointerEvents: "none" }} />

        {/* Icon */}
        <div style={{ width: 54, height: 54, borderRadius: 16, background: `linear-gradient(135deg, ${accent}25, ${accent}08)`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16, boxShadow: `0 4px 16px ${accent}20` }}>
          {item.icon}
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.01em" }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 18, flexGrow: 1 }}>{item.desc}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ background: `${accent}15`, color: accent, padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: `1px solid ${accent}25`, whiteSpace: "nowrap" }}>🔥 {item.keyword}</span>
          <span style={{ color: accent, fontSize: 18, fontWeight: 700, opacity: 0.8, transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>→</span>
        </div>
      </div>
    </Link>
  );
}

// ── Main Home ─────────────────────────────────────────────────────
export default function Home() {
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);

  // SEO Setup is now handled in src/app/page.jsx (Server Component)
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
    { icon: "📄", name: "Invoice Generator", description: "Professional GST invoices with PDF download. GSTIN validation, HSN/SAC codes, logo upload, signature area.", category: "Finance", page: "/gst-invoice-generator" },
    { icon: "🏛️", name: "Tax Calculator Hub", description: "Choose the right income tax calculator: Section 44ADA, Normal Regime, or Advance Tax.", category: "Finance", page: "/tax-calculator" },
    { icon: "⚠️", name: "Late GST Penalty", description: "Calculate late filing fees (₹50/day) and 18% interest on delayed GST payments instantly.", category: "Finance", page: "/late-gst-penalty-calculator" },
    { icon: "💼", name: "Salary vs Freelance", description: "Compare your current salary to freelance rates. Find exactly what you need to charge to maintain your lifestyle.", category: "Finance", page: "/salary-vs-freelance" },
    { icon: "📈", name: "SIP Calculator", description: "Calculate your Mutual Fund returns and see the true power of compounding over 10 or 20 years.", category: "Finance", page: "/sip-calculator" },
    { icon: "💰", name: "Rate Calculator", description: "Calculate your perfect freelance hourly, daily & monthly rate in INR based on your expenses.", category: "Finance", page: "/freelance-rate-calculator" },
    { icon: "💸", name: "Upwork & Fiverr Calculator", description: "Estimate your true take-home pay in INR. Calculate platform fees, GST reverse charge, 194O TDS, and FX markup loss.", category: "Finance", page: "/upwork-fiverr-fee-calculator-india" },
    { icon: "🔥", name: "FIRE Calculator", description: "Calculate your early retirement number (Lean, Regular, Fat) with inflation & nominal compounding.", category: "Finance", page: "/fire-calculator" },
  ];

  const filters = ["All", "Finance"];

  const filtered = tools.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || t.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { end: 11, suffix: "+", label: "Free Tools", icon: "🛠" },
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
    { icon: "🛡️", title: "Your Data Stays Private", desc: "Your tool inputs and invoice data are processed locally. We use basic analytics, but your raw financial numbers remain private." },
  ];

  const faqs = [
    { q: "Is KaroTools completely free to use?", a: "Yes! All tools on KaroTools are 100% free — no login, no subscription, no hidden charges. We built this for Indian freelancers who shouldn't have to pay just to calculate GST or generate an invoice." },
    { q: "Do I need to create an account?", a: "Absolutely not. There's zero sign-up required. Just visit any tool, fill in your details, and get your result instantly. We believe in friction-free tools." },
    { q: "Can I download my GST invoice as a PDF?", a: "Yes! Our GST Invoice Generator lets you download a professional PDF invoice instantly — with your logo, GSTIN, CGST/SGST or IGST breakdown, HSN/SAC codes, payment status, and authorized signature area." },
    { q: "Are the GST calculations accurate and up-to-date?", a: "Absolutely. Our GST Calculator follows official Indian GST rules — including CGST + SGST for intra-state transactions and IGST for inter-state transactions across all four slabs (5%, 12%, 18%, 28%). We also support custom GST rates." },
    { q: "What tools does KaroTools offer?", a: "Currently KaroTools offers: GST Calculator, GST Invoice Generator, Tax Calculators, and a Freelance Rate Calculator. We focus exclusively on practical financial tools to help Indian freelancers run their business." },
    { q: "Who is KaroTools built for?", a: "KaroTools is built specifically for Indian freelancers, consultants, UI/UX designers, web developers, content writers, photographers, and small business owners who need fast, reliable business tools without complexity." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--hero-gradient)", fontFamily: "'DM Sans',sans-serif", color: "var(--text-primary)", overflowX: "hidden" }}>
      

      <style>{`
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg-primary); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#0076ff, #00c6ff); border-radius: 4px; }

        @keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes rotateRing { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes particleFloat { 0%{transform:translateY(0) scale(1);opacity:0.2} 100%{transform:translateY(-50px) scale(1.3);opacity:0.7} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradientShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes borderGlow { 0%,100%{box-shadow:0 0 20px rgba(0,118,255,0.2)} 50%{box-shadow:0 0 40px rgba(0,118,255,0.5)} }

        input::placeholder { color: #1e293b; }
        .nav-btn:hover { color: var(--text-primary) !important; background: var(--glass-border) !important; }
        .search-box:focus { border-color: rgba(0,118,255,0.5) !important; box-shadow: 0 0 0 4px rgba(0,118,255,0.08) !important; outline: none; background: var(--glass-border) !important; }
        .filter-chip:hover { background: var(--glass-border) !important; color: var(--text-primary) !important; }
        .feature-card:hover { transform: translateY(-6px) !important; border-color: rgba(0,118,255,0.2) !important; background: rgba(0,118,255,0.04) !important; }
        .faq-card:hover { border-color: rgba(0,118,255,0.2) !important; background: rgba(0,118,255,0.03) !important; }
        .footer-link:hover { color: #0076ff !important; }
        .cta-btn-primary:hover { transform: translateY(-3px) !important; box-shadow: 0 20px 48px rgba(0,118,255,0.45) !important; }
        .cta-btn-secondary:hover { background: var(--glass-border) !important; border-color: rgba(0,118,255,0.3) !important; }

        .desktop-nav { display: flex; gap: 4px; alignItems: center; }
        .mobile-nav-toggle { display: none; background: transparent; border: none; color: var(--text-primary); font-size: 24px; cursor: pointer; padding: 4px; }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block; }
        }
      `}</style>

      <Cursor />
      <FloatingIcons />
      <Particles />

      {/* Ambient background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-15%", width: "65%", height: "65%", background: "radial-gradient(circle, rgba(0,118,255,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-15%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,198,255,0.05) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(0,118,255,0.03) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Dot grid */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "radial-gradient(circle, var(--glass-bg) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      {/* ── HEADER & NAVBAR ─────────────────────────────────── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 72, background: scrolled ? "rgba(2,6,23,0.95)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid var(--glass-bg)" : "none", transition: "all 0.4s ease", animation: "slideDown 0.6s ease" }}>
        <Navbar />
      </header>

      {/* ── MOBILE MENU OVERLAY ────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(2,6,23,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", animation: "slideDown 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 5vw", height: 72, borderBottom: "1px solid var(--glass-bg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: "transparent", border: "none", color: "var(--text-primary)", fontSize: 32, cursor: "pointer", padding: "4px" }}>×</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "40px 5vw" }}>
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" }); }} style={{ background: "transparent", border: "none", color: "var(--text-primary)", fontSize: 24, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", textAlign: "left" }}>Tools</button>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ background: "transparent", border: "none", color: "var(--text-primary)", fontSize: 24, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", textAlign: "left" }}>About</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} style={{ background: "transparent", border: "none", color: "var(--text-primary)", fontSize: 24, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", textAlign: "left" }}>Blog</Link>
            <div style={{ height: 1, background: "var(--glass-border)", margin: "16px 0" }} />
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" }); }}
              style={{ padding: "16px", background: "linear-gradient(135deg, #0076ff, #005ae6)", border: "none", borderRadius: 12, color: "#fff", fontSize: 18, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", textAlign: "center" }}>
              Explore Free Tools →
            </button>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "130px 24px 80px", overflow: "hidden" }}>

        <div ref={heroRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[300, 460, 620, 780, 940].map((size, i) => (
            <div key={size} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, border: `1px solid rgba(0,118,255,${0.07 - i * 0.012})`, borderRadius: "50%", animation: `rotateRing ${18 + i * 7}s linear infinite ${i % 2 ? "reverse" : ""}` }} />
          ))}
        </div>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,118,255,0.08)", border: "1px solid rgba(0,118,255,0.2)", borderRadius: 50, padding: "8px 20px", marginBottom: 36, animation: "fadeInUp 0.6s 0.1s both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0076ff", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 12, color: "#60a5fa", fontWeight: 700, letterSpacing: "0.08em" }}>🇮🇳 FREE TOOLS FOR INDIAN FREELANCERS & BUSINESSES</span>
        </div>

        {/* H1 (SEO Optimized & Mobile Responsive) */}
        <h1 style={{ fontSize: "clamp(24px, 4vw, 46px)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.15, marginBottom: 24, animation: "fadeInUp 0.7s 0.2s both", letterSpacing: "-0.02em", maxWidth: 1000, wordWrap: "break-word" }}>
            <span style={{ background: "var(--hero-highlight)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 5s linear infinite" }}>
            Free Tax Calculators, GST & Business Tools
          </span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>for Indian Freelancers</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "clamp(16px, 2.2vw, 21px)", color: "var(--text-secondary)", maxWidth: 580, lineHeight: 1.7, marginBottom: 48, animation: "fadeInUp 0.7s 0.3s both" }}>
          Free <strong style={{ color: "var(--text-primary)" }}>GST Calculator</strong>, <strong style={{ color: "var(--text-primary)" }}>Invoice Generator</strong>, Email Writer & more — built for <strong style={{ color: "var(--text-primary)" }}>Indian freelancers & small businesses</strong>. No login. No fees. Forever.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 14, marginBottom: 72, flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 0.7s 0.4s both" }}>
          <button className="cta-btn-primary" onClick={() => document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "17px 40px", background: "linear-gradient(135deg, #0284c7, #2563eb)", border: "none", borderRadius: 14, color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: "0 8px 32px rgba(2, 132, 199, 0.35)", transition: "all 0.3s", cursor: "pointer" }}>
            Explore All Tools →
          </button>
          <Link href="/gst-calculator" style={{ textDecoration: 'none' }}>
            <button className="cta-btn-secondary" style={{ padding: "17px 36px", background: "var(--bg-secondary)", border: "1px solid var(--card-border)", boxShadow: "var(--card-shadow)", borderRadius: 14, color: "var(--text-primary)", fontSize: 17, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all 0.3s", cursor: "pointer" }}>
              🧮 GST Calculator
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 0.7s 0.5s both" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "0 36px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid var(--glass-border)" : "none" }}>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.pre ? s.suffix : ""}<Counter end={s.end} suffix={s.pre ? "" : s.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "#475569", fontWeight: 500, marginTop: 6 }}>{s.icon} {s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "floatY 2.5s ease infinite" }}>
          <div style={{ width: 1, height: 52, background: "linear-gradient(180deg, transparent, #6366f1)" }} />
          <span style={{ fontSize: 10, color: "#1e293b", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── SCROLL PATH WORKFLOW ────────────────────────────── */}
      <ScrollPathSection />

      {/* ── TOOLS SECTION ───────────────────────────────────── */}
      <section id="tools-section" style={{ position: "relative", zIndex: 1, padding: "85px 5vw", background: "var(--section-alt-bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#0076ff", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— FREE TOOLS —</p>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: 14, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Everything You Need to<br />
              <span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Run Your Freelance Business</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>Click any tool — no login, no signup, no cost. Ever.</p>
          </div>
        </Reveal>

        {/* Search + Filter */}
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, marginBottom: 44, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: 16 }}>🔍</span>
              <input className="search-box" name="search" aria-label="Search tools" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..."
                style={{ width: "100%", padding: "14px 16px 14px 46px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: 12, fontSize: 15, color: "var(--text-primary)", boxSizing: "border-box", transition: "all 0.3s", fontFamily: "'DM Sans',sans-serif" }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filters.map(f => (
                <button key={f} className="filter-chip" onClick={() => setActiveFilter(f)}
                  style={{ padding: "11px 22px", borderRadius: 10, border: "1px solid", borderColor: activeFilter === f ? "rgba(0,118,255,0.5)" : "var(--glass-border)", background: activeFilter === f ? "rgba(0,118,255,0.12)" : "var(--glass-bg)", color: activeFilter === f ? "#38bdf8" : "var(--text-secondary)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(290px, 100%), 1fr))", gap: 22 }}>
          {filtered.map((tool, i) => (
            <Link key={tool.name} href={tool.page || "#"} style={{ textDecoration: 'none', display: 'block' }}>
              <ToolCard tool={tool} index={i} />
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ───────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "85px 5vw", borderTop: "1px solid var(--border-color)", background: "var(--section-alt-bg-solid)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#00c6ff", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— WHY KAROTOOLS —</p>
              <div style={{ width: 40, height: 4, display: "flex", margin: "0 auto 24px", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ flex: 1, background: "#FF9933" }} />
                <div style={{ flex: 1, background: "#FFFFFF" }} />
                <div style={{ flex: 1, background: "#138808" }} />
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
                Built for India.<br />By Freelancers, for Freelancers.
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="feature-card" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: 20, padding: "28px 26px", transition: "all 0.35s ease", cursor: "default" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TOOLS HIGHLIGHT ──────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "85px 5vw", borderTop: "1px solid var(--border-color)", background: "var(--section-alt-bg)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0076ff", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— MOST USED —</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Most Popular Tools</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 20 }}>
            {[
              { icon: "🧮", title: "Free GST Calculator India", desc: "Calculate CGST, SGST & IGST instantly. All slabs, custom rates, round-off toggle, visual breakdown & copy result.", link: "/gst-calculator", keyword: "GST Calculator India" },
              { icon: "📄", title: "Free GST Invoice Generator", desc: "Create professional GST invoices with PDF download. Your logo, GSTIN, HSN/SAC codes - no software needed.", link: "/gst-invoice-generator", keyword: "Free Invoice Generator" },
              { icon: "💸", title: "Upwork & Fiverr Calculator", desc: "Estimate your true take-home pay in INR. Calculate platform fees, GST reverse charge, 194O TDS, and FX markup loss.", link: "/upwork-fiverr-fee-calculator-india", keyword: "Upwork Fee Calculator" },
              { icon: "💰", title: "Freelance Rate Calculator", desc: "Calculate your perfect freelance hourly, daily & monthly rate in INR based on your expenses.", link: "/freelance-rate-calculator", keyword: "Freelance Rate Calculator" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <PopularToolCard item={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST GST GUIDES ─────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "85px 5vw", borderTop: "1px solid var(--border-color)", background: "var(--section-alt-bg-solid)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#10b981", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— LEARN —</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Latest GST Guides</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 20 }}>
            {[
              { category: "Registration", title: "How to Register for GST Online in India", desc: "A complete step-by-step guide to GST registration online in India. Learn the portal steps, documents required, and limits.", link: "/blog/how-to-register-gst-online" },
              { category: "Rules", title: "GST Composition Scheme Limit 2026", desc: "Learn the GST Composition Scheme limit, eligibility rules, rates, who can opt, and regular GST vs composition GST.", link: "/blog/gst-composition-scheme-limits" },
              { category: "Invoicing", title: "Free GST Invoice Format in Excel", desc: "A detailed guide on mandatory GST invoice fields and how to use our free format.", link: "/guides/gst-invoice-format-excel" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <Link href={item.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: 24, padding: "28px 24px", transition: "transform 0.2s ease, background 0.3s", position: "relative", overflow: "hidden" }}>
                    <span style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", alignSelf: "flex-start", marginBottom: "16px" }}>{item.category}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.4 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, flexGrow: 1 }}>{item.desc}</p>
                    <div style={{ marginTop: 16, color: "#10b981", fontSize: 14, fontWeight: 600 }}>Read guide →</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/blog" style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--text-primary)", paddingBottom: 2 }}>View all guides</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "85px 5vw", borderTop: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0076ff", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>— FAQ —</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
              <p style={{ color: "var(--text-secondary)", marginTop: 12, fontSize: 15 }}>Everything you need to know about KaroTools</p>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="faq-card" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: 16, padding: "24px 28px", transition: "all 0.3s" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{f.q}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75 }}>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "85px 5vw", borderTop: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
        <Reveal>
          <div style={{ maxWidth: 820, margin: "0 auto", background: "linear-gradient(135deg, #0ea5e9, #0284c7)", boxShadow: "0 20px 40px rgba(14, 165, 233, 0.25)", borderRadius: 28, padding: "8vw 5vw", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 300, height: 300, background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ fontSize: 52, marginBottom: 24, position: "relative", zIndex: 2 }}>🚀</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#ffffff", marginBottom: 16, letterSpacing: "-0.025em", position: "relative", zIndex: 2 }}>
              Start Using KaroTools Today — It's Free
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.9)", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px", position: "relative", zIndex: 2 }}>Built for high-demand GST and freelance tax use cases.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
              <Link href="/gst-calculator" style={{ textDecoration: 'none' }}>
                <button className="cta-btn-primary" style={{ padding: "15px 36px", background: "#ffffff", border: "none", borderRadius: 12, color: "#0284c7", fontSize: 16, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: "0 8px 28px rgba(0,0,0,0.15)", cursor: "pointer", transition: "all 0.3s" }}>
                  🧮 GST Calculator →
                </button>
              </Link>
              <Link href="/gst-invoice-generator" style={{ textDecoration: 'none' }}>
                <button className="cta-btn-secondary" style={{ padding: "15px 32px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 12, color: "#ffffff", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
                  📄 Invoice Generator →
                </button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--glass-bg)", padding: "56px 5vw 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 48, marginBottom: 56 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 300 }}>Free online GST calculator, invoice generator and business tools for Indian freelancers and small businesses. No login required.</p>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 16 }}>© 2026 KaroTools.in — Made with ❤️ in India 🇮🇳</p>
              {/* Buy Me A Coffee / UPI Link - Hidden for now
              <a href="https://buymeacoffee.com/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 24, padding: "10px 20px", background: "#f59e0b", color: "#1e293b", fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", borderRadius: 12, textDecoration: "none", fontSize: 14, boxShadow: "0 4px 14px rgba(245,158,11,0.2)" }}>
                ☕ Buy Me A Coffee
              </a>
              */}
            </div>

            {/* Tools */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Tools</p>
              {["GST Calculator", "Invoice Generator", "Rate Calculator", "Tax Calculator"].map(t => (
                <p key={t} className="footer-link" style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}>{t}</p>
              ))}
            </div>

            {/* Company */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Company</p>
              {[
                { name: "About Us", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Guides", path: "/guides" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Use", path: "/terms" }
              ].map(t => (
                <Link key={t.name} href={t.path} className="footer-link" style={{ display: "block", textDecoration: "none", fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}>{t.name}</Link>
              ))}
            </div>

            {/* Resources */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Resources</p>
              <Link href="/guides/gst-for-freelancers-india" className="footer-link" style={{ display: "block", textDecoration: "none", fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, transition: "color 0.2s" }}>GST Guide India</Link>
              <Link href="/blog/how-to-make-gst-invoice-online-free" className="footer-link" style={{ display: "block", textDecoration: "none", fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, transition: "color 0.2s" }}>Invoice Format</Link>
              <Link href="/blog/section-44ada-freelancers" className="footer-link" style={{ display: "block", textDecoration: "none", fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, transition: "color 0.2s" }}>44ADA Tax Tips</Link>
              <Link href="/guides/how-to-price-freelance-services" className="footer-link" style={{ display: "block", textDecoration: "none", fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, transition: "color 0.2s" }}>Rate Guide</Link>
              <Link href="/guides" className="footer-link" style={{ display: "block", textDecoration: "none", fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, transition: "color 0.2s" }}>View All Guides</Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Free GST Calculator India · Free Invoice Generator India · Free Business Tools for Freelancers</p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>KaroTools.in — Karo Business, Bina Hassle Ke</p>
          </div>

          {/* General Website Disclaimer */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, marginTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.6, maxWidth: 1000, margin: "0 auto" }}>
              <strong>Disclaimer:</strong> All calculators and tools on KaroTools.in are provided for educational and informational purposes only. While we strive to keep the logic updated with the latest Indian tax laws (FY 2026-27), the results generated are estimates and do not constitute professional financial, legal, or tax advice. We strongly recommend consulting a certified Chartered Accountant or legal professional before making any business decisions or filing your taxes. KaroTools is not responsible for any financial loss, penalties, or compliance errors resulting from the use of this website.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

