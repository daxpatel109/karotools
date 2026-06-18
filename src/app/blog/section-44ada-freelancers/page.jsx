"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./blog.module.css";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Section 44ADA for Freelancers India: Tax Saving Guide FY 2026-27",
  "description": "A practical guide to Section 44ADA presumptive taxation for Indian freelancers covering eligibility, the 50% rule, ₹50 lakh and ₹75 lakh limits, advance tax, ITR-4 filing, GST and examples.",
  "image": "https://karotools.in/og/section-44ada-freelancers.png",
  "author": { "@type": "Person", "name": "Dax Patel" },
  "publisher": {
    "@type": "Organization",
    "name": "KaroTools",
    "url": "https://karotools.in",
    "logo": { "@type": "ImageObject", "url": "https://karotools.in/logo.png" }
  },
  "datePublished": "2026-06-14",
  "dateModified": "2026-06-14",
  "mainEntityOfPage": "https://karotools.in/blog/section-44ada-freelancers",
  "inLanguage": "en-IN"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who can use Section 44ADA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Section 44ADA can be used by a resident individual or resident partnership firm other than an LLP carrying on a specified profession such as legal, medical, engineering, architecture, accountancy, technical consultancy, interior decoration or another CBDT-notified profession, subject to the gross receipts limit."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Section 44ADA income limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The normal gross receipts limit is ₹50 lakh. The limit can go up to ₹75 lakh when cash and other non-specified receipts do not exceed 5% of total gross receipts for the financial year."
      }
    },
    {
      "@type": "Question",
      "name": "How much income is taxable under Section 44ADA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under Section 44ADA, eligible professionals can declare 50% of their gross professional receipts as taxable professional income. The remaining 50% is treated as deemed business expenses, so separate expense claims are not allowed after opting for the presumptive rate."
      }
    },
    {
      "@type": "Question",
      "name": "Do freelancers using Section 44ADA need to maintain books of accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If an eligible professional opts for Section 44ADA and declares income at 50% of gross receipts, regular books of accounts for that specified profession are generally not required under Section 44AA. Income records and invoices should still be kept for proof of receipts."
      }
    },
    {
      "@type": "Question",
      "name": "Which ITR form is used for Section 44ADA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most eligible resident freelancers claiming presumptive professional income under Section 44ADA can file ITR-4, provided they satisfy the other conditions for ITR-4. Complex cases may need ITR-3."
      }
    }
  ]
};

export default function BlogPost() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: "#020617", minHeight: "100vh", color: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
              <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
                Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
              </span>
            </div>
          </Link>
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            ← Back to Blog
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <article className={styles.articleContent} itemScope itemType="https://schema.org/Article">
          
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "#34d399", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", border: "1px solid rgba(52,211,153,0.2)" }}>🇮🇳 TAX SAVING GUIDE</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: "1.1", marginBottom: "24px", color: "#fff", letterSpacing: "-0.5px" }}>
              Section 44ADA for Freelancers: The Complete Tax Saving Guide for FY 2026-27
            </h1>
            <p style={{ fontSize: "18px", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "24px" }}>
              Eligible Indian freelancers and professionals can legally declare only 50% of their gross professional receipts as taxable income under Section 44ADA. Here is who qualifies, how the ₹50 lakh / ₹75 lakh limit works, how much tax you may save, and how to file correctly.
            </p>
            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#64748b", alignItems: "center" }}>
              <span>📅 June 14, 2026</span>
              <span>⏱ 9 min read</span>
              <span>✍️ By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
            </div>
          </header>

          <p>If you are an Indian freelancer, consultant or independent professional, you may not need to track every small business expense just to reduce your income tax. Section 44ADA of the Income Tax Act gives eligible professionals a simpler option: declare 50% of gross professional receipts as income, and treat the other 50% as deemed expenses.</p>

          <p>That means a freelancer with ₹18 lakh eligible professional receipts may show ₹9 lakh as presumptive professional income before tax regime calculations. The benefit is legal, but it only works when your profession, residency status, receipts limit and filing method are correct.</p>

          <div style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.1) 0%, rgba(16,185,129,0.05) 100%)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "16px", padding: "40px 32px", textAlign: "center", margin: "48px 0" }}>
            <div style={{ color: "#34d399", fontSize: "14px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Main 44ADA Benefit</div>
            <div style={{ fontSize: "clamp(56px, 10vw, 80px)", fontWeight: "900", color: "#34d399", lineHeight: "1", letterSpacing: "-3px", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>50%</div>
            <div style={{ color: "#cbd5e1", fontSize: "16px", maxWidth: "560px", margin: "0 auto", lineHeight: "1.6" }}>
              Eligible professionals can declare 50% of gross professional receipts as taxable professional income. No separate expense deduction is allowed after choosing this presumptive method.
            </div>
          </div>

          <h2>What Is Section 44ADA?</h2>

          <p>Section 44ADA is a presumptive taxation scheme for specified professionals. Instead of calculating actual profit by subtracting every business expense from income, eligible professionals can declare income at a fixed rate: <strong>50% of gross professional receipts</strong>.</p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "40px 0", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1", minWidth: "160px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", textAlign: "center", padding: "20px 16px", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.05em", marginBottom: "8px" }}>Gross receipts</div>
              <div style={{ fontSize: "28px", color: "#fff", fontWeight: "800" }}>₹20L</div>
            </div>
            <div style={{ color: "#64748b", fontSize: "24px", fontWeight: "800" }}>×</div>
            <div style={{ flex: "1", minWidth: "160px", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "12px", textAlign: "center", padding: "20px 16px", background: "rgba(56,189,248,0.1)" }}>
              <div style={{ fontSize: "12px", color: "#38bdf8", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.05em", marginBottom: "8px" }}>Presumptive income</div>
              <div style={{ fontSize: "28px", color: "#38bdf8", fontWeight: "800" }}>50%</div>
            </div>
            <div style={{ color: "#64748b", fontSize: "24px", fontWeight: "800" }}>=</div>
            <div style={{ flex: "1", minWidth: "160px", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "12px", textAlign: "center", padding: "20px 16px", background: "rgba(52,211,153,0.1)" }}>
              <div style={{ fontSize: "12px", color: "#34d399", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.05em", marginBottom: "8px" }}>Taxable professional income</div>
              <div style={{ fontSize: "28px", color: "#34d399", fontWeight: "800" }}>₹10L</div>
            </div>
          </div>

          <p>In normal taxation, you need proper books, expense records, invoices, bills and proof for every deduction. Under 44ADA, the law assumes that 50% of your professional receipts are spent on business expenses. Once you choose this presumptive route, you cannot again claim laptop, internet, software, rent, travel or other business expenses separately.</p>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #38bdf8", background: "rgba(56,189,248,0.05)" }}>
            <p style={{ color: "#38bdf8", margin: 0 }}>📌 <strong>Simple meaning</strong><br/>
            Section 44ADA is useful when your actual expenses are less than 50% of your income. For many freelancers, actual costs are much lower than 50%, so the scheme can reduce taxable income and compliance work.</p>
          </div>

          <h2>Who Is Eligible for Section 44ADA?</h2>

          <p>Section 44ADA is available to a <strong>resident individual</strong> or <strong>resident partnership firm other than LLP</strong> carrying on a specified profession. It is not meant for every online earner or every freelancer.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", margin: "32px 0" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>💻</div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>Technical consultancy</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0, lineHeight: "1.5" }}>IT consultants, software consultants, data consultants and similar professional advisory work may fit depending on actual service nature.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>⚖️</div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>Legal profession</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0, lineHeight: "1.5" }}>Advocates, legal consultants and other legal professionals.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>🏥</div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>Medical profession</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0, lineHeight: "1.5" }}>Doctors, dentists, surgeons, physiotherapists and other eligible medical professionals.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>🏗️</div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>Engineering or architecture</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0, lineHeight: "1.5" }}>Engineers, architects and professional consultants working in these fields.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>📊</div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>Accountancy</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0, lineHeight: "1.5" }}>Chartered accountants, cost accountants and eligible accounting professionals.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>🎨</div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>Interior decoration</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0, lineHeight: "1.5" }}>Interior designers, decor consultants and space planning professionals.</p>
            </div>
          </div>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #ef4444", background: "rgba(239,68,68,0.05)" }}>
            <p style={{ color: "#ef4444", margin: 0 }}>⚠️ <strong>Important eligibility warning</strong><br/>
            Do not claim 44ADA only because you are "freelancing." Social media income, YouTube income, affiliate income, commission income, advertising income and general content creator income may not automatically qualify. For software development, design, writing or marketing work, classification depends on the exact service, contract and invoice wording. Confirm with a CA when unsure.</p>
          </div>

          <h2>Section 44ADA Income Limit: ₹50 Lakh or ₹75 Lakh?</h2>

          <p>Section 44ADA has two practical receipt limits. The normal limit is ₹50 lakh. The extended limit is ₹75 lakh when cash and other non-specified receipts do not exceed 5% of total gross receipts.</p>

          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Gross receipts</th>
                <th>Payment condition</th>
                <th>44ADA status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Up to ₹50 lakh</strong></td>
                <td>No special 95% digital condition required</td>
                <td><span style={{ display: "inline-block", background: "rgba(52,211,153,0.1)", color: "#34d399", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "700" }}>Eligible, if profession qualifies</span></td>
              </tr>
              <tr>
                <td><strong>Above ₹50 lakh and up to ₹75 lakh</strong></td>
                <td>Cash and non-specified receipts should not exceed 5% of total gross receipts</td>
                <td><span style={{ display: "inline-block", background: "rgba(251,191,36,0.1)", color: "#fbbf24", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "700" }}>Conditionally eligible</span></td>
              </tr>
              <tr>
                <td><strong>Above ₹75 lakh</strong></td>
                <td>Condition does not help after this limit</td>
                <td><span style={{ display: "inline-block", background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "700" }}>Not eligible for 44ADA</span></td>
              </tr>
            </tbody>
          </table>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #fbbf24", background: "rgba(251,191,36,0.05)" }}>
            <p style={{ color: "#fbbf24", margin: 0 }}>💡 <strong>For digital freelancers</strong><br/>
            If your clients pay through bank transfer, UPI, cheque, Wise, Payoneer, PayPal or freelance platforms, your cash receipts may be very low. Still, maintain income records and bank statements because the 5% condition is based on actual receipts.</p>
          </div>

          <div className={styles.ctaBlock}>
            <h3>Check Your Tax in 30 Seconds</h3>
            <p>Use the free KaroTools calculator to estimate tax under Section 44ADA and compare your freelance income quickly.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
              <Link href="/tax-calculator" className={styles.ctaBtn}>Open Free Tax Calculator →</Link>
            </div>
          </div>

          <h2>Real Example: Freelance UI/UX Designer</h2>

          <p>Let's take a hypothetical example: Rohan is a freelance UI/UX designer earning ₹15,00,000 in a financial year.</p>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "24px", margin: "32px 0" }}>
            <h4 style={{ marginTop: 0, marginBottom: "20px", fontSize: "16px", fontWeight: "800", color: "#fff" }}>📊 Example: Rohan's ₹15,00,000 gross receipts under Section 44ADA</h4>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
              <span style={{ color: "#94a3b8" }}>Gross receipts</span>
              <span style={{ fontWeight: "700", color: "#fff" }}>₹15,00,000</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
              <span style={{ color: "#94a3b8" }}>Presumptive income under 44ADA (50%)</span>
              <span style={{ fontWeight: "700", color: "#fff" }}>₹7,50,000</span>
            </div>
            <div style={{ marginTop: "16px", color: "#94a3b8", fontSize: "14px", lineHeight: "1.6" }}>
              Tax is calculated on the taxable income of ₹7,50,000 after any other applicable deductions or rebate rules under the chosen tax regime. By opting for Section 44ADA, Rohan may reduce his compliance burden as he does not need to maintain detailed books of account or get an audit.
            </div>
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Link href="/44ada-tax-calculator" style={{ display: "inline-block", background: "#38bdf8", color: "#0f172a", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
                Use 44ADA Tax Calculator →
              </Link>
            </div>
          </div>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #f59e0b", background: "rgba(245,158,11,0.05)" }}>
            <p style={{ color: "#fcd34d", margin: 0 }}>⚠️ <strong>Disclaimer</strong><br/>
            This example is for education only. Actual tax depends on deductions, regime, rebates, other income, and latest Income Tax rules.</p>
          </div>

          <h2>New Tax Regime vs Old Tax Regime With Section 44ADA</h2>

          <p>The 44ADA calculation is the same in both regimes: eligible presumptive income is normally 50% of gross receipts. The difference comes after that, when you calculate final tax.</p>

          <div className={styles.grid2Col}>
            <div style={{ border: "2px solid #34d399", background: "rgba(52,211,153,0.05)", borderRadius: "12px", padding: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "8px", color: "#fff" }}>New Tax Regime</h4>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#34d399", letterSpacing: "-1px", marginBottom: "12px" }}>Simpler</div>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Lower slab rates, default regime, ₹12 lakh rebate threshold for eligible resident individuals, but most old deductions like 80C and 80D are not available.</p>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "24px", background: "rgba(255,255,255,0.02)" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "8px", color: "#fff" }}>Old Tax Regime</h4>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#fff", letterSpacing: "-1px", marginBottom: "12px" }}>Deduction-heavy</div>
              <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Useful when you have large 80C, 80D, HRA, home loan or other eligible deductions. Business/profession taxpayers must be careful with regime switching rules.</p>
            </div>
          </div>

          <p>For many freelancers with low deductions, the new regime is simpler. But if you regularly use 80C, 80D, home loan interest or other deductions, compare both before filing. Business/profession taxpayers should also note that switching between regimes is more restricted than for non-business taxpayers.</p>

          <h2>How to File ITR Under Section 44ADA</h2>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <div className={styles.stepContent}>
                <h3>Check profession eligibility</h3>
                <p>Confirm that your work falls under a specified profession such as technical consultancy, engineering, accountancy, legal, medical, architecture, interior decoration or CBDT-notified profession.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <div className={styles.stepContent}>
                <h3>Total your gross receipts</h3>
                <p>Add all professional receipts for the financial year before expenses. Do not calculate only profit at this stage.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepContent}>
                <h3>Check the ₹50L / ₹75L limit</h3>
                <p>If receipts exceed ₹50 lakh, verify whether cash and non-specified receipts stay within 5% to use the extended ₹75 lakh limit.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <div className={styles.stepContent}>
                <h3>Keep invoices and bank records</h3>
                <p>44ADA reduces book-keeping burden, but you should still maintain invoices, client payment proofs, GST records if applicable and TDS records.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>5</div>
              <div className={styles.stepContent}>
                <h3>Pay advance tax by March 15</h3>
                <p>Professionals using 44ADA are required to pay 100% of advance tax by March 15 of the financial year, subject to tax liability. You can read our <Link href="/blog/advance-tax-for-freelancers-india" style={{ color: "#38bdf8" }}>Advance Tax guide</Link> for full details.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>6</div>
              <div className={styles.stepContent}>
                <h3>File the correct ITR form</h3>
                <p>Most eligible resident freelancers can use ITR-4 for 44ADA if all ITR-4 conditions are satisfied. Use ITR-3 for more complex cases such as detailed books, audit, complex capital gains or ineligible ITR-4 situations.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>7</div>
              <div className={styles.stepContent}>
                <h3>E-verify after filing</h3>
                <p>After submitting your return, complete e-verification through Aadhaar OTP, net banking or another allowed method. An unverified return may be treated as invalid.</p>
              </div>
            </div>
          </div>

          <div className={styles.ctaBlock}>
            <h3>Create Clean Freelance Invoices</h3>
            <p>Even under 44ADA, income proof matters. Create professional invoices for Indian clients and keep your payment records clean.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
              <Link href="/gst-invoice-generator" className={styles.ctaBtn}>Open Invoice Generator →</Link>
            </div>
          </div>

          <h2>GST and Section 44ADA Are Different</h2>

          <p>Section 44ADA is an income tax rule. GST is a separate indirect tax law. Using 44ADA does not automatically remove GST responsibilities.</p>

          <p>If your aggregate turnover crosses the applicable GST registration threshold for services, you may need GST registration. Export services, LUT, zero-rated supply, Indian client invoices, GSTR filing and GST invoice format are separate from your income tax return.</p>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #ef4444", background: "rgba(239,68,68,0.05)" }}>
            <p style={{ color: "#ef4444", margin: 0 }}>⚠️ <strong>Do not mix income tax and GST</strong><br/>
            A freelancer can be eligible for 44ADA under income tax and still have GST obligations. Use separate records for income tax, GST invoices, GST returns and foreign inward remittance proof where relevant.</p>
          </div>

          <h2>When Section 44ADA May Not Be Best</h2>

          <p>44ADA is not always the lowest-tax option. It may not be suitable when:</p>
          <ul style={{ color: "#cbd5e1" }}>
            <li>Your actual business expenses are more than 50% of receipts.</li>
            <li>Your profession does not clearly fall under the specified list.</li>
            <li>Your gross receipts cross the allowed limit.</li>
            <li>You earn commission, brokerage, affiliate income or platform revenue that may not fit professional receipts.</li>
            <li>You have complex income such as capital gains, foreign assets, partnership income or audit requirements.</li>
          </ul>

          <div className={styles.highlightBox} style={{ borderLeft: "4px solid #34d399", background: "rgba(52,211,153,0.05)" }}>
            <p style={{ color: "#34d399", margin: 0 }}>✅ <strong>Annual 44ADA checklist</strong><br/>
            Confirm profession → total gross receipts → check cash/non-specified receipts percentage → issue invoices → track TDS/Form 26AS/AIS → calculate tax → pay advance tax by March 15 if applicable → file ITR → e-verify.</p>
          </div>

          <div className={styles.linkCards}>
            <Link href="/blog/advance-tax-for-freelancers-india" className={styles.linkCard}>
              <div className={styles.lcIcon}>🗓️</div>
              <h4>Advance Tax Guide</h4>
              <p>Learn the March 15 advance tax rule</p>
            </Link>
            <Link href="/blog/freelance-hourly-rate-vs-salary-india" className={styles.linkCard}>
              <div className={styles.lcIcon}>💰</div>
              <h4>Salary vs Freelance</h4>
              <p>How much to charge as a freelancer</p>
            </Link>
          </div>

          <h2>Frequently Asked Questions (FAQ)</h2>

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

          <div style={{ marginTop: "48px", padding: "20px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
            <strong>Disclaimer:</strong> The information provided on KaroTools is for general informational purposes only and does not constitute professional financial, tax, or legal advice. Tax laws in India frequently change, and while we strive for accuracy, you should always consult with a qualified Chartered Accountant (CA) or legal professional before making any compliance decisions. KaroTools is not responsible for any errors, omissions, or actions taken based on this content.
          </div>

        </article>
      </main>
    </div>
  );
}
