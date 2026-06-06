import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function ContractGenerator() {
  const [freelancerName, setFreelancerName] = useState(() => localStorage.getItem("cg_fName") || "");
  const [clientName, setClientName] = useState(() => localStorage.getItem("cg_cName") || "");
  const [projectName, setProjectName] = useState(() => localStorage.getItem("cg_pName") || "");
  const [startDate, setStartDate] = useState(() => localStorage.getItem("cg_sDate") || "");
  const [endDate, setEndDate] = useState(() => localStorage.getItem("cg_eDate") || "");
  const [totalFee, setTotalFee] = useState(() => localStorage.getItem("cg_fee") || "");
  const [advanceFee, setAdvanceFee] = useState(() => localStorage.getItem("cg_adv") || "");
  const [revisions, setRevisions] = useState(() => localStorage.getItem("cg_rev") || "2");
  const [jurisdiction, setJurisdiction] = useState(() => localStorage.getItem("cg_jur") || "Mumbai, India");

  const [copied, setCopied] = useState(false);

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem("cg_fName", freelancerName);
    localStorage.setItem("cg_cName", clientName);
    localStorage.setItem("cg_pName", projectName);
    localStorage.setItem("cg_sDate", startDate);
    localStorage.setItem("cg_eDate", endDate);
    localStorage.setItem("cg_fee", totalFee);
    localStorage.setItem("cg_adv", advanceFee);
    localStorage.setItem("cg_rev", revisions);
    localStorage.setItem("cg_jur", jurisdiction);
  }, [freelancerName, clientName, projectName, startDate, endDate, totalFee, advanceFee, revisions, jurisdiction]);

  // SEO & Scroll Reset
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free Freelance Contract Generator India | MSME Protected";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Generate a bulletproof, legally binding freelance contract in India. Features MSME 45-day payment protection rules. Download PDF free.";

    // Software App Schema
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Freelance Contract Generator India",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "WebBrowser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
      "description": "Generate a legally binding freelance contract in India with MSME payment protection."
    });
    document.head.appendChild(schemaScript);

    return () => {
      if (document.head.contains(schemaScript)) document.head.removeChild(schemaScript);
    };
  }, []);

  const clearForm = () => {
    setFreelancerName(""); setClientName(""); setProjectName("");
    setStartDate(""); setEndDate(""); setTotalFee(""); setAdvanceFee("");
    setRevisions("2"); setJurisdiction("Mumbai, India");
    ["cg_fName","cg_cName","cg_pName","cg_sDate","cg_eDate","cg_fee","cg_adv","cg_rev","cg_jur"].forEach(k => localStorage.removeItem(k));
  };

  const getContractText = () => {
    const fName = freelancerName || "[Freelancer Name]";
    const cName = clientName || "[Client/Company Name]";
    const pName = projectName || "[Project Description]";
    const sDate = startDate || "[Start Date]";
    const eDate = endDate || "[End Date]";
    const fee = totalFee || "[Total Amount]";
    const adv = advanceFee || "[Advance Amount]";
    const bal = (Number(totalFee || 0) - Number(advanceFee || 0)) || "[Balance Amount]";
    const revs = revisions || "[X]";
    const jur = jurisdiction || "[City, State]";
    const today = new Date().toLocaleDateString('en-IN');

    return `FREELANCE SERVICE AGREEMENT

This Freelance Service Agreement ("Agreement") is made and entered into on this ${today}, by and between:

Client: ${cName} ("Client")
Freelancer: ${fName} ("Freelancer")

1. SCOPE OF WORK
The Freelancer agrees to provide the following services to the Client: ${pName} (the "Services"). The Services shall commence on ${sDate} and are expected to be completed by ${eDate}.

2. PAYMENT TERMS
The total fee for the Services is ₹${fee}.
The Client agrees to pay an upfront advance of ₹${adv} before work commences.
The remaining balance of ₹${bal} shall be paid upon project completion and final handover.

3. MSME PROTECTION & LATE PAYMENT (SECTION 43B(H))
The Freelancer is operating as a micro/small enterprise. As per Section 43B(h) of the Income Tax Act read with the MSMED Act, 2006, the Client is legally obligated to release all pending payments within 45 days of invoice generation or acceptance of work. Delayed payments beyond 45 days shall attract compound interest at three times the bank rate notified by the RBI.

4. REVISIONS AND SCOPE CREEP
This Agreement includes a maximum of ${revs} rounds of minor revisions. Any additional revisions, major structural changes, or new feature requests outside the original Scope of Work shall be billed separately at an hourly or mutually agreed rate.

5. INTELLECTUAL PROPERTY & OWNERSHIP
The Freelancer retains all intellectual property rights, copyrights, and ownership of the raw files and final deliverables until the Client has paid the total fee in full. Upon full clearance of payment, the final deliverables' ownership transfers to the Client. The Freelancer retains the right to display the completed work in their portfolio.

6. CONFIDENTIALITY
Both parties agree to keep any proprietary business information, trade secrets, and materials shared during this project strictly confidential.

7. TERMINATION
Either party may terminate this Agreement with a 7-day written notice. In the event of termination by the Client, the Freelancer shall be compensated for all work completed up to the date of termination. The advance fee is non-refundable.

8. GOVERNING LAW & JURISDICTION
This Agreement shall be governed by the laws of India. Any disputes arising from this Agreement shall be subject to the exclusive jurisdiction of the courts in ${jur}.

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first above written.

Client Signature: ___________________________        Date: _______________

Freelancer Signature: _______________________        Date: _______________`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getContractText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("FREELANCE SERVICE AGREEMENT", pageWidth / 2, margin, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    
    const lines = doc.splitTextToSize(getContractText().replace("FREELANCE SERVICE AGREEMENT\n\n", ""), maxLineWidth);
    
    let y = margin + 40;
    for (let i = 0; i < lines.length; i++) {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      // Make headers bold
      if (lines[i].match(/^[1-8]\. [A-Z &()]+$/)) {
        doc.setFont("helvetica", "bold");
        doc.text(lines[i], margin, y);
        doc.setFont("helvetica", "normal");
      } else {
        doc.text(lines[i], margin, y);
      }
      y += 16;
    }
    
    doc.save(`Contract_${freelancerName.replace(/\\s+/g, '_') || "Freelance"}.pdf`);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", fontSize: "15px",
    color: "#f1f5f9", outline: "none", boxSizing: "border-box", transition: "all 0.2s"
  };

  const labelStyle = { display: "block", fontSize: "13px", fontWeight: "700", color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        input::placeholder { color: #475569; }
        input:focus { border-color: rgba(14,165,233,0.5) !important; background: rgba(255,255,255,0.06) !important; }
        .glass-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 40px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#8b5cf6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </Link>
        <Link to="/" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>← Home</Link>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 100px", display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "700", letterSpacing: "0.08em" }}>🇮🇳 INCLUDES MSME PAYMENT PROTECTION</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "16px", background: "linear-gradient(135deg,#ffffff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Freelance Contract Generator</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>Generate a legally binding agreement for Indian freelancers. Protect yourself against scope creep and late payments.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px" }}>
          
          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="glass-card">
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><span>👤</span> Parties Involved</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div><label style={labelStyle}>Your Name</label><input value={freelancerName} onChange={e=>setFreelancerName(e.target.value)} placeholder="Raj Patel" style={inputStyle}/></div>
                <div><label style={labelStyle}>Client Name</label><input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Acme Corp" style={inputStyle}/></div>
              </div>
            </div>

            <div className="glass-card">
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><span>📝</span> Project Details</h2>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Project Description</label>
                <input value={projectName} onChange={e=>setProjectName(e.target.value)} placeholder="e.g., E-commerce Website Design and Development" style={inputStyle}/>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div><label style={labelStyle}>Start Date</label><input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} style={inputStyle}/></div>
                <div><label style={labelStyle}>End Date</label><input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} style={inputStyle}/></div>
              </div>
            </div>

            <div className="glass-card">
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><span>💰</span> Payment & Legal</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div><label style={labelStyle}>Total Fee (₹)</label><input type="number" value={totalFee} onChange={e=>setTotalFee(e.target.value)} placeholder="50000" style={inputStyle}/></div>
                <div><label style={labelStyle}>Advance (₹)</label><input type="number" value={advanceFee} onChange={e=>setAdvanceFee(e.target.value)} placeholder="20000" style={inputStyle}/></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div><label style={labelStyle}>Free Revisions</label><input type="number" value={revisions} onChange={e=>setRevisions(e.target.value)} placeholder="2" style={inputStyle}/></div>
                <div><label style={labelStyle}>Jurisdiction City</label><input value={jurisdiction} onChange={e=>setJurisdiction(e.target.value)} placeholder="Mumbai, India" style={inputStyle}/></div>
              </div>
            </div>

            <button onClick={clearForm} style={{ padding: "12px", background: "transparent", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", color: "#ef4444", cursor: "pointer", fontWeight: "600", transition: "all 0.2s" }} onMouseEnter={e=>{e.target.style.background="rgba(239,68,68,0.1)"}} onMouseLeave={e=>{e.target.style.background="transparent"}}>
              🗑 Clear Form
            </button>
          </div>

          {/* Preview */}
          <div style={{ position: "sticky", top: "100px", height: "max-content", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="glass-card" style={{ padding: "32px", background: "#ffffff", color: "#000000", fontFamily: "'Times New Roman', serif", borderRadius: "8px", maxHeight: "60vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0, fontSize: "14px", lineHeight: "1.6" }}>
                {getContractText()}
              </pre>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button onClick={handleCopy} style={{ flex: 1, padding: "16px", background: copied ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3b82f6, #2563eb)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 24px rgba(59,130,246,0.3)" }}>
                {copied ? "✅ Copied" : "📋 Copy Text"}
              </button>
              <button onClick={handleDownloadPDF} style={{ flex: 1, padding: "16px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 24px rgba(139,92,246,0.3)" }}>
                📄 Download PDF
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
