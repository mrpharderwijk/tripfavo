import { RouteObject, routes } from '@/constants/routes'

export function getRoutePathByRouteName(routeName: string, exact = false): string {
  // First check if it's a parent route
  if (routes[routeName]) {
    const route = routes[routeName]
    const hasChildren = !!Object.keys(route.children || {}).length

    if (exact || (!exact && !hasChildren)) {
      return route.path
    }

    if (!exact && hasChildren) {
      const defaultChild = Object.values(route.children || {}).find((child) => child.default)
      return defaultChild ? `${route.path}${defaultChild.path}` : route.path
    }
  }

  // If not found as parent, check if it's a child route
  for (const [_, parentRoute] of Object.entries(routes)) {
    if (parentRoute.children) {
      for (const [childKey, childRoute] of Object.entries(parentRoute.children)) {
        if (childKey === routeName) {
          return `${parentRoute.path}${childRoute.path}`
        }
      }
    }
  }

  return ''
}

export function getRouteNameByRoutePath(routePath: string, exact = true): string {
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
          const lastChildSegment = childPathSegments[childPathSegments.length - 1]

          // If the last segment matches exactly or is a dynamic parameter (starts with ':')
          if (lastChildSegment === lastSegment || lastChildSegment.startsWith(':')) {
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

export function getRouteObjectByRouteName(routeName: string): RouteObject | null {
  // Find matching route by comparing paths
  for (const [routeKey, route] of Object.entries(routes)) {
    // Check if this is a parent route match
    if (routeKey === routeName) {
      return route
    }

    if (route.children) {
      for (const [childRouteKey, childRoute] of Object.entries(route.children)) {
        if (childRouteKey === routeName) {
          return childRoute
        }
      }
    }
  }

  return null
}
