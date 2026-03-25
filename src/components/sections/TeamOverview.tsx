'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Heart, Lock } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { TEAM_OVERVIEW } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';

// 각 영역별 아이콘 및 색상
const columnConfig = [
  {
    key: 'safety' as const,
    Icon: Shield,
    gradient: 'from-[#003876] to-[#0066CC]',
    badgeBg: 'bg-[#E8F0FE] text-[#003876]',
  },
  {
    key: 'health' as const,
    Icon: Heart,
    gradient: 'from-[#2E8B57] to-[#3CB371]',
    badgeBg: 'bg-green-50 text-[#2E8B57]',
  },
  {
    key: 'security' as const,
    Icon: Lock,
    gradient: 'from-[#5B4FA0] to-[#7B68EE]',
    badgeBg: 'bg-purple-50 text-[#5B4FA0]',
  },
];

// 스태거 애니메이션 설정
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function TeamOverview() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <SectionWrapper id="team-overview" bgColor="bg-[#F5F5F5]">
      <SectionTitle>{tr.teamTitle}</SectionTitle>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {columnConfig.map(({ key, Icon, gradient, badgeBg }) => {
          const data = TEAM_OVERVIEW[key];
          const title = lang === 'ko' ? data.titleKo : data.titleEn;
          const keywords = lang === 'ko' ? data.keywordsKo : data.keywordsEn;

          return (
            <motion.div
              key={key}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              {/* 상단 그라데이션 바 */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
              />

              {/* 아이콘 + 제목 */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">{title}</h3>
              </div>

              {/* 키워드 뱃지 */}
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className={`inline-block text-sm font-medium px-3 py-1.5 rounded-full ${badgeBg}`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* 보안관리 영역에 달구 이미지 */}
              {key === 'security' && (
                <div className="mt-5 flex justify-center">
                  <div className="relative w-24 h-24">
                    <Image
                      src="/images/dalgu-security.png"
                      alt="Dalgu security mascot"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
