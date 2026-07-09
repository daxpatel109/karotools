import "../index.css";
import "../App.css";
import "../ScrollPathSection.css";
import Script from "next/script";
import CookieBanner from "../CookieBanner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "../components/ThemeProvider";

if (typeof window === "undefined") {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
}

export const metadata = {
  metadataBase: new URL("https://karotools.in"),
  title: {
    template: "%s",
    default: "KaroTools — Free GST Calculator, Invoice Generator & Business Tools",
  },
  description: "Free online tools for Indian freelancers & small businesses — GST Calculator, GST Invoice Generator, Email Generator, Bio Generator, Freelance Rate Calculator. No login required. 100% free.",
  openGraph: {
    title: "Best Free Tools for Indian Freelancers — KaroTools",
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
    google: "FRY2kNGngjmC8U07y0Mh_s4ldS7PeXa8oQo3MciDEOA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="trustpilot-one-time-domain-verification-id" content="e4e32cde-c73f-41b4-86bb-98009c4efc3a"/>
        <meta name="google-adsense-account" content="ca-pub-7694069908908392" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          .adsbygoogle { min-height: 100px !important; display: block; }
        `}} />

        <script dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@graph": [
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-QB5S73V0TX"} />

        <Script id="microsoft-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x5zii59qg1");
          `
        }} />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
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
