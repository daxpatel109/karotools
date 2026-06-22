export const metadata = { title: "Dax Patel: Expert For Indian Freelancers — KaroTools" };
import Link from "next/link";
import { SchemaScript, generateProfilePageSchema } from "../../../lib/schema";

export default function Author() {
  
  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>
      

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link href="/blog" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>Blog</Link>
        </div>
      </nav>

      {/* Profile Header */}
      <div style={{ position: "relative", overflow: "hidden", padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "200%", background: "radial-gradient(circle, rgba(0,90,230,0.1) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
          
          {/* Profile Photo Placeholder */}
          <div style={{ position: "relative", width: "160px", height: "160px", marginBottom: "32px" }}>
            <div style={{ position: "absolute", inset: "-4px", background: "linear-gradient(135deg, #0076ff, #005ae6, #ec4899)", borderRadius: "50%", filter: "blur(12px)", opacity: 0.6 }} />
            <div style={{ width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", background: "#0f172a", border: "4px solid #1e293b", position: "relative", zIndex: 1 }}>
              <img 
                src="/dax-profile.jpg" 
                alt="Dax Patel" 

                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
              <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1e293b, #0f172a)", color: "#f8fafc", fontSize: "64px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                DP
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "16px" }}>Dax Patel</h1>
          <p style={{ fontSize: "20px", color: "#a78bfa", fontWeight: "600", marginBottom: "32px" }}>Founder & Lead Developer at KaroTools</p>
          
          <p style={{ fontSize: "18px", color: "#94a3b8", lineHeight: "1.8", maxWidth: "680px" }}>
            Hi! I'm Dax, a developer passionate about solving real-world problems for independent professionals in India. I noticed how confusing taxes, GST, and legal contracts were for freelancers, so I decided to build a platform to fix it. 
            <br/><br/>
            I created KaroTools as a completely free suite of business tools. I spend my time researching the Income Tax Act, Section 44ADA, and MSME rules to help freelancers keep more of their hard-earned money.
          </p>
        </div>
      </div>

      {/* Articles Section */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px 120px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "40px", display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Articles by Dax</span>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Post 1 */}
          <Link href="/blog/section-44ada-freelancers" style={{ display: "block", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer" }}
            
            >
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
              <span style={{ background: "rgba(0,118,255,0.1)", color: "#38bdf8", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>TAX SAVINGS</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>June 7, 2026</span>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "12px" }}>
              Section 44ADA for Freelancers: The Ultimate Tax Saving Guide (FY 2026-27)
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
              Learn how Section 44ADA for freelancers allows you to claim 50% of your income as completely tax-free.
            </p>
          </Link>

          {/* Post 2 */}
          <Link href="/blog/msme-45-day-rule" style={{ display: "block", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
              <span style={{ background: "rgba(0,90,230,0.1)", color: "#a78bfa", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>LEGAL & TAX</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>June 6, 2026</span>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "12px" }}>
              The Freelancer's Guide to the MSME 45-Day Payment Rule (Section 43B(h))
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
              Learn how the government protects Indian freelancers from late payments, and how to enforce the 45-day rule.
            </p>
          </Link>

          {/* Post 3 */}
          <Link href="/blog/advance-tax-for-freelancers-india" style={{ display: "block", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
              <span style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>TAX & COMPLIANCE</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>June 14, 2026</span>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "12px" }}>
              How to Calculate Advance Tax for Freelancers in India (FY 2026-27)
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
              A complete guide on advance tax for Indian freelancers — deadlines, calculation method, Section 44ADA one-installment rule, and how to avoid penalties.
            </p>
          </Link>

          {/* Post 4 */}
          <Link href="/blog/freelance-hourly-rate-vs-salary-india" style={{ display: "block", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
              <span style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>BUSINESS</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>June 15, 2026</span>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "12px" }}>
              Freelance Hourly Rate vs Salary: How Much Should You Charge in India?
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
              Learn how to calculate your hourly rate as a freelancer in India to match your previous salary, factoring in taxes, software, and non-billable hours.
            </p>
          </Link>

          {/* Post 5 */}
          <Link href="/blog/gst-registration-threshold" style={{ display: "block", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
              <span style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>TAX & COMPLIANCE</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>June 15, 2026</span>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "12px" }}>
              GST Registration Threshold for Freelancers in India (₹20 Lakh Rule)
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
              Do freelancers need GST registration? A clear breakdown of the ₹20 Lakh limit, inter-state rules, and when you legally must register for GST.
            </p>
          </Link>

          {/* Post 6 */}
          <Link href="/blog/how-to-make-gst-invoice-online-free" style={{ display: "block", textDecoration: "none", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
              <span style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>PRACTICAL GUIDE</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>June 15, 2026</span>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#f8fafc", marginBottom: "12px" }}>
              How to Make a GST Invoice Online for Free in India
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
              A simple guide to creating valid GST invoices for your clients. Learn the mandatory fields, HSN codes, and how to use the free KaroTools invoice generator.
            </p>
          </Link>

        </div>
      </div>

      {/* Footer minimal */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px", textAlign: "center", color: "#64748b", fontSize: "14px", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
        <p style={{ margin: 0 }}>© 2026 KaroTools.in — Made for Indian Freelancers</p>
        <p style={{ fontSize: "11px", color: "#475569", lineHeight: 1.6, maxWidth: 800, margin: 0 }}>
          <strong>Disclaimer:</strong> All calculators and tools on KaroTools.in are provided for educational and informational purposes only. While we strive to keep the logic updated with the latest Indian tax laws (FY 2026-27), the results generated are estimates and do not constitute professional financial, legal, or tax advice. We strongly recommend consulting a certified Chartered Accountant or legal professional before making any business decisions or filing your taxes. KaroTools is not responsible for any financial loss, penalties, or compliance errors resulting from the use of this website.
        </p>
      </footer>
      <SchemaScript schema={generateProfilePageSchema()} />
    </div>
  );
}
