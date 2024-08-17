'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePost: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="mt-10 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text pb-8 pt-4 text-center text-3xl font-medium tracking-tight text-transparent md:text-7xl dark:from-black dark:via-[#575757] dark:to-[#171717]">
        New Post
      </h1>
      <form onSubmit={submitData}>
        <div className="card">
          <div className="card-body rounded-lg border border-slate-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-900 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <label className="block text-sm font-medium leading-6">Title</label>
            <div className="mt-2">
              <input
                required
                className="block w-full rounded-md border-0 bg-transparent px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:ring-gray-700"
                autoFocus
                onChange={e => setTitle(e.target.value)}
                type="text"
                value={title}
              />
              <label className="my-4 block text-sm font-medium leading-6">
                Content
              </label>
              <textarea
                required
                className="block w-full rounded-md border-0 bg-transparent px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:ring-gray-700"
                cols={50}
                onChange={e => setContent(e.target.value)}
                rows={8}
                value={content}
              />
            </div>
            <input
              className="btn btn-ghost text-black dark:text-white"
              disabled={!content || !title}
              type="submit"
              value="Create"
            />
            <a
              className="btn hover:bg-red-200"
              href="/"
              onClick={() => router.push('/')}
            >
              Cancel
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
