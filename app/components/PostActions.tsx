'use client'; // Menandakan bahwa ini adalah Client Component

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PostActionsProps {
  post: {
    id: string;
    published: boolean;
    author: {
      email: string | null;
    } | null;
  };
}

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post.author?.email;

  // Fungsi untuk mempublish post
  async function publishPost() {
    try {
      const res = await fetch(`/api/post/publish/${post.id}`, {
        method: 'PUT',
      });
      if (res.ok) {
        router.refresh(); // Refresh halaman setelah publish
      } else {
        console.error('Failed to publish post');
      }
    } catch (error) {
      console.error('Failed to publish post', error);
    }
  }

  async function unpublishPost() {
    try {
      const res = await fetch(`/api/post/unpublish/${post.id}`, {
        method: 'PUT',
      });
      if (res.ok) {
        router.refresh();
      } else {
        console.error('Failed to publish post');
      }
    } catch (error) {
      console.error('Failed to publish post', error);
    }
  }

  // Fungsi untuk menghapus post
  async function deletePost() {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/post/delete/${post.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  }

  return (
    <div>
      {!post.published && userHasValidSession && postBelongsToUser && (
        <button
          className="btn btn-ghost mx-2 mt-4 hover:bg-green-400"
          onClick={publishPost}
        >
          Publish
        </button>
      )}
      {post.published && userHasValidSession && postBelongsToUser && (
        <button
          className="btn btn-ghost mx-2 mt-4 hover:bg-blue-400"
          onClick={unpublishPost}
        >
          Unpublish
        </button>
      )}
      {userHasValidSession && postBelongsToUser && (
        <button
          className="btn btn-ghost mx-2 mt-4 hover:bg-red-400"
          onClick={deletePost}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PostActions;
