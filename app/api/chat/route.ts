import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { message, sessionId } = await req.json().catch(() => ({}));
  if (!message) return NextResponse.json({ error: 'message is required' }, { status: 400 });
  const integration = await prisma.integration.findUnique({ where: { type: 'CHATBOT' } });
  if (!integration || !integration.enabled) return NextResponse.json({ reply: 'Chat is not configured yet. Please contact us via the form.' });
  const config = integration.config as { webhookUrl: string; apiKey?: string };
  try {
    const res = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}) },
      body: JSON.stringify({ message, sessionId: sessionId || 'anonymous' })
    });
    const data = await res.json();
    return NextResponse.json({ reply: data.reply || 'No response from agent.' });
  } catch (err: any) {
    return NextResponse.json({ reply: 'The chat agent is unavailable right now, please try again later.' }, { status: 502 });
  }
}