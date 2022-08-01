import { createContext } from 'react'
import { SpotifyAuthData } from './api/spotify/types'

export const SpotifyAuthContext = createContext<SpotifyAuthData>(null)
