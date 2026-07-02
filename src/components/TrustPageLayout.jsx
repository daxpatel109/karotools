import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import { Calendar, ShieldCheck, ArrowLeft } from 'lucide-react';

export function TrustSectionCard({ title, children, icon: Icon, style = {} }) {
  return (
    <section className="trust-card" style={{
      background: "var(--glass-bg)",
      padding: "32px",
      borderRadius: "24px",
      border: "1px solid var(--glass-border)",
      marginBottom: "32px",
      boxShadow: "var(--card-shadow)",
      ...style
    }}>
      {title && (
        <h2 style={{
          fontSize: "22px",
          fontWeight: "700",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "var(--text-primary)"
        }}>
          {Icon && <Icon style={{ width: "24px", height: "24px", color: "#38bdf8", flexShrink: 0 }} />}
          {title}
        </h2>
      )}
      <div style={{
        color: "var(--text-secondary)",
        fontSize: "16px",
        lineHeight: "1.8",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        {children}
      </div>
    </section>
  );
}

export default function TrustPageLayout({ 
  title, 
  subtitle, 
  lastUpdated, 
  children,
  badge = "KaroTools Trust Center",
}) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      color: "var(--text-primary)",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .trust-card { transition: border-color 0.3s ease; }
        .trust-card:hover { border-color: rgba(56,189,248,0.3) !important; }
        .trust-link { transition: color 0.2s ease; }
        .trust-link:hover { color: #38bdf8 !important; }
        .trust-btn { transition: all 0.2s ease; }
        .trust-btn:hover { border-color: #38bdf8 !important; color: #38bdf8 !important; }
      `}} />
      <Navbar />
      
      <main style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "64px 24px 80px 24px"
      }}>
        
        {/* Breadcrumb / Back */}
        <div style={{ marginBottom: "32px" }}>
          <Link href="/" className="trust-link" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "var(--text-secondary)",
            textDecoration: "none"
          }}>
            <ArrowLeft style={{ width: "16px", height: "16px" }} /> Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 64px auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "9999px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            fontSize: "12px",
            fontWeight: "700",
            color: "#38bdf8",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "24px"
          }}>
            <ShieldCheck style={{ width: "16px", height: "16px" }} />
            {badge}
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: "800",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: "24px",
            background: "linear-gradient(to right, #ffffff, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(16px, 2vw, 18px)",
              lineHeight: "1.7",
              marginBottom: "32px"
            }}>
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: "var(--text-secondary)",
              opacity: "0.8"
            }}>
              <Calendar style={{ width: "16px", height: "16px", color: "#38bdf8" }} />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {children}
        </div>

        {/* CTA Tools Link */}
        <div style={{
          marginTop: "80px",
          paddingTop: "48px",
          borderTop: "1px solid var(--border-color)",
          textAlign: "center"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: "32px",
            color: "var(--text-primary)"
          }}>Explore Free Tools</h3>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px"
          }}>
            <Link href="/gst-calculator" className="trust-btn" style={{ padding: "12px 24px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", color: "var(--text-primary)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>GST Calculator</Link>
            <Link href="/invoice-generator" className="trust-btn" style={{ padding: "12px 24px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", color: "var(--text-primary)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>Invoice Generator</Link>
            <Link href="/44ada-tax-calculator" className="trust-btn" style={{ padding: "12px 24px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", color: "var(--text-primary)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>44ADA Calculator</Link>
            <Link href="/tax-calculator" className="trust-btn" style={{ padding: "12px 24px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", color: "var(--text-primary)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>Income Tax Hub</Link>
          </div>
        </div>

        {/* Trust Navigation */}
        <div style={{
          marginTop: "64px",
          paddingTop: "32px",
          borderTop: "1px solid var(--border-color)",
          textAlign: "center"
        }}>
          <h3 style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "24px"
          }}>Related Trust Pages</h3>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            <Link href="/about" className="trust-link" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>About</Link>
            <Link href="/methodology" className="trust-link" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Methodology</Link>
            <Link href="/sources" className="trust-link" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Sources</Link>
            <Link href="/editorial-policy" className="trust-link" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Editorial Policy</Link>
            <Link href="/disclaimer" className="trust-link" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Disclaimer</Link>
            <Link href="/privacy-policy" className="trust-link" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/contact" className="trust-link" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>

      </main>
    </div>
  );
}
