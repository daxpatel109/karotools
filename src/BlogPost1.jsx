import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BlogPost1() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The Freelancer's Guide to the MSME 45-Day Payment Rule | KaroTools Blog";
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Learn how Section 43B(h) of the Income Tax Act protects Indian freelancers from late payments, and how to enforce the 45-day rule with your clients.";
  }, []);

  const pStyle = { fontSize: "17px", color: "#94a3b8", lineHeight: "1.8", marginBottom: "24px" };
  const h2Style = { fontSize: "28px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "48px", marginBottom: "20px" };
  const h3Style = { fontSize: "20px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#e2e8f0", marginTop: "32px", marginBottom: "16px" };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/blog" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Back to Blog</Link>
        </div>
      </nav>

      {/* Article Header */}
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 120px" }}>
        
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" }}>
          <span style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>LEGAL & TAX</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>June 6, 2026 • 5 min read</span>
        </div>

        <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", lineHeight: 1.15, marginBottom: "32px", color: "#f8fafc" }}>
          The Freelancer's Guide to the MSME 45-Day Payment Rule (Section 43B(h))
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "48px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", background: "#0f172a", border: "2px solid #1e293b", position: "relative" }}>
            <img 
              src="/dax-profile.jpg" 
              alt="Dax Patel" 
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "#f8fafc", fontSize: "20px", fontWeight: "bold" }}>
              DP
            </div>
          </div>
          <div>
            <Link to="/author/dax-patel" style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#e2e8f0", textDecoration: "none", display: "inline-block" }} onMouseEnter={e => e.target.style.textDecoration = "underline"} onMouseLeave={e => e.target.style.textDecoration = "none"}>Dax Patel</Link>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Empowering Indian Freelancers</p>
          </div>
        </div>

        {/* Article Body */}
        <div style={{ fontSize: "18px" }}>
          <p style={{ ...pStyle, fontSize: "20px", color: "#e2e8f0", lineHeight: "1.6" }}>
            Late payments are the number one reason freelancers and small agencies fail in India. You do the work, submit the invoice, and then... silence. The client says "it's with finance" for three months. 
          </p>

          <p style={pStyle}>
            Fortunately, the Government of India has introduced a massive legal shield for small businesses and freelancers: <strong>Section 43B(h) of the Income Tax Act</strong>, working in tandem with the MSMED Act of 2006. If you know how to use it, you will never wait 90 days for a payment again.
          </p>

          <h2 style={h2Style}>What is the 45-Day Rule?</h2>
          <p style={pStyle}>
            In simple terms: If a client buys services or goods from a registered Micro or Small Enterprise (MSME), they <strong>must pay the invoice within 45 days</strong> (or 15 days if no written agreement exists). 
          </p>
          <p style={pStyle}>
            If they fail to pay within this timeline, two things happen to the client:
          </p>
          <ul style={{ ...pStyle, paddingLeft: "24px" }}>
            <li style={{ marginBottom: "12px" }}><strong>Heavy Penalties:</strong> They are legally required to pay compound interest to you at three times the bank rate notified by the RBI.</li>
            <li style={{ marginBottom: "12px" }}><strong>Tax Nightmare:</strong> The client cannot claim that expense as a tax deduction in the current financial year. They have to pay income tax on the amount they owe you!</li>
          </ul>

          <h2 style={h2Style}>Does this apply to Freelancers?</h2>
          <p style={pStyle}>
            <strong>Yes!</strong> But there is a catch. You must be officially registered as a Micro or Small Enterprise. 
          </p>
          <p style={pStyle}>
            Many freelancers don't realize that they can (and should) register for an <strong>Udyam Registration Certificate</strong>. It is completely free, done entirely online on the government portal, and takes about 10 minutes. Once you have that certificate, you are legally protected by the MSMED Act.
          </p>

          <div style={{ background: "rgba(59,130,246,0.05)", borderLeft: "4px solid #3b82f6", padding: "24px", borderRadius: "0 12px 12px 0", margin: "40px 0" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "#60a5fa", fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>💡 Pro Tip</h3>
            <p style={{ margin: 0, color: "#cbd5e1", fontSize: "16px", lineHeight: "1.6" }}>
              Always include your Udyam Registration Number (URN) on your invoices. It signals to the client's finance team that late payments will trigger tax disallowances for them.
            </p>
          </div>

          <h2 style={h2Style}>How to enforce the rule without losing the client</h2>
          <p style={pStyle}>
            You don't want to threaten a good client with a lawsuit. The best way to use this law is <strong>preventative</strong>. You should include a clause about the MSME rule in your initial contract.
          </p>

          <p style={pStyle}>
            When a client sees the MSME clause in the contract before the project even begins, it sets a professional boundary. Their finance department will automatically prioritize your invoice over unregistered vendors because they want to avoid the tax penalty.
          </p>

          <h3 style={h3Style}>The Perfect Contract Clause</h3>
          <p style={pStyle}>
            If you are drafting a contract, make sure to include wording similar to this:
          </p>

          <div style={{ background: "#0f172a", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "32px", fontFamily: "monospace", fontSize: "14px", color: "#a78bfa", lineHeight: "1.6" }}>
            "If the Freelancer is registered under the Udyam/MSME portal... the Client is legally obligated to release all pending payments within 45 days of invoice generation or acceptance of work. Delayed payments beyond 45 days shall attract compound interest..."
          </div>

          <h2 style={h2Style}>Get the Free Contract Template</h2>
          <p style={pStyle}>
            Don't want to draft legal jargon yourself? We've built an ultra-premium, legally sound contract generator specifically for Indian freelancers. 
          </p>
          <p style={pStyle}>
            It automatically includes the MSME 45-day protection clause, limitation of liability, and scope creep protections. You can generate and download a professional PDF in seconds—completely free, with no login required.
          </p>

          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <Link to="/contract-generator" style={{ display: "inline-block", padding: "16px 32px", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", borderRadius: "12px", color: "white", fontSize: "18px", fontWeight: "700", textDecoration: "none", boxShadow: "0 8px 24px rgba(139,92,246,0.3)", transition: "transform 0.2s" }}>
              Try the Free Contract Generator →
            </Link>
          </div>

          {/* Legal Disclaimer */}
          <div style={{ marginTop: "64px", padding: "24px", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.6", margin: 0 }}>
              <strong>Disclaimer:</strong> The information provided in this blog post is for educational and informational purposes only and does not constitute legal, financial, or tax advice. Laws and regulations change frequently. Please consult a qualified legal professional or Chartered Accountant before drafting contracts, filing taxes, or making business decisions based on this content. KaroTools is not liable for any losses or damages arising from the use of this information.
            </p>
          </div>

        </div>
      </article>

      {/* Footer minimal */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
        © 2026 KaroTools.in — Made for Indian Freelancers
      </footer>
    </div>
  );
}
