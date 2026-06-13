import Link from "next/link";
import React from "react";

export const metadata = {
  title: "GST Registration Threshold India FY 2026-27 — KaroTools",
  description: "Do Indian freelancers need to register for GST? Learn about the ₹20 Lakh turnover limit, voluntary registration, and when to charge IGST for international clients.",
  openGraph: {
    title: "GST Registration Threshold for Freelancers",
    description: "Learn about the ₹20 Lakh turnover limit and GST rules for Indian freelancers.",
    url: "https://karotools.in/blog/gst-registration-threshold",
    images: ["https://karotools.in/og-image.png"],
  }
};

export default function BlogPost() {
  return (
    <div style={{ backgroundColor: "#020617", minHeight: "100vh", color: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "24px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>
            Karo<span style={{ color: "#38bdf8" }}>Tools</span>
          </Link>
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            ← Back to Blog
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <article>
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>Tax Guide</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Syne', sans-serif", lineHeight: "1.1", marginBottom: "24px", color: "#fff" }}>
              The ₹20 Lakh GST Registration Threshold Explained
            </h1>
          </header>

          <div style={{ fontSize: "16px", color: "#cbd5e1", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "20px" }}>
              One of the most common questions Indian freelancers have is: <strong>"Do I need to register for GST and charge my clients an extra 18%?"</strong>
            </p>
            <p style={{ marginBottom: "20px" }}>
              The answer depends entirely on your annual turnover and the location of your clients. Let's break down the rules for FY 2026-27.
            </p>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>1. The Basic ₹20 Lakh Threshold</h2>
            <p style={{ marginBottom: "20px" }}>
              Under the Goods and Services Tax (GST) Act, if you are a service provider (which includes freelance developers, designers, writers, and consultants), you are <strong>not required</strong> to register for GST if your aggregate annual turnover is <strong>less than ₹20 Lakhs</strong> in a financial year.
            </p>
            <p style={{ marginBottom: "20px", fontSize: "14px", color: "#94a3b8" }}>
              *Note: For Special Category States (like Manipur, Mizoram, Nagaland, and Tripura), the threshold is ₹10 Lakhs.
            </p>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>2. What is "Aggregate Turnover"?</h2>
            <p style={{ marginBottom: "20px" }}>
              Aggregate turnover is the total value of all taxable and exempt supplies you make. This includes:
            </p>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
              <li>Income from local clients within your state</li>
              <li>Income from clients in other Indian states</li>
              <li>Income from international clients (Zero-rated supplies)</li>
            </ul>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginTop: "40px", marginBottom: "16px" }}>3. Exporting Services (International Clients)</h2>
            <p style={{ marginBottom: "20px" }}>
              If you provide services to clients outside India (e.g., US or UK clients) and receive payment in foreign convertible exchange, it is considered an <strong>Export of Service</strong>.
            </p>
            <p style={{ marginBottom: "20px" }}>
              Previously, mandatory GST registration was required for any inter-state or export supply. However, the government has relaxed this. If your total turnover (including exports) is under ₹20 Lakhs, you do not need to register. If it crosses ₹20 Lakhs, you must register, but you can file a <strong>Letter of Undertaking (LUT)</strong> to export services without paying IGST.
            </p>

            <div style={{ backgroundColor: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>Determine your exact tax liability</h3>
              <p style={{ color: "#94a3b8", marginBottom: "24px", fontSize: "15px" }}>
                Whether you need to calculate 18% GST to add to an invoice, or you want to see how much income tax you owe under Section 44ADA, our free calculators can help.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/gst-calculator" style={{ backgroundColor: "#38bdf8", color: "#020617", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", textDecoration: "none", transition: "all 0.2s" }}>
                  Open GST Calculator
                </Link>
                <Link href="/44ada-tax-calculator" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", textDecoration: "none", transition: "all 0.2s" }}>
                  Open 44ADA Tax Calculator
                </Link>
              </div>
            </div>

            <div style={{ marginTop: "48px", padding: "20px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
              <strong>Disclaimer:</strong> The information provided on KaroTools is for general informational purposes only and does not constitute professional financial, tax, or legal advice. Tax laws in India frequently change, and while we strive for accuracy, you should always consult with a qualified Chartered Accountant (CA) or legal professional before making any compliance decisions. KaroTools is not responsible for any errors, omissions, or actions taken based on this content.
            </div>

          </div>
        </article>
      </main>
    </div>
  );
}
