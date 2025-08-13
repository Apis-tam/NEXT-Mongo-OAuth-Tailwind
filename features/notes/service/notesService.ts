import { Note } from '@/hooks/useNoties';

const BASE_NOTE_URL = '/api/notes';

type paramsNoteRequest = {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  id?: string;
  query?: Record<string, string>;
};

type requestNotePost<T> = {
  method: 'POST';
  params: paramsNoteRequest & { body: T };
};

type requestNotePatch<T> = {
  method: 'PATCH';
  params: paramsNoteRequest & { body: T; id: string };
};

type requestNoteOther = {
  method: 'GET' | 'DELETE';
  params?: paramsNoteRequest;
};

type requestNote<T> =
  | requestNotePost<T>
  | requestNotePatch<T>
  | requestNoteOther;

const createUrl = (
  url: string,
  params?: Omit<paramsNoteRequest, 'body' | 'headers'>
) => {
  if (params?.id) {
    url += `/${params.id}`;
  }
  if (params?.query) {
    const queryString = new URLSearchParams(params.query).toString();
    url += `?${queryString}`;
  }
  return url;
};

export const requestNote = async <T = {}>({
  method,
  params
}: requestNote<T>) => {
  const url = createUrl(BASE_NOTE_URL, params);
  const res = await fetch(url, {
    body: params && 'body' in params ? JSON.stringify(params.body) : undefined,

    method,
    headers: { 'Content-Type': 'application/json', ...params?.headers }
  });
  const data = await res.json();
  return data;
};

export const getAllNotesReq = async (signal?: AbortSignal) => {
  try {
    const data = await requestNote({ method: 'GET', params: { signal } });
    return data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error('Failed to fetch notes');
  }
};

export const getOneNoteReq = async (id: string) => {
  try {
    const data = await requestNote({ method: 'GET', params: { id } });
    return data;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw new Error('Failed to fetch notes');
  }
};

export const createNoteReq = async (title: string, content: string) => {
  try {
    const data = await requestNote<Pick<Note, 'content' | 'title'>>({
      method: 'POST',
      params: {
        body: { title, content }
      }
    });
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw new Error('Failed to create note');
  }
};

export const updateNoteReq = async (
  title: string,
  content: string,
  id: string
) => {
  try {
    const data = await requestNote<Pick<Note, 'content' | 'title'>>({
      method: 'PATCH',
      params: {
        id,
        body: { title, content }
      }
    });
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw new Error('Failed to create note');
  }
};

export const deleteNoteReq = async (id: string) => {
  try {
    const data = await requestNote({
      method: 'DELETE',
      params: { id }
    });
    return data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw new Error('Failed to delete note');
  }
};
