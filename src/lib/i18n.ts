'use client';

import { createContext, useContext } from 'react';

export type Language = 'ko' | 'en';

export const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
}>({
  lang: 'ko',
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

// 번역 헬퍼: ko/en 값에서 현재 언어에 맞는 값 반환
export function t(ko: string, en: string, lang: Language): string {
  return lang === 'ko' ? ko : en;
}

export const translations = {
  ko: {
    // 헤더
    siteName: 'DGIST 안전보안팀',
    // 히어로
    heroTitle: 'DGIST Safety & Security Team',
    heroSubtitle: '안전보안팀',
    heroSlogan: '매월 4일은 안전점검의 날',
    heroDesc: 'DGIST 구성원의 안전한 연구환경을 위해\n안전·보건·보안 업무를 수행합니다.',
    // 섹션 타이틀
    quickLinksTitle: '바로가기',
    newsTitle: 'DGIST 안전 뉴스',
    issuesTitle: '연구실 안전이슈',
    teamTitle: '업무 소개',
    managementTitle: '안전보건경영',
    contactTitle: '연락처',
    programsTitle: '연구실사고 예방 특화 제도',
    regulationsTitle: '소관 규정',
    emphasisTitle: '안전·보건·보안 강조주간',
    locationTitle: '오시는 길',
    // 공통
    moreInfo: '자세히 보기',
    noData: '등록된 정보가 없습니다.',
    // 푸터
    footerCopyright: '© 2026 DGIST 안전보안팀. All rights reserved.',
    // 안전보건경영
    isoTitle: 'ISO 45001 인증',
    isoDesc: '안전보건경영시스템 국제표준 인증 획득',
    policyTitle: '안전보건 경영방침',
    policyDesc: '체계적인 안전보건 경영방침 수립·이행',
    // 연락처
    contactField: '분야',
    contactPhone: '전화번호',
    contactEmail: '이메일',
  },
  en: {
    siteName: 'DGIST Safety & Security',
    heroTitle: 'DGIST Safety & Security Team',
    heroSubtitle: 'Safety & Security Team',
    heroSlogan: 'Safety Inspection Day: Every 4th',
    heroDesc: 'Ensuring safe research environments\nthrough safety, health, and security services.',
    quickLinksTitle: 'Quick Links',
    newsTitle: 'DGIST Safety News',
    issuesTitle: 'Lab Safety Issues',
    teamTitle: 'About Us',
    managementTitle: 'Safety & Health Management',
    contactTitle: 'Contact',
    programsTitle: 'Lab Accident Prevention Programs',
    regulationsTitle: 'Regulations',
    emphasisTitle: 'Safety·Health·Security Emphasis Week',
    locationTitle: 'Location',
    moreInfo: 'Learn More',
    noData: 'No information available.',
    footerCopyright: '© 2026 DGIST Safety & Security Team. All rights reserved.',
    isoTitle: 'ISO 45001 Certified',
    isoDesc: 'International standard for occupational health and safety management',
    policyTitle: 'Safety & Health Policy',
    policyDesc: 'Systematic safety & health management policy implementation',
    contactField: 'Field',
    contactPhone: 'Phone',
    contactEmail: 'Email',
  },
} as const;
