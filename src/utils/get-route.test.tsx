import { routes } from '@/constants/routes'
import { Locale } from '@/i18n/config'
import {
  getRouteNameByRoutePath,
  getRoutePathByRouteName,
  getLocalizedRoutePathByRouteName,
  translatePathname,
  isCurrentRoute,
} from '@/utils/get-route'

describe('getRoutePathByRouteName', () => {
  const cases = [
    {
      routeName: 'home',
      expected: routes.home.path,
    },
    {
      routeName: 'account',
      exact: true,
      expected: routes.account.path,
    },
    {
      routeName: 'account',
      exact: false,
      expected: `${routes?.account?.path}${routes?.account?.children?.personalInfo?.path}`,
    },
    {
      routeName: 'personalInfo',
      exact: false,
      expected: `${routes?.account?.path}${routes?.account?.children?.personalInfo?.path}`,
    },
    {
      routeName: 'host',
      exact: true,
      expected: routes?.host?.path,
    },
    {
      routeName: 'host',
      exact: false,
      expected: `${routes?.host?.path}${routes?.host?.children?.hostListings?.path}`,
    },
    {
      routeName: 'structure',
      exact: false,
      expected: `${routes?.host?.path}${routes?.host?.children?.structure?.path}`,
    },
    {
      routeName: 'floorPlan',
      exact: false,
      expected: `${routes?.host?.path}${routes?.host?.children?.floorPlan?.path}`,
    },
    {
      routeName: 'auth',
      exact: true,
      expected: routes?.auth?.path,
    },
    {
      routeName: 'auth',
      exact: false,
      expected: `${routes?.auth?.path}${routes?.auth?.children?.login?.path}`,
    },
    {
      routeName: 'signUp',
      exact: false,
      expected: `${routes?.auth?.path}${routes?.auth?.children?.signUp?.path}`,
    },
    {
      routeName: 'login',
      exact: false,
      expected: `${routes?.auth?.path}${routes?.auth?.children?.login?.path}`,
    },
  ]

  it.each(cases)(
    'Returns $expected for the $routeName route with exact=$exact',
    ({ routeName, exact, expected }) => {
      const result = getRoutePathByRouteName(routeName, exact)
      expect(result).toBe(expected)
    },
  )
})

describe('getLocalizedRoutePathByRouteName', () => {
  const cases = [
    {
      routeName: 'property',
      locale: 'en' as Locale,
      expected: '/property',
    },
    {
      routeName: 'property',
      locale: 'nl' as Locale,
      expected: '/verhuur',
    },
    {
      routeName: 'property',
      locale: 'fr' as Locale,
      expected: '/propriete',
    },
    {
      routeName: 'home',
      locale: 'nl' as Locale,
      expected: '/',
    },
  ]

  it.each(cases)(
    'Returns $expected for the $routeName route with locale $locale',
    ({ routeName, locale, expected }) => {
      const result = getLocalizedRoutePathByRouteName(routeName, locale)
      expect(result).toBe(expected)
    },
  )
})

describe('translatePathname', () => {
  const cases = [
    {
      pathname: '/property/123',
      fromLocale: 'en' as Locale,
      toLocale: 'nl' as Locale,
      expected: '/verhuur/123',
    },
    {
      pathname: '/verhuur/123',
      fromLocale: 'nl' as Locale,
      toLocale: 'en' as Locale,
      expected: '/property/123',
    },
    {
      pathname: '/property/123',
      fromLocale: 'en' as Locale,
      toLocale: 'fr' as Locale,
      expected: '/propriete/123',
    },
    {
      pathname: '/',
      fromLocale: 'en' as Locale,
      toLocale: 'nl' as Locale,
      expected: '/',
    },
    {
      pathname: '/host/123/structure',
      fromLocale: 'en' as Locale,
      toLocale: 'nl' as Locale,
      expected: '/host/123/structure', // No localized path defined, returns original
    },
  ]

  it.each(cases)(
    'Translates $pathname from $fromLocale to $toLocale as $expected',
    ({ pathname, fromLocale, toLocale, expected }) => {
      const result = translatePathname(pathname, fromLocale, toLocale)
      expect(result).toBe(expected)
    },
  )
})

describe('getRouteNameByRoutePath', () => {
  const cases = [
    {
      routePath: '/',
      expected: 'home',
    },
    {
      routePath: '/account-settings',
      expected: 'account',
    },
    {
      routePath: '/account-settings/personal-info',
      expected: 'personalInfo',
    },
    {
      routePath: '/account-settings/personal-info',
      exact: false,
      expected: 'account',
    },
    {
      routePath: '/host/123/structure',
      expected: 'structure',
    },
    {
      routePath: '/host/123/structure',
      exact: false,
      expected: 'host',
    },
    {
      routePath: '/host/123/floor-plan',
      expected: 'floorPlan',
    },
    {
      routePath: '/host/123/floor-plan',
      exact: false,
      expected: 'host',
    },
    {
      routePath: '/host/123/location',
      expected: 'location',
    },
    {
      routePath: '/host/666/location',
      exact: false,
      expected: 'host',
    },
    {
      routePath: '/auth/login',
      expected: 'login',
    },
    {
      routePath: '/auth/login',
      exact: false,
      expected: 'auth',
    },
    {
      routePath: '/auth/sign-up',
      expected: 'signUp',
    },
    {
      routePath: '/auth/sign-up',
      exact: false,
      expected: 'auth',
    },
  ]

  it.each(cases)(
    'Returns $expected for the $routePath route with exact=$exact',
    ({ routePath, exact, expected }) => {
      const result = getRouteNameByRoutePath(routePath, exact)
      expect(result).toBe(expected)
    },
  )
})

describe('isCurrentRoute', () => {
  const cases = [
    {
      pathName: '/',
      routeName: 'home',
      expected: true,
    },
    {
      pathName: '/account-settings',
      routeName: 'account',
      expected: true,
    },
    {
      pathName: '/account-settings/personal-info',
      routeName: 'personalInfo',
      expected: true,
    },
    {
      pathName: '/account-settings/personal-info',
      routeName: 'account',
      expected: false,
    },
    {
      pathName: '/host/ola/structure',
      routeName: 'structure',
      expected: true,
    },
    {
      pathName: '/host/bla/structure',
      routeName: 'host',
      expected: false,
    },
    {
      pathName: '/host/999/floor-plan',
      routeName: 'floorPlan',
      expected: true,
    },
    {
      pathName: '/host/666/floor-plan',
      routeName: 'host',
      expected: false,
    },
    {
      pathName: '/auth/login',
      routeName: 'login',
      expected: true,
    },
    {
      pathName: '/auth/login',
      routeName: 'auth',
      expected: false,
    },
    {
      pathName: '/auth/sign-up',
      routeName: 'signUp',
      expected: true,
    },
    {
      pathName: '/auth/sign-up',
      routeName: 'auth',
      expected: false,
    },
  ]

  it.each(cases)(
    'Returns $expected for the $routeName route with',
    ({ pathName, routeName, expected }) => {
      const result = isCurrentRoute(pathName, routeName)
      expect(result).toBe(expected)
    },
  )
})
