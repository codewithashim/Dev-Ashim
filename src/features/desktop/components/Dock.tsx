'use client'

import { User, Briefcase, FileText, Terminal as TerminalIcon, Mail } from 'lucide-react'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { AppId } from '@/shared/types'

interface DockApp {
  id: AppId
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const apps: DockApp[] = [
  { id: 'about', name: 'About', icon: User, color: 'from-blue-500 to-blue-600' },
  { id: 'projects', name: 'Projects', icon: Briefcase, color: 'from-purple-500 to-purple-600' },
  { id: 'resume', name: 'Resume', icon: FileText, color: 'from-orange-500 to-orange-600' },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon, color: 'from-os-accent-green to-os-accent-teal' },
  { id: 'contact', name: 'Contact', icon: Mail, color: 'from-pink-500 to-pink-600' },
]

export default function Dock() {
  const { openWindow, windows } = useDesktopStore()
  
  const isAppOpen = (appId: AppId) => {
    return windows.some(w => w.appId === appId && !w.isMinimized)
  }
  
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-panel px-2 py-1.5 rounded-xl border-white/20" style={{ backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center space-x-1" role="toolbar" aria-label="Application dock">
          {apps.map((app) => {
            const Icon = app.icon
            const isOpen = isAppOpen(app.id)
            
            return (
              <button
                key={app.id}
                onClick={() => openWindow(app.id, app.name)}
                className={`group relative p-2.5 rounded-lg transition-all duration-200 hover:bg-white/20 ${
                  isOpen ? 'bg-white/10' : ''
                }`}
                aria-label={`Open ${app.name}`}
                title={app.name}
              >
                <Icon className={`w-5 h-5 relative z-10 ${isOpen ? 'text-white' : 'text-white/80'}`} />
                
                {/* Active indicator - dot below */}
                {isOpen && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white">
                  {app.name}
                </div>
              </button>
            )
          })}
          
          {/* Separator */}
          <div className="w-px h-8 bg-white/20 mx-1" />
          
          {/* Show Applications */}
          <button
            className="p-2.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Show applications"
            title="Show Applications"
          >
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white/80 rounded-full" />
              ))}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

