import './globals.css'
import '@/app/styles/dom.css'
import '@/app/styles/dom.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/_navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} _navbar bg-slate-100 text-slate-100 container mx-auto`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
