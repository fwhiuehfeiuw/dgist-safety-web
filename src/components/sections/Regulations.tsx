'use client';

import { motion } from 'framer-motion';
import { FileText, Shield } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { REGULATIONS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';

export default function Regulations() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  const sections = [
    {
      key: 'safety' as const,
      icon: FileText,
      data: REGULATIONS.safety,
    },
    {
      key: 'security' as const,
      icon: Shield,
      data: REGULATIONS.security,
    },
  ];

  return (
    <SectionWrapper>
      <SectionTitle>{tr.regulationsTitle}</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, sIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.key}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: sIndex * 0.15 }}
            >
              {/* 분야 제목 */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#E8F0FE] flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[#003876]" />
                </div>
                <h3 className="text-lg font-bold text-[#003876]">
                  {lang === 'ko' ? section.data.titleKo : section.data.titleEn}
                </h3>
              </div>

              {/* 규정 목록 */}
              <ul className="space-y-3">
                {section.data.items.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-[#1A1A1A]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: sIndex * 0.15 + index * 0.05 }}
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0066CC] flex-shrink-0" />
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
