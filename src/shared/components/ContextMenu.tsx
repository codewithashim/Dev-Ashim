'use client'

import { useState, useEffect, useRef } from 'react'
import { FolderOpen, Terminal as TerminalIcon, Settings, RefreshCw, Info } from 'lucide-react'
import useDesktopStore from '@/shared/hooks/useDesktopStore'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const { openWindow } = useDesktopStore()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const menuItems = [
    {
      icon: FolderOpen,
      label: 'Open Files',
      action: () => {
        openWindow('projects', 'Projects')
        onClose()
      }
    },
    {
      icon: TerminalIcon,
      label: 'Open Terminal Here',
      action: () => {
        openWindow('terminal', 'Terminal')
        onClose()
      }
    },
    { divider: true },
    {
      icon: RefreshCw,
      label: 'Change Background',
      action: () => {
        onClose()
      }
    },
    {
      icon: Settings,
      label: 'Display Settings',
      action: () => {
        onClose()
      }
    },
    { divider: true },
    {
      icon: Info,
      label: 'About Ashim OS',
      action: () => {
        openWindow('about', 'About')
        onClose()
      }
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] glass-panel border border-white/20 rounded-lg shadow-2xl py-1 min-w-[200px]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {menuItems.map((item, index) => {
        if ('divider' in item && item.divider) {
          return <div key={index} className="h-px bg-white/10 my-1" />
        }

        const Icon = item.icon!
        return (
          <button
            key={index}
            onClick={item.action}
            className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-colors text-left text-white/90 text-sm"
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

