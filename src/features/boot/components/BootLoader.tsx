'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BootLoaderProps {
  onBootComplete: () => void
}

export default function BootLoader({ onBootComplete }: BootLoaderProps) {
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    const messages = [
      '[    0.000000] Linux version 6.8.0-ashim (ashim@portfolio) (gcc version 13.2.0)',
      '[    0.001234] Command line: BOOT_IMAGE=/boot/vmlinuz root=/dev/sda1 ro quiet splash',
      '[    0.012456] KERNEL supported cpus:',
      '[    0.023678] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'',
      '[    0.045123] ACPI: Core revision 20230628',
      '[    0.067890] clocksource: hpet: mask: 0xffffffff max_cycles: 0xffffffff',
      '[    0.089234] APIC: Switch to symmetric I/O mode setup',
      '[    0.123456] Freeing SMP alternatives memory: 40K',
      '[    0.156789] smpboot: CPU0: Intel(R) Core(TM) i7-12700K CPU @ 3.60GHz',
      '[    0.234567] Performance Events: Skylake events, Intel PMU driver',
      '[    0.312345] random: crng init done',
      '[    0.445678] NET: Registered PF_INET protocol family',
      '[    0.567890] PCI: Using ACPI for IRQ routing',
      '[    0.678901] pci_bus 0000:00: resource 4 [io  0x0000-0x0cf7 window]',
      '[    0.789012] ACPI: AC: AC Adapter [AC] (on-line)',
      '[    0.890123] ACPI: battery: Slot [BAT0] (battery present)',
      '[    1.012345] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input0',
      '[    1.123456] ACPI: button: Power Button [PWRF]',
      '[    1.234567] Serial: 8250/16550 driver, 32 ports, IRQ sharing enabled',
      '[    1.345678] Non-volatile memory driver v1.3',
      '[    1.456789] Linux agpgart interface v0.103',
      '[    1.567890] ACPI: bus type USB registered',
      '[    1.678901] usbcore: registered new interface driver usbfs',
      '[    1.789012] usbcore: registered new interface driver hub',
      '[    1.890123] i8042: PNP: PS/2 Controller [PNP0303:KBD,PNP0f13:MOU] at 0x60,0x64 irq 1,12',
      '[    1.987654] serio: i8042 KBD port at 0x60,0x64 irq 1',
      '[    2.098765] serio: i8042 AUX port at 0x60,0x64 irq 12',
      '[    2.123456] mousedev: PS/2 mouse device common for all mice',
      '[    2.234567] input: AT Translated Set 2 keyboard as /devices/platform/i8042/serio0/input1',
      '[    2.345678] rtc_cmos 00:01: registered as rtc0',
      '[    2.456789] EXT4-fs (sda1): mounted filesystem with ordered data mode',
      '[    2.567890] Starting systemd...',
      '[    2.678901] systemd[1]: systemd 255.2 running in system mode',
      '[    2.789012] systemd[1]: Detected architecture x86-64',
      '[    2.890123] systemd[1]: Hostname set to <ashim-portfolio>',
      '[    2.987654] systemd[1]: Reached target Local File Systems',
      '[    3.098765] systemd[1]: Starting Network Manager...',
      '[    3.212345] systemd[1]: Started D-Bus System Message Bus',
      '[    3.334567] systemd[1]: Starting User Login Management...',
      '[    3.445678] systemd[1]: Started Network Manager',
      '[    3.556789] NetworkManager[456]: NetworkManager is running',
      '[    3.667890] systemd[1]: Starting GNOME Display Manager...',
      '[    3.778901] systemd[1]: Started GNOME Display Manager',
      '[  OK  ] Started User Login Management',
      '[  OK  ] Reached target Network',
      '[  OK  ] Reached target Multi-User System',
      '[  OK  ] Reached target Graphical Interface',
      '[  OK  ] Starting GNOME Shell...',
      'Loading Ashim OS...',
    ]

    let index = 0
    const messageInterval = setInterval(() => {
      if (index < messages.length) {
        setBootMessages(prev => [...prev, messages[index]])
        setProgress(((index + 1) / messages.length) * 100)
        index++
      } else {
        clearInterval(messageInterval)
        setTimeout(() => {
          setShowLogo(false)
          setTimeout(onBootComplete, 500)
        }, 1000)
      }
    }, 50)

    return () => clearInterval(messageInterval)
  }, [onBootComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono overflow-hidden"
    >
      {showLogo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-6xl mb-4 font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              ASHIM OS
            </div>
            <div className="text-sm text-green-500/50 mb-8">version 1.0.0-portfolio</div>
            
            {/* Progress bar */}
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-green-500/70 mt-2">{Math.round(progress)}%</div>
          </div>
        </motion.div>
      )}

      {/* Boot messages overlay */}
      <div className="absolute inset-0 p-6 overflow-hidden">
        <div className="space-y-0.5 text-xs">
          {bootMessages.filter(msg => msg).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: message?.startsWith('[  OK  ]') ? 1 : 0.7, x: 0 }}
              className={message?.startsWith('[  OK  ]') ? 'text-green-400 font-semibold' : 'text-green-500/60'}
            >
              {message}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blinking cursor at bottom */}
      <div className="absolute bottom-6 left-6 flex items-center space-x-1 text-sm">
        <span className="text-green-400">ashim@portfolio:~$</span>
        <span className="animate-blink">▊</span>
      </div>
    </motion.div>
  )
}

