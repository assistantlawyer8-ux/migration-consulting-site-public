'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) setError('Invalid credentials');
    else router.push('/admin');
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-xl font-semibold text-brand-900">Admin Login</h1>
        <input name="email" type="email" required placeholder="Email" className="mt-6 w-full rounded-lg border border-slate-200 px-4 py-3" />
        <input name="password" type="password" required placeholder="Password" className="mt-3 w-full rounded-lg border border-slate-200 px-4 py-3" />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button type="submit" className="mt-6 w-full rounded-lg bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700">Sign in</button>
      </form>
    </div>
  );
}