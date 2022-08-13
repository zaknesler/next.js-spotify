import { PauseIcon, PlayIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../../utils/api/spotify/constants'
import type { Context, Device, Track } from '../../../utils/api/spotify/types'
import { spotifyFetcher } from '../../../utils/api/spotify/utils'

export type PlaybackStateResponse = {
  device: Device
  shuffle_state: boolean
  repeat_state: string
  timestamp: number
  context: Context
  progress_ms: number
  item: Track
  currently_playing_type: string
  is_playing: boolean
}

export const PlaybackControls: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isAuthed, auth } = useSpotifyAuthContext()
  const [isPlaying, setIsPlaying] = useState(false)
  const { data, error } = useSWR<PlaybackStateResponse>(
    isAuthed() ? [ENDPOINTS.PLAYER.STATE, { auth }] : null,
    spotifyFetcher,
    { refreshInterval: 1000 },
  )

  useEffect(() => {
    data && setIsPlaying(data.is_playing)
  }, [data])

  if (!isAuthed() || !data) return null
  if (error) return <div>Failed to load!</div>

  const resume = async () => {
    setIsPlaying(true)
    await spotifyFetcher(ENDPOINTS.PLAYER.RESUME, {
      auth,
      method: 'PUT',
    })
  }

  const pause = async () => {
    setIsPlaying(false)
    await spotifyFetcher(ENDPOINTS.PLAYER.PAUSE, {
      auth,
      method: 'PUT',
    })
  }

  return (
    <div
      className={[
        'flex items-center justify-center gap-3 rounded-md bg-black p-4 text-lg text-white',
        className,
      ].join(' ')}
    >
      {isPlaying ? (
        <button onClick={pause} className="appearance-none">
          <PauseIcon className="h-10 w-10" />
        </button>
      ) : (
        <button onClick={resume} className="appearance-none">
          <PlayIcon className="h-10 w-10" />
        </button>
      )}
    </div>
  )
}
