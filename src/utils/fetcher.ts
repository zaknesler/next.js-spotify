import { error } from './logger'

export const fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<object | null | void> =>
  fetch(input, init).then(parseResponseAsJson).catch(error)

export const parseResponseAsJson = async (
  res: Response,
): Promise<object | null> => {
  const text = await res.text()
  if (!text.length) return null
  return JSON.parse(text)
}
