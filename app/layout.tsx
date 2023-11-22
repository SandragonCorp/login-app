// custom css
import './styles/globals.css'
import './styles/keyframes.css'
import './styles/dom.css'

// custom js
import './scripts/interaction_observer'

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
import { Footer } from './components/_footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login App',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {

  // @todo change classes esp. sizes because they are mobile-first styles 
  return (
    <html lang="en" className='w-full h-full font-mono'>
      <body className={`w-full h-full _navbar bg-slate-100 text-slate-800 ${inter.className}`}>
        <NextAuthSessionProvider>
          <AppContext>
            {/* TOASTS */}
            <ToastMainContainer />

            {/* NAVBAR */}
            <Navbar />

            {/* CHILDREN */}
            { children }

            <Footer />
          </AppContext>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}