'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useCallback } from 'react'

import { Locale } from '@/i18n/config'
import {
  getLocalizedRoutePathByRouteName,
  translatePathname,
} from '@/utils/get-route'

type UseLocalizedNavigationReturn = {
  locale: Locale
  getLocalizedPath: (routeName: string, exact?: boolean) => string
  translateCurrentPath: (targetLocale: Locale) => string
  navigateToLocalizedPath: (routeName: string, exact?: boolean) => void
  navigateToLocalizedProperty: (propertyId: string) => void
}

export function useLocalizedNavigation(): UseLocalizedNavigationReturn {
  const locale = useLocale() as Locale
  const router = useRouter()

  const getLocalizedPath = useCallback(
    (routeName: string, exact = false): string => {
      return getLocalizedRoutePathByRouteName(routeName, locale, exact)
    },
    [locale],
  )

  const translateCurrentPath = useCallback(
    (targetLocale: Locale): string => {
      if (typeof window === 'undefined') {
        return ''
      }
      const currentPathname = window.location.pathname
      return translatePathname(currentPathname, locale, targetLocale)
    },
    [locale],
  )

  const navigateToLocalizedPath = useCallback(
    (routeName: string, exact = false): void => {
      const localizedPath = getLocalizedPath(routeName, exact)
      if (localizedPath) {
        router.push(localizedPath)
      }
    },
    [getLocalizedPath, router],
  )

  const navigateToLocalizedProperty = useCallback(
    (propertyId: string): void => {
      const localizedPropertyPath = getLocalizedPath('property')
      router.push(`${localizedPropertyPath}/${propertyId}`)
    },
    [getLocalizedPath, router],
  )

  return {
    locale,
    getLocalizedPath,
    translateCurrentPath,
    navigateToLocalizedPath,
    navigateToLocalizedProperty,
  }
}
