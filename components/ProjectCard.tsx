import React, { useState } from 'react';
import { Project, Language } from '../types';
import { GitBranch, ExternalLink, ChevronRight, Share2 } from 'lucide-react';
import { MermaidDiagram } from './MermaidDiagram';

interface ProjectCardProps {
  project: Project;
  lang: Language;
  labels: any;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, lang, labels }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-colors duration-300 rounded-md overflow-hidden mb-6">
      {/* Header / Summary */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
            <span className="text-accent-cyan">def</span> {project.title}
            {project.featured && <span className="text-xs bg-slate-800 text-accent-green px-2 py-0.5 rounded border border-slate-700">{labels.featured}</span>}
          </h3>
          <div className="flex gap-3 text-slate-400">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <GitBranch size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
            <ChevronRight size={20} className={`transform transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
          </div>
        </div>

        <p className="text-slate-400 mb-4 font-sans leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <span key={tech} className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-slate-800 p-6 bg-black/20 animate-in slide-in-from-top-2 duration-300">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Project Specs */}
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full"></span>
                {labels.projectSpecs}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {project.fullDescription}
              </p>
            </div>
            
            {/* Challenges */}
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-purple rounded-full"></span>
                {labels.keyChallenges}
              </h4>
              <ul className="space-y-2 mb-6">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-mono">
                    <span className="text-slate-600 mt-1">{`//`}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* System Architecture Diagram */}
          {project.mermaidCode && (
            <div className="mt-6 border-t border-slate-800 pt-6">
               <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Share2 size={14} />
                {labels.architecture}
              </h4>
              <div className="relative group/diagram">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-800 to-slate-800 rounded opacity-20 group-hover/diagram:opacity-40 transition duration-500 blur"></div>
                <div className="relative">
                  <MermaidDiagram chart={project.mermaidCode} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};