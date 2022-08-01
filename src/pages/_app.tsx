import Head from 'next/head'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { fetcher } from '../utils/fetcher'

import 'tailwindcss/tailwind.css'
import { SpotifyAuthContext } from '../utils/SpotifyAuthContext'
import { useSpotifyAuth } from '../hooks/useSpotifyAuth'

const App = ({ Component, pageProps }: AppProps) => {
  const auth = useSpotifyAuth()

  return (
    <SWRConfig value={{ fetcher }}>
      <SpotifyAuthContext.Provider value={auth}>
        <Head>
          <title>Spotify</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </SpotifyAuthContext.Provider>
    </SWRConfig>
  )
}

export default App
