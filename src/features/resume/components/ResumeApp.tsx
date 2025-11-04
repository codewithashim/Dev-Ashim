'use client'

import { portfolioData } from '@/shared/data/portfolio'
import { Download, GraduationCap } from 'lucide-react'

export default function ResumeApp() {
  const handleDownload = () => {
    // In production, this would download an actual PDF
    alert('PDF download would be implemented in production')
  }
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        {/* Header with Download */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{portfolioData.name}</h1>
            <p className="text-xl text-os-accent-teal mb-4">{portfolioData.title}</p>
            <div className="space-y-1 text-sm text-os-text-muted">
              <p>{portfolioData.email} • {portfolioData.phone}</p>
              <p>{portfolioData.location}</p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-os-accent-teal text-os-bg rounded-lg hover:bg-os-accent-green transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
        
        {/* Skills */}
        <section className="glass-panel p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-1 h-6 bg-os-accent-teal rounded mr-3" />
            Skills
          </h2>
          <div className="space-y-3">
            {portfolioData.skills.map((skill, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <div className="font-semibold text-os-accent-green">{skill.category}</div>
                <div className="col-span-3 text-os-text-muted text-sm">{skill.items}</div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Experience */}
        <section className="glass-panel p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-1 h-6 bg-os-accent-teal rounded mr-3" />
            Work Experience
          </h2>
          <div className="space-y-6">
            {portfolioData.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-os-border pl-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="text-os-accent-teal">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-os-text-muted">{exp.period}</p>
                    <p className="text-os-text-muted">{exp.type}</p>
                  </div>
                </div>
                <p className="text-sm text-os-text-muted mb-2">{exp.location}</p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, j) => (
                    <li key={j} className="text-sm text-os-text-muted flex items-start">
                      <span className="text-os-accent-green mr-2 mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        
        {/* Projects Summary */}
        <section className="glass-panel p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-1 h-6 bg-os-accent-teal rounded mr-3" />
            Key Projects
          </h2>
          <div className="space-y-4">
            {portfolioData.projects.map((project, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-os-accent-teal hover:underline"
                    >
                      View Live
                    </a>
                  )}
                </div>
                <p className="text-sm text-os-text-muted mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 6).map((tech, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-os-surface border border-os-border rounded text-xs font-mono text-os-accent-green"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Education */}
        <section className="glass-panel p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-1 h-6 bg-os-accent-teal rounded mr-3" />
            Education
          </h2>
          <div className="flex items-start space-x-3">
            <GraduationCap className="w-5 h-5 text-os-accent-teal mt-1" />
            <p className="text-os-text-muted">{portfolioData.education}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

