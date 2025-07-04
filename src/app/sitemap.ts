/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 */

import { MetadataRoute } from 'next'
import { cookies } from 'next/headers'

import { getPublishedProperties } from '@/features/properties/server/actions/get-properties'
import { isActionError } from '@/server/utils/error'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('NEXT_LOCALE')
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.tripfavo.com'

  // Base routes that don't require dynamic parameters
  const baseRoutes = [
    {
      url: '/',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Get all published properties
  const propertiesResponse = await getPublishedProperties()
  const properties = isActionError(propertiesResponse)
    ? []
    : (propertiesResponse?.data ?? [])

  // Generate sitemap entries for base routes
  const baseSitemapEntries = baseRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Generate sitemap entries for properties
  const propertySitemapEntries = properties.map((property) => ({
    url: `${baseUrl}/property/${property.id}`,
    lastModified: property.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...baseSitemapEntries, ...propertySitemapEntries]
}
