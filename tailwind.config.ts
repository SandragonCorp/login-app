import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'duration-500',
    'duration-1000',
    'duration-2000',
    '!duration-0',
    'transition-left',
    '!left-full',
    '!-left-full',
    '!right-full',
    '!-right-full',
    '!opacity-100',
    '!opacity-0',
    '!z-10'
  ],
  theme: {
    extend: {
      transitionDuration: {
        '2000': '2000ms' 
      },
      transitionProperty: {
        'left': 'left'
      }
    },
  },
  plugins: [],
}
export default config
