'use client';

import { motion } from 'framer-motion';
import { FileText, Shield } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { REGULATIONS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';

const sectionStyles = [
  {
    key: 'safety' as const,
    icon: FileText,
    data: REGULATIONS.safety,
    gradient: 'from-[#003876] to-[#0066CC]',
    dotColor: 'bg-[#0066CC]',
  },
  {
    key: 'security' as const,
    icon: Shield,
    data: REGULATIONS.security,
    gradient: 'from-[#5B4FA0] to-[#7B68EE]',
    dotColor: 'bg-[#7B68EE]',
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
              className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: sIndex * 0.15 }}
            >
              {/* 좌측 컬러 바 */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${section.gradient}`} />

              {/* 분야 제목 */}
              <div className="flex items-center gap-3 mb-5 pl-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {lang === 'ko' ? section.data.titleKo : section.data.titleEn}
                </h3>
              </div>

              {/* 규정 목록 */}
              <ul className="space-y-3 pl-3">
                {section.data.items.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 text-sm text-[#1A1A1A]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: sIndex * 0.15 + index * 0.05 }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${section.dotColor} flex-shrink-0`} />
                    <span>{lang === 'ko' ? item.ko : item.en}</span>
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
