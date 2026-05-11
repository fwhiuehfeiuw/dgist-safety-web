'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Phone, Mail } from 'lucide-react';
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
    <SectionWrapper id="contact" bgColor="bg-white">
      <div className="max-w-6xl mx-auto bg-[#FAFAFA] rounded-3xl border border-gray-100 px-6 md:px-10 py-8 md:py-10">
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
                className={`relative ${s.cardBg} rounded-2xl p-5 ring-1 ${s.ring} shadow-sm hover:shadow-lg ${s.shadow} hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* 헤더 — 사이드 바 + 한글 분야명 */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-1 h-6 rounded-full flex-shrink-0"
                    style={{ background: s.accent }}
                  />
                  <h3 className="text-base font-bold text-[#1A1A1A] leading-tight">
                    {lang === 'ko' ? contact.field_ko : contact.field_en}
                  </h3>
                </div>

                {/* 전화번호 */}
                <a
                  href={`tel:${contact.phone.split(',')[0].trim()}`}
                  className={`flex items-center gap-2 text-sm font-medium text-[#1A1A1A] ${s.hover} transition-colors mb-2 pl-2`}
                >
                  <Phone className="w-4 h-4 text-[#666] flex-shrink-0" />
                  <span>{contact.phone}</span>
                </a>

                {/* 이메일 */}
                <a
                  href={`mailto:${contact.email}`}
                  className={`flex items-center gap-2 text-sm text-[#555] ${s.hover} transition-colors pl-2`}
                >
                  <Mail className="w-4 h-4 text-[#666] flex-shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      )}
      </div>
    </SectionWrapper>
  );
}
