'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Globe, Bot, Shield, ScanLine } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { QUICK_LINKS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { translations } from '@/lib/i18n';

const UndrawWelcome = dynamic(
  () => import('react-undraw-illustrations').then((m) => m.UndrawWelcome),
  { ssr: false }
);

// 아이콘 맵핑
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Bot,
  Shield,
};

// 카드별 그라데이션 + QR 컬러
const cardAccents = [
  { gradient: 'from-[#003876] to-[#0066CC]', qr: '003876', showQR: false },
  { gradient: 'from-[#0066CC] to-[#5B9BD5]', qr: '0066CC', showQR: true },
  { gradient: 'from-[#2E8B57] to-[#3CB371]', qr: '2E8B57', showQR: true },
];

function qrUrl(target: string, color: string): string {
  const encoded = encodeURIComponent(target);
  return `https://quickchart.io/qr?text=${encoded}&dark=${color}&light=ffffff&size=240&margin=1&ecLevel=H`;
}

export default function QuickLinksSection() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <SectionWrapper id="quick-links" bgColor="bg-[#EEF2F7]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
        <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
          <UndrawWelcome primaryColor="#003876" height="100%" />
        </div>
        <SectionTitle className="mb-0">{tr.quickLinksTitle}</SectionTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {QUICK_LINKS.map((link, index) => {
          const Icon = iconMap[link.icon];
          const { gradient, qr, showQR } = cardAccents[index];
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[color:var(--accent)] cursor-pointer overflow-hidden flex flex-col transition-colors duration-300"
              style={{ ['--accent' as never]: `#${qr}` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(0,56,118,0.14)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 상단 컬러 바 — hover 시 두꺼워짐 */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 bg-gradient-to-r ${gradient} opacity-70 group-hover:opacity-100 transition-all duration-300`}
              />
              {/* 코너 글로우 */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none`}
              />

              <div className="flex items-start justify-between gap-3">
                {/* 좌: 아이콘 + 텍스트 */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg transition-all duration-300`}
                  >
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-1.5 group-hover:text-[#003876] transition-colors">
                    {lang === 'ko' ? link.titleKo : link.titleEn}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {lang === 'ko' ? link.descKo : link.descEn}
                  </p>
                </div>

                {/* 우: QR 코드 (챗봇/시스템만) */}
                {showQR && (
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className="relative w-[72px] h-[72px] rounded-lg bg-white p-1 border border-gray-200"
                      style={{ boxShadow: `0 2px 8px ${qr}22` }}
                    >
                      <img
                        src={qrUrl(link.url, qr)}
                        alt={`QR — ${link.titleKo}`}
                        width={72}
                        height={72}
                        className="w-full h-full object-contain"
                      />
                      {/* 코너 마커 */}
                      <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l rounded-tl" style={{ borderColor: `#${qr}` }} />
                      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r rounded-tr" style={{ borderColor: `#${qr}` }} />
                      <span className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l rounded-bl" style={{ borderColor: `#${qr}` }} />
                      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r rounded-br" style={{ borderColor: `#${qr}` }} />
                    </div>
                    <span
                      className="inline-flex items-center gap-0.5 mt-1 text-[9px] font-bold uppercase tracking-wider"
                      style={{ color: `#${qr}` }}
                    >
                      <ScanLine className="w-2.5 h-2.5" />
                      Scan
                    </span>
                  </div>
                )}
              </div>

              {/* CTA 알약 버튼 — 평소 outline, hover 시 컬러 채움 */}
              <div className="mt-auto pt-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ring-1 ring-[color:var(--accent)]/30 text-[color:var(--accent)] bg-white group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:text-white group-hover:ring-transparent group-hover:shadow-md transition-all duration-300`}
                >
                  {lang === 'ko' ? '바로가기' : 'Visit'}
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
