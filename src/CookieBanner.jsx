"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("karotools_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("karotools_cookie_consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "20px",
      right: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      background: "rgba(15, 23, 42, 0.95)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      zIndex: 9999,
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <div style={{ fontSize: "24px" }}>🍪</div>
        <div>
          <h3 style={{ margin: "0 0 8px 0", color: "var(--text-primary)", fontSize: "16px", fontWeight: "700" }}>We value your privacy</h3>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>
            We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            Read our <Link href="/privacy-policy" style={{ color: "#38bdf8", textDecoration: "none" }}>Privacy Policy</Link> for more information.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <button 
          onClick={acceptCookies}
          style={{ 
            background: "linear-gradient(135deg, #0076ff, #10b981)", 
            color: "white", 
            border: "none", 
            padding: "10px 24px", 
            borderRadius: "8px", 
            fontSize: "14px", 
            fontWeight: "600", 
            cursor: "pointer",
            transition: "opacity 0.2s"
          }}
          onMouseEnter={e => e.target.style.opacity = 0.9}
          onMouseLeave={e => e.target.style.opacity = 1}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
