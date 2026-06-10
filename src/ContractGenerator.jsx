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

    // Software App & FAQ Schema
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Freelance Contract Generator India",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "WebBrowser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
          "description": "Generate a legally binding freelance contract in India with MSME payment protection."
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Is this freelance contract legally binding in India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, once signed by both parties (even electronically or via email acceptance), this contract is legally binding under the Indian Contract Act, 1872." } },
            { "@type": "Question", "name": "How does the 45-day MSME payment rule work?", "acceptedAnswer": { "@type": "Answer", "text": "Under Section 43B(h) of the Income Tax Act and the MSMED Act, if you are a registered MSME (Udyam), clients must pay you within 45 days of project acceptance. Delayed payments incur compound interest." } },
            { "@type": "Question", "name": "Do I need a lawyer to draft a freelance contract?", "acceptedAnswer": { "@type": "Answer", "text": "For standard freelance projects, a lawyer is not required. This generator includes all essential legal protections (Scope, Payment terms, IP rights, Limitation of Liability) designed specifically for Indian freelancers." } },
            { "@type": "Question", "name": "What is scope creep and how does this contract prevent it?", "acceptedAnswer": { "@type": "Answer", "text": "Scope creep happens when clients keep asking for more work outside the original agreement. Clause 5 of this contract legally limits revisions and mandates extra billing for new features." } }
          ]
        }
      ]
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

  const fmtINR = (n) => {
    const num = Number(n);
    if (isNaN(num)) return n;
    return num.toLocaleString("en-IN");
  };

  const getContractText = () => {
    const fName = freelancerName || "[Freelancer Name]";
    const cName = clientName || "[Client/Company Name]";
    const pName = projectName || "[Project Description]";
    const sDate = startDate || "[Start Date]";
    const eDate = endDate || "[End Date]";
    
    const feeStr = totalFee ? fmtINR(totalFee) : "[Total Amount]";
    const advStr = advanceFee ? fmtINR(advanceFee) : "[Advance Amount]";
    const balNum = Number(totalFee || 0) - Number(advanceFee || 0);
    const balStr = totalFee ? fmtINR(balNum) : "[Balance Amount]";
    
    const revs = revisions || "[X]";
    const jur = jurisdiction || "[City, State]";
    const today = new Date().toLocaleDateString('en-IN');

    return `FREELANCE SERVICE AGREEMENT

This Freelance Service Agreement ("Agreement") is made and entered into on this ${today}, by and between:

Client: ${cName} ("Client")
Freelancer: ${fName} ("Freelancer")

1. SCOPE OF WORK
The Freelancer agrees to provide the following services to the Client: ${pName} (the "Services"). The Services shall commence on ${sDate} and are expected to be completed by ${eDate}.

2. PAYMENT TERMS & GST
The total fee for the Services is Rs. ${feeStr} (exclusive of GST, which shall be charged separately if the Freelancer is GST-registered).
The Client agrees to pay an upfront advance of Rs. ${advStr} before work commences.
The remaining balance of Rs. ${balStr} shall be paid upon project completion and prior to the final handover of deliverables/source code.
In the event of overdue payments, the Freelancer reserves the right to pause all ongoing work until the outstanding balance is cleared.

3. MSME PROTECTION & LATE PAYMENT
If the Freelancer is registered under the Udyam/MSME portal as a micro/small enterprise, the provisions of Section 43B(h) of the Income Tax Act and the MSMED Act, 2006 shall apply. The Client is legally obligated to release all pending payments within 45 days of invoice generation or acceptance of work. Delayed payments beyond 45 days shall attract compound interest at three times the bank rate notified by the RBI.

4. ACCEPTANCE OF DELIVERABLES
The Client shall have 7 days to review any delivered work. If no written objections or revision requests are received within this 7-day period, the deliverables shall be deemed legally accepted by the Client.

5. REVISIONS AND SCOPE CREEP
This Agreement includes a maximum of ${revs} rounds of minor revisions. Any additional revisions, major structural changes, or new feature requests outside the original Scope of Work shall be billed separately at an hourly or mutually agreed rate.

6. INTELLECTUAL PROPERTY & OWNERSHIP
The Freelancer retains all intellectual property rights, copyrights, and ownership of the raw files, source code, and final deliverables until the Client has paid the total fee in full. Upon full clearance of payment, the final deliverables' ownership transfers to the Client. The Freelancer retains the right to display the completed work in their professional portfolio.

7. CONFIDENTIALITY
Both parties agree to keep any proprietary business information, trade secrets, and materials shared during this project strictly confidential.

8. LIMITATION OF LIABILITY
The Freelancer's total liability under this Agreement, whether in contract, tort, or otherwise, shall not exceed the total amount actually paid by the Client to the Freelancer for the Services.

9. TERMINATION
Either party may terminate this Agreement with a 7-day written notice. In the event of termination by the Client, the Freelancer shall be compensated for all work completed up to the date of termination. The advance fee is non-refundable.

10. ELECTRONIC SIGNATURES
This Agreement may be executed in counterparts and via electronic signatures, which shall be deemed valid, binding, and enforceable.

11. GOVERNING LAW & JURISDICTION
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
    
    // Premium Header Band
    doc.setFillColor(30, 41, 59); // Slate 800
    doc.rect(0, 0, pageWidth, 80, "F");
    
    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.text("SERVICE AGREEMENT", pageWidth / 2, 45, { align: "center" });
    
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text("Legally Binding Contract", pageWidth / 2, 65, { align: "center" });

    // Watermark
    doc.setTextColor(241, 245, 249); // Very light grey
    doc.setFontSize(60);
    doc.setFont("times", "bold");
    doc.text("CONFIDENTIAL", pageWidth / 2, 400, { align: "center", angle: -45, opacity: 0.05 });

    doc.setTextColor(15, 23, 42); // Slate 900
    doc.setFontSize(11);
    
    const lines = doc.splitTextToSize(getContractText().replace("FREELANCE SERVICE AGREEMENT\n\n", ""), maxLineWidth);
    
    let y = 120;
    for (let i = 0; i < lines.length; i++) {
      if (y > doc.internal.pageSize.getHeight() - margin - 40) {
        doc.addPage();
        y = margin + 20;
      }
      
      const line = lines[i];
      // Make Section Headers Bold & Blue
      if (line.match(/^\d+\. [A-Z &()]+$/)) {
        y += 10; // Extra spacing before headers
        doc.setFont("times", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(line, margin, y);
        doc.setFont("times", "normal");
        doc.setTextColor(51, 65, 85); // Slate 700 for body
      } 
      // Make Party Names Bold
      else if (line.startsWith("Client:") || line.startsWith("Freelancer:")) {
        doc.setFont("times", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(line, margin, y);
        doc.setFont("times", "normal");
        doc.setTextColor(51, 65, 85);
      }
      // Signature Blocks (Custom Drawing)
      else if (line.startsWith("Client Signature:")) {
        y += 40;
        doc.setDrawColor(148, 163, 184); // Slate 400 line
        doc.setLineWidth(1);
        doc.line(margin, y, margin + 200, y);
        doc.line(pageWidth - margin - 150, y, pageWidth - margin, y);
        
        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.text("Client Authorized Signature", margin, y + 15);
        doc.text("Date", pageWidth - margin - 150, y + 15);
        
        y += 60;
        doc.line(margin, y, margin + 200, y);
        doc.line(pageWidth - margin - 150, y, pageWidth - margin, y);
        
        doc.text("Freelancer Signature", margin, y + 15);
        doc.text("Date", pageWidth - margin - 150, y + 15);
        break; // Stop parsing text, we handled signatures manually
      }
      else {
        doc.text(line, margin, y);
      }
      y += 16;
    }
    
    // Page Borders & Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      // Subtle Border
      doc.setDrawColor(203, 213, 225); // Slate 300
      doc.setLineWidth(1);
      doc.rect(20, 20, pageWidth - 40, doc.internal.pageSize.getHeight() - 40);
      
      // Footer
      doc.setFont("times", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(`Page ${i} of ${totalPages} • Generated securely via KaroTools`, pageWidth / 2, doc.internal.pageSize.getHeight() - 30, { align: "center" });
    }
    
    doc.save(`Contract_${freelancerName.replace(/\s+/g, '_') || "Freelance"}.pdf`);
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(400px, 100%), 1fr))", gap: "40px" }}>
          
          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="glass-card">
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><span>👤</span> Parties Involved</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "16px" }}>
                <div><label style={labelStyle}>Your Name</label><input value={freelancerName} onChange={e=>setFreelancerName(e.target.value)} placeholder="Raj Patel" style={inputStyle}/></div>
                <div><label style={labelStyle}>Client Name</label><input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Acme Corp" style={inputStyle}/></div>
              </div>
            </div>

            <div className="glass-card">
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><span>📝</span> Project Details</h2>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Project Description</label>
                <input value={projectName} onChange={e=>setProjectName(e.target.value)} placeholder="e.g., E-commerce Website Design and Development" style={inputStyle}/>
                <p style={{ fontSize: "11px", color: "#64748b", marginTop: "6px" }}>Tip: Be as specific as possible (e.g., '5-page WordPress site with Payment Gateway' instead of just 'Make a website').</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "16px" }}>
                <div><label style={labelStyle}>Start Date</label><input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} style={inputStyle}/></div>
                <div><label style={labelStyle}>End Date</label><input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} style={inputStyle}/></div>
              </div>
            </div>

            <div className="glass-card">
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><span>💰</span> Payment & Legal</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "16px", marginBottom: "16px" }}>
                <div><label style={labelStyle}>Total Fee (₹)</label><input type="number" value={totalFee} onChange={e=>setTotalFee(e.target.value)} placeholder="50000" style={inputStyle}/></div>
                <div><label style={labelStyle}>Advance (₹)</label><input type="number" value={advanceFee} onChange={e=>setAdvanceFee(e.target.value)} placeholder="20000" style={inputStyle}/></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "16px" }}>
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
            
            {/* Premium Document View */}
            <div style={{ background: "#ffffff", color: "#0f172a", fontFamily: "'Times New Roman', Times, serif", borderRadius: "12px", maxHeight: "60vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", position: "relative" }}>
              
              {/* Header Band */}
              <div style={{ background: "#1e293b", color: "#ffffff", padding: "24px", textAlign: "center", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px 0", letterSpacing: "1px" }}>SERVICE AGREEMENT</h2>
                <p style={{ fontSize: "14px", color: "#94a3b8", fontStyle: "italic", margin: 0 }}>Legally Binding Contract</p>
              </div>

              {/* Watermark */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-45deg)", fontSize: "6rem", fontWeight: "900", color: "rgba(0,0,0,0.02)", pointerEvents: "none", zIndex: 0, whiteSpace: "nowrap" }}>CONFIDENTIAL</div>

              <div style={{ padding: "40px", fontSize: "15px", lineHeight: "1.7", position: "relative", zIndex: 1 }}>
                <p style={{ textAlign: "right", color: "#64748b", fontSize: "13px", marginBottom: "30px" }}>Date: {new Date().toLocaleDateString('en-IN')}</p>
                
                <p style={{ marginBottom: "20px" }}>This Freelance Service Agreement ("Agreement") is made and entered into, by and between:</p>
                <div style={{ background: "#f8fafc", padding: "16px", borderLeft: "4px solid #3b82f6", marginBottom: "30px" }}>
                  <p style={{ margin: "0 0 8px 0" }}><strong>Client:</strong> {clientName || "[Client/Company Name]"}</p>
                  <p style={{ margin: 0 }}><strong>Freelancer:</strong> {freelancerName || "[Freelancer Name]"}</p>
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>1. SCOPE OF WORK</h3>
                <p>The Freelancer agrees to provide the following services to the Client: <strong>{projectName || "[Project Description]"}</strong> (the "Services"). The Services shall commence on <strong>{startDate || "[Start Date]"}</strong> and are expected to be completed by <strong>{endDate || "[End Date]"}</strong>.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>2. PAYMENT TERMS & GST</h3>
                <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
                  <li>The total fee for the Services is <strong>Rs. {totalFee ? Number(totalFee).toLocaleString("en-IN") : "[Total Amount]"}</strong> (exclusive of GST, which shall be charged separately if the Freelancer is GST-registered).</li>
                  <li>The Client agrees to pay an upfront advance of <strong>Rs. {advanceFee ? Number(advanceFee).toLocaleString("en-IN") : "[Advance Amount]"}</strong> before work commences.</li>
                  <li>The remaining balance of <strong>Rs. {totalFee ? Number(Number(totalFee || 0) - Number(advanceFee || 0)).toLocaleString("en-IN") : "[Balance Amount]"}</strong> shall be paid upon project completion and prior to the final handover of deliverables/source code.</li>
                  <li>In the event of overdue payments, the Freelancer reserves the right to pause all ongoing work until the outstanding balance is cleared.</li>
                </ul>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>3. MSME PROTECTION & LATE PAYMENT</h3>
                <p>If the Freelancer is registered under the Udyam/MSME portal as a micro/small enterprise, the provisions of Section 43B(h) of the Income Tax Act and the MSMED Act, 2006 shall apply. The Client is legally obligated to release all pending payments within 45 days of invoice generation or acceptance of work. Delayed payments beyond 45 days shall attract compound interest at three times the bank rate notified by the RBI.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>4. ACCEPTANCE OF DELIVERABLES</h3>
                <p>The Client shall have 7 days to review any delivered work. If no written objections or revision requests are received within this 7-day period, the deliverables shall be deemed legally accepted by the Client.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>5. REVISIONS AND SCOPE CREEP</h3>
                <p>This Agreement includes a maximum of <strong>{revisions || "[X]"}</strong> rounds of minor revisions. Any additional revisions, major structural changes, or new feature requests outside the original Scope of Work shall be billed separately at an hourly or mutually agreed rate.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>6. INTELLECTUAL PROPERTY & OWNERSHIP</h3>
                <p>The Freelancer retains all intellectual property rights, copyrights, and ownership of the raw files, source code, and final deliverables until the Client has paid the total fee in full. Upon full clearance of payment, the final deliverables' ownership transfers to the Client. The Freelancer retains the right to display the completed work in their professional portfolio.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>7. CONFIDENTIALITY</h3>
                <p>Both parties agree to keep any proprietary business information, trade secrets, and materials shared during this project strictly confidential.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>8. LIMITATION OF LIABILITY</h3>
                <p>The Freelancer's total liability under this Agreement, whether in contract, tort, or otherwise, shall not exceed the total amount actually paid by the Client to the Freelancer for the Services.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>9. TERMINATION</h3>
                <p>Either party may terminate this Agreement with a 7-day written notice. In the event of termination by the Client, the Freelancer shall be compensated for all work completed up to the date of termination. The advance fee is non-refundable.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>10. ELECTRONIC SIGNATURES</h3>
                <p>This Agreement may be executed in counterparts and via electronic signatures, which shall be deemed valid, binding, and enforceable.</p>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>11. GOVERNING LAW & JURISDICTION</h3>
                <p>This Agreement shall be governed by the laws of India. Any disputes arising from this Agreement shall be subject to the exclusive jurisdiction of the courts in <strong>{jurisdiction || "[City, State]"}</strong>.</p>

                <p style={{ marginTop: "40px", marginBottom: "40px", fontStyle: "italic", color: "#64748b" }}>IN WITNESS WHEREOF, the parties have executed this Agreement on the date first above written.</p>

                {/* Signature Blocks */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "40px", marginTop: "60px" }}>
                  <div>
                    <div style={{ borderTop: "1px solid #0f172a", paddingTop: "8px" }}>
                      <p style={{ margin: 0, fontWeight: "700", fontSize: "14px" }}>Client Authorized Signature</p>
                      <p style={{ margin: 0, color: "#64748b", fontSize: "12px" }}>Date: _______________</p>
                    </div>
                  </div>
                  <div>
                    <div style={{ borderTop: "1px solid #0f172a", paddingTop: "8px" }}>
                      <p style={{ margin: 0, fontWeight: "700", fontSize: "14px" }}>Freelancer Signature</p>
                      <p style={{ margin: 0, color: "#64748b", fontSize: "12px" }}>Date: _______________</p>
                    </div>
                  </div>
                </div>

              </div>
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

          {/* SEO FAQs */}
          <div style={{ marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "48px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc", marginBottom: "28px", textAlign: "center" }}>Frequently Asked Questions</h2>
            {[
              { q: "Is this freelance contract legally binding in India?", a: "Yes, once signed by both parties (even electronically or via email acceptance), this contract is legally binding under the Indian Contract Act, 1872." },
              { q: "How does the 45-day MSME payment rule work?", a: "Under Section 43B(h) of the Income Tax Act and the MSMED Act, if you are a registered MSME (Udyam), clients must pay you within 45 days of project acceptance. Delayed payments incur compound interest at three times the bank rate." },
              { q: "Do I need a lawyer to draft a freelance contract?", a: "For standard freelance projects, a lawyer is not required. This generator includes all essential legal protections (Scope, Payment terms, IP rights, Limitation of Liability) designed specifically for Indian freelancers." },
              { q: "What is scope creep and how does this contract prevent it?", a: "Scope creep happens when clients keep asking for more work outside the original agreement. Clause 5 of this contract legally limits revisions and mandates extra billing for new features." }
            ].map(item => (
              <div key={item.q} style={{ marginBottom: "24px", background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#38bdf8", marginBottom: "8px", fontFamily: "'Syne',sans-serif" }}>{item.q}</h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>

          {/* Universal Legal Disclaimer */}
          <div style={{ marginTop: "40px", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.6", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
              <strong>Disclaimer:</strong> All calculators and tools on KaroTools.in are provided for educational and informational purposes only. While we strive to keep the logic updated with the latest Indian tax laws (FY 2025-26), the results generated are estimates and do not constitute professional financial, legal, or tax advice. We strongly recommend consulting a certified Chartered Accountant or legal professional before making any business decisions or filing your taxes. KaroTools is not responsible for any financial loss, penalties, or compliance errors resulting from the use of this website.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
