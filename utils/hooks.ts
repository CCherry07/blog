import * as React from 'react'

function useSafeDispatch(dispatch: any) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (...args: any[]) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

interface State<T> {
  status?: 'idle' | 'pending' | 'resolved' | 'rejected'
  data?: T | null
  error?: any | null
}

const defaultInitialState = { status: 'idle', data: null, error: null }
function useAsync<T>(initialState: State<T>) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{ status, data, error }, setState] = React.useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (data: T) => safeSetState({ data, status: 'resolved' }),
    [safeSetState],
  )
  const setError = React.useCallback(
    (error: any) => safeSetState({ error, status: 'rejected' }),
    [safeSetState],
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState],
  )

  const run = React.useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({ status: 'pending' })
      return promise.then(
        (data: T) => {
          setData(data)
          return data
        },
        (error: any) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export { useAsync }
