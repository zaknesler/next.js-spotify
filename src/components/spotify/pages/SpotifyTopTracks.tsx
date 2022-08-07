import React from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../../utils/api/spotify/constants'
import type { Track } from '../../../utils/api/spotify/types'
import { spotifyFetcher } from '../../../utils/api/spotify/utils'
import { TrackItem } from '../TrackItem'

type SpotifyTopTracksResponse = {
  items: Track[]
  limit: number
  offset: number
  total: number
  next: string
}

export const SpotifyTopTracks: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, isAuthed } = useSpotifyAuthContext()
  const { data, error } = useSWR<SpotifyTopTracksResponse>(
    isAuthed() ? [ENDPOINTS.ME.TOP_TRACKS, auth] : null,
    spotifyFetcher,
  )

  if (!isAuthed()) return
  if (!data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return (
    <div className={className}>
      <h3 className="w-full border-b-4 border-spotify-brand border-opacity-25 pb-1 font-semibold md:w-48">
        Your top {data.limit} tracks
      </h3>

      <ul className="mt-3 space-y-3">
        {data.items &&
          data.items.map((track, iter) => (
            <TrackItem track={track} key={'top-tracks.' + iter} />
          ))}
      </ul>
    </div>
  )
}
