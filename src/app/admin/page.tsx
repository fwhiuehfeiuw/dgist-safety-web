'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const success = await login(password);
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: '#E8F0FE' }}
          >
            <Lock size={28} style={{ color: '#003876' }} />
          </div>
          <h1 className="text-xl font-bold" style={{ color: '#003876' }}>
            관리자 로그인
          </h1>
          <p className="text-sm text-gray-500 mt-1">DGIST 안전보안팀</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 mb-4"
            style={{ focusRingColor: '#003876' } as React.CSSProperties}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting || !password}
            className="w-full py-3 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
            style={{ backgroundColor: '#003876' }}
          >
            {submitting ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
