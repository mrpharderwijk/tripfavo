import { RouteObject, routes } from '@/constants/routes'
import { Locale } from '@/i18n/config'

export function getRoutePathByRouteName(
  routeName: string,
  exact = false,
): string {
  // First check if it's a parent route
  if (routes[routeName]) {
    const route = routes[routeName]
    const hasChildren = !!Object.keys(route.children || {}).length

    if (exact || (!exact && !hasChildren)) {
      return route.path
    }

    if (!exact && hasChildren) {
      const defaultChild = Object.values(route.children || {}).find(
        (child) => child.default,
      )
      return defaultChild ? `${route.path}${defaultChild.path}` : route.path
    }
  }

  // If not found as parent, check if it's a child route
  for (const [_, parentRoute] of Object.entries(routes)) {
    if (parentRoute.children) {
      for (const [childKey, childRoute] of Object.entries(
        parentRoute.children,
      )) {
        if (childKey === routeName) {
          return `${parentRoute.path}${childRoute.path}`
        }
      }
    }
  }

  return ''
}

export function getLocalizedRoutePathByRouteName(
  routeName: string,
  locale: Locale,
  exact = false,
): string {
  // First check if it's a parent route
  if (routes[routeName]) {
    const route = routes[routeName]
    const hasChildren = !!Object.keys(route.children || {}).length

    if (exact || (!exact && !hasChildren)) {
      return route.localizedPaths?.[locale] || route.path
    }

    if (!exact && hasChildren) {
      const defaultChild = Object.values(route.children || {}).find(
        (child) => child.default,
      )
      if (defaultChild) {
        const localizedParentPath = route.localizedPaths?.[locale] || route.path
        const localizedChildPath =
          defaultChild.localizedPaths?.[locale] || defaultChild.path
        return `${localizedParentPath}${localizedChildPath}`
      }
      return route.localizedPaths?.[locale] || route.path
    }
  }

  // If not found as parent, check if it's a child route
  for (const [_, parentRoute] of Object.entries(routes)) {
    if (parentRoute.children) {
      for (const [childKey, childRoute] of Object.entries(
        parentRoute.children,
      )) {
        if (childKey === routeName) {
          const localizedParentPath =
            parentRoute.localizedPaths?.[locale] || parentRoute.path
          const localizedChildPath =
            childRoute.localizedPaths?.[locale] || childRoute.path
          return `${localizedParentPath}${localizedChildPath}`
        }
      }
    }
  }

  return ''
}

export function translatePathname(
  pathname: string,
  fromLocale: Locale,
  toLocale: Locale,
): string {
  if (fromLocale === toLocale) {
    return pathname
  }

  // Handle root path
  if (pathname === '/') {
    return '/'
  }

  // Split pathname into segments
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    return pathname
  }

  const firstSegment = segments[0]

  // Find matching route by comparing paths
  for (const [routeKey, route] of Object.entries(routes)) {
    // Check if this is a parent route match
    const routePathSegments = route.path.split('/').filter(Boolean)
    const routeFirstSegment = routePathSegments[0]

    if (routeFirstSegment === firstSegment) {
      // Get the localized path for the target locale
      const localizedPath = route.localizedPaths?.[toLocale] || route.path
      const localizedPathSegments = localizedPath.split('/').filter(Boolean)
      const localizedFirstSegment = localizedPathSegments[0]

      // If there are no children or this is an exact match
      if (!route.children || segments.length === 1) {
        return `/${localizedFirstSegment}`
      }

      // Handle child routes
      if (route.children && segments.length > 1) {
        const remainingSegments = segments.slice(1)

        // Find matching child route
        for (const [childKey, childRoute] of Object.entries(route.children)) {
          const childPathSegments = childRoute.path.split('/').filter(Boolean)

          // Check if the remaining segments match this child route
          if (remainingSegments.length >= childPathSegments.length) {
            const matches = childPathSegments.every((segment, index) => {
              // Handle dynamic parameters (segments starting with ':')
              if (segment.startsWith(':')) {
                return true
              }
              return segment === remainingSegments[index]
            })

            if (matches) {
              const localizedChildPath =
                childRoute.localizedPaths?.[toLocale] || childRoute.path
              const localizedChildSegments = localizedChildPath
                .split('/')
                .filter(Boolean)

              // Replace the first segment with the localized version
              const translatedSegments = [
                localizedFirstSegment,
                ...localizedChildSegments,
              ]

              // Add any remaining dynamic segments
              const dynamicSegments = remainingSegments.slice(
                childPathSegments.length,
              )
              translatedSegments.push(...dynamicSegments)

              return `/${translatedSegments.join('/')}`
            }
          }
        }
      }
    }
  }

  // If no match found, return original pathname
  return pathname
}

export function getRouteNameByRoutePath(
  routePath: string,
  exact = true,
): string {
  const routeSegments = routePath.split('/').filter(Boolean)
  const firstSegment = routeSegments[0]
  const lastSegment = routeSegments[routeSegments.length - 1]

  // Handle root path
  if (routePath === '/') {
    return 'home'
  }

  // Find matching route by comparing paths
  for (const [routeKey, route] of Object.entries(routes)) {
    // Check if this is a parent route match
    if (route.path === `/${firstSegment}`) {
      // If exact is false, return the parent route key
      if (!exact) {
        return routeKey
      }

      // If exact is true and there are no more segments, return the parent route key
      if (routeSegments.length === 1) {
        return routeKey
      }

      // If exact is true and there are more segments, check children
      if (route.children) {
        for (const [childKey, child] of Object.entries(route.children)) {
          // Split the child path into segments and compare with the last segment
          const childPathSegments = child.path.split('/').filter(Boolean)
          const lastChildSegment =
            childPathSegments[childPathSegments.length - 1]

          // If the last segment matches exactly or is a dynamic parameter (starts with ':')
          if (
            lastChildSegment === lastSegment ||
            lastChildSegment.startsWith(':')
          ) {
            return childKey
          }
        }
      }
    }
  }

  return ''
}

export function isCurrentRoute(pathName: string, routeName: string): boolean {
  const currentRoute = getRouteNameByRoutePath(pathName)
  return currentRoute === routeName
}

export function getRouteObjectByRouteName(
  routeName: string,
): RouteObject | null {
  // Find matching route by comparing paths
  for (const [routeKey, route] of Object.entries(routes)) {
    // Check if this is a parent route match
    if (routeKey === routeName) {
      return route
    }

    if (route.children) {
      for (const [childRouteKey, childRoute] of Object.entries(
        route.children,
      )) {
        if (childRouteKey === routeName) {
          return childRoute
        }
      }
    }
  }

  return null
}
