'use client';

import { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface Contact {
  id: string;
  field_ko: string;
  field_en: string;
  phone: string;
  email: string;
  sort_order: number;
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ field_ko: '', field_en: '', phone: '', email: '' });

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/contacts');
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const startEdit = (c: Contact) => {
    setEditingId(c.id);
    setForm({ field_ko: c.field_ko, field_en: c.field_en, phone: c.phone, email: c.email });
  };

  const cancelEdit = () => setEditingId(null);

  const handleSave = async (id: string) => {
    await fetch('/api/admin/contacts', {
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
      <h2 className="text-lg font-bold mb-4">연락처 관리</h2>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">분야(한)</th>
              <th className="px-4 py-3 text-left">분야(영)</th>
              <th className="px-4 py-3 text-left">전화번호</th>
              <th className="px-4 py-3 text-left">이메일</th>
              <th className="px-4 py-3 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                {editingId === c.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={form.field_ko}
                        onChange={(e) => setForm({ ...form, field_ko: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={form.field_en}
                        onChange={(e) => setForm({ ...form, field_en: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleSave(c.id)} className="text-green-600 hover:text-green-800">
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3">{c.field_ko}</td>
                    <td className="px-4 py-3">{c.field_en}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => startEdit(c)} className="text-gray-400 hover:text-blue-600">
                        <Pencil size={16} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">등록된 연락처가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
