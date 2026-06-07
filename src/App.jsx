import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import GSTCalculator from "./GSTCalculator";
import InvoiceGenerator from "./InvoiceGenerator";
import BioGenerator from "./BioGenerator";
import EmailGenerator from "./EmailGenerator";
import RateCalculator from "./RateCalculator";
import ContractGenerator from "./ContractGenerator";
import About from "./About";
import Blog from "./Blog";
import BlogPost1 from "./BlogPost1";
import BlogPost2 from "./BlogPost2";
import TaxCalculator from "./TaxCalculator";
import { PrivacyPolicy, TermsConditions, ContactUs } from "./LegalPages";

// 404 Not Found page
function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", background: "#020617",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", color: "#f1f5f9",
      textAlign: "center", padding: "24px"
    }}>
      <div style={{ fontSize: "80px", marginBottom: "24px" }}>🔍</div>
      <h1 style={{
        fontSize: "48px", fontWeight: "800",
        fontFamily: "'Syne', sans-serif",
        background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: "16px"
      }}>
        404 — Page Not Found
      </h1>
      <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "40px", maxWidth: "400px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" style={{
        padding: "16px 36px",
        background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
        borderRadius: "14px", color: "#fff",
        fontSize: "16px", fontWeight: "700",
        textDecoration: "none",
        fontFamily: "'Syne', sans-serif",
        boxShadow: "0 8px 32px rgba(14,165,233,0.35)"
      }}>
        ← Back to KaroTools
      </a>
    </div>
  );
}

// Main App — clean router, no dead state or duplicate imports
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gst-calculator" element={<GSTCalculator />} />
      <Route path="/invoice-generator" element={<InvoiceGenerator />} />
      <Route path="/bio-generator" element={<BioGenerator />} />
      <Route path="/email-generator" element={<EmailGenerator />} />
      <Route path="/rate-calculator" element={<RateCalculator />} />
      <Route path="/contract-generator" element={<ContractGenerator />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/msme-45-day-rule" element={<BlogPost1 />} />
      <Route path="/blog/section-44ada-freelancers" element={<BlogPost2 />} />
      <Route path="/tax-calculator" element={<TaxCalculator />} />
      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
