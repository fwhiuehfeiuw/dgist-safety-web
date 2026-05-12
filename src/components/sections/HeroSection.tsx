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
    <section className="relative w-full bg-gradient-to-b from-[#2570E0] to-[#0A4FAC] overflow-hidden">
      {/* 배경 장식 원 */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      {/* 별빛 파티클 — 미세한 흰 점들 (풍부하게) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 절차적 별 — 9x14 그리드, 각 셀에 jitter */}
        {Array.from({ length: 14 * 9 }).map((_, i) => {
          const row = Math.floor(i / 14);
          const col = i % 14;
          const jx = ((i * 37) % 100) / 100 - 0.5;
          const jy = ((i * 53) % 100) / 100 - 0.5;
          const sizes = [2, 2, 3, 3, 4, 4, 5];
          const opacities = [0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1];
          const size = sizes[i % sizes.length];
          const opacity = opacities[(i * 7) % opacities.length];
          return (
            <span
              key={`g-${i}`}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: `${row * (100 / 9) + jy * 6 + 2}%`,
                left: `${col * (100 / 14) + jx * 5 + 1}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDuration: `${2 + (i % 5)}s`,
                animationDelay: `${(i % 8) * 0.25}s`,
                boxShadow: `0 0 ${size * 3}px rgba(255,255,255,${opacity}), 0 0 ${size * 6}px rgba(255,255,255,${opacity * 0.5})`,
              }}
            />
          );
        })}
        {/* 강조 별 (큰 크로스 모양) — 5개 */}
        {[
          { top: '15%', left: '20%' },
          { top: '28%', left: '78%' },
          { top: '55%', left: '12%' },
          { top: '70%', left: '88%' },
          { top: '42%', left: '50%' },
        ].map((s, i) => (
          <span
            key={`star-${i}`}
            className="absolute animate-pulse"
            style={{
              top: s.top,
              left: s.left,
              width: 16,
              height: 16,
              animationDuration: `${3 + i}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
              <path d="M12 2 L13 11 L22 12 L13 13 L12 22 L11 13 L2 12 L11 11 Z" />
            </svg>
          </span>
        ))}
        {[
          // 상단
          { top: '4%', left: '6%', size: 2, opacity: 0.7 },
          { top: '8%', left: '14%', size: 1, opacity: 0.5 },
          { top: '6%', left: '22%', size: 1, opacity: 0.4 },
          { top: '11%', left: '30%', size: 2, opacity: 0.6 },
          { top: '5%', left: '38%', size: 1, opacity: 0.5 },
          { top: '14%', left: '44%', size: 1, opacity: 0.4 },
          { top: '7%', left: '52%', size: 2, opacity: 0.7 },
          { top: '12%', left: '60%', size: 1, opacity: 0.5 },
          { top: '4%', left: '68%', size: 2, opacity: 0.6 },
          { top: '9%', left: '76%', size: 3, opacity: 0.8 },
          { top: '13%', left: '84%', size: 1, opacity: 0.4 },
          { top: '6%', left: '92%', size: 2, opacity: 0.6 },
          // 상중
          { top: '18%', left: '10%', size: 3, opacity: 0.7 },
          { top: '22%', left: '18%', size: 1, opacity: 0.5 },
          { top: '20%', left: '26%', size: 1, opacity: 0.4 },
          { top: '25%', left: '34%', size: 2, opacity: 0.6 },
          { top: '19%', left: '42%', size: 1, opacity: 0.3 },
          { top: '24%', left: '50%', size: 1, opacity: 0.5 },
          { top: '21%', left: '58%', size: 2, opacity: 0.6 },
          { top: '26%', left: '66%', size: 1, opacity: 0.4 },
          { top: '17%', left: '74%', size: 2, opacity: 0.7 },
          { top: '23%', left: '82%', size: 1, opacity: 0.5 },
          { top: '20%', left: '90%', size: 1, opacity: 0.4 },
          // 중단
          { top: '32%', left: '5%', size: 1, opacity: 0.5 },
          { top: '36%', left: '13%', size: 2, opacity: 0.6 },
          { top: '34%', left: '21%', size: 1, opacity: 0.4 },
          { top: '38%', left: '28%', size: 1, opacity: 0.3 },
          { top: '33%', left: '36%', size: 2, opacity: 0.5 },
          { top: '40%', left: '44%', size: 1, opacity: 0.4 },
          { top: '37%', left: '52%', size: 1, opacity: 0.5 },
          { top: '35%', left: '60%', size: 2, opacity: 0.6 },
          { top: '39%', left: '68%', size: 1, opacity: 0.4 },
          { top: '33%', left: '76%', size: 3, opacity: 0.7 },
          { top: '41%', left: '84%', size: 1, opacity: 0.5 },
          { top: '36%', left: '92%', size: 2, opacity: 0.6 },
          // 중하
          { top: '48%', left: '8%', size: 2, opacity: 0.6 },
          { top: '52%', left: '16%', size: 1, opacity: 0.4 },
          { top: '50%', left: '24%', size: 1, opacity: 0.5 },
          { top: '55%', left: '32%', size: 2, opacity: 0.6 },
          { top: '49%', left: '40%', size: 1, opacity: 0.3 },
          { top: '53%', left: '48%', size: 1, opacity: 0.4 },
          { top: '51%', left: '56%', size: 2, opacity: 0.5 },
          { top: '57%', left: '64%', size: 1, opacity: 0.4 },
          { top: '50%', left: '72%', size: 3, opacity: 0.6 },
          { top: '54%', left: '80%', size: 1, opacity: 0.5 },
          { top: '49%', left: '88%', size: 2, opacity: 0.6 },
          // 하단
          { top: '63%', left: '4%', size: 1, opacity: 0.5 },
          { top: '67%', left: '12%', size: 2, opacity: 0.6 },
          { top: '65%', left: '20%', size: 1, opacity: 0.4 },
          { top: '70%', left: '28%', size: 1, opacity: 0.3 },
          { top: '66%', left: '36%', size: 2, opacity: 0.5 },
          { top: '72%', left: '44%', size: 1, opacity: 0.4 },
          { top: '68%', left: '52%', size: 1, opacity: 0.5 },
          { top: '65%', left: '60%', size: 2, opacity: 0.6 },
          { top: '71%', left: '68%', size: 1, opacity: 0.4 },
          { top: '64%', left: '76%', size: 1, opacity: 0.5 },
          { top: '69%', left: '84%', size: 2, opacity: 0.6 },
          { top: '66%', left: '92%', size: 1, opacity: 0.4 },
          // 최하단
          { top: '80%', left: '8%', size: 2, opacity: 0.6 },
          { top: '85%', left: '18%', size: 1, opacity: 0.4 },
          { top: '82%', left: '26%', size: 1, opacity: 0.5 },
          { top: '88%', left: '36%', size: 2, opacity: 0.5 },
          { top: '83%', left: '46%', size: 1, opacity: 0.4 },
          { top: '90%', left: '54%', size: 1, opacity: 0.5 },
          { top: '86%', left: '62%', size: 2, opacity: 0.6 },
          { top: '92%', left: '70%', size: 1, opacity: 0.4 },
          { top: '81%', left: '80%', size: 3, opacity: 0.7 },
          { top: '88%', left: '88%', size: 1, opacity: 0.5 },
          { top: '84%', left: '96%', size: 2, opacity: 0.6 },
          // 미세한 점들 (작은 사이즈, 낮은 opacity)
          { top: '2%', left: '50%', size: 1, opacity: 0.3 },
          { top: '15%', left: '64%', size: 1, opacity: 0.3 },
          { top: '28%', left: '12%', size: 1, opacity: 0.3 },
          { top: '42%', left: '78%', size: 1, opacity: 0.3 },
          { top: '58%', left: '40%', size: 1, opacity: 0.3 },
          { top: '74%', left: '56%', size: 1, opacity: 0.3 },
          { top: '94%', left: '24%', size: 1, opacity: 0.3 },
          { top: '94%', left: '78%', size: 1, opacity: 0.3 },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i % 5) * 0.3}s`,
              boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,${s.opacity * 0.6})`,
            }}
          />
        ))}
      </div>

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
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-full shadow-md">
                <span className="text-base md:text-lg leading-none" aria-hidden>📌</span>
                {tr.heroSlogan}
              </span>
            </motion.div>

            {/* 메인 타이틀 — supanova: 큰 디스플레이, tight tracking */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4 break-keep text-balance">
              {tr.heroTitle}
            </h1>

            {/* 설명 */}
            <p className="text-white text-sm md:text-base font-medium leading-relaxed mb-6 whitespace-pre-line break-keep max-w-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              {tr.heroDesc}
            </p>

            {/* 바로가기 라벨 */}
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
              {lang === 'ko' ? '바로가기' : 'Quick Links'}
            </p>

            {/* CTA 버튼 — supanova pill + 원형 아이콘 래퍼 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              {/* 기본 CTA: AI 챗봇 — 강조 스타일 */}
              <motion.a
                href={HERO_CTA.primary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-[#003876] font-extrabold text-lg md:text-xl pl-7 pr-2 py-2.5 rounded-full shadow-[0_10px_40px_-10px_rgba(0,102,204,0.6)] tracking-tight transition-all duration-500 ease-spring hover:shadow-[0_15px_50px_-10px_rgba(0,102,204,0.9)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{lang === 'ko' ? HERO_CTA.primary.titleKo : HERO_CTA.primary.titleEn}</span>
                <span className="w-10 h-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-1">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </motion.a>

              {/* 보조 CTA: 안전보안관리시스템 — ghost pill 버튼 */}
              <motion.a
                href={HERO_CTA.secondary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 ring-1 ring-white/40 hover:ring-white/70 backdrop-blur-sm text-white font-bold text-base md:text-lg px-5 py-2.5 rounded-full transition-all self-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{lang === 'ko' ? HERO_CTA.secondary.titleKo : HERO_CTA.secondary.titleEn}</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
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
                  className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 ring-1 ring-white/25 hover:ring-white/50 rounded-xl pl-2 pr-3.5 py-2 transition-all backdrop-blur-sm"
                >
                  {/* QR 프레임 — 그라데이션 링 + 코너 마커 */}
                  <div className="relative flex-shrink-0">
                    {/* 외곽 그라데이션 글로우 링 */}
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-[#FFE066] via-[#5B9BD5] to-[#FFE066] opacity-80 blur-[1px]" />
                    <div className="relative w-14 h-14 rounded-lg bg-white p-1.5 shadow-[0_6px_20px_rgba(255,224,102,0.35),0_0_30px_rgba(91,155,213,0.25)]">
                      <img
                        src={qrUrl(item.url)}
                        alt={`QR — ${item.titleKo}`}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain"
                      />
                      {/* ㄱ자 코너 마커 — 노란색 (ZERO 액센트와 통일) */}
                      <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 rounded-tl border-[#0066CC]" />
                      <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 rounded-tr border-[#0066CC]" />
                      <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 rounded-bl border-[#0066CC]" />
                      <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 rounded-br border-[#0066CC]" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="inline-flex items-center gap-1 text-[11px] text-white font-bold tracking-[0.18em] uppercase">
                      <ScanLine className="w-3.5 h-3.5" />
                      Scan
                    </div>
                    <div className="text-sm text-white font-semibold leading-tight mt-1">
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
              className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 ring-1 ring-white/40 hover:ring-white/70 backdrop-blur-sm text-white text-base md:text-lg font-bold px-5 py-2.5 rounded-full mt-4 transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              {lang === 'ko' ? 'DGIST 홈페이지' : 'DGIST Homepage'}
              <ArrowTopRightOnSquareIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
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
