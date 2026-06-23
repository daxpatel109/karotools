import { getSafeISODate } from './dateUtils';

export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateSoftwareSchema({ name, url, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "url": url,
    "description": description,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dax Patel",
    "url": "https://karotools.in/author/dax-patel",
    "worksFor": {
      "@type": "Organization",
      "name": "KaroTools"
    }
  };
}

export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": generatePersonSchema()
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KaroTools",
    "url": "https://karotools.in",
    "logo": "https://karotools.in/logo.png",
    "image": "https://karotools.in/og-image.png"
  };
}

export function generateArticleSchema({ title, description, url, datePublished, dateModified, authorName = "KaroTools Editorial Team" }) {
  const authorData = authorName === "Dax Patel" 
    ? generatePersonSchema() 
    : { "@type": "Organization", "name": authorName, "url": "https://karotools.in" };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "author": authorData,
    "publisher": {
      "@type": "Organization",
      "name": "KaroTools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://karotools.in/logo.png"
      }
    }
  };

  const isoPub = getSafeISODate(datePublished);
  const isoMod = getSafeISODate(dateModified) || isoPub;

  if (isoPub) schema.datePublished = isoPub;
  if (isoMod) schema.dateModified = isoMod;

  return schema;
}

export function generateHowToSchema({ name, description, steps }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "name": step.name,
      "text": step.text,
      "url": step.url,
      "position": index + 1
    }))
  };
}

// Next.js recommended JSON-LD injection
export function SchemaScript({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
