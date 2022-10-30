import { useCallback, useEffect, useRef, useState } from 'react';
interface ToggleValue<S> {
  defultIs?: S
  another?: S
}
export function useToggle<S>(value: ToggleValue<S | boolean> = { defultIs: false, another: true }) {
  const ref = useRef(value)
  const [state, setState] = useState(ref.current.defultIs)
  useEffect(() => {
    if (state !== ref.current.another) {
      return
    }
    ref.current = {
      defultIs: state,
      another: ref.current.defultIs
    }
  }, [state])
  const toggle = useCallback(
    (...args: [S]) => setState(...args || ref.current.another),
    [ref],
  )
  return [state, toggle]
}
