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
      className={['rounded-md bg-black p-3 text-white', className].join(' ')}
    >
      <button onClick={resume} className="block">
        Play
      </button>
      <button onClick={pause} className="block">
        Pause
      </button>
    </div>
  )
}
