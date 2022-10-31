import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil';
import { session } from '../config/session';
export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session as any}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}
