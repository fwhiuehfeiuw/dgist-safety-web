import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// 강조주간 목록 조회
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('emphasis_week')
    .select('*')
    .order('year', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 강조주간 생성
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { title_ko, title_en, youtube_url, blog_url, year } = body;

  const { data, error } = await supabase
    .from('emphasis_week')
    .insert({ title_ko, title_en, youtube_url, blog_url, year })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 강조주간 수정
export async function PUT(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from('emphasis_week')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 강조주간 삭제
export async function DELETE(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const { error } = await supabase
    .from('emphasis_week')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
