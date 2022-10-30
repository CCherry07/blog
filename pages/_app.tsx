import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
const session:any = {
  
}
export default function App({ Component, pageProps: {...pageProps} }: AppProps) {
  return (<SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>)
}
