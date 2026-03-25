'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import SectionWrapper, { SectionTitle } from '@/components/layout/SectionWrapper';
import { CardSkeleton } from '@/components/ui/Skeleton';

interface EmphasisWeekItem {
  id: string;
  title_ko: string;
  title_en: string;
  youtube_url?: string;
  blog_url?: string;
  year: number;
}

/** YouTube URL에서 video ID 추출 */
function extractYouTubeId(url: string): string | null {
  // youtube.com/watch?v=xxx 또는 youtu.be/xxx 형식 지원
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function EmphasisWeek() {
  const { lang } = useLanguage();
  const tr = translations[lang];
  const [items, setItems] = useState<EmphasisWeekItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('emphasis_week')
          .select('*')
          .order('year', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch {
        // 에러 시 빈 배열 유지
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <SectionWrapper bgColor="bg-[#F5F5F5]">
      <SectionTitle>{tr.emphasisTitle}</SectionTitle>

      {/* 로딩 스켈레톤 */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 데이터 없음 */}
      {!loading && items.length === 0 && (
        <p className="text-center text-[#666666] py-8">{tr.noData}</p>
      )}

      {/* 강조주간 카드 목록 */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const videoId = item.youtube_url
              ? extractYouTubeId(item.youtube_url)
              : null;

            return (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* YouTube 썸네일 (클릭 시 새 탭) */}
                {videoId && (
                  <a
                    href={item.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={lang === 'ko' ? item.title_ko : item.title_en}
                      className="w-full aspect-video object-cover"
                    />
                    {/* 재생 아이콘 오버레이 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-[#003876] ml-0.5" />
                      </div>
                    </div>
                  </a>
                )}

                {/* 카드 하단: 제목 + 블로그 링크 */}
                <div className="p-4">
                  <span className="text-xs font-medium text-[#0066CC] mb-1 block">
                    {item.year}
                  </span>
                  <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">
                    {lang === 'ko' ? item.title_ko : item.title_en}
                  </h3>

                  {/* 블로그 링크 */}
                  {item.blog_url && (
                    <a
                      href={item.blog_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#0066CC] hover:text-[#003876] font-medium transition-colors"
                    >
                      {lang === 'ko' ? '블로그 보기' : 'View Blog'}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </SectionWrapper>
  );
}
