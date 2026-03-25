'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Issue {
  id: string;
  date: string;
  keyword_ko: string;
  keyword_en: string;
  url: string;
  is_active: boolean;
}

const emptyForm = { date: '', keyword_ko: '', keyword_en: '', url: '', is_active: true };

export default function IssuesManager() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/issues');
    const data = await res.json();
    setIssues(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (issue: Issue) => {
    setEditingId(issue.id);
    setForm({
      date: issue.date,
      keyword_ko: issue.keyword_ko,
      keyword_en: issue.keyword_en,
      url: issue.url || '',
      is_active: issue.is_active,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await fetch('/api/admin/issues', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch('/api/admin/issues', {
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
    await fetch(`/api/admin/issues?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const toggleActive = async (issue: Issue) => {
    await fetch('/api/admin/issues', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: issue.id, is_active: !issue.is_active }),
    });
    fetchData();
  };

  if (loading) return <p className="text-gray-500">로딩 중...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">안전이슈 관리</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-3 py-2 text-sm text-white rounded-lg"
          style={{ backgroundColor: '#003876' }}
        >
          <Plus size={16} /> 추가
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">날짜</th>
              <th className="px-4 py-3 text-left">키워드(한)</th>
              <th className="px-4 py-3 text-left">키워드(영)</th>
              <th className="px-4 py-3 text-left">URL</th>
              <th className="px-4 py-3 text-center">활성</th>
              <th className="px-4 py-3 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{issue.date}</td>
                <td className="px-4 py-3">{issue.keyword_ko}</td>
                <td className="px-4 py-3">{issue.keyword_en}</td>
                <td className="px-4 py-3 max-w-[200px] truncate">
                  {issue.url && (
                    <a href={issue.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {issue.url}
                    </a>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleActive(issue)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      issue.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {issue.is_active ? 'ON' : 'OFF'}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openEdit(issue)} className="text-gray-500 hover:text-blue-600">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(issue.id)} className="text-gray-500 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {issues.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">등록된 이슈가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">{editingId ? '이슈 수정' : '이슈 추가'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
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
                <label className="block text-sm font-medium mb-1">키워드 (한국어)</label>
                <input
                  type="text"
                  value={form.keyword_ko}
                  onChange={(e) => setForm({ ...form, keyword_ko: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">키워드 (English)</label>
                <input
                  type="text"
                  value={form.keyword_en}
                  onChange={(e) => setForm({ ...form, keyword_en: e.target.value })}
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
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  id="is_active"
                />
                <label htmlFor="is_active" className="text-sm">활성화</label>
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
