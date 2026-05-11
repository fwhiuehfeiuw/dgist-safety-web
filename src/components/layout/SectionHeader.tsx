'use client';

import { ReactNode } from 'react';
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
 * S4 패턴 — 일러스트 카드 박스 + 좌측 정렬 (eyebrow 칩 + 제목 + 영문 부제)
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
    <div className={`flex items-center gap-5 mb-10 ${className}`}>
      <div
        className={`flex-shrink-0 bg-[#E8F0FE] rounded-2xl p-3 ${
          compact ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-24 md:h-24'
        }`}
      >
        {illustration}
      </div>
      <div className="min-w-0">
        {/* Eyebrow 칩 — 모든 섹션 일관성 */}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F0FE] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
            <span className="text-[#0066CC] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase">
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
        <p className="text-xs md:text-sm text-[#666] mt-1.5 tracking-wide">
          {lang === 'ko' ? titleEn : titleKo}
        </p>
      </div>
    </div>
  );
}
