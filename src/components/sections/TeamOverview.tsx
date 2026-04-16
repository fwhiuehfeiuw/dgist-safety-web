'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Heart, Lock, Phone, Mail } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { TEAM_OVERVIEW } from '@/lib/constants';
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

const columnConfig = [
  {
    key: 'safety' as const,
    Icon: Shield,
    gradient: 'from-[#003876] to-[#0066CC]',
    badgeBg: 'bg-[#E8F0FE] text-[#003876]',
    // 포스트잇 스타일
    postit: 'bg-[#DBEAFE] border-[#93C5FD]',
    postitLabel: 'text-[#1E40AF]',
    contactFields: ['산업안전', '연구실안전', '방사선안전', '중대재해', '재난관리'],
  },
  {
    key: 'health' as const,
    Icon: Heart,
    gradient: 'from-[#2E8B57] to-[#3CB371]',
    badgeBg: 'bg-green-50 text-[#2E8B57]',
    postit: 'bg-[#DCFCE7] border-[#86EFAC]',
    postitLabel: 'text-[#166534]',
    contactFields: ['산업보건'],
  },
  {
    key: 'security' as const,
    Icon: Lock,
    gradient: 'from-[#5B4FA0] to-[#7B68EE]',
    badgeBg: 'bg-purple-50 text-[#5B4FA0]',
    postit: 'bg-[#F3E8FF] border-[#C4B5FD]',
    postitLabel: 'text-[#581C87]',
    contactFields: ['보안관리'],
  },
];

function getContactsForColumn(contacts: Contact[], fields: string[]): Contact[] {
  return contacts.filter(c => fields.some(f => c.field_ko.includes(f)));
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TeamOverview() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await supabase.from('contacts').select('*').order('sort_order', { ascending: true });
        setContacts(data || []);
      } catch { /* ignore */ }
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <SectionWrapper id="team-overview" bgColor="bg-[#F5F5F5]">
      <SectionTitle>{lang === 'ko' ? '업무 소개 및 연락처' : 'About Us & Contact'}</SectionTitle>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {columnConfig.map(({ key, Icon, gradient, badgeBg, postit, postitLabel, contactFields }) => {
          const data = TEAM_OVERVIEW[key];
          const title = lang === 'ko' ? data.titleKo : data.titleEn;
          const keywords = lang === 'ko' ? data.keywordsKo : data.keywordsEn;
          const colContacts = getContactsForColumn(contacts, contactFields);

          return (
            <motion.div key={key} variants={itemVariants} className="space-y-3">
              {/* 업무 카드 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">{title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw) => (
                    <span key={kw} className={`inline-block text-sm font-medium px-3 py-1.5 rounded-full ${badgeBg}`}>
                      {kw}
                    </span>
                  ))}
                </div>

                {key === 'security' && (
                  <div className="absolute top-12 -right-2 w-28 h-28 opacity-15 pointer-events-none">
                    <Image src="/images/dalgu-security.png" alt="Dalgu" fill className="object-contain" />
                  </div>
                )}
              </div>

              {/* 포스트잇 연락처 */}
              <motion.div
                className={`${postit} border rounded-xl p-4 shadow-sm relative`}
                style={{ transform: 'rotate(-0.5deg)' }}
                whileHover={{ rotate: 0, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* 포스트잇 상단 테이프 느낌 */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/60 rounded-sm shadow-sm" />

                <div className="flex items-center gap-1 mb-2.5">
                  <Phone className={`w-3 h-3 ${postitLabel}`} />
                  <p className={`text-[10px] uppercase tracking-widest font-bold ${postitLabel}`}>
                    {lang === 'ko' ? '연락처' : 'Contact'}
                  </p>
                </div>

                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ) : colContacts.length === 0 ? (
                  <p className="text-xs text-gray-400">-</p>
                ) : (
                  <div className="space-y-2.5">
                    {colContacts.map((c) => (
                      <div key={c.id}>
                        <p className="text-xs font-bold text-[#1A1A1A] mb-0.5">
                          {lang === 'ko' ? c.field_ko : c.field_en}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          <a href={`tel:${c.phone.split(',')[0].trim()}`} className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1A1A1A] hover:text-[#0066CC] transition-colors">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                            {c.phone}
                          </a>
                          <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 text-xs text-[#666] hover:text-[#0066CC] transition-colors">
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            {c.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
