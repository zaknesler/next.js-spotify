import { serialize } from 'cookie'

export const formatCookie = (name: string, value: string): string | null => {
  if (!value) return null
  return serialize(name, value, { path: '/' })
}
