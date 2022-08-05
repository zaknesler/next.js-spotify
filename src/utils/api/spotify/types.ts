import { Dispatch, SetStateAction } from 'react'

export type SpotifyAuthCookies = {
  spotify_access_token?: string
  spotify_refresh_token?: string
  spotify_expires_at?: number
  spotify_state?: string
  spotify_original_auth_scope?: string
}

export type SpotifyContextData = {
  auth: SpotifyAuthData
  user: ProfileResponse
  setAuth: Dispatch<SetStateAction<SpotifyAuthData>>
  invalidate: () => void
  logout: () => Promise<Response>
}

export type SpotifyAuthData = {
  isAuthenticated: boolean
  session?: SpotifyAuthSession
  user: ProfileResponse
}

export type SpotifyAuthSession = {
  access_token: string
  expires_at: Date
  scopes: string[]
  state: string
}

export type ProfileResponse = {
  id: string
  email: string
  display_name: string
  product: 'premium' | 'free' | 'open'
}

export type Image = {
  url: string
  width: number
  height: number
}

export type Album = {
  id: string
  name: string
  album_type: string
  artists: Artist[]
  available_markets: string[]
  href: string
  images: Image[]
  release_date: Date
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export type Artist = {
  id: string
  name: string
  type: string
  href: string
  uri: string
}

export type Track = {
  id: string
  name: string
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  href: string
  is_local: boolean
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}
