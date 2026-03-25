'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { TableSkeleton } from '@/components/ui/Skeleton';

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
      {loading && <TableSkeleton rows={7} />}

      {/* 데이터 없음 */}
      {!loading && contacts.length === 0 && (
        <p className="text-center text-[#666666] py-8">{tr.noData}</p>
      )}

      {/* 연락처 테이블 */}
      {!loading && contacts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* 테이블 헤더 */}
            <thead>
              <tr className="border-b-2 border-[#003876]">
                <th className="text-left py-3 px-4 text-sm font-bold text-[#003876]">
                  {tr.contactField}
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#003876]">
                  {tr.contactPhone}
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#003876]">
                  {tr.contactEmail}
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <motion.tr
                  key={contact.id}
                  className="border-b border-gray-100 hover:bg-[#E8F0FE]/40 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {/* 분야 (이름 미표시) */}
                  <td className="py-3 px-4 text-sm font-medium text-[#1A1A1A]">
                    {lang === 'ko' ? contact.field_ko : contact.field_en}
                  </td>
                  {/* 전화번호 */}
                  <td className="py-3 px-4 text-sm text-[#666666]">
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex items-center gap-1.5 hover:text-[#0066CC] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {contact.phone}
                    </a>
                  </td>
                  {/* 이메일 */}
                  <td className="py-3 px-4 text-sm text-[#666666]">
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-[#0066CC] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {contact.email}
                    </a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionWrapper>
  );
}
