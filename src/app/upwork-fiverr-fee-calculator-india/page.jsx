import ClientCalculator from "./ClientCalculator";
import { SchemaScript, generateSoftwareSchema, generateBreadcrumbSchema, generateFAQSchema } from "../../lib/schema";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export const metadata = {
  title: "Upwork & Fiverr Fee Calculator India | Estimate Take-Home INR",
  description: "Estimate your Indian bank payout after Upwork/Fiverr fees, GST assumptions, TDS or withholding, payout charges, bank fees, and forex markup.",
  alternates: {
    canonical: "https://karotools.in/upwork-fiverr-fee-calculator-india",
  },
};

export default function Page() {
  const faqs = [
    {
      question: "Does Upwork deduct TDS in India?",
      answer: "Withholding or tax deduction can depend on your user status and platform rules (such as Section 194O TDS). This calculator lets you enter your own withholding percentage to estimate the deduction."
    },
    {
      question: "Does Fiverr deduct tax from Indian sellers?",
      answer: "Seller deductions and tax treatment can vary by platform rules and the tax information you provide. You should verify your specific tax status in your Fiverr payment settings."
    },
    {
      question: "Why is my final INR lower than my project amount?",
      answer: "Your final INR is often lower because platform fees, GST assumptions, withholding, withdrawal fees, bank receiving fees, and hidden FX markup can reduce the amount credited to your bank."
    },
    {
      question: "Should I use Wise, Payoneer, PayPal, or direct bank?",
      answer: "The best method depends on payout fees, FX markup, withdrawal charges, speed, and availability. Use the comparison result in our tool as an estimate, not a guaranteed recommendation."
    },
    {
      question: "Is this calculator exact?",
      answer: "No. It is an estimate based on your editable assumptions. Your actual payout can change based on platform policy updates, live exchange rates, payout methods, bank fees, and your tax status."
    }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Schemas */}
      <SchemaScript schema={generateSoftwareSchema({
        name: "Upwork & Fiverr India Take-Home Calculator",
        description: metadata.description,
        url: "https://karotools.in/upwork-fiverr-fee-calculator-india",
        category: "FinanceApplication"
      })} />
      <SchemaScript schema={generateBreadcrumbSchema([
        { name: "Home", url: "https://karotools.in" },
        { name: "Upwork & Fiverr Take-Home Calculator", url: "https://karotools.in/upwork-fiverr-fee-calculator-india" }
      ])} />
      <SchemaScript schema={generateFAQSchema(faqs)} />

      <Navbar />

      {/* Header */}
      <div style={{ textAlign: "center", padding: "60px 24px 20px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px", letterSpacing: "-0.5px" }}>
          Upwork & Fiverr India Take-Home Calculator
        </h1>
        <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
          Estimate exactly how much money may land in your Indian bank account after platform fees, taxes, and forex conversions.
        </p>
      </div>

      {/* Calculator Component */}
      <ClientCalculator />

      {/* SEO Content Section */}
      <div style={{ maxWidth: "820px", margin: "40px auto 0", padding: "0 24px 100px", position: "relative", zIndex: 1, fontFamily: "var(--font-inter, sans-serif)", lineHeight: "1.7", color: "var(--text-secondary)" }}>
        
        {/* Direct Answer Block */}
        <div style={{ background: "var(--bg-secondary)", padding: "24px", borderRadius: "12px", borderLeft: "4px solid #38bdf8", marginBottom: "40px" }}>
          <p style={{ margin: 0, color: "var(--text-primary)", fontWeight: "500", fontSize: "16px" }}>
            Indian freelancers often receive less than the project amount because platform fees, GST assumptions, withholding, payout charges, bank fees, and forex markup can reduce the final INR credited.
          </p>
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Why Indian freelancers receive less than the project amount
        </h2>
        <p>
          When you earn money on global freelance platforms, the amount you see on your dashboard is rarely the amount that hits your local bank account. Your earnings are typically reduced by several layers of deductions:
        </p>
        <ul style={{ listStyleType: "disc", paddingLeft: "24px", marginBottom: "24px" }}>
          <li><strong>Platform fee:</strong> The percentage the marketplace deducts.</li>
          <li><strong>Payout fee:</strong> The cost to withdraw or transfer the funds.</li>
          <li><strong>FX markup:</strong> The hidden spread in the currency conversion rate.</li>
          <li><strong>Bank receiving fee:</strong> The charge your local bank may apply to incoming foreign transfers.</li>
          <li><strong>Indian withholding estimate:</strong> Tax Deducted at Source (TDS) under laws like 194O.</li>
          <li><strong>GST estimate on platform fees:</strong> The 18% reverse charge GST applied if you do not provide a GSTIN.</li>
        </ul>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Platform fee vs payout fee vs forex markup
        </h2>
        <p>
          It is crucial to understand the difference between the three primary costs. The <strong>platform fee</strong> is the marketplace deduction for using their service (e.g., Upwork's 10% or Fiverr's 20%). The <strong>payout fee</strong> is the flat withdrawal or transfer cost charged by the payment processor. Finally, the <strong>forex markup</strong> is the hidden spread between the real mid-market exchange rate and the actual payout conversion rate offered by services like Payoneer, PayPal, or local banks.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          GSTIN and GST estimate on platform fees
        </h2>
        <p>
          GST treatment can depend heavily on the platform, your invoicing model, your GSTIN status, and the platform's current policy. If you do not provide a valid GSTIN to platforms like Upwork or Fiverr, they are typically required to charge an 18% GST on the <em>platform fee</em> itself. This calculator only estimates the direct impact if a GST estimate applies to those fees. You should always verify platform invoices and GST treatment with your tax advisor.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Indian withholding estimate note
        </h2>
        <p>
          Withholding and TDS treatment can depend on platform rules, your PAN/Aadhaar status, your invoice model, and current tax laws (such as Section 194O). This tool allows you to enter the withholding percentage manually as an editable assumption. It is not a filing or compliance decision tool.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Example: $500 project payout
        </h2>
        <p>
          Imagine you complete a $500 project on Upwork. Assuming a 10% platform fee, you lose $50. If you haven't provided a GSTIN, an 18% GST on that $50 fee costs you another $9. If a 1% TDS applies, that's another $5. When withdrawing the remaining $436 via a method with a 2% FX markup and a $0.99 withdrawal fee, your final converted amount in INR drops significantly compared to multiplying $500 by the direct Google exchange rate.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          How to reduce payout loss
        </h2>
        <p>
          You can optimize your take-home pay by following a few safe tips. First, carefully compare payout methods (like Wise vs. Direct to Local Bank) to minimize FX markup. Always check the actual exchange rate being offered on the day of withdrawal. Keep your GSTIN and platform tax information updated if applicable to avoid reverse charges. Finally, review all estimated deductions before accepting long-term work. You can also use the <Link href="/invoice-generator" style={{ color: "#38bdf8" }}>KaroTools invoice generator</Link> or <Link href="/tax-calculator" style={{ color: "#38bdf8" }}>tax tools</Link> for better financial planning.
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

        {/* Disclaimer */}
        <div style={{ marginTop: "40px", padding: "20px", background: "rgba(239, 68, 68, 0.05)", borderLeft: "4px solid #ef4444", borderRadius: "8px" }}>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)" }}>
            <strong>Disclaimer:</strong> This calculator is an estimate only. It does not determine tax filing liability, GST compliance, or actual remittance compliance. Please verify platform fees, payout charges, exchange rates, and tax treatment with official sources or a tax professional.
          </p>
        </div>

        {/* Related Links */}
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)", marginTop: "40px", marginBottom: "16px" }}>
          Related KaroTools Resources
        </h2>
        <ul style={{ listStyleType: "none", padding: 0, display: "grid", gap: "12px" }}>
          <li><Link href="/gst-calculator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ GST Calculator India</Link></li>
          <li><Link href="/invoice-generator" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Free Freelance Invoice Generator</Link></li>
          <li><Link href="/guides/gst-for-freelancers-india" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Guide: GST for Freelancers in India</Link></li>
          <li><Link href="/guides/hsn-sac-codes-freelancers" style={{ color: "#38bdf8", textDecoration: "none" }}>→ HSN/SAC Codes for Freelancers</Link></li>
          <li><Link href="/blog/freelance-hourly-rate-vs-salary-india" style={{ color: "#38bdf8", textDecoration: "none" }}>→ Freelance Hourly Rate vs Salary Calculator</Link></li>
        </ul>

      </div>
    </div>
  );
}
