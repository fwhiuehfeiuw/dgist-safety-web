'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FileText, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { REGULATIONS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';

const regStyles = [
  { key: 'safety' as const, icon: FileText, gradient: 'from-[#003876] to-[#0066CC]', dotColor: 'bg-[#0066CC]' },
  { key: 'security' as const, icon: Shield, gradient: 'from-[#5B4FA0] to-[#7B68EE]', dotColor: 'bg-[#7B68EE]' },
];

export default function SafetyManagement() {
  const { lang } = useLanguage();

  return (
    <SectionWrapper bgColor="bg-white">
      <SectionTitle>{lang === 'ko' ? '안전보건경영방침' : 'Safety & Health Management Policy'}</SectionTitle>

      {/* 경영방침 이미지 */}
      <motion.div
        className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/images/safety-policy.jpg"
          alt={lang === 'ko' ? 'DGIST 안전보건 경영방침' : 'DGIST Safety and Health Management Policy'}
          width={1200}
          height={1600}
          className="w-full h-auto"
        />
      </motion.div>

      {/* 소관 규정 */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-lg font-bold text-[#003876] text-center mb-6">
          {lang === 'ko' ? '소관 규정' : 'Regulations'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {regStyles.map((section, sIndex) => {
            const Icon = section.icon;
            const data = REGULATIONS[section.key];
            return (
              <motion.div
                key={section.key}
                className="relative bg-[#F5F5F5] rounded-xl p-5 overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: sIndex * 0.1 }}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${section.gradient}`} />

                <div className="flex items-center gap-2.5 mb-4 pl-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">
                    {lang === 'ko' ? data.titleKo : data.titleEn}
                  </span>
                </div>

                <ul className="space-y-2 pl-3">
                  {data.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#333]">
                      <span className={`w-1.5 h-1.5 rounded-full ${section.dotColor} flex-shrink-0`} />
                      {lang === 'ko' ? item.ko : item.en}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
