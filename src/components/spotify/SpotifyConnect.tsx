import React from 'react'
import { SpotifyLogo } from '../../assets/icons/spotify'
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth'
import useSWR from 'swr'
import { spotifyFetcher } from '../../utils/api/spotify/utils'
import Link from 'next/link'

type SpotifyProfileResponse = {
  display_name: string
}

export const SpotifyConnect: React.FC<{}> = () => {
  const auth = useSpotifyAuth()

  const { data, error } = useSWR<SpotifyProfileResponse>(
    auth ? ['https://api.spotify.com/v1/me', auth] : null,
    spotifyFetcher,
  )

  if (!auth || !data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return auth.isAuthenticated ? (
    <div>{data.display_name}</div>
  ) : (
    <Link href="/api/auth/spotify/login">
      <a className="inline-flex items-center gap-2 rounded-lg bg-[#1db954] px-4 py-3 font-medium text-white no-underline hover:bg-green-600">
        <SpotifyLogo className="h-6 w-6" color="white" />
        <span>Sign in with Spotify</span>
      </a>
    </Link>
  )
}
