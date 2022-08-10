import { Dispatch, SetStateAction } from 'react'

export type SpotifyAuthCookies = {
  spotify_access_token: string
  spotify_refresh_token: string
  spotify_expires_at: number
  spotify_state: string
  spotify_original_auth_scope: string
}

export type SpotifyContextData = {
  auth: SpotifyAuthData | null
  user: SpotifyUserData | null
  isAuthed: () => boolean
  setAuth: Dispatch<SetStateAction<SpotifyAuthData | null>>
  invalidate: () => void
  login: () => void
  logout: () => void
}

export type SpotifyAuthData = {
  isAuthenticated: boolean
  session?: SpotifyAuthSession | null
  user?: SpotifyUserData | null
}

export type SpotifyAuthSession = {
  access_token: string
  expires_at: Date
  scopes: string[]
  state: string
}

export type SpotifyUserData = ProfileResponse

export type ProfileResponse = {
  id: string
  display_name: string
  email: string
  country: string
  href: string
  images: Image[]
  product: 'premium' | 'free' | 'open'
  type: string
  uri: string
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

export type Playlist = {
  collaborative: boolean
  description: string
  href: string
  id: string
  images: Image[]
  name: string
  owner: SpotifyUserData
  primary_color: string
  public: boolean
  snapshot_id: string
  tracks: Track[]
  type: string
  uri: string
}

export type Context = {
  href: string
  type: string
  uri: string
}

export type Device = {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: number
}
