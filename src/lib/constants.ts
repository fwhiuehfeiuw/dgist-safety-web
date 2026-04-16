// 정적 데이터 — 거의 변경되지 않는 항목들

export const QUICK_LINKS = [
  {
    id: 'homepage',
    titleKo: 'DGIST 홈페이지',
    titleEn: 'DGIST Homepage',
    descKo: '대구경북과학기술원 공식 홈페이지',
    descEn: 'Official DGIST Website',
    url: 'https://www.dgist.ac.kr',
    icon: 'Globe',
  },
  {
    id: 'chatbot',
    titleKo: 'AI 안전관리 챗봇',
    titleEn: 'AI Safety Chatbot',
    descKo: 'NotebookLM 기반 안전 상담',
    descEn: 'NotebookLM-based safety consultation',
    url: 'https://notebooklm.google.com/notebook/7deebde8-d58d-434e-b56e-1bdb8eb1d7b0',
    icon: 'Bot',
  },
  {
    id: 'system',
    titleKo: '안전보안관리시스템',
    titleEn: 'Safety Management System',
    descKo: '안전보안관리시스템 바로가기',
    descEn: 'Safety & Security Management System',
    url: 'https://safety.dgist.ac.kr/gshm/main/home.do',
    icon: 'Shield',
  },
] as const;

export const HERO_CTA = {
  primary: {
    titleKo: 'AI 안전관리 챗봇',
    titleEn: 'AI Safety Chatbot',
    url: 'https://notebooklm.google.com/notebook/7deebde8-d58d-434e-b56e-1bdb8eb1d7b0',
  },
  secondary: {
    titleKo: '안전보안관리시스템',
    titleEn: 'Safety Management System',
    url: 'https://safety.dgist.ac.kr/gshm/main/home.do',
  },
} as const;

export const TEAM_OVERVIEW = {
  safety: {
    titleKo: '안전관리',
    titleEn: 'Safety Management',
    keywordsKo: ['연구실안전', '산업안전', '중대재해', '재난관리', '방사선안전'],
    keywordsEn: ['Lab Safety', 'Industrial Safety', 'Serious Disasters', 'Disaster Management', 'Radiation Safety'],
  },
  health: {
    titleKo: '보건관리',
    titleEn: 'Health Management',
    keywordsKo: ['산업보건', '건강관리실'],
    keywordsEn: ['Industrial Health', 'Health Center'],
  },
  security: {
    titleKo: '보안관리',
    titleEn: 'Security Management',
    keywordsKo: ['비상대비', '일반보안', '시설보안'],
    keywordsEn: ['Emergency Preparedness', 'General Security', 'Facility Security'],
  },
} as const;

export const SAFETY_GOAL = {
  year: 2026,
  titleKo: '2026 안전보건 목표: 중대재해 제로 유지',
  titleEn: '2026 Safety & Health Goal: Maintain Zero Serious Disasters',
} as const;

export const REGULATIONS = {
  safety: {
    titleKo: '안전 분야',
    titleEn: 'Safety',
    items: [
      { ko: '안전보건관리규정', en: 'Safety & Health Management Regulation' },
      { ko: '방사선안전관리규정', en: 'Radiation Safety Management Regulation' },
      { ko: '연구실안전관리지침', en: 'Laboratory Safety Management Guidelines' },
    ],
  },
  security: {
    titleKo: '보안 분야',
    titleEn: 'Security',
    items: [
      { ko: '보안업무규정', en: 'Security Operations Regulation' },
      { ko: '방첩업무지침', en: 'Counterintelligence Operations Guidelines' },
      { ko: 'CCTV설치운영지침', en: 'CCTV Installation & Operation Guidelines' },
      { ko: '출입통제관리지침', en: 'Access Control Management Guidelines' },
    ],
  },
} as const;

export const LOCATION = {
  addressKo: '대구광역시 달성군 현풍읍 테크노중앙대로 333 DGIST E1 7층 704호',
  addressEn: '704, 7F, E1, 333 Techno Jungang-daero, Hyeonpung-eup, Dalseong-gun, Daegu, Korea',
  phone: '053-785-1263',
  mapEmbedUrl: 'https://maps.google.com/maps?q=DGIST+%EB%8C%80%EA%B5%AC%EA%B2%BD%EB%B6%81%EA%B3%BC%ED%95%99%EA%B8%B0%EC%88%A0%EC%9B%90&t=&z=15&ie=UTF8&iwloc=&output=embed',
} as const;

export const EXTERNAL_LINKS = {
  labsSafety: {
    titleKo: '안전이슈 · 사고사례 바로가기',
    titleEn: 'Safety Issues & Accident Cases',
    url: 'https://labs.go.kr/',
  },
  dgistNews: {
    titleKo: 'DGIST 보도자료',
    titleEn: 'DGIST Press Releases',
    url: 'https://www.dgist.ac.kr/prog/bbsArticle/BBSMSTR_000000000080/list.do',
  },
} as const;

export const NAV_ITEMS = [
  { id: 'safety-info', labelKo: '안전정보', labelEn: 'Safety Info' },
  { id: 'team-overview', labelKo: '업무·연락처', labelEn: 'Team & Contact' },
  { id: 'programs', labelKo: '제도', labelEn: 'Programs' },
  { id: 'location', labelKo: '오시는 길', labelEn: 'Location' },
] as const;
