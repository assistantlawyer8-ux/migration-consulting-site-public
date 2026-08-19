import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (process.env.INTERNAL_CRON_SECRET && auth !== `Bearer ${process.env.INTERNAL_CRON_SECRET}`) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const integration = await prisma.integration.findUnique({ where: { type: 'THREADS' } });
  if (!integration || !integration.enabled) return NextResponse.json({ skipped: true });
  const { accessToken, userId } = integration.config as { accessToken: string; userId: string };
  try {
    const url = `https://graph.threads.net/v1.0/${userId}/threads?fields=id,text,media_url,permalink,timestamp&access_token=${accessToken}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: 502 });
    for (const post of data.data || []) {
      await prisma.threadsPost.upsert({
        where: { threadsId: post.id },
        update: { text: post.text || null, mediaUrl: post.media_url || null, permalink: post.permalink, postedAt: new Date(post.timestamp) },
        create: { threadsId: post.id, text: post.text || null, mediaUrl: post.media_url || null, permalink: post.permalink, postedAt: new Date(post.timestamp) }
      });
    }
    return NextResponse.json({ synced: data.data?.length || 0 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}