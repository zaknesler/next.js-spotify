const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co'],
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig({ ...nextConfig }, sentryWebpackPluginOptions)
