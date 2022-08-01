import Head from 'next/head'
import { SpotifyLoginButton } from '../components/spotify/SpotifyLoginButton'
import { SpotifyProfile } from '../components/spotify/SpotifyProfile'

export default function Index() {
  return (
    <>
      <Head>
        <title>Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <SpotifyLoginButton className="mb-6" />

        <div>
          <SpotifyProfile />
        </div>
      </main>
    </>
  )
}
