'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootLoaderProps {
  onBootComplete: () => void
}

interface BootMessage {
  text: string
  type: 'info' | 'ok' | 'done' | 'header'
  delay: number
}

export default function BootLoader({ onBootComplete }: BootLoaderProps) {
  const [bootMessages, setBootMessages] = useState<BootMessage[]>([])
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const messages: BootMessage[] = [
      { text: 'Ashim OS v1.0.0-portfolio [Linux 6.8.0-ashim]', type: 'header', delay: 0 },
      { text: '', type: 'info', delay: 50 },
      { text: '[    0.000000] Initializing kernel subsystems...', type: 'info', delay: 40 },
      { text: '[    0.123456] CPU: Intel(R) Core(TM) Portfolio Engine', type: 'info', delay: 40 },
      { text: '[    0.234567] Memory: 8GB available', type: 'info', delay: 40 },
      { text: '[  OK  ] Kernel initialization complete', type: 'ok', delay: 60 },
      { text: '', type: 'info', delay: 30 },
      { text: '[    0.345678] Loading core system modules...', type: 'info', delay: 40 },
      { text: '[    0.456789] Module: Desktop Environment', type: 'info', delay: 40 },
      { text: '[    0.567890] Module: Window Manager', type: 'info', delay: 40 },
      { text: '[    0.678901] Module: Application Framework', type: 'info', delay: 40 },
      { text: '[  OK  ] Core modules loaded', type: 'ok', delay: 60 },
      { text: '', type: 'info', delay: 30 },
      { text: '[    1.012345] Starting systemd services...', type: 'info', delay: 40 },
      { text: '[    1.123456] Starting Portfolio Service...', type: 'info', delay: 40 },
      { text: '[    1.234567] Starting Project Manager...', type: 'info', delay: 40 },
      { text: '[    1.345678] Starting Experience Handler...', type: 'info', delay: 40 },
      { text: '[  OK  ] Started Portfolio Service', type: 'ok', delay: 60 },
      { text: '[  OK  ] Started Project Manager', type: 'ok', delay: 60 },
      { text: '[  OK  ] Started Experience Handler', type: 'ok', delay: 60 },
      { text: '', type: 'info', delay: 30 },
      { text: '[    1.567890] Loading user data and assets...', type: 'info', delay: 40 },
      { text: '[    1.678901] Fetching: About.json', type: 'info', delay: 40 },
      { text: '[    1.789012] Fetching: Projects.json', type: 'info', delay: 40 },
      { text: '[    1.890123] Fetching: Experience.json', type: 'info', delay: 40 },
      { text: '[    1.987654] Fetching: Skills.json', type: 'info', delay: 40 },
      { text: '[  OK  ] Portfolio data loaded', type: 'ok', delay: 60 },
      { text: '', type: 'info', delay: 30 },
      { text: '[    2.123456] Mounting virtual filesystems...', type: 'info', delay: 40 },
      { text: '[    2.234567] Mounted: /desktop', type: 'info', delay: 40 },
      { text: '[    2.345678] Mounted: /applications', type: 'info', delay: 40 },
      { text: '[    2.456789] Mounted: /terminal', type: 'info', delay: 40 },
      { text: '[  OK  ] All filesystems mounted', type: 'ok', delay: 60 },
      { text: '', type: 'info', delay: 30 },
      { text: '[    2.678901] Starting display manager...', type: 'info', delay: 40 },
      { text: '[    2.789012] Initializing graphics subsystem', type: 'info', delay: 40 },
      { text: '[    2.890123] Loading UI components', type: 'info', delay: 40 },
      { text: '[    2.987654] Preparing workspace', type: 'info', delay: 40 },
      { text: '[  OK  ] Display manager started', type: 'ok', delay: 60 },
      { text: '', type: 'info', delay: 30 },
      { text: '[  OK  ] Reached target Multi-User System', type: 'ok', delay: 60 },
      { text: '[  OK  ] Reached target Graphical Interface', type: 'ok', delay: 60 },
      { text: '', type: 'info', delay: 100 },
      { text: 'Ashim OS 1.0.0 LTS', type: 'done', delay: 200 },
      { text: 'ashim-portfolio login: _', type: 'done', delay: 500 },
    ]

    let isMounted = true
    let index = 0

    const displayMessages = async () => {
      for (const message of messages) {
        if (!isMounted) break
        
        await new Promise(resolve => setTimeout(resolve, message.delay))
        
        if (isMounted) {
          setBootMessages(prev => [...prev, message])
          setProgress(((index + 1) / messages.length) * 100)
          index++
        }
      }

      if (isMounted) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setShowWelcome(true)
        await new Promise(resolve => setTimeout(resolve, 1200))
        onBootComplete()
      }
    }

    displayMessages()

    return () => {
      isMounted = false
    }
  }, [onBootComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black font-mono text-sm overflow-hidden"
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-scan" />
      </div>

      {/* CRT monitor effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-green-500/5 via-transparent to-green-500/5" />

      {/* Boot messages container */}
      <div className="relative h-full overflow-hidden">
        {/* Header section with logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 p-6 border-b border-green-500/20"
        >
          <div className="flex items-center gap-4">
            {/* ASCII Logo */}
            <div className="text-green-400 text-xs leading-tight font-bold">
              <pre className="terminal-glow">{`
 █████╗  ██████╗ ███████╗
██╔══██╗██╔═══██╗██╔════╝
███████║██║   ██║███████╗
██╔══██║██║   ██║╚════██║
██║  ██║╚██████╔╝███████║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝`}</pre>
            </div>
            
            {/* System info */}
            <div className="flex-1 text-green-500/70 text-xs space-y-1">
              <div>ASHIM OPERATING SYSTEM</div>
              <div className="text-green-400/50">Portfolio Edition v1.0.0 LTS</div>
              <div className="text-cyan-400/50">Kernel 6.8.0-ashim-generic</div>
            </div>

            {/* Progress indicator */}
            <div className="text-right">
              <div className="text-cyan-400 text-xl font-bold terminal-glow">
                {Math.round(progress)}%
              </div>
              <div className="text-green-500/50 text-xs mt-1">LOADING</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1 bg-green-950 rounded-sm overflow-hidden border border-green-500/20">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-cyan-400 to-green-500 terminal-glow"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "linear" }}
              style={{
                boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
              }}
            />
          </div>
        </motion.div>

        {/* Boot messages */}
        <div className="absolute top-[180px] bottom-0 left-0 right-0 overflow-hidden">
          <div className="h-full overflow-y-auto p-6 space-y-0.5 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {bootMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: message.type === 'ok' || message.type === 'done' ? 1 : 0.7,
                    x: 0 
                  }}
                  transition={{ duration: 0.1 }}
                  className={`
                    ${message.type === 'header' ? 'text-cyan-400 font-bold text-base mb-2 terminal-glow' : ''}
                    ${message.type === 'ok' ? 'text-green-400 font-semibold terminal-glow' : ''}
                    ${message.type === 'done' ? 'text-cyan-300 font-semibold text-base mt-2 terminal-glow' : ''}
                    ${message.type === 'info' ? 'text-green-500/60' : ''}
                  `}
                >
                  {message.text || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            {bootMessages.length > 0 && !showWelcome && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-green-400 ml-1 terminal-glow"
              />
            )}
          </div>
        </div>

        {/* Welcome overlay */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent terminal-glow">
                    ASHIM OS
                  </div>
                  <div className="text-green-400/70 text-lg mb-6 terminal-glow">
                    System Ready • All Services Running
                  </div>
                  <div className="flex items-center justify-center gap-2 text-cyan-400/60 text-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full" />
                    </motion.div>
                    <span>Loading Desktop Environment...</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-green-950/50 border-t border-green-500/20 p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-green-400/70">
          <span>TTY1</span>
          <span className="text-green-500/50">•</span>
          <span>ashim@portfolio</span>
          <span className="text-green-500/50">•</span>
          <span className="text-cyan-400/70">~</span>
        </div>
        <div className="flex items-center gap-3 text-green-400/50">
          <span>F1:Help</span>
          <span>F2:Setup</span>
          <span>ESC:Skip</span>
        </div>
      </div>
    </motion.div>
  )
}

