import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// 뉴스 목록 조회
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('safety_news')
    .select('*')
    .order('date', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 뉴스 수동 추가
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { title, url, date, source } = body;

  const { data, error } = await supabase
    .from('safety_news')
    .insert({ title, url, date, source, is_auto: false })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 뉴스 삭제
export async function DELETE(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const { error } = await supabase
    .from('safety_news')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
