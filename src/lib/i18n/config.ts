export const locales = ['en-US', 'de-DE'] as const;
export const defaultLocale = 'en-US';

export type Locale = typeof locales[number];

export function getLocaleFromString(locale: string): Locale {
  return locales.find(l => l === locale) || defaultLocale;
}