'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { Skeleton } from '@/components/ui/Skeleton';

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
        setContacts(data || []);
      } catch {
        // 에러 시 빈 배열 유지
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  return (
    <SectionWrapper id="contact">
      <SectionTitle>{tr.contactTitle}</SectionTitle>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-[#0066CC]/20 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* 분야명 */}
              <h3 className="text-sm font-bold text-[#003876] mb-3">
                {lang === 'ko' ? contact.field_ko : contact.field_en}
              </h3>

              {/* 전화번호 */}
              <a
                href={`tel:${contact.phone.split(',')[0].trim()}`}
                className="flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#0066CC] transition-colors mb-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#999] flex-shrink-0" />
                <span>{contact.phone}</span>
              </a>

              {/* 이메일 */}
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#0066CC] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#999] flex-shrink-0" />
                <span className="truncate">{contact.email}</span>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
