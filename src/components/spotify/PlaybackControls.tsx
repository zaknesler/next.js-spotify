import { PauseIcon, PlayIcon } from '@heroicons/react/solid'
import React from 'react'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../utils/api/spotify/constants'
import { spotifyFetcher } from '../../utils/api/spotify/utils'

export const PlaybackControls: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isAuthed, auth } = useSpotifyAuthContext()

  if (!isAuthed()) return

  const resume = async () => {
    await spotifyFetcher(ENDPOINTS.CONTROLS.RESUME, {
      auth,
      method: 'PUT',
    })
  }

  const pause = async () => {
    await spotifyFetcher(ENDPOINTS.CONTROLS.PAUSE, {
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
      <button onClick={resume} className="appearance-none">
        <PlayIcon className="h-10 w-10" />
      </button>
      <button onClick={pause} className="appearance-none">
        <PauseIcon className="h-10 w-10" />
      </button>
    </div>
  )
}
