'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Language } from '@/lib/i18n';

export function useLanguageState() {
  const [lang, setLangState] = useState<Language>('ko');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved === 'ko' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  return { lang, setLang };
}
