'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useLanguage, translations } from '@/lib/i18n';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';

type Category = '교육·훈련' | '점검·모니터링' | '지원·서비스' | '문화·포상';

interface Program {
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  category: Category;
  categoryEn: string;
}

// 출처: DGIST 안전보안팀 블로그 (2026.03.30) — 특화제도 11가지
const PROGRAMS: Program[] = [
  {
    titleKo: '폐시약·폐배터리 처리 지원',
    titleEn: 'Waste Chemical & Battery Disposal',
    descKo: '연구실 방문 수거·처리, 팽창 배터리는 전문 절차로 안전 처리',
    descEn: 'On-site collection of waste chemicals and batteries with safe disposal',
    category: '지원·서비스',
    categoryEn: 'Support · Service',
  },
  {
    titleKo: '안전보호구 착용 불시점검',
    titleEn: 'PPE Spot Inspection',
    descKo: '불시 연구실 방문으로 보호구 착용 여부 확인 및 지도',
    descEn: 'Unannounced lab visits to check PPE compliance',
    category: '점검·모니터링',
    categoryEn: 'Inspection · Monitoring',
  },
  {
    titleKo: '안전체험학습장 운영',
    titleEn: 'Safety Experience Center',
    descKo: '1인 1VR 기반 안전교육 및 심폐소생술 실습 운영',
    descEn: 'Hands-on VR safety training and CPR practice (1:1 VR setup)',
    category: '교육·훈련',
    categoryEn: 'Education · Training',
  },
  {
    titleKo: '사고 실험실 재발방지 특별교육',
    titleEn: 'Post-Incident Special Training',
    descKo: '연구실책임자 주관 맞춤형 특별교육과 재발방지 대책 수립',
    descEn: 'PI-led special training and tailored prevention plans',
    category: '교육·훈련',
    categoryEn: 'Education · Training',
  },
  {
    titleKo: '외국인 대상 연구실 안전교육',
    titleEn: 'Safety Training for International Researchers',
    descKo: '글로벌 코디네이터가 진행하는 외국인 전용 집체교육',
    descEn: 'Dedicated group training led by global coordinators',
    category: '교육·훈련',
    categoryEn: 'Education · Training',
  },
  {
    titleKo: '안전관리 자격증 취득 지원',
    titleEn: 'Safety Certification Support',
    descKo: '국가기술자격(연구실안전관리사·산업안전기사 등) 응시료·교재비 지원',
    descEn: 'Subsidies for national safety certification exam fees and textbooks',
    category: '교육·훈련',
    categoryEn: 'Education · Training',
  },
  {
    titleKo: '안전보호구 및 안전장비 상시 지원',
    titleEn: 'Year-Round PPE & Equipment Support',
    descKo: '마스크·보안경·장갑·흄후드 필름·가스감지기·Spill Kit 연중 지원',
    descEn: 'Continuous supply of PPE and lab safety equipment',
    category: '지원·서비스',
    categoryEn: 'Support · Service',
  },
  {
    titleKo: '실험복 세탁 서비스',
    titleEn: 'Lab Coat Laundry Service',
    descKo: '매주 수거 후 특수세탁하여 배달',
    descEn: 'Weekly pickup, specialized cleaning, and delivery',
    category: '지원·서비스',
    categoryEn: 'Support · Service',
  },
  {
    titleKo: 'AI 안전관리 챗봇',
    titleEn: 'AI Safety Chatbot',
    descKo: 'DGIST 매뉴얼·수칙·사고사례 기반으로 안전 정보를 즉시 답변',
    descEn: 'Instant safety answers grounded in DGIST manuals and case studies',
    category: '지원·서비스',
    categoryEn: 'Support · Service',
  },
  {
    titleKo: '우수연구실 포상',
    titleEn: 'Outstanding Lab Award',
    descKo: '안전관리 우수 연구실 선정 및 포상을 통한 자율 안전문화 확산',
    descEn: 'Recognition program for labs with exemplary safety management',
    category: '문화·포상',
    categoryEn: 'Culture · Award',
  },
  {
    titleKo: '안전·보건·보안 강조주간',
    titleEn: 'Safety · Health · Security Week',
    descKo: '연 1회 5일간 전 구성원 참여 집중 행사 (교육·이벤트·전시)',
    descEn: 'Annual 5-day campus-wide campaign (training, events, exhibitions)',
    category: '문화·포상',
    categoryEn: 'Culture · Award',
  },
];

// 카테고리별 컬러
const catStyles: Record<Category, { chipBg: string; chipText: string; numColor: string }> = {
  '교육·훈련': { chipBg: 'bg-blue-50', chipText: 'text-[#003876]', numColor: '#003876' },
  '점검·모니터링': { chipBg: 'bg-orange-50', chipText: 'text-[#E67E22]', numColor: '#E67E22' },
  '지원·서비스': { chipBg: 'bg-emerald-50', chipText: 'text-[#2E8B57]', numColor: '#2E8B57' },
  '문화·포상': { chipBg: 'bg-purple-50', chipText: 'text-[#5B4FA0]', numColor: '#5B4FA0' },
};

export default function SafetyPrograms() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <SectionWrapper id="programs" bgColor="bg-[#F5F5F5]">
      {/* 단일 컨테이너 — 배너 + 11개 리스트를 한 카드로 묶음 */}
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* 상단: 인트로 배너 (은은한 블루 톤) */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center bg-gradient-to-br from-[#EAF1FB] via-[#F4F8FE] to-[#FAFCFF] p-8 md:p-12 overflow-hidden">
          {/* 부드러운 컬러 글로우 */}
          <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[#5B9BD5]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#003876]/10 blur-3xl pointer-events-none" />

          <motion.div
            className="md:col-span-5 relative w-full max-w-[320px] md:max-w-[440px] mx-auto group cursor-default"
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {/* hover 시 뒤에 드러나는 컬러 글로우 */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#0066CC]/30 via-[#5B9BD5]/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />
            {/* 액자 프레임 */}
            <div className="relative rounded-2xl p-1.5 bg-gradient-to-br from-white to-[#E8F0FE] ring-1 ring-[#003876]/15 group-hover:ring-[#0066CC] shadow-[0_10px_30px_-10px_rgba(0,56,118,0.25)] group-hover:shadow-[0_20px_45px_-12px_rgba(0,56,118,0.4)] transition-all duration-300">
              <Image
                src="/images/safe-dgist-banner.jpg"
                alt={lang === 'ko' ? 'Safe DGIST 안전 가이드' : 'Safe DGIST Safety Guide'}
                width={1696}
                height={2022}
                className="w-full h-auto rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
              />
              {/* 우상단 ↗ 뱃지 */}
              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm ring-1 ring-[#003876]/15 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                <svg className="w-4 h-4 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </div>
          </motion.div>

          <div className="md:col-span-7 text-center md:text-left md:pl-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
              <span className="text-[#0066CC] text-[11px] font-bold tracking-[0.18em] uppercase">
                Prevention Program
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#003876] mb-5 leading-tight">
              {tr.programsTitle}
            </h2>
            <p className="text-sm md:text-base text-[#555] leading-relaxed mb-3">
              {lang === 'ko'
                ? 'DGIST가 자체적으로 운영하는 11가지 사고 예방 프로그램입니다.'
                : 'Eleven DGIST-run programs designed to prevent lab accidents.'}
            </p>
            <p className="text-xs md:text-sm text-[#888] leading-relaxed">
              {lang === 'ko'
                ? '실험실 현장의 목소리에서 출발해 만든 DGIST만의 안전관리 체계.'
                : "Built from real lab-floor needs — DGIST's own safety management system."}
            </p>
          </div>
        </div>

        {/* 연결 구분선 — 점선 + 라벨 */}
        <div className="relative px-6 md:px-12 py-4 flex items-center gap-4">
          <div className="flex-1 border-t border-dashed border-gray-200" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#999]">
            {lang === 'ko' ? '11개 프로그램 자세히 보기' : '11 Programs in Detail'}
          </span>
          <div className="flex-1 border-t border-dashed border-gray-200" />
        </div>

        {/* 하단: 11개 제도 그리드 카드 — 회색 배경에 흰 카드들 */}
        <div className="bg-[#FAFAFA] px-6 md:px-10 py-8 md:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PROGRAMS.map((p, i) => {
              const s = catStyles[p.category];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    boxShadow: [
                      '0 1px 3px rgba(0,0,0,0.05)',
                      `0 0 0 2px ${s.numColor}, 0 12px 32px ${s.numColor}66`,
                      '0 1px 3px rgba(0,0,0,0.05)',
                    ],
                    scale: [1, 1.04, 1],
                  }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    opacity: { duration: 0.35, delay: i * 0.03 },
                    y: { duration: 0.35, delay: i * 0.03 },
                    boxShadow: {
                      duration: 1.1,
                      repeat: Infinity,
                      repeatDelay: 11 * 0.9 - 1.1 + 3,
                      delay: 1 + i * 0.9,
                      ease: 'easeInOut',
                    },
                    scale: {
                      duration: 1.1,
                      repeat: Infinity,
                      repeatDelay: 11 * 0.9 - 1.1 + 3,
                      delay: 1 + i * 0.9,
                      ease: 'easeInOut',
                    },
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ ['--accent' as never]: s.numColor }}
                  className="group relative bg-white rounded-2xl p-4 md:p-5 border border-gray-100 hover:border-[color:var(--accent)] transition-colors duration-300 overflow-hidden cursor-default"
                >
                  {/* 상단 컬러 바 — hover 시 자라남 */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-[width] duration-500"
                    style={{ background: s.numColor }}
                  />
                  {/* 우상단 ↗ */}
                  <span
                    aria-hidden
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${s.numColor}18`, color: s.numColor }}
                  >
                    <svg className="w-3 h-3 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </span>

                  {/* 번호 — 아웃라인 (hover 시 살짝 커짐) */}
                  <div
                    className="text-3xl md:text-4xl font-bold leading-none tabular-nums select-none mb-2.5 transition-transform duration-300 group-hover:scale-110 origin-left"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: `2px ${s.numColor}`,
                    }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* 카테고리 칩 */}
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold tracking-wide ${s.chipBg} ${s.chipText} mb-2`}
                  >
                    {lang === 'ko' ? p.category : p.categoryEn}
                  </span>

                  {/* 제목 */}
                  <h3 className="text-sm md:text-[15px] font-bold text-[#1A1A1A] leading-snug mb-1.5 break-keep">
                    {lang === 'ko' ? p.titleKo : p.titleEn}
                  </h3>

                  {/* 설명 */}
                  <p className="text-[11px] md:text-xs text-[#666] leading-relaxed break-keep">
                    {lang === 'ko' ? p.descKo : p.descEn}
                  </p>
                </motion.div>
              );
            })}

            {/* 12번째 칸 — 강조주간 영상 CTA (포스터 카드) */}
            <motion.a
              href="https://www.youtube.com/watch?v=VMgSbDtpKg4"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: 11 * 0.03 }}
              whileHover={{ y: -3 }}
              className="group relative bg-gradient-to-br from-[#003876] via-[#0066CC] to-[#5B9BD5] rounded-2xl p-4 md:p-5 border border-[#003876]/20 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              {/* 배경 데코 */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/[0.08] blur-2xl pointer-events-none" />

              {/* 상단: 라벨 */}
              <span className="relative inline-flex items-center px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold tracking-wide bg-white/15 text-white/90 backdrop-blur-sm self-start mb-2 ring-1 ring-white/20">
                {lang === 'ko' ? '관련 영상' : 'Related Video'}
              </span>

              {/* 중앙: 큰 재생 아이콘 */}
              <div className="relative flex-1 flex items-center justify-center my-3">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/15 backdrop-blur-sm ring-2 ring-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all">
                  <PlayIcon className="w-8 h-8 md:w-10 md:h-10 text-white translate-x-0.5" />
                  {/* 펄스 링 */}
                  <span className="absolute inset-0 rounded-full ring-2 ring-white/50 animate-ping opacity-30" />
                </div>
              </div>

              {/* 하단: 텍스트 + 화살표 */}
              <div className="relative">
                <h3 className="text-sm md:text-[15px] font-bold text-white leading-snug mb-1 break-keep">
                  {lang === 'ko' ? '강조주간 영상' : 'Emphasis Week Video'}
                </h3>
                <p className="text-[11px] md:text-xs text-white/75 leading-relaxed mb-2">
                  {lang === 'ko' ? '안전·보건·보안 캠페인' : 'Safety · Health · Security Campaign'}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-white/90 group-hover:text-white">
                  {lang === 'ko' ? '바로 보기' : 'Watch now'}
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* 출처 */}
      <p className="text-center mt-8 text-xs text-[#999]">
        {lang === 'ko' ? '※ 자세한 내용은 ' : '※ Details on '}
        <a
          href="https://blog.naver.com/dgist_safety/224234479316"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0066CC] hover:underline"
        >
          {lang === 'ko' ? 'DGIST 안전보안팀 블로그' : 'DGIST Safety Blog'}
        </a>
        {lang === 'ko' ? '에서 확인하실 수 있습니다.' : '.'}
      </p>
    </SectionWrapper>
  );
}
