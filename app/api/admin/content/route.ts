import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const content = await prisma.pageContent.findMany();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { key, title, body } = await req.json();
  const content = await prisma.pageContent.upsert({ where: { key }, update: { title, body }, create: { key, title, body } });
  return NextResponse.json(content);
}