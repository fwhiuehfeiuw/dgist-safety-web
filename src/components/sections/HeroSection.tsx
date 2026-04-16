'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage, translations } from '@/lib/i18n';
import { HERO_CTA } from '@/lib/constants';

export default function HeroSection() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#002855] via-[#003876] to-[#002855] overflow-hidden">
      {/* 배경 장식 원 */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
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
            <p className="text-[#5B9BD5] font-medium text-lg mb-2">
              {tr.heroSubtitle}
            </p>

            {/* 메인 타이틀 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {tr.heroTitle}
            </h1>

            {/* 설명 */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-line">
              {tr.heroDesc}
            </p>

            {/* 바로가기 라벨 */}
            <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-3">
              {lang === 'ko' ? '바로가기' : 'Quick Links'}
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              {/* 기본 CTA: AI 챗봇 — 강조 스타일 */}
              <motion.a
                href={HERO_CTA.primary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052a3] text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg shadow-[#0066CC]/30 transition-colors"
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,102,204,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
                {lang === 'ko' ? HERO_CTA.primary.titleKo : HERO_CTA.primary.titleEn}
              </motion.a>

              {/* 보조 CTA: 안전보안관리시스템 — 아웃라인 스타일 */}
              <motion.a
                href={HERO_CTA.secondary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/70 text-white font-medium px-6 py-3.5 rounded-xl transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
                {lang === 'ko' ? HERO_CTA.secondary.titleKo : HERO_CTA.secondary.titleEn}
              </motion.a>
            </div>

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
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          </motion.div>

          {/* 오른쪽: 달구 이미지 */}
          <motion.div
            className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 relative"
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
            <Image
              src="/images/dalgu-lab.png"
              alt="DGIST mascot Dalgu in lab coat"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
