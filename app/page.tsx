import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <section className="card rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold">Next.js + Mongo + Google OAuth</h1>
        <p className="muted mt-2">
          Easy Starter with App Router, TailwindCSS, CRUD by Notes and Google
          Login
        </p>
        <pre className="mt-4 rounded bg-gray-800 p-4">
          I can break HTML tags into components for regular React
        </pre>
        <div className="mt-6 flex gap-3">
          <Link className="btn btn-primary" href="/notes">
            Open Noties
          </Link>
          <a
            className="btn btn-outline"
            href="https://next-auth.js.org"
            target="_blank"
            rel="noreferrer"
          >
            Documentation NextAuth
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card rounded-xl p-6">
          <h2 className="text-xl font-semibold">Что внутри</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 muted">
            <li>Next.js App Router</li>
            <li>TailwindCSS</li>
            <li>Google OAuth via next-auth</li>
            <li>MongoDB via Mongoose</li>
            <li>API routes for CRUD</li>
          </ul>
        </div>
        <div className="card rounded-xl p-6">
          <h2 className="text-xl font-semibold">Fast start</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-6 muted">
            <li>Copy .env.example в .env.local and fill it</li>
            <li>npm install</li>
            <li>npm run dev</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
