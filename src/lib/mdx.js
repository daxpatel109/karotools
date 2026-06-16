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
    if (fs.existsSync(mdxPath)) {
      const content = fs.readFileSync(mdxPath, 'utf8');
      
      // Simple regex extraction for metadataObj
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      const descMatch = content.match(/description:\s*["']([^"']+)["']/);
      const dateMatch = content.match(/datePublished:\s*["']([^"']+)["']/);
      
      if (titleMatch && descMatch) {
        posts.push({
          slug: dir.name,
          title: titleMatch[1],
          description: descMatch[1],
          date: dateMatch ? dateMatch[1] : new Date().toISOString(),
          path: `/${directory}/${dir.name}`,
          category: directory === 'blog' ? 'Tax & Compliance' : 'Practical Guide',
          readTime: Math.max(1, Math.ceil(content.split(' ').length / 200)) + " min read"
        });
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
