import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

async function getDrafts() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return [];
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session?.user?.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return drafts;
}

export default async function DraftsPage() {
  const drafts = await getDrafts();
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }

  const publishedPosts = drafts.filter(post => post.published);
  const unpublishedPosts = drafts.filter(post => !post.published);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="container">
        <div className="flex flex-row">
          <div className="basis-1/2 p-2">
            <div className="card">
              <div className="card-body rounded-lg border-solid border-slate-200 shadow-md hover:shadow-lg">
                <h3 className="bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text pb-8 pt-4 text-center text-xl font-medium tracking-tight text-transparent">
                  Published Post
                </h3>
                {publishedPosts.map(post => (
                  <Link href={`/p/${post.id}`} key={post.id}>
                    <div className="flex items-center justify-between rounded-lg py-3 hover:ring-1 hover:ring-slate-300">
                      <div className="space-y-1 px-2 py-2">
                        <p className="text-xl font-medium leading-none">
                          {post.title}
                        </p>
                        <p className="text-sm text-gray-500">{post.content}</p>
                        <p className="text-sm text-gray-500">
                          Published: {post.published?.valueOf().toString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="basis-1/2 p-2">
            <div className="card">
              <div className="card-body rounded-lg border-solid border-slate-200 shadow-md hover:shadow-lg">
                <h3 className="bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text pb-8 pt-4 text-center text-xl font-medium tracking-tight text-transparent">
                  Unpublished Post
                </h3>
                {unpublishedPosts.map(post => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between rounded-lg py-3 hover:ring-1 hover:ring-slate-300"
                  >
                    <Link href={`/p/${post.id}`}>
                      <div className="space-y-1 px-2 py-2">
                        <p className="text-xl font-medium leading-none">
                          {post.title}
                        </p>
                        <p className="text-wrap text-sm text-gray-500">
                          {post.content}
                        </p>
                        <p className="text-sm text-gray-500">
                          Published: {post.published?.valueOf().toString()}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
