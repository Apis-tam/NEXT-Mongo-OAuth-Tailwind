import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Next.js + Mongo + Google OAuth',
  description: 'Starter with CRUD, MongoDB and Google SSO'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
