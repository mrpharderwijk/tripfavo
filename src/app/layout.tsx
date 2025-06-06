import { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { getCurrentUser } from '@/actions/get-current-user'
import { DialogContextProvider } from '@/features/nav-bar/providers/dialog-context-provider'
import { DropDownContextProvider } from '@/features/nav-bar/providers/drop-down-context-provider'
import { primaryFont } from '@/lib/fonts/main'
import { AppContextProvider } from '@/providers/app-context-provider/app-context-provider'

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
