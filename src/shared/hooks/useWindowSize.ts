import { useState, useEffect } from 'react'
import { debounce } from '@/shared/utils'

interface WindowSize {
  width: number
  height: number
}

/**
 * Custom hook to track window size
 * @param debounceDelay - Delay in ms for debouncing resize events (default: 150ms)
 * @returns Object containing current window width and height
 */
export function useWindowSize(debounceDelay: number = 150): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') {
      return { width: 1920, height: 1080 }
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, debounceDelay)

    window.addEventListener('resize', handleResize)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [debounceDelay])

  return windowSize
}

