'use client'

import { useEffect, useRef, useCallback } from 'react'
import { FolderOpen, Terminal as TerminalIcon, Settings, RefreshCw, Info } from 'lucide-react'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { useKeyboardShortcut } from '@/shared/hooks/useKeyboardShortcut'
import { analytics } from '@/shared/lib/analytics'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const { openWindow } = useDesktopStore()

  // Use custom hooks for better code organization
  useClickOutside(menuRef, onClose)
  useKeyboardShortcut(['Escape'], onClose)
  
  const handleAction = useCallback((action: () => void, actionName: string) => {
    analytics.click('context_menu_item', { action: actionName })
    action()
  }, [])

  const menuItems = [
    {
      icon: FolderOpen,
      label: 'Open Files',
      action: () => {
        handleAction(() => {
          openWindow('projects', 'Projects')
          onClose()
        }, 'open_files')
      }
    },
    {
      icon: TerminalIcon,
      label: 'Open Terminal Here',
      action: () => {
        handleAction(() => {
          openWindow('terminal', 'Terminal')
          onClose()
        }, 'open_terminal')
      }
    },
    { divider: true },
    {
      icon: RefreshCw,
      label: 'Change Background',
      action: () => {
        handleAction(() => {
          onClose()
        }, 'change_background')
      }
    },
    {
      icon: Settings,
      label: 'Display Settings',
      action: () => {
        handleAction(() => {
          onClose()
        }, 'display_settings')
      }
    },
    { divider: true },
    {
      icon: Info,
      label: 'About Ashim OS',
      action: () => {
        handleAction(() => {
          openWindow('about', 'About')
          onClose()
        }, 'about_os')
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

