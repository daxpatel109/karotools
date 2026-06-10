import { useEffect } from "react";
import { Link } from "react-router-dom";

const legalContainerStyle = {
  minHeight: "100vh",
  background: "#080814",
  fontFamily: "'DM Sans', sans-serif",
  color: "#e2e8f0",
  padding: "48px 20px 80px",
  lineHeight: "1.8",
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "960px",
  margin: "0 auto 48px",
  paddingBottom: "24px",
  borderBottom: "1px solid rgba(255,255,255,0.05)"
};

const contentStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "24px",
  padding: "48px",
  boxShadow: "0 24px 60px -12px rgba(0,0,0,0.4)"
};

const h1Style = {
  fontSize: "36px",
  fontWeight: "800",
  fontFamily: "'Syne', sans-serif",
  color: "#f8fafc",
  marginBottom: "16px",
  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const h2Style = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#f1f5f9",
  marginTop: "32px",
  marginBottom: "16px",
  fontFamily: "'Syne', sans-serif"
};

const dateStyle = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "40px",
  display: "block"
};

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | KaroTools Enterprise";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={legalContainerStyle}>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        <Link to="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>← Back to Home</Link>
      </nav>
      <div style={contentStyle}>
        <h1 style={h1Style}>Privacy Policy</h1>
        <span style={dateStyle}>Effective Date: {new Date().toLocaleDateString('en-IN')}</span>

        <p>KaroTools ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by KaroTools in accordance with the Information Technology Act, 2000 (India) and the General Data Protection Regulation (GDPR).</p>

        <h2 style={h2Style}>1. Information We Collect</h2>
        <p>We do not require you to create an account to use our core tools. We only collect:</p>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px", color: "#cbd5e1" }}>
          <li style={{ marginBottom: "8px" }}><strong>Usage Data:</strong> Through Google Analytics (IP address, browser type, pages visited) to improve our software.</li>
          <li style={{ marginBottom: "8px" }}><strong>Local Storage:</strong> Our calculators (like the GST Calculator) may store your recent history in your browser's local storage. This data never leaves your device.</li>
        </ul>

        <h2 style={h2Style}>2. How We Use Your Information</h2>
        <p>Any data collected is used solely to provide, maintain, and improve our enterprise software solutions. We do not sell your personal data to third parties under any circumstances.</p>

        <h2 style={h2Style}>3. Advertising & Cookies</h2>
        <p>We may use Google AdSense to serve ads. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our site. You may opt out of personalized advertising by visiting Google Ads Settings.</p>

        <h2 style={h2Style}>4. Data Security</h2>
        <p>We employ enterprise-grade security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. Our website is secured via SSL/TLS encryption.</p>

        <h2 style={h2Style}>5. Contact Us</h2>
        <p>For any privacy-related inquiries or data deletion requests, please contact our Data Protection Officer at: <strong style={{ color: "#a78bfa" }}>support@karotools.in</strong></p>
      </div>
    </div>
  );
}

export function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | KaroTools Enterprise";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={legalContainerStyle}>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        <Link to="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>← Back to Home</Link>
      </nav>
      <div style={contentStyle}>
        <h1 style={h1Style}>Terms & Conditions</h1>
        <span style={dateStyle}>Effective Date: {new Date().toLocaleDateString('en-IN')}</span>

        <p>These terms and conditions outline the rules and regulations for the use of KaroTools' Website and Enterprise Software Suite.</p>

        <h2 style={h2Style}>1. Acceptance of Terms</h2>
        <p>By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use KaroTools if you do not accept all of the terms and conditions stated on this page.</p>

        <h2 style={h2Style}>2. License & Use of Tools</h2>
        <p>KaroTools grants you a non-exclusive, non-transferable, limited license to use our web-based tools (GST Calculator, Invoice Generator, etc.) for your personal or business operations. You may not:</p>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px", color: "#cbd5e1" }}>
          <li style={{ marginBottom: "8px" }}>Republish material, code, or algorithms from KaroTools.</li>
          <li style={{ marginBottom: "8px" }}>Sell, rent, or sub-license material from KaroTools.</li>
          <li style={{ marginBottom: "8px" }}>Attempt to reverse-engineer any software contained on the website.</li>
        </ul>

        <h2 style={h2Style}>3. Disclaimer of Liability</h2>
        <p>While we strive for 100% accuracy, the GST rates, calculations, and generated invoices are provided "as is" for informational purposes. KaroTools is not a registered tax advisory firm. You are strictly advised to consult with a certified Chartered Accountant (CA) for final tax filings. We shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of our software.</p>

        <h2 style={h2Style}>4. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in India.</p>

        <h2 style={h2Style}>5. Modifications</h2>
        <p>KaroTools reserves the right to revise these terms at any time. By using this website, you are expected to review these Terms on a regular basis.</p>
      </div>
    </div>
  );
}

export function ContactUs() {
  useEffect(() => {
    document.title = "Contact Us | KaroTools Enterprise";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={legalContainerStyle}>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        <Link to="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>← Back to Home</Link>
      </nav>
      <div style={contentStyle}>
        <h1 style={h1Style}>Contact Our Team</h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "32px" }}>We build enterprise-grade tools for modern Indian businesses. Whether you need support, want to report a bug, or inquire about business partnerships, we are here to help.</p>
        
        <div style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <span style={{ display: "block", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: "700", marginBottom: "8px" }}>General Support & Inquiries</span>
            <a href="mailto:support@karotools.in" style={{ fontSize: "20px", fontWeight: "700", color: "#a78bfa", textDecoration: "none" }}>support@karotools.in</a>
          </div>
          
          <div>
            <span style={{ display: "block", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: "700", marginBottom: "8px" }}>Headquarters</span>
            <span style={{ fontSize: "16px", color: "#cbd5e1" }}>Digital First<br/>India</span>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>We typically respond to all inquiries within 24-48 business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
