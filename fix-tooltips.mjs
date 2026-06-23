
import fs from "fs";

const files = [
  "src/AdvanceTaxCalculator.jsx",
  "src/GSTCalculator.jsx",
  "src/InvoiceGenerator.jsx"
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, "utf8");
  
  // Only replace if it does not already have tabIndex
  content = content.replace(/className="tooltip-container"\s+title="/g, `className="tooltip-container" tabIndex="0" title="`);
  
  fs.writeFileSync(file, content);
});
console.log("Tooltips QA completed.");

