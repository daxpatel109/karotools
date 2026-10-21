import fs from 'fs';
import path from 'path';

async function fetchHtml(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    return { status: res.status, html };
  } catch(e) {
    return { status: 500, html: '' };
  }
}

function extractData(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'").trim() : '';

  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  let h1Matches = [];
  let match;
  while ((match = h1Regex.exec(html)) !== null) {
    h1Matches.push(match[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim());
  }

  const canMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  const canonical = canMatch ? canMatch[1] : '';

  const robMatch = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i);
  const robots = robMatch ? robMatch[1] : 'index, follow';
  const indexable = robots.toLowerCase().includes('noindex') ? 'No' : 'Yes';

  return { title, h1s: h1Matches, canonical, indexable };
}

async function run() {
  const routesToCrawl = new Set();
  
  // 1. Fetch Sitemap
  const { status: smStatus, html: smHtml } = await fetchHtml('http://localhost:3000/sitemap.xml');
  if (smStatus === 200) {
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let m;
    while ((m = locRegex.exec(smHtml)) !== null) {
      let r = m[1].replace('https://karotools.in', '');
      if (r === '') r = '/';
      routesToCrawl.add(r);
    }
  }

  // 2. Discover from filesystem (in case some are not in sitemap)
  function walk(dir, currentRoute) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath, currentRoute === '/' ? '/' + file : currentRoute + '/' + file);
      } else if (file === 'page.jsx' || file === 'page.js') {
        if (!currentRoute.includes('[')) { // Skip dynamic routes without slugs
          routesToCrawl.add(currentRoute);
        }
      }
    }
  }
  walk(path.join(process.cwd(), 'src/app'), '/');

  function categorize(route) {
    if (route === '/') return 'Main';
    if (route === '/about' || route === '/contact' || route === '/disclaimer' || route === '/privacy-policy' || route === '/terms' || route === '/editorial-policy' || route === '/methodology' || route === '/sources') return 'Legal/Trust';
    if (route.startsWith('/blog/') && route !== '/blog') return 'Blog';
    if (route === '/blog') return 'Directory';
    if (route.startsWith('/guides/') && route !== '/guides') return 'Guide';
    if (route === '/guides') return 'Directory';
    if (route.includes('calculator') || route.includes('generator') || route === '/tools') return 'Tool';
    if (route === '/author/dax-patel') return 'Directory';
    return 'Other';
  }

  const results = [];
  const routeArray = Array.from(routesToCrawl).sort();

  for (const route of routeArray) {
    const url = route === '/' ? 'http://localhost:3000/' : `http://localhost:3000${route}`;
    const { status, html } = await fetchHtml(url);
    const data = extractData(html);
    
    let issue = '';
    if (data.h1s.length === 0) issue += 'No H1; ';
    if (data.h1s.length > 1) issue += 'Multiple H1s; ';
    if (data.h1s.length === 1 && data.h1s[0] === '') issue += 'Empty H1; ';

    // Conflicting intent heuristic
    if (data.h1s.length === 1 && data.title) {
        const h1Words = data.h1s[0].toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
        const titleLower = data.title.toLowerCase();
        let matchCount = 0;
        h1Words.forEach(w => { if (titleLower.includes(w)) matchCount++; });
        if (h1Words.length > 0 && matchCount === 0) {
            issue += 'H1 conflicts with Title; ';
        }
    }

    results.push({
      route,
      pageType: categorize(route),
      sourceFile: `src/app${route === '/' ? '' : route}/page.jsx`.replace(/\\/g, '/'), // Approximation
      httpStatus: status,
      h1Count: data.h1s.length,
      h1Text: data.h1s.join(' | '),
      metaTitle: data.title,
      canonical: data.canonical,
      indexable: data.indexable,
      issue: issue.trim()
    });
  }

  // Check duplicates
  const h1Counts = {};
  results.forEach(r => {
    if (r.h1Count === 1) {
      h1Counts[r.h1Text] = (h1Counts[r.h1Text] || 0) + 1;
    }
  });

  results.forEach(r => {
    if (r.h1Count === 1 && h1Counts[r.h1Text] > 1) {
      r.issue += ` Duplicate H1 (${h1Counts[r.h1Text]} pages);`;
    }
  });

  // Export CSV
  const csvHeader = 'route,page_type,source_file,http_status,h1_count,h1_text,meta_title,canonical,indexable,issue\n';
  const csvRows = results.map(r => `"${r.route}","${r.pageType}","${r.sourceFile}","${r.httpStatus}","${r.h1Count}","${r.h1Text}","${r.metaTitle}","${r.canonical}","${r.indexable}","${r.issue}"`).join('\n');
  fs.writeFileSync('C:\\Users\\daxpa\\.gemini\\antigravity\\brain\\8ab27c81-392f-48c0-ba20-398678adc7a5\\karotools_complete_h1_audit.csv', csvHeader + csvRows);

  // Export MD
  let md = '# KaroTools Complete H1 Audit\n\n';
  
  const groups = {
    'A. Main and directory pages': results.filter(r => r.pageType === 'Main' || r.pageType === 'Directory'),
    'B. Calculator and generator pages': results.filter(r => r.pageType === 'Tool'),
    'C. Blog posts': results.filter(r => r.pageType === 'Blog'),
    'D. Guides': results.filter(r => r.pageType === 'Guide'),
    'E. Legal, company and trust pages': results.filter(r => r.pageType === 'Legal/Trust'),
    'F. Noindex or excluded pages': results.filter(r => r.indexable === 'No'),
    'G. Redirects': results.filter(r => [301, 302, 307, 308].includes(r.httpStatus))
  };

  md += '## 1. Required Report Table\n\n';
  for (const [groupName, items] of Object.entries(groups)) {
    if (items.length === 0) continue;
    md += `### ${groupName}\n\n`;
    md += '| No. | Route | Page Type | Source File | H1 Count | Exact H1 | Meta Title | Canonical | Indexable | Status |\n';
    md += '|---|---|---|---|---|---|---|---|---|---|\n';
    items.forEach((r, i) => {
      md += `| ${i+1} | ${r.route} | ${r.pageType} | ${r.sourceFile} | ${r.h1Count} | ${r.h1Text} | ${r.metaTitle} | ${r.canonical} | ${r.indexable} | ${r.httpStatus} ${r.issue} |\n`;
    });
    md += '\n';
  }

  // Duplicate Summary
  md += '## 2. Duplicate Summary\n\n';
  md += '| H1 Text | URLs Using It | Duplicate Status | Recommendation |\n';
  md += '|---|---|---|---|\n';
  Object.entries(h1Counts).filter(([h1, count]) => count > 1).forEach(([h1, count]) => {
    const urls = results.filter(r => r.h1Text === h1).map(r => r.route).join(', ');
    md += `| ${h1} | ${urls} | Problematic | Write unique H1s for each page |\n`;
  });
  if (Object.keys(h1Counts).filter(k => h1Counts[k] > 1).length === 0) {
    md += '| None | - | - | - |\n';
  }

  // Final Numbers
  md += '\n## 3. Final Numbers\n\n';
  md += `- Total routes discovered: ${results.length}\n`;
  md += `- Total public indexable pages: ${results.filter(r => r.indexable === 'Yes' && r.httpStatus === 200).length}\n`;
  md += `- Total noindex pages: ${results.filter(r => r.indexable === 'No').length}\n`;
  md += `- Total redirects: ${results.filter(r => [301, 302, 307, 308].includes(r.httpStatus)).length}\n`;
  md += `- Pages with exactly one H1: ${results.filter(r => r.h1Count === 1).length}\n`;
  md += `- Pages with no H1: ${results.filter(r => r.h1Count === 0).length}\n`;
  md += `- Pages with multiple H1s: ${results.filter(r => r.h1Count > 1).length}\n`;
  md += `- Duplicate H1 groups: ${Object.keys(h1Counts).filter(k => h1Counts[k] > 1).length}\n`;
  md += `- Pages whose H1 and meta title have conflicting intent: ${results.filter(r => r.issue.includes('H1 conflicts')).length}\n`;

  fs.writeFileSync('C:\\Users\\daxpa\\.gemini\\antigravity\\brain\\8ab27c81-392f-48c0-ba20-398678adc7a5\\karotools_complete_h1_audit.md', md);
  
  console.log("Audit complete");
  process.exit(0);
}

run();
