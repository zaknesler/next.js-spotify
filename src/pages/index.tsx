import Head from 'next/head'
import { SpotifyConnect } from '../components/spotify/SpotifyConnect'

export default function Index() {
  return (
    <>
      <Head>
        <title>Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <SpotifyConnect />
      </main>
    </>
  )
}
