import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resume Builder',
  description: 'Created with Suraj',
  generator: 'Suraj',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
