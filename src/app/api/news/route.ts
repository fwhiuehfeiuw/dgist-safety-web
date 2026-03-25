import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createAdminClient();

    // DGIST 보도자료 페이지 크롤링
    const res = await fetch(
      'https://www.dgist.ac.kr/prog/bbsArticle/BBSMSTR_000000000080/list.do',
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) throw new Error('Crawl failed');

    const html = await res.text();
    const $ = cheerio.load(html);
    const articles: { title: string; url: string; date: string }[] = [];

    // 보도자료 목록에서 "안전" 키워드 포함 기사 필터링
    $('table tbody tr, .board-list li, .bbs-list li').each((_, el) => {
      const titleEl = $(el).find('a');
      const title = titleEl.text().trim();
      const href = titleEl.attr('href') || '';
      const dateText = $(el).find('.date, td:last-child, .txt_date').text().trim();

      if (title && title.includes('안전')) {
        articles.push({
          title,
          url: href.startsWith('http')
            ? href
            : `https://www.dgist.ac.kr${href}`,
          date: dateText || new Date().toISOString().split('T')[0],
        });
      }
    });

    // 크롤링 결과를 Supabase에 캐시 (최대 5건)
    if (articles.length > 0) {
      const newArticles = articles.slice(0, 5);
      for (const article of newArticles) {
        // 중복 체크
        const { data: existing } = await supabase
          .from('safety_news')
          .select('id')
          .eq('title', article.title)
          .limit(1);

        if (!existing || existing.length === 0) {
          await supabase.from('safety_news').insert({
            title: article.title,
            url: article.url,
            date: article.date,
            source: 'dgist.ac.kr',
            is_auto: true,
          });
        }
      }
    }

    // 최신 뉴스 반환
    const { data: news } = await supabase
      .from('safety_news')
      .select('*')
      .order('date', { ascending: false })
      .limit(5);

    return NextResponse.json(news || []);
  } catch {
    // fallback: DB에 있는 기존 데이터 반환
    try {
      const supabase = createAdminClient();
      const { data: news } = await supabase
        .from('safety_news')
        .select('*')
        .order('date', { ascending: false })
        .limit(5);
      return NextResponse.json(news || []);
    } catch {
      return NextResponse.json([]);
    }
  }
}
