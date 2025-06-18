/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 */

import { MetadataRoute } from 'next'

import { locales } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.tripfavo.com'

  // Base routes that don't require dynamic parameters
  const baseRoutes = [
    {
      url: '/',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: '/auth',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: '/reservation',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Generate sitemap entries for each locale and route
  const sitemapEntries = locales.flatMap((locale) =>
    baseRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route.url}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.url}`,
          nl: `${baseUrl}/nl${route.url}`,
        },
      },
    })),
  )

  return sitemapEntries
}
