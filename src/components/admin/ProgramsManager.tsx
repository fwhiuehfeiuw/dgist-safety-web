'use client';

import { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface Program {
  id: string;
  title_ko: string;
  title_en: string;
  desc_ko: string;
  desc_en: string;
  color: string;
  sort_order: number;
}

export default function ProgramsManager() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title_ko: '', title_en: '', desc_ko: '', desc_en: '', color: '' });

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/programs');
    const data = await res.json();
    setPrograms(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const startEdit = (p: Program) => {
    setEditingId(p.id);
    setForm({
      title_ko: p.title_ko,
      title_en: p.title_en,
      desc_ko: p.desc_ko,
      desc_en: p.desc_en,
      color: p.color,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (id: string) => {
    await fetch('/api/admin/programs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...form }),
    });
    setEditingId(null);
    fetchData();
  };

  if (loading) return <p className="text-gray-500">로딩 중...</p>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">특화 제도 관리</h2>

      <div className="space-y-3">
        {programs.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4">
            {editingId === p.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">제목 (한국어)</label>
                    <input
                      type="text"
                      value={form.title_ko}
                      onChange={(e) => setForm({ ...form, title_ko: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Title (English)</label>
                    <input
                      type="text"
                      value={form.title_en}
                      onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">설명 (한국어)</label>
                    <textarea
                      value={form.desc_ko}
                      onChange={(e) => setForm({ ...form, desc_ko: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Description (English)</label>
                    <textarea
                      value={form.desc_en}
                      onChange={(e) => setForm({ ...form, desc_en: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">컬러</label>
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-10 h-10 border rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex-1" />
                  <button onClick={cancelEdit} className="p-2 text-gray-500 hover:text-gray-700">
                    <X size={18} />
                  </button>
                  <button
                    onClick={() => handleSave(p.id)}
                    className="p-2 text-white rounded"
                    style={{ backgroundColor: '#003876' }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className="w-3 h-full min-h-[40px] rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: p.color }}
                  />
                  <div>
                    <p className="font-medium text-sm">{p.title_ko}</p>
                    <p className="text-xs text-gray-500">{p.title_en}</p>
                    <p className="text-xs text-gray-600 mt-1">{p.desc_ko}</p>
                  </div>
                </div>
                <button onClick={() => startEdit(p)} className="text-gray-400 hover:text-blue-600 flex-shrink-0">
                  <Pencil size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
        {programs.length === 0 && (
          <p className="text-center text-gray-400 py-8">등록된 제도가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
