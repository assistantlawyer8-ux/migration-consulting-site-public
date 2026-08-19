'use client';
import { useState } from 'react';
type ChatMessage = { role: 'user' | 'agent'; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'agent', text: 'Hi! Ask me anything about relocating or setting up a business in Costa Rica.' }]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  async function send() {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setSending(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, sessionId: 'web' }) });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'agent', text: data.reply }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-brand-600 px-4 py-3 text-sm font-semibold text-white">Consultation Assistant</div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-brand-50 text-brand-900' : 'bg-slate-100 text-slate-700'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-100 p-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Type a message…" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            <button onClick={send} disabled={sending} className="rounded-lg bg-brand-600 px-3 py-2 text-sm text-white disabled:opacity-60">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700" aria-label="Toggle chat">💬</button>
    </div>
  );
}