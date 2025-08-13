'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getOneNoteReq,
  updateNoteReq
} from '@/features/notes/service/notesService';

export default function EditNoteClient({ id }: { id: string }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await getOneNoteReq(id);

      if (res) {
        setTitle(res.title || '');
        setContent(res.content || '');
        setLoading(false);
      } else {
        router.push('/notes');
      }
    }
    load();
  }, [id]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    const res = await updateNoteReq(title, content, id);
    setSaving(false);
    if (res) {
      router.push('/notes');
    } else {
      alert('Error saving note');
    }
  }

  if (loading) {
    return <p className="muted">Loading...</p>;
  }

  return (
    <section className="card rounded-xl p-6">
      <h1 className="text-2xl font-semibold">Edit</h1>
      <form onSubmit={save} className="mt-4 grid gap-3">
        <input
          className="input"
          placeholder="Titles"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea"
          placeholder="Text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-3">
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => router.push('/notes')}
          >
            cancel
          </button>
        </div>
      </form>
    </section>
  );
}
