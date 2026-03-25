'use client';

import { motion } from 'framer-motion';
import { Globe, Bot, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { QUICK_LINKS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { translations } from '@/lib/i18n';

// 아이콘 맵핑
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Bot,
  Shield,
};

// 카드별 그라데이션 색상
const cardAccents = [
  'from-[#003876] to-[#0066CC]',
  'from-[#0066CC] to-[#5B9BD5]',
  'from-[#2E8B57] to-[#3CB371]',
];

export default function QuickLinksSection() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <SectionWrapper id="quick-links" bgColor="bg-[#F5F5F5]">
      <SectionTitle>{tr.quickLinksTitle}</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {QUICK_LINKS.map((link, index) => {
          const Icon = iconMap[link.icon];
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(0,56,118,0.12)',
              }}
            >
              {/* 상단 컬러 바 */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cardAccents[index]} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              {/* 아이콘 */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cardAccents[index]} flex items-center justify-center mb-4 shadow-sm`}
              >
                {Icon && <Icon className="w-7 h-7 text-white" />}
              </div>

              {/* 제목 */}
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#003876] transition-colors">
                {lang === 'ko' ? link.titleKo : link.titleEn}
              </h3>

              {/* 설명 */}
              <p className="text-sm text-[#666666] leading-relaxed">
                {lang === 'ko' ? link.descKo : link.descEn}
              </p>

              {/* 화살표 아이콘 */}
              <div className="mt-4 flex items-center text-[#0066CC] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{lang === 'ko' ? '바로가기' : 'Visit'}</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
