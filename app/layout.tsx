import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth'
import { PageLoaderProvider } from '@/components/page-loader'
import { SWRProvider } from '@/lib/swr-config'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harbours360 — Africa\'s Maritime & Industrial Asset Marketplace',
  description: 'Africa\'s premier B2B marketplace for high-value maritime and industrial assets. Buy and sell verified vessels, offshore equipment, and industrial machinery with confidence.',
  generator: 'Harbours360',
  keywords: ['maritime', 'industrial assets', 'B2B marketplace', 'Africa', 'vessels', 'offshore equipment'],
  icons: {
    icon: [
      { url: '/favicon.ico',           sizes: 'any' },
      { url: '/favicon-16x16.png',     sizes: '16x16', type: 'image/png' },
      { url: '/icon-light-32x32.png',  sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',   sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0F2A44',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <SWRProvider>
          <AuthProvider>
            <PageLoaderProvider>
              {children}
            </PageLoaderProvider>
          </AuthProvider>
        </SWRProvider>
      </body>
    </html>
  )
}
