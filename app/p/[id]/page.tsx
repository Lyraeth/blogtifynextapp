import prisma from '../../lib/prisma';
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  let title = post.title;

  if (!post.published) {
    title = `${title} (Draft)`;
  }

  return (
    <main className="relative flex flex-col items-center justify-center">
      <div key={post.id} className="space-y-1">
        <h1 className="bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text pb-8 pt-4 text-center text-4xl font-medium tracking-tight dark:from-black dark:via-[#575757] dark:to-[#171717] dark:text-slate-300">
          {title}
          <p className="mt-3 text-xs text-gray-700">
            Author: {post.author?.name || 'Unknown'}
          </p>
        </h1>
        <p className="text-md mx-auto text-pretty dark:text-gray-400">
          {post.content}
        </p>
      </div>
    </main>
  );
}
