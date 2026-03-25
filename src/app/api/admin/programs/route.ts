import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// 특화 제도 목록 조회
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('safety_programs')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 특화 제도 수정
export async function PUT(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { id, title_ko, title_en, desc_ko, desc_en, color } = body;

  const { data, error } = await supabase
    .from('safety_programs')
    .update({ title_ko, title_en, desc_ko, desc_en, color })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
