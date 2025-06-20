'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect } from 'react'

import { Branding } from '@/components/molecules/branding/branding'
import { Button } from '@/components/molecules/buttons/button'
import { HostFooter } from '@/features/host/listings/host-listing-detail-funnel/components/host-footer/host-footer'
import { HostFunnel } from '@/features/host/listings/host-listing-detail-funnel/components/host-funnel/host-funnel'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function HostListingDetailFunnelPage(): ReactElement {
  const { startTransition } = useAppContext()
  const router = useRouter()
  const tCommon = useTranslations('common')
  const fullRoutePath = getRoutePathByRouteName('hostListings')

  function handleOnClickSave(): void {
    if (!fullRoutePath) {
      return
    }

    startTransition(() => {
      router.push(fullRoutePath)
    })
  }

  useEffect(() => {
    router.prefetch(fullRoutePath)
  }, [router, fullRoutePath])

  /**
   * TODO: should use appShell
   */
  return (
    <>
      <NavBar fixed={false}>
        <Branding disableLink />
        <Button variant="outline" size="md" rounded onClick={handleOnClickSave}>
          {tCommon('forms.saveAndExit')}
        </Button>
      </NavBar>

      <main className="pt-12 pb-32 md:pt-12 md:pb-25">
        <HostFunnel />
        <HostFooter />
      </main>
    </>
  )
}
