/**
 * Analytics Module
 * Centralized analytics tracking for the application
 */

import { logger } from './logger'

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

interface PageViewEvent {
  path: string
  title?: string
  referrer?: string
}

class Analytics {
  private isInitialized: boolean = false
  private queue: AnalyticsEvent[] = []

  /**
   * Initialize analytics service
   */
  init(): void {
    if (this.isInitialized) {
      logger.warn('Analytics already initialized')
      return
    }

    // TODO: Initialize analytics service (e.g., Google Analytics, Plausible, etc.)
    // Example: gtag('config', 'GA_MEASUREMENT_ID')
    
    this.isInitialized = true
    logger.info('Analytics initialized')

    // Process queued events
    this.processQueue()
  }

  /**
   * Track a custom event
   */
  track(name: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
    }

    if (!this.isInitialized) {
      this.queue.push(event)
      return
    }

    this.sendEvent(event)
  }

  /**
   * Track a page view
   */
  pageView(data: PageViewEvent): void {
    this.track('page_view', {
      page_path: data.path,
      page_title: data.title || document.title,
      page_referrer: data.referrer || document.referrer,
    })
  }

  /**
   * Track window open event
   */
  windowOpen(appId: string): void {
    this.track('window_open', { app_id: appId })
  }

  /**
   * Track window close event
   */
  windowClose(appId: string, duration?: number): void {
    this.track('window_close', { 
      app_id: appId,
      duration_ms: duration,
    })
  }

  /**
   * Track button/link clicks
   */
  click(element: string, context?: Record<string, any>): void {
    this.track('click', {
      element,
      ...context,
    })
  }

  /**
   * Track errors
   */
  error(error: Error, context?: Record<string, any>): void {
    this.track('error', {
      error_message: error.message,
      error_stack: error.stack,
      ...context,
    })

    logger.error('Analytics tracked error:', error)
  }

  /**
   * Send event to analytics service
   */
  private sendEvent(event: AnalyticsEvent): void {
    // TODO: Implement actual analytics sending
    // Example: gtag('event', event.name, event.properties)
    
    if (process.env.NODE_ENV === 'development') {
      logger.debug('Analytics event:', event)
    }
  }

  /**
   * Process queued events
   */
  private processQueue(): void {
    while (this.queue.length > 0) {
      const event = this.queue.shift()
      if (event) {
        this.sendEvent(event)
      }
    }
  }

  /**
   * Set user properties
   */
  setUser(userId: string, properties?: Record<string, any>): void {
    // TODO: Implement user identification
    // Example: gtag('set', { user_id: userId, ...properties })
    
    logger.info('Analytics user set:', { userId, properties })
  }

  /**
   * Clear user data (for privacy compliance)
   */
  clearUser(): void {
    // TODO: Implement user data clearing
    logger.info('Analytics user cleared')
  }
}

// Create and export singleton instance
export const analytics = new Analytics()

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => analytics.init())
  } else {
    analytics.init()
  }
}

