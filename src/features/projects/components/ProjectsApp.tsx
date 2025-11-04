'use client'

import { useState } from 'react'
import { portfolioData } from '@/shared/data/portfolio'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'

export default function ProjectsApp() {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([])
  
  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-os-text-muted">
            A showcase of my notable projects and contributions
          </p>
        </div>
        
        <div className="space-y-4">
          {portfolioData.projects.map((project) => {
            const isExpanded = expandedProjects.includes(project.id)
            
            return (
              <div
                key={project.id}
                className="glass-panel rounded-lg overflow-hidden border-l-4 border-os-accent-teal"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-os-text-muted mb-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-os-surface border border-os-border rounded text-xs font-mono text-os-accent-green"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-os-accent-teal hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Live</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-os-text-muted hover:text-os-accent-teal transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                  
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="flex items-center space-x-2 text-sm text-os-accent-green hover:text-os-accent-teal transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Hide' : 'Show'} Details</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-os-border space-y-2">
                      <h4 className="font-semibold text-os-accent-teal mb-2">Key Highlights</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-os-text-muted flex items-start">
                            <span className="text-os-accent-green mr-2 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

