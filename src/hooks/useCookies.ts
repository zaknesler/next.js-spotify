import { parse } from 'cookie'
import { useEffect, useState } from 'react'

interface UseCookies {
  <T>(): T
}

export const useCookies: UseCookies = <T>() => {
  const [cookies, setCookies] = useState<T>(null)
  useEffect(() => setCookies(parse(document.cookie) as any as T), [])
  return cookies
}
