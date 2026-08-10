import ClientCalculator from "./ClientCalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema, generateFAQSchema } from "../../lib/schema";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export const metadata = {
  title: "Upwork & Fiverr Fee Calculator India | KaroTools",
  description: "Calculate Upwork and Fiverr fees and see how much you actually take home as an Indian freelancer. Compare platform fees and your net earnings.",
  alternates: {
    canonical: "https://karotools.in/upwork-fiverr-fee-calculator-india",
  },
  openGraph: {
    title: "Upwork & Fiverr Fee Calculator India | KaroTools",
    description: "Calculate Upwork and Fiverr fees and see how much you actually take home as an Indian freelancer. Compare platform fees and your net earnings.",
    url: "https://karotools.in/upwork-fiverr-fee-calculator-india",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upwork & Fiverr Fee Calculator India | KaroTools",
    description: "Calculate Upwork and Fiverr fees and see how much you actually take home as an Indian freelancer. Compare platform fees and your net earnings.",
  },
};

export default function Page() {
  const faqs = [
    {
      question: "How much does Fiverr charge sellers in India?",
      answer: "Fiverr generally deducts a 20% platform fee from seller earnings. The exact amount charged depends on the order value and any additional services provided."
    },
    {
      question: "How do I calculate my Fiverr payout in INR?",
      answer: "To calculate your Fiverr payout in INR, subtract the 20% platform fee from your order value, then deduct any applicable taxes (like GST or TDS), withdrawal fees, and foreign-exchange markup before applying the final conversion rate."
    },
    {
      question: "Does this calculator include GST or income tax?",
      answer: "This calculator allows you to input an estimated GST percentage on platform fees and an estimated withholding (TDS) percentage. It does not calculate your overall income tax liability."
    },
    {
      question: "Are Fiverr withdrawal charges included?",
      answer: "Yes, you can manually enter fixed withdrawal charges and bank receiving fees to estimate how they reduce your final payout."
    },
    {
      question: "Can I compare Fiverr and Upwork fees?",
      answer: "Yes, you can easily switch between Fiverr and Upwork in the calculator to compare estimated platform fees and your final take-home payout in INR."
    },
    {
      question: "Is the calculated payout guaranteed?",
      answer: "No. The calculated payout is an estimate based on your provided assumptions. The actual amount you receive may vary due to live exchange rates, unannounced fee changes, and your specific tax status."
    },
    {
      question: "How much should I charge to receive a specific amount?",
      answer: "If you want to receive a specific take-home amount, you need to account for the platform fee (e.g., 20%), plus any withdrawal and conversion losses, and adjust your gig price upward accordingly."
    },
    {
      question: "Does the USD to INR exchange rate affect my payout?",
      answer: "Yes. The exchange rate used by your payment provider (like Payoneer or PayPal) often includes a hidden markup, which means the rate applied to your withdrawal is typically lower than the mid-market rate."
    }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Schemas */}
      <SchemaScript schema={generateSoftwareSchema({
        name: "Fiverr Fee Calculator India",
        description: metadata.description,
        url: "https://karotools.in/upwork-fiverr-fee-calculator-india",
        category: "FinanceApplication",
        dateModified: "2026-08-10"
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Fiverr Fee Calculator India", url: "https://karotools.in/upwork-fiverr-fee-calculator-india" }
      ])} />
      <SchemaScript schema={generateFAQSchema(faqs)} />

      <Navbar />

      {/* Header */}
      <div style={{ textAlign: "center", padding: "60px 24px 20px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px", letterSpacing: "-0.5px" }}>
          Upwork & Fiverr Fee Calculator for India — Calculate Your Take-Home Pay
        </h1>
        <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
          Calculate Fiverr seller fees, estimated deductions and your take-home payout in INR.
        </p>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto 40px", padding: "0 24px", textAlign: "center" }}>
        <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
          Use this free Fiverr Fee Calculator for India to estimate platform fees, currency conversion and your final take-home payout in INR. Enter your order value to see the estimated amount remaining after Fiverr deductions. You can also compare the result with Upwork fees using the same calculator.
        </p>
      </div>

      {/* Calculator Component */}
      <ClientCalculator />

      {/* SEO Content Section */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1, fontFamily: "var(--font-inter, sans-serif)", lineHeight: "1.7", color: "var(--text-secondary)" }}>
        
        {/* Structure updated per Priority 3 */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          How the Upwork and Fiverr Fee Calculator Works
        </h2>
        <ol style={{ paddingLeft: "24px", display: "grid", gap: "8px", marginBottom: "24px" }}>
          <li><strong>Select your platform</strong> (Upwork or Fiverr) from the dropdown.</li>
          <li><strong>Enter the order value</strong> of your project.</li>
          <li><strong>Choose the relevant currency</strong> where available (typically USD).</li>
          <li><strong>Review the estimated platform deduction</strong> based on the platform's standard fee structure.</li>
          <li><strong>Check the estimated amount after fees</strong> to see your net project earnings.</li>
          <li><strong>Review the estimated INR payout and assumptions</strong> including any manual exchange rates and withdrawal fees you have entered.</li>
        </ol>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Upwork Fees for Indian Freelancers
        </h2>
        <p style={{ marginBottom: "24px" }}>
          Upwork deducts platform fees directly from your seller earnings. As of recent updates, Upwork generally applies a flat 10% fee on freelancer earnings. This calculator estimates the amount remaining after these platform deductions. Your chosen withdrawal provider (such as Payoneer, PayPal, or direct bank transfer) may apply additional fixed or percentage-based charges. Always verify current platform pricing on the official Upwork website.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Fiverr Fees for Indian Freelancers
        </h2>
        <p style={{ marginBottom: "24px" }}>
          Fiverr deducts platform fees directly from your seller earnings, typically applying a flat 20% platform fee. This calculator estimates the amount remaining after these platform deductions. The actual amount you receive in INR can be further affected by the currency conversion rate applied at the time of withdrawal, plus any provider-specific withdrawal fees. Always verify current platform pricing on the official Fiverr website.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Upwork vs Fiverr: Fee Comparison
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "24px" }}>
          <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse", border: "1px solid var(--border-color)" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)", textAlign: "left" }}>
                <th style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>Platform</th>
                <th style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>Fee Model (Calculator Assumption)</th>
                <th style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>Example Project Value</th>
                <th style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>Estimated Platform Fee</th>
                <th style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>Estimated Amount After Platform Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}><strong>Fiverr</strong></td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>Flat 20% default assumption</td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>$100</td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>$20</td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>$80</td>
              </tr>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}><strong>Upwork</strong></td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>Flat 10% default assumption</td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>$100</td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>$10</td>
                <td style={{ padding: "12px", borderBottom: "1px solid var(--border-color)" }}>$90</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
          <em>Note: Both calculations are estimates based on the default assumptions in this calculator. You can use the tool above to run exact scenarios by adjusting these numbers.</em>
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          How Much Do You Take Home?
        </h2>
        <p style={{ marginBottom: "24px" }}>
          Indian freelancers need to carefully estimate their platform deductions because the advertised gig price is rarely the final amount deposited into an Indian bank account. To calculate how a USD order value is converted into an INR estimate, this tool multiplies your earnings after platform fees by your manually entered exchange rate. This exchange rate is strictly an estimate. The actual provider rate you receive during withdrawal will likely include a hidden spread (FX markup) that differs from the live market rate. Additional bank or payment-provider charges may also reduce your final payout.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Example Calculation
        </h2>
        <div style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border-color)", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "var(--text-primary)" }}>Fiverr Platform-Fee-Only Example</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
            <li style={{ display: "flex", justifyContent: "space-between" }}><span>Order value:</span> <strong style={{ color: "var(--text-primary)" }}>₹10,000</strong></li>
            <li style={{ display: "flex", justifyContent: "space-between" }}><span>Fiverr platform-fee assumption (20%):</span> <strong style={{ color: "#ef4444" }}>-₹2,000</strong></li>
            <li style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}><span>Amount after platform fee only:</span> <strong style={{ color: "var(--text-primary)", fontSize: "18px" }}>₹8,000</strong></li>
          </ul>
        </div>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", background: "rgba(56, 189, 248, 0.05)", borderLeft: "4px solid #38bdf8", padding: "12px", borderRadius: "4px", marginBottom: "24px" }}>
          <strong>Note:</strong> The final amount credited to your bank account may differ because of currency conversion, withdrawal fees, payment-provider charges and applicable taxes. GST, withholding, and FX markup are not included in this simplified example.
        </p>

        {/* Methodology & Sources Section */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Calculation Assumptions and Sources
        </h2>
        <ul style={{ listStyleType: "disc", paddingLeft: "24px", display: "grid", gap: "8px", marginBottom: "24px" }}>
          <li><strong>Fiverr platform-fee assumption:</strong> Defaults to a flat 20% deduction as an editable assumption based on standard Fiverr seller fees.</li>
          <li><strong>Upwork platform-fee assumption:</strong> Defaults to a flat 10% deduction as an editable assumption.</li>
          <li><strong>Exchange-rate method:</strong> Relies entirely on the user's manual input. Does not fetch live API data.</li>
          <li><strong>GSTIN and Withholding logic:</strong> Applies user-entered percentage deductions directly to the platform fee or gross amount respectively, if enabled.</li>
          <li><strong>Withdrawal & Bank fee handling:</strong> Fixed amounts subtracted after platform fees, before final output.</li>
          <li><strong>FX markup handling:</strong> A percentage-based reduction applied to the converted INR subtotal.</li>
          <li><strong>Included deductions:</strong> Platform fees, withdrawal costs, FX markup, and explicitly inputted tax estimates.</li>
          <li><strong>Excluded deductions:</strong> Income tax and unentered hidden bank fees are not calculated.</li>
          <li><strong>Last reviewed date:</strong> July 2026.</li>
        </ul>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontStyle: "italic" }}>
          KaroTools is an independent calculator website and is not affiliated with Fiverr or Upwork.
        </p>

        {/* FAQ Section */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "24px" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "8px" }}>
                {faq.question}
              </h3>
              <p style={{ margin: 0, fontSize: "15px" }}>{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Related Links */}
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Related KaroTools Resources
        </h2>
        <ul style={{ listStyleType: "none", padding: 0, display: "grid", gap: "12px" }}>
          <li><Link href="/tax-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Freelancer tax calculator</Link></li>
          <li><Link href="/44ada-tax-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Section 44ADA calculator</Link></li>
          <li><Link href="/gst-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ GST calculator</Link></li>
          <li><Link href="/invoice-generator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Invoice generator</Link></li>
          <li><Link href="/tools/tax-calendar-india-2026" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Freelancer tax calendar</Link></li>
        </ul>

      </div>
    </div>
  );
}
