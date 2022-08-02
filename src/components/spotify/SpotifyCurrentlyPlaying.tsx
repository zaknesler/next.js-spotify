import React from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../utils/api/spotify/constants'
import type { Track } from '../../utils/api/spotify/types'
import { spotifyFetcher } from '../../utils/api/spotify/utils'

export type SpotifyCurrentlyPlayingResponse = {
  timestamp: number
  progress_ms: number
  item: Track
  currently_playing_type: string
  is_playing: boolean
}

export const SpotifyCurrentlyPlaying: React.FC<{}> = () => {
  const { auth } = useSpotifyAuthContext()
  const { data, error } = useSWR<SpotifyCurrentlyPlayingResponse>(
    auth?.isAuthenticated ? [ENDPOINTS.CURRENTLY_PLAYING, auth] : null,
    spotifyFetcher,
  )

  if (!auth?.isAuthenticated || !data) return
  if (error) return <div>Failed to load!</div>

  return (
    <div>
      <h3 className="w-48 border-b-4 border-[#1db954] border-opacity-25 pb-1 font-semibold">
        Currently playing
      </h3>

      <div className="mt-3">
        <div className="font-medium">{data.item.name}</div>
        <div className="text-sm text-gray-600">{data.item.artists[0].name}</div>
      </div>
    </div>
  )
}
