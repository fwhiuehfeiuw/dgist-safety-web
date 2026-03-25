'use client';

import { motion } from 'framer-motion';
import { Award, FileText, Target } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { SAFETY_GOAL } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';

export default function SafetyManagement() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <SectionWrapper bgColor="bg-white">
      <SectionTitle>{tr.managementTitle}</SectionTitle>

      {/* 안전보건 목표 배너 */}
      <motion.div
        className="relative mb-10 rounded-2xl overflow-hidden bg-gradient-to-r from-[#002855] via-[#003876] to-[#0066CC] p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

        <div className="relative flex items-center gap-4 justify-center">
          <Target className="w-8 h-8 md:w-10 md:h-10 text-white/80 flex-shrink-0" />
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
            {lang === 'ko' ? SAFETY_GOAL.titleKo : SAFETY_GOAL.titleEn}
          </h3>
        </div>
      </motion.div>

      {/* ISO 45001 + 경영방침 2컬럼 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ISO 45001 인증 */}
        <motion.div
          className="bg-[#F5F5F5] rounded-2xl p-6 border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#003876] to-[#0066CC] flex items-center justify-center shadow-sm">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A]">{tr.isoTitle}</h3>
          </div>
          <p className="text-sm text-[#666666] mb-5">{tr.isoDesc}</p>

          {/* 이미지 플레이스홀더 */}
          <div className="aspect-[4/3] rounded-xl bg-gray-200 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2">
            <Award className="w-12 h-12 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">
              {lang === 'ko' ? 'ISO 45001 인증서' : 'ISO 45001 Certificate'}
            </span>
            <span className="text-xs text-gray-300">
              {lang === 'ko' ? '이미지 준비 중' : 'Image coming soon'}
            </span>
          </div>
        </motion.div>

        {/* 안전보건 경영방침 */}
        <motion.div
          className="bg-[#F5F5F5] rounded-2xl p-6 border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2E8B57] to-[#3CB371] flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A]">{tr.policyTitle}</h3>
          </div>
          <p className="text-sm text-[#666666] mb-5">{tr.policyDesc}</p>

          {/* 이미지 플레이스홀더 */}
          <div className="aspect-[4/3] rounded-xl bg-gray-200 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2">
            <FileText className="w-12 h-12 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">
              {lang === 'ko' ? '안전보건 경영방침' : 'Safety & Health Policy'}
            </span>
            <span className="text-xs text-gray-300">
              {lang === 'ko' ? '이미지 준비 중' : 'Image coming soon'}
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
