import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const baseUrl = 'https://www.oldvenetianportchania.com';
const heroImage = `${baseUrl}/gallery/old-venetian-port-of-chania%20(1).jpg`;

const htmlLangMap: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  el: 'el',
  de: 'de',
  fr: 'fr',
};

const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  el: 'el_GR',
  de: 'de_DE',
  fr: 'fr_FR',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const urls: Record<string, string> = {};
  for (const loc of routing.locales) {
    urls[loc] = `${baseUrl}/${loc}`;
  }
  const selfUrl = `${baseUrl}/${locale}`;

  const languages: Record<string, string> = {
    'zh-CN': urls['zh'],
    en: urls['en'],
    el: urls['el'],
    de: urls['de'],
    fr: urls['fr'],
    'x-default': urls['en'],
  };

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    manifest: '/manifest.webmanifest',
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: 'Old Venetian Port of Chania',
      locale: ogLocaleMap[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: heroImage,
          alt: messages.hero?.imgAlt || 'Old Venetian Port of Chania',
          width: 1200,
          height: 630,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const selfUrl = `${baseUrl}/${locale}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Old Venetian Port of Chania',
        url: baseUrl,
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Old Venetian Port of Chania',
        inLanguage: htmlLangMap[locale] || locale,
        publisher: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}#webpage`,
        url: selfUrl,
        name: (messages as any)?.meta?.title,
        description: (messages as any)?.meta?.description,
        isPartOf: { '@id': `${baseUrl}/#website` },
        inLanguage: htmlLangMap[locale] || locale,
        datePublished: '2026-05-01',
        dateModified: '2026-09-01',
        about: { '@id': `${baseUrl}/#attraction` },
      },
      {
        '@type': 'TouristAttraction',
        '@id': `${baseUrl}/#attraction`,
        name: 'Old Venetian Port of Chania',
        alternateName: [
          'Παλαιό Ενετικό Λιμάνι Χανίων',
          'Vieux Port Vénitien de La Canée',
          'Alter Venezianischer Hafen Chania',
          '哈尼亚威尼斯旧港',
        ],
        description: (messages as any)?.meta?.description,
        url: selfUrl,
        image: heroImage,
        isAccessibleForFree: true,
        touristType: ['Historic Landmark', 'Harbor'],
        hasMap: 'https://maps.app.goo.gl/2ABtjDZz3dGynkJV8',
        sameAs: [
          'https://maps.app.goo.gl/2ABtjDZz3dGynkJV8',
          'https://www.visitgreece.gr/inspirations/the_old_port_area_of_chania/',
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.5171655,
          longitude: 24.0151836,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ag. Markou 8',
          addressLocality: 'Chania',
          postalCode: '731 32',
          addressCountry: 'GR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '42404',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      },
    ],
  };

  return (
    <html lang={htmlLangMap[locale] || locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var GA_ID = 'G-HXM22WWPKP';
                function loadGA() {
                  if (window.__gaLoaded) return;
                  window.__gaLoaded = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  function gtag() { window.dataLayer.push(arguments); }
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', GA_ID);
                }
                function checkConsent() {
                  try {
                    var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                    if (prefs.analytics) loadGA();
                  } catch (e) {}
                }
                checkConsent();
                window.addEventListener('consent-updated', checkConsent);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
