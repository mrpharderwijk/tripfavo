import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { PropsWithChildren, ReactElement } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { getCurrentUser } from '@/features/auth/server/actions/get-current-user'
import { DialogContextProvider } from '@/features/nav-bar/providers/dialog-context-provider'
import { DropDownContextProvider } from '@/features/nav-bar/providers/drop-down-context-provider'
import { primaryFont } from '@/lib/fonts/main'
import { AppContextProvider } from '@/providers/app-context-provider/app-context-provider'
import { isActionError } from '@/server/utils/error'

export const metadata: Metadata = {
  title: 'TripFavo',
  description: 'TripFavo - Your gateway to the French Riviera',
}

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>): Promise<ReactElement> {
  const locale = await getLocale()
  const currentUserResponse = await getCurrentUser()
  const currentUser = isActionError(currentUserResponse)
    ? null
    : (currentUserResponse?.data ?? null)

  return (
    <html lang={locale}>
      <body
        className={`${primaryFont.variable} antialiased`}
        suppressHydrationWarning
      >
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
