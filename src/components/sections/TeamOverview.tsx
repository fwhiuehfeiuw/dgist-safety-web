'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Shield, Heart, Lock, Heart as HeartIcon, MessageCircle, Send, Bookmark, MoreHorizontal, Search, PlusSquare, Film, User, Home } from 'lucide-react';
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
    chip: 'bg-[#E8F0FE] text-[#003876] ring-[#0066CC]/25 hover:bg-[#0066CC] hover:text-white hover:ring-[#0066CC] hover:shadow-md',
  },
  {
    key: 'health' as const,
    accent: '#2E8B57',
    chip: 'bg-emerald-50 text-[#1F6B43] ring-[#2E8B57]/25 hover:bg-[#2E8B57] hover:text-white hover:ring-[#2E8B57] hover:shadow-md',
  },
  {
    key: 'security' as const,
    accent: '#5B4FA0',
    chip: 'bg-purple-50 text-[#3F3870] ring-[#5B4FA0]/25 hover:bg-[#5B4FA0] hover:text-white hover:ring-[#5B4FA0] hover:shadow-md',
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

/* ───────── 회전하는 모니터 ───────── */
const SCREENS = [
  {
    key: 'safety' as const,
    title: '안전관리',
    handle: 'dgist_safety',
    accent: '#0066CC',
    bg: 'from-[#003876] to-[#0066CC]',
    Icon: Shield,
    emoji: '🥼',
    caption: '연구실 안전은 작은 습관에서. 매월 4일은 안전점검의 날',
    tags: ['#연구실안전', '#중대재해ZERO', '#매월4일'],
    bars: [55, 78, 62, 88, 72, 95, 68, 90, 74, 92],
    chartLabel: '점검 완료율',
  },
  {
    key: 'health' as const,
    title: '보건관리',
    handle: 'dgist_health',
    accent: '#2E8B57',
    bg: 'from-[#1F6B43] to-[#2E8B57]',
    Icon: Heart,
    emoji: '🫀',
    caption: '건강한 연구실, 건강한 연구원. 의무실은 언제든 열려 있어요',
    tags: ['#산업보건', '#건강관리실', '#MSDS'],
    bars: [40, 55, 48, 70, 82, 65, 88, 92, 78, 60],
    chartLabel: '건강진단 추이',
  },
  {
    key: 'security' as const,
    title: '보안관리',
    handle: 'dgist_security',
    accent: '#5B4FA0',
    bg: 'from-[#3F3870] to-[#5B4FA0]',
    Icon: Lock,
    emoji: '🔒',
    caption: '안전한 캠퍼스를 위한 24/7 보안. 출입은 정해진 절차로',
    tags: ['#시설보안', '#출입통제', '#비상대비'],
    bars: [85, 90, 88, 92, 86, 94, 89, 91, 87, 93],
    chartLabel: '24/7 모니터링',
  },
];

function RotatingMonitor() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SCREENS.length), 3500);
    return () => clearInterval(id);
  }, []);
  const s = SCREENS[idx];
  const Icon = s.Icon;
  const data = TEAM_OVERVIEW[s.key];
  const items = data.items;

  return (
    <div className="relative w-full flex flex-col items-start lg:-ml-4 xl:-ml-8" style={{ perspective: '1600px' }}>
      <motion.div
        className="relative"
        animate={{ rotateY: [-4, 4, -4], rotateX: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 폰 프레임 */}
        <div
          className="relative rounded-[2.4rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-[6px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
          style={{ width: 248 }}
        >
          {/* 폰 화면 */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white flex flex-col" style={{ aspectRatio: '9/17' }}>
            {/* 다이내믹 아일랜드 */}
            <div className="relative h-7 bg-white flex items-center justify-center">
              <div className="w-20 h-5 rounded-full bg-black" />
              <span className="absolute left-3 top-1.5 text-[10px] font-semibold text-gray-900 tabular-nums">9:41</span>
              <div className="absolute right-3 top-2 flex items-center gap-1">
                <div className="flex items-end gap-px">
                  <span className="w-0.5 h-1 bg-gray-900 rounded-sm" />
                  <span className="w-0.5 h-1.5 bg-gray-900 rounded-sm" />
                  <span className="w-0.5 h-2 bg-gray-900 rounded-sm" />
                  <span className="w-0.5 h-2.5 bg-gray-900 rounded-sm" />
                </div>
                <div className="w-3.5 h-2 rounded-[3px] border border-gray-900 relative">
                  <span className="absolute inset-[1px] right-[2px] bg-gray-900 rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* 인스타그램 상단바 */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100">
              <span
                className="text-[16px] font-bold tracking-tight text-gray-900"
                style={{ fontFamily: 'Pacifico, "Brush Script MT", cursive' }}
              >
                Instagram
              </span>
              <div className="flex items-center gap-3">
                <HeartIcon className="w-4 h-4 text-gray-900" strokeWidth={2} />
                <Send className="w-4 h-4 text-gray-900" strokeWidth={2} />
              </div>
            </div>

            {/* 스토리 스트립 */}
            <div className="flex items-center gap-2.5 px-3 py-2 overflow-hidden">
              {[
                { name: '내 스토리', mine: true, bg: 'from-gray-300 to-gray-400' },
                { name: 'safety', bg: 'from-[#003876] to-[#0066CC]', active: idx === 0 },
                { name: 'health', bg: 'from-[#1F6B43] to-[#2E8B57]', active: idx === 1 },
                { name: 'security', bg: 'from-[#3F3870] to-[#5B4FA0]', active: idx === 2 },
                { name: 'dgist', bg: 'from-orange-400 to-pink-500' },
              ].map((st, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <div
                    className={`w-11 h-11 rounded-full p-[2px] ${
                      st.active
                        ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
                        : st.mine
                        ? 'bg-gray-200'
                        : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-60'
                    }`}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${st.bg} ring-2 ring-white`} />
                  </div>
                  <span className="text-[8px] text-gray-700 truncate w-12 text-center">{st.name}</span>
                </div>
              ))}
            </div>

            {/* 포스트 헤더 */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-t border-gray-100">
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${s.bg} flex items-center justify-center ring-2 ring-white`}
                style={{ boxShadow: `0 0 0 2px ${s.accent}` }}
              >
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] font-bold text-gray-900">{s.handle}</div>
                <div className="text-[8px] text-gray-500">DGIST 안전보안팀</div>
              </div>
              <MoreHorizontal className="ml-auto w-4 h-4 text-gray-600" />
            </div>

            {/* 포스트 이미지 — 콘텐츠가 들어간 비주얼 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${idx}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative bg-gradient-to-br ${s.bg} overflow-hidden`}
                style={{ aspectRatio: '4/5' }}
              >
                {/* 도트 텍스처 */}
                <div
                  className="absolute inset-0 opacity-[0.14] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                  }}
                />
                {/* 글로우 */}
                <motion.div
                  className="absolute -top-12 -right-10 w-44 h-44 rounded-full bg-white/25 blur-3xl"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-black/15 blur-3xl"
                  animate={{ scale: [1.1, 0.95, 1.1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                {/* 상단: 큰 카테고리 라벨 */}
                <div className="relative px-4 pt-4 pb-2 flex items-center justify-between">
                  <div>
                    <div className="text-[8px] font-bold tracking-[0.2em] text-white/70 uppercase">
                      DGIST Team
                    </div>
                    <div className="text-white text-[22px] font-black leading-tight drop-shadow">
                      {s.title}
                    </div>
                  </div>
                  <div className="text-2xl drop-shadow-lg">{s.emoji}</div>
                </div>

                {/* 중앙: 콘텐츠 칩 (실제 항목) */}
                <div className="relative px-4 pt-2 flex flex-wrap gap-1.5">
                  {items.map((item, i) => (
                    <motion.span
                      key={`${idx}-${i}`}
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.12 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-flex items-center px-2 py-1 rounded-full bg-white/95 text-[9px] font-bold tracking-tight shadow-sm"
                      style={{ color: s.accent }}
                    >
                      {item.ko}
                    </motion.span>
                  ))}
                </div>

                {/* 페이지 인디케이터 */}
                <div className="absolute top-3 right-3 px-1.5 py-0.5 rounded-full bg-black/35 backdrop-blur-sm text-[8px] font-bold text-white">
                  {idx + 1}/{SCREENS.length}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 액션 바 */}
            <div className="flex items-center gap-3 px-3 pt-1.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.6 }}
              >
                <HeartIcon className="w-5 h-5 text-red-500" fill="currentColor" />
              </motion.div>
              <MessageCircle className="w-5 h-5 text-gray-800" />
              <Send className="w-5 h-5 text-gray-800" />
              <Bookmark className="ml-auto w-5 h-5 text-gray-800" />
            </div>

            {/* 캡션 */}
            <div className="px-3 pt-1 pb-1.5 flex-1">
              <div className="text-[10px] leading-snug text-gray-800 break-keep">
                <span className="font-bold mr-1">{s.handle}</span>
                {s.caption}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="text-[10px] font-medium" style={{ color: s.accent }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-1 text-[8px] text-gray-400 uppercase tracking-wider">방금 전</div>
            </div>

            {/* 하단 탭바 */}
            <div className="flex items-center justify-around px-2 py-2 border-t border-gray-100 bg-white">
              <Home className="w-4 h-4 text-gray-900" strokeWidth={2.2} />
              <Search className="w-4 h-4 text-gray-500" strokeWidth={2} />
              <PlusSquare className="w-4 h-4 text-gray-500" strokeWidth={2} />
              <Film className="w-4 h-4 text-gray-500" strokeWidth={2} />
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${s.bg} flex items-center justify-center`}>
                <User className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* 홈 인디케이터 */}
            <div className="flex justify-center pb-1.5 pt-0.5">
              <div className="w-20 h-[3px] rounded-full bg-gray-900/80" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 라벨 */}
      <div className="mt-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`lbl-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{ color: s.accent, background: `${s.accent}14` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
            Now Showing — {s.title}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-1.5 mt-3">
        {SCREENS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === idx ? 20 : 6,
              background: i === idx ? SCREENS[idx].accent : '#d1d5db',
            }}
            aria-label={`Show ${SCREENS[i].title}`}
          />
        ))}
      </div>
    </div>
  );
}

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

        {/* 2열: 좌측 칩 그리드 + 우측 회전 모니터 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,300px)] gap-8 items-start">
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-7 rounded-full flex-shrink-0" style={{ background: accent }} />
                    <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                      {lang === 'ko' ? data.titleKo : data.titleEn}
                    </h3>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* 칩 그리드 */}
                  <div className="flex flex-wrap gap-2.5 pl-5">
                    {data.items.map((item, idx) => (
                      <span
                        key={idx}
                        title={lang === 'ko' ? item.descKo : item.descEn}
                        className={`inline-flex items-center px-4 py-2 rounded-full text-[15px] font-semibold ring-1 cursor-default transition-all duration-200 hover:-translate-y-0.5 ${chip}`}
                      >
                        {lang === 'ko' ? item.ko : item.en}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* 우측 회전 모니터 (모바일에선 숨김) — 섹션 헤더 라인까지 끌어올림 */}
          <div className="hidden lg:block lg:-mt-32 lg:self-start">
            <RotatingMonitor />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
