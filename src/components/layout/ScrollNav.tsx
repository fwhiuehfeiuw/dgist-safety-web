'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const SECTIONS = [
  { id: 'hero',              labelKo: '소개',     labelEn: 'Intro',    color: '#5BC2E7' },
  { id: 'team-overview',     labelKo: '업무소개', labelEn: 'Team',     color: '#0066CC' },
  { id: 'contact',           labelKo: '연락처',   labelEn: 'Contact',  color: '#2E8B57' },
  { id: 'safety-management', labelKo: '경영체계', labelEn: 'System',   color: '#003876' },
  { id: 'programs',          labelKo: '특화제도', labelEn: 'Programs', color: '#E67E22' },
  { id: 'location',          labelKo: '위치',     labelEn: 'Location', color: '#7B68EE' },
];

export default function ScrollNav() {
  const [active, setActive] = useState('hero');
  const { lang } = useLanguage();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3, rootMargin: '-80px 0px -25% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const activeSec = SECTIONS.find(s => s.id === active) ?? SECTIONS[0];
  const activeIdx = SECTIONS.findIndex(s => s.id === active);

  return (
    <>
      {/* ── 데스크탑 우측 도트 네비 ── */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
        {SECTIONS.map((section) => {
          const isActive = section.id === active;
          return (
            <button
              key={section.id}
              onClick={() =>
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex items-center gap-2 group"
              aria-label={section.labelKo}
            >
              {/* 레이블 — active일 때만 */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.span
                    key={section.id + '-label'}
                    initial={{ opacity: 0, x: 8, scale: 0.88 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.88 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[10px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                      color: section.color,
                      background: `${section.color}18`,
                      border: `1px solid ${section.color}35`,
                      boxShadow: `0 2px 8px ${section.color}20`,
                    }}
                  >
                    {lang === 'ko' ? section.labelKo : section.labelEn}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* 도트 — active 시 pill 모양으로 확장 */}
              <motion.div
                animate={{
                  width: isActive ? 20 : 6,
                  height: 6,
                  backgroundColor: isActive ? section.color : 'rgba(0,0,0,0.18)',
                  boxShadow: isActive ? `0 0 10px ${section.color}70` : 'none',
                }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-full flex-shrink-0"
              />
            </button>
          );
        })}
      </div>

      {/* ── 모바일 하단 중앙 섹션 인디케이터 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none lg:hidden"
        >
          <span
            className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full backdrop-blur-md"
            style={{
              color: activeSec.color,
              background: 'rgba(255,255,255,0.88)',
              border: `1px solid ${activeSec.color}35`,
              boxShadow: `0 4px 14px rgba(0,0,0,0.1), 0 0 0 1px ${activeSec.color}20`,
            }}
          >
            {activeIdx + 1}/{SECTIONS.length}&nbsp;&nbsp;
            {lang === 'ko' ? activeSec.labelKo : activeSec.labelEn}
          </span>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
