import Head from 'next/head'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { fetcher } from '../utils/fetcher'

import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => (
  <SWRConfig value={{ fetcher }}>
    <Head>
      <title>Spotify</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </SWRConfig>
)

export default App
