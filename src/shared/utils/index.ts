/**
 * Utility Functions
 * Common helper functions used throughout the application
 */

/**
 * Constrains a value between a minimum and maximum
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}

/**
 * Generates a unique ID based on timestamp and random value
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Safely gets viewport dimensions
 */
export function getViewportDimensions(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 1920, height: 1080 }
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

/**
 * Constrains window position to viewport bounds
 */
export function constrainToViewport(
  x: number,
  y: number,
  _windowWidth: number,
  _windowHeight: number,
  minVisibleWidth: number = 200,
  minVisibleHeight: number = 100
): { x: number; y: number } {
  const { width: viewportWidth, height: viewportHeight } = getViewportDimensions()

  const maxX = viewportWidth - minVisibleWidth
  const maxY = viewportHeight - minVisibleHeight

  return {
    x: clamp(x, 0, maxX),
    y: clamp(y, 0, maxY),
  }
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Formats time to HH:MM format
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/**
 * Creates a mailto link with optional subject and body
 */
export function createMailtoLink(
  email: string,
  subject?: string,
  body?: string
): string {
  const params = new URLSearchParams()
  if (subject) params.append('subject', subject)
  if (body) params.append('body', body)
  const queryString = params.toString()
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`
}

/**
 * Safely copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false
  }

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * Checks if code is running in browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Truncates text to a specified length
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Safely parses JSON with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

/**
 * Creates a delay promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Gets initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

