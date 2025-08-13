import { NextResponse } from 'next/dist/server/web/spec-extension/response';

export const apiErrors = {
  unauthorized: (message = 'Unauthorized') =>
    NextResponse.json({ error: message }, { status: 401 }),
  badRequest: (message = 'Bad Request') =>
    NextResponse.json({ error: message }, { status: 400 }),
  notFound: (message = 'Not Found') =>
    NextResponse.json({ error: message }, { status: 404 }),
  forbidden: (message = 'Forbidden') =>
    NextResponse.json({ error: message }, { status: 403 })
} as const;
