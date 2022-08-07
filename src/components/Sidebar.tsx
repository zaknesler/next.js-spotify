import Link from 'next/link'
import React from 'react'
import { useSpotifyAuthContext } from '../hooks/useSpotifyAuth'
import { LoginButton } from './spotify/LoginButton'
import { LogoutButton } from './spotify/LogoutButton'
import { PlaybackControls } from './spotify/PlaybackControls'
import { Profile } from './spotify/Profile'
import { CurrentlyPlaying } from './spotify/views/CurrentlyPlaying'

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const { isAuthed } = useSpotifyAuthContext()

  const links = [
    { label: 'Home', url: '/' },
    { label: 'Recent tracks', url: '/stats/recent-tracks' },
    { label: 'Top tracks', url: '/stats/top-tracks' },
    { label: 'Playlists', url: '/stats/playlists' },
  ]

  if (!isAuthed())
    return (
      <div className={className}>
        <h3 className="text-xl font-semibold">Welcome.</h3>
        <p className="mt-2 leading-relaxed text-gray-600">
          Sign in with your Spotify account to continue.
        </p>
        <LoginButton className="mt-6" />
      </div>
    )

  return (
    <div className={className}>
      <div className="sticky top-8 left-0 right-0 flex h-full flex-col justify-between">
        <div>
          <LogoutButton />
          <Profile className="mt-2" />
          <CurrentlyPlaying className="mt-6 md:max-w-sm" />

          <div className="my-6 h-1 w-1/2 bg-gray-200"></div>

          <div className="space-y-2 text-lg font-semibold text-black">
            {links.map((link, iter) => (
              <div key={iter}>
                <Link href={link.url}>
                  <a className="hover:text-spotify-text">{link.label}</a>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <PlaybackControls className="mt-6" />
      </div>
    </div>
  )
}
