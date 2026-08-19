import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-56 border-r border-slate-200 bg-white p-6">
        <p className="mb-6 font-semibold text-brand-900">Admin Panel</p>
        <nav className="space-y-2 text-sm">
          <Link href="/admin" className="block rounded-lg px-3 py-2 hover:bg-brand-50">Dashboard</Link>
          <Link href="/admin/leads" className="block rounded-lg px-3 py-2 hover:bg-brand-50">Leads</Link>
          <Link href="/admin/content" className="block rounded-lg px-3 py-2 hover:bg-brand-50">Content</Link>
          <Link href="/admin/integrations" className="block rounded-lg px-3 py-2 hover:bg-brand-50">Integrations</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}