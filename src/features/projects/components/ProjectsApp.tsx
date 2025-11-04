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
    <div className="h-full overflow-y-auto custom-scrollbar" style={{ background: 'rgba(30, 30, 30, 0.95)' }}>
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Projects</h1>
          <p className="text-white/70 text-base">
            A showcase of my notable projects and contributions
          </p>
        </div>
        
        <div className="space-y-4">
          {portfolioData.projects.map((project) => {
            const isExpanded = expandedProjects.includes(project.id)
            
            return (
              <div
                key={project.id}
                className="rounded-xl overflow-hidden border border-white/20 hover:border-emerald-400/50 transition-all duration-300"
                style={{
                  background: 'rgba(40, 40, 40, 0.8)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                      <p className="text-white/70 mb-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-md text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
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
                        className="flex items-center space-x-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
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
                        className="flex items-center space-x-2 text-sm text-white/60 hover:text-emerald-400 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                  
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="flex items-center space-x-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
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
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <h4 className="font-semibold text-emerald-400 mb-3 text-base">Key Highlights</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-white/70 flex items-start leading-relaxed">
                            <span className="text-emerald-400 mr-3 mt-1 flex-shrink-0">•</span>
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

