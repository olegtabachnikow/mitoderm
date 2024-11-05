import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/:slug((?!en|ru|he)[^/]+)', // Exclude 'en', 'ru', and 'he' from the path
        destination: '/news/en',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
