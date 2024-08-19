import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fungsi untuk menangani penghapusan postingan
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;

    // Hapus postingan dari database
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
