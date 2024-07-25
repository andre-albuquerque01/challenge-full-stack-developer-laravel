import { Caveat, Inter, Roboto } from 'next/font/google'

export const fontBody = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const inter = Inter({ subsets: ['latin'] })

export const fontLogo = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-roboto',
  style: ['normal'],
})
