import { parse } from 'cookie'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface UseCookies {
  <T>(): [T, Dispatch<SetStateAction<T>>]
}

export const useCookies: UseCookies = <T>() => {
  const [cookies, setCookies] = useState<T>(null)
  useEffect(() => setCookies(parse(document.cookie) as any as T), [])
  return [cookies, setCookies]
}
