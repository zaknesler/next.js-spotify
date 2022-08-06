import React from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../../utils/api/spotify/constants'
import type { Track } from '../../../utils/api/spotify/types'
import { spotifyFetcher } from '../../../utils/api/spotify/utils'
import { TrackItem } from '../TrackItem'

export type SpotifyCurrentlyPlayingResponse = {
  timestamp: number
  progress_ms: number
  item: Track
  currently_playing_type: string
  is_playing: boolean
}

export const SpotifyCurrentlyPlaying: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, isAuthed } = useSpotifyAuthContext()
  const { data, error } = useSWR<SpotifyCurrentlyPlayingResponse>(
    isAuthed() ? [ENDPOINTS.CURRENTLY_PLAYING, auth] : null,
    spotifyFetcher,
  )

  if (!isAuthed() || !data) return
  if (error) return <div>Failed to load!</div>

  return (
    <div className={className}>
      <h3 className="w-full border-b-4 border-[#1db954] border-opacity-25 pb-1 font-semibold sm:w-48">
        Currently playing
      </h3>

      <TrackItem track={data.item} className="mt-3" />
    </div>
  )
}
