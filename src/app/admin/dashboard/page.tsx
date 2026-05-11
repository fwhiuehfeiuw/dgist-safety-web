'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ProgramsManager from '@/components/admin/ProgramsManager';
import ContactsManager from '@/components/admin/ContactsManager';
import EmphasisManager from '@/components/admin/EmphasisManager';

const TABS = [
  { key: 'programs', label: '제도' },
  { key: 'contacts', label: '연락처' },
  { key: 'emphasis', label: '강조주간' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function AdminDashboard() {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('programs');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'programs': return <ProgramsManager />;
      case 'contacts': return <ContactsManager />;
      case 'emphasis': return <EmphasisManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold" style={{ color: '#003876' }}>
          DGIST 안전보안팀 관리자
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} />
          로그아웃
        </button>
      </header>

      {/* 탭 */}
      <div className="bg-white border-b px-6">
        <nav className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-[#003876] text-[#003876]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 콘텐츠 */}
      <main className="p-6 max-w-6xl mx-auto">
        {renderTab()}
      </main>
    </div>
  );
}
