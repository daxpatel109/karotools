"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function BlogPost5() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "How to Make a GST Invoice Online for Free (No Watermarks) | KaroTools";
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Make a GST Invoice Online for Free without Watermarks",
      "author": {
        "@type": "Person",
        "name": "Dax Patel",
        "url": "https://karotools.in/author/dax-patel"
      },
      "datePublished": "2026-06-07",
      "publisher": {
        "@type": "Organization",
        "name": "KaroTools",
        "logo": {
          "@type": "ImageObject",
          "url": "https://karotools.in/logo.png"
        }
      },
      "description": "Learn what mandatory fields are required on an Indian GST invoice (HSN/SAC codes, IGST, CGST) and how to generate professional PDF invoices for free.",
      "mainEntityOfPage": "https://karotools.in/blog/make-gst-invoice-online-free"
    };

    let script = document.querySelector("#article-schema");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "article-schema";
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify(schema);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", lineHeight: "1.8", paddingBottom: "80px" }}>
      
      
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 20px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <Link href="/blog" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Back to Blog</Link>
      </nav>

      {/* Article Content */}
      <article style={{ maxWidth: "760px", margin: "60px auto 0", padding: "0 24px" }}>
        
        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>INVOICING GUIDE</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>June 7, 2026</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>•</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>5 min read</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", lineHeight: 1.15, marginBottom: "32px", color: "#f8fafc", letterSpacing: "-0.02em" }}>
          How to Make a GST Invoice Online for Free (No Watermarks)
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "48px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", background: "#0f172a", border: "2px solid #1e293b", position: "relative" }}>
            <img 
              src="/dax-profile.jpg" 
              alt="Dax Patel" 
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#38bdf8,#818cf8)", color: "white", fontWeight: "bold", fontSize: "20px" }}>DP</div>
          </div>
          <div>
            <Link href="/author/dax-patel" style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "16px", textDecoration: "none" }} onMouseEnter={e => e.target.style.textDecoration = "underline"} onMouseLeave={e => e.target.style.textDecoration = "none"}>Dax Patel</Link>
            <div style={{ color: "#64748b", fontSize: "14px" }}>Founder, KaroTools</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ fontSize: "18px", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>
            If you are an Indian freelancer or small business owner registered for GST, you cannot just send a simple Word document as an invoice. The Indian government has strict rules about what a <strong>Tax Invoice</strong> must contain. 
          </p>

          <p>
            Unfortunately, most software platforms like Zoho or ClearTax charge expensive monthly subscriptions just to generate a basic PDF. Let's break down exactly what you need on your invoice, and how you can generate one completely for free without ugly watermarks.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            The 5 Mandatory Fields for a GST Invoice
          </h2>

          <p>To be legally compliant, your invoice must clearly display:</p>
          <ol style={{ paddingLeft: "24px", color: "#94a3b8" }}>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>GSTIN:</strong> Both your 15-digit GST identification number and your client's GSTIN (if they have one).</li>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>Invoice Number & Date:</strong> The invoice number must be unique and sequential.</li>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>HSN or SAC Codes:</strong> HSN codes are for products, while SAC codes (Services Accounting Codes) are for services like software development or design.</li>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>Tax Breakdown:</strong> You must explicitly separate the tax into CGST + SGST (if the client is in your state) or IGST (if the client is in another state).</li>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>Authorized Signature:</strong> Either a physical signature or a digital signature image.</li>
          </ol>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            The Free Solution: KaroTools Invoice Generator
          </h2>

          <p>
            I built a tool specifically to solve the "expensive invoice software" problem for Indian businesses. You do not need an account, and your financial data is completely secure because everything is generated directly in your browser.
          </p>

          <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fbbf24", marginBottom: "12px" }}>Generate Your PDF Instantly</h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "20px" }}>
              Our free invoice builder has all the required Indian GST fields pre-formatted. Just type your details, upload your logo, and click "Download PDF". It looks premium and it's 100% free forever.
            </p>
            <Link href="/gst-invoice-generator" style={{ display: "inline-block", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Launch Free GST Invoice Generator →
            </Link>
          </div>

          <p>
            Your clients judge your professionalism by your invoices. Stop using messy Excel spreadsheets or watermarked templates. Use a clean, compliant tool and get paid faster.
          </p>
        </div>
      </article>
    </div>
  );
}
