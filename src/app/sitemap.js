export default function sitemap() {
  const baseUrl = "https://karotools.in";
  
  const routes = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/gst-calculator", priority: 0.9, freq: "monthly" },
    { path: "/gst-invoice-generator", priority: 0.9, freq: "monthly" },
    { path: "/fire-calculator", priority: 0.9, freq: "monthly" },
    { path: "/tax-calculator", priority: 0.9, freq: "monthly" },
    { path: "/freelance-rate-calculator", priority: 0.8, freq: "monthly" },
    { path: "/44ada-tax-calculator", priority: 0.8, freq: "monthly" },
    { path: "/normal-tax-calculator", priority: 0.8, freq: "monthly" },
    { path: "/advance-tax-calculator", priority: 0.8, freq: "monthly" },
    { path: "/salary-vs-freelance", priority: 0.8, freq: "monthly" },
    { path: "/late-gst-penalty-calculator", priority: 0.8, freq: "monthly" },
    { path: "/sip-calculator", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "yearly" },
    { path: "/privacy-policy", priority: 0.5, freq: "yearly" },
    { path: "/terms", priority: 0.5, freq: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
