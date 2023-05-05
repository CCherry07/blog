import * as React from 'react'
import * as auth from 'auth-provider'
import { client } from 'utils/api-client'
import { useAsync } from 'utils/hooks'
// import { FullPageSpinner, FullPageErrorFallback } from 'components/lib'
async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', { token })
    user = data.user
  }else{
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      window.location.assign('/login')
    }
  }
  
  return user
}

interface AuthContext {
  user: {
    id: string,
    name: string,
    token: string
    avatar: string
    email: string
  },
  login: (form: any) => Promise<any>,
  logout: () => void,
  register: (form: any) => Promise<any>
}


const AuthContext = React.createContext<AuthContext>({} as AuthContext)
AuthContext.displayName = 'AuthContext'

function AuthProvider(props: any) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync<AuthContext['user']>({})

  React.useEffect(() => {
    const userPromise = getUser()
    run(userPromise)
  }, [run])

  const login = React.useCallback(
    (form:auth.LoginParams) => auth.login(form).then(setData),
    [setData],
  )
  const register = React.useCallback(
    (form:auth.LoginParams) => auth.register(form).then(setData),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(() => ({ user, login, logout, register }), [
    login,
    logout,
    register,
    user,
  ])

  if (isLoading || isIdle) {
    // return <FullPageSpinner />
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const {
    user: { token },
  } = useAuth()
  return React.useCallback(
    (endpoint: string, config?: any) => client(endpoint, { ...config, token }),
    [token],
  )
}

export { AuthProvider, useAuth, useClient }
