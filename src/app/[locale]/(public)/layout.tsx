import { PropsWithChildren } from 'react'

import { NavBar } from '@/features/nav-bar/nav-bar'

export default function HomeLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <NavBar />
      <main className="mt-20 pt-12 pb-25">{children}</main>
    </>
  )
}
