import { useState, useEffect, useRef } from "react";
import GSTCalculator from "./GSTCalculator";
import BioGenerator from "./BioGenerator";
import RateCalculator from "./RateCalculator";
import InvoiceGenerator from "./InvoiceGenerator";

// Custom Cursor
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
      <div ref={cursorRef} style={{
        position: "fixed", width: "10px", height: "10px",
        background: "#a78bfa", borderRadius: "50%", pointerEvents: "none",
        zIndex: 99999, transform: "translate(-50%,-50%)",
        boxShadow: "0 0 10px #a78bfa, 0 0 20px #a78bfa",
        transition: "transform 0.1s"
      }} />
      <div ref={followerRef} style={{
        position: "fixed", width: "35px", height: "35px",
        border: "2px solid rgba(167,139,250,0.5)", borderRadius: "50%",
        pointerEvents: "none", zIndex: 99998, transform: "translate(-50%,-50%)",
        transition: "left 0.08s ease, top 0.08s ease",
        backdropFilter: "blur(2px)"
      }} />
    </>
  );
}

// Floating Particles
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: p.x + "%",
          top: p.y + "%",
          width: p.size + "px",
          height: p.size + "px",
          borderRadius: "50%",
          background: `rgba(167,139,250,${Math.random() * 0.4 + 0.1})`,
          animation: `float ${p.duration}s ${p.delay}s infinite ease-in-out alternate`,
          boxShadow: `0 0 ${p.size * 3}px rgba(167,139,250,0.5)`
        }} />
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.3; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(167,139,250,0.3); }
          50% { box-shadow: 0 0 40px rgba(167,139,250,0.7), 0 0 60px rgba(139,92,246,0.4); }
        }
        @keyframes rotateBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f0f1a; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }
      `}</style>
    </div>
  );
}

// 3D Tool Card
function ToolCard({ tool, index, onClick }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), index * 100);
  }, [index]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 40px rgba(124,58,237,0.4), 0 20px 60px rgba(0,0,0,0.5)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
      cardRef.current.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
    }
  };

  const colors = ["#7c3aed", "#2563eb", "#0891b2", "#059669", "#d97706", "#dc2626", "#7c3aed", "#9333ea"];
  const color = colors[index % colors.length];

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "28px",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        opacity: visible ? 1 : 0,
        animation: visible ? `fadeInUp 0.6s ${index * 0.08}s both` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow top border */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }} />

      {/* Icon */}
      <div style={{
        width: "56px", height: "56px", borderRadius: "16px", marginBottom: "16px",
        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
        border: `1px solid ${color}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "28px",
        boxShadow: `0 4px 20px ${color}33`
      }}>
        {tool.icon}
      </div>

      <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#f1f5f9", marginBottom: "8px", fontFamily: "'Syne', sans-serif" }}>
        {tool.name}
      </h4>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px", lineHeight: "1.5" }}>
        {tool.description}
      </p>
      <span style={{
        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
        color: color, padding: "4px 12px", borderRadius: "20px",
        fontSize: "11px", fontWeight: "700", border: `1px solid ${color}33`,
        letterSpacing: "0.05em", textTransform: "uppercase"
      }}>
        {tool.category}
      </span>

      {tool.page ? (
        <div style={{
          position: "absolute", bottom: "16px", right: "16px",
          color: color, fontSize: "18px", opacity: 0.7
        }}>→</div>
      ) : (
        <div style={{
          position: "absolute", bottom: "16px", right: "16px",
          fontSize: "10px", color: "#475569", fontWeight: "600",
          letterSpacing: "0.1em"
        }}>COMING SOON</div>
      )}
    </div>
  );
}

// Main App
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  

  if (currentPage === "gst") return <GSTCalculator onBack={() => setCurrentPage("home")} />;
  if (currentPage === "bio") return <BioGenerator onBack={() => setCurrentPage("home")} />;
  if (currentPage === "rate") return <RateCalculator onBack={() => setCurrentPage("home")} />;
  if (currentPage === "invoice") return <InvoiceGenerator onBack={() => setCurrentPage("home")} />;

  const tools = [
    { icon: "🧮", name: "GST Calculator", description: "Calculate GST instantly. Supports all slabs — 5%, 12%, 18%, 28%.", category: "Finance", page: "gst" },
   { icon: "📄", name: "Invoice Generator", description: "Create professional GST invoices and download as PDF.", category: "Finance", page: "invoice" },
    { icon: "📝", name: "Proposal Generator", description: "Write winning freelance proposals with AI in seconds.", category: "AI Tool" },
    { icon: "📧", name: "Email Generator", description: "Generate professional business emails instantly.", category: "AI Tool" },
    { icon: "🏢", name: "Business Name Generator", description: "Find the perfect name for your Indian business.", category: "AI Tool" },
    { icon: "📱", name: "Bio Generator", description: "Create catchy Instagram & LinkedIn bios with AI.", category: "AI Tool", page: "bio" },
    { icon: "💰", name: "Rate Calculator", description: "Calculate your perfect freelance rate in INR.", category: "Finance", page: "rate" },
    { icon: "📋", name: "Contract Generator", description: "Generate freelance contracts instantly.", category: "Legal" },
  ];

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#080814", fontFamily: "'DM Sans', sans-serif", color: "#f1f5f9", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <Cursor />
      <Particles />

      {/* Background mesh */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(37,99,235,0.1) 0%, transparent 60%)"
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 40px",
        height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s ease",
        animation: "slideDown 0.6s ease both"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", boxShadow: "0 0 20px rgba(124,58,237,0.5)"
          }}>⚡</div>
          <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            KaroTools
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Tools", "Pricing", "About"].map(item => (
            <button key={item} style={{
              padding: "8px 16px", background: "transparent", border: "none",
              color: "#94a3b8", fontSize: "14px", fontWeight: "500",
              borderRadius: "8px", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.color = "#f1f5f9"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.target.style.color = "#94a3b8"; e.target.style.background = "transparent"; }}
            >{item}</button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "180px 20px 100px" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: "50px", padding: "6px 16px", marginBottom: "32px",
          animation: "fadeInUp 0.6s 0.1s both"
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "13px", color: "#a78bfa", fontWeight: "600" }}>Free for Indian Freelancers</span>
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 80px)", fontWeight: "800",
          fontFamily: "'Syne', sans-serif", lineHeight: "1.1",
          marginBottom: "24px", animation: "fadeInUp 0.6s 0.2s both",
          background: "linear-gradient(135deg, #f1f5f9 0%, #a78bfa 50%, #60a5fa 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "fadeInUp 0.6s 0.2s both, shimmer 4s linear infinite"
        }}>
          Karo Business,<br />Bina Hassle Ke! 🚀
        </h1>

        <p style={{
          fontSize: "18px", color: "#94a3b8", marginBottom: "48px",
          maxWidth: "500px", margin: "0 auto 48px", lineHeight: "1.6",
          animation: "fadeInUp 0.6s 0.3s both"
        }}>
          Free AI-powered tools for Indian freelancers &amp; small businesses. No login required.
        </p>

        {/* Search */}
        <div style={{
          position: "relative", maxWidth: "480px", margin: "0 auto",
          animation: "fadeInUp 0.6s 0.4s both"
        }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Search tools..."
            style={{
              width: "100%", padding: "16px 24px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50px", fontSize: "16px",
              color: "#f1f5f9", outline: "none",
              backdropFilter: "blur(20px)",
              boxSizing: "border-box",
              transition: "all 0.3s"
            }}
            onFocus={e => { e.target.style.borderColor = "rgba(167,139,250,0.5)"; e.target.style.boxShadow = "0 0 30px rgba(124,58,237,0.2)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "48px",
          marginTop: "64px", animation: "fadeInUp 0.6s 0.5s both"
        }}>
          {[["8+", "Free Tools"], ["0₹", "Forever Free"], ["100%", "No Login"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 40px 100px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}>
            All Tools
          </h2>
          <p style={{ color: "#64748b", marginTop: "8px" }}>Click any tool to start using it instantly</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px"
        }}>
          {filtered.map((tool, i) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              index={i}
              onClick={() => tool.page && setCurrentPage(tool.page)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "32px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontSize: "14px", color: "#475569" }}>© 2026 KaroTools.in — Made with ❤️ for India</span>
        <span style={{ fontSize: "13px", color: "#334155" }}>Free forever. No login. No BS.</span>
      </footer>
    </div>
  );
}
