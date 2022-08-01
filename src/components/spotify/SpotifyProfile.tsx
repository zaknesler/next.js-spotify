import React from 'react'
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth'
import useSWR from 'swr'
import { spotifyFetcher } from '../../utils/api/spotify/utils'

type SpotifyProfileResponse = {
  display_name: string
}

export const SpotifyProfile: React.FC<{}> = () => {
  const auth = useSpotifyAuth()
  const { data, error } = useSWR<SpotifyProfileResponse>(
    auth ? ['https://api.spotify.com/v1/me', auth] : null,
    spotifyFetcher,
  )

  if (!auth || !data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return <div>{data.display_name}</div>
}
