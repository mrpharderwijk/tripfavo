import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/host/', '/account-settings/', '/guest/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
