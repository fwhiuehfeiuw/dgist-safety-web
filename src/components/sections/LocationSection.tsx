'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapPin, Phone, Car } from 'lucide-react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useLanguage, translations } from '@/lib/i18n';
import { LOCATION } from '@/lib/constants';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeader from '@/components/layout/SectionHeader';

const UndrawAddress = dynamic(
  () => import('react-undraw-illustrations').then((m) => m.UndrawAddress),
  { ssr: false }
);

export default function LocationSection() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <SectionWrapper id="location" bgColor="bg-[#F7F9FC]">
      <div className="relative max-w-6xl mx-auto bg-gradient-to-br from-[#F4F1EA] via-[#F8F6F0] to-[#FCFBFA] rounded-3xl border border-gray-100 px-6 md:px-10 py-5 md:py-7 overflow-hidden">
        {/* 코너 글로우 — 오시는 길: 흙·따스한 어스 톤 */}
        <div aria-hidden className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-[#D4A574]/15 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-[#0066CC]/10 blur-3xl pointer-events-none" />
      <SectionHeader
        illustration={<UndrawAddress primaryColor="#003876" height="100%" />}
        eyebrow="Visit Us"
        titleKo={tr.locationTitle}
        titleEn="Location"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Google Maps iframe */}
        <motion.div
          className="relative rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gradient-to-br from-[#EEF2F7] to-[#F7F9FC]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ minHeight: 350 }}
        >
          {/* 로딩 중 플레이스홀더 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-[#003876]/40">
              <MapPin className="w-8 h-8 animate-pulse" />
              <span className="text-xs font-medium">{lang === 'ko' ? '지도를 불러오는 중...' : 'Loading map...'}</span>
            </div>
          </div>
          <iframe
            src={LOCATION.mapEmbedUrl}
            width="100%"
            height="350"
            style={{ border: 0, position: 'relative', zIndex: 1 }}
            allowFullScreen
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            title="DGIST Location Map"
          />
        </motion.div>

        {/* 주소 및 연락처 정보 */}
        <motion.div
          className="flex flex-col justify-center space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* 주소 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0FE] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-[#003876]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#003876] mb-1">
                {lang === 'ko' ? '주소' : 'Address'}
              </h3>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">
                {lang === 'ko' ? LOCATION.addressKo : LOCATION.addressEn}
              </p>
            </div>
          </div>

          {/* 전화번호 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0FE] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone className="w-5 h-5 text-[#003876]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#003876] mb-1">
                {lang === 'ko' ? '대표번호' : 'Phone'}
              </h3>
              <a
                href={`tel:${LOCATION.phone}`}
                className="text-sm text-[#1A1A1A] hover:text-[#0066CC] transition-colors"
              >
                {LOCATION.phone}
              </a>
            </div>
          </div>

          {/* 주차 안내 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0FE] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Car className="w-5 h-5 text-[#003876]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#003876] mb-1">
                {lang === 'ko' ? '방문객 주차 안내' : 'Visitor Parking'}
              </h3>
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003876]">
                <CheckBadgeIcon className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                {lang === 'ko'
                  ? 'E1(대학본부) 맞은편 임시주차장'
                  : 'Temporary parking lot across from E1 (Main Hall)'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </SectionWrapper>
  );
}
