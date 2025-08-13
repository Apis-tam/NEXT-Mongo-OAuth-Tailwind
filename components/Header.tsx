'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="container mx-auto flex items-center justify-between px-4 py-4">
      <Link href="/" className="text-lg font-semibold">
        Demo
      </Link>

      <nav className="flex items-center gap-3">
        <Link href="/notes" className="hover:underline">
          Noties
        </Link>

        {status === 'loading' ? (
          <span className="text-sm muted">Loading...</span>
        ) : session ? (
          <div className="flex items-center gap-3">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
            ) : null}
            <span className="text-sm muted">{session.user?.email}</span>
            <button className="btn btn-outline" onClick={() => signOut()}>
              Exit
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            Auth with Google
          </button>
        )}
      </nav>
    </header>
  )
}
