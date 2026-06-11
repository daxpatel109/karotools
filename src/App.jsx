import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loaded components (Code Splitting)
const Home = lazy(() => import("./Home"));
const GSTCalculator = lazy(() => import("./GSTCalculator"));
const InvoiceGenerator = lazy(() => import("./InvoiceGenerator"));
const BioGenerator = lazy(() => import("./BioGenerator"));
const EmailGenerator = lazy(() => import("./EmailGenerator"));
const RateCalculator = lazy(() => import("./RateCalculator"));
const ContractGenerator = lazy(() => import("./ContractGenerator"));
const About = lazy(() => import("./About"));
const Blog = lazy(() => import("./Blog"));
const BlogPost1 = lazy(() => import("./BlogPost1"));
const BlogPost2 = lazy(() => import("./BlogPost2"));
const BlogPost3 = lazy(() => import("./BlogPost3"));
const BlogPost4 = lazy(() => import("./BlogPost4"));
const BlogPost5 = lazy(() => import("./BlogPost5"));
const TaxCalculator = lazy(() => import("./TaxCalculator"));
const Section44ADACalculator = lazy(() => import("./Section44ADACalculator"));
const NormalTaxCalculator = lazy(() => import("./NormalTaxCalculator"));
const AdvanceTaxCalculator = lazy(() => import("./AdvanceTaxCalculator"));
const SalaryVsFreelanceCalculator = lazy(() => import("./SalaryVsFreelanceCalculator"));
const SIPCalculator = lazy(() => import("./SIPCalculator"));
const LateGSTPenalty = lazy(() => import("./LateGSTPenalty"));
const Author = lazy(() => import("./Author"));

// Direct imports for small legal pages are fine, but let's lazy load them too
const PrivacyPolicy = lazy(() => import("./LegalPages").then(module => ({ default: module.PrivacyPolicy })));
const TermsConditions = lazy(() => import("./LegalPages").then(module => ({ default: module.TermsConditions })));
const ContactUs = lazy(() => import("./LegalPages").then(module => ({ default: module.ContactUs })));

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

// Loading Fallback
function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "40px", height: "40px", border: "4px solid rgba(14,165,233,0.1)", borderLeftColor: "#0ea5e9", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Main App — clean router, no dead state or duplicate imports
export default function App() {
  return (
    <main>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gst-calculator" element={<GSTCalculator />} />
          <Route path="/gst-calculator/:keyword" element={<GSTCalculator />} />
          <Route path="/gst-invoice-generator" element={<InvoiceGenerator />} />
          <Route path="/bio-generator" element={<BioGenerator />} />
          <Route path="/email-generator" element={<EmailGenerator />} />
          <Route path="/freelance-rate-calculator" element={<RateCalculator />} />
          <Route path="/contract-generator" element={<ContractGenerator />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/msme-45-day-rule" element={<BlogPost1 />} />
          <Route path="/blog/section-44ada-freelancers" element={<BlogPost2 />} />
          <Route path="/blog/advance-tax-for-freelancers-india" element={<BlogPost3 />} />
          <Route path="/blog/freelance-hourly-rate-vs-salary-india" element={<BlogPost4 />} />
          <Route path="/blog/make-gst-invoice-online-free" element={<BlogPost5 />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          <Route path="/44ada-tax-calculator" element={<Section44ADACalculator />} />
          <Route path="/normal-tax-calculator" element={<NormalTaxCalculator />} />
          <Route path="/advance-tax-calculator" element={<AdvanceTaxCalculator />} />
          <Route path="/salary-vs-freelance" element={<SalaryVsFreelanceCalculator />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/late-gst-penalty-calculator" element={<LateGSTPenalty />} />
          <Route path="/author/dax-patel" element={<Author />} />
          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
}
