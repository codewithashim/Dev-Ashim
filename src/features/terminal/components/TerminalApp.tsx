'use client'

import { useState, useRef, useEffect } from 'react'
import { portfolioData } from '@/shared/data/portfolio'
import useDesktopStore from '@/shared/hooks/useDesktopStore'

interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
}

interface TerminalAppProps {
  windowId: string
}

export default function TerminalApp({ windowId }: TerminalAppProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Ashim OS Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { openWindow } = useDesktopStore()
  
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])
  
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
  const addLine = (content: string, type: 'input' | 'output' | 'error' = 'output') => {
    setLines((prev) => [...prev, { type, content }])
  }
  
  const addLines = (contents: string[], type: 'output' | 'error' = 'output') => {
    setLines((prev) => [...prev, ...contents.map(content => ({ type, content }))])
  }
  
  const commands: Record<string, () => void> = {
    help: () => {
      addLines([
        '',
        'Available commands:',
        '  help              Show this help message',
        '  about             Display information about Ashim',
        '  skills            List technical skills',
        '  experience        Show work experience',
        '  projects          List all projects',
        '  open <project>    Open project details (e.g., open lipika-ai)',
        '  resume            Display resume',
        '  download resume   Download resume as PDF',
        '  contact           Show contact information',
        '  email             Open email client',
        '  clear             Clear terminal',
        '  exit              Close terminal',
        '',
      ])
    },
    
    about: () => {
      addLines([
        '',
        ...portfolioData.about,
        '',
      ])
    },
    
    skills: () => {
      addLines([
        '',
        '╔═══════════════════════════════════════════════════════════════════╗',
        '║                          TECHNICAL SKILLS                          ║',
        '╚═══════════════════════════════════════════════════════════════════╝',
        '',
        ...portfolioData.skills.flatMap(skill => [
          `${skill.category}:`,
          `  ${skill.items}`,
          '',
        ]),
      ])
    },
    
    experience: () => {
      addLines([
        '',
        '╔═══════════════════════════════════════════════════════════════════╗',
        '║                        WORK EXPERIENCE                             ║',
        '╚═══════════════════════════════════════════════════════════════════╝',
        '',
        ...portfolioData.experience.flatMap(exp => [
          `${exp.position} @ ${exp.company}`,
          `${exp.period} | ${exp.location} | ${exp.type}`,
          '',
          'Key Responsibilities:',
          ...exp.responsibilities.map(r => `  • ${r}`),
          '',
          '─'.repeat(70),
          '',
        ]),
      ])
    },
    
    projects: () => {
      addLines([
        '',
        '╔═══════════════════════════════════════════════════════════════════╗',
        '║                            PROJECTS                                ║',
        '╚═══════════════════════════════════════════════════════════════════╝',
        '',
        ...portfolioData.projects.flatMap(project => [
          `${project.name} [${project.id}]`,
          `  ${project.description}`,
          `  Tech: ${project.tech.join(', ')}`,
          project.link ? `  Link: ${project.link}` : '',
          '',
        ]).filter(Boolean),
        'Use "open <project-id>" to see project details',
        '',
      ])
    },
    
    resume: () => {
      addLines([
        '',
        '═'.repeat(70),
        `  ${portfolioData.name.toUpperCase()}`,
        `  ${portfolioData.title}`,
        '═'.repeat(70),
        '',
        'CONTACT',
        `  Email: ${portfolioData.email}`,
        `  Phone: ${portfolioData.phone}`,
        `  Location: ${portfolioData.location}`,
        `  Portfolio: ${portfolioData.portfolio}`,
        `  LinkedIn: ${portfolioData.linkedin}`,
        `  GitHub: ${portfolioData.github}`,
        '',
        'SKILLS',
        ...portfolioData.skills.map(s => `  ${s.category}: ${s.items}`),
        '',
        'EXPERIENCE',
        ...portfolioData.experience.flatMap(exp => [
          `  ${exp.position} @ ${exp.company}`,
          `  ${exp.period} | ${exp.type}`,
          '',
        ]),
        'EDUCATION',
        `  ${portfolioData.education}`,
        '',
        'Type "download resume" to get PDF version',
        '',
      ])
    },
    
    contact: () => {
      addLines([
        '',
        '╔═══════════════════════════════════════════════════════════════════╗',
        '║                        CONTACT INFORMATION                         ║',
        '╚═══════════════════════════════════════════════════════════════════╝',
        '',
        `  Name:       ${portfolioData.name}`,
        `  Email:      ${portfolioData.email}`,
        `  Phone:      ${portfolioData.phone}`,
        `  Location:   ${portfolioData.location}`,
        '',
        `  Portfolio:  ${portfolioData.portfolio}`,
        `  LinkedIn:   ${portfolioData.linkedin}`,
        `  GitHub:     ${portfolioData.github}`,
        '',
        'Type "email" to open your email client',
        '',
      ])
    },
    
    email: () => {
      window.open(`mailto:${portfolioData.email}`, '_blank')
      addLines(['', `Opening email client for ${portfolioData.email}...`, ''])
    },
    
    clear: () => {
      setLines([])
    },
    
    exit: () => {
      // This will be handled in handleCommand
    },
  }
  
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    
    if (!trimmedCmd) return
    
    // Add to history
    setHistory((prev) => [...prev, trimmedCmd])
    setHistoryIndex(-1)
    
    // Add command to output
    addLine(`$ ${trimmedCmd}`, 'input')
    
    // Parse command
    const parts = trimmedCmd.toLowerCase().split(' ')
    const command = parts[0] || ''
    const args = parts.slice(1)
    
    // Handle special commands
    if (command === 'open' && args.length > 0) {
      const projectId = args.join('-')
      const project = portfolioData.projects.find(p => p.id === projectId)
      
      if (project) {
        addLines([
          '',
          `═══ ${project.name} ═══`,
          '',
          project.description,
          '',
          `Tech Stack: ${project.tech.join(', ')}`,
          '',
          'Highlights:',
          ...project.highlights.map(h => `  • ${h}`),
          '',
          project.link ? `🔗 Live: ${project.link}` : '',
          project.github ? `💻 GitHub: ${project.github}` : '',
          '',
        ].filter(Boolean))
        
        // Also open projects window
        setTimeout(() => openWindow('projects', 'Projects'), 500)
      } else {
        addLine(`Project "${args.join(' ')}" not found. Type "projects" to see all projects.`, 'error')
      }
      return
    }
    
    if (trimmedCmd === 'download resume') {
      addLines(['', '📄 Downloading resume...', 'Note: PDF generation would be implemented in production', ''])
      return
    }
    
    if (command === 'exit') {
      addLines(['', 'Closing terminal...', ''])
      setTimeout(() => {
        const { closeWindow } = useDesktopStore.getState()
        closeWindow(windowId)
      }, 500)
      return
    }
    
    // Execute command
    if (commands[command]) {
      commands[command]()
    } else {
      addLine(`Command not found: ${command}. Type "help" for available commands.`, 'error')
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        const historyItem = history[newIndex]
        if (historyItem !== undefined) {
          setInput(historyItem)
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          const historyItem = history[newIndex]
          if (historyItem !== undefined) {
            setInput(historyItem)
          }
        }
      }
    }
  }
  
  return (
    <div
      className="h-full bg-os-bg font-mono text-sm p-4 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-4xl mx-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`mb-1 ${
              line.type === 'input'
                ? 'text-os-accent-teal font-bold'
                : line.type === 'error'
                ? 'text-os-accent-red'
                : 'text-os-text'
            }`}
          >
            {line.content || '\u00A0'}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-os-accent-green mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-os-text caret-os-accent-teal"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
          <span className="animate-blink">▊</span>
        </form>
        
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}

