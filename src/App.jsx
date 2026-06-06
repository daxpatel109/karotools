import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import GSTCalculator from "./GSTCalculator";
import InvoiceGenerator from "./InvoiceGenerator";
import BioGenerator from "./BioGenerator";
import EmailGenerator from "./EmailGenerator";
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
  if (currentPage === "invoice") {
    return <InvoiceGenerator />;
}

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
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gst-calculator" element={<GSTCalculator />} />
      <Route path="/invoice-generator" element={<InvoiceGenerator />} />
      <Route path="/bio-generator" element={<BioGenerator />} />
      <Route path="/email-generator" element={<EmailGenerator />} />
      <Route path="/rate-calculator" element={<RateCalculator />} />
    </Routes>
  );
}
