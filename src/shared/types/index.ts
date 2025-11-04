export type AppId = 'about' | 'projects' | 'resume' | 'terminal' | 'contact'

export interface WindowState {
  id: string
  appId: AppId
  title: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export interface AppConfig {
  id: AppId
  name: string
  icon: string
  color: string
  component: React.ComponentType<{ windowId: string }>
}

export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  link?: string
  github?: string
  highlights: string[]
}

export interface WorkExperience {
  company: string
  position: string
  location: string
  period: string
  type: string
  responsibilities: string[]
}

export interface Skill {
  category: string
  items: string
}

export interface PortfolioData {
  name: string
  title: string
  phone: string
  email: string
  location: string
  portfolio: string
  linkedin: string
  github: string
  about: string[]
  skills: Skill[]
  experience: WorkExperience[]
  projects: Project[]
  education: string
}

