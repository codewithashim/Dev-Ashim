'use client'

import { useRef, useCallback, useState, memo } from 'react'
import { Minus, Square, X, Maximize2 } from 'lucide-react'
import { motion, PanInfo } from 'framer-motion'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { WindowState } from '@/shared/types'
import { WINDOW_CONFIG } from '@/shared/constants'
import { clamp } from '@/shared/utils'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

function Window({ window, children }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktopStore()
  
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    focusWindow(window.id)
  }, [focusWindow, window.id])
  
  const handleDragEnd = useCallback((_event: any, info: PanInfo) => {
    setIsDragging(false)
    const newX = Math.max(0, window.position.x + info.offset.x)
    const newY = Math.max(32, window.position.y + info.offset.y) // Don't go above topbar
    
    updateWindowPosition(window.id, { x: newX, y: newY })
  }, [window.position.x, window.position.y, window.id, updateWindowPosition])
  
  const handleResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    focusWindow(window.id)
    
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = window.size.width
    const startHeight = window.size.height
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY
      
      const viewportWidth = typeof globalThis !== 'undefined' ? globalThis.innerWidth : 1920
      const viewportHeight = typeof globalThis !== 'undefined' ? globalThis.innerHeight : 1080
      const maxWidth = viewportWidth - window.position.x
      const maxHeight = viewportHeight - window.position.y
      
      const newWidth = clamp(
        startWidth + deltaX,
        WINDOW_CONFIG.minWidth,
        maxWidth
      )
      const newHeight = clamp(
        startHeight + deltaY,
        WINDOW_CONFIG.minHeight,
        maxHeight
      )
      
      updateWindowSize(window.id, { width: newWidth, height: newHeight })
    }
    
    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [window.id, window.size.width, window.size.height, window.position.x, window.position.y, focusWindow, updateWindowSize])
  
  const handleClose = useCallback(() => {
    closeWindow(window.id)
  }, [closeWindow, window.id])
  
  const handleMinimize = useCallback(() => {
    minimizeWindow(window.id)
  }, [minimizeWindow, window.id])
  
  const handleMaximize = useCallback(() => {
    maximizeWindow(window.id)
  }, [maximizeWindow, window.id])
  
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Toggle maximize/restore
    maximizeWindow(window.id)
  }, [maximizeWindow, window.id])
  
  const handleFocus = useCallback(() => {
    focusWindow(window.id)
  }, [focusWindow, window.id])
  
  if (window.isMinimized) {
    return null
  }
  
  return (
    <motion.div
      ref={windowRef}
      className={`${window.isMaximized ? 'fixed' : 'absolute'} ${isDragging || isResizing ? 'select-none' : ''} ${
        window.isMaximized ? '' : 'window-shadow'
      }`}
      style={{
        zIndex: window.zIndex,
        // When maximized: full width, positioned below topbar, height excludes topbar and dock
        // Topbar = 32px, Dock area = 80px (includes spacing)
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 32 : window.position.y,
        right: window.isMaximized ? 0 : 'auto',
        bottom: window.isMaximized ? 80 : 'auto',
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? 'auto' : window.size.height,
        maxWidth: '100vw',
        maxHeight: window.isMaximized ? 'calc(100vh - 112px)' : window.size.height,
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      exit={{ scale: 0.95, opacity: 0 }}
      onClick={handleFocus}
      drag={!window.isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragListener={!window.isMaximized}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div 
        className={`flex flex-col ${
          window.isMaximized 
            ? 'h-full rounded-none' 
            : 'h-full rounded-xl border border-white/20 shadow-2xl'
        }`}
        style={{
          background: window.isMaximized 
            ? 'rgba(30, 30, 30, 0.98)' 
            : 'rgba(25, 25, 25, 0.95)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          minHeight: 0,
        }}
      >
        {/* Title Bar - Ubuntu Style */}
        <div
          className={`flex items-center justify-between px-3 py-2 border-b border-white/10 flex-shrink-0 ${
            window.isMaximized ? 'cursor-default select-none' : 'cursor-move select-none'
          }`}
          style={{
            background: 'rgba(40, 40, 40, 0.98)',
            backdropFilter: 'blur(20px)',
            height: '40px',
            minHeight: '40px',
          }}
          onDoubleClick={handleDoubleClick}
          role="banner"
          onMouseDown={(e) => {
            // Prevent dragging when maximized
            if (window.isMaximized) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          {/* Ubuntu-style window controls on the LEFT */}
          <div className="flex items-center space-x-2 flex-shrink-0" role="group" aria-label="Window controls">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-150 flex items-center justify-center group shadow-sm"
              aria-label="Close window"
              title="Close"
              type="button"
            >
              <X className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-950" aria-hidden="true" strokeWidth={3} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleMinimize()
              }}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-150 flex items-center justify-center group shadow-sm"
              aria-label="Minimize window"
              title="Minimize"
              type="button"
            >
              <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-950" aria-hidden="true" strokeWidth={3} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleMaximize()
              }}
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-150 flex items-center justify-center group shadow-sm"
              aria-label={window.isMaximized ? "Restore window" : "Maximize window"}
              title={window.isMaximized ? "Restore" : "Maximize"}
              type="button"
            >
              {window.isMaximized ? (
                <Square className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-950" aria-hidden="true" strokeWidth={2.5} />
              ) : (
                <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-950" aria-hidden="true" strokeWidth={2.5} />
              )}
            </button>
          </div>
          
          {/* Window Title - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 pointer-events-none">
            <span className="text-[13px] font-semibold text-white/95">{window.title}</span>
          </div>
          
          {/* Right side - Empty for balance (Ubuntu style) */}
          <div className="w-[68px] flex-shrink-0" />
        </div>
        
        {/* Content */}
        <div 
          className="flex-1 overflow-auto" 
          style={{ 
            background: 'rgba(30, 30, 30, 0.95)',
            minHeight: 0,
          }}
        >
          {children}
        </div>
        
        {/* Resize Handle */}
        {!window.isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize group"
            onMouseDown={handleResize}
            aria-label="Resize window"
            role="button"
            tabIndex={0}
          >
            <div className="absolute bottom-1 right-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 2L2 10M10 6L6 10" stroke="currentColor" strokeWidth="1" className="text-white/20 group-hover:text-white/40 transition-colors" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(Window, (prevProps, nextProps) => {
  // Only re-render if window state changes
  return (
    prevProps.window.id === nextProps.window.id &&
    prevProps.window.position.x === nextProps.window.position.x &&
    prevProps.window.position.y === nextProps.window.position.y &&
    prevProps.window.size.width === nextProps.window.size.width &&
    prevProps.window.size.height === nextProps.window.size.height &&
    prevProps.window.isMinimized === nextProps.window.isMinimized &&
    prevProps.window.isMaximized === nextProps.window.isMaximized &&
    prevProps.window.zIndex === nextProps.window.zIndex &&
    prevProps.window.title === nextProps.window.title
  )
})

