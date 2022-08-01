import React from 'react'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'
import useSWR from 'swr'
import { spotifyFetcher } from '../../utils/api/spotify/utils'
import { ENDPOINTS } from '../../utils/api/spotify/constants'
import type { Track } from '../../utils/api/spotify/types'

type SpotifyTopTracksResponse = {
  items: Track[]
  limit: number
  offset: number
  total: number
  next: string
}

export const SpotifyTopTracks: React.FC<{}> = () => {
  const { auth } = useSpotifyAuthContext()
  const { data, error } = useSWR<SpotifyTopTracksResponse>(
    auth?.isAuthenticated ? [ENDPOINTS.TOP_TRACKS, auth] : null,
    spotifyFetcher,
  )

  if (!auth || !auth.isAuthenticated) return
  if (!data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return (
    <div>
      <h3 className="w-48 border-b-4 border-[#1db954] border-opacity-25 pb-1 font-semibold">
        Your top {data.limit} tracks
      </h3>

      <ul className="mt-3 ml-6 list-disc space-y-3">
        {data.items &&
          data.items.map(track => (
            <li key={track.id}>
              <div className="font-medium">{track.name}</div>
              <div className="text-sm text-gray-600">
                {track.artists[0].name}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
