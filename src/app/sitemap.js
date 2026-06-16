import { getMdxPages } from '../lib/mdx';

export default function sitemap() {
  const baseUrl = "https://karotools.in";
  
  const routes = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/blog", priority: 0.9, freq: "daily" },
    { path: "/guides", priority: 0.9, freq: "daily" },
    { path: "/gst-calculator", priority: 0.9, freq: "monthly" },
    { path: "/invoice-generator", priority: 0.9, freq: "monthly" },
    { path: "/late-gst-penalty-calculator", priority: 0.8, freq: "monthly" },
    { path: "/tax-calculator", priority: 0.9, freq: "monthly" },
    { path: "/advance-tax-calculator", priority: 0.8, freq: "monthly" },
    { path: "/44ada-tax-calculator", priority: 0.8, freq: "monthly" },
    { path: "/normal-tax-calculator", priority: 0.8, freq: "monthly" },
    { path: "/freelance-rate-calculator", priority: 0.8, freq: "monthly" },
    { path: "/salary-vs-freelance", priority: 0.8, freq: "monthly" },
    { path: "/fire-calculator", priority: 0.8, freq: "monthly" },
    { path: "/sip-calculator", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "yearly" },
    { path: "/privacy-policy", priority: 0.5, freq: "yearly" },
    { path: "/terms", priority: 0.5, freq: "yearly" },
  ];

  const sitemapItems = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const blogPosts = getMdxPages('blog');
  const guidePosts = getMdxPages('guides');

  [...blogPosts, ...guidePosts].forEach(post => {
    sitemapItems.push({
      url: `${baseUrl}${post.path}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return sitemapItems;
}
