'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { SectionTitle } from '@/components/layout/SectionWrapper';
import { Skeleton } from '@/components/ui/Skeleton';

interface SafetyIssue {
  id: string;
  keyword: string;
  keyword_en?: string;
  date: string;
  url?: string;
  is_active: boolean;
}

export default function SafetyIssues() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [issues, setIssues] = useState<SafetyIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const { data, error } = await supabase
          .from('safety_issues')
          .select('*')
          .eq('is_active', true)
          .order('date', { ascending: false })
          .limit(10);

        if (error) throw error;
        setIssues(data || []);
      } catch {
        // 에러 시 빈 목록 유지
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  // 날짜 포맷
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (lang === 'ko') {
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // labs.go.kr 바로가기 데이터
  const externalLinks = [
    EXTERNAL_LINKS.labsIssues,
    EXTERNAL_LINKS.labsAccidents,
  ];

  return (
    <div className="mt-16">
      <SectionTitle>{tr.issuesTitle}</SectionTitle>

      {/* 로딩 */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      )}

      {/* 이슈 목록 */}
      {!loading && issues.length > 0 && (
        <div className="space-y-2 mb-8">
          {issues.map((issue, index) => {
            const content = (
              <motion.div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                  issue.url
                    ? 'border-gray-100 bg-white hover:border-[#0066CC]/30 hover:bg-[#E8F0FE]/30 cursor-pointer'
                    : 'border-gray-100 bg-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="text-xs text-[#666666] font-mono whitespace-nowrap">
                  {formatDate(issue.date)}
                </span>
                <span className="text-gray-300">|</span>
                <span
                  className={`text-sm font-medium flex-1 ${
                    issue.url
                      ? 'text-[#1A1A1A] group-hover:text-[#0066CC]'
                      : 'text-[#1A1A1A]'
                  }`}
                >
                  {lang === 'en' && issue.keyword_en
                    ? issue.keyword_en
                    : issue.keyword}
                </span>
                {issue.url && (
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                )}
              </motion.div>
            );

            if (issue.url) {
              return (
                <a
                  key={issue.id}
                  href={issue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {content}
                </a>
              );
            }

            return <div key={issue.id}>{content}</div>;
          })}
        </div>
      )}

      {/* 데이터 없음 */}
      {!loading && issues.length === 0 && (
        <div className="text-center py-8 mb-8">
          <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-[#666666]">{tr.noData}</p>
        </div>
      )}

      {/* labs.go.kr 바로가기 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {externalLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-[#003876]/15 hover:border-[#0066CC]/40 bg-[#E8F0FE]/30 hover:bg-[#E8F0FE]/60 transition-all"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ExternalLink className="w-4 h-4 text-[#003876]/60 group-hover:text-[#0066CC] flex-shrink-0 transition-colors" />
            <span className="text-sm font-medium text-[#003876] group-hover:text-[#0066CC] transition-colors">
              {lang === 'ko' ? link.titleKo : link.titleEn}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
