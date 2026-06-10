import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BlogPost4() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Freelance Hourly Rate vs Salary: How Much Should I Charge in India? | KaroTools";
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Freelance Hourly Rate vs Salary: How Much Should I Charge in India?",
      "author": {
        "@type": "Person",
        "name": "Dax Patel",
        "url": "https://karotools.in/author/dax-patel"
      },
      "datePublished": "2026-06-07",
      "publisher": {
        "@type": "Organization",
        "name": "KaroTools",
        "logo": {
          "@type": "ImageObject",
          "url": "https://karotools.in/logo.png"
        }
      },
      "description": "Learn why salaried employees need to charge 30% to 50% more when transitioning to freelancing to cover unpaid leaves, unbillable hours, and software expenses.",
      "mainEntityOfPage": "https://karotools.in/blog/freelance-hourly-rate-vs-salary-india"
    };

    let script = document.querySelector("#article-schema");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "article-schema";
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify(schema);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc", lineHeight: "1.8", paddingBottom: "80px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <img src="/logo.png" alt="KaroTools Logo" style={{ height: "32px", width: "auto", objectFit: "contain" }} />
        </Link>
        <Link to="/blog" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Back to Blog</Link>
      </nav>

      {/* Article Content */}
      <article style={{ maxWidth: "760px", margin: "60px auto 0", padding: "0 24px" }}>
        
        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>PRICING GUIDE</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>June 7, 2026</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>•</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>8 min read</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", lineHeight: 1.15, marginBottom: "32px", color: "#f8fafc", letterSpacing: "-0.02em" }}>
          Freelance Hourly Rate vs Salary: How Much Should I Charge in India?
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "48px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", background: "#0f172a", border: "2px solid #1e293b", position: "relative" }}>
            <img 
              src="/dax-profile.jpg" 
              alt="Dax Patel" 
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#38bdf8,#818cf8)", color: "white", fontWeight: "bold", fontSize: "20px" }}>DP</div>
          </div>
          <div>
            <div style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "16px" }}>Dax Patel</div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>Founder, KaroTools</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ fontSize: "18px", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p>
            One of the biggest mistakes Indian employees make when transitioning to freelancing is directly converting their monthly corporate salary into an hourly rate. 
          </p>

          <p>
            If you make ₹1,00,000 a month at your job and you divide that by 160 hours, you might think your freelance rate should be ₹625/hour. <strong>If you charge this, you will lose money.</strong>
          </p>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            Why Freelance Rates Must Be Higher
          </h2>

          <p>When you are a salaried employee, your company pays for a lot of hidden costs. As a freelancer, you have to cover these yourself:</p>
          <ul style={{ paddingLeft: "24px", color: "#94a3b8" }}>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>Unpaid Time Off:</strong> When you take a 2-week vacation or get sick at a corporate job, you still get paid. If a freelancer doesn't work, they earn ₹0.</li>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>Business Expenses:</strong> You have to pay for your own laptop, Adobe/Figma subscriptions, internet, and office space.</li>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>Unbillable Hours:</strong> You will spend at least 25% of your week sending emails, creating proposals, invoicing, and doing marketing. Nobody pays you for these hours.</li>
            <li style={{ marginBottom: "12px" }}><strong style={{ color: "#e2e8f0" }}>Dry Spells:</strong> Clients come and go. You need a 15% safety margin built into your rate to survive the months where you don't find work.</li>
          </ul>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            The 30% Premium Rule
          </h2>

          <p>
            A general rule of thumb is that your freelance rate needs to be at least <strong>30% to 50% higher</strong> than your equivalent salaried hourly rate just to maintain the exact same lifestyle.
          </p>

          <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#34d399", marginBottom: "12px" }}>Calculate Your Exact Target Rate</h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "20px" }}>
              Instead of guessing, use our free Salary vs Freelance calculator. Just plug in your current salary, your expected software expenses, and how many weeks of vacation you want to take. It will instantly output the exact hourly, daily, and monthly rate you need to charge.
            </p>
            <Link to="/salary-vs-freelance" style={{ display: "inline-block", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
              Try the Salary vs Freelance Calculator →
            </Link>
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginTop: "32px", marginBottom: "16px" }}>
            Don't Undervalue Yourself
          </h2>

          <p>
            Many Indian freelancers are scared to charge premium rates. But remember, when a client hires a freelancer, they are saving money on health insurance, EPF contributions, and office space. They expect to pay a higher hourly rate for the convenience and flexibility you offer.
          </p>
          <p>
            Run your numbers through the calculator, find your break-even point, and start charging what you are actually worth!
          </p>
        </div>
      </article>
    </div>
  );
}
