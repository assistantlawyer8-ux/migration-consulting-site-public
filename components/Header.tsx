import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-brand-700">Relocation Consulting</Link>
        <nav className="hidden gap-8 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/services" className="hover:text-brand-600">Services</Link>
          <Link href="/#about" className="hover:text-brand-600">About</Link>
          <Link href="/#threads" className="hover:text-brand-600">Updates</Link>
          <Link href="/#contact" className="hover:text-brand-600">Contact</Link>
        </nav>
        <Link href="/#contact" className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Book a consultation</Link>
      </div>
    </header>
  );
}