'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { HostFooter } from '@/features/host/components/host-footer/host-footer'
import { HostFunnel } from '@/features/host/components/host-funnel/host-funnel'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { getRoutePathByRouteName } from '@/utils/get-route'

export default function StepPage() {
  const router = useRouter()
  const tCommon = useTranslations('common')

  function handleOnClick() {
    const fullRoutePath = getRoutePathByRouteName('myListings')
    if (!fullRoutePath) {
      return null
    }

    router.push(fullRoutePath)
  }

  return (
    <>
      <NavBar
        minimal
        customActionLabel={tCommon('forms.saveAndExit')}
        customActionOnClick={handleOnClick}
      />
      <main className="mt-5 pt-5 pb-32 md:mt-20 md:pt-12 md:pb-25">
        <HostFunnel />
        <HostFooter />
      </main>
    </>
  )
}
