export const AUTH_URL = 'https://accounts.spotify.com/authorize'
export const AUTH_SCOPES = [
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-library-read',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-read-playback-state',
  'user-read-private',
  'streaming',
]

export const ACCESS_TOKEN_URL = 'https://accounts.spotify.com/api/token'

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'spotify_access_token',
  REFRESH_TOKEN: 'spotify_refresh_token',
  EXPIRES_AT: 'spotify_expires_at',
  STATE: 'spotify_state',
  SCOPE: 'spotify_original_auth_scope',
}
