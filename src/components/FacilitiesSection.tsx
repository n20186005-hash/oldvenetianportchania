'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    id: string;
    title: string;
    description: string;
    hint?: string;
  }>;

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p
          className="text-lg leading-relaxed mb-10 max-w-3xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <FacilityCard
              key={item.id}
              iconKey={item.id}
              title={item.title}
              description={item.description}
              hint={item.hint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilityCard({
  iconKey,
  title,
  description,
  hint,
}: {
  iconKey: string;
  title: string;
  description: string;
  hint?: string;
}) {
  const icons: Record<string, ReactNode> = {
    wc: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v8H4z"/>
        <path d="M8 12v4"/>
        <path d="M16 12v4"/>
        <path d="M6 20h12"/>
      </svg>
    ),
    parking: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 12h3v4h10v-4h3L12 2z"/>
        <rect x="10" y="16" width="4" height="6"/>
      </svg>
    ),
    dining: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3"/>
        <path d="M6 3v18"/>
        <path d="M15 3c0 3 3 4 3 8s-3 5-3 10"/>
        <path d="M15 8h3"/>
      </svg>
    ),
    accommodation: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    shopping: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <path d="M3 6h18"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    fuel: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17"/>
        <path d="M13 9h3a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9l-3-3"/>
        <path d="M7 7h4"/>
        <path d="M3 22h10"/>
      </svg>
    ),
  };

  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-3"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--accent)', color: 'white' }}
        >
          {icons[iconKey] || icons.shopping}
        </div>
        {hint && (
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: 'var(--bg-primary)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
          >
            {hint}
          </span>
        )}
      </div>
      <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
    </div>
  );
}
