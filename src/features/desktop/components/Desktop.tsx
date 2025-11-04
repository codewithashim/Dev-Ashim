'use client'

import { useEffect, useState } from 'react'
import Topbar from './Topbar'
import Dock from './Dock'
import { Window } from '@/features/window'
import { BootLoader } from '@/features/boot'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { AppId } from '@/shared/types'

// Import app components
import { AboutApp } from '@/features/about'
import { ProjectsApp } from '@/features/projects'
import { ResumeApp } from '@/features/resume'
import { TerminalApp } from '@/features/terminal'
import { ContactApp } from '@/features/contact'
import CommandPalette from '@/shared/components/CommandPalette'
import ContextMenu from '@/shared/components/ContextMenu'

const appComponents = {
  about: AboutApp,
  projects: ProjectsApp,
  resume: ResumeApp,
  terminal: TerminalApp,
  contact: ContactApp,
}

export default function Desktop() {
  const [isBooting, setIsBooting] = useState(true)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const { windows, openWindow } = useDesktopStore()
  
  const handleBootComplete = () => {
    setIsBooting(false)
  }
  
  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (isBooting) return // Don't set up listeners during boot
    
    // Handle right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Only show context menu on desktop background
      if (target.closest('[role="main"]') && !target.closest('.glass-panel')) {
        e.preventDefault()
        setContextMenu({ x: e.clientX, y: e.clientY })
      }
    }
    
    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [isBooting])
  
  useEffect(() => {
    if (isBooting) return // Don't set up listeners during boot
    
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        // Command palette will be triggered via state
        const event = new CustomEvent('openCommandPalette')
        window.dispatchEvent(event)
      }
      
      // ~ for terminal
      if (e.key === '`' && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement
        // Don't trigger if typing in input/textarea
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          openWindow('terminal', 'Terminal')
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isBooting, openWindow])
  
  // Now we can safely return conditionally after all hooks are called
  if (isBooting) {
    return <BootLoader onBootComplete={handleBootComplete} />
  }
  
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative">
      {/* Dynamic Wavy Gradient Wallpaper */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#3d1e6d] via-[#7e3f8f] via-[#c93b76] to-[#ff6b4a]" />
        
        {/* Animated Wave Layers */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d1654" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5e2a84" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5e2a84" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#9d4b8c" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b85c88" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#e56b6f" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wave-gradient-4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8766e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff8562" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Wave Layer 1 - Bottom */}
          <path
            d="M0,600 Q360,550 720,600 T1440,600 L1440,800 L0,800 Z"
            fill="url(#wave-gradient-4)"
          />
          
          {/* Wave Layer 2 */}
          <path
            d="M0,500 Q360,450 720,500 T1440,500 L1440,800 L0,800 Z"
            fill="url(#wave-gradient-3)"
          />
          
          {/* Wave Layer 3 */}
          <path
            d="M0,380 Q360,320 720,380 T1440,380 L1440,800 L0,800 Z"
            fill="url(#wave-gradient-2)"
          />
          
          {/* Wave Layer 4 */}
          <path
            d="M0,250 Q360,200 720,250 T1440,250 L1440,800 L0,800 Z"
            fill="url(#wave-gradient-1)"
          />
          
          {/* Additional detail waves */}
          <path
            d="M0,280 Q180,260 360,280 Q540,300 720,280 Q900,260 1080,280 Q1260,300 1440,280 L1440,800 L0,800 Z"
            fill="url(#wave-gradient-1)"
            opacity="0.3"
          />
          
          <path
            d="M0,420 Q180,390 360,420 Q540,450 720,420 Q900,390 1080,420 Q1260,450 1440,420 L1440,800 L0,800 Z"
            fill="url(#wave-gradient-2)"
            opacity="0.3"
          />
          
          <path
            d="M0,540 Q180,510 360,540 Q540,570 720,540 Q900,510 1080,540 Q1260,570 1440,540 L1440,800 L0,800 Z"
            fill="url(#wave-gradient-3)"
            opacity="0.3"
          />
        </svg>
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      
      {/* Top Bar */}
      <Topbar />
      
      {/* Workspace */}
      <main className="flex-1 relative overflow-hidden" role="main">
        {windows.map((window) => {
          const AppComponent = appComponents[window.appId as AppId]
          return (
            <Window key={window.id} window={window}>
              <AppComponent windowId={window.id} />
            </Window>
          )
        })}
      </main>
      
      {/* Dock */}
      <Dock />
      
      {/* Command Palette */}
      <CommandPalette />
      
      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  )
}

