import { useTranslations } from 'next-intl';

export default function TableOfContents() {
  const t = useTranslations('header');
  const tIntro = useTranslations('intro');
  const tBasic = useTranslations('basicInfo');
  const tHours = useTranslations('hours');
  const tWeather = useTranslations('weather');
  const tWeatherForecast = useTranslations('weatherForecast');
  const tTickets = useTranslations('tickets');
  const tTransport = useTranslations('transport');
  const tFacilities = useTranslations('facilities');
  const tKnowledge = useTranslations('knowledge');
  const tStories = useTranslations('stories');
  const tRoute = useTranslations('route');
  const tPhoto = useTranslations('photoSpots');
  const tGallery = useTranslations('gallery');
  const tReviews = useTranslations('reviews');
  const tFaq = useTranslations('faq');
  const tSources = useTranslations('sources');
  const tMap = useTranslations('mapSection');

  const sections = [
    { id: 'intro', label: tIntro('title') },
    { id: 'basic-info', label: tBasic('title') },
    { id: 'hours', label: tHours('title') },
    { id: 'weather', label: tWeather('title') },
    { id: 'weather-forecast', label: tWeatherForecast('title') },
    { id: 'tickets', label: tTickets('title') },
    { id: 'transport', label: tTransport('title') },
    { id: 'facilities', label: tFacilities('title') },
    { id: 'knowledge', label: tKnowledge('title') },
    { id: 'stories', label: tStories('title') },
    { id: 'route', label: tRoute('title') },
    { id: 'photo-spots', label: tPhoto('title') },
    { id: 'gallery', label: tGallery('title') },
    { id: 'reviews', label: tReviews('title') },
    { id: 'faq', label: tFaq('title') },
    { id: 'sources', label: tSources('title') },
    { id: 'map', label: tMap('title') },
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('toc')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <nav aria-label={t('toc')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section, i) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  {i + 1}
                </span>
                {section.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
