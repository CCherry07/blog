import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../context/auth-context'
const queryClient = new QueryClient()

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </AuthProvider>
    </QueryClientProvider>
  )
}
