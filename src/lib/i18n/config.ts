export const locales = ['en', 'de'] as const;
export const defaultLocale = 'en';

export type Locale = typeof locales[number];

export function getLocaleFromString(locale: string): Locale {
  return locales.find(l => l === locale) || defaultLocale;
}