'use client'

import { useState } from 'react'
import { portfolioData } from '@/shared/data/portfolio'
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Send } from 'lucide-react'

export default function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send an email
    const mailtoLink = `mailto:${portfolioData.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`
    window.open(mailtoLink, '_blank')
  }
  
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: portfolioData.email,
      href: `mailto:${portfolioData.email}`,
      color: 'text-os-accent-teal',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: portfolioData.phone,
      href: `tel:${portfolioData.phone}`,
      color: 'text-os-accent-green',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: portfolioData.location,
      href: null,
      color: 'text-purple-400',
    },
    {
      icon: Globe,
      label: 'Portfolio',
      value: portfolioData.portfolio,
      href: portfolioData.portfolio,
      color: 'text-blue-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: portfolioData.linkedin,
      color: 'text-blue-500',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View GitHub Profile',
      href: portfolioData.github,
      color: 'text-gray-400',
    },
  ]
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Get In Touch</h1>
          <p className="text-os-text-muted">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-os-accent-green">Contact Information</h2>
            
            <div className="space-y-3">
              {contactLinks.map((link, i) => {
                const Icon = link.icon
                const content = (
                  <div className="glass-panel p-4 rounded-lg flex items-start space-x-3 transition-all hover:border-os-accent-teal">
                    <Icon className={`w-5 h-5 ${link.color} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-os-text-muted">{link.label}</p>
                      <p className="text-sm truncate">{link.value}</p>
                    </div>
                  </div>
                )
                
                return link.href ? (
                  <a
                    key={i}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                )
              })}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass-panel p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-os-accent-green">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-os-surface border border-os-border rounded-lg focus:ring-2 focus:ring-os-accent-teal focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-os-surface border border-os-border rounded-lg focus:ring-2 focus:ring-os-accent-teal focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-os-surface border border-os-border rounded-lg focus:ring-2 focus:ring-os-accent-teal focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 bg-os-surface border border-os-border rounded-lg focus:ring-2 focus:ring-os-accent-teal focus:border-transparent outline-none transition-all resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-os-accent-teal text-os-bg rounded-lg hover:bg-os-accent-green transition-colors font-medium"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="glass-panel p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-os-accent-green">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a
              href={`mailto:${portfolioData.email}`}
              className="px-4 py-3 bg-os-surface hover:bg-os-border/50 border border-os-border rounded-lg text-center transition-colors text-sm"
            >
              Email Me
            </a>
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-os-surface hover:bg-os-border/50 border border-os-border rounded-lg text-center transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-os-surface hover:bg-os-border/50 border border-os-border rounded-lg text-center transition-colors text-sm"
            >
              GitHub
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(portfolioData.email)}
              className="px-4 py-3 bg-os-surface hover:bg-os-border/50 border border-os-border rounded-lg text-center transition-colors text-sm"
            >
              Copy Email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

