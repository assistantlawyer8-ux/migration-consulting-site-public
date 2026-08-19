export interface LeadPayload {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  source: string;
  createdAt: string;
}

export interface CRMConnector {
  pushLead(lead: LeadPayload): Promise<{ success: boolean; externalId?: string; error?: string }>;
}