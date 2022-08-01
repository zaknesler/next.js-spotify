export const AUTH_URL = 'https://accounts.spotify.com/authorize'
export const ACCESS_TOKEN_URL = 'https://accounts.spotify.com/api/token'
export const API_BASE_URL = 'https://api.spotify.com/v1'

export const AUTH_SCOPES = [
  'playlist-read-collaborative',
  'playlist-read-private',
  'streaming',
  'user-library-read',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-read-playback-state',
  'user-read-private',
  'user-top-read',
]

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'spotify_access_token',
  REFRESH_TOKEN: 'spotify_refresh_token',
  EXPIRES_AT: 'spotify_expires_at',
  STATE: 'spotify_state',
  SCOPE: 'spotify_original_auth_scope',
}

export const ENDPOINTS = {
  PROFILE: `${API_BASE_URL}/me`,
  TOP_TRACKS: `${API_BASE_URL}/me/top/tracks`,
}
