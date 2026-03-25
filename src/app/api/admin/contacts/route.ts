import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// 연락처 목록 조회
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 연락처 수정
export async function PUT(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { id, phone, email, field_ko, field_en } = body;

  const { data, error } = await supabase
    .from('contacts')
    .update({ phone, email, field_ko, field_en })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
