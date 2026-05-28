import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import GSTCalculator from "./GSTCalculator";
import BioGenerator from "./BioGenerator";
import RateCalculator from "./RateCalculator";
import InvoiceGenerator from "./InvoiceGenerator";
import EmailGenerator from "./EmailGenerator";

// Custom Cursor (Teal/Blue aesthetic)
function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX, y = e.clientY;
      if (cursorRef.current) { 
        cursorRef.current.style.left = x + "px"; 
        cursorRef.current.style.top = y + "px"; 
      }
      setTimeout(() => { 
        if (followerRef.current) { 
          followerRef.current.style.left = x + "px"; 
          followerRef.current.style.top = y + "px"; 
        } 
      }, 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{ position: "fixed", width: "8px", height: "8px", background: "#14b8a6", borderRadius: "50%", pointerEvents: "none", zIndex: 99999, transform: "translate(-50%,-50%)", boxShadow: "0 0 10px #14b8a6, 0 0 20px #14b8a6" }} />
      <div ref={followerRef} style={{ position: "fixed", width: "32px", height: "32px", border: "2px solid rgba(14, 165, 233, 0.4)", borderRadius: "50%", pointerEvents: "none", zIndex: 99998, transform: "translate(-50%,-50%)", transition: "left 0.08s ease, top 0.08s ease" }} />
    </>
  );
}

// Minimal Ambient Particles
function Particles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({ 
    id: i, x: Math.random() * 100, y: Math.random() * 100, 
    size: Math.random() * 3 + 1, duration: Math.random() * 10 + 10, delay: Math.random() * 5 
  }));
  
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: p.x + "%", top: p.y + "%", width: p.size + "px", height: p.size + "px", borderRadius: "50%", background: `rgba(14, 165, 233, 0.25)`, animation: `float ${p.duration}s ${p.delay}s infinite ease-in-out alternate` }} />
      ))}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px) scale(1); opacity: 0.2; } 100% { transform: translateY(-50px) scale(1.5); opacity: 0.6; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 3px; }
      `}</style>
    </div>
  );
}

// Advanced 3D Tool Card with Dynamic Glare
function ToolCard({ tool, index, onClick }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => { setTimeout(() => setVisible(true), index * 80); }, [index]);
  
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth 3D Math
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(14, 165, 233, 0.15), 0 10px 40px rgba(0,0,0,0.4)`;
    
    // Dynamic Light Glare
    glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;
  };
  
  const handleMouseLeave = () => {
    if (cardRef.current) { 
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)"; 
      cardRef.current.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; 
    }
    if (glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  };

  // Premium Blue/Teal Palette
  const colors = ["#0ea5e9", "#14b8a6", "#3b82f6", "#06b6d4"];
  const color = colors[index % colors.length];

  return (
    <div ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ 
        background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", 
        backdropFilter: "blur(24px)", 
        border: "1px solid rgba(255,255,255,0.08)", 
        borderRadius: "20px", padding: "32px 28px", 
        cursor: tool.page ? "pointer" : "default", 
        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease", 
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)", 
        opacity: visible ? 1 : 0, 
        animation: visible ? `fadeInUp 0.5s ${index * 0.08}s both` : "none", 
        position: "relative", overflow: "hidden" 
      }}>
      
      {/* Glare Layer */}
      <div ref={glareRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", transition: "background 0.1s ease" }} />
      
      {/* Top Accent Line */}
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1.5px", background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      
      <div style={{ width: "52px", height: "52px", borderRadius: "14px", marginBottom: "20px", background: `linear-gradient(135deg, ${color}22, ${color}05)`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{tool.icon}</div>
      <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", marginBottom: "10px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>{tool.name}</h4>
      <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "20px", lineHeight: "1.6" }}>{tool.description}</p>
      
      <span style={{ background: `rgba(255,255,255,0.03)`, color: color, padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", border: `1px solid ${color}33`, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {tool.category}
      </span>
      
      {tool.page ? (
        <div style={{ position: "absolute", bottom: "24px", right: "24px", color: color, fontSize: "20px", opacity: 0.8 }}>→</div>
      ) : (
        <div style={{ position: "absolute", bottom: "24px", right: "24px", fontSize: "10px", color: "#64748b", fontWeight: "700", letterSpacing: "0.1em" }}>SOON</div>
      )}
    </div>
  );
}

// Home Page
function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // SERP Optimization
  useEffect(() => {
    document.title = "Free Business & SaaS Tools for Indian Freelancers | KaroTools";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "KaroTools provides free, premium tools for Indian freelancers. Generate GST invoices, calculate tax slabs, and write professional bios. No login required.";

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tools = [
    { icon: "🧮", name: "GST Calculator", description: "Instantly calculate inclusive or exclusive GST for all Indian tax slabs.", category: "Finance", page: "/gst-calculator" },
    { icon: "📄", name: "Invoice Generator", description: "Generate professional, ready-to-download GST invoices in seconds.", category: "Finance", page: "/invoice-generator" },
    { icon: "💰", name: "Rate Calculator", description: "Calculate optimal freelance project rates and hourly targets in INR.", category: "Finance", page: "/rate-calculator" },
    { icon: "📱", name: "Bio Generator", description: "Generate highly optimized bios for LinkedIn and Instagram.", category: "Marketing", page: "/bio-generator" },
    { icon: "📧", name: "Email Generator", description: "Draft polished, professional client emails and pitches effortlessly.", category: "Marketing", page: "/email-generator" },
    { icon: "🏢", name: "Name Generator", description: "Discover available, professional brand names for your new agency.", category: "Branding" },
    { icon: "📝", name: "Proposal Maker", description: "Draft winning freelance proposals with precise scopes of work.", category: "Legal" },
    { icon: "📋", name: "Contract Builder", description: "Create standard freelance service agreements to protect your work.", category: "Legal" },
  ];

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <Cursor />
      <Particles />
      
      {/* Deep Ambient Background Mesh */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 20% 10%, rgba(14, 165, 233, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(20, 184, 166, 0.05) 0%, transparent 60%)" }} />

      {/* Navbar */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 40px", height: "76px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(2, 6, 23, 0.85)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s ease", animation: "slideDown 0.6s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 20px rgba(14, 165, 233, 0.3)" }}>⚡</div>
          <span style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne', sans-serif", color: "#ffffff", letterSpacing: "-0.02em" }}>KaroTools</span>
        </div>
        <nav style={{ display: "flex", gap: "12px" }}>
          {["Tools", "Pricing", "About"].map(item => (
            <button key={item} style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#94a3b8", fontSize: "14px", fontWeight: "600", borderRadius: "8px", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.color = "#ffffff"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.target.style.color = "#94a3b8"; e.target.style.background = "transparent"; }}
            >{item}</button>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "180px 20px 120px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(14, 165, 233, 0.1)", border: "1px solid rgba(14, 165, 233, 0.2)", borderRadius: "50px", padding: "8px 20px", marginBottom: "36px", animation: "fadeInUp 0.6s 0.1s both" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block", boxShadow: "0 0 10px #0ea5e9" }} />
          <span style={{ fontSize: "13px", color: "#38bdf8", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase" }}>Free for Indian Freelancers</span>
        </div>
        
        <h1 style={{ fontSize: "clamp(48px, 8vw, 84px)", fontWeight: "800", fontFamily: "'Syne', sans-serif", lineHeight: "1.05", marginBottom: "28px", letterSpacing: "-0.03em", color: "#ffffff", animation: "fadeInUp 0.6s 0.2s both" }}>
          Karo Business,<br />
          <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #14b8a6 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
            Bina Hassle Ke.
          </span>
        </h1>
        
        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "480px", margin: "0 auto 56px", lineHeight: "1.6", fontWeight: "400", animation: "fadeInUp 0.6s 0.3s both" }}>
          The minimal, premium toolkit to manage your freelance operations. Free forever. No account required.
        </p>
        
        <div style={{ position: "relative", maxWidth: "540px", margin: "0 auto", animation: "fadeInUp 0.6s 0.4s both" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools (e.g., Invoice, GST)..."
            style={{ width: "100%", padding: "20px 32px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", fontSize: "16px", color: "#f8fafc", outline: "none", backdropFilter: "blur(24px)", boxSizing: "border-box", transition: "all 0.3s ease" }}
            onFocus={e => { e.target.style.borderColor = "rgba(14, 165, 233, 0.4)"; e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.boxShadow = "0 0 40px rgba(14, 165, 233, 0.15)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.03)"; e.target.style.boxShadow = "none"; }}
          />
        </div>
      </section>

      {/* Tools Grid Section */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 40px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {filtered.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} onClick={() => tool.page && navigate(tool.page)} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>© 2026 KaroTools.in — Made for India.</span>
        <span style={{ fontSize: "13px", color: "#475569", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>100% Free Tools</span>
      </footer>
    </main>
  );
}

// Main App with Routes
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gst-calculator" element={<GSTCalculator />} />
      <Route path="/rate-calculator" element={<RateCalculator />} />
      <Route path="/bio-generator" element={<BioGenerator />} />
      <Route path="/invoice-generator" element={<InvoiceGenerator />} />
      <Route path="/email-generator" element={<EmailGenerator />} />
    </Routes>
  );
}
