"use client";
import { SchemaScript, generateBreadcrumbSchema, generateOrganizationSchema } from "./lib/schema";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { formatSafeDate } from "./lib/dateUtils";

const legalContainerStyle = {
  minHeight: "100vh",
  background: "var(--bg-secondary)",
  fontFamily: "'DM Sans', sans-serif",
  color: "var(--text-primary)",
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
  borderBottom: "1px solid var(--glass-bg)"
};

const contentStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  background: "var(--glass-bg)",
  border: "1px solid var(--glass-bg)",
  borderRadius: "24px",
  padding: "48px",
  boxShadow: "0 24px 60px -12px rgba(0,0,0,0.4)"
};

const h1Style = {
  fontSize: "36px",
  fontWeight: "800",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  color: "var(--text-primary)",
  marginBottom: "16px",
  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const h2Style = {
  fontSize: "20px",
  fontWeight: "700",
  color: "var(--text-primary)",
  marginTop: "32px",
  marginBottom: "16px",
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

const dateStyle = {
  fontSize: "14px",
  color: "var(--text-secondary)",
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
      <Navbar />
      <div style={contentStyle}>
        <h1 style={h1Style}>Privacy Policy</h1>
        <span style={dateStyle}>Effective Date: {formatSafeDate(new Date())}</span>

        <p>KaroTools ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by KaroTools in accordance with the Information Technology Act, 2000 (India) and the General Data Protection Regulation (GDPR).</p>

        <h2 style={h2Style}>1. Information We Collect</h2>
        <p>We do not require you to create an account to use our core tools. We only collect:</p>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px", color: "var(--text-primary)" }}>
          <li style={{ marginBottom: "8px" }}><strong>Usage Data:</strong> Through Google Analytics (IP address, browser type, pages visited) to improve our software.</li>
          <li style={{ marginBottom: "8px" }}><strong>Local Storage:</strong> Our calculators (like the GST Calculator) may store your recent history in your browser's local storage. This data never leaves your device.</li>
        </ul>

        <h2 style={h2Style}>2. How We Use Your Information</h2>
        <p>Any data collected is used solely to provide, maintain, and improve our enterprise software solutions. We do not sell your personal data to third parties under any circumstances.</p>

        <h2 style={h2Style}>3. Advertising & Cookies</h2>
        <p>We may use Google AdSense to serve ads. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our site. You may opt out of personalized advertising by visiting Google Ads Settings.</p>

        <h2 style={h2Style}>4. Data Security</h2>
        <p>We employ enterprise-grade security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. Our website is secured via SSL/TLS encryption. However, please be aware that no method of transmission over the internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h2 style={h2Style}>5. Third-Party Services and Links</h2>
        <p>KaroTools may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party websites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>

        <h2 style={h2Style}>6. Your Data Protection Rights</h2>
        <p>Depending on your location, you may have certain data protection rights, such as the right to access, update, or delete the personal information we have on you. You also have the right to object to our processing of your personal data, the right to request restriction of processing, and the right to data portability. Since we do not require account creation, the data we hold is strictly limited to anonymous analytics and standard web server logs.</p>

        <h2 style={h2Style}>7. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

        <h2 style={h2Style}>8. Contact Us</h2>
        <p>For any privacy-related inquiries, data deletion requests, or questions regarding our data processing practices, please contact our Data Protection Officer at: <strong style={{ color: "#a78bfa" }}>support@karotools.in</strong></p>
        <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Privacy Policy", url: "https://karotools.in/privacy-policy"}])} />
        <SchemaScript schema={generateOrganizationSchema()} />
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
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", padding: "8px 16px", background: "var(--glass-bg)", borderRadius: "8px" }}>← Back to Home</Link>
      </nav>
      <div style={contentStyle}>
        <h1 style={h1Style}>Terms & Conditions</h1>
        <span style={dateStyle}>Effective Date: {formatSafeDate(new Date())}</span>

        <p>These terms and conditions outline the rules and regulations for the use of KaroTools' Website and Enterprise Software Suite.</p>

        <h2 style={h2Style}>1. Acceptance of Terms</h2>
        <p>By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use KaroTools if you do not accept all of the terms and conditions stated on this page.</p>

        <h2 style={h2Style}>2. License & Use of Tools</h2>
        <p>KaroTools grants you a non-exclusive, non-transferable, limited license to use our web-based tools (GST Calculator, Invoice Generator, etc.) for your personal or business operations. You may not:</p>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px", color: "var(--text-primary)" }}>
          <li style={{ marginBottom: "8px" }}>Republish material, code, or algorithms from KaroTools.</li>
          <li style={{ marginBottom: "8px" }}>Sell, rent, or sub-license material from KaroTools.</li>
          <li style={{ marginBottom: "8px" }}>Attempt to reverse-engineer any software contained on the website.</li>
        </ul>

        <h2 style={h2Style}>3. Disclaimer of Liability</h2>
        <p>While we strive for 100% accuracy, the GST rates, calculations, and generated invoices are provided "as is" for informational purposes. KaroTools is not a registered tax advisory firm. You are strictly advised to consult with a certified Chartered Accountant (CA) for final tax filings. We shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of our software.</p>

        <h2 style={h2Style}>4. User Responsibilities</h2>
        <p>As a user of KaroTools, you agree to use our software responsibly and strictly for lawful purposes. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity. You are solely responsible for verifying the accuracy of the outputs generated by our calculators before using them in official documents or tax filings.</p>

        <h2 style={h2Style}>5. Intellectual Property Rights</h2>
        <p>Unless otherwise stated, KaroTools and/or its licensors own the intellectual property rights for all material, UI designs, code, algorithms, and text on this website. All intellectual property rights are reserved. You may access this from KaroTools for your own personal and business use subjected to restrictions set in these terms and conditions. Unauthorized copying, distribution, or reproduction of our proprietary tools is strictly prohibited and will result in immediate legal action under the applicable intellectual property laws of India.</p>

        <h2 style={h2Style}>6. Termination of Access</h2>
        <p>We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the website will immediately cease.</p>

        <h2 style={h2Style}>7. Governing Law and Jurisdiction</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in India for the resolution of any disputes arising out of or related to the use of this website.</p>

        <h2 style={h2Style}>8. Modifications to Terms</h2>
        <p>KaroTools reserves the right to revise these terms at any time as it sees fit. By using this website, you are expected to review these Terms on a regular basis to ensure you understand all terms and conditions governing use of this website. Your continued use of the site following the posting of changes will mean that you accept and agree to the changes.</p>
        <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Terms", url: "https://karotools.in/terms"}])} />
        <SchemaScript schema={generateOrganizationSchema()} />
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
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", padding: "8px 16px", background: "var(--glass-bg)", borderRadius: "8px" }}>← Back to Home</Link>
      </nav>
      <div style={contentStyle}>
        <h1 style={h1Style}>Contact Our Team</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "32px", lineHeight: 1.8 }}>We build enterprise-grade tools for modern Indian businesses. Our mission is to empower freelancers, consultants, and small business owners with completely free, loginless, and highly accurate tools. Whether you need support with a specific calculator, want to report a technical bug, or wish to inquire about strategic business partnerships, our dedicated team is always here to help you succeed.</p>
        
        <div style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px", marginBottom: "48px" }}>
          <div>
            <span style={{ display: "block", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", fontWeight: "700", marginBottom: "8px" }}>General Support & Inquiries</span>
            <a href="mailto:support@karotools.in" style={{ fontSize: "20px", fontWeight: "700", color: "#a78bfa", textDecoration: "none" }}>support@karotools.in</a>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>For tool assistance, feature requests, or reporting calculation discrepancies. We value user feedback as it directly shapes our product roadmap.</p>
          </div>
          
          <div>
            <span style={{ display: "block", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", fontWeight: "700", marginBottom: "8px" }}>Partnerships & Media</span>
            <span style={{ fontSize: "16px", color: "var(--text-primary)" }}>partner@karotools.in</span>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>For press inquiries, brand collaborations, advertising opportunities, and API access requests.</p>
          </div>

          <div>
            <span style={{ display: "block", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", fontWeight: "700", marginBottom: "8px" }}>Headquarters</span>
            <span style={{ fontSize: "16px", color: "var(--text-primary)", display: "block", lineHeight: 1.6 }}>Digital First India<br/>Mumbai, Maharashtra<br/>India</span>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "24px", borderTop: "1px solid var(--glass-bg)" }}>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0, fontWeight: "600" }}>Operating Hours: Monday to Friday, 10:00 AM – 6:00 PM (IST). We typically respond to all inquiries within 24-48 business hours.</p>
          </div>
        </div>

        <h2 style={h2Style}>Frequently Asked Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "8px" }}>How quickly do you resolve bug reports?</h3>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>Critical calculation errors are triaged and patched within 24 hours. UI/UX issues are generally resolved in our weekly deployment cycle.</p>
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "8px" }}>Do you offer phone support?</h3>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>Currently, we offer strictly email-based support to ensure we can maintain our tools as a 100% free service for all Indian freelancers.</p>
          </div>
        </div>
        <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "Contact Us", url: "https://karotools.in/contact"}])} />
<SchemaScript schema={generateOrganizationSchema()} />
      </div>
    </div>
  );
}
