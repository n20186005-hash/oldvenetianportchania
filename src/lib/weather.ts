export type WeatherCode =
  | 0
  | 1
  | 2
  | 3
  | 45
  | 48
  | 51
  | 53
  | 55
  | 56
  | 57
  | 61
  | 63
  | 65
  | 66
  | 67
  | 71
  | 73
  | 75
  | 77
  | 80
  | 81
  | 82
  | 85
  | 86
  | 95
  | 96
  | 99;

export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  weather_code: WeatherCode;
  wind_speed_10m: number;
  wind_direction_10m: number;
  precipitation: number;
  is_day: number;
  time: string;
}

export interface DailyWeather {
  time: string[];
  weather_code: WeatherCode[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherForecastData {
  current: CurrentWeather;
  daily: DailyWeather;
  lastUpdated: string;
}

const CHANIA_LAT = 35.5127;
const CHANIA_LON = 24.0171;
const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeatherForecast(
  days: number = 5,
): Promise<WeatherForecastData | null> {
  const params = new URLSearchParams({
    latitude: String(CHANIA_LAT),
    longitude: String(CHANIA_LON),
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset',
    timezone: 'Europe/Athens',
    forecast_days: String(Math.max(1, Math.min(7, days))),
    wind_speed_unit: 'kmh',
  });

  const url = `${OPEN_METEO_BASE}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    return {
      current: {
        temperature_2m: json.current.temperature_2m,
        apparent_temperature: json.current.apparent_temperature,
        relative_humidity_2m: json.current.relative_humidity_2m,
        weather_code: json.current.weather_code,
        wind_speed_10m: json.current.wind_speed_10m,
        wind_direction_10m: json.current.wind_direction_10m,
        precipitation: json.current.precipitation,
        is_day: json.current.is_day,
        time: json.current.time,
      },
      daily: {
        time: json.daily.time,
        weather_code: json.daily.weather_code,
        temperature_2m_max: json.daily.temperature_2m_max,
        temperature_2m_min: json.daily.temperature_2m_min,
        precipitation_sum: json.daily.precipitation_sum,
        precipitation_probability_max: json.daily.precipitation_probability_max,
        wind_speed_10m_max: json.daily.wind_speed_10m_max,
        sunrise: json.daily.sunrise,
        sunset: json.daily.sunset,
      },
      lastUpdated: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export const CHANIA_COORDS = {
  lat: CHANIA_LAT,
  lon: CHANIA_LON,
};
