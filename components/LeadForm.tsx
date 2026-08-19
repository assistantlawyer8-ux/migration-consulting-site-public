'use client';
import { useState } from 'react';

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value
    };
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full name" className="rounded-lg border border-slate-200 px-4 py-3" />
        <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-slate-200 px-4 py-3" />
      </div>
      <input name="phone" placeholder="Phone / WhatsApp (optional)" className="rounded-lg border border-slate-200 px-4 py-3" />
      <textarea name="message" required rows={4} placeholder="Tell us about your situation" className="rounded-lg border border-slate-200 px-4 py-3" />
      <button type="submit" disabled={status === 'loading'} className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
        {status === 'loading' ? 'Sending…' : 'Request a consultation'}
      </button>
      {status === 'success' && <p className="text-sm text-green-600">Thanks! We'll be in touch shortly.</p>}
      {status === 'error' && <p className="text-sm text-red-600">Something went wrong, please try again.</p>}
    </form>
  );
}