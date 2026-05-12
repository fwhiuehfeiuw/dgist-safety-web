'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { CONTACTS_FALLBACK } from '@/lib/constants';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeader from '@/components/layout/SectionHeader';
import { Skeleton } from '@/components/ui/Skeleton';

// undraw 일러스트는 클라이언트에서만 렌더 (class component, SSR 안전성 확보)
const UndrawConversation = dynamic(
  () => import('react-undraw-illustrations').then((m) => m.UndrawConversation),
  { ssr: false }
);

// 분야별 컬러 매핑
function getStyle(fieldKo: string) {
  if (fieldKo.includes('보건')) {
    return {
      accent: '#2E8B57',
      cardBg: 'bg-gradient-to-br from-emerald-50 to-white',
      ring: 'ring-emerald-100',
      hover: 'hover:text-[#2E8B57]',
      shadow: 'hover:shadow-emerald-100/60',
    };
  }
  if (fieldKo.includes('보안')) {
    return {
      accent: '#5B4FA0',
      cardBg: 'bg-gradient-to-br from-purple-50 to-white',
      ring: 'ring-purple-100',
      hover: 'hover:text-[#5B4FA0]',
      shadow: 'hover:shadow-purple-100/60',
    };
  }
  return {
    accent: '#003876',
    cardBg: 'bg-gradient-to-br from-[#E8F0FE] to-white',
    ring: 'ring-blue-100',
    hover: 'hover:text-[#0066CC]',
    shadow: 'hover:shadow-blue-100/60',
  };
}

interface Contact {
  id: string;
  field_ko: string;
  field_en: string;
  phone: string;
  email: string;
  sort_order: number;
}

export default function ContactSection() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        // Supabase 데이터 있으면 사용, 없거나 비어있으면 fallback
        setContacts(data && data.length > 0 ? data : [...CONTACTS_FALLBACK]);
      } catch {
        // 에러 시 fallback 사용
        setContacts([...CONTACTS_FALLBACK]);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  return (
    <SectionWrapper id="contact" bgColor="bg-[#F7F9FC]">
      <div className="relative max-w-6xl mx-auto bg-gradient-to-br from-[#EAF7F0] via-[#F4F8FE] to-[#FAF7FF] rounded-3xl border border-gray-100 px-6 md:px-10 py-5 md:py-7 overflow-hidden">
        {/* 코너 글로우 — 연락처: 따뜻한 톤 (안전/보건/보안 컬러) */}
        <div aria-hidden className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-[#2E8B57]/15 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-[#5B4FA0]/12 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute top-10 right-1/3 w-48 h-48 rounded-full bg-[#0066CC]/10 blur-3xl pointer-events-none" />
      <SectionHeader
        illustration={<UndrawConversation primaryColor="#003876" height="100%" />}
        eyebrow="Get in Touch"
        titleKo={tr.contactTitle}
        titleEn="Contact"
      />

      {/* 로딩 스켈레톤 */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-3 w-32 mb-2" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      )}

      {/* 데이터 없음 */}
      {!loading && contacts.length === 0 && (
        <p className="text-center text-[#666666] py-8">{tr.noData}</p>
      )}

      {/* 연락처 카드 그리드 */}
      {!loading && contacts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {contacts.map((contact, index) => {
            const s = getStyle(contact.field_ko);
            return (
              <motion.div
                key={contact.id}
                className={`group relative ${s.cardBg} rounded-2xl p-5 ring-1 ${s.ring} shadow-sm hover:shadow-xl ${s.shadow} transition-all duration-300 overflow-hidden`}
                style={{ ['--accent' as never]: s.accent }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* 배경 데코 — hover 시 살짝 회전 */}
                <motion.div
                  aria-hidden
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                  style={{ background: s.accent }}
                />

                {/* 헤더 — 사이드 바 + 한글 분야명 */}
                <div className="relative flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-1 rounded-full flex-shrink-0"
                    style={{ background: s.accent }}
                    initial={{ height: 16 }}
                    whileHover={{ height: 28 }}
                    animate={{ height: 24 }}
                  />
                  <h3 className="text-base font-bold text-[#1A1A1A] leading-tight">
                    {lang === 'ko' ? contact.field_ko : contact.field_en}
                  </h3>
                  <ArrowUpRight
                    className="ml-auto w-4 h-4 text-gray-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    style={{ color: s.accent }}
                  />
                </div>

                {/* 전화번호 — 정적 표시 (링크 없음) */}
                <div className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white ring-1 ring-gray-200 text-[#1A1A1A] text-sm font-semibold shadow-sm mb-2 overflow-hidden">
                  <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[color:var(--accent)]" />
                  </span>
                  <span className="flex-1 truncate tabular-nums">{contact.phone}</span>
                </div>

                {/* 이메일 — 버튼 느낌 */}
                <motion.a
                  href={`mailto:${contact.email}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group/btn relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white ring-1 ring-gray-200 text-[#555] text-sm font-medium shadow-sm overflow-hidden transition-colors duration-300 hover:bg-[color:var(--accent)] hover:text-white hover:ring-[color:var(--accent)] hover:shadow-md"
                >
                  <span className="w-7 h-7 rounded-lg bg-gray-100 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[color:var(--accent)] group-hover/btn:text-white transition-colors" />
                  </span>
                  <span className="flex-1 truncate">{contact.email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      )}
      </div>
    </SectionWrapper>
  );
}
