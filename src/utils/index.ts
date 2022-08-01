import { serialize } from 'cookie'
import type { CookieSerializeOptions } from 'next/dist/server/web/types'

export const formatCookie = (
  name: string,
  value: string,
  options: CookieSerializeOptions = {},
): string | null => {
  if (!value) return null
  return serialize(name, value, { path: '/', ...options })
}
