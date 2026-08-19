import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [total, newLeads, synced] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'new' } }),
    prisma.lead.count({ where: { crmSynced: true } })
  ]);
  const stats = [
    { label: 'Total leads', value: total },
    { label: 'New leads', value: newLeads },
    { label: 'Synced to CRM', value: synced }
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-brand-700">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
