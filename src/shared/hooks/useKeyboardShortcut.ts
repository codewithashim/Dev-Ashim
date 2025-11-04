import { useEffect, useCallback, useRef } from 'react'

interface KeyboardShortcutOptions {
  enabled?: boolean
  preventDefault?: boolean
  ignoreInputFields?: boolean
}

/**
 * Custom hook for handling keyboard shortcuts
 * @param keys - Array of keys to match (e.g., ['Control', 'k'] or ['Meta', 'k'])
 * @param callback - Function to call when shortcut is pressed
 * @param options - Configuration options
 */
export function useKeyboardShortcut(
  keys: string[],
  callback: () => void,
  options: KeyboardShortcutOptions = {}
): void {
  const {
    enabled = true,
    preventDefault = true,
    ignoreInputFields = true,
  } = options

  const callbackRef = useRef(callback)

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      // Ignore if typing in input fields
      if (ignoreInputFields) {
        const target = event.target as HTMLElement
        const tagName = target.tagName
        if (
          tagName === 'INPUT' ||
          tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          return
        }
      }

      // Check if all keys match
      const keysMatch = keys.every(key => {
        const lowerKey = key.toLowerCase()
        
        if (lowerKey === 'ctrl' || lowerKey === 'control') {
          return event.ctrlKey
        }
        if (lowerKey === 'cmd' || lowerKey === 'meta') {
          return event.metaKey
        }
        if (lowerKey === 'shift') {
          return event.shiftKey
        }
        if (lowerKey === 'alt') {
          return event.altKey
        }
        
        return event.key.toLowerCase() === lowerKey
      })

      if (keysMatch) {
        if (preventDefault) {
          event.preventDefault()
        }
        callbackRef.current()
      }
    },
    [keys, enabled, preventDefault, ignoreInputFields]
  )

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, handleKeyDown])
}

