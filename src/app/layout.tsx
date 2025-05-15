import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { PropsWithChildren } from 'react'

import './globals.css'
import { getCurrentUser } from '@/actions/get-current-user'
import { AppContextProvider } from '@/providers/app-context-provider/app-context-provider'

export const metadata: Metadata = {
  title: 'Riviera BnB',
  description: 'Riviera BnB - Your gateway to the French Riviera',
}

const font = Plus_Jakarta_Sans({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        <AppContextProvider currentUser={currentUser}>{children}</AppContextProvider>
      </body>
    </html>
  )
}
