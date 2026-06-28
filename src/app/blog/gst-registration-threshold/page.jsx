"use client";
import { SchemaScript, generateBreadcrumbSchema, generateArticleSchema } from "../../../lib/schema";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./blog.module.css";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "GST Registration Limit for Freelancers in India 2026 — ₹20 Lakh Threshold Explained",
  "description": "Should Indian freelancers register for GST? Learn the ₹20 lakh GST registration limit, international client rules, and LUT filing for FY 2026-27.",
  "image": "https://karotools.in/og-image.png",
  "author": {
    "@type": "Organization",
    "name": "KaroTools"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KaroTools",
    "logo": {
      "@type": "ImageObject",
      "url": "https://karotools.in/logo.png"
    }
  },
  "datePublished": "2026-06-14",
  "dateModified": "2026-06-14",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://karotools.in/blog/gst-registration-threshold"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the GST registration limit for freelancers in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "For most Indian states, the GST registration limit is ₹20 lakhs in aggregate annual turnover. For Special Category States (Manipur, Mizoram, Nagaland, Tripura), this limit is ₹10 lakhs." }
    },
    {
      "@type": "Question",
      "name": "Do freelancers working with international clients need GST registration?",
      "acceptedAnswer": { "@type": "Answer", "text": "Not necessarily. If your total annual turnover — including foreign client income — is below ₹20 lakhs, you are exempt from GST registration. Above ₹20 lakhs, you must register but can file a Letter of Undertaking (LUT) to export services without paying IGST." }
    },
    {
      "@type": "Question",
      "name": "What is aggregate turnover for GST purposes?",
      "acceptedAnswer": { "@type": "Answer", "text": "Aggregate turnover includes all income from local clients, clients in other Indian states, and international clients (export of services). All these are counted together to determine whether you cross the ₹20 lakh GST registration threshold." }
    },
    {
      "@type": "Question",
      "name": "What is an LUT (Letter of Undertaking) in GST?",
      "acceptedAnswer": { "@type": "Answer", "text": "An LUT is a declaration filed on the GST portal (Form GST RFD-11) that allows registered taxpayers to export services without paying IGST upfront. It must be renewed every financial year. It is only applicable after you cross the ₹20 lakh limit and have registered for GST." }
    },
    {
      "@type": "Question",
      "name": "Can I voluntarily register for GST even below ₹20 lakhs?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Voluntary GST registration is allowed. It can be beneficial if your clients are GST-registered businesses who want to claim Input Tax Credit (ITC) on your invoices. However, once registered you must file monthly or quarterly GST returns even if your turnover is zero." }
    }
  ]
};

export default function BlogPost() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />

      <nav style={{ padding: "20px 0", borderBottom: "1px solid var(--glass-bg)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <Link href="/blog" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            ← Back to Blog
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <article className={styles.articleContent} itemScope itemType="https://schema.org/Article">
          
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>GST Guide</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: "1.1", marginBottom: "24px", color: "#fff" }}>
              GST Registration Limit for Freelancers in India: The ₹20 Lakh Threshold Explained
            </h1>
            <p style={{ fontSize: "18px", color: "var(--text-primary)", lineHeight: "1.6", marginBottom: "24px" }}>
              Do you really need to register for GST and charge clients 18%? Here's the complete, plain-English answer for Indian freelancers — including rules for international clients.
            </p>
            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "var(--text-secondary)", alignItems: "center" }}>
              <span>📅 June 14, 2026</span>
              <span>⏱ 9 min read</span>
              <span>✍️ By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
            </div>
          </header>

          <p>The GST registration limit for freelancers in India is ₹20 lakhs in aggregate annual turnover (₹10 lakhs in special category states). Once your total revenue crosses this limit, registration becomes mandatory.</p>
          <p>One of the most searched questions among freelancers is whether they have to charge 18%. The answer depends on your exact turnover, state, and client location. This guide covers the <strong>FY 2026-27</strong> rules with clear examples.</p>

          <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "12px", padding: "20px", margin: "24px 0" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "#38bdf8", fontSize: "18px", fontWeight: "700" }}>⚡ Quick Answer</h3>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: "1.6" }}>
              The GST registration limit for freelancers is ₹20 lakhs (₹10 lakhs in special category states) in total aggregate turnover. If you earn below this, you are exempt. If you cross this limit, registration is mandatory. For international clients, you do not charge GST (it's zero-rated), but you must file an LUT to export services without paying IGST upfront.
            </p>
          </div>

          <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", padding: "20px", margin: "24px 0" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "var(--text-primary)", fontSize: "16px", fontWeight: "700" }}>Table of Contents</h3>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#38bdf8", lineHeight: "1.8", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "8px" }}>
              <li><a href="#what-is-limit" style={{ color: "#38bdf8", textDecoration: "none" }}>1. What Is the GST Registration Limit?</a></li>
              <li><a href="#aggregate-turnover" style={{ color: "#38bdf8", textDecoration: "none" }}>2. What Counts as "Aggregate Turnover"?</a></li>
              <li><a href="#international-clients" style={{ color: "#38bdf8", textDecoration: "none" }}>3. Rules for International Clients</a></li>
              <li><a href="#lut" style={{ color: "#38bdf8", textDecoration: "none" }}>4. What is a Letter of Undertaking (LUT)?</a></li>
              <li><a href="#voluntary-registration" style={{ color: "#38bdf8", textDecoration: "none" }}>5. Should You Voluntarily Register?</a></li>
              <li><a href="#how-to-calculate" style={{ color: "#38bdf8", textDecoration: "none" }}>6. How to Calculate GST</a></li>
              <li><a href="#faq" style={{ color: "#38bdf8", textDecoration: "none" }}>7. Frequently Asked Questions (FAQ)</a></li>
            </ul>
          </div>
          <h2 id="what-is-limit">1. What Is the GST Registration Limit for Freelancers in India?</h2>

          <p>Under the Goods and Services Tax (GST) Act, freelancers who provide services — including developers, designers, writers, photographers, and consultants — are classified as <strong>service providers</strong>. The law sets a turnover-based threshold below which GST registration is <em>not mandatory</em>.</p>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #38bdf8" }}>
            <p>💡 <strong>The Core Rule (FY 2026-27):</strong> If your aggregate annual turnover from all services is <strong>below ₹20 lakhs</strong>, you are <em>not required</em> to register for GST. Registration only becomes mandatory once you cross this threshold.</p>
          </div>

          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Category</th>
                <th>States Covered</th>
                <th>Registration Limit</th>
                <th>Status Below Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>General States</strong></td>
                <td>Maharashtra, Karnataka, Delhi, UP, Tamil Nadu, Gujarat, and most others</td>
                <td>₹20 Lakhs / year</td>
                <td><strong style={{ color: "#34d399" }}>Exempt</strong></td>
              </tr>
              <tr>
                <td><strong>Special Category States</strong></td>
                <td>Manipur, Mizoram, Nagaland, Tripura</td>
                <td>₹10 Lakhs / year</td>
                <td><strong style={{ color: "#fbbf24" }}>Lower Threshold</strong></td>
              </tr>
              <tr>
                <td><strong>Other NE & Hill States</strong></td>
                <td>Arunachal Pradesh, Assam, Himachal Pradesh, Uttarakhand, Meghalaya, Sikkim</td>
                <td>₹20 Lakhs / year</td>
                <td><strong style={{ color: "#34d399" }}>Exempt</strong></td>
              </tr>
            </tbody>
          </table>

          <h2 id="aggregate-turnover">2. What Counts as "Aggregate Turnover" Under GST?</h2>

          <p>Many freelancers make the mistake of only counting income from local clients when calculating their turnover. But for GST purposes, <strong>aggregate turnover includes every rupee you earn</strong>, regardless of where the client is based.</p>

          <p>Under Section 2(6) of the CGST Act, aggregate turnover is the total value of:</p>
          <ul>
            <li>Income from clients <strong>within your state</strong> (intra-state supplies)</li>
            <li>Income from clients in <strong>other Indian states</strong> (inter-state supplies)</li>
            <li>Income from <strong>international clients</strong> (Export of Services — zero-rated supplies)</li>
            <li>Income from <strong>exempt supplies</strong> (e.g., healthcare, education services, if any)</li>
          </ul>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #f87171" }}>
            <p>⚠️ <strong>Common Mistake:</strong> A freelancer earning ₹12 lakh from Indian clients and ₹10 lakh from a US client has an <em>aggregate turnover of ₹22 lakhs</em>. They have crossed the GST registration limit for freelancers in India and must register — even though the foreign income is zero-rated.</p>
          </div>

          {/* Custom Turnover Bar matched to Dark Theme */}
          <div style={{ margin: "32px 0", padding: "24px", background: "var(--glass-bg)", borderRadius: "12px", border: "1px solid var(--glass-bg)" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Turnover vs. the ₹20 Lakh GST Threshold</div>
            <div style={{ height: "44px", borderRadius: "8px", overflow: "hidden", display: "flex", background: "var(--glass-bg)", marginBottom: "16px" }}>
              <div style={{ background: "#34d399", width: "55%", display: "flex", alignItems: "center", padding: "0 12px", fontSize: "13px", fontWeight: "700", color: "var(--bg-primary)" }}>Below ₹20L → No GST</div>
              <div style={{ background: "#fbbf24", width: "20%", display: "flex", alignItems: "center", padding: "0 12px", fontSize: "13px", fontWeight: "700", color: "var(--bg-primary)" }}>₹20L → Register</div>
              <div style={{ background: "#f87171", width: "25%", display: "flex", alignItems: "center", padding: "0 12px", fontSize: "13px", fontWeight: "700", color: "#fff" }}>₹20L+ → Collect GST</div>
            </div>
          </div>

          <h2 id="international-clients">3. GST Rules for Freelancers Working with International Clients</h2>

          <p>This is where most confusion lies. If you work with US, UK, Australian, or other overseas clients and receive payment in <strong>foreign currency (convertible exchange)</strong>, your services are classified as <strong>Export of Services</strong> under GST law.</p>

          <p>Exporting services is a <strong>zero-rated supply</strong> — meaning GST is charged at 0%. You do <em>not</em> add 18% to your invoice for foreign clients, even after registration. However, the foreign income is still counted in your aggregate turnover for the purpose of the registration limit.</p>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <div className={styles.stepContent}>
                <h3>Total Turnover Below ₹20 Lakhs</h3>
                <p>You are fully exempt. No GST registration needed. No GST on any invoice — domestic or international.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <div className={styles.stepContent}>
                <h3>Total Turnover Crosses ₹20 Lakhs</h3>
                <p>You must register for GST. Domestic clients attract 18% GST. International clients still get zero-rated invoices.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepContent}>
                <h3>You Registered & Export Services → File an LUT</h3>
                <p>File a <strong>Letter of Undertaking (LUT)</strong> on the GST portal each year (Form RFD-11) to export without paying IGST upfront. This saves significant working capital.</p>
              </div>
            </div>
          </div>

          <h2 id="lut">4. What is a Letter of Undertaking (LUT) and Do You Need One?</h2>

          <p>A <strong>Letter of Undertaking (LUT)</strong> is a document filed annually on the GST portal that lets you export services <em>without paying IGST</em>. Without an LUT, you would have to pay the tax first and then claim a refund — which creates a cash flow headache for freelancers.</p>

          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Scenario</th>
                <th>GST Registered?</th>
                <th>LUT Filed?</th>
                <th>Invoice to Intl. Client</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Turnover below ₹20L</td>
                <td><strong style={{ color: "#34d399" }}>No</strong></td>
                <td>Not Required</td>
                <td>No GST charged</td>
              </tr>
              <tr>
                <td>Turnover above ₹20L, LUT filed</td>
                <td><strong style={{ color: "#f87171" }}>Yes</strong></td>
                <td><strong style={{ color: "#34d399" }}>Filed</strong></td>
                <td>Zero-rated (0% IGST)</td>
              </tr>
              <tr>
                <td>Turnover above ₹20L, no LUT</td>
                <td><strong style={{ color: "#f87171" }}>Yes</strong></td>
                <td><strong style={{ color: "#fbbf24" }}>Not Filed</strong></td>
                <td>Pay 18% IGST, then claim refund</td>
              </tr>
            </tbody>
          </table>

          <p>The LUT must be renewed at the start of every financial year. You can file it online on the official GST portal under Services → User Services → Furnish Letter of Undertaking (LUT). There is no fee for filing.</p>

          <h2 id="voluntary-registration">5. Should You Voluntarily Register for GST Below ₹20 Lakhs?</h2>

          <p>Voluntary GST registration is allowed and can make strategic sense in some cases. Here's how to decide:</p>

          <div className={styles.highlightBox}>
            <p><strong>Register voluntarily if:</strong> Your B2B clients want to claim Input Tax Credit (ITC) on your invoice, or you want to appear more professional to large companies.</p>
            <p style={{ marginTop: "12px" }}><strong>Stay unregistered if:</strong> Your clients are individuals/startups who cannot claim ITC, because filing monthly GSTR returns adds compliance overhead and late fees.</p>
          </div>

          <div className={styles.ctaBlock}>
            <h3>🧮 Determine your exact tax liability</h3>
            <p>Whether you need to calculate 18% GST to add to an invoice, or see how much income tax you owe under Section 44ADA, our free calculators can help.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
              <Link href="/gst-calculator" className={styles.ctaBtn}>Open GST Calculator →</Link>
              <Link href="/44ada-tax-calculator" className={styles.ctaBtnOutline}>44ADA Tax Calculator →</Link>
            </div>
          </div>

          <h2 id="how-to-calculate">6. How to Calculate GST If You Must Charge It</h2>

          <p>Once you cross the <strong>GST registration limit for freelancers in India</strong>, here is how GST is applied to your invoices:</p>

          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Tax Applied</th>
                <th>Rate</th>
                <th>Example (₹1,00,000 invoice)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Client in <strong>same state</strong> as you</td>
                <td>CGST + SGST</td>
                <td>9% + 9%</td>
                <td>₹1,00,000 + ₹18,000 = <strong>₹1,18,000</strong></td>
              </tr>
              <tr>
                <td>Client in a <strong>different Indian state</strong></td>
                <td>IGST</td>
                <td>18%</td>
                <td>₹1,00,000 + ₹18,000 = <strong>₹1,18,000</strong></td>
              </tr>
              <tr>
                <td><strong>International client</strong> (Export of Services)</td>
                <td>Zero-rated</td>
                <td>0%</td>
                <td>₹1,00,000 = <strong>₹1,00,000</strong> (no GST added)</td>
              </tr>
            </tbody>
          </table>

          <p>Need to generate a proper GST invoice with correct CGST/SGST/IGST split? Use our free <Link href="/gst-invoice-generator" style={{ color: "#38bdf8" }}>GST Invoice Generator</Link> — it auto-detects the tax type based on your client's state and creates a PDF in seconds.</p>

          <div className={styles.linkCards}>
            <Link href="/blog/section-44ada-freelancers" className={styles.linkCard}>
              <div className={styles.lcIcon}>📉</div>
              <h4>Section 44ADA</h4>
              <p>Claim 50% Tax-Free Income as a Freelancer</p>
            </Link>
            <Link href="/blog/how-to-make-gst-invoice-online-free" className={styles.linkCard}>
              <div className={styles.lcIcon}>📄</div>
              <h4>Make GST Invoice</h4>
              <p>How to Make a GST Invoice Online for Free</p>
            </Link>
          </div>

          <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "24px", marginTop: "32px", marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#10b981", marginBottom: "8px" }}>Calculate GST instantly with our free GST Calculator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Need to figure out the exact GST amount to charge your clients? Use our free tool.</p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/gst-calculator" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", fontWeight: "600", fontSize: "14px", textDecoration: "none", padding: "10px 16px", borderRadius: "8px" }}>Use Free GST Calculator</Link>
            </div>
          </div>

          <h2 id="faq">Frequently Asked Questions (FAQ)</h2>

          <div className={styles.faqSection} itemScope itemType="https://schema.org/FAQPage">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemOpen : ''}`} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <button className={styles.faqQ} onClick={() => toggleFaq(idx)}>
                  <span itemProp="name">{faq.name}</span>
                  <span className={styles.icon}>+</span>
                </button>
                <div className={styles.faqA} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">{faq.acceptedAnswer.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", padding: "20px", backgroundColor: "var(--glass-bg)", border: "1px solid var(--glass-bg)", borderRadius: "8px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            <strong>Disclaimer:</strong> The information provided on KaroTools is for general informational purposes only and does not constitute professional financial, tax, or legal advice. Tax laws in India frequently change, and while we strive for accuracy, you should always consult with a qualified Chartered Accountant (CA) or legal professional before making any compliance decisions. KaroTools is not responsible for any errors, omissions, or actions taken based on this content.
          </div>

        
          <div style={{ marginTop: "48px", padding: "32px", borderRadius: "16px", border: "1px solid var(--glass-border)", background: "var(--glass-bg)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", margin: "0 0 8px 0" }}>Written by: Dax Patel</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
              Dax Patel creates practical GST, invoice, tax, and business tools for Indian freelancers, consultants, small businesses, and agencies through KaroTools.
            </p>
          </div>
          
          <div style={{ marginTop: "48px", borderTop: "1px solid var(--border-color)", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", margin: "0 0 24px 0" }}>Related Guides & Tools</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
              <Link href="/gst-calculator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-border)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--glass-bg)" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "16px" }}>GST Calculator</strong>
              </Link>
              <Link href="/invoice-generator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-border)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--glass-bg)" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "16px" }}>GST Invoice Generator</strong>
              </Link>
              <Link href="/blog/gst-registration-threshold" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-border)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--glass-bg)" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "16px" }}>GST Registration Rules</strong>
              </Link>
            </div>
          </div>
        </article>

      </main>
    
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "gst registration threshold", url: "https://karotools.in/blog/gst-registration-threshold"}])} />
</div>
  );
}
