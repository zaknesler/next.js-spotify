export type SpotifyAuthCookies = {
  spotify_access_token?: string
  spotify_refresh_token?: string
  spotify_expires_at?: number
  spotify_state?: string
  spotify_original_auth_scope?: string
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
