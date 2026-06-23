import FIRECalculator from '../../FIRECalculator';
import Script from 'next/script';
import Link from 'next/link';
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";

export const metadata = {
  title: 'India FIRE Calculator 2026 – Early Retirement Tool for Freelancers',
  description: 'Calculate your FIRE number in India using expenses, SIP, ROI, inflation and 3.5% withdrawal rate. Compare Lean, Regular and Fat FIRE targets.',
  alternates: {
    canonical: 'https://karotools.in/fire-calculator',
  },
  openGraph: {
    title: 'India FIRE Calculator 2026 – Early Retirement Tool for Freelancers',
    description: 'Calculate your FIRE number in India using expenses, SIP, ROI, inflation and 3.5% withdrawal rate. Compare Lean, Regular and Fat FIRE targets.',
    url: 'https://karotools.in/fire-calculator',
    siteName: 'KaroTools',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "India FIRE Calculator 2026 – Retire Early Tool",
    description: "Calculate your FIRE number, retirement age, Lean FIRE and Fat FIRE targets using expenses, SIP, ROI, inflation and 3.5% SWR.",
    images: ["https://karotools.in/og-image.png"],
  }
};

export default function FIRECalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the FIRE number and how is it calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your FIRE number is the total corpus needed so that 4% (or your chosen withdrawal rate) covers all retirement expenses. In India, it’s typically Annual Expenses × 25 (at 4% SWR). Many experts use a lower 3–3.5% SWR here, implying ~28–33× expenses to account for higher inflation."
        }
      },
      {
        "@type": "Question",
        "name": "Lean FIRE vs Fat FIRE – what’s the difference in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lean FIRE means retiring on a very frugal budget (essentials-only). It often uses about 15× your annual expenses. Fat FIRE means a comfortable/luxurious retirement, roughly 50× expenses. Most people fall in between. Running our calculator for both scenarios helps set realistic goals."
        }
      },
      {
        "@type": "Question",
        "name": "What safe withdrawal rate (SWR) should Indian retirees use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike the standard 4% rule (US-based), financial planners in India recommend 3–3.5% SWR due to higher long-term inflation (6–7% CPI) and cost risks. Using 3.5% means multiplying expenses by ~28.6 instead of 25. You can adjust this in our calculator’s slider."
        }
      },
      {
        "@type": "Question",
        "name": "How can a freelancer in India plan for early retirement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As a freelancer, you must self-fund retirement (no employer PF). Start by tracking your current expenses and setting a savings rate. Use tools like this FIRE calculator to project your corpus. Consider maxing SIPs, PPF/NPS contributions, and lowering costs. Consistent investing is key — even ₹5–10K per month can grow significantly over time."
        }
      },
      {
        "@type": "Question",
        "name": "How does inflation affect my FIRE goal in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High Indian inflation (6–7%) means your expenses grow quickly. Our calculator adjusts future expenses using your inflation input. For example, ₹1L monthly today could cost ₹2L+ in 10–15 years, requiring a much larger corpus. Always use real (inflation-adjusted) returns when planning."
        }
      }
    ]
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)", selectionColor: "#fff", selectionBackground: "#0076ff" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background: rgba(0,118,255, 0.4); color: white; }
        ::-moz-selection { background: rgba(0,118,255, 0.4); color: white; }
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 var(--border-color);
        }

        .interactive-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .interactive-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(0,118,255, 0.25);
        }
        .interactive-btn:active {
          transform: translateY(1px) scale(0.98);
        }

        .home-btn {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          text-decoration: none;
        }
        .home-btn:hover {
          background: rgba(0,118,255, 0.15);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }
      `}} />

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,118,255, 0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(0,198,255, 0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "40%", width: "30%", height: "30%", background: "radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <nav className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          
          <Link href="/"
            className="interactive-btn home-btn"
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ← Home
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px", position: "relative", zIndex: 1 }}>
        {/* Intro Section */}
        <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "24px", background: "linear-gradient(135deg, var(--glass-bg), rgba(255,255,255,0.01))", border: "1px solid var(--border-color)", marginBottom: "20px", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>🔥</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            FIRE Calculator India for Freelancers
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Calculate your Financial Independence & Retire Early (FIRE) number. We use nominal compounding and separate Indian inflation models to accurately project your future.
          </p>
        </div>

        <FIRECalculator />
        
        {/* AEO Answer Block */}
        <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the FIRE Calculator work?</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
              The KaroTools FIRE Calculator helps you calculate the exact corpus you need to retire early in India. It projects your future expenses using inflation, calculates the compounding of your current investments and monthly SIPs, and applies a Safe Withdrawal Rate (SWR) to find your target. Compare your timeline with our <Link href="/sip-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>SIP Calculator</Link>.
            </p>
            <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
              <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>FIRE Target = Annual Expenses at Retirement / Safe Withdrawal Rate</p>
              <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Annual Expenses at Retirement = Current Expenses × (1 + Inflation Rate) ^ Years</p>
            </div>
          </div>
        </div>

        <SchemaScript schema={faqSchema} />
        <SchemaScript schema={generateSoftwareSchema({
          name: "KaroTools FIRE Calculator",
          url: "https://karotools.in/fire-calculator",
          description: "Calculate your Financial Independence and Retire Early (FIRE) number in India based on inflation, SIPs, and SWR."
        })} />
        <SchemaScript schema={generateBreadcrumbSchema([
          { name: "Home", url: "https://karotools.in" },
          { name: "FIRE Calculator", url: "https://karotools.in/fire-calculator" }
        ])} />
        
        {/* Universal Legal Disclaimer */}
        <div style={{ marginTop: "40px", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px dashed var(--border-color)", textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: "1.6", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
            <strong>Disclaimer:</strong> This FIRE Calculator is for educational and informational purposes only. Results are based on assumptions entered by the user and should not be treated as investment, tax, retirement, or financial advice. Please consult a qualified financial advisor before making major financial decisions.
          </p>
        </div>

        {/* On-Page SEO / Content Section */}
        <section style={{ marginTop: "60px", padding: "40px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.06)", color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px" }}>Frequently Asked Questions</h2>
          
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>What is the FIRE number and how is it calculated?</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Your FIRE number is the total corpus needed so that 4% (or your chosen withdrawal rate) covers all retirement expenses. In India, it’s typically Annual Expenses × 25 (at 4% SWR). Many experts use a lower 3–3.5% SWR here, implying ~28–33× expenses to account for higher inflation.
            </p>
          </div>
          
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>Lean FIRE vs Fat FIRE – what’s the difference in India?</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Lean FIRE means retiring on a very frugal budget (essentials-only). It often uses about 15× your annual expenses. Fat FIRE means a comfortable/luxurious retirement, roughly 50× expenses. Most people fall in between. Running our calculator for both scenarios helps set realistic goals.
            </p>
          </div>
          
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>What safe withdrawal rate (SWR) should Indian retirees use?</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Unlike the standard 4% rule (US-based), financial planners in India recommend 3–3.5% SWR due to higher long-term inflation (6–7% CPI) and cost risks. Using 3.5% means multiplying expenses by ~28.6 instead of 25. You can adjust this in our calculator’s slider.
            </p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>How can a freelancer in India plan for early retirement?</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
              As a freelancer, you must self-fund retirement (no employer PF). Start by tracking your current expenses and setting a savings rate. Use tools like this FIRE calculator to project your corpus. Consider maxing SIPs, PPF/NPS contributions, and lowering costs. Consistent investing is key — even ₹5–10K per month can grow significantly over time.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>How does inflation affect my FIRE goal in India?</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
              High Indian inflation (6–7%) means your expenses grow quickly. Our calculator adjusts future expenses using your inflation input. For example, ₹1L monthly today could cost ₹2L+ in 10–15 years, requiring a much larger corpus. Always use real (inflation-adjusted) returns when planning.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
