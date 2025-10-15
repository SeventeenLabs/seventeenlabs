import { Locale } from './config';

// Import translation files
import enUS from '@/locales/en-US.json';
import deDE from '@/locales/de-DE.json';

const translations = {
  'en': enUS,
  'de': deDE,
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations['en'];
}

export function getNestedTranslation(
  translations: any,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return fallback || key;
    }
  }
  
  return typeof result === 'string' ? result : fallback || key;
}

export function createTranslationFunction(locale: Locale) {
  const translations = getTranslations(locale);
  
  return function t(key: string, fallback?: string): string {
    return getNestedTranslation(translations, key, fallback);
  };
}