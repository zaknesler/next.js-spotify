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

      <main className="p-8 md:p-12">
        {auth && !auth.isAuthenticated && (
          <>
            <h3 className="text-xl font-semibold">Welcome.</h3>
            <p className="mt-2 leading-relaxed text-gray-600 md:max-w-sm">
              Sign in with your Spotify account to continue.
            </p>
            <SpotifyLoginButton className="mt-6" />
          </>
        )}

        {auth && auth.isAuthenticated && (
          <>
            <SpotifyLogoutButton />

            <div className="mt-2 space-y-6">
              <SpotifyProfile />
              <SpotifyCurrentlyPlaying className="md:max-w-sm" />

              <div className="flex flex-col gap-6 md:flex-row">
                <SpotifyRecentTracks className="flex-1 md:max-w-sm" />
                <SpotifyTopTracks className="flex-1 md:max-w-sm" />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}
