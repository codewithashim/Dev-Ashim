'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { User, Briefcase, FileText, Terminal as TerminalIcon, Mail, Moon, Sun } from 'lucide-react'
import useDesktopStore from '@/shared/hooks/useDesktopStore'
import { AppId } from '@/shared/types'

interface CommandItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  keywords?: string[]
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { openWindow, highContrast, toggleHighContrast } = useDesktopStore()
  
  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener('openCommandPalette', handleOpen)
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('openCommandPalette', handleOpen)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  
  const commands: CommandItem[] = [
    {
      id: 'about',
      label: 'Open About',
      icon: User,
      action: () => {
        openWindow('about', 'About')
        setOpen(false)
      },
      keywords: ['profile', 'bio', 'information'],
    },
    {
      id: 'projects',
      label: 'Open Projects',
      icon: Briefcase,
      action: () => {
        openWindow('projects', 'Projects')
        setOpen(false)
      },
      keywords: ['work', 'portfolio', 'code'],
    },
    {
      id: 'resume',
      label: 'Open Resume',
      icon: FileText,
      action: () => {
        openWindow('resume', 'Resume')
        setOpen(false)
      },
      keywords: ['cv', 'experience', 'skills'],
    },
    {
      id: 'terminal',
      label: 'Open Terminal',
      icon: TerminalIcon,
      action: () => {
        openWindow('terminal', 'Terminal')
        setOpen(false)
      },
      keywords: ['command', 'shell', 'console'],
    },
    {
      id: 'contact',
      label: 'Open Contact',
      icon: Mail,
      action: () => {
        openWindow('contact', 'Contact')
        setOpen(false)
      },
      keywords: ['email', 'reach', 'connect'],
    },
    {
      id: 'theme',
      label: highContrast ? 'Disable High Contrast' : 'Enable High Contrast',
      icon: highContrast ? Sun : Moon,
      action: () => {
        toggleHighContrast()
        setOpen(false)
      },
      keywords: ['theme', 'dark', 'light', 'accessibility'],
    },
  ]
  
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      
      {/* Command Dialog */}
      <Command
        className="relative glass-panel rounded-xl border shadow-2xl w-full max-w-2xl overflow-hidden"
        aria-label="Command palette"
      >
        <div className="flex items-center border-b border-os-border px-4">
          <svg
            className="w-5 h-5 text-os-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Command.Input
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-0 outline-none px-4 py-4 text-os-text placeholder:text-os-text-muted"
            autoFocus
          />
          <kbd className="hidden sm:block px-2 py-1 text-xs bg-os-surface border border-os-border rounded font-mono text-os-text-muted">
            ESC
          </kbd>
        </div>
        
        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-os-text-muted">
            No results found.
          </Command.Empty>
          
          <Command.Group heading="Applications" className="text-xs text-os-text-muted px-2 py-1.5 font-medium">
            {commands.map((command) => {
              const Icon = command.icon
              return (
                <Command.Item
                  key={command.id}
                  onSelect={command.action}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-os-border/50 transition-colors aria-selected:bg-os-border/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-os-surface flex items-center justify-center">
                    <Icon className="w-4 h-4 text-os-accent-teal" />
                  </div>
                  <span className="flex-1 text-sm">{command.label}</span>
                </Command.Item>
              )
            })}
          </Command.Group>
        </Command.List>
        
        <div className="border-t border-os-border px-4 py-2 text-xs text-os-text-muted flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-os-surface border border-os-border rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-os-surface border border-os-border rounded">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-os-surface border border-os-border rounded">Enter</kbd>
              <span>Select</span>
            </span>
          </div>
          <span className="flex items-center space-x-1">
            <kbd className="px-1.5 py-0.5 bg-os-surface border border-os-border rounded">ESC</kbd>
            <span>Close</span>
          </span>
        </div>
      </Command>
    </div>
  )
}

