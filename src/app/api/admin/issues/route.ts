import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// 안전이슈 목록 조회
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('safety_issues')
    .select('*')
    .order('date', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 안전이슈 생성
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { date, keyword_ko, keyword_en, url, is_active } = body;

  const { data, error } = await supabase
    .from('safety_issues')
    .insert({ date, keyword_ko, keyword_en, url, is_active: is_active ?? true })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 안전이슈 수정
export async function PUT(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from('safety_issues')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 안전이슈 삭제
export async function DELETE(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const { error } = await supabase
    .from('safety_issues')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
