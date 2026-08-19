import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getActiveCRMConnector } from '@/lib/crm';
import { notifyNewLead } from '@/lib/telegram';

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().min(1).max(2000)
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const lead = await prisma.lead.create({ data: parsed.data });
  const connector = await getActiveCRMConnector();
  if (connector) {
    const result = await connector.pushLead({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      source: lead.source,
      createdAt: lead.createdAt.toISOString()
    });
    if (result.success) await prisma.lead.update({ where: { id: lead.id }, data: { crmSynced: true } });
  }
  await notifyNewLead(lead);
  return NextResponse.json({ success: true, id: lead.id });
}