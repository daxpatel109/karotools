import FIRECalculator from '../../FIRECalculator';
import Script from 'next/script';

export const metadata = {
  title: 'India FIRE Calculator 2026 – Early Retirement Tool for Freelancers',
  description: 'Calculate your FIRE number with our India-focused Retirement Calculator. Input expenses, ROI, inflation & use a 3.5% withdrawal rule. Plan Lean vs Fat FIRE as an Indian freelancer with interactive charts.',
  alternates: {
    canonical: 'https://karotools.in/fire-calculator',
  },
  openGraph: {
    title: 'India FIRE Calculator 2026 – Early Retirement Tool for Freelancers',
    description: 'Calculate your FIRE number with our India-focused Retirement Calculator. Input expenses, ROI, inflation & use a 3.5% withdrawal rule. Plan Lean vs Fat FIRE as an Indian freelancer with interactive charts.',
    url: 'https://karotools.in/fire-calculator',
    siteName: 'KaroTools',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function FIRECalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the FIRE number and how is it calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your FIRE number is the total corpus needed so that 4% (or your chosen withdrawal rate) covers all retirement expenses. In India, it’s typically Annual Expenses × 25 (at 4% SWR). Many experts use a lower 3–3.5% SWR here, implying ~28–33× expenses to account for higher inflation."
        }
      },
      {
        "@type": "Question",
        "name": "Lean FIRE vs Fat FIRE – what’s the difference in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lean FIRE means retiring on a very frugal budget (essentials-only). It often uses about 15× your annual expenses. Fat FIRE means a comfortable/luxurious retirement, roughly 50× expenses. Most people fall in between. Running our calculator for both scenarios helps set realistic goals."
        }
      },
      {
        "@type": "Question",
        "name": "What safe withdrawal rate (SWR) should Indian retirees use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike the standard 4% rule (US-based), financial planners in India recommend 3–3.5% SWR due to higher long-term inflation (6–7% CPI) and cost risks. Using 3.5% means multiplying expenses by ~28.6 instead of 25. You can adjust this in our calculator’s slider."
        }
      },
      {
        "@type": "Question",
        "name": "How can a freelancer in India plan for early retirement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As a freelancer, you must self-fund retirement (no employer PF). Start by tracking your current expenses and setting a savings rate. Use tools like this FIRE calculator to project your corpus. Consider maxing SIPs, PPF/NPS contributions, and lowering costs. Consistent investing is key — even ₹5–10K per month can grow significantly over time."
        }
      },
      {
        "@type": "Question",
        "name": "How does inflation affect my FIRE goal in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High Indian inflation (6–7%) means your expenses grow quickly. Our calculator adjusts future expenses using your inflation input. For example, ₹1L monthly today could cost ₹2L+ in 10–15 years, requiring a much larger corpus. Always use real (inflation-adjusted) returns when planning."
        }
      }
    ]
  };

  return (
    <>
      <main>
        <FIRECalculator />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        {/* On-Page SEO / Content Section (For Semantic Search/UX) */}
        <section style={{ padding: "40px 5vw", background: "#0b0f19", color: "#f1f5f9", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px" }}>Frequently Asked Questions</h2>
            
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>What is the FIRE number and how is it calculated?</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                Your FIRE number is the total corpus needed so that 4% (or your chosen withdrawal rate) covers all retirement expenses. In India, it’s typically Annual Expenses × 25 (at 4% SWR). Many experts use a lower 3–3.5% SWR here, implying ~28–33× expenses to account for higher inflation.
              </p>
            </div>
            
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>Lean FIRE vs Fat FIRE – what’s the difference in India?</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                Lean FIRE means retiring on a very frugal budget (essentials-only). It often uses about 15× your annual expenses. Fat FIRE means a comfortable/luxurious retirement, roughly 50× expenses. Most people fall in between. Running our calculator for both scenarios helps set realistic goals.
              </p>
            </div>
            
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>What safe withdrawal rate (SWR) should Indian retirees use?</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                Unlike the standard 4% rule (US-based), financial planners in India recommend 3–3.5% SWR due to higher long-term inflation (6–7% CPI) and cost risks. Using 3.5% means multiplying expenses by ~28.6 instead of 25. You can adjust this in our calculator’s slider.
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>How can a freelancer in India plan for early retirement?</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                As a freelancer, you must self-fund retirement (no employer PF). Start by tracking your current expenses and setting a savings rate. Use tools like this FIRE calculator to project your corpus. Consider maxing SIPs, PPF/NPS contributions, and lowering costs. Consistent investing is key — even ₹5–10K per month can grow significantly over time.
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#38bdf8", marginBottom: "8px" }}>How does inflation affect my FIRE goal in India?</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                High Indian inflation (6–7%) means your expenses grow quickly. Our calculator adjusts future expenses using your inflation input. For example, ₹1L monthly today could cost ₹2L+ in 10–15 years, requiring a much larger corpus. Always use real (inflation-adjusted) returns when planning.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
