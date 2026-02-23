import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const siteUrl = 'https://icb033.github.io'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Infrastructure Consultant Bureau (ICB) | Founded by Supriyolal Bandyopadhyay',
    template: '%s | ICB - Infrastructure Consultant Bureau',
  },
  description: 'Infrastructure Consultant Bureau (ICB) — Engineering the frameworks that carry tomorrow. Specializing in bridges, roads, flyovers, and structural design. Founded & Led by Supriyolal Bandyopadhyay.',
  generator: 'Sohoom',
  keywords: [
    'Infrastructure Consultant Bureau',
    'ICB',
    'Supriyolal Bandyopadhyay',
    'infrastructure consulting',
    'civil engineering',
    'bridge design',
    'road infrastructure',
    'flyover construction',
    'structural engineering',
    'infrastructure engineering India',
    'bridges',
    'roads',
    'flyovers',
    'structural design',
  ],
  authors: [{ name: 'Supriyolal Bandyopadhyay' }],
  creator: 'Supriyolal Bandyopadhyay',
  publisher: 'Infrastructure Consultant Bureau',
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Infrastructure Consultant Bureau (ICB)',
    title: 'Infrastructure Consultant Bureau (ICB) | Founded by Supriyolal Bandyopadhyay',
    description: 'Engineering the frameworks that carry tomorrow. Specializing in bridges, roads, flyovers, and structural design. Founded & Led by Supriyolal Bandyopadhyay.',
  },
  twitter: {
    card: 'summary',
    title: 'Infrastructure Consultant Bureau (ICB)',
    description: 'Engineering the frameworks that carry tomorrow. Bridges · Roads · Flyovers · Structures. Founded by Supriyolal Bandyopadhyay.',
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
      }
    ],
    apple: '/apple-icon.png',
  },
  other: {
    'google-site-verification': '',
  },
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
