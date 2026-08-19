import { CRMConnector, LeadPayload } from './types';

export function createCustomConnector(config: { baseUrl: string; apiKey?: string }): CRMConnector {
  return {
    async pushLead(lead: LeadPayload) {
      try {
        const res = await fetch(`${config.baseUrl.replace(/\/$/, '')}/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {})
          },
          body: JSON.stringify(lead)
        });
        if (!res.ok) return { success: false, error: `CRM responded ${res.status}` };
        const data = await res.json().catch(() => ({}));
        return { success: true, externalId: data.id ? String(data.id) : undefined };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
  };
}