import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import EditNoteClient from '@/features/notes/EditNoteClient';

export default async function EditNotePage({
  params
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  return <EditNoteClient id={params.id} />;
}
