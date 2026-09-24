import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://progler.vercel.app'),
  title: {
    default: 'Progler — Search that understands',
    template: '%s | Progler',
  },
  description: 'Progler is a fast, thoughtful search engine for the modern web.',
  keywords: ['Progler', 'search engine', 'web search', 'AI search'],
  applicationName: 'Progler',
  generator: 'v0.app',
  openGraph: {
    title: 'Progler — Search that understands',
    description: 'A fast, thoughtful search engine for the modern web.',
    type: 'website',
    siteName: 'Progler',
  },
  twitter: {
    card: 'summary',
    title: 'Progler — Search that understands',
    description: 'A fast, thoughtful search engine for the modern web.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
