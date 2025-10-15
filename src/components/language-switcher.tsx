"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/lib/i18n/context';
import { getPathWithoutLocale, getLocalizedPath } from '@/lib/i18n/utils';
import { Globe } from 'lucide-react';
import { Locale } from '@/lib/i18n/config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const switchLanguage = (newLocale: Locale) => {
    // Get the current path without locale prefix
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    
    // Generate the new path with the new locale
    const newPath = getLocalizedPath(newLocale, pathWithoutLocale);
    
    // Set a cookie to remember the preference
    document.cookie = `preferred-locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    
    // Navigate to the new locale
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-white/60" />
      <div className="flex items-center gap-1">
        <button
          onClick={() => switchLanguage('en')}
          className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
            currentLocale === 'en'
              ? 'text-white bg-white/10'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <span className="text-white/30">|</span>
        <button
          onClick={() => switchLanguage('de')}
          className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
            currentLocale === 'de'
              ? 'text-white bg-white/10'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
          aria-label="Switch to German"
        >
          DE
        </button>
      </div>
    </div>
  );
}
