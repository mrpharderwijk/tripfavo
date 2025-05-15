import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to load native modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        'node-pre-gyp': false,
      }
    }
    return config
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
