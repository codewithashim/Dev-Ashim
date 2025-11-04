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
    const newX = window.position.x + info.offset.x
    const newY = window.position.y + info.offset.y
    
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
  
  const handleDoubleClick = useCallback(() => {
    if (!window.isMaximized) {
      maximizeWindow(window.id)
    } else {
      maximizeWindow(window.id) // Toggle maximize
    }
  }, [maximizeWindow, window.id, window.isMaximized])
  
  const handleFocus = useCallback(() => {
    focusWindow(window.id)
  }, [focusWindow, window.id])
  
  if (window.isMinimized) {
    return null
  }
  
  return (
    <motion.div
      ref={windowRef}
      className={`absolute window-shadow ${isDragging || isResizing ? 'select-none' : ''}`}
      style={{
        zIndex: window.zIndex,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: window.position.x,
        y: window.position.y,
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 7rem)' : window.size.height,
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: WINDOW_CONFIG.dragDelay || 0.15 }}
      onClick={handleFocus}
      drag={!window.isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={`rounded-xl overflow-hidden h-full flex flex-col border shadow-2xl ${
        window.isMaximized ? 'rounded-none border-none' : 'border-white/20'
      }`}
      style={{
        background: 'rgba(25, 25, 25, 0.95)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      }}
      >
        {/* Title Bar - Ubuntu Style */}
        <div
          className={`flex items-center justify-between px-3 py-2 border-b border-white/10 select-none ${
            window.isMaximized ? 'cursor-default' : 'cursor-move'
          }`}
          style={{
            background: 'rgba(40, 40, 40, 0.95)',
            backdropFilter: 'blur(20px)',
          }}
          onDoubleClick={handleDoubleClick}
          role="banner"
        >
          {/* Ubuntu-style window controls on the LEFT */}
          <div className="flex items-center space-x-2" role="group" aria-label="Window controls">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-500 transition-colors flex items-center justify-center group"
              aria-label="Close window"
              title="Close"
              type="button"
            >
              <X className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-900" aria-hidden="true" strokeWidth={3} />
            </button>
            
            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-500 transition-colors flex items-center justify-center group"
              aria-label="Minimize window"
              title="Minimize"
              type="button"
            >
              <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-900" aria-hidden="true" strokeWidth={3} />
            </button>
            
            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-emerald-500/90 hover:bg-emerald-500 transition-colors flex items-center justify-center group"
              aria-label={window.isMaximized ? "Restore window" : "Maximize window"}
              title={window.isMaximized ? "Restore" : "Maximize"}
              type="button"
            >
              {window.isMaximized ? (
                <Square className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-900" aria-hidden="true" strokeWidth={3} />
              ) : (
                <Maximize2 className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-900" aria-hidden="true" strokeWidth={3} />
              )}
            </button>
          </div>
          
          {/* Window Title - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 pointer-events-none">
            <span className="text-[13px] font-medium text-white/90">{window.title}</span>
          </div>
          
          {/* Right side - Empty for balance (Ubuntu style) */}
          <div className="w-20" />
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden bg-os-bg/50">
          {children}
        </div>
        
        {/* Resize Handle */}
        {!window.isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={handleResize}
            aria-label="Resize window"
            role="button"
            tabIndex={0}
          >
            <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-os-border" />
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

