import { PropsWithChildren } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function RentLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <NavBar
        minimal
        customAction={
          <Button variant="outline" size="md" rounded>
            Save & exit
          </Button>
        }
      />
      <main className="mt-20 pt-12 pb-25">{children}</main>
    </>
  )
}
