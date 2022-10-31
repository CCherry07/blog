import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil';
const session: any = {
  user:{
    uid:"2405693142",
    name:"cherry",
    image:"https://img1.baidu.com/it/u=592570905,1313515675&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1667235600&t=c35915a8d34897267688ebc08bcf8c4c",
    tag: "CHERRY"
  }
}
export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}
