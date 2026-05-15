'use client';

import { useState, useEffect } from 'react';
import { LanguageContext, type Language } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileFAB from '@/components/layout/MobileFAB';
import ScrollNav from '@/components/layout/ScrollNav';
import HeroSection from '@/components/sections/HeroSection';
import TeamOverview from '@/components/sections/TeamOverview';
import ContactSection from '@/components/sections/ContactSection';
import SafetyManagement from '@/components/sections/SafetyManagement';
import SafetyPrograms from '@/components/sections/SafetyPrograms';
import LocationSection from '@/components/sections/LocationSection';

export default function Home() {
  const [lang, setLangState] = useState<Language>('ko');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved === 'ko' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <Header />
      <main>
        <HeroSection />
        <TeamOverview />
        <ContactSection />
        <SafetyManagement />
        <SafetyPrograms />
        <LocationSection />
      </main>
      <Footer />
      <MobileFAB />
      <ScrollNav />
    </LanguageContext.Provider>
  );
}
