import { serialize } from 'cookie'
import dayjs from 'dayjs'
import type { CookieSerializeOptions } from 'next/dist/server/web/types'

export const isEnv = (env: 'production' | 'development') =>
  process.env.NODE_ENV === env

export const isProd = () => isEnv('production')

export const formatCookie = (
  name: string,
  value?: string | null,
  options: CookieSerializeOptions = {},
): string | null =>
  value
    ? serialize(name, value, {
        path: '/',
        expires: dayjs().add(1, 'year').toDate(),
        ...options,
      })
    : null

export const generateToken = () => Math.random().toString(36).slice(2)
