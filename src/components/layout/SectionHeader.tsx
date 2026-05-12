'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface SectionHeaderProps {
  illustration: ReactNode;
  titleKo: string;
  titleEn: string;
  /** 작은 영문 라벨 칩 (예: "Our Team", "Get in Touch"). 미지정 시 칩 숨김 */
  eyebrow?: string;
  className?: string;
  compact?: boolean;
}

/**
 * S4 패턴 — 일러스트 + 좌측 정렬 (eyebrow 칩 + 제목 + 영문 부제)
 * 전체가 hover 시 버튼처럼 반응
 */
export default function SectionHeader({
  illustration,
  titleKo,
  titleEn,
  eyebrow,
  className = '',
  compact = false,
}: SectionHeaderProps) {
  const { lang } = useLanguage();
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group relative flex items-center gap-5 mb-6 -mx-3 -my-2 px-3 py-2 rounded-2xl ring-1 ring-transparent hover:ring-[#003876]/15 hover:bg-gradient-to-r hover:from-[#F4F8FE] hover:to-white hover:shadow-[0_10px_30px_-12px_rgba(0,56,118,0.25)] transition-all duration-300 cursor-default ${className}`}
    >
      {/* 일러스트 박스 */}
      <div
        className={`flex-shrink-0 bg-[#E8F0FE] rounded-2xl p-3 ring-1 ring-transparent group-hover:bg-white group-hover:ring-[#003876]/15 group-hover:shadow-md group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300 ${
          compact ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-24 md:h-24'
        }`}
      >
        {illustration}
      </div>

      <div className="min-w-0 flex-1">
        {/* Eyebrow 칩 — hover 시 컬러 반전 */}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F0FE] group-hover:bg-[#0066CC] mb-2 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC] group-hover:bg-white transition-colors duration-300" />
            <span className="text-[#0066CC] group-hover:text-white text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-300">
              {eyebrow}
            </span>
          </div>
        )}
        <h2
          className={`font-bold text-[#003876] leading-tight break-keep ${
            compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'
          }`}
        >
          {lang === 'ko' ? titleKo : titleEn}
        </h2>
        {lang === 'ko' && (
          <p className="text-xs md:text-sm text-[#666] mt-1.5 tracking-wide">
            {titleEn}
          </p>
        )}
      </div>

      {/* 우측 ↗ — hover 시 등장 */}
      <span
        aria-hidden
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white ring-1 ring-[#003876]/15 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm"
      >
        <ArrowUpRight className="w-4 h-4 text-[#0066CC] group-hover:rotate-12 transition-transform duration-300" />
      </span>
    </motion.div>
  );
}
