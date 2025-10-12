import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { PlayerProvider } from '@/contexts/PlayerContext'
import ConditionalComponents from '@/components/ConditionalComponents'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'NRG Radio Uganda - 106.5 FM | The Number One Name in Music',
    template: '%s | NRG Radio Uganda'
  },
  description: 'NRG Radio Uganda 106.5 FM - The Number One Name in Music. Live from Nakasero, Kampala. Listen to the best music, news, and entertainment in Uganda. Tune in to NRG Radio for 24/7 music and shows.',
  keywords: [
    'NRG Radio',
    'NRG Radio Uganda', 
    'NRG Radio 106.5',
    'NRG 106.5 FM',
    'radio uganda',
    'uganda radio',
    'kampala radio',
    'music radio uganda',
    'live radio uganda',
    'entertainment radio',
    '106.5 FM',
    'nakasero radio',
    'uganda music',
    'african music',
    'radio station uganda'
  ],
  authors: [{ name: 'NRG Radio Uganda' }],
  creator: 'NRG Radio Uganda',
  publisher: 'NRG Radio Uganda',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL('https://nrgug-website.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: 'https://nrgug-website.vercel.app',
    siteName: 'NRG Radio Uganda',
    title: 'NRG Radio Uganda - 106.5 FM | The Number One Name in Music',
    description: 'NRG Radio Uganda 106.5 FM - The Number One Name in Music. Live from Nakasero, Kampala. Listen to the best music, news, and entertainment in Uganda.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NRG Radio Uganda - 106.5 FM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRG Radio Uganda - 106.5 FM | The Number One Name in Music',
    description: 'NRG Radio Uganda 106.5 FM - The Number One Name in Music. Live from Nakasero, Kampala.',
    images: ['/og-image.jpg'],
    creator: '@NRGRadioUganda',
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RadioStation",
              "name": "NRG Radio Uganda",
              "alternateName": ["NRG Radio", "NRG 106.5", "NRG Radio 106.5 FM"],
              "description": "The Number One Name in Music - Live from Nakasero, Kampala, Uganda",
              "url": "https://nrgug-website.vercel.app",
              "logo": "https://nrgug-website.vercel.app/nrg-logo.webp",
              "image": "https://nrgug-website.vercel.app/og-image.jpg",
              "foundingDate": "2020",
              "areaServed": {
                "@type": "Country",
                "name": "Uganda"
              },
              "broadcastFrequency": "106.5 FM",
              "broadcastTimezone": "Africa/Kampala",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nakasero",
                "addressLocality": "Kampala",
                "addressCountry": "UG"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+256-XXX-XXXXXX",
                "contactType": "customer service",
                "areaServed": "UG",
                "availableLanguage": ["English", "Luganda"]
              },
              "sameAs": [
                "https://www.facebook.com/NRGRadioUganda",
                "https://www.twitter.com/NRGRadioUganda",
                "https://www.instagram.com/NRGRadioUganda"
              ],
              "genre": ["Music", "Entertainment", "News", "Talk"],
              "broadcastArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 0.3476,
                  "longitude": 32.5825
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans relative bg-black text-white`} suppressHydrationWarning>
        <PlayerProvider>
          {children}
          <ConditionalComponents />
        </PlayerProvider>
        <Analytics />
      </body>
    </html>
  )
}