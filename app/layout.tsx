import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'ICB | Engineering the Future',
  description: 'Engineering the frameworks that carry tomorrow. Designing bridges, roads, and infrastructure where precision meets permanence. Founded & Led by Supriyolal Bandyopadhyay.',
  generator: 'Sohoom',
  keywords: ['infrastructure', 'civil engineering', 'bridges', 'roads', 'flyovers', 'structural design', 'ICB'],
  authors: [{ name: 'Supriyolal Bandopadhyay' }],
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     }
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
