import { generateMetadata } from "../../../lib/seo";
import { SchemaScript, generateArticleSchema, generateBreadcrumbSchema } from "../../../lib/schema";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export const metadata = generateMetadata({
  title: "Freelancer Tax Calendar India 2026 | GST & ITR Deadlines",
  description: "Never miss a tax deadline. A complete 2026 tax calendar for Indian freelancers covering Advance Tax, ITR filing, and GST return due dates.",
  path: "/tools/tax-calendar-india-2026",
  keywords: ["tax calendar 2026", "advance tax dates", "GST due dates", "ITR due date freelancer", "India tax deadlines 2026"]
});

export default function Page() {
  const deadlines = [
    { date: "June 15, 2026", event: "Advance Tax (Q1)", desc: "15% of estimated tax liability for FY 2026-27 (AY 2027-28)." },
    { date: "July 31, 2026", event: "ITR Filing Deadline", desc: "Last date to file Income Tax Return (ITR-3 or ITR-4) for FY 2025-26 (AY 2026-27) without late fee (for non-audit cases)." },
    { date: "September 15, 2026", event: "Advance Tax (Q2)", desc: "45% of estimated tax liability for FY 2026-27 (AY 2027-28)." },
    { date: "December 15, 2026", event: "Advance Tax (Q3)", desc: "75% of estimated tax liability for FY 2026-27 (AY 2027-28)." },
    { date: "March 15, 2027", event: "Advance Tax (Q4)", desc: "100% of estimated tax liability for FY 2026-27 (AY 2027-28). (Also the single deadline for Section 44ADA opt-ins)." },
    { date: "March 31, 2027", event: "End of Financial Year", desc: "Last date to make tax-saving investments (80C, etc.) for FY 2026-27 (AY 2027-28)." }
  ];

  const gstDeadlines = [
    { type: "GSTR-1 (Monthly)", desc: "11th of the following month." },
    { type: "GSTR-3B (Monthly)", desc: "20th of the following month." },
    { type: "GSTR-1 (QRMP Scheme)", desc: "13th of the month following the quarter." },
    { type: "GSTR-3B (QRMP Scheme)", desc: "22nd or 24th of the month following the quarter, depending on the state." }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      
      <article style={{ maxWidth: "820px", margin: "0 auto", padding: "60px 24px 100px", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px", letterSpacing: "-0.5px" }}>
            Freelancer Tax Calendar India (2026)
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            A complete schedule of all Advance Tax, ITR, and GST deadlines for Indian freelancers and professionals.
          </p>
        </div>

        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "40px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px" }}>Income Tax & Advance Tax Deadlines</h2>
          <div style={{ overflowX: "auto", marginBottom: "32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "var(--text-secondary)", fontSize: "16px", textAlign: "left", border: "1px solid var(--glass-border)", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--glass-border)" }}>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Date</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Event</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((d, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)", whiteSpace: "nowrap" }}>{d.date}</td>
                    <td style={{ padding: "12px 16px", fontWeight: "600" }}>{d.event}</td>
                    <td style={{ padding: "12px 16px" }}>{d.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px" }}>GST Return Deadlines</h2>
          <div style={{ overflowX: "auto", marginBottom: "32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "var(--text-secondary)", fontSize: "16px", textAlign: "left", border: "1px solid var(--glass-border)", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--glass-border)" }}>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Return Type</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Standard Due Date</th>
                </tr>
              </thead>
              <tbody>
                {gstDeadlines.map((d, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)" }}>{d.type}</td>
                    <td style={{ padding: "12px 16px" }}>{d.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontStyle: "italic", marginBottom: "24px", lineHeight: "1.6" }}>
            <strong>Source:</strong> Deadlines are sourced from the official <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>Income Tax Department</a> and <a href="https://www.cbic.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>CBIC</a> portals. Dates are subject to change based on official notifications. Missing deadlines may result in penalties, which you can estimate using our <Link href="/late-gst-penalty-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>Late GST Penalty Calculator</Link>.<br/>
            <strong>Last Verified:</strong> August 10, 2026.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "16px" }}>Related KaroTools</h2>
          <ul style={{ listStyleType: "none", padding: 0, display: "grid", gap: "12px" }}>
            <li><Link href="/advance-tax-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Advance Tax Calculator</Link></li>
            <li><Link href="/tax-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Income Tax Calculator</Link></li>
            <li><Link href="/44ada-tax-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ 44ADA Calculator</Link></li>
          </ul>

        </div>
      </article>

      <SchemaScript schema={generateArticleSchema({
        title: "Freelancer Tax Calendar India (2026)",
        description: "A complete schedule of all Advance Tax, ITR, and GST deadlines for Indian freelancers.",
        url: "https://karotools.in/tools/tax-calendar-india-2026",
        datePublished: "2026-08-10",
        dateModified: "2026-08-10",
        authorName: "KaroTools"
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Tools", url: "https://karotools.in/tools" },
        { name: "Tax Calendar 2026", url: "https://karotools.in/tools/tax-calendar-india-2026" }
      ])} />
    </div>
  );
}
