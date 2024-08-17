import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// API untuk menangani publish post berdasarkan id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  try {
    // Update post untuk menjadi published
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: false },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to publish the post' },
      { status: 500 }
    );
  }
}
