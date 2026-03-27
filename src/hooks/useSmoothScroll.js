import { useCallback } from 'react'

export function useSmoothScroll() {
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }
  }, [])

  return scrollTo
}
