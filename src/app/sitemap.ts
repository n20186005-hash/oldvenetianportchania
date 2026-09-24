import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.oldvenetianportchania.com';
const locales = ['zh', 'en', 'el', 'de', 'fr'] as const;
// Fixed date to avoid build-to-build drift
const lastModified = new Date('2026-09-01');

const paths = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'] as const;

function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = { 'x-default': `${baseUrl}/en${path}` };
  for (const locale of locales) {
    languages[locale === 'zh' ? 'zh-CN' : locale] = `${baseUrl}/${locale}${path}`;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      const url = `${baseUrl}/${locale}${path}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.5,
        alternates: {
          languages: languagesFor(path),
        },
      });
    }
  }

  return entries;
}
