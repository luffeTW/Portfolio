import React, { useState, useEffect, useRef } from 'react';
import { Technology } from '../types';
import { Check, Filter } from 'lucide-react';

interface TechScatterPlotProps {
  skills: Technology[];
  labels: {
    xAxis: string;
    yAxis: string;
    high: string;
    low: string;
    legend: string;
    xDesc?: string;
    yDesc?: string;
  };
  categories: Record<string, string>;
}

export const TechScatterPlot: React.FC<TechScatterPlotProps> = ({ skills, labels, categories }) => {
  const [hoveredSkill, setHoveredSkill] = useState<Technology | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize active categories with all available categories
  useEffect(() => {
    setActiveCategories(Object.keys(categories));
  }, [categories]);

  // Category colors mapping
  const categoryColorMap: Record<string, string> = {
    Frontend: '#22d3ee', // accent-cyan
    Backend: '#c084fc',  // accent-purple
    DevOps: '#4ade80',   // accent-green
    AI: '#facc15',       // yellow-400
    Tools: '#94a3b8',    // slate-400
    Database: '#60a5fa', // blue-400
  };

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat) 
        : [...prev, cat]
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative bg-slate-900/30 border border-slate-800 rounded-lg p-4 sm:p-8">
      
      {/* Legend / Filter */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 justify-end items-end sm:items-center">
        <div className="flex items-center gap-2 text-slate-500 mr-2 border-r border-slate-800 pr-4 h-6">
            <Filter size={14} />
            <span className="text-xs font-mono uppercase tracking-wider">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
        {Object.keys(categories).map(cat => {
          const isActive = activeCategories.includes(cat);
          const color = categoryColorMap[cat] || '#fff';
          
          return (
            <button 
              key={cat} 
              onClick={() => toggleCategory(cat)}
              className={`
                group flex items-center gap-2 text-xs font-mono transition-all duration-200 px-3 py-1.5 rounded-full border select-none
                ${isActive 
                  ? 'bg-slate-900/80 shadow-lg' 
                  : 'bg-transparent border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-500'
                }
              `}
              style={{
                borderColor: isActive ? color : undefined,
                boxShadow: isActive ? `0 0 10px -5px ${color}` : 'none'
              }}
            >
              <div 
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 border ${isActive ? 'border-transparent' : 'border-slate-600'}`}
                style={{ backgroundColor: isActive ? color : 'transparent' }}
              >
                  {isActive && <Check size={10} className="text-slate-950 stroke-[3]" />}
              </div>
              <span className={isActive ? 'text-slate-200 font-bold' : ''}>
                  {categories[cat]}
              </span>
            </button>
          );
        })}
        </div>
      </div>

      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[500px] mb-12 sm:mb-0">
        {/* Y Axis Label */}
        <div className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] sm:text-xs text-slate-500 font-mono tracking-widest whitespace-nowrap pointer-events-none">
          {labels.yAxis} &rarr;
        </div>

        {/* X Axis Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-slate-500 font-mono tracking-widest whitespace-nowrap pointer-events-none">
          {labels.xAxis} &rarr;
        </div>

        {/* SVG Chart */}
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Axes Lines */}
          <line x1="5" y1="95" x2="95" y2="95" stroke="#475569" strokeWidth="1" />
          <line x1="5" y1="95" x2="5" y2="5" stroke="#475569" strokeWidth="1" />

          {/* Data Points */}
          {skills.map((skill, index) => {
            const isActive = activeCategories.includes(skill.category);
            const x = 5 + (skill.practical / 100) * 90; // Map 0-100 to 5-95 range
            const y = 95 - (skill.theory / 100) * 90;   // Map 0-100 to 95-5 range (inverted Y)

            const color = categoryColorMap[skill.category] || '#fff';
            const isHovered = hoveredSkill?.name === skill.name;

            // Don't render if not active (or animate out)
            const opacity = isVisible && isActive ? 1 : 0;
            const scale = isVisible && isActive ? 1 : 0;

            return (
              <g 
                key={skill.name} 
                className={`cursor-pointer transition-all duration-500 ease-out ${isActive ? '' : 'pointer-events-none'}`}
                onMouseEnter={() => isActive && setHoveredSkill(skill)}
                onMouseLeave={() => isActive && setHoveredSkill(null)}
                style={{ 
                    opacity,
                    transitionDelay: `${index * 30}ms`,
                    transform: `scale(${scale})`,
                    transformBox: 'fill-box',
                    transformOrigin: 'center'
                }}
              >
                {/* Glow Effect */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isHovered ? 6 : 0} 
                  fill={color} 
                  opacity="0.2" 
                  className="animate-pulse"
                />
                
                {/* Main Dot */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isHovered ? 2.5 : 2} 
                  fill={color}
                  stroke={isHovered ? '#fff' : 'none'}
                  strokeWidth="0.5"
                />

                {/* Always Visible Label */}
                <text
                  x={x + 3.5}
                  y={y + 0.5}
                  fontSize="3.2"
                  fill={isHovered ? '#fff' : color}
                  className="font-mono font-medium"
                  alignmentBaseline="middle"
                  style={{ 
                    textShadow: '0 2px 4px rgba(0,0,0,0.9)', 
                    pointerEvents: 'none',
                    opacity: isHovered ? 1 : 0.9 
                  }}
                >
                  {skill.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Detailed Tooltip Overlay (Optional extra info on hover) */}
        {hoveredSkill && activeCategories.includes(hoveredSkill.category) && (
          <div 
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 bg-slate-800/90 backdrop-blur border border-slate-600 p-3 rounded shadow-2xl min-w-[140px]"
            style={{ 
              left: `${5 + (hoveredSkill.practical / 100) * 90}%`, 
              top: `${95 - (hoveredSkill.theory / 100) * 90}%` 
            }}
          >
            <div className="font-bold text-white text-xs mb-2 border-b border-slate-600 pb-1">{hoveredSkill.name}</div>
            <div className="text-[10px] text-slate-300 font-mono space-y-1">
              <div className="flex justify-between gap-4">
                <span>PRACTICAL:</span>
                <span className="text-accent-cyan font-bold">{hoveredSkill.practical}%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>THEORY:</span>
                <span className="text-accent-purple font-bold">{hoveredSkill.theory}%</span>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-600"></div>
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 text-xs font-mono text-slate-500 border-t border-slate-800 pt-6">
        <div>
          <span className="text-slate-400 font-bold block mb-1">X-Axis ({labels.xAxis})</span>
          {labels.xDesc || 'Measures lines of code written, systems deployed, and production fires fought.'}
        </div>
        <div>
          <span className="text-slate-400 font-bold block mb-1">Y-Axis ({labels.yAxis})</span>
          {labels.yDesc || 'Measures depth of understanding, from API consumer to internal implementation details.'}
        </div>
      </div>
    </div>
  );
};