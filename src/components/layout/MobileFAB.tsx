'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { NAV_ITEMS } from '@/lib/constants';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function MobileFAB() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="md:hidden fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 min-w-[160px]"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#E8F0FE] hover:text-[#003876] rounded-lg transition-colors"
                >
                  {lang === 'ko' ? item.labelKo : item.labelEn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB 버튼 — 달구 아이콘 */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#003876] shadow-lg flex items-center justify-center overflow-hidden border-2 border-white"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Image
            src="/images/dalgu-lab.png"
            alt="메뉴"
            width={40}
            height={40}
            className="object-contain"
          />
        )}
      </motion.button>
    </div>
  );
}
