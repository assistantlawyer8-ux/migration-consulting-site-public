# Migration Consulting Site

Next.js 14 website for migration consulting with:

- Lead form → CRM (custom, Bitrix24, HubSpot) + Telegram notifications
- Chat widget proxying to your Hermes Agent / OpenClaw webhook
- Cached Threads feed (hourly sync via Vercel Cron)
- Password-protected admin panel (`/admin`) to manage leads, content, integrations

## Stack

Next.js 14 (App Router, TS) · Tailwind CSS · Prisma + PostgreSQL · NextAuth

## Local setup

1. `npm install`
2. Copy `.env.example` → `.env`, fill in:
   - `DATABASE_URL` — your PostgreSQL connection string
   - `NEXTAUTH_URL="http://localhost:3000"
   - `NEXTAUTH_SECRET` — generate with: `openssl rand -base64 32`
   - `INTERNAL_CRON_SECRET` — any random string
   - `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` — your first admin login credentials
3. `npm run db:push` — creates database tables
4. `npm run db:seed` — creates the first admin user
5. `npm run dev` — starts dev server at `http://localhost:3000`

## Integrations (configured in Admin Panel at `/admin/integrations`)

### CRM
- **Custom**: set `baseUrl` and `apiKey`; site POSTs each lead to `{baseUrl}/leads` with `Authorization: Bearer {apiKey}`
- **Bitrix24**: paste inbound webhook URL (with `crm.lead.add` permission)
- **HubSpot**: paste Private App access token

### Telegram bot
1. Create bot via `@BotFather`, copy token
2. Send bot a message from your account, then call `https://api.telegram.org/bot<token>/getUpdates` to get `chat_id`
3. Paste both into Integrations page
4. Set webhook once: `curl "https://api.telegram.org/bot<token>/setWebhook?url=https://yourdomain.com/api/telegram/webhook"`

### Hermes Agent / OpenClaw chat
Paste the agent's webhook URL (accepts `{ message, sessionId }` → returns `{ reply }`) and optional API key. The widget calls `/api/chat` server-side.

### Threads feed
1. Create Meta developer app with Threads API, add `threads_basic` scope, complete OAuth for your account
2. Paste access token and Threads user ID
3. `/api/threads/sync` (called hourly by Vercel Cron) fetches posts via `GET /{userId}/threads` and caches them

## Deploy

Import this repo in Vercel, add env vars from `.env.example`, deploy. Vercel Cron picks up `vercel.json` automatically (Pro plan or higher).
