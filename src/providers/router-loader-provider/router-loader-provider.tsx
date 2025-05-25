'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren, ReactElement, Suspense } from 'react'

import { AppLoader } from '@/components/molecules/app-loader/app-loader'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export function RouterLoaderProvider({
  children,
  isLoading,
}: PropsWithChildren<{ isLoading: boolean }>): ReactElement {
  const { enableAppLoading, disableAppLoading } = useAppContext()
  const pathname = usePathname()
  // const searchParams = useSearchParams()

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`
  //   enableAppLoading()

  //   return () => {
  //     disableAppLoading
  //   }
  // }, [pathname, searchParams])

  return <Suspense fallback={<AppLoader message={null} loading={isLoading} />}>{children}</Suspense>
}
