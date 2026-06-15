/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

export default nextConfig;
