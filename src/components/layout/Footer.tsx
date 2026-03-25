'use client';

import { useLanguage } from '@/lib/i18n';
import { translations } from '@/lib/i18n';
import { LOCATION } from '@/lib/constants';
import Image from 'next/image';

export default function Footer() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <footer className="bg-[#002855] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 정보 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-2">{tr.siteName}</h3>
            <p className="text-white/60 text-sm mb-1">
              {lang === 'ko' ? LOCATION.addressKo : LOCATION.addressEn}
            </p>
            <p className="text-white/60 text-sm">
              📞 {LOCATION.phone}
            </p>
          </div>

          {/* 달구 */}
          <div className="flex-shrink-0">
            <Image
              src="/images/dalgu-greeting.png"
              alt={lang === 'ko' ? '인사하는 달구' : 'Dalgu greeting'}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">{tr.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
