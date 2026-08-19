import { prisma } from '@/lib/prisma';
import { CRMConnector } from './types';
import { createCustomConnector } from './custom';
import { createBitrix24Connector } from './bitrix24';
import { createHubSpotConnector } from './hubspot';

export async function getActiveCRMConnector(): Promise<CRMConnector | null> {
  const integration = await prisma.integration.findUnique({ where: { type: 'CRM' } });
  if (!integration || !integration.enabled) return null;
  const config = integration.config as Record<string, any>;
  switch (integration.provider) {
    case 'bitrix24': return createBitrix24Connector(config as any);
    case 'hubspot': return createHubSpotConnector(config as any);
    case 'custom': default: return createCustomConnector(config as any);
  }
}