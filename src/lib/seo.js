export function generateMetadata({ title, description, path, keywords = [], type = 'website' }) {
  const url = `https://karotools.in${path}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'KaroTools',
      locale: 'en_IN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://karotools.in/og-image.png'],
    }
  };
}
