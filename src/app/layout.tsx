import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { PropsWithChildren, ReactElement } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { LoginDialog } from '@/features/auth/login/components/login-dialog/login-dialog'
import { getCurrentUser } from '@/features/auth/server/actions/get-current-user'
import { SignUpDialog } from '@/features/auth/sign-up/sign-up-dialog/sign-up-dialog'
import { DialogContextProvider } from '@/features/nav-bar/providers/dialog-context-provider'
import { DropDownContextProvider } from '@/features/nav-bar/providers/drop-down-context-provider'
import { primaryFont } from '@/lib/fonts/main'
import { AppContextProvider } from '@/providers/app-context-provider/app-context-provider'
import { SWRProvider } from '@/providers/swr-provider/swr-provider'
import { isActionError } from '@/server/utils/error'
import { cn } from '@/utils/class-names'

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
  const bodyClassname = cn(primaryFont.variable, 'antialiased min-w-xs')

  return (
    <html lang={locale}>
      <body className={bodyClassname} suppressHydrationWarning>
        <SWRProvider>
          <NextIntlClientProvider>
            <AppContextProvider currentUser={currentUser}>
              <DropDownContextProvider>
                <DialogContextProvider>
                  {children}
                  <SignUpDialog />
                  <LoginDialog />
                </DialogContextProvider>
              </DropDownContextProvider>
            </AppContextProvider>
          </NextIntlClientProvider>
        </SWRProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
