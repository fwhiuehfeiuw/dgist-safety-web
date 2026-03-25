'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { NAV_ITEMS } from '@/lib/constants';
import LanguageToggle from './LanguageToggle';
import { Shield } from 'lucide-react';

export default function Header() {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#002855]/95 backdrop-blur-md shadow-lg'
          : 'bg-[#002855]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-white font-bold text-lg"
          >
            <Shield className="w-6 h-6" />
            <span className="hidden sm:inline">
              {lang === 'ko' ? 'DGIST 안전보안팀' : 'DGIST Safety'}
            </span>
          </button>

          {/* 데스크탑 네비 */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {lang === 'ko' ? item.labelKo : item.labelEn}
              </button>
            ))}
            <LanguageToggle />
          </nav>

          {/* 모바일: 언어 토글만 */}
          <div className="md:hidden">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
