export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-6 text-sm text-slate-500">
        <p> © {new Date().getFullYear()} Migration & Relocation Consulting · Costa Rica</p>
        <p className="mt-1">Immigration guidance, business formation, and real estate advisory.</p>
      </div>
    </footer>
  );
}