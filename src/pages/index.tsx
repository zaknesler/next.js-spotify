import Head from 'next/head'
import { SpotifyLoginButton } from '../components/spotify/SpotifyLoginButton'
import { SpotifyProfile } from '../components/spotify/SpotifyProfile'
import { SpotifyTopTracks } from '../components/spotify/SpotifyTopTracks'
import { useSpotifyAuth } from '../hooks/useSpotifyAuth'

export default function Index() {
  const { auth } = useSpotifyAuth()

  return (
    <>
      <Head>
        <title>Next.js + Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <SpotifyLoginButton className="mb-6" />

        {auth?.isAuthenticated && (
          <div className="space-y-6">
            <SpotifyProfile />
            <SpotifyTopTracks />
          </div>
        )}
      </main>
    </>
  )
}
