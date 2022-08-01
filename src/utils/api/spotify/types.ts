export type SpotifyAuthCookies = {
  spotify_access_token?: string
  spotify_refresh_token?: string
  spotify_expires_at?: number
  spotify_state?: string
  spotify_original_auth_scope?: string
}

export type SpotifyContextData = {
  auth: SpotifyAuthData
  invalidate: () => void
  logout: () => void
  refresh: () => void
}

export type SpotifyAuthData = {
  isAuthenticated: boolean
  user: null | {
    access_token: string
    expires_at: Date
    scopes: Array<string>
    state: string
  }
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
