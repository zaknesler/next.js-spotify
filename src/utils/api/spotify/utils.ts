import { formatCookie } from '../..'
import { COOKIE_KEYS } from './constants'

export const formatAuthCookies = (data: {
  access_token?: string
  refresh_token?: string
  scope?: string
  state?: string
  expires_in?: number
}) =>
  [
    formatCookie(COOKIE_KEYS.ACCESS_TOKEN, data.access_token),
    formatCookie(COOKIE_KEYS.REFRESH_TOKEN, data.refresh_token),
    formatCookie(COOKIE_KEYS.SCOPE, data.scope),
    formatCookie(COOKIE_KEYS.STATE, data.state),
    formatCookie(
      COOKIE_KEYS.EXPIRES_AT,
      String(Math.floor(new Date().valueOf() / 1000) + data.expires_in),
    ),
  ].filter(Boolean)

export const isAccessTokenExpired = token =>
  new Date().valueOf() >= token.valueOf()
