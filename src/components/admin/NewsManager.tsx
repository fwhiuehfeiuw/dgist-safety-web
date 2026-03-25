'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  date: string;
  source: string;
  is_auto: boolean;
}

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', url: '', date: '', source: '' });

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/news');
    const data = await res.json();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    setForm({ title: '', url: '', date: '', source: '' });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return;
    await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <p className="text-gray-500">로딩 중...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">뉴스 관리</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-white rounded-lg"
          style={{ backgroundColor: '#003876' }}
        >
          <Plus size={16} /> 수동 추가
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">제목</th>
              <th className="px-4 py-3 text-left">날짜</th>
              <th className="px-4 py-3 text-left">출처</th>
              <th className="px-4 py-3 text-center">구분</th>
              <th className="px-4 py-3 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 max-w-[300px]">
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate block">
                    {item.title}
                  </a>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3">{item.source}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.is_auto ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.is_auto ? '자동' : '수동'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => handleDelete(item.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">등록된 뉴스가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 추가 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">뉴스 수동 추가</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">날짜</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">출처</label>
                <input
                  type="text"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="예: DGIST 보도자료"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm text-white rounded-lg"
                style={{ backgroundColor: '#003876' }}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
