'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { ScanLine } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { HERO_CTA } from '@/lib/constants';

const GREETINGS = ['안녕하세요!', 'Hello!'];

function qrUrl(target: string, hex = 'ffffff', dark = '003876'): string {
  return `https://quickchart.io/qr?text=${encodeURIComponent(target)}&dark=${dark}&light=${hex}&size=200&margin=1&ecLevel=H`;
}

export default function HeroSection() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [greetIdx, setGreetIdx] = useState(0);

  // 안녕하세요! ↔ Hello! 번갈아 깜빡
  useEffect(() => {
    const id = setInterval(() => {
      setGreetIdx((i) => (i + 1) % GREETINGS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-br from-[#002855] via-[#003876] to-[#002855] overflow-hidden">
      {/* 배경 장식 원 */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 왼쪽: 텍스트 영역 */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* 슬로건 배지 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-[#2E8B57] rounded-full animate-pulse" />
                {tr.heroSlogan}
              </span>
            </motion.div>

            {/* 부제목 */}
            <p className="text-[#5B9BD5] font-medium text-base md:text-lg mb-3 tracking-wide">
              {tr.heroSubtitle}
            </p>

            {/* 메인 타이틀 — supanova: 큰 디스플레이, tight tracking */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4 break-keep text-balance">
              {tr.heroTitle}
            </h1>

            {/* 설명 */}
            <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line break-keep max-w-xl">
              {tr.heroDesc}
            </p>

            {/* 바로가기 라벨 */}
            <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-2">
              {lang === 'ko' ? '바로가기' : 'Quick Links'}
            </p>

            {/* CTA 버튼 — supanova pill + 원형 아이콘 래퍼 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              {/* 기본 CTA: AI 챗봇 — 강조 스타일 */}
              <motion.a
                href={HERO_CTA.primary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-[#003876] font-semibold text-base pl-7 pr-2 py-2 rounded-full shadow-[0_10px_40px_-10px_rgba(0,102,204,0.6)] transition-all duration-500 ease-spring hover:shadow-[0_15px_50px_-10px_rgba(0,102,204,0.9)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{lang === 'ko' ? HERO_CTA.primary.titleKo : HERO_CTA.primary.titleEn}</span>
                <span className="w-10 h-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-1">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </motion.a>

              {/* 보조 CTA: 안전보안관리시스템 — 텍스트 링크 톤다운 */}
              <motion.a
                href={HERO_CTA.secondary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-white/70 hover:text-white font-medium text-base px-1 py-2 transition-colors self-center"
                whileHover={{ x: 2 }}
              >
                <span className="border-b border-white/30 group-hover:border-white pb-0.5 transition-colors">
                  {lang === 'ko' ? HERO_CTA.secondary.titleKo : HERO_CTA.secondary.titleEn}
                </span>
                <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </div>

            {/* QR 코드 — 모바일 접속 */}
            <motion.div
              className="mt-5 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[
                { url: HERO_CTA.primary.url, titleKo: HERO_CTA.primary.titleKo, titleEn: HERO_CTA.primary.titleEn },
                { url: HERO_CTA.secondary.url, titleKo: HERO_CTA.secondary.titleKo, titleEn: HERO_CTA.secondary.titleEn },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 ring-1 ring-white/15 hover:ring-white/30 rounded-xl pl-1.5 pr-3 py-1.5 transition-all"
                >
                  <div className="w-12 h-12 rounded-md bg-white p-1 flex-shrink-0">
                    <img
                      src={qrUrl(item.url)}
                      alt={`QR — ${item.titleKo}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="inline-flex items-center gap-1 text-[9px] text-white/55 font-bold tracking-[0.18em] uppercase">
                      <ScanLine className="w-2.5 h-2.5" />
                      Scan
                    </div>
                    <div className="text-xs text-white/90 font-medium leading-tight mt-0.5">
                      {lang === 'ko' ? `${item.titleKo} 모바일` : `${item.titleEn} mobile`}
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* DGIST 홈페이지 링크 */}
            <motion.a
              href="https://www.dgist.ac.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mt-4 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              {lang === 'ko' ? 'DGIST 홈페이지' : 'DGIST Homepage'}
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

          {/* 오른쪽: 달구 이미지 — 손 흔들기 애니메이션 (글 쪽으로 살짝 당김) */}
          <motion.div
            className="flex-shrink-0 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 relative md:-ml-20 lg:-ml-32 md:mr-24 lg:mr-40"
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: 'spring',
              stiffness: 100,
              damping: 12,
            }}
          >
            {/* 인사하는 듯 상하 부드러운 바운스 */}
            <motion.div
              className="absolute inset-0"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* 몸이 인사하듯 살짝 좌우로 (발끝 pivot) */}
              <motion.div
                className="absolute inset-0"
                style={{ transformOrigin: '50% 95%' }}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/images/dalgu-lab.png"
                  alt="DGIST mascot Dalgu waving hello"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* 손 흔들기 👋 — 말풍선 바로 아래, 달구 머리 옆 (인사하는 손) */}
            <motion.div
              className="absolute z-10 pointer-events-none select-none"
              style={{
                top: '12%',
                left: '-4%',
                transformOrigin: '70% 85%',
                fontSize: 'clamp(32px, 6vw, 52px)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
              }}
              animate={{
                rotate: [0, -25, 18, -25, 18, -25, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: 'easeInOut',
              }}
            >
              👋
            </motion.div>

            {/* 말풍선 — 달구 머리 좌상단에서 출발 (tail이 우하단 → 달구 방향) */}
            <div className="absolute -top-4 -left-6 md:-top-6 md:-left-10 z-20 bg-white text-[#003876] text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-2xl rounded-br-sm shadow-lg min-w-[100px] text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetIdx}
                  initial={{ opacity: 0, y: 6, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.85 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {GREETINGS[greetIdx]}
                </motion.span>
              </AnimatePresence>
              {/* tail: 우하단 — 달구 쪽을 향함 */}
              <span className="absolute -bottom-1 right-3 w-2.5 h-2.5 bg-white rotate-45 shadow-[2px_2px_4px_rgba(0,0,0,0.06)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
