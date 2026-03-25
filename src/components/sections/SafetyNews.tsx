'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { EXTERNAL_LINKS } from '@/lib/constants';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { CardSkeleton } from '@/components/ui/Skeleton';

interface NewsItem {
  id: string;
  title: string;
  title_en?: string;
  url: string;
  source?: string;
  published_at: string;
}

export default function SafetyNews() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error: fetchError } = await supabase
          .from('safety_news')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(5);

        if (fetchError) throw fetchError;
        setNews(data || []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
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

  return (
    <SectionWrapper id="safety-info">
      <SectionTitle>{tr.newsTitle}</SectionTitle>

      {/* 로딩 스켈레톤 */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 에러 또는 데이터 없음: 폴백 */}
      {!loading && (error || news.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-[#666666] mb-4">{tr.noData}</p>
          <a
            href={EXTERNAL_LINKS.dgistNews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0066CC] hover:text-[#003876] font-medium transition-colors"
          >
            {lang === 'ko'
              ? EXTERNAL_LINKS.dgistNews.titleKo
              : EXTERNAL_LINKS.dgistNews.titleEn}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      )}

      {/* 뉴스 목록 */}
      {!loading && !error && news.length > 0 && (
        <div className="space-y-3">
          {news.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 hover:border-[#0066CC]/30 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-[#1A1A1A] font-medium truncate group-hover:text-[#0066CC] transition-colors">
                  {lang === 'en' && item.title_en ? item.title_en : item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#666666]">
                    {formatDate(item.published_at)}
                  </span>
                  {item.source && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-xs text-[#666666]">{item.source}</span>
                    </>
                  )}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#0066CC] flex-shrink-0 ml-3 transition-colors" />
            </motion.a>
          ))}

          {/* 더 보기 링크 */}
          <div className="text-center pt-4">
            <a
              href={EXTERNAL_LINKS.dgistNews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[#0066CC] hover:text-[#003876] font-medium transition-colors"
            >
              {tr.moreInfo}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
