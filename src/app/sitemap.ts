import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = 'https://mitoderm.com';

const routes = [
  {
    path: '', 
    priority: 1.0,
    changefreq: 'weekly' as const,
  },
  {
    path: 'exotechgel',
    priority: 0.9,
    changefreq: 'weekly' as const,
  },
  {
    path: 'exosignal_hair',
    priority: 0.9,
    changefreq: 'weekly' as const,
  },
  {
    path: 'exosignalhairspray',
    priority: 0.9,
    changefreq: 'weekly' as const,
  },
  {
    path: 'event',
    priority: 0.7,
    changefreq: 'monthly' as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    routing.locales.forEach((locale) => {
      const url = route.path
        ? `${baseUrl}/${locale}/${route.path}`
        : `${baseUrl}/${locale}`;

      sitemapEntries.push({
        url,
        lastModified: new Date('2026-01-01'),
        changeFrequency: route.changefreq,
        priority: route.priority,
      });
    });
  });

  return sitemapEntries;
}
