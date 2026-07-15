import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema, generateFAQSchema } from "../../lib/schema";
import Link from "next/link";
import RateCalculator from "../../RateCalculator";

export const metadata = {
  title: "Freelance Hourly Rate Calculator with Tax and GST | KaroTools",
  description: "Calculate your optimal freelance hourly rate with tax, GST, and business expenses. Find your exact target rate in INR instantly.",
  alternates: {
    canonical: "https://karotools.in/freelance-rate-calculator",
  },
};

export default function Page() {
  const faqs = [
    {
      question: "How to calculate freelance hourly rate with tax and GST?",
      answer: "To calculate a freelance hourly rate with tax and GST, you must first calculate your total target annual income (including all personal and business expenses). Divide that by your total billable hours to get your base hourly rate. Finally, add your estimated income tax bracket percentage and 18% GST (if your turnover is above ₹20 Lakhs) on top of your base rate."
    },
    {
      question: "Should I include GST in my freelance hourly rate?",
      answer: "You should only include GST in your freelance hourly rate if your total annual freelance turnover exceeds the ₹20 Lakh registration threshold, or if you export services. If you are registered, you must add 18% GST on top of your base hourly rate and explicitly mention it on your invoices."
    }
  ];
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <RateCalculator />
      
      {/* AEO Answer Block */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginBottom: "16px" }}>How does the Freelance Rate Calculator work?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            The KaroTools Freelance Rate Calculator helps Indian freelancers calculate the exact hourly or daily rate they need to charge to hit their annual income goals. It factors in your personal expenses, business costs, desired profit margin, and total billable hours. Compare your results using our <Link href="/salary-vs-freelance" style={{ color: "#38bdf8", textDecoration: "none" }}>Salary vs Freelance Calculator</Link>.
          </p>
          <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-bg)", padding: "16px", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0 0 8px 0" }}>Total Target Income = Personal Expenses + Business Costs + Desired Profit</p>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Hourly Rate = Total Target Income / Total Billable Hours</p>
          </div>
        </div>
        
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

      </div>

      <SchemaScript schema={generateFAQSchema(faqs)} />

      <SchemaScript schema={generateSoftwareSchema({
        name: "KaroTools Freelance Rate Calculator",
        url: "https://karotools.in/freelance-rate-calculator",
        description: "Calculate your optimal freelance hourly and daily rates based on expenses, taxes, and billable hours."
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Freelance Rate Calculator", url: "https://karotools.in/freelance-rate-calculator" }
      ])} />
    </div>
  );
}
