'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export default function WeatherSection() {
  const t = useTranslations('weather');

  const seasonCards = [
    {
      seasonKey: 'spring',
      iconKey: 'spring',
      months: t('spring.months'),
      tempRange: t('spring.tempRange'),
      precipitation: t('spring.precipitation'),
      humidity: t('spring.humidity'),
      sunshine: t('spring.sunshine'),
      notes: t('spring.notes'),
    },
    {
      seasonKey: 'summer',
      iconKey: 'summer',
      months: t('summer.months'),
      tempRange: t('summer.tempRange'),
      precipitation: t('summer.precipitation'),
      humidity: t('summer.humidity'),
      sunshine: t('summer.sunshine'),
      notes: t('summer.notes'),
    },
    {
      seasonKey: 'autumn',
      iconKey: 'autumn',
      months: t('autumn.months'),
      tempRange: t('autumn.tempRange'),
      precipitation: t('autumn.precipitation'),
      humidity: t('autumn.humidity'),
      sunshine: t('autumn.sunshine'),
      notes: t('autumn.notes'),
    },
    {
      seasonKey: 'winter',
      iconKey: 'winter',
      months: t('winter.months'),
      tempRange: t('winter.tempRange'),
      precipitation: t('winter.precipitation'),
      humidity: t('winter.humidity'),
      sunshine: t('winter.sunshine'),
      notes: t('winter.notes'),
    },
  ];

  const tips = [
    { key: 'uv', iconKey: 'uv', text: t('tips.uv') },
    { key: 'wind', iconKey: 'wind', text: t('tips.wind') },
    { key: 'rain', iconKey: 'rain', text: t('tips.rain') },
    { key: 'water', iconKey: 'water', text: t('tips.water') },
    { key: 'clothing', iconKey: 'clothing', text: t('tips.clothing') },
    { key: 'hours', iconKey: 'hours', text: t('tips.hours') },
  ];

  return (
    <section id="weather" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p
          className="text-lg mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {seasonCards.map((card) => (
            <SeasonCard key={card.seasonKey} {...card} />
          ))}
        </div>

        <div
          className="rounded-xl p-6 mb-10"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px dashed var(--border-color)',
          }}
        >
          <h3
            className="font-display text-xl font-semibold mb-6 flex items-center gap-3"
            style={{ color: 'var(--text-primary)' }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--accent)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L4 12h3v4h10v-4h3L12 2z"/>
                <rect x="10" y="16" width="4" height="6"/>
              </svg>
            </span>
            {t('bestSeason.title')}
          </h3>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('bestSeason.description')}
          </p>
        </div>

        <h3
          className="font-display text-2xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('tips.title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip) => (
            <TipCard key={tip.key} iconKey={tip.iconKey} text={tip.text} />
          ))}
        </div>

        <div
          className="mt-10 rounded-xl p-5 flex items-start gap-4"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--accent)',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            className="flex-shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('disclaimer.label')}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('disclaimer.text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeasonCard({
  iconKey,
  months,
  tempRange,
  precipitation,
  humidity,
  sunshine,
  notes,
}: {
  seasonKey: string;
  iconKey: string;
  months: string;
  tempRange: string;
  precipitation: string;
  humidity: string;
  sunshine: string;
  notes: string;
}) {
  const icons: Record<string, ReactNode> = {
    spring: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10"/>
        <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>
      </svg>
    ),
    summer: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    autumn: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.5c1.5 3 .5 6.5-1.5 8-3.5 2.5-2.5 7.5-6.7 7.5z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
      </svg>
    ),
    winter: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        <line x1="4.93" y1="19.07" x2="19.07" y2="4.93"/>
      </svg>
    ),
  };

  const accentColors: Record<string, string> = {
    spring: '#6b8e4e',
    summer: 'var(--color-autumn-500)',
    autumn: 'var(--color-autumn-600)',
    winter: 'var(--color-water-600)',
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div
        className="flex items-center gap-3 mb-5 pb-4"
        style={{ borderBottom: '1px dashed var(--border-color)' }}
      >
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `${accentColors[iconKey]}15`,
            color: accentColors[iconKey],
          }}
        >
          {icons[iconKey]}
        </span>
        <div>
          <h4 className="font-display text-xl font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>
            {months.split(' ')[0]}
          </h4>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{months}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{tempRange.split(':')[0]}</span>
          <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{tempRange.split(':')[1]}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{precipitation.split(':')[0]}</span>
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{precipitation.split(':')[1]}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{humidity.split(':')[0]}</span>
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{humidity.split(':')[1]}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{sunshine.split(':')[0]}</span>
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{sunshine.split(':')[1]}</span>
        </div>
      </div>

      <p
        className="text-sm mt-5 pt-4 leading-relaxed"
        style={{
          borderTop: '1px dashed var(--border-color)',
          color: 'var(--text-secondary)',
        }}
      >
        {notes}
      </p>
    </div>
  );
}

function TipCard({ iconKey, text }: { iconKey: string; text: string }) {
  const icons: Record<string, ReactNode> = {
    uv: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      </svg>
    ),
    wind: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
      </svg>
    ),
    rain: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="16" y1="13" x2="16" y2="21"/>
        <line x1="8" y1="13" x2="8" y2="21"/>
        <line x1="12" y1="15" x2="12" y2="23"/>
        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
      </svg>
    ),
    water: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    clothing: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
      </svg>
    ),
    hours: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  };

  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
      }}
    >
      <span
        className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
        style={{
          background: 'var(--bg-secondary)',
          color: 'var(--accent)',
          border: '1px solid var(--border-color)',
        }}
      >
        {icons[iconKey]}
      </span>
      <p className="text-sm leading-relaxed pt-1" style={{ color: 'var(--text-secondary)' }}>
        {text}
      </p>
    </div>
  );
}
