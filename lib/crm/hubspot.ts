import { CRMConnector, LeadPayload } from './types';

export function createHubSpotConnector(config: { accessToken: string }): CRMConnector {
  return {
    async pushLead(lead: LeadPayload) {
      try {
        const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.accessToken}` },
          body: JSON.stringify({ properties: { email: lead.email, firstname: lead.name, phone: lead.phone || '', message: lead.message } })
        });
        const data = await res.json();
        if (!res.ok) return { success: false, error: JSON.stringify(data) };
        return { success: true, externalId: data.id };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
  };
}