import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectToDatabase } from '@/lib/mongodb';
import Note from '@/models/Note';
import { apiErrors } from './apiErrors';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiErrors.unauthorized();
  }

  await connectToDatabase();
  const notes = await Note.find({ userId: session.user.id }).sort({
    createdAt: -1
  });
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiErrors.unauthorized();
  }

  const body = (await req.json().catch(() => null)) as {
    title?: string;
    content?: string;
  } | null;
  if (!body?.title) {
    return apiErrors.badRequest('Title is required');
  }

  await connectToDatabase();
  const created = await Note.create({
    title: body.title,
    content: body.content || '',
    userId: session.user.id
  });

  return NextResponse.json(created, { status: 201 });
}
