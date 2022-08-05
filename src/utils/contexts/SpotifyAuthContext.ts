import { createContext } from 'react'
import type { SpotifyContextData } from '../api/spotify/types'

export const SpotifyAuthContext = createContext<SpotifyContextData>({
  auth: null,
  user: null,
  logout: () => {},
  invalidate: () => {},
})
