'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Volume2, Wifi, Battery, Calendar, Activity, Power, ChevronDown } from 'lucide-react'
import useDesktopStore from '@/shared/hooks/useDesktopStore'

export default function Topbar() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [showActivities, setShowActivities] = useState(false)
  const { highContrast, toggleHighContrast, windows, openWindow } = useDesktopStore()
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }))
      setDate(now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="glass-panel h-9 flex items-center justify-between px-3 z-50 border-b border-white/10 text-sm">
      {/* Left: Activities & App Name */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowActivities(!showActivities)}
          className="px-3 py-1 hover:bg-white/10 rounded transition-colors font-medium text-white"
        >
          Activities
        </button>
        {windows.length > 0 && (
          <div className="flex items-center space-x-2 text-white/90">
            <div className="w-4 h-4 bg-gradient-to-br from-os-accent-green to-os-accent-teal rounded-sm" />
            <span className="font-medium">{windows[windows.length - 1]?.title || 'Ashim OS'}</span>
          </div>
        )}
      </div>
      
      {/* Center: Date & Time */}
      <div className="flex items-center space-x-2 text-white/90 cursor-pointer hover:bg-white/10 px-3 py-1 rounded transition-colors" role="timer" aria-live="polite">
        <span className="hidden md:inline">{date}</span>
        <span className="font-mono">{time}</span>
        <ChevronDown className="w-3 h-3" />
      </div>
      
      {/* Right: System Tray */}
      <div className="flex items-center space-x-1">
        {/* Network Speed */}
        <div className="flex items-center space-x-1 px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/80" title="Network: 45 KB/s">
          <Activity className="w-3.5 h-3.5" />
          <span className="text-xs hidden lg:inline">45 KB/s</span>
        </div>
        
        {/* Battery */}
        <div className="flex items-center space-x-1 px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/80" title="Battery: 95%">
          <Battery className="w-3.5 h-3.5" />
          <span className="text-xs hidden lg:inline">95%</span>
        </div>
        
        {/* Volume */}
        <button 
          className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/80"
          aria-label="Volume"
          title="Volume"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
        
        {/* WiFi */}
        <button 
          className="p-1.5 hover:bg-white/10 rounded transition-colors text-os-accent-teal"
          aria-label="Network connected"
          title="WiFi Connected"
        >
          <Wifi className="w-3.5 h-3.5" />
        </button>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleHighContrast}
          className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/80"
          aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
          title="Toggle Theme"
        >
          {highContrast ? (
            <Sun className="w-3.5 h-3.5" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>
        
        {/* Power Menu */}
        <button 
          className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/80"
          aria-label="Power menu"
          title="Power"
        >
          <Power className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {/* Activities Overlay */}
      {showActivities && (
        <div 
          className="fixed inset-0 bg-black/80 z-50"
          onClick={() => setShowActivities(false)}
        >
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl p-8">
            <div className="text-center mb-8">
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full max-w-md mx-auto px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-os-accent-teal"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {windows.map((window) => (
                <div
                  key={window.id}
                  className="glass-panel p-4 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"
                  onClick={() => {
                    setShowActivities(false)
                  }}
                >
                  <div className="aspect-video bg-black/30 rounded mb-2 flex items-center justify-center">
                    <span className="text-white/50 text-sm">{window.title}</span>
                  </div>
                  <p className="text-white text-sm truncate">{window.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

