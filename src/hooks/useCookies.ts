import { parse } from 'cookie'
import { useEffect, useState } from 'react'

export const useCookies: {
  <T>(): { cookies: T | null; clearCookies: () => void }
} = <T>() => {
  const [cookies, setCookies] = useState<T | null>(null)
  const clearCookies = () => setCookies(null)
  useEffect(() => setCookies(parse(document.cookie) as any as T), [])
  return { cookies, clearCookies }
}
