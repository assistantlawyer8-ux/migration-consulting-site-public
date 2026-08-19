import LeadForm from '@/components/LeadForm';
import ThreadsFeed from '@/components/ThreadsFeed';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-brand-900 sm:text-5xl">Move to Costa Rica with confidence</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">Migration, business formation, and real estate advisory for expats and entrepreneurs — end to end.</p>
          <Link href="#contact" className="mt-8 inline-block rounded-full bg-brand-600 px-8 py-3 font-semibold text-white hover:bg-brand-700">Book a consultation</Link>
        </div>
      </section>
      <section id="services" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-900">Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { title: 'Migration & Residency', desc: 'Visas, residency permits, and full legal migration support.' },
            { title: 'Business Formation', desc: 'Company setup, structuring, and regulatory compliance.' },
            { title: 'Real Estate Advisory', desc: 'Property search, due diligence, and transaction support.' }
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-100 p-6">
              <h3 className="font-semibold text-brand-700">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="threads" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-900">Latest updates</h2>
        <p className="mt-2 text-sm text-slate-500">Synced automatically from Threads.</p>
        <div className="mt-8"><ThreadsFeed /></div>
      </section>
      <section id="contact" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold text-brand-900">Request a consultation</h2>
          <div className="mt-6"><LeadForm /></div>
        </div>
      </section>
    </div>
  );
}