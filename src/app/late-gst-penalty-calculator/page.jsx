import LateGSTPenalty from "../../LateGSTPenalty";
import TaxDisclaimer from "../../components/article/TaxDisclaimer";
import { generateMetadata } from "../../lib/seo";
import { generateFAQSchema } from "../../lib/schema";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "GST Late Fee Calculator India: Calculate Penalty & Interest",
  description: "Calculate GST late filing fees (₹50/₹20 per day) and 18% interest on delayed GSTR-1, GSTR-3B, or Nil returns. Free penalty calculator for Indian freelancers.",
  path: "/late-gst-penalty-calculator",
  keywords: ["gst late fee calculator india", "gst late payment penalty interest", "gst return filing due date 2026", "gst late fee for nil return"]
});

export default function Page() {
  const faqs = [
    {
      question: "What is the late fee for GST filing in India?",
      answer: "The standard late fee is ₹50 per day for normal returns (₹25 CGST + ₹25 SGST) and ₹20 per day for Nil returns (₹10 CGST + ₹10 SGST). This is often capped based on your business turnover."
    },
    {
      question: "How is interest calculated on late GST payments?",
      answer: "Under Section 50 of the CGST Act, interest is charged at 18% per annum on the net tax liability (the actual tax you owe in cash). It is calculated precisely for the exact number of days delayed."
    },
    {
      question: "Do I have to pay a penalty for a Nil Return?",
      answer: "Yes. Even if your business had zero sales and zero tax liability, you are still legally required to file a Nil return. If you file late, a penalty of ₹20 per day applies."
    }
  ];

  return (
    <div style={{ background: "#020617", minHeight: "100vh" }}>
      {/* The Interactive Calculator (Client Component) */}
      <LateGSTPenalty />

      {/* SEO Content & Guide (Server Component) */}
      <article style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px 100px", color: "#f8fafc", fontFamily: "'DM Sans', sans-serif", position: "relative", zIndex: 1 }}>
        
        <div className="glass-panel" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "40px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>How is the GST Late Fee Calculated?</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            When you miss the deadline for filing your GST returns (like GSTR-1 or GSTR-3B), the government imposes two types of penalties: a daily late fee and an annual interest rate on the unpaid tax amount.
          </p>

          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#e2e8f0", marginBottom: "12px" }}>1. Daily Late Fee</h3>
          <ul style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px", paddingLeft: "20px" }}>
            <li><strong>Normal Returns:</strong> ₹50 per day of delay (₹25 CGST + ₹25 SGST).</li>
            <li><strong>Nil Returns:</strong> ₹20 per day of delay (₹10 CGST + ₹10 SGST). A Nil return means you had zero sales and zero purchases during the month.</li>
          </ul>

          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#e2e8f0", marginBottom: "12px" }}>2. Interest on Late Payment (Section 50)</h3>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
            If you have a tax liability (you owe tax to the government), you must also pay interest at <strong>18% per annum</strong>. This interest is calculated only on the net tax liability paid in cash (after deducting Input Tax Credit).
          </p>

          <div style={{ background: "rgba(239, 68, 68, 0.05)", borderLeft: "4px solid #ef4444", padding: "20px", borderRadius: "0 12px 12px 0", marginBottom: "32px" }}>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#fca5a5", marginBottom: "8px" }}>Example Calculation</h4>
            <p style={{ color: "#cbd5e1", fontSize: "15px", lineHeight: 1.7 }}>
              Suppose your GSTR-3B was due on <strong>20th July</strong>, but you filed it on <strong>25th July</strong> (5 days late). Your net tax liability was <strong>₹10,000</strong>.<br/><br/>
              • <strong>Late Fee:</strong> 5 days × ₹50 = <strong>₹250</strong><br/>
              • <strong>Interest:</strong> ₹10,000 × 18% × (5 / 365) = <strong>₹24.65</strong><br/>
              • <strong>Total Penalty:</strong> ₹250 + ₹24.65 = <strong>₹274.65</strong>
            </p>
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "20px", color: "#f1f5f9" }}>Helpful Tools for Freelancers</h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
            Avoid penalties by ensuring your invoices are correct and calculating your GST accurately before filing:
          </p>
          <ul style={{ color: "#38bdf8", fontSize: "16px", lineHeight: 1.8 }}>
            <li style={{ marginBottom: "8px" }}><Link href="/gst-calculator" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: "600" }}>Free GST Calculator</Link> — Calculate inclusive and exclusive GST amounts.</li>
            <li><Link href="/gst-invoice-generator" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: "600" }}>Free GST Invoice Generator</Link> — Create professional, compliant invoices in seconds.</li>
          </ul>
        </div>

        {/* FAQ SECTION */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: "24px", color: "#f8fafc" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel" style={{ padding: "24px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9", marginBottom: "12px" }}>{faq.question}</h3>
                <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <TaxDisclaimer />

      </article>

      {/* Inject FAQ Schema into the Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)).replace(/</g, '\\u003c')
        }}
      />
    </div>
  );
}
