import { create } from 'zustand'
import { WindowState, AppId } from '@/shared/types'

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

const useDesktopStore = create<DesktopStore>((set) => ({
  windows: [],
  maxZIndex: 10,
  highContrast: false,
  
  openWindow: (appId: AppId, title: string) => {
    set((state) => {
      // Check if window already exists
      const existingWindow = state.windows.find(w => w.appId === appId)
      
      if (existingWindow) {
        // Focus and unminimize if exists
        return {
          windows: state.windows.map(w =>
            w.id === existingWindow.id
              ? { ...w, isMinimized: false, zIndex: state.maxZIndex + 1 }
              : w
          ),
          maxZIndex: state.maxZIndex + 1,
        }
      }
      
      // Create new window
      const newWindow: WindowState = {
        id: `${appId}-${Date.now()}`,
        appId,
        title,
        isMinimized: false,
        isMaximized: false,
        position: {
          x: 100 + state.windows.length * 30,
          y: 80 + state.windows.length * 30,
        },
        size: {
          width: appId === 'terminal' ? 800 : 700,
          height: appId === 'terminal' ? 500 : 600,
        },
        zIndex: state.maxZIndex + 1,
      }
      
      return {
        windows: [...state.windows, newWindow],
        maxZIndex: state.maxZIndex + 1,
      }
    })
  },
  
  closeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.filter(w => w.id !== id),
    }))
  },
  
  minimizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }))
  },
  
  maximizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }))
  },
  
  focusWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: state.maxZIndex + 1, isMinimized: false } : w
      ),
      maxZIndex: state.maxZIndex + 1,
    }))
  },
  
  updateWindowPosition: (id: string, position: { x: number; y: number }) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      ),
    }))
  },
  
  updateWindowSize: (id: string, size: { width: number; height: number }) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size } : w
      ),
    }))
  },
  
  toggleHighContrast: () => {
    set((state) => {
      const newHighContrast = !state.highContrast
      
      if (typeof document !== 'undefined') {
        if (newHighContrast) {
          document.body.classList.add('high-contrast')
        } else {
          document.body.classList.remove('high-contrast')
        }
      }
      
      return { highContrast: newHighContrast }
    })
  },
}))

export default useDesktopStore

