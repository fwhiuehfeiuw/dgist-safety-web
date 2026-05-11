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
            ? 'bg-[#003876] text-white font-bold'
            : 'text-[#1A1A1A]/60 hover:text-[#003876]'
        }`}
      >
        KO
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded transition-colors ${
          lang === 'en'
            ? 'bg-[#003876] text-white font-bold'
            : 'text-[#1A1A1A]/60 hover:text-[#003876]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
