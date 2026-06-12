import React from 'react';

/**
 * A reusable component to inject JSON-LD Schema Markup into Next.js pages.
 * Supports WebApplication, FAQPage, Article, and BreadcrumbList schemas.
 */
export default function SchemaMarkup({ schemaData }) {
  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

// Pre-built Schema Generators for KaroTools
export const generateWebApplicationSchema = (name, description, url) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": name,
  "description": description,
  "url": url,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  }
});

export const generateFAQSchema = (qaPairs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": qaPairs.map((pair) => ({
    "@type": "Question",
    "name": pair.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": pair.answer
    }
  }))
});
