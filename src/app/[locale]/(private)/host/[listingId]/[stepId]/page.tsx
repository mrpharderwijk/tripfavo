'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { HostFooter } from '@/features/host/components/host-footer/host-footer'
import { HostFunnel } from '@/features/host/components/host-funnel/host-funnel'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { getRoutePathByRouteName } from '@/utils/get-route'

export default function StepPage() {
  const router = useRouter()
  const tCommon = useTranslations('common')
  const fullRoutePath = getRoutePathByRouteName('myListings')

  function handleOnClick() {
    if (!fullRoutePath) {
      return null
    }

    router.push(fullRoutePath)
  }

  useEffect(() => {
    router.prefetch(fullRoutePath)
  }, [router, fullRoutePath])

  return (
    <>
      <NavBar
        minimal
        customActionLabel={tCommon('forms.saveAndExit')}
        customActionOnClick={handleOnClick}
        fixed={false}
      />
      <main className="pt-12 pb-32 md:pt-12 md:pb-25">
        <HostFunnel />
        <HostFooter />
      </main>
    </>
  )
}
