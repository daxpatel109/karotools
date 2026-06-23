export const metadata = { title: "How to Price Freelance Services In India — KaroTools", description: "Learn how to calculate your hourly rate, factor in taxes and expenses, and effectively price your freelance services in India." };
import Link from "next/link";

export default function Guide2() {
  
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)", lineHeight: "1.8", paddingBottom: "80px" }}>
      
      
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 20px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", background: "var(--bg-primary)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--glass-bg)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
            <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
              Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
            </span>
          </div>
        </Link>
        <Link href="/guides" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Back to Guides</Link>
      </nav>

      <article style={{ maxWidth: "760px", margin: "60px auto 0", padding: "0 24px" }}>
        
        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>FREELANCE BASICS</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>6 min read</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.15, marginBottom: "32px", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          How to Price Your Freelance Services
        </h1>

            <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "var(--text-secondary)", alignItems: "center", marginBottom: "24px" }}>
              <span>?? June 15, 2026</span>
              <span>?? By <Link href="/author/dax-patel" style={{ color: "#38bdf8", textDecoration: "none" }}>Dax Patel</Link></span>
            </div>

        <div style={{ fontSize: "18px", color: "var(--text-primary)", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>
            The most common mistake new freelancers make is pulling a number out of thin air or simply copying what competitors are charging. If you don't calculate your rates based on your actual lifestyle costs, you will eventually burn out.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>
            The "Reverse Engineering" Method
          </h2>
          <p>
            Instead of guessing, you should calculate your Minimum Acceptable Rate (MAR) using this formula:
          </p>
          <ul style={{ paddingLeft: "24px", color: "var(--text-secondary)" }}>
            <li style={{ marginBottom: "12px" }}>Calculate your total monthly personal expenses.</li>
            <li style={{ marginBottom: "12px" }}>Add your monthly business expenses (software, internet).</li>
            <li style={{ marginBottom: "12px" }}>Add your savings/investment goals.</li>
            <li style={{ marginBottom: "12px" }}>Divide by the number of billable hours you actually want to work.</li>
          </ul>
          
          <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#10b981", marginBottom: "12px" }}>Calculate Your True Rate</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "20px" }}>
              Don't guess. Use our calculator to reverse-engineer your hourly rate based on your target income and expenses.
            </p>
            <Link href="/freelance-rate-calculator" style={{ display: "inline-block", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Calculate Hourly Rate →
            </Link>
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>
            Hourly vs. Project Pricing
          </h2>
          <p>
            Once you know your baseline hourly rate, you should aim to transition to <strong>Project-Based Pricing</strong> as soon as possible.
          </p>
          <p>
            When you charge hourly, you are punished for being efficient. If you learn to do a task twice as fast, you make half as much money. By charging per project (or per deliverable), you align your incentives with the client: they get the result they want, and you get rewarded for speed and expertise.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)", marginTop: "32px", marginBottom: "16px" }}>
            Protecting Your Rate with a Contract
          </h2>
          <p>
            Pricing means nothing if the client constantly asks for "one more small change" (Scope Creep). To protect your effective hourly rate on fixed-price projects, you must have a contract that clearly defines the number of revisions.
          </p>

          <div style={{ background: "rgba(0,90,230,0.05)", border: "1px solid rgba(0,90,230,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#005ae6", marginBottom: "12px" }}>Generate a Freelance Contract</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "20px" }}>
              Create a legally sound freelance contract that protects against scope creep and delayed payments.
            </p>
            <Link href="/contract-generator" style={{ display: "inline-block", background: "linear-gradient(135deg, #005ae6, #6d28d9)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Create Contract →
            </Link>
          </div>
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

    </div>
  );
}
