import fs from 'fs';
import path from 'path';

// Parse CSV
const csv = fs.readFileSync('C:\\\\Users\\\\daxpa\\\\.gemini\\\\antigravity\\\\brain\\\\8ab27c81-392f-48c0-ba20-398678adc7a5\\\\karotools_complete_h1_audit.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim() !== '' && !l.startsWith('route,'));
const pages = [];

for(const line of lines) {
  // Regex to parse CSV correctly with quotes
  const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
  if (parts.length >= 7) {
      pages.push({
          route: parts[0].replace(/"/g, ''),
          pageType: parts[1].replace(/"/g, ''),
          sourceFile: parts[2].replace(/"/g, ''),
          h1: parts[5].replace(/"/g, ''),
          metaTitle: parts[6].replace(/"/g, ''),
      });
  }
}

const analysis = [];

for (const p of pages) {
    if (p.pageType === 'Main' || p.pageType === 'Legal/Trust' || p.pageType === 'Other') continue; // Focus on SEO pages
    
    let content = '';
    const filePath = path.join(process.cwd(), p.sourceFile);
    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch(e) {
        continue;
    }
    
    // Rough word count (removing tags)
    const textOnly = content.replace(/<[^>]*>?/gm, ' ').replace(/\{.*?\}/gs, ' ');
    const wordCount = textOnly.split(/\s+/).filter(w => w.length > 2).length;
    
    const h2s = (content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || []).map(h => h.replace(/<[^>]*>?/gm, '').trim());
    const h3s = (content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || []).map(h => h.replace(/<[^>]*>?/gm, '').trim());
    const hasFaq = content.includes('FAQPage') || content.includes('faqSchema') || content.includes('Frequently Asked Questions');
    
    let schemas = [];
    if(content.includes('SoftwareApplication')) schemas.push('SoftwareApplication');
    if(content.includes('Article')) schemas.push('Article');
    if(content.includes('FAQPage')) schemas.push('FAQPage');
    if(content.includes('BlogPosting')) schemas.push('BlogPosting');
    
    let primaryKeyword = '';
    // Infer primary keyword from route/h1
    if (p.route.includes('gst-calculator')) primaryKeyword = 'gst calculator';
    else if (p.route.includes('invoice-generator')) primaryKeyword = 'gst invoice generator';
    else if (p.route.includes('tax-calculator') && !p.route.includes('advance')) primaryKeyword = 'income tax calculator india';
    else if (p.route.includes('advance-tax')) primaryKeyword = 'advance tax calculator';
    else if (p.route.includes('freelance-rate')) primaryKeyword = 'freelance rate calculator';
    else if (p.route.includes('upwork-fiverr')) primaryKeyword = 'upwork fee calculator';
    else if (p.route.includes('44ada-tax')) primaryKeyword = '44ada calculator';
    else if (p.route.includes('gst-for-freelancers')) primaryKeyword = 'gst for freelancers';
    else if (p.route.includes('gst-registration-threshold')) primaryKeyword = 'gst registration threshold';
    else if (p.route.includes('how-to-make-gst-invoice')) primaryKeyword = 'how to make gst invoice online';
    else if (p.route.includes('section-44ada-freelancers')) primaryKeyword = 'section 44ada for freelancers';
    else primaryKeyword = p.route.split('/').pop().replace(/-/g, ' ');

    let keywordCount = 0;
    if (primaryKeyword) {
        const regex = new RegExp(primaryKeyword, 'gi');
        keywordCount = (content.match(regex) || []).length;
    }
    
    let intent = 'Informational';
    if (p.pageType === 'Tool') intent = 'Tool/calculator intent';
    
    analysis.push({
        route: p.route,
        type: p.pageType,
        primaryKeyword,
        keywordCount,
        wordCount,
        h2Count: h2s.length,
        h3Count: h3s.length,
        hasFaq,
        schemas,
        h1: p.h1,
        metaTitle: p.metaTitle
    });
}

fs.writeFileSync('C:\\\\Users\\\\daxpa\\\\.gemini\\\\antigravity\\\\brain\\\\8ab27c81-392f-48c0-ba20-398678adc7a5\\\\phase2_analysis_results.json', JSON.stringify(analysis, null, 2));
console.log('Analysis complete. Results in phase2_analysis_results.json');
