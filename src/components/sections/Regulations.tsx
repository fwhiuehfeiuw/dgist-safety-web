'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, ArrowUpRight } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { REGULATIONS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';

const sectionStyles = [
  {
    key: 'safety' as const,
    icon: FileText,
    data: REGULATIONS.safety,
    accent: '#0066CC',
    gradient: 'from-[#003876] to-[#0066CC]',
    cardBg: 'bg-gradient-to-br from-[#E8F0FE]/40 to-white',
    ring: 'ring-blue-100',
  },
  {
    key: 'security' as const,
    icon: Shield,
    data: REGULATIONS.security,
    accent: '#7B68EE',
    gradient: 'from-[#5B4FA0] to-[#7B68EE]',
    cardBg: 'bg-gradient-to-br from-purple-50/60 to-white',
    ring: 'ring-purple-100',
  },
];

export default function Regulations() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <SectionWrapper>
      <SectionTitle>{tr.regulationsTitle}</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionStyles.map((section, sIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.key}
              className={`group relative ${section.cardBg} rounded-2xl p-6 ring-1 ${section.ring} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
              style={{ ['--accent' as never]: section.accent }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: sIndex * 0.15 }}
            >
              {/* 우상단 코너 글로우 */}
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"
                style={{ background: section.accent }}
              />

              {/* 좌측 컬러 바 */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${section.gradient}`} />

              {/* 분야 제목 */}
              <div className="relative flex items-center gap-3 mb-5 pl-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg transition-all duration-300`}>
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {lang === 'ko' ? section.data.titleKo : section.data.titleEn}
                </h3>
                <ArrowUpRight
                  className="ml-auto w-5 h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: section.accent }}
                />
              </div>

              {/* 규정 목록 — 버튼 알약 (클릭 동작은 없음) */}
              <ul className="space-y-2 pl-3 relative">
                {section.data.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: sIndex * 0.15 + index * 0.05 }}
                  >
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
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
