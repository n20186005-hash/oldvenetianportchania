'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as any;
  const items = (messages?.stories?.items || []) as Array<{
    id: string;
    title: string;
    content: string;
    tag?: string;
  }>;

  return (
    <section id="stories" className="section-padding">
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-6">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {index + 1}
                </div>
                {item.tag && (
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: 'var(--bg-primary)',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent)',
                    }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
              <h3
                className="font-display text-xl sm:text-2xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
