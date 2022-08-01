import { createContext } from 'react'
import type { SpotifyAuthData } from '../api/spotify/types'

export const SpotifyAuthContext = createContext<SpotifyAuthData>(null)
