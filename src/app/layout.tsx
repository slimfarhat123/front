import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Foyer Management',
  description: 'Manage reservations and students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">Foyer Management</Link>
              <ul className="flex space-x-4">
                <li><Link href="/reservations" className="hover:text-gray-300">Reservations</Link></li>
                <li><Link href="/etudiants" className="hover:text-gray-300">Students</Link></li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
              &copy; 2024 Foyer Management. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}