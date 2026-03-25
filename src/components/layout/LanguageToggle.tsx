'use client';

import { useLanguage } from '@/lib/i18n';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => setLang('ko')}
        className={`px-2 py-1 rounded transition-colors ${
          lang === 'ko'
            ? 'bg-white text-[#003876] font-bold'
            : 'text-white/70 hover:text-white'
        }`}
      >
        KO
      </button>
      <span className="text-white/40">|</span>
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded transition-colors ${
          lang === 'en'
            ? 'bg-white text-[#003876] font-bold'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
