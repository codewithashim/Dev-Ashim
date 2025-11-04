import type { Metadata, Viewport } from 'next'
import { APP_METADATA } from '@/shared/constants'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: APP_METADATA.title,
    template: `%s | ${APP_METADATA.author}`,
  },
  description: APP_METADATA.description,
  keywords: APP_METADATA.keywords,
  authors: [{ name: APP_METADATA.author, url: APP_METADATA.siteUrl }],
  creator: APP_METADATA.author,
  publisher: APP_METADATA.author,
  metadataBase: new URL(APP_METADATA.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_METADATA.siteUrl,
    title: APP_METADATA.title,
    description: APP_METADATA.description,
    siteName: APP_METADATA.title,
    images: [
      {
        url: APP_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: APP_METADATA.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_METADATA.title,
    description: APP_METADATA.description,
    images: [APP_METADATA.ogImage],
    creator: '@ashimrudrapaul',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f14' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}

