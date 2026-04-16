'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Calendar, AlertTriangle, ChevronRight } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { EXTERNAL_LINKS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { Skeleton } from '@/components/ui/Skeleton';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source?: string;
  date: string;
}

interface SafetyIssue {
  id: string;
  keyword_ko: string;
  keyword_en?: string;
  date: string;
  url?: string;
}

export default function SafetyInfoSection() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [news, setNews] = useState<NewsItem[]>([]);
  const [issues, setIssues] = useState<SafetyIssue[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [issuesLoading, setIssuesLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const { data: newsData } = await supabase
          .from('safety_news')
          .select('*')
          .order('date', { ascending: false })
          .limit(5);
        setNews(newsData || []);
      } catch { /* ignore */ }
      setNewsLoading(false);

      try {
        const { data: issueData } = await supabase
          .from('safety_issues')
          .select('*')
          .eq('is_active', true)
          .order('date', { ascending: false })
          .limit(5);
        setIssues(issueData || []);
      } catch { /* ignore */ }
      setIssuesLoading(false);
    }
    fetchAll();
  }, []);

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    if (lang === 'ko') {
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  return (
    <SectionWrapper id="safety-info">
      <SectionTitle>{lang === 'ko' ? '안전정보' : 'Safety Information'}</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ─── 좌측: DGIST 안전 뉴스 ─── */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#003876] to-[#0066CC]">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-white" />
              <h3 className="text-base font-bold text-white">{tr.newsTitle}</h3>
            </div>
            <a
              href={EXTERNAL_LINKS.dgistNews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-xs flex items-center gap-0.5 transition-colors"
            >
              {tr.moreInfo}
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 뉴스 목록 */}
          <div className="divide-y divide-gray-50">
            {newsLoading ? (
              <div className="p-5 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                ))}
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-10">
                <Newspaper className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-[#999]">{tr.noData}</p>
              </div>
            ) : (
              news.map((item, index) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 px-6 py-4 hover:bg-[#F8FAFF] transition-colors"
                >
                  {/* 날짜 뱃지 */}
                  <div className="flex-shrink-0 text-center pt-0.5">
                    <div className="text-xs font-bold text-[#003876] leading-none">
                      {formatDate(item.date).split('.')[1]}/{formatDate(item.date).split('.')[2]}
                    </div>
                    <div className="text-[10px] text-[#999] mt-0.5">
                      {formatDate(item.date).split('.')[0]}
                    </div>
                  </div>

                  {/* 구분선 */}
                  <div className="w-px h-10 bg-gray-200 flex-shrink-0" />

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#0066CC] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                    {item.source && (
                      <span className="inline-block text-[10px] font-medium text-[#0066CC] bg-[#E8F0FE] px-2 py-0.5 rounded mt-1.5">
                        {item.source}
                      </span>
                    )}
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0066CC] flex-shrink-0 mt-1 transition-colors" />
                </a>
              ))
            )}
          </div>
        </motion.div>

        {/* ─── 우측: 연구실 안전이슈 ─── */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#E67E22] to-[#F39C12]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-white" />
              <h3 className="text-base font-bold text-white">{tr.issuesTitle}</h3>
            </div>
          </div>

          {/* 이슈 목록 */}
          <div className="divide-y divide-gray-50">
            {issuesLoading ? (
              <div className="p-5 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                ))}
              </div>
            ) : issues.length === 0 ? (
              <div className="text-center py-10">
                <AlertTriangle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-[#999]">{tr.noData}</p>
              </div>
            ) : (
              <>
                {issues.map((issue) => {
                  const inner = (
                    <div className="flex items-center gap-3 px-6 py-4 hover:bg-[#FFFAF5] transition-colors">
                      {/* 경고 도트 */}
                      <span className="w-2 h-2 rounded-full bg-[#E67E22] flex-shrink-0" />

                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#E67E22] transition-colors">
                          {lang === 'en' && issue.keyword_en ? issue.keyword_en : issue.keyword_ko}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Calendar className="w-3 h-3 text-[#bbb]" />
                          <span className="text-[11px] text-[#bbb]">{formatDate(issue.date)}</span>
                        </div>
                      </div>

                      {issue.url && (
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#E67E22] flex-shrink-0 transition-colors" />
                      )}
                    </div>
                  );

                  return issue.url ? (
                    <a key={issue.id} href={issue.url} target="_blank" rel="noopener noreferrer" className="group block">
                      {inner}
                    </a>
                  ) : (
                    <div key={issue.id}>{inner}</div>
                  );
                })}

                {/* labs.go.kr 바로가기 */}
                <div className="px-6 py-4 bg-[#FAFAFA]">
                  <a
                    href={EXTERNAL_LINKS.labsSafety.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full text-sm font-medium text-white bg-[#E67E22] hover:bg-[#D35400] px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {lang === 'ko' ? EXTERNAL_LINKS.labsSafety.titleKo : EXTERNAL_LINKS.labsSafety.titleEn}
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
