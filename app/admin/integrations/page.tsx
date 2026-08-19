'use client';
import { useEffect, useState } from 'react';
type Integration = { type: string; provider?: string; config: Record<string, any>; enabled: boolean };

const TEMPLATES: Record<string, Integration> = {
  CRM: { type: 'CRM', provider: 'custom', config: { baseUrl: '', apiKey: '' }, enabled: true },
  TELEGRAM: { type: 'TELEGRAM', config: { botToken: '', chatId: '' }, enabled: true },
  CHATBOT: { type: 'CHATBOT', config: { webhookUrl: '', apiKey: '' }, enabled: true },
  THREADS: { type: 'THREADS', config: { accessToken: '', userId: '' }, enabled: true }
};

export default function AdminIntegrationsPage() {
  const [state, setState] = useState<Record<string, Integration>>(TEMPLATES);
  useEffect(() => {
    fetch('/api/admin/integrations').then((r) => r.json()).then((data: Integration[]) => {
      setState((prev) => { const next = { ...prev }; for (const d of data) next[d.type] = d; return next; });
    });
  }, []);
  function setConfig(type: string, key: string, value: any) {
    setState((prev) => ({ ...prev, [type]: { ...prev[type], config: { ...prev[type].config, [key]: value } } }));
  }
  async function save(type: string) {
    await fetch('/api/admin/integrations', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(state[type]) });
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Integrations</h1>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-semibold text-slate-700">CRM</p>
        <select value={state.CRM.provider} onChange={(e) => setState((prev) => ({ ...prev, CRM: { ...prev.CRM, provider: e.target.value } }))} className="mt-3 rounded-lg border border-slate-200 px-3 py-2">
          <option value="custom">Custom / own CRM (base URL + API key)</option>
          <option value="bitrix24">Bitrix24 (webhook URL)</option>
          <option value="hubspot">HubSpot (access token)</option>
        </select>
        <div className="mt-3 grid gap-2">
          {Object.entries(state.CRM.config).map(([k, v]) => (
            <input key={k} value={v} placeholder={k} onChange={(e) => setConfig('CRM', k, e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" />
          ))}
        </div>
        <button onClick={() => save('CRM')} className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Save CRM</button>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-semibold text-slate-700">Telegram bot</p>
        <div className="mt-3 grid gap-2">
          <input value={state.TELEGRAM.config.botToken} placeholder="Bot token" onChange={(e) => setConfig('TELEGRAM', 'botToken', e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" />
          <input value={state.TELEGRAM.config.chatId} placeholder="Chat ID" onChange={(e) => setConfig('TELEGRAM', 'chatId', e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" />
        </div>
        <button onClick={() => save('TELEGRAM')} className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Save Telegram</button>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-semibold text-slate-700">Hermes Agent / OpenClaw chat widget</p>
        <div className="mt-3 grid gap-2">
          <input value={state.CHATBOT.config.webhookUrl} placeholder="Agent webhook URL" onChange={(e) => setConfig('CHATBOT', 'webhookUrl', e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" />
          <input value={state.CHATBOT.config.apiKey} placeholder="API key (optional)" onChange={(e) => setConfig('CHATBOT', 'apiKey', e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" />
        </div>
        <button onClick={() => save('CHATBOT')} className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Save Chatbot</button>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-semibold text-slate-700">Threads feed</p>
        <div className="mt-3 grid gap-2">
          <input value={state.THREADS.config.accessToken} placeholder="Access token" onChange={(e) => setConfig('THREADS', 'accessToken', e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" />
          <input value={state.THREADS.config.userId} placeholder="Threads user ID" onChange={(e) => setConfig('THREADS', 'userId', e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" />
        </div>
        <button onClick={() => save('THREADS')} className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Save Threads</button>
      </div>
    </div>
  );
}