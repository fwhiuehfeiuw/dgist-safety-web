import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 클라이언트용 (읽기 전용) — 환경변수 없으면 더미 클라이언트
let _supabase: SupabaseClient | null = null;
try {
  if (supabaseUrl) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch {
  _supabase = null;
}

export const supabase: SupabaseClient = _supabase as SupabaseClient;

// 서버용 (관리자 CRUD — service_role key)
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase environment variables not configured');
  }
  return createClient(supabaseUrl, serviceRoleKey);
}
