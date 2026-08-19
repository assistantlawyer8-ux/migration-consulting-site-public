import { prisma } from '@/lib/prisma';

export default async function ThreadsFeed() {
  const posts = await prisma.threadsPost.findMany({ orderBy: { postedAt: 'desc' }, take: 6 }).catch(() => []);
  if (posts.length === 0) return <p className="text-sm text-slate-400">Threads feed will appear here once connected in the admin panel.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-100 p-4 hover:border-brand-200 hover:shadow-sm">
          {post.mediaUrl && <img src={post.mediaUrl} alt="" className="mb-3 h-40 w-full rounded-lg object-cover" />}
          <p className="line-clamp-4 text-sm text-slate-700">{post.text}</p>
          <p className="mt-2 text-xs text-slate-400">{new Date(post.postedAt).toLocaleDateString()}</p>
        </a>
      ))}
    </div>
  );
}