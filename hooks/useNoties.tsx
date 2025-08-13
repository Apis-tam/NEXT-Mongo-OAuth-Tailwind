'use client';
import {
  createNoteReq,
  deleteNoteReq,
  getAllNotesReq
} from '@/features/notes/service/notesService';

import { useState, useEffect } from 'react';

export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const useNoties = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creating, setCreating] = useState(false);

  async function load(signal?: AbortSignal) {
    setLoading(true);
    const res = await getAllNotesReq(signal);
    if (res) {
      setNotes(res);
    }
    setLoading(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  async function createNote(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setCreating(true);
    try {
      const res = await createNoteReq(title, content);
      if (res) {
        setCreating(false);
        setTitle('');
        setContent('');
        await load();
      }
    } catch (error: Error | any) {
      alert(error.message || 'Error creating note');
    }
  }

  async function remove(id: string) {
    if (!confirm('Remove Noties?')) return;

    const res = await deleteNoteReq(id);
    if (res) {
      setNotes(notes.filter((n) => n._id !== id));
    } else {
      alert('Error removing note');
    }
  }

  return {
    notes,
    loading,
    title,
    setTitle,
    content,
    setContent,
    creating,
    createNote,
    remove
  };
};
