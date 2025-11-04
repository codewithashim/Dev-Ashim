'use client'

import { useRef, useEffect, useState } from 'react'
import { Minus, Square, X, Maximize2 } from 'lucide-react'
import { motion, PanInfo } from 'framer-motion'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { WindowState } from '@/shared/types'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

export default function Window({ window, children }: WindowProps) {
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
  
  const handleDragStart = () => {
    setIsDragging(true)
    focusWindow(window.id)
  }
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false)
    const newX = window.position.x + info.offset.x
    const newY = window.position.y + info.offset.y
    
    // Constrain to viewport
    const maxX = typeof globalThis !== 'undefined' ? globalThis.innerWidth - 200 : 1200
    const maxY = typeof globalThis !== 'undefined' ? globalThis.innerHeight - 100 : 800
    
    updateWindowPosition(window.id, {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    })
  }
  
  const handleResize = (e: React.MouseEvent) => {
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
      
      const maxWidth = typeof globalThis !== 'undefined' ? globalThis.innerWidth - window.position.x : 1200
      const maxHeight = typeof globalThis !== 'undefined' ? globalThis.innerHeight - window.position.y : 800
      
      const newWidth = Math.max(400, Math.min(startWidth + deltaX, maxWidth))
      const newHeight = Math.max(300, Math.min(startHeight + deltaY, maxHeight))
      
      updateWindowSize(window.id, { width: newWidth, height: newHeight })
    }
    
    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  if (window.isMinimized) {
    return null
  }
  
  const windowStyle = window.isMaximized
    ? { x: 0, y: 0, width: '100vw', height: 'calc(100vh - 7rem)' }
    : {
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
      }
  
  return (
    <motion.div
      ref={windowRef}
      className={`absolute window-shadow ${isDragging || isResizing ? 'select-none' : ''}`}
      style={{
        zIndex: window.zIndex,
        ...windowStyle,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={() => focusWindow(window.id)}
    >
      <div className="glass-panel rounded-xl overflow-hidden h-full flex flex-col border-white/10 shadow-2xl">
        {/* Title Bar */}
        <motion.div
          className="flex items-center justify-between px-4 py-2.5 bg-black/40 backdrop-blur-xl border-b border-white/10 cursor-move"
          drag={!window.isMaximized}
          dragMomentum={false}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          role="banner"
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-os-accent-green to-os-accent-teal" />
            <span className="text-sm font-medium truncate text-white">{window.title}</span>
          </div>
          
          <div className="flex items-center space-x-1" role="group" aria-label="Window controls">
            <button
              onClick={() => minimizeWindow(window.id)}
              className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/70 hover:text-white"
              aria-label="Minimize window"
              title="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => maximizeWindow(window.id)}
              className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/70 hover:text-white"
              aria-label={window.isMaximized ? "Restore window" : "Maximize window"}
              title={window.isMaximized ? "Restore" : "Maximize"}
            >
              {window.isMaximized ? (
                <Square className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
            
            <button
              onClick={() => closeWindow(window.id)}
              className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors text-white/70"
              aria-label="Close window"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
        
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

