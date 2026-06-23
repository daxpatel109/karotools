
import fs from "fs";

const files = [
  "src/InvoiceGenerator.jsx",
  "src/RateCalculator.jsx",
  "src/SalaryVsFreelanceCalculator.jsx",
  "src/SIPCalculator.jsx",
  "src/TaxCalculator.jsx",
  "src/FIRECalculator.jsx",
];

const badge = `

          {/* COMPLIANCE BADGE */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "6px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            FY 2026-27 Compliant
          </div>
`;

files.forEach(file => {
  if(!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, "utf8");
  
  // Find the first </h1> and inject badge right after it.
  content = content.replace(/(<\/h1>)/, "$1" + badge);
  fs.writeFileSync(file, content);
});
console.log("Badges injected.");

