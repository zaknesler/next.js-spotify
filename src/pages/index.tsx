import Head from 'next/head'
import { SpotifyCurrentlyPlaying } from '../components/spotify/pages/SpotifyCurrentlyPlaying'
import { SpotifyLoginButton } from '../components/spotify/pages/SpotifyLoginButton'
import { SpotifyLogoutButton } from '../components/spotify/pages/SpotifyLogoutButton'
import { SpotifyProfile } from '../components/spotify/pages/SpotifyProfile'
import { SpotifyRecentTracks } from '../components/spotify/pages/SpotifyRecentTracks'
import { SpotifyTopTracks } from '../components/spotify/pages/SpotifyTopTracks'
import { useSpotifyAuth } from '../hooks/useSpotifyAuth'

export default function Index() {
  const { auth } = useSpotifyAuth()

  return (
    <>
      <Head>
        <title>Next.js + Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8 sm:p-12">
        {auth?.isAuthenticated ? (
          <>
            <SpotifyLogoutButton />
            <div className="mt-2 space-y-6">
              <SpotifyProfile />
              <SpotifyCurrentlyPlaying />
              <div className="flex gap-6">
                <SpotifyRecentTracks className="max-w-lg" />
                <SpotifyTopTracks className="max-w-lg" />
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold">Welcome.</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-gray-600">
              Sign in with your Spotify account to continue.
            </p>
            <SpotifyLoginButton className="mt-6" />
          </>
        )}
      </main>
    </>
  )
}
