import Link from "next/link";

export default function Guide2() {
  
  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", lineHeight: "1.8", paddingBottom: "80px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 20px", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.png" alt="KaroTools Logo" style={{ height: "clamp(40px, 10vw, 56px)", margin: "0 -16px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
            <span style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
              Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
            </span>
          </div>
        </Link>
        <Link href="/guides" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Back to Guides</Link>
      </nav>

      <article style={{ maxWidth: "760px", margin: "60px auto 0", padding: "0 24px" }}>
        
        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>FREELANCE BASICS</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>6 min read</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", lineHeight: 1.15, marginBottom: "32px", color: "#f8fafc", letterSpacing: "-0.02em" }}>
          How to Price Your Freelance Services
        </h1>

        <div style={{ fontSize: "18px", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>
            The most common mistake new freelancers make is pulling a number out of thin air or simply copying what competitors are charging. If you don't calculate your rates based on your actual lifestyle costs, you will eventually burn out.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            The "Reverse Engineering" Method
          </h2>
          <p>
            Instead of guessing, you should calculate your Minimum Acceptable Rate (MAR) using this formula:
          </p>
          <ul style={{ paddingLeft: "24px", color: "#94a3b8" }}>
            <li style={{ marginBottom: "12px" }}>Calculate your total monthly personal expenses.</li>
            <li style={{ marginBottom: "12px" }}>Add your monthly business expenses (software, internet).</li>
            <li style={{ marginBottom: "12px" }}>Add your savings/investment goals.</li>
            <li style={{ marginBottom: "12px" }}>Divide by the number of billable hours you actually want to work.</li>
          </ul>
          
          <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#10b981", marginBottom: "12px" }}>Calculate Your True Rate</h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "20px" }}>
              Don't guess. Use our calculator to reverse-engineer your hourly rate based on your target income and expenses.
            </p>
            <Link href="/freelance-rate-calculator" style={{ display: "inline-block", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Calculate Hourly Rate →
            </Link>
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            Hourly vs. Project Pricing
          </h2>
          <p>
            Once you know your baseline hourly rate, you should aim to transition to <strong>Project-Based Pricing</strong> as soon as possible.
          </p>
          <p>
            When you charge hourly, you are punished for being efficient. If you learn to do a task twice as fast, you make half as much money. By charging per project (or per deliverable), you align your incentives with the client: they get the result they want, and you get rewarded for speed and expertise.
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            Protecting Your Rate with a Contract
          </h2>
          <p>
            Pricing means nothing if the client constantly asks for "one more small change" (Scope Creep). To protect your effective hourly rate on fixed-price projects, you must have a contract that clearly defines the number of revisions.
          </p>

          <div style={{ background: "rgba(0,90,230,0.05)", border: "1px solid rgba(0,90,230,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#005ae6", marginBottom: "12px" }}>Generate a Freelance Contract</h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "20px" }}>
              Create a legally sound freelance contract that protects against scope creep and delayed payments.
            </p>
            <Link href="/contract-generator" style={{ display: "inline-block", background: "linear-gradient(135deg, #005ae6, #6d28d9)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Create Contract →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
