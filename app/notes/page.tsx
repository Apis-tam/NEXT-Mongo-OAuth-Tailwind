import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import NotesClient from '@/features/notes/NotesClient';

export default async function NotesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  return <NotesClient />;
}
