import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { PlayerProvider } from '@/contexts/PlayerContext'
import PlayerWrapper from '@/components/PlayerWrapper'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'NRG Radio Uganda',
  description: 'The Number one name in music - Live from Nakasero, Kampala',
  keywords: 'radio, music, uganda, kampala, nrg, 106.5, entertainment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className={`${inter.variable} font-sans relative bg-black text-white`} suppressHydrationWarning>
        <PlayerProvider>
          {children}
          <PlayerWrapper />
        </PlayerProvider>
        <Analytics />
      </body>
    </html>
  )
}