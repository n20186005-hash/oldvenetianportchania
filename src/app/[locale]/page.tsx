import { getMessages, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TableOfContents from '@/components/TableOfContents';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import WeatherSection from '@/components/WeatherSection';
import WeatherForecast from '@/components/WeatherForecast';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import InfoSection from '@/components/InfoSection';
import StoriesSection from '@/components/StoriesSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

const baseUrl = 'https://www.oldvenetianportchania.com';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as any;
  const faqItems: Array<{ q: string; a: string }> = messages?.faq?.items || [];
  const breadcrumb: string[] = messages?.intro?.breadcrumb || [];
  const selfUrl = `${baseUrl}/${locale}`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: messages?.header?.home || 'Home', item: selfUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumb[0] || 'Old Venetian Port of Chania',
        item: `${selfUrl}#intro`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: breadcrumb[1] || 'Chania',
        item: `${selfUrl}#basic-info`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: breadcrumb[2] || 'Crete',
        item: `${selfUrl}#basic-info`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: breadcrumb[3] || 'Greece',
        item: `${selfUrl}#basic-info`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TableOfContents />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <WeatherSection />
        <WeatherForecast locale={locale} />
        <TicketsSection />
        <TransportSection />
        <FacilitiesSection />
        <InfoSection />
        <StoriesSection />
        <RouteSection />
        <PhotoSpotsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
      {faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
