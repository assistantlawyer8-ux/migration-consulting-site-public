'use client';
import { useEffect, useState } from 'react';
type Lead = { id: string; name: string; email: string; phone?: string; message: string; status: string; crmSynced: boolean; createdAt: string };

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => { fetch('/api/admin/leads').then((r) => r.json()).then(setLeads); }, []);
  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Leads</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-slate-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Message</th>
              <th className="p-4">CRM</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-slate-50">
                <td className="p-4">{l.name}</td>
                <td className="p-4">{l.email}</td>
                <td className="max-w-xs truncate p-4">{l.message}</td>
                <td className="p-4">{l.crmSynced ? '✅' : '—'}</td>
                <td className="p-4">
                  <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)} className="rounded border border-slate-200 px-2 py-1">
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="qualified">qualified</option>
                    <option value="closed">closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}