'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface EmphasisItem {
  id: string;
  title_ko: string;
  title_en: string;
  youtube_url: string;
  blog_url: string;
  year: number;
}

// YouTube URL에서 썸네일 추출
function getYoutubeThumbnail(url: string): string | null {
  const match = url?.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
}

const emptyForm = { title_ko: '', title_en: '', youtube_url: '', blog_url: '', year: new Date().getFullYear() };

export default function EmphasisManager() {
  const [items, setItems] = useState<EmphasisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/emphasis');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: EmphasisItem) => {
    setEditingId(item.id);
    setForm({
      title_ko: item.title_ko,
      title_en: item.title_en,
      youtube_url: item.youtube_url || '',
      blog_url: item.blog_url || '',
      year: item.year,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await fetch('/api/admin/emphasis', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch('/api/admin/emphasis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setShowModal(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return;
    await fetch(`/api/admin/emphasis?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <p className="text-gray-500">로딩 중...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">강조주간 관리</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-3 py-2 text-sm text-white rounded-lg"
          style={{ backgroundColor: '#003876' }}
        >
          <Plus size={16} /> 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const thumb = getYoutubeThumbnail(item.youtube_url);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* 썸네일 */}
              {thumb && (
                <div className="aspect-video bg-gray-100">
                  <img src={thumb} alt={item.title_ko} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-gray-500">{item.year}년</span>
                    <p className="font-medium text-sm mt-1">{item.title_ko}</p>
                    <p className="text-xs text-gray-500">{item.title_en}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(item)} className="text-gray-400 hover:text-blue-600">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {item.youtube_url && (
                  <a href={item.youtube_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline block mt-2 truncate">
                    YouTube
                  </a>
                )}
                {item.blog_url && (
                  <a href={item.blog_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline block mt-1 truncate">
                    블로그
                  </a>
                )}
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-center text-gray-400 py-8 col-span-2">등록된 항목이 없습니다.</p>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">{editingId ? '수정' : '추가'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">연도</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">제목 (한국어)</label>
                <input
                  type="text"
                  value={form.title_ko}
                  onChange={(e) => setForm({ ...form, title_ko: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title (English)</label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">YouTube URL</label>
                <input
                  type="url"
                  value={form.youtube_url}
                  onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                {getYoutubeThumbnail(form.youtube_url) && (
                  <img
                    src={getYoutubeThumbnail(form.youtube_url)!}
                    alt="미리보기"
                    className="mt-2 rounded w-full max-w-[200px]"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">블로그 URL</label>
                <input
                  type="url"
                  value={form.blog_url}
                  onChange={(e) => setForm({ ...form, blog_url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
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
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white rounded-lg"
                style={{ backgroundColor: '#003876' }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
