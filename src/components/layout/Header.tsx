'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { NAV_ITEMS } from '@/lib/constants';
import LanguageToggle from './LanguageToggle';
import { Shield, Menu, X } from 'lucide-react';

export default function Header() {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

          {/* 모바일: 햄버거 + 언어 토글 */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-1"
              aria-label="메뉴 열기"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#002855]/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                >
                  {lang === 'ko' ? item.labelKo : item.labelEn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
