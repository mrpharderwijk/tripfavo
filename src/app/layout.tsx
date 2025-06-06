import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { getCurrentUser } from '@/actions/get-current-user'
import { DialogContextProvider } from '@/features/nav-bar/providers/dialog-context-provider'
import { DropDownContextProvider } from '@/features/nav-bar/providers/drop-down-context-provider'
import { primaryFont } from '@/lib/fonts/main'
import { AppContextProvider } from '@/providers/app-context-provider/app-context-provider'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tripfavo.com'),
  title: {
    default: 'TripFavo',
    template: '%s | TripFavo',
  },
  description:
    'Plan your next vacation to the French Riviera √ Cheap prices √ Low service fees √ No commission √ Amazing experiences',
  keywords: ['travel', 'experiences', 'cotedazur', 'france', 'riviera', 'vacation', 'rental'],
  authors: [{ name: 'TripFavo' }],
  creator: 'TripFavo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'TripFavo',
    title: 'TripFavo',
    description:
      'Plan your next vacation to the French Riviera √ Cheap prices √ Low service fees √ No commission √ Amazing experiences',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TripFavo, your vacation rental in the French Riviera',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripFavo',
    description:
      'Plan your next vacation to the French Riviera √ Cheap prices √ Low service fees √ No commission √ Amazing experiences',
    images: ['/og-image.jpg'],
    creator: '@tripfavo',
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
}

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={`${primaryFont.variable} antialiased`} suppressHydrationWarning>
        <AppContextProvider currentUser={currentUser}>
          <DropDownContextProvider>
            <DialogContextProvider>{children}</DialogContextProvider>
          </DropDownContextProvider>
        </AppContextProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
