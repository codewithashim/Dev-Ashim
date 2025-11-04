import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ashim Rudra Paul - Software Engineer',
  description: 'Portfolio website of Ashim Rudra Paul - Full Stack Developer & DevOps Engineer',
  keywords: ['Ashim Rudra Paul', 'Software Engineer', 'Full Stack Developer', 'DevOps', 'Portfolio'],
  authors: [{ name: 'Ashim Rudra Paul' }],
  creator: 'Ashim Rudra Paul',
  openGraph: {
    title: 'Ashim Rudra Paul - Software Engineer',
    description: 'Full Stack Developer & DevOps Engineer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}

