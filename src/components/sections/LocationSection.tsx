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
    <SectionWrapper id="location" bgColor="bg-white">
      <div className="max-w-6xl mx-auto bg-[#FAFAFA] rounded-3xl border border-gray-100 px-6 md:px-10 py-8 md:py-10">
      <SectionHeader
        illustration={<UndrawAddress primaryColor="#003876" height="100%" />}
        eyebrow="Visit Us"
        titleKo={tr.locationTitle}
        titleEn="Location"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Google Maps iframe */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <iframe
            src={LOCATION.mapEmbedUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
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
