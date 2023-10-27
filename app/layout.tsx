// custom css
import './globals.css'
import '@/app/styles/dom.css'

// react related imports
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/_navbar'
import NextAuthSessionProvider from './api/auth/[...nextauth]/_session_provider'
import ToastContainer from './components/toasts/_toast_group_container'
import { AppContext } from './(contexts)/app_context'
import { TOAST_POSITION } from './(globals)/global'
import { ToastMainContainer } from './components/toasts/_toast_main_container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login App',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.className} _navbar bg-slate-100 text-zinc-950 container mx-auto`}>
        <NextAuthSessionProvider>
          <AppContext>
            {/* TOASTS */}
            <ToastMainContainer />

            {/* NAVBAR */}
            <Navbar />

            {/* CHILDREN */}
            {children}
          </AppContext>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
