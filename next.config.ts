import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 's1djf6p9fa.ufs.sh',
        port: '',
        search: '',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(
  withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig),
)
