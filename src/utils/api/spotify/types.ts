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
  invalidate: () => void
  logout: () => void
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

export type Artist = {
  id: string
  name: string
  images: Image[]
}

export type Album = {
  id: string
  name: string
  artists: Artist[]
  images: Image[]
}

export type Track = {
  id: string
  name: string
  artists: Artist[]
  album: Album
}
