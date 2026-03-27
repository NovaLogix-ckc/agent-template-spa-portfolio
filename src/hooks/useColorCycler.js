import { useState, useCallback } from 'react'

const PRESET_COLORS = [
  '#0EA5E9', // sky blue (default)
  '#8B5CF6', // violet
  '#F59E0B', // amber
  '#10B981', // emerald
  '#EF4444', // red
  '#EC4899', // pink
]

export function useColorCycler() {
  const [colorIndex, setColorIndex] = useState(0)

  const cycleColor = useCallback(() => {
    setColorIndex((prev) => {
      const next = (prev + 1) % PRESET_COLORS.length
      const newColor = PRESET_COLORS[next]
      document.documentElement.style.setProperty('--color-primary', newColor)
      document.documentElement.dispatchEvent(
        new CustomEvent('primary-color-change')
      )
      return next
    })
  }, [])

  return {
    currentColor: PRESET_COLORS[colorIndex],
    cycleColor,
  }
}
