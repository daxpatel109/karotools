
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
  
  // Replace old text
  content = content.replace(
    /Written by: KaroTools Editorial Team/g,
    "Written by: Dax Patel"
  );
  
  content = content.replace(
    /KaroTools creates free GST, tax, invoice, and business calculators for Indian freelancers and small businesses\./g,
    "Dax Patel creates practical GST, invoice, tax, and business tools for Indian freelancers, consultants, small businesses, and agencies through KaroTools."
  );

  fs.writeFileSync(file, content);
});
console.log("Updated standalone files.");

