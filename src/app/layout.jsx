import "../index.css";
import "../App.css";
import "../ScrollPathSection.css";
import Script from "next/script";
import CookieBanner from "../CookieBanner";
import ProgressBarProvider from "../ProgressBarProvider";

if (typeof window === "undefined") {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
}

export const metadata = {
  title: "KaroTools — Free GST Calculator, Invoice Generator & Business Tools",
  description: "Free online tools for Indian freelancers & small businesses — GST Calculator, GST Invoice Generator, Email Generator, Bio Generator, Freelance Rate Calculator. No login required. 100% free.",
  openGraph: {
    title: "KaroTools — Free GST Calculator, Invoice Generator & Business Tools",
    description: "GST Calculator, Invoice Generator, Email Writer & more — 100% free, no login needed. Built for India.",
    url: "https://karotools.in",
    siteName: "KaroTools",
    images: [{ url: "https://karotools.in/og-image.png" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaroTools — Free GST Calculator, Invoice Generator & Business Tools",
    description: "Free tools for Indian freelancers. GST Calculator, Invoice Generator, Email Generator & more.",
    images: ["https://karotools.in/og-image.png"],
  },
  verification: {
    google: "H31sONZs31eYgdPLszQc9kToZ5yeh32I8a0RpMvurpI",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7694069908908392" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          .adsbygoogle { min-height: 100px !important; display: block; }
        `}} />

        <script dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "name": "KaroTools GST Calculator & Invoice Generator",
                  "url": "https://karotools.in",
                  "description": "Free online business tools for Indian freelancers and small businesses, including GST calculation and PDF invoice generation without watermarks.",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "All",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  }
                },
                {
                  "@type": "WebSite",
                  "name": "KaroTools",
                  "url": "https://karotools.in",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://karotools.in/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            }
          `
        }} type="application/ld+json" />
      </head>
      <body>
        <ProgressBarProvider>
          {children}
        </ProgressBarProvider>
        <CookieBanner />

        {/* AdSense Deferred */}
        <Script id="adsense-loader" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            function loadAdSense() {
              if(window.adSenseLoaded) return;
              window.adSenseLoaded = true;
              const script = document.createElement('script');
              script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7694069908908392";
              script.crossOrigin = "anonymous";
              document.head.appendChild(script);
              ['scroll', 'mousemove', 'touchstart'].forEach(e => window.removeEventListener(e, loadAdSense));
            }
            ['scroll', 'mousemove', 'touchstart'].forEach(e => window.addEventListener(e, loadAdSense, {once: true, passive: true}));
            setTimeout(loadAdSense, 5000);
          `
        }} />
      </body>
    </html>
  );
}
