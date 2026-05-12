'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Award, FileText, ArrowUpRight } from 'lucide-react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/lib/i18n';
import { REGULATIONS, SAFETY_GOAL } from '@/lib/constants';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeader from '@/components/layout/SectionHeader';

const UndrawSafe = dynamic(
  () => import('react-undraw-illustrations').then((m) => m.UndrawSafe),
  { ssr: false }
);

const UndrawAgreement = dynamic(
  () => import('react-undraw-illustrations').then((m) => m.UndrawAgreement),
  { ssr: false }
);

const regStyles = [
  { key: 'safety' as const, dotColor: 'bg-[#0066CC]' },
  { key: 'security' as const, dotColor: 'bg-[#7B68EE]' },
];

// 이미지가 없을 때를 위한 안전한 폴백
function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="aspect-[3/4] w-full bg-gradient-to-br from-[#E8F0FE] to-[#F5F5F5] flex flex-col items-center justify-center text-[#003876] p-6">
        <Award className="w-12 h-12 mb-3 opacity-60" />
        <p className="text-sm text-center text-[#666]">
          {alt}
          <br />
          <span className="text-xs text-[#999]">(이미지 추후 첨부)</span>
        </p>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1600}
      className="w-full h-auto"
      onError={() => setError(true)}
    />
  );
}

export default function SafetyManagement() {
  const { lang } = useLanguage();

  return (
    <SectionWrapper id="safety-management" bgColor="bg-[#EEF2F7]">
      <div className="max-w-6xl mx-auto bg-[#FAFBFD] rounded-3xl shadow-sm border border-gray-100 px-6 md:px-10 py-5 md:py-7">
      <SectionHeader
        illustration={<UndrawSafe primaryColor="#003876" height="100%" />}
        eyebrow="Management System"
        titleKo="안전보건경영체계"
        titleEn="Safety & Health Management System"
      />

      {/* 2026 안전보건 목표 배너 */}
      <motion.div
        className="max-w-4xl mx-auto mb-12 relative overflow-hidden rounded-2xl"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative bg-gradient-to-br from-[#002855] via-[#003876] to-[#0066CC] px-6 md:px-12 py-5 md:py-7 overflow-hidden">
          {/* 배경 — 도트 그리드 패턴 (모던) */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* 우측 라디얼 글로우 */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#5B9BD5]/30 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            {/* 좌측: 라벨 + 제목 */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B9BD5] animate-pulse" />
                <span className="text-white/85 text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase">
                  {lang === 'ko' ? '올해의 안전보건 목표' : "This Year's Safety & Health Goal"}
                </span>
              </div>
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight break-keep">
                {lang === 'ko' ? (
                  <>중대재해 <span className="text-[#5B9BD5]">ZERO</span> 유지</>
                ) : (
                  <>Maintain <span className="text-[#5B9BD5]">Zero</span> Serious Disasters</>
                )}
              </h3>
              <p className="text-white/60 text-xs md:text-sm mt-2">
                {lang === 'ko' ? '연속 5년 무사고 달성' : 'Five Consecutive Years Accident-Free'}
              </p>
            </div>

            {/* 우측: 거대 0 디스플레이 */}
            <div className="relative flex items-baseline gap-2 flex-shrink-0">
              <span
                className="font-bold leading-none text-white/95 select-none"
                style={{
                  fontSize: 'clamp(80px, 12vw, 140px)',
                  textShadow: '0 8px 30px rgba(91,155,213,0.4)',
                }}
                aria-hidden
              >
                0
              </span>
              <div className="flex flex-col text-left">
                <span className="text-white/90 text-base md:text-lg font-bold tracking-wide">
                  {lang === 'ko' ? '건' : 'cases'}
                </span>
                <span className="text-[#5B9BD5] text-xs md:text-sm font-semibold">
                  Zero Tolerance
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 인증서 + 경영방침 2열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {/* 안전보건경영시스템 인증서 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="group flex flex-col"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#003876] to-[#0066CC] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg transition-all duration-300">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-[#003876]">
              {lang === 'ko' ? '안전보건경영시스템' : 'Safety & Health Management System'}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#0066CC] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:border-[#0066CC] group-hover:shadow-xl flex-1 bg-white transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#0066CC] opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none" />
            <ImageWithFallback
              src={lang === 'ko' ? '/images/iso45001-cert.jpg' : '/images/iso45001-cert-en.jpg'}
              alt={lang === 'ko' ? 'ISO 45001 안전보건경영시스템 인증서' : 'ISO 45001 Certificate'}
            />
          </div>
          <p className="text-xs text-[#666] text-center mt-3">
            KS Q ISO 45001:2018 / ISO 45001:2018
          </p>
        </motion.div>

        {/* 안전보건경영방침 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="group flex flex-col"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066CC] to-[#5B9BD5] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg transition-all duration-300">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-[#003876]">
              {lang === 'ko' ? '안전보건경영방침' : 'Safety & Health Management Policy'}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#5B9BD5] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:border-[#5B9BD5] group-hover:shadow-xl flex-1 bg-white transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#5B9BD5] opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none" />
            <ImageWithFallback
              src="/images/safety-policy.jpg"
              alt={lang === 'ko' ? 'DGIST 안전보건 경영방침' : 'DGIST Safety and Health Management Policy'}
            />
          </div>
          <p className="text-xs text-[#666] text-center mt-3">
            {lang === 'ko' ? '대구경북과학기술원 안전보건 경영방침' : 'DGIST Safety & Health Policy'}
          </p>
        </motion.div>
      </div>

      {/* 소관 규정 — 위 인증서/방침과 너비 맞춤 */}
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          illustration={<UndrawAgreement primaryColor="#003876" height="100%" />}
          titleKo="소관 규정"
          titleEn="Regulations"
          compact
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regStyles.map((section, sIndex) => {
            const data = REGULATIONS[section.key];
            const accent = section.key === 'safety' ? '#0066CC' : '#7B68EE';
            return (
              <motion.div
                key={section.key}
                className="group relative bg-[#EEF2F7] rounded-2xl p-8 ring-1 ring-transparent hover:ring-[color:var(--accent)] hover:shadow-xl hover:bg-[#FAFBFD] overflow-hidden transition-all duration-300"
                style={{ ['--accent' as never]: accent }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: sIndex * 0.1 }}
              >
                {/* 우상단 코너 글로우 */}
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"
                  style={{ background: accent }}
                />

                {/* 헤더 — 사이드 바 + 영문 라벨 + 한글 제목 */}
                <div className="relative flex items-start gap-3 mb-6">
                  <motion.div
                    className="w-1 rounded-full flex-shrink-0 mt-1"
                    style={{ background: accent }}
                    initial={{ height: 40 }}
                    whileHover={{ height: 52 }}
                    animate={{ height: 48 }}
                  />
                  <div>
                    <span
                      className="block text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5"
                      style={{ color: accent }}
                    >
                      {data.titleEn}
                    </span>
                    <h4 className="text-lg font-bold text-[#1A1A1A] leading-tight">
                      {lang === 'ko' ? data.titleKo : data.titleEn}
                    </h4>
                  </div>
                  <ArrowUpRight
                    className="ml-auto w-5 h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    style={{ color: accent }}
                  />
                </div>

                {/* 규정 알약 버튼 (클릭 동작 없음) */}
                <ul className="space-y-2 relative">
                  {data.items.map((item, i) => (
                    <li key={i}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="group/btn relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white ring-1 ring-gray-200 text-[#1A1A1A] text-sm font-semibold shadow-sm overflow-hidden cursor-default transition-colors duration-300 hover:bg-[color:var(--accent)] hover:text-white hover:ring-[color:var(--accent)] hover:shadow-md"
                      >
                        <span className="w-7 h-7 rounded-lg bg-gray-100 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
                          <FileText className="w-3.5 h-3.5 text-[color:var(--accent)] group-hover/btn:text-white transition-colors" />
                        </span>
                        <span className="flex-1 truncate">{lang === 'ko' ? item.ko : item.en}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>
    </SectionWrapper>
  );
}
