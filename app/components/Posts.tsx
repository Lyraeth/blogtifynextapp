import prisma from '@/lib/prisma';
import Link from 'next/link';
import RefreshButton from './RefreshButton';

export default async function Posts() {
  const startTime = Date.now();
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const duration = Date.now() - startTime;

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="text-center">
        <h1 className="text-3xl">Recent posts</h1>
        <p className="text-sm text-gray-500">
          Fetched {posts.length} posts in {duration}ms
        </p>
        <RefreshButton />
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map(post => (
          <Link href={`/p/${post.id}`} key={post.id}>
            <div className="card">
              <div className="card-body rounded-lg border border-slate-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-900 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <article className="flex max-w-xl flex-col items-start justify-between">
                  <div className="flex items-center gap-x-4 text-xs"></div>
                  <div className="group relative">
                    <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-slate-300">
                      <div>
                        <span className="absolute inset-0"></span>
                        {post.title}
                      </div>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {post.content}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="text-gray-600">Created By:</p>
                      <div className="font-semibold text-gray-900 dark:text-gray-400">
                        <div>
                          <span className="absolute inset-0"></span>
                          {post.author?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
