'use client';

import Link from 'next/link';

import { useNoties } from '@/hooks/useNoties';

export default function NotesClient() {
  const {
    setContent,
    content,
    createNote,
    creating,
    setTitle,
    loading,
    remove,
    title,
    notes
  } = useNoties();

  return (
    <div className="grid gap-6 md:grid-cols-[1fr]">
      <section className="card rounded-xl p-6">
        <h1 className="text-2xl font-semibold">My Noties</h1>
        <p className="muted mt-1 text-sm">THis Data private</p>

        <form onSubmit={createNote} className="mt-4 grid gap-3">
          <input
            className="input"
            placeholder="Title"
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
            <button className="btn btn-primary" disabled={creating}>
              {creating ? 'Creating...' : 'Create'}
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => {
                setTitle('');
                setContent('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>

      <section className="card rounded-xl p-6">
        <h2 className="text-xl font-semibold">List</h2>
        {loading ? (
          <p className="muted mt-2">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="muted mt-2">Empty yet.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {notes.map((n) => (
              <li
                key={n._id}
                className="rounded-md border border-slate-700 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{n.title}</div>
                    {n.content ? (
                      <div className="muted mt-1 text-sm whitespace-pre-line">
                        {n.content}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      className="btn btn-outline"
                      href={`/notes/${n._id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline"
                      onClick={() => remove(n._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
