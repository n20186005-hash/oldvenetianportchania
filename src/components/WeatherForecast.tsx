import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchWeatherForecast, CHANIA_COORDS, type WeatherCode } from '@/lib/weather';
import type { ReactNode } from 'react';

export default async function WeatherForecast({
  locale,
}: {
  locale: string;
}) {
  setRequestLocale(locale);
  const t = await getTranslations('weatherForecast');

  const data = await fetchWeatherForecast(5);

  if (!data) {
    return (
      <section id="weather-forecast" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            {t('title')}
          </h2>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
          <div
            className="rounded-xl p-6"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div className="flex items-start gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('unavailable')}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { current, daily, lastUpdated } = data;
  const updated = new Date(lastUpdated);
  const updatedLocal = updated.toLocaleString(locale === 'zh' ? 'zh-CN' : locale, {
    timeZone: 'Europe/Athens',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  });

  const condition = getConditionKey(current.weather_code, current.is_day === 1);

  return (
    <section id="weather-forecast" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div
          className="rounded-2xl p-6 sm:p-8 mb-8"
          style={{
            background: `linear-gradient(135deg, var(--color-water-800) 0%, var(--color-nature-700) 100%)`,
            color: '#fff',
            boxShadow: '0 10px 30px rgba(20, 45, 28, 0.18)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                >
                  <WeatherIcon code={current.weather_code} isDay={current.is_day === 1} size={52} color="#ffffff" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl sm:text-6xl font-light tracking-tight">
                    {Math.round(current.temperature_2m)}°
                  </span>
                  <span className="text-lg opacity-80">°C</span>
                </div>
                <p className="text-xl font-medium mb-2 opacity-95">{t(`conditions.${condition}`)}</p>
                <p className="text-sm opacity-70">
                  {t('feelsLike')} {Math.round(current.apparent_temperature)}°C
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:gap-x-12">
              <Stat label={t('humidity')} value={`${current.relative_humidity_2m}%`} />
              <Stat label={t('wind')} value={`${Math.round(current.wind_speed_10m)} km/h`} sub={directionLabel(current.wind_direction_10m, t)} />
              <Stat label={t('precipitation')} value={`${current.precipitation.toFixed(1)} mm`} />
              <Stat label={t('asOf')} value={updatedLocal} />
            </div>
          </div>
        </div>

        <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('forecast.title')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {daily.time.map((iso, idx) => {
            const date = new Date(iso + 'T00:00:00');
            const isToday = idx === 0;
            const weekDay = date.toLocaleDateString(
              locale === 'zh' ? 'zh-CN' : locale,
              { weekday: 'short' },
            );
            const dayNum = date.toLocaleDateString(
              locale === 'zh' ? 'zh-CN' : locale,
              { day: 'numeric', month: 'short' },
            );
            return (
              <div
                key={iso}
                className="rounded-xl p-5"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: isToday
                    ? '1px solid var(--accent)'
                    : '1px solid var(--border-color)',
                  boxShadow: isToday ? '0 0 0 1px var(--accent)' : 'var(--card-shadow)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                      {isToday ? t('forecast.today') : weekDay}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{dayNum}</p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <WeatherIcon
                      code={daily.weather_code[idx]}
                      isDay={true}
                      size={24}
                      color="var(--accent)"
                    />
                  </div>
                </div>

                <p className="text-sm mb-3 min-h-[2.5rem] leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  {t(`conditions.${getConditionKey(daily.weather_code[idx], true)}`)}
                </p>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(daily.temperature_2m_max[idx])}°
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    / {Math.round(daily.temperature_2m_min[idx])}°C
                  </span>
                </div>

                <div
                  className="space-y-2 pt-3"
                  style={{ borderTop: '1px dashed var(--border-color)' }}
                >
                  <MiniRow
                    iconKey="drop"
                    label={t('forecast.rain')}
                    value={`${daily.precipitation_probability_max[idx]}% · ${daily.precipitation_sum[idx].toFixed(1)} mm`}
                  />
                  <MiniRow
                    iconKey="wind"
                    label={t('forecast.wind')}
                    value={`${Math.round(daily.wind_speed_10m_max[idx])} km/h`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px dashed var(--border-color)',
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('dataSource.label')}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('dataSource.text', {
                provider: 'Open-Meteo',
                lat: CHANIA_COORDS.lat.toFixed(4),
                lon: CHANIA_COORDS.lon.toFixed(4),
              })}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              {t('dataSource.timezone')} · {t('dataSource.refresh')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider opacity-60 mb-0.5">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
      {sub && <p className="text-xs opacity-70 mt-0.5">{sub}</p>}
    </div>
  );
}

function MiniRow({ iconKey, label, value }: { iconKey: string; label: string; value: string }) {
  const icons: Record<string, ReactNode> = {
    drop: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    wind: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
      <span style={{ color: 'var(--accent)' }}>{icons[iconKey]}</span>
      <span style={{ color: 'var(--text-muted)' }}>{label}:</span>
      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

function directionLabel(deg: number, t: (key: string) => string) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const i = Math.round(((deg % 360) / 360) * 8) % 8;
  const key = dirs[i];
  try {
    return t(`directions.${key}`);
  } catch {
    return key;
  }
}

export function getConditionKey(code: WeatherCode, isDay: boolean): string {
  switch (code) {
    case 0:
      return isDay ? 'clear_day' : 'clear_night';
    case 1:
    case 2:
      return isDay ? 'partly_cloudy_day' : 'partly_cloudy_night';
    case 3:
      return 'cloudy';
    case 45:
    case 48:
      return 'fog';
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return 'drizzle';
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return 'rain';
    case 71:
    case 73:
    case 75:
    case 77:
      return 'snow';
    case 80:
    case 81:
    case 82:
      return 'showers';
    case 85:
    case 86:
      return 'snow_showers';
    case 95:
    case 96:
    case 99:
      return 'thunderstorm';
    default:
      return 'cloudy';
  }
}

function WeatherIcon({
  code,
  isDay,
  size = 24,
  color = 'currentColor',
}: {
  code: WeatherCode;
  isDay: boolean;
  size?: number;
  color?: string;
}) {
  const w = size;
  const h = size;
  const sw = Math.max(1.5, size / 16);

  switch (code) {
    case 0:
      return isDay ? (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <line x1="12" y1="2" x2="12" y2="4"/>
          <line x1="12" y1="20" x2="12" y2="22"/>
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
          <line x1="2" y1="12" x2="4" y2="12"/>
          <line x1="20" y1="12" x2="22" y2="12"/>
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/>
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
        </svg>
      ) : (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      );
    case 1:
    case 2:
      return isDay ? (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18a5 5 0 0 0-9.2-1.8A4.5 4.5 0 0 0 9 20h8a4 4 0 0 0 0-2z"/>
          <circle cx="8" cy="9" r="3"/>
          <line x1="8" y1="1" x2="8" y2="3"/>
          <line x1="3.64" y1="3.64" x2="5.05" y2="5.05"/>
          <line x1="1" y1="8" x2="3" y2="8"/>
        </svg>
      ) : (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18a5 5 0 0 0-9.2-1.8A4.5 4.5 0 0 0 9 20h8a4 4 0 0 0 0-2z"/>
          <path d="M15 10a5 5 0 0 1-5.79-8.79A7 7 0 0 0 15 10z"/>
        </svg>
      );
    case 3:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.775A6 6 0 0 0 5 12a4 4 0 0 0 1 7.937"/>
        </svg>
      );
    case 45:
    case 48:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="5" y1="11" x2="19" y2="11"/>
          <line x1="3" y1="16" x2="21" y2="16"/>
        </svg>
      );
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14a4 4 0 0 0-7.8-1A3.5 3.5 0 0 0 9 20h6a3.5 3.5 0 0 0 0-6z"/>
          <line x1="9" y1="19" x2="8.5" y2="22"/>
          <line x1="13" y1="19" x2="12.5" y2="22"/>
          <line x1="15.5" y1="19" x2="15" y2="22"/>
        </svg>
      );
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 13a5 5 0 0 0-9.6-1A4 4 0 0 0 8 20h8a4 4 0 0 0 0-7z"/>
          <line x1="8" y1="19" x2="7" y2="23"/>
          <line x1="12" y1="19" x2="11" y2="23"/>
          <line x1="16" y1="19" x2="15" y2="23"/>
          <line x1="10" y1="19" x2="9" y2="23"/>
          <line x1="14" y1="19" x2="13" y2="23"/>
        </svg>
      );
    case 71:
    case 73:
    case 75:
    case 77:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 13a5 5 0 0 0-9.6-1A4 4 0 0 0 8 20h8a4 4 0 0 0 0-7z"/>
          <line x1="8" y1="20" x2="7" y2="23"/>
          <line x1="12" y1="20" x2="11" y2="23"/>
          <line x1="16" y1="20" x2="15" y2="23"/>
          <line x1="10" y1="20" x2="9" y2="23"/>
          <line x1="14" y1="20" x2="13" y2="23"/>
          <circle cx="8.2" cy="21.5" r="0.4" fill={color} stroke="none"/>
          <circle cx="12.2" cy="21.5" r="0.4" fill={color} stroke="none"/>
          <circle cx="16.2" cy="21.5" r="0.4" fill={color} stroke="none"/>
        </svg>
      );
    case 80:
    case 81:
    case 82:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 13a5 5 0 0 0-9.6-1A4 4 0 0 0 8 20h8a4 4 0 0 0 0-7z"/>
          <path d="M8 20v2"/>
          <path d="M12 20v3"/>
          <path d="M16 20v2"/>
        </svg>
      );
    case 85:
    case 86:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 13a5 5 0 0 0-9.6-1A4 4 0 0 0 8 20h8a4 4 0 0 0 0-7z"/>
          <line x1="8" y1="20" x2="7.5" y2="23"/>
          <line x1="12" y1="20" x2="11.5" y2="23"/>
          <line x1="16" y1="20" x2="15.5" y2="23"/>
        </svg>
      );
    case 95:
    case 96:
    case 99:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 13a5 5 0 0 0-9.6-1A4 4 0 0 0 8 20h8a4 4 0 0 0 0-7z"/>
          <path d="M12 18l-1.5 3h2l-1 3"/>
        </svg>
      );
    default:
      return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
        </svg>
      );
  }
}
