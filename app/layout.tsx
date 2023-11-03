// custom css
import './styles/globals.css'
import './styles/keyframes.css'
import './styles/dom.css'

// these next lines prevents the font awesome to load super big first then shrinks to the correct size
// basicallly prevents the css to load at the server-side 
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

// react related imports
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/_navbar'
import NextAuthSessionProvider from './api/auth/[...nextauth]/_session_provider'
import { AppContext } from './(contexts)/app_context'
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
            { children }
          </AppContext>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
