/**
 * Application Constants
 * Centralized configuration for the application
 */

export const APP_CONFIG = {
  name: 'Ashim OS',
  version: '1.0.0',
  kernel: 'Linux 6.8.0-ashim',
  edition: 'Portfolio Edition',
} as const

export const WINDOW_CONFIG = {
  minWidth: 400,
  minHeight: 300,
  defaultWidth: 700,
  defaultHeight: 600,
  terminalWidth: 800,
  terminalHeight: 500,
  offsetIncrement: 30,
  baseOffsetX: 100,
  baseOffsetY: 80,
  dragDelay: 0,
  zIndexIncrement: 1,
  initialZIndex: 10,
} as const

export const ANIMATION_CONFIG = {
  windowTransition: 0.15,
  bootSequenceDelay: 800,
  welcomeScreenDelay: 1200,
  scanlineSpeed: 8,
  blinkSpeed: 1,
} as const

export const KEYBOARD_SHORTCUTS = {
  commandPalette: ['Cmd', 'K'],
  terminal: '`',
  escape: 'Escape',
} as const

export const APP_METADATA = {
  title: 'Ashim Rudra Paul - Software Engineer',
  description: 'Portfolio website of Ashim Rudra Paul - Full Stack Developer & DevOps Engineer',
  keywords: ['Ashim Rudra Paul', 'Software Engineer', 'Full Stack Developer', 'DevOps', 'Portfolio'],
  author: 'Ashim Rudra Paul',
  siteUrl: 'https://ashim.dev',
  ogImage: '/og-image.png',
}

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/ashimrudrapaul',
  github: 'https://github.com/codewithashim',
  email: 'codewithashim@gmail.com',
} as const

export const TERMINAL_CONFIG = {
  prompt: '$',
  welcomeMessage: 'Ashim OS Terminal v1.0.0',
  helpMessage: 'Type "help" for available commands',
  cursorChar: '▊',
} as const

export const THEME_COLORS = {
  background: '#0b0f14',
  surface: '#161b22',
  border: '#30363d',
  text: '#c9d1d9',
  textMuted: '#8b949e',
  accentGreen: '#22c55e',
  accentTeal: '#14b8a6',
  accentRed: '#ef4444',
} as const

