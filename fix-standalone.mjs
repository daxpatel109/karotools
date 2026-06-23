
import fs from "fs";
import path from "path";

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith("page.jsx")) {
      results.push(file);
    }
  });
  return results;
}

const files = [...getFiles("src/app/blog"), ...getFiles("src/app/guides")];

files.forEach(file => {
  let content = fs.readFileSync(file, "utf8");
  
  // 1. Fix JSON-LD serialization
  content = content.replace(/JSON\.stringify\((articleSchema|faqSchema)\)\s*\}\}/g, "JSON.stringify($1).replace(/</g, \"\\\\u003c\") }}");

  // 2. Fix Author Bio & Related Posts if not present
  if (!content.includes("Written by:")) {
    const authorBlock = `
          <div style={{ marginTop: "48px", padding: "32px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc", margin: "0 0 8px 0" }}>Written by: KaroTools Editorial Team</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
              KaroTools creates free GST, tax, invoice, and business calculators for Indian freelancers and small businesses.
            </p>
          </div>
          
          <div style={{ marginTop: "48px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", margin: "0 0 24px 0" }}>Related Guides & Tools</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
              <Link href="/gst-calculator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Calculator</strong>
              </Link>
              <Link href="/invoice-generator" style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Invoice Generator</strong>
              </Link>
              <Link href="/blog/gst-registration-threshold" style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ color: "#f8fafc", fontSize: "16px" }}>GST Registration Rules</strong>
              </Link>
            </div>
          </div>
        </article>
`;
    content = content.replace("</article>", authorBlock);
  }

  // 3. Fix breadcrumbs
  if (content.includes("Back to Blog") || content.includes("Back to Guides")) {
    const isGuide = file.includes("guides");
    const sectionName = isGuide ? "Guides" : "Blog";
    const sectionPath = isGuide ? "/guides" : "/blog";
    
    content = content.replace(/<Link href="\/[a-z]+"[^>]*>\s*? Back to [a-zA-Z]+\s*<\/Link>/, `
          <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: "#64748b", alignItems: "center" }}>
            <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <Link href="${sectionPath}" style={{ color: "#94a3b8", textDecoration: "none" }}>${sectionName}</Link>
            <span>›</span>
            <span style={{ color: "#cbd5e1" }}>Article</span>
          </div>`);
  }

  fs.writeFileSync(file, content);
});
console.log("Done updating standalone JSX files.");

