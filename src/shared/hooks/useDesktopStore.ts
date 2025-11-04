import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WindowState, AppId } from '@/shared/types'
import { WINDOW_CONFIG } from '@/shared/constants'
import { generateId, constrainToViewport } from '@/shared/utils'
import { logger } from '@/shared/lib/logger'
import { analytics } from '@/shared/lib/analytics'

interface DesktopStore {
  windows: WindowState[]
  maxZIndex: number
  highContrast: boolean
  
  openWindow: (appId: AppId, title: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
  toggleHighContrast: () => void
}

const useDesktopStore = create<DesktopStore>()(
  persist(
    (set, get) => ({
      windows: [],
      maxZIndex: WINDOW_CONFIG.initialZIndex,
      highContrast: false,
  
  openWindow: (appId: AppId, title: string) => {
    const state = get()
    
    // Check if window already exists
    const existingWindow = state.windows.find(w => w.appId === appId)
    
    if (existingWindow) {
      logger.debug(`Focusing existing window: ${appId}`)
      analytics.windowOpen(appId)
      
      // Focus and unminimize if exists
      set({
        windows: state.windows.map(w =>
          w.id === existingWindow.id
            ? { ...w, isMinimized: false, zIndex: state.maxZIndex + WINDOW_CONFIG.zIndexIncrement }
            : w
        ),
        maxZIndex: state.maxZIndex + WINDOW_CONFIG.zIndexIncrement,
      })
      return
    }
    
    // Calculate position with offset
    const positionOffset = state.windows.length * WINDOW_CONFIG.offsetIncrement
    const basePosition = {
      x: WINDOW_CONFIG.baseOffsetX + positionOffset,
      y: WINDOW_CONFIG.baseOffsetY + positionOffset,
    }
    
    // Determine window size based on app type
    const size = {
      width: appId === 'terminal' ? WINDOW_CONFIG.terminalWidth : WINDOW_CONFIG.defaultWidth,
      height: appId === 'terminal' ? WINDOW_CONFIG.terminalHeight : WINDOW_CONFIG.defaultHeight,
    }
    
    // Constrain position to viewport
    const position = constrainToViewport(
      basePosition.x,
      basePosition.y,
      size.width,
      size.height
    )
    
    // Create new window
    const newWindow: WindowState = {
      id: generateId(appId),
      appId,
      title,
      isMinimized: false,
      isMaximized: false,
      position,
      size,
      zIndex: state.maxZIndex + WINDOW_CONFIG.zIndexIncrement,
    }
    
    logger.info(`Opening new window: ${appId}`)
    analytics.windowOpen(appId)
    
    set({
      windows: [...state.windows, newWindow],
      maxZIndex: state.maxZIndex + WINDOW_CONFIG.zIndexIncrement,
    })
  },
  
  closeWindow: (id: string) => {
    const state = get()
    const window = state.windows.find(w => w.id === id)
    
    if (window) {
      logger.debug(`Closing window: ${window.appId}`)
      analytics.windowClose(window.appId)
    }
    
    set({
      windows: state.windows.filter(w => w.id !== id),
    })
  },
  
  minimizeWindow: (id: string) => {
    logger.debug(`Minimizing window: ${id}`)
    
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }))
  },
  
  maximizeWindow: (id: string) => {
    const state = get()
    const window = state.windows.find(w => w.id === id)
    
    if (window) {
      logger.debug(`${window.isMaximized ? 'Restoring' : 'Maximizing'} window: ${window.appId}`)
    }
    
    set({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    })
  },
  
  focusWindow: (id: string) => {
    const state = get()
    
    set({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: state.maxZIndex + WINDOW_CONFIG.zIndexIncrement, isMinimized: false } : w
      ),
      maxZIndex: state.maxZIndex + WINDOW_CONFIG.zIndexIncrement,
    })
  },
  
  updateWindowPosition: (id: string, position: { x: number; y: number }) => {
    const state = get()
    const window = state.windows.find(w => w.id === id)
    
    if (window) {
      // Constrain position to viewport
      const constrainedPosition = constrainToViewport(
        position.x,
        position.y,
        window.size.width,
        window.size.height
      )
      
      set({
        windows: state.windows.map(w =>
          w.id === id ? { ...w, position: constrainedPosition } : w
        ),
      })
    }
  },
  
  updateWindowSize: (id: string, size: { width: number; height: number }) => {
    // Enforce minimum sizes
    const constrainedSize = {
      width: Math.max(size.width, WINDOW_CONFIG.minWidth),
      height: Math.max(size.height, WINDOW_CONFIG.minHeight),
    }
    
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size: constrainedSize } : w
      ),
    }))
  },
  
  toggleHighContrast: () => {
    const state = get()
    const newHighContrast = !state.highContrast
    
    logger.info(`Toggling high contrast mode: ${newHighContrast}`)
    analytics.track('toggle_high_contrast', { enabled: newHighContrast })
    
    if (typeof document !== 'undefined') {
      if (newHighContrast) {
        document.body.classList.add('high-contrast')
      } else {
        document.body.classList.remove('high-contrast')
      }
    }
    
    set({ highContrast: newHighContrast })
  },
    }),
    {
      name: 'ashim-os-storage', // localStorage key
      partialize: (state) => ({ 
        highContrast: state.highContrast,
        // Don't persist windows state - start fresh each time
      }),
    }
  )
)

export default useDesktopStore

