import UGCProfessorCalculator from "../../UGCProfessorCalculator";
import TaxDisclaimer from "../../components/article/TaxDisclaimer";
import { generateMetadata } from "../../lib/seo";
import { generateFAQSchema, SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "UGC Professor Salary & Tax Calculator (7th Pay Commission)",
  description: "Calculate exact in-hand salary, DA, HRA, and TDS for Assistant, Associate, and Senior University Professors under the UGC 7th CPC Academic Levels.",
  path: "/ugc-professor-salary-calculator",
  keywords: [
    "UGC professor salary calculator",
    "7th pay commission salary calculator for teachers",
    "university professor salary India",
    "assistant professor salary UGC",
    "academic level 10 salary calculator",
    "calculate TDS for government teachers",
    "HRA DA calculation for professors"
  ]
});

export default function Page() {
  const faqs = [
    {
      question: "How is a UGC Professor's salary calculated under the 7th Pay Commission?",
      answer: "A UGC professor's gross salary is calculated by taking the Basic Pay (determined by their Academic Level and Cell) and adding Dearness Allowance (DA), House Rent Allowance (HRA), and Transport Allowance (TA). The Net In-Hand Salary is derived by subtracting mandatory deductions like NPS (10% of Basic + DA), Professional Tax, and Income Tax (TDS)."
    },
    {
      question: "What is the HRA and DA for Assistant Professors in India?",
      answer: "For Assistant Professors (Academic Level 10), the DA percentage is updated periodically by the government (often around 50% as of recent updates). The HRA depends on the city: 27% for X-class cities (metros), 18% for Y-class cities, and 9% for Z-class cities."
    },
    {
      question: "How much is deducted for NPS from a university professor's salary?",
      answer: "Under the National Pension System (NPS) Tier 1, exactly 10% of the professor's (Basic Pay + Dearness Allowance) is mandatorily deducted from their monthly salary."
    },
    {
      question: "Which tax regime is better for UGC Professors: Old or New?",
      answer: "The New Tax Regime is generally better for professors with fewer investments, as it offers a higher rebate (no tax up to ₹7 Lakhs) and lower tax slabs. However, if a professor pays significant HRA rent, maxes out 80C (₹1.5L), and claims extra NPS 80CCD(1B) (₹50k), the Old Tax Regime may still result in a lower TDS."
    }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* The Interactive Calculator (Client Component) */}
      <UGCProfessorCalculator />

      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px", position: "relative", zIndex: 1 }}>
        
        {/* Related Guides / Tools CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginBottom: "8px" }}>Compare with Freelance</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Wondering how a university salary compares to independent consulting?</p>
            <Link href="/salary-vs-freelance" style={{ color: "#38bdf8", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>Compare Incomes →</Link>
          </div>
          <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#10b981", marginBottom: "8px" }}>Income Tax Calculator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "16px" }}>Run a deep dive on your tax liability using standard deductions.</p>
            <Link href="/tax-calculator" style={{ color: "#10b981", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>Calculate Tax →</Link>
          </div>
        </div>

        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>Understanding UGC Pay Matrices</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The 7th Central Pay Commission (CPC) revolutionized how university and college teachers are paid in India. Instead of the old "Pay Band and Academic Grade Pay (AGP)" system, salaries are now determined by <strong>Academic Levels and Cells</strong>.
          </p>
          <ul style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px", paddingLeft: "20px" }}>
            <li><strong>Level 10:</strong> Assistant Professor (Entry Level). Starting Basic Pay: ₹57,700.</li>
            <li><strong>Level 11:</strong> Assistant Professor (Senior Scale). Starting Basic Pay: ₹68,900.</li>
            <li><strong>Level 12:</strong> Assistant Professor (Selection Grade). Starting Basic Pay: ₹79,800.</li>
            <li><strong>Level 13A:</strong> Associate Professor. Starting Basic Pay: ₹1,31,400.</li>
            <li><strong>Level 14:</strong> Professor. Starting Basic Pay: ₹1,44,200.</li>
          </ul>
        </div>
      </div>

      {/* SEO Content (Server Component) */}
      <article style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px 100px", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", position: "relative", zIndex: 1 }}>
        
        {/* FAQ SECTION */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "24px", color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel" style={{ padding: "24px", borderRadius: "16px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>{faq.question}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <TaxDisclaimer />

      </article>

      {/* Structured Data for SEO/AEO */}
      <SchemaScript schema={generateFAQSchema(faqs)} />
      <SchemaScript schema={generateSoftwareSchema({
        name: "UGC Professor Salary & Tax Calculator",
        url: "https://karotools.in/ugc-professor-salary-calculator",
        description: "Calculate exact in-hand salary, DA, HRA, and TDS for Assistant, Associate, and Senior University Professors under the UGC 7th CPC."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "UGC Salary Calculator", url: "https://karotools.in/ugc-professor-salary-calculator" }
      ])} />
    </div>
  );
}
