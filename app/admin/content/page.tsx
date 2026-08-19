'use client';
import { useEffect, useState } from 'react';
type Content = { key: string; title?: string; body: string };
const KEYS = ['home.hero', 'home.about', 'services.intro'];

export default function AdminContentPage() {
  const [items, setItems] = useState<Record<string, Content>>({});
  useEffect(() => {
    fetch('/api/admin/content').then((r) => r.json()).then((data: Content[]) => {
      const map: Record<string, Content> = {};
      for (const k of KEYS) map[k] = { key: k, title: '', body: '' };
      for (const d of data) map[d.key] = d;
      setItems(map);
    });
  }, []);
  async function save(key: string) {
    const item = items[key];
    await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Page Content</h1>
      <div className="mt-6 space-y-6">
        {KEYS.map((key) => (
          <div key={key} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="mb-3 text-sm font-semibold text-slate-500">{key}</p>
            <input value={items[key]?.title || ''} onChange={(e) => setItems((prev) => ({ ...prev, [key]: { ...prev[key], title: e.target.value } }))} placeholder="Title" className="mb-2 w-full rounded-lg border border-slate-200 px-4 py-2" />
            <textarea value={items[key]?.body || ''} onChange={(e) => setItems((prev) => ({ ...prev, [key]: { ...prev[key], body: e.target.value } }))} placeholder="Body" rows={4} className="w-full rounded-lg border border-slate-200 px-4 py-2" />
            <button onClick={() => save(key)} className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}