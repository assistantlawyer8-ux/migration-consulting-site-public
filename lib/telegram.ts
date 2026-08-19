import { prisma } from '@/lib/prisma';

async function getTelegramConfig() {
  const integration = await prisma.integration.findUnique({ where: { type: 'TELEGRAM' } });
  if (!integration || !integration.enabled) return null;
  return integration.config as { botToken: string; chatId: string };
}

export async function notifyNewLead(lead: { name: string; email: string; phone?: string | null; message: string }) {
  const config = await getTelegramConfig();
  if (!config?.botToken || !config?.chatId) return;
  const text = `🆕 New lead\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || '-'}\nMessage: ${lead.message}`;
  await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: config.chatId, text })
  }).catch(() => {});
}

export async function sendTelegramMessage(chatId: string, text: string) {
  const config = await getTelegramConfig();
  if (!config?.botToken) return;
  await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  }).catch(() => {});
}