const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const createWithMakeswift = require('@makeswift/runtime/next/plugin')
const withMakeswift = createWithMakeswift()

module.exports = withBundleAnalyzer(
  withMakeswift({
    experimental: {
      esmExternals: false,
    },
    i18n: {
      locales: ['en-US', 'en-CA', 'fr-CA', 'es-MX'],
      defaultLocale: 'en-US',
      localeDetection: false,
    },
    images: {
      minimumCacheTTL: 3600 * 24 * 30,
      remotePatterns: [
        { hostname: 'cdn.media.amplience.net' },
        { hostname: 'ssl.cf1.rackcdn.com' },
        { hostname: 'images.ctfassets.net' },
        { hostname: 's3-us-east-2.amazonaws.com' },
        { hostname: 'cdn.pixabay.com' },
        { hostname: 'pandora-cpd.imgix.net' },
        { hostname: '**.rackcdn.com' },
        { hostname: 'c8.staticflickr.com' },
        { hostname: 'cdn11.bigcommerce.com' },
        { hostname: 'images.contentstack.io' },
      ],
    },
    reactStrictMode: true,
    redirects() {
      return [
        {
          source: '/login.php',
          has: [
            {
              type: 'query',
              key: 'action',
              value: 'create_account',
            },
          ],
          destination: '/account/register',
          permanent: true,
        },
        {
          source: '/login',
          destination: '/account/login',
          permanent: true,
        },
        {
          source: '/login.php',
          has: [
            {
              type: 'query',
              key: 'action',
              value: 'reset_password',
            },
          ],
          destination: '/account/forgot',
          permanent: true,
        },
        {
          source: '/login.php',
          destination: '/account/login',
          permanent: true,
        },
        {
          source: '/cart.php',
          destination: '/cart',
          permanent: true,
        },
      ]
    },
  })
)
