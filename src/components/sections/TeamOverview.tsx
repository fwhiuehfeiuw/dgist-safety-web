'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n';
import { TEAM_OVERVIEW } from '@/lib/constants';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeader from '@/components/layout/SectionHeader';

const UndrawTeamSpirit = dynamic(
  () => import('react-undraw-illustrations').then((m) => m.UndrawTeamSpirit),
  { ssr: false }
);

const columnConfig = [
  {
    key: 'safety' as const,
    accent: '#0066CC',
    chip: 'bg-blue-50 text-[#003876] ring-blue-100 hover:bg-[#E8F0FE]',
  },
  {
    key: 'health' as const,
    accent: '#2E8B57',
    chip: 'bg-emerald-50 text-[#2E8B57] ring-emerald-100 hover:bg-emerald-100',
  },
  {
    key: 'security' as const,
    accent: '#5B4FA0',
    chip: 'bg-purple-50 text-[#5B4FA0] ring-purple-100 hover:bg-purple-100',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TeamOverview() {
  const { lang } = useLanguage();

  return (
    <SectionWrapper id="team-overview" bgColor="bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 px-6 md:px-10 py-8 md:py-10">
        <SectionHeader
          illustration={<UndrawTeamSpirit primaryColor="#003876" height="100%" />}
          eyebrow="Our Team"
          titleKo="부서 업무 소개"
          titleEn="About Our Team"
        />

        <motion.div
          className="space-y-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {columnConfig.map(({ key, accent, chip }) => {
            const data = TEAM_OVERVIEW[key];
            return (
              <motion.div key={key} variants={itemVariants}>
                {/* 분야 헤더 */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: accent }} />
                  <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">
                    {lang === 'ko' ? data.titleKo : data.titleEn}
                  </h3>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* 칩 그리드 */}
                <div className="flex flex-wrap gap-2 pl-4">
                  {data.items.map((item, idx) => (
                    <span
                      key={idx}
                      title={lang === 'ko' ? item.descKo : item.descEn}
                      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium ring-1 cursor-default transition-all hover:-translate-y-0.5 ${chip}`}
                    >
                      {lang === 'ko' ? item.ko : item.en}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
