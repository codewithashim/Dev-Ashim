'use client'

import { portfolioData } from '@/shared/data/portfolio'
import { MapPin, Mail, Phone, Globe, Linkedin, Github } from 'lucide-react'

export default function AboutApp() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-os-accent-green to-os-accent-teal rounded-full flex items-center justify-center text-4xl font-bold text-os-bg">
            {portfolioData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{portfolioData.name}</h1>
            <p className="text-xl text-os-accent-teal">{portfolioData.title}</p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="glass-panel p-6 rounded-lg space-y-3">
          <h2 className="text-lg font-semibold mb-4 text-os-accent-green">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <a
              href={`mailto:${portfolioData.email}`}
              className="flex items-center space-x-3 hover:text-os-accent-teal transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{portfolioData.email}</span>
            </a>
            <a
              href={`tel:${portfolioData.phone}`}
              className="flex items-center space-x-3 hover:text-os-accent-teal transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{portfolioData.phone}</span>
            </a>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4" />
              <span>{portfolioData.location}</span>
            </div>
            <a
              href={portfolioData.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 hover:text-os-accent-teal transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 hover:text-os-accent-teal transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 hover:text-os-accent-teal transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        
        {/* About */}
        <div className="glass-panel p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-os-accent-green">About Me</h2>
          <div className="space-y-3 text-os-text-muted leading-relaxed">
            {portfolioData.about.filter(line => line && !line.includes('Type "help"')).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
        
        {/* Skills Overview */}
        <div className="glass-panel p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-os-accent-green">Skills Overview</h2>
          <div className="space-y-4">
            {portfolioData.skills.map((skill, i) => (
              <div key={i}>
                <h3 className="font-medium text-os-accent-teal mb-2">{skill.category}</h3>
                <p className="text-sm text-os-text-muted">{skill.items}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education */}
        <div className="glass-panel p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-os-accent-green">Education</h2>
          <p className="text-os-text-muted">{portfolioData.education}</p>
        </div>
      </div>
    </div>
  )
}

