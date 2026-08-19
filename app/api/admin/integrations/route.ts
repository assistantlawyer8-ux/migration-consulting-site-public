import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const integrations = await prisma.integration.findMany();
  return NextResponse.json(integrations);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { type, provider, config, enabled } = await req.json();
  const integration = await prisma.integration.upsert({
    where: { type },
    update: { provider, config, enabled },
    create: { type, provider, config, enabled: enabled ?? true }
  });
  return NextResponse.json(integration);
}