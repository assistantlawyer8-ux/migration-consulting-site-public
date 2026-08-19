import { CRMConnector, LeadPayload } from './types';

export function createBitrix24Connector(config: { webhookUrl: string }): CRMConnector {
  return {
    async pushLead(lead: LeadPayload) {
      try {
        const res = await fetch(`${config.webhookUrl.replace(/\/$/, '')}/crm.lead.add.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              TITLE: `Web lead: ${lead.name}`,
              NAME: lead.name,
              EMAIL: [{ VALUE: lead.email, VALUE_TYPE: 'WORK' }],
              PHONE: lead.phone ? [{ VALUE: lead.phone, VALUE_TYPE: 'WORK' }] : undefined,
              COMMENTS: lead.message,
              SOURCE_ID: 'WEB'
            }
          })
        });
        const data = await res.json();
        if (!res.ok || data.error) return { success: false, error: data.error_description || data.error || 'Bitrix24 error' };
        return { success: true, externalId: String(data.result) };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
  };
}