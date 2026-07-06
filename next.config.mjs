import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/gst-invoice-generator',
        destination: '/invoice-generator',
        permanent: true,
      },
      {
        source: '/normal-tax-calculator',
        destination: '/44ada-tax-calculator',
        permanent: true,
      },
      {
        source: '/blog/proforma-invoice-guide',
        destination: '/guides/proforma-invoice-guide',
        permanent: true,
      },
      {
        source: '/blog/how-to-make-gst-invoice-online-free',
        destination: '/guides/how-to-make-gst-invoice-online-free',
        permanent: true,
      },
      {
        source: '/blog/how-to-register-gst-online',
        destination: '/guides/how-to-register-gst-online',
        permanent: true,
      },
      {
        source: '/blog/hsn-sac-codes-freelancers',
        destination: '/guides/hsn-sac-codes-freelancers',
        permanent: true,
      },
      {
        source: '/guides/gst-return-due-dates-calendar',
        destination: '/blog/gst-return-due-dates-calendar',
        permanent: true,
      },
      {
        source: '/gst-calculator/18-percent-gst-calculator',
        destination: '/gst-calculator',
        permanent: true,
      },
      {
        source: '/gst-calculator/inclusive-exclusive-gst-calculator',
        destination: '/gst-calculator',
        permanent: true,
      },
      {
        source: '/gst-calculator/reverse-gst-calculator',
        destination: '/gst-calculator',
        permanent: true,
      },
      {
        source: '/blog/make-gst-invoice-online-free',
        destination: '/guides/how-to-make-gst-invoice-online-free',
        permanent: true,
      },
      {
        source: '/rate-calculator',
        destination: '/freelance-rate-calculator',
        permanent: true,
      },
      {
        source: '/email-generator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/bio-generator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/contract-generator',
        destination: '/tools',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://*.adtrafficquality.google https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://pagead2.googlesyndication.com https://*.adtrafficquality.google https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.clarity.ms https://c.clarity.ms; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://googleads.g.doubleclick.net https://*.adtrafficquality.google https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.google.com https://www.google.com; connect-src 'self' https://pagead2.googlesyndication.com https://*.adtrafficquality.google https://*.google.com https://*.clarity.ms https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;",
          }
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

