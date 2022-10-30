import { useEffect } from 'react';
import { useLocalStorageState } from './useLocalStorageState';
import { useToggle } from './useToggle';


export function useDark() {
  const [currentTheme, toggle] = useToggle({ defultIs: "light", another: "dark" })
  const [theme, setStorage] = useLocalStorageState("theme", currentTheme)
  useEffect(() => {
    setStorage(currentTheme)
  }, [currentTheme])
  return [theme, toggle]
}
