import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectToDatabase } from '@/lib/mongodb';
import Note from '@/models/Note';
import mongoose from 'mongoose';
import { apiErrors } from '../apiErrors';

export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiErrors.unauthorized();
  }

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return apiErrors.badRequest('Invalid id');
  }

  await connectToDatabase();
  const note = await Note.findById(id);
  if (!note) return apiErrors.notFound();
  if (note.userId !== session.user.id) {
    return apiErrors.forbidden();
  }

  return NextResponse.json(note);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiErrors.unauthorized();
  }

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return apiErrors.badRequest('Invalid id');
  }

  const body = (await req.json().catch(() => null)) as {
    title?: string;
    content?: string;
  } | null;
  if (!body?.title) {
    return apiErrors.badRequest('Title is required');
  }

  await connectToDatabase();
  const note = await Note.findById(id);
  if (!note) return apiErrors.notFound();
  if (note.userId !== session.user.id) {
    return apiErrors.forbidden();
  }

  note.title = body.title;
  note.content = body.content || '';
  await note.save();

  return NextResponse.json(note);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiErrors.unauthorized();
  }

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return apiErrors.badRequest('Invalid id');
  }

  await connectToDatabase();
  const note = await Note.findById(id);
  if (!note) return apiErrors.notFound();
  if (note.userId !== session.user.id) {
    return apiErrors.forbidden();
  }

  await Note.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
