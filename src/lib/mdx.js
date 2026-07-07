import fs from 'fs';
import path from 'path';

export function getMdxPages(directory) {
  const targetDir = path.join(process.cwd(), 'src/app', directory);
  if (!fs.existsSync(targetDir)) return [];

  const dirs = fs.readdirSync(targetDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());
  
  const posts = [];
  
  for (const dir of dirs) {
    const mdxPath = path.join(targetDir, dir.name, 'page.mdx');
    const jsxPath = path.join(targetDir, dir.name, 'page.jsx');
    
    if (fs.existsSync(mdxPath)) {
      const content = fs.readFileSync(mdxPath, 'utf8');
      
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      const descMatch = content.match(/description:\s*["']([^"']+)["']/);
      const dateMatch = content.match(/datePublished:\s*["']([^"']+)["']/);
      
      if (titleMatch && descMatch) {
        posts.push({
          slug: dir.name,
          title: titleMatch[1],
          description: descMatch[1],
          date: dateMatch ? dateMatch[1] : new Date('2026-06-12').toISOString(),
          path: `/${directory}/${dir.name}`,
          category: directory === 'blog' ? 'Tax & Compliance' : 'Practical Guide',
          readTime: Math.max(1, Math.ceil(content.split(' ').length / 200)) + " min read"
        });
      }
    } else if (fs.existsSync(jsxPath)) {
      const content = fs.readFileSync(jsxPath, 'utf8');
      
      let titleMatch = content.match(/"headline":\s*["']([^"']+)["']/);
      let descMatch = content.match(/"description":\s*["']([^"']+)["']/);
      let dateMatch = content.match(/"datePublished":\s*["']([^"']+)["']/);
      
      if (!titleMatch) titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      if (!descMatch) descMatch = content.match(/description:\s*["']([^"']+)["']/);
      if (!dateMatch) dateMatch = content.match(/date:\s*["']([^"']+)["']/);

      if (titleMatch) {
        posts.push({
          slug: dir.name,
          title: titleMatch[1],
          description: descMatch ? descMatch[1] : "",
          date: dateMatch ? dateMatch[1] : new Date('2026-06-15').toISOString(), // Fallback date
          path: `/${directory}/${dir.name}`,
          category: directory === 'blog' ? 'Tax & Compliance' : 'Practical Guide',
          readTime: Math.max(1, Math.ceil(content.split(' ').length / 200)) + " min read"
        });
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
