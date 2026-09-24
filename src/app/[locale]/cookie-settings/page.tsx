import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://www.oldvenetianportchania.com';
  const selfUrl = `${baseUrl}/${locale}/cookie-settings`;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh-CN': `${baseUrl}/zh/cookie-settings`,
        'en': `${baseUrl}/en/cookie-settings`,
        'el': `${baseUrl}/el/cookie-settings`,
        'de': `${baseUrl}/de/cookie-settings`,
        'fr': `${baseUrl}/fr/cookie-settings`,
        'x-default': `${baseUrl}/en/cookie-settings`,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
