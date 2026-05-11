'use client';

import { useLanguage } from '@/lib/i18n';
import { translations } from '@/lib/i18n';
import { LOCATION, NAV_ITEMS } from '@/lib/constants';
import { Phone, MapPin, ExternalLink } from 'lucide-react';

const EXTERNAL_RESOURCES = [
  { ko: 'DGIST 홈페이지', en: 'DGIST Homepage', url: 'https://www.dgist.ac.kr' },
  { ko: '안전보안관리시스템', en: 'Safety Management System', url: 'https://safety.dgist.ac.kr/gshm/main/home.do' },
  { ko: 'AI 안전관리 챗봇', en: 'AI Safety Chatbot', url: 'https://notebooklm.google.com/notebook/7deebde8-d58d-434e-b56e-1bdb8eb1d7b0' },
  { ko: '국가연구안전정보시스템', en: 'LabsSafety (labs.go.kr)', url: 'https://www.labs.go.kr' },
];

export default function Footer() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      {/* 상단: 다크 — 3컬럼 정보 */}
      <div className="bg-[#002855] text-white pt-12 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* 1. 팀 정보 */}
            <div>
              <h3 className="text-base font-bold mb-3 text-white">{tr.siteName}</h3>
              <div className="space-y-2">
                <p className="flex items-start gap-2 text-sm text-white/65 leading-relaxed">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/50" />
                  <span>{lang === 'ko' ? LOCATION.addressKo : LOCATION.addressEn}</span>
                </p>
                <a
                  href={`tel:${LOCATION.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-white/50" />
                  {LOCATION.phone}
                </a>
              </div>
            </div>

            {/* 2. 빠른 메뉴 */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.18em] uppercase mb-3 text-white/60">
                {lang === 'ko' ? '빠른 메뉴' : 'Quick Menu'}
              </h3>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="text-sm text-white/65 hover:text-white transition-colors text-left"
                    >
                      {lang === 'ko' ? item.labelKo : item.labelEn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. 외부 리소스 */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.18em] uppercase mb-3 text-white/60">
                {lang === 'ko' ? '관련 사이트' : 'Resources'}
              </h3>
              <ul className="space-y-2">
                {EXTERNAL_RESOURCES.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors group"
                    >
                      {lang === 'ko' ? r.ko : r.en}
                      <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 화이트 — Copyright */}
      <div className="bg-white border-t border-gray-100 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#666] text-xs">{tr.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
