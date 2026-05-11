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
    items: [
      {
        ko: '연구실안전',
        en: 'Laboratory Safety',
        descKo: '연구실안전법 기반 안전관리, 정기·일상점검, 안전교육',
        descEn: 'Lab safety management, periodic inspections, safety education',
      },
      {
        ko: '산업안전',
        en: 'Industrial Safety',
        descKo: '산업안전보건법 이행, 위험성평가, 작업장 안전',
        descEn: 'Industrial Safety Act compliance, risk assessment, workplace safety',
      },
      {
        ko: '중대재해 예방',
        en: 'Serious Disaster Prevention',
        descKo: '중대재해처벌법 대응, 안전보건확보의무 이행',
        descEn: 'Serious Disaster Punishment Act response, safety obligation fulfillment',
      },
      {
        ko: '재난관리',
        en: 'Disaster Management',
        descKo: '비상대응체계, 재난대비 훈련, 재난안전 인프라',
        descEn: 'Emergency response system, disaster drills, safety infrastructure',
      },
      {
        ko: '방사선안전',
        en: 'Radiation Safety',
        descKo: '방사선/방사성동위원소 사용시설 안전관리, 인허가',
        descEn: 'Radiation facility safety management, licensing',
      },
    ],
  },
  health: {
    titleKo: '보건관리',
    titleEn: 'Health Management',
    items: [
      {
        ko: '산업보건',
        en: 'Industrial Health',
        descKo: '근로자 건강진단, 작업환경측정, MSDS 관리',
        descEn: 'Worker health checkups, work environment monitoring, MSDS',
      },
      {
        ko: '건강관리실',
        en: 'Health Center',
        descKo: '교내 의무실 운영, 응급처치, 건강상담',
        descEn: 'On-campus clinic, first aid, health consultation',
      },
    ],
  },
  security: {
    titleKo: '보안관리',
    titleEn: 'Security Management',
    items: [
      {
        ko: '비상대비',
        en: 'Emergency Preparedness',
        descKo: '국가 비상대비 업무, 민방위·예비군 행정',
        descEn: 'National emergency preparedness, civil defense administration',
      },
      {
        ko: '일반보안',
        en: 'General Security',
        descKo: '문서·정보보안, 보안서약, 보안감사',
        descEn: 'Document & information security, security pledges, audits',
      },
      {
        ko: '시설보안',
        en: 'Facility Security',
        descKo: 'CCTV, 출입통제, 시설보호구역 관리',
        descEn: 'CCTV, access control, protected facility zones',
      },
    ],
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
  phone: '053-785-1260',
  // DGIST E1 대학본부 정확히 핀: 검색 쿼리로 마커 표시
  mapEmbedUrl: 'https://maps.google.com/maps?q=DGIST+E1+%EB%8C%80%ED%95%99%EB%B3%B8%EB%B6%80+%ED%98%84%ED%92%8D&t=&z=17&ie=UTF8&iwloc=B&output=embed',
} as const;

// 연락처 정적 fallback (Supabase 비어있을 때 사용 — seed.sql 값과 동일)
export const CONTACTS_FALLBACK = [
  { id: 's1', field_ko: '안전경영·산업안전', field_en: 'Safety Mgmt · Industrial Safety', phone: '053-785-1263', email: 'mark630@dgist.ac.kr', sort_order: 1 },
  { id: 's2', field_ko: '연구실안전', field_en: 'Laboratory Safety', phone: '053-785-1261, 1268', email: 'woogie@dgist.ac.kr', sort_order: 2 },
  { id: 's3', field_ko: '방사선안전', field_en: 'Radiation Safety', phone: '053-785-1267', email: 'wkjin@dgist.ac.kr', sort_order: 3 },
  { id: 's4', field_ko: '중대재해 · 재난관리', field_en: 'Serious Disaster · Disaster Mgmt', phone: '053-785-1266', email: 'domingo@dgist.ac.kr', sort_order: 4 },
  { id: 's5', field_ko: '산업보건 (건강관리실)', field_en: 'Industrial Health (Health Center)', phone: '053-785-0911', email: 'yrave@dgist.ac.kr', sort_order: 5 },
  { id: 's6', field_ko: '보안관리', field_en: 'Security Management', phone: '053-785-1262', email: 'wndud2890@dgist.ac.kr', sort_order: 6 },
] as const;

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
  { id: 'team-overview', labelKo: '부서 업무', labelEn: 'About Team' },
  { id: 'contact', labelKo: '연락처', labelEn: 'Contact' },
  { id: 'safety-management', labelKo: '경영체계', labelEn: 'Management' },
  { id: 'programs', labelKo: '특화 제도', labelEn: 'Programs' },
  { id: 'location', labelKo: '오시는 길', labelEn: 'Location' },
] as const;
