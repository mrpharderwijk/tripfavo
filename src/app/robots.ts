import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/property', '/property/:id'],
      disallow: [
        '/account-settings/',
        '/host/',
        '/guest/',
        '/reservation/',
        '/api/',
      ],
    },
  }
}
