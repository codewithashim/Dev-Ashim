'use client'

import { useCallback, memo, useState } from 'react'
import { User, FileText, Terminal as TerminalIcon, Mail } from 'lucide-react'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { AppId } from '@/shared/types'
import { analytics } from '@/shared/lib/analytics'

// VS Code Icon Component
const VSCodeIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M17.5 0L6.5 8.5L2.5 5.5L0 7L6.5 13L0 19L2.5 20.5L6.5 17.5L17.5 26L24 23V3L17.5 0ZM17.5 6L17.5 20L8.5 13L17.5 6Z" 
      fill="currentColor"
    />
  </svg>
)

interface DockApp {
  id: AppId
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
}

const apps: DockApp[] = [
  { 
    id: 'about', 
    name: 'About', 
    icon: User, 
    color: 'from-blue-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
  },
  { 
    id: 'projects', 
    name: 'Projects', 
    icon: VSCodeIcon, 
    color: 'from-blue-400 to-blue-600',
    gradient: 'bg-gradient-to-br from-blue-400/20 to-blue-600/20'
  },
  { 
    id: 'resume', 
    name: 'Resume', 
    icon: FileText, 
    color: 'from-orange-500 to-orange-600',
    gradient: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20'
  },
  { 
    id: 'terminal', 
    name: 'Terminal', 
    icon: TerminalIcon, 
    color: 'from-emerald-500 to-teal-500',
    gradient: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20'
  },
  { 
    id: 'contact', 
    name: 'Contact', 
    icon: Mail, 
    color: 'from-pink-500 to-rose-600',
    gradient: 'bg-gradient-to-br from-pink-500/20 to-rose-600/20'
  },
]

function Dock() {
  const { openWindow, windows } = useDesktopStore()
  const [hoveredApp, setHoveredApp] = useState<AppId | null>(null)
  
  const isAppOpen = useCallback((appId: AppId) => {
    return windows.some(w => w.appId === appId)
  }, [windows])
  
  const handleOpenApp = useCallback((appId: AppId, name: string) => {
    // Check if window exists and is minimized
    const existingWindow = windows.find(w => w.appId === appId)
    
    if (existingWindow && existingWindow.isMinimized) {
      // If minimized, just restore it (openWindow will handle this)
      openWindow(appId, name)
    } else if (existingWindow) {
      // If already open and not minimized, minimize it (Ubuntu behavior)
      const { minimizeWindow } = useDesktopStore.getState()
      minimizeWindow(existingWindow.id)
    } else {
      // If not open, open it
      openWindow(appId, name)
    }
    
    analytics.click('dock_app', { app_id: appId })
  }, [openWindow, windows])
  
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      {/* Ubuntu-style dock container with enhanced glass effect */}
      <div 
        className="relative px-3 py-2.5 rounded-2xl border border-white/30 shadow-2xl"
        style={{ 
          background: 'rgba(15, 15, 15, 0.75)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative flex items-end space-x-2" role="toolbar" aria-label="Application dock">
          {apps.map((app, index) => {
            const Icon = app.icon
            const isOpen = isAppOpen(app.id)
            const isHovered = hoveredApp === app.id
            
            return (
              <div key={app.id} className="relative flex flex-col items-center">
                {/* Ubuntu-style running indicator - left side glow dots */}
                {isOpen && (
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                    <div 
                      className="w-1 h-1 rounded-full bg-white shadow-lg shadow-white/50"
                      style={{
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}
                    />
                  </div>
                )}
                
                <button
                  onClick={() => handleOpenApp(app.id, app.name)}
                  onMouseEnter={() => setHoveredApp(app.id)}
                  onMouseLeave={() => setHoveredApp(null)}
                  className={`group relative p-3 rounded-xl transition-all duration-200
                    ${isOpen ? app.gradient : 'bg-white/5'}
                    hover:bg-white/10
                  `}
                  aria-label={`Open ${app.name}`}
                  aria-pressed={isOpen}
                  type="button"
                >
                  {/* Icon */}
                  <Icon 
                    className={`w-7 h-7 relative z-10 transition-colors duration-200
                      ${isOpen ? 'text-white drop-shadow-lg' : 'text-white/90'}
                    `} 
                    aria-hidden="true"
                  />
                  
                  {/* Tooltip - Ubuntu style */}
                  <div 
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 
                      bg-gray-900/95 backdrop-blur-xl border border-white/20 
                      rounded-lg text-xs font-medium whitespace-nowrap text-white
                      shadow-xl transition-all duration-200 pointer-events-none
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    `}
                  >
                    {app.name}
                    {/* Tooltip arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900/95 border-r border-b border-white/20" />
                  </div>
                </button>
                
                {/* Bottom indicator line for active apps - subtle Ubuntu style */}
                {isOpen && (
                  <div 
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-white/80"
                    style={{
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                    }}
                  />
                )}
              </div>
            )
          })}
          
          {/* Separator - Ubuntu style */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-1 self-center" />
          
          {/* Show Applications Grid - Ubuntu style */}
          <button
            className="relative p-3 rounded-xl transition-all duration-200 hover:bg-white/10 bg-white/5"
            aria-label="Show applications"
            title="Show Applications"
            type="button"
            onMouseEnter={() => setHoveredApp(null)}
          >
            <div className="grid grid-cols-3 gap-1" aria-hidden="true">
              {[...Array(9)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 bg-white/90 rounded-sm"
                />
              ))}
            </div>
          </button>
        </div>
      </div>
      
      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  )
}

export default memo(Dock)

