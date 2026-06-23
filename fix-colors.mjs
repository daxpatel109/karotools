
import fs from "fs";
import path from "path";

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes("node_modules") && !file.includes(".next")) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
      results.push(file);
    }
  });
  return results;
}

const files = getFiles("src");

const colorMap = {
  "#f1f5f9": "var(--text-primary)",
  "#cbd5e1": "var(--text-primary)",
  "#334155": "var(--text-secondary)",
  "rgba(255,255,255,0.02)": "var(--glass-bg)",
  "rgba(255,255,255,0.025)": "var(--glass-bg)",
  "rgba(255,255,255,0.07)": "var(--glass-border)",
  "rgba(2,6,23,0.9)": "var(--bg-primary)"
};

files.forEach(file => {
  let content = fs.readFileSync(file, "utf8");
  let modified = false;

  for (const [hex, variable] of Object.entries(colorMap)) {
    // Basic string replace for exact matches inside styles
    const regex = new RegExp(hex.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    if (regex.test(content)) {
      content = content.replace(regex, variable);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(file, content);
  }
});
console.log("Updated more colors.");

