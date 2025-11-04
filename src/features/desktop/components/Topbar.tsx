'use client'

import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react'
import { Moon, Sun, Volume2, Wifi, Battery, Power, ChevronDown, Settings, LogOut, RotateCcw, Search } from 'lucide-react'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { formatTime, formatDate } from '@/shared/utils'
import { useClickOutside } from '@/shared/hooks/useClickOutside'

function Topbar() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [showActivities, setShowActivities] = useState(false)
  const [showSystemMenu, setShowSystemMenu] = useState(false)
  const [showPowerDialog, setShowPowerDialog] = useState<'restart' | 'poweroff' | 'logout' | null>(null)
  const [batteryLevel, setBatteryLevel] = useState(95)
  const { highContrast, toggleHighContrast, windows } = useDesktopStore()
  const systemMenuRef = useRef<HTMLDivElement>(null)
  
  useClickOutside(systemMenuRef, () => setShowSystemMenu(false))
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(formatTime(now))
      setDate(formatDate(now))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Simulate battery level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(20, Math.min(100, prev + change))
      })
    }, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  const handleToggleActivities = useCallback(() => {
    setShowActivities(prev => !prev)
    setShowSystemMenu(false)
  }, [])
  
  const handleCloseActivities = useCallback(() => {
    setShowActivities(false)
  }, [])
  
  const handleToggleSystemMenu = useCallback(() => {
    setShowSystemMenu(prev => !prev)
    setShowActivities(false)
  }, [])
  
  const activeWindowTitle = useMemo(() => {
    return windows.length > 0 ? windows[windows.length - 1]?.title || 'Ashim OS' : 'Ashim OS'
  }, [windows])
  
  const getBatteryColor = useCallback((level: number) => {
    if (level > 50) return 'text-emerald-400'
    if (level > 20) return 'text-yellow-400'
    return 'text-red-400'
  }, [])
  
  const handleOpenSettings = useCallback(() => {
    setShowSystemMenu(false)
    // You can create a settings window/app later
    alert('Settings panel coming soon! 🛠️')
  }, [])
  
  const handleRestart = useCallback(() => {
    setShowSystemMenu(false)
    setShowPowerDialog('restart')
  }, [])
  
  const handlePowerOff = useCallback(() => {
    setShowSystemMenu(false)
    setShowPowerDialog('poweroff')
  }, [])
  
  const handleLogOut = useCallback(() => {
    setShowSystemMenu(false)
    setShowPowerDialog('logout')
  }, [])
  
  const confirmAction = useCallback(() => {
    if (showPowerDialog === 'restart') {
      // Simulate restart - reload the page
      window.location.reload()
    } else if (showPowerDialog === 'poweroff') {
      // Simulate power off - redirect to a blank page or show shutdown screen
      document.body.innerHTML = `
        <div style="
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: system-ui;
          flex-direction: column;
          gap: 20px;
        ">
          <div style="font-size: 48px;">⏻</div>
          <div style="font-size: 24px;">System powered off</div>
          <div style="font-size: 14px; color: #888;">You can safely close this window</div>
        </div>
      `
    } else if (showPowerDialog === 'logout') {
      // Simulate logout - reload to boot screen
      window.location.reload()
    }
    setShowPowerDialog(null)
  }, [showPowerDialog])
  
  const cancelAction = useCallback(() => {
    setShowPowerDialog(null)
  }, [])
  
  return (
    <>
      <div 
        className="relative h-8 flex items-center justify-between px-3 z-50 border-b border-white/10 text-sm"
        style={{ 
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(30px) saturate(150%)',
          WebkitBackdropFilter: 'blur(30px) saturate(150%)',
        }}
      >
        {/* Subtle top gradient highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Left: Activities & App Name */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <button
            onClick={handleToggleActivities}
            className={`px-3 py-0.5 hover:bg-white/10 rounded-md transition-all duration-200 font-medium text-white text-[13px]
              ${showActivities ? 'bg-white/15 shadow-inner' : ''}
            `}
            aria-label="Toggle activities overview"
            type="button"
          >
            Activities
          </button>
          {windows.length > 0 && (
            <div className="flex items-center space-x-2 text-white/90 min-w-0">
              <div 
                className="w-3.5 h-3.5 rounded-sm flex-shrink-0" 
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
                  boxShadow: '0 0 8px rgba(34, 197, 94, 0.3)'
                }}
                aria-hidden="true" 
              />
              <span className="font-medium text-[13px] truncate">{activeWindowTitle}</span>
            </div>
          )}
        </div>
        
        {/* Center: Date & Time */}
        <button
          className="flex items-center space-x-2 text-white/90 hover:bg-white/10 px-3 py-0.5 rounded-md transition-all duration-200 group"
          role="timer" 
          aria-live="polite"
          aria-label="Date and time"
          type="button"
        >
          <span className="hidden md:inline text-[13px] font-medium">{date}</span>
          <span className="font-mono text-[13px] font-medium">{time}</span>
          <ChevronDown className="w-3 h-3 text-white/60 group-hover:text-white/90 transition-colors" />
        </button>
        
        {/* Right: System Tray */}
        <div className="flex items-center space-x-0.5 flex-1 justify-end">
          {/* Battery */}
          <button 
            className="flex items-center space-x-1.5 px-2.5 py-0.5 hover:bg-white/10 rounded-md transition-all duration-200 group"
            title={`Battery: ${batteryLevel}%`}
            aria-label={`Battery level: ${batteryLevel}%`}
            type="button"
          >
            <Battery className={`w-4 h-4 ${getBatteryColor(batteryLevel)} transition-colors`} />
            <span className="text-[12px] text-white/90 font-medium hidden xl:inline">{batteryLevel}%</span>
          </button>
          
          {/* WiFi */}
          <button 
            className="p-1.5 hover:bg-white/10 rounded-md transition-all duration-200"
            aria-label="Network connected"
            title="WiFi Connected"
            type="button"
          >
            <Wifi className="w-4 h-4 text-emerald-400" style={{ filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.4))' }} />
          </button>
          
          {/* Volume */}
          <button 
            className="p-1.5 hover:bg-white/10 rounded-md transition-all duration-200"
            aria-label="Volume"
            title="Volume: 80%"
            type="button"
          >
            <Volume2 className="w-4 h-4 text-white/80" />
          </button>
          
          {/* System Menu Button */}
          <div className="relative" ref={systemMenuRef}>
            <button
              onClick={handleToggleSystemMenu}
              className={`p-1.5 hover:bg-white/10 rounded-md transition-all duration-200
                ${showSystemMenu ? 'bg-white/15' : ''}
              `}
              aria-label="System menu"
              title="System"
              type="button"
            >
              <ChevronDown className={`w-4 h-4 text-white/80 transition-transform duration-200 ${showSystemMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {/* System Menu Dropdown */}
            {showSystemMenu && (
              <div 
                className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/20 shadow-2xl overflow-hidden"
                style={{ 
                  background: 'rgba(20, 20, 20, 0.95)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                }}
              >
                {/* User Section */}
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AP</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">Ashim Rudra Paul</p>
                      <p className="text-white/60 text-xs">Developer</p>
                    </div>
                  </div>
                </div>
                
                {/* System Controls */}
                <div className="py-2">
                  <button
                    onClick={toggleHighContrast}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-white/90 text-sm"
                    type="button"
                  >
                    {highContrast ? (
                      <Sun className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Moon className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>Theme</span>
                    <span className="ml-auto text-xs text-white/60">{highContrast ? 'Light' : 'Dark'}</span>
                  </button>
                  
                  <button
                    onClick={handleOpenSettings}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-white/90 text-sm group"
                    type="button"
                  >
                    <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Settings</span>
                  </button>
                </div>
                
                {/* Power Options */}
                <div className="border-t border-white/10 py-2">
                  <button
                    onClick={handleRestart}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-white/90 text-sm group"
                    type="button"
                  >
                    <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    <span>Restart</span>
                  </button>
                  
                  <button
                    onClick={handlePowerOff}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-red-400 text-sm group"
                    type="button"
                  >
                    <Power className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Power Off</span>
                  </button>
                  
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-white/90 text-sm group"
                    type="button"
                  >
                    <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Power Confirmation Dialog */}
      {showPowerDialog && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.15s ease-out'
          }}
          onClick={cancelAction}
        >
          <div 
            className="w-full max-w-md mx-4 rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            style={{ 
              background: 'rgba(20, 20, 20, 0.98)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              animation: 'scaleIn 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="px-6 py-5 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  showPowerDialog === 'poweroff' ? 'bg-red-500/20' : 
                  showPowerDialog === 'restart' ? 'bg-blue-500/20' : 
                  'bg-orange-500/20'
                }`}>
                  {showPowerDialog === 'poweroff' && <Power className="w-6 h-6 text-red-400" />}
                  {showPowerDialog === 'restart' && <RotateCcw className="w-6 h-6 text-blue-400" />}
                  {showPowerDialog === 'logout' && <LogOut className="w-6 h-6 text-orange-400" />}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {showPowerDialog === 'poweroff' && 'Power Off'}
                    {showPowerDialog === 'restart' && 'Restart'}
                    {showPowerDialog === 'logout' && 'Log Out'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {showPowerDialog === 'poweroff' && 'Shut down the system'}
                    {showPowerDialog === 'restart' && 'Restart the system'}
                    {showPowerDialog === 'logout' && 'End your session'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Dialog Content */}
            <div className="px-6 py-5">
              <p className="text-white/80 text-sm leading-relaxed">
                {showPowerDialog === 'poweroff' && 'Are you sure you want to power off? All unsaved work will be lost.'}
                {showPowerDialog === 'restart' && 'Are you sure you want to restart? All unsaved work will be lost.'}
                {showPowerDialog === 'logout' && 'Are you sure you want to log out? All unsaved work will be lost.'}
              </p>
            </div>
            
            {/* Dialog Actions */}
            <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-end space-x-3">
              <button
                onClick={cancelAction}
                className="px-5 py-2.5 rounded-lg text-white/90 hover:bg-white/10 transition-all duration-200 font-medium text-sm"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  showPowerDialog === 'poweroff' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : showPowerDialog === 'restart'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
                type="button"
              >
                {showPowerDialog === 'poweroff' && 'Power Off'}
                {showPowerDialog === 'restart' && 'Restart'}
                {showPowerDialog === 'logout' && 'Log Out'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Activities Overlay */}
      {showActivities && (
        <div 
          className="fixed inset-0 z-50"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={handleCloseActivities}
          role="dialog"
          aria-label="Activities overview"
        >
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6">
            {/* Search Bar */}
            <div className="mb-12">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search for applications, windows, or settings..."
                  className="w-full pl-14 pr-6 py-4 text-white placeholder-white/40 outline-none text-base rounded-2xl border border-white/20 shadow-2xl"
                  style={{
                    background: 'rgba(30, 30, 30, 0.95)',
                    backdropFilter: 'blur(40px)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            </div>
            
            {/* Windows Grid */}
            {windows.length > 0 ? (
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-4 px-2">Open Windows</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {windows.map((window) => (
                    <button
                      key={window.id}
                      className="group p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-200 hover:scale-105"
                      style={{
                        background: 'rgba(30, 30, 30, 0.9)',
                        backdropFilter: 'blur(20px)',
                      }}
                      onClick={handleCloseActivities}
                      type="button"
                    >
                      <div 
                        className="aspect-video bg-gradient-to-br from-white/5 to-white/10 rounded-lg mb-3 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors"
                      >
                        <span className="text-white/60 text-xs font-medium">{window.title}</span>
                      </div>
                      <p className="text-white text-sm font-medium truncate text-left">{window.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <Search className="w-10 h-10 text-white/30" />
                </div>
                <p className="text-white/60 text-base">No open windows</p>
                <p className="text-white/40 text-sm mt-2">Open an application from the dock to get started</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}

export default memo(Topbar)

