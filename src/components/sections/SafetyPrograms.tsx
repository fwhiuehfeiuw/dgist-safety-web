'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { CardSkeleton } from '@/components/ui/Skeleton';

interface SafetyProgram {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  color: string;
  sort_order: number;
}

export default function SafetyPrograms() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [programs, setPrograms] = useState<SafetyProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const { data, error } = await supabase
          .from('safety_programs')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setPrograms(data || []);
      } catch {
        // 에러 시 빈 배열 유지
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  return (
    <SectionWrapper id="programs" bgColor="bg-[#F5F5F5]">
      <SectionTitle>{tr.programsTitle}</SectionTitle>

      {/* 로딩 스켈레톤 */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 데이터 없음 */}
      {!loading && programs.length === 0 && (
        <p className="text-center text-[#666666] py-8">{tr.noData}</p>
      )}

      {/* 프로그램 카드 그리드: 5x2 */}
      {!loading && programs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* 상단 컬러 바 */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: program.color }}
              />
              {/* 카드 내용 */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
                  {lang === 'ko' ? program.title_ko : program.title_en}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                  {lang === 'ko' ? program.description_ko : program.description_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
