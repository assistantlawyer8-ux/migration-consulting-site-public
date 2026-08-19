import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  const update = await req.json().catch(() => null);
  const message = update?.message;
  if (!message?.text || !message?.chat?.id) return NextResponse.json({ ok: true });
  const chatId = String(message.chat.id);
  const text = message.text.trim();
  if (text === '/leads') {
    const count = await prisma.lead.count({ where: { status: 'new' } });
    await sendTelegramMessage(chatId, `You have ${count} new lead(s). Check the admin panel for details.`);
  } else if (text === '/start') {
    await sendTelegramMessage(chatId, 'Bot connected. Send /leads to see the count of new leads.');
  }
  return NextResponse.json({ ok: true });
}