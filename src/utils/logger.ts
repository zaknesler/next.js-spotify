import * as Sentry from '@sentry/nextjs'
import { severityLevelFromString } from '@sentry/utils'

const LOG_LEVELS = {
  FATAL: 'fatal',
  CRITICAL: 'critical',
  ERROR: 'error',
  WARNING: 'warning',
  LOG: 'log',
  INFO: 'info',
  DEBUG: 'debug',
}

export const debug = (message: string) => console.log(message)

export const log = (message: string) => {
  console.log(message)
  Sentry.captureMessage(message, severityLevelFromString(LOG_LEVELS.LOG))
}

export const warn = (message: string) => {
  console.warn(message)
  Sentry.captureMessage(message, severityLevelFromString(LOG_LEVELS.WARNING))
}

export const error = (message: string) => {
  console.error(message)
  Sentry.captureMessage(message, severityLevelFromString(LOG_LEVELS.ERROR))
}
