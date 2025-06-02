import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { getCurrentUser } from '@/actions/get-current-user'
import { DialogContextProvider } from '@/features/nav-bar/providers/dialog-context-provider'
import { DropDownContextProvider } from '@/features/nav-bar/providers/drop-down-context-provider'
import { primaryFont } from '@/lib/fonts/main'
import { AppContextProvider } from '@/providers/app-context-provider/app-context-provider'

export const metadata: Metadata = {
  title: 'TripFavo',
  description: 'TripFavo - Your gateway to the French Riviera',
}

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={`${primaryFont.variable} antialiased`} suppressHydrationWarning>
        <SpeedInsights />
        <AppContextProvider currentUser={currentUser}>
          <DropDownContextProvider>
            <DialogContextProvider>{children}</DialogContextProvider>
          </DropDownContextProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}
