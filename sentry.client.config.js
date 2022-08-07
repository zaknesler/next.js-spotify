import * as Sentry from '@sentry/nextjs'
import { isProd } from './src/utils'

Sentry.init({
  dsn: isProd() ? process.env.NEXT_PUBLIC_SENTRY_DSN : null,
  tracesSampleRate: 1.0,
})
