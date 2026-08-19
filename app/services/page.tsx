export default function ServicesPage() {
  const services = [
    { title: 'Migration & Residency', items: ['Rentista, pensionado, and investor visas', 'Residency permit applications', 'Work permits and status changes'] },
    { title: 'Business Formation', items: ['Company incorporation (S.A. / SRL)', 'Tax registration and compliance', 'Contracts and legal documentation'] },
    { title: 'Real Estate Advisory', items: ['Property search and viewings', 'Title and due-diligence review', 'Transaction and closing support'] }
  ];
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-900">Our Services</h1>
      <div className="mt-10 space-y-10">
        {services.map((s) => (
          <div key={s.title}>
            <h2 className="text-xl font-semibold text-brand-700">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
              {s.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}