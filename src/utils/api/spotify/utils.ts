import { serialize } from 'cookie'
import { COOKIE_KEYS } from './constants'

type AuthCookies = {
  access_token?: string
  refresh_token?: string
  scope?: string
  state?: string
  expires_in?: number
}

export const formatAuthCookies = (data: AuthCookies) => {
  const cookieOptions = { path: '/' }
  return [
    serialize(COOKIE_KEYS.ACCESS_TOKEN, data.access_token, cookieOptions),
    serialize(COOKIE_KEYS.REFRESH_TOKEN, data.refresh_token, cookieOptions),
    serialize(COOKIE_KEYS.SCOPE, data.scope, cookieOptions),
    serialize(COOKIE_KEYS.STATE, data.state, cookieOptions),
    serialize(
      COOKIE_KEYS.EXPIRES_AT,
      String(Math.floor(new Date().valueOf() / 1000) + data.expires_in),
      cookieOptions,
    ),
  ]
}
