export const AUTH_URL = 'https://accounts.spotify.com/authorize'
export const AUTH_SCOPES = ['user-read-private', 'user-read-email']

export const ACCESS_TOKEN_URL = 'https://accounts.spotify.com/api/token'

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'spotify_access_token',
  REFRESH_TOKEN: 'spotify_refresh_token',
  EXPIRES_AT: 'spotify_expires_at',
  STATE: 'spotify_state',
  SCOPE: 'spotify_original_auth_scope',
}
