
import fs from "fs";

function removeBadge(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, "utf8");
  const badgeRegex = /\s*\{\/\*\s*COMPLIANCE BADGE\s*\*\/\}\s*<div[^>]*>\s*<svg[^>]*>.*?<\/svg>\s*FY 2026-27 Compliant\s*<\/div>/s;
  content = content.replace(badgeRegex, "");
  fs.writeFileSync(file, content);
}

function updateBadge(file, newText) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, "utf8");
  
  if (content.includes("COMPLIANCE BADGE")) {
    content = content.replace(/FY 2026-27 Compliant/g, newText);
  } else {
    // Insert new badge
    const badge = `

          {/* COMPLIANCE BADGE */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "6px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            ${newText}
          </div>`;
    content = content.replace(/(<\/h1>)/, "$1" + badge);
  }
  fs.writeFileSync(file, content);
}

// 1. Remove
removeBadge("src/SIPCalculator.jsx");
removeBadge("src/FIRECalculator.jsx");
removeBadge("src/RateCalculator.jsx");
removeBadge("src/SalaryVsFreelanceCalculator.jsx");

// 2. Income Tax
updateBadge("src/AdvanceTaxCalculator.jsx", "FY 2026-27 Updated");
updateBadge("src/TaxCalculator.jsx", "FY 2026-27 Updated");
updateBadge("src/Section44ADACalculator.jsx", "FY 2026-27 Updated");

// 3. GST
updateBadge("src/GSTCalculator.jsx", "Updated for GST Calculations");
// Check if LateGST exists
if (fs.existsSync("src/LateGSTPenaltyCalculator.jsx")) {
  updateBadge("src/LateGSTPenaltyCalculator.jsx", "Updated for GST Calculations");
} else if (fs.existsSync("src/LateGSTCalculator.jsx")) {
  updateBadge("src/LateGSTCalculator.jsx", "Updated for GST Calculations");
}

// 4. Invoice Generator
updateBadge("src/InvoiceGenerator.jsx", "GST Invoice Fields Included");

console.log("Badges QA completed.");

