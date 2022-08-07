export const AUTH_URL = 'https://accounts.spotify.com/authorize'
export const ACCESS_TOKEN_URL = 'https://accounts.spotify.com/api/token'
export const API_BASE_URL = 'https://api.spotify.com/v1'

export const AUTH_SCOPES = [
  'playlist-read-collaborative',
  'playlist-read-private',
  'streaming',
  'app-remote-control',
  'user-library-read',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-read-private',
  'user-read-recently-played',
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
  ME: {
    PROFILE: `${API_BASE_URL}/me`,
    TOP_TRACKS: `${API_BASE_URL}/me/top/tracks`,
    CURRENTLY_PLAYING: `${API_BASE_URL}/me/player/currently-playing`,
    RECENTLY_PLAYED: `${API_BASE_URL}/me/player/recently-played`,
  },
  USERS: {
    PLAYLISTS: (id: string) => `${API_BASE_URL}/users/${id}/playlists`,
  },
  CONTROLS: {
    RESUME: `${API_BASE_URL}/me/player/play`,
    PAUSE: `${API_BASE_URL}/me/player/pause`,
  },
}
