import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();

  const { title, content } = body;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session.user.email } },
    },
  });

  return NextResponse.json(result);
};

export const DELETE = async (req: Request) => {
  const body = await req.json();
  const { id } = body;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const result = await prisma.post.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(result);
};
