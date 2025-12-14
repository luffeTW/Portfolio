import React, { useEffect, useRef, useState } from 'react';
import { Experience } from '../types';

interface ExperienceTimelineProps {
  items: Experience[];
}

const TimelineItem: React.FC<{ item: Experience; index: number; isLast: boolean }> = ({ item, index, isLast }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we don't need to observe anymore (optional: keeps it triggered once)
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: "0px 0px -10% 0px" // Offset slightly so it triggers before reaching the absolute bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative pl-8 pb-12 sm:pb-16 group">
      {/* 
        Background Line (The faint track) 
        If it's the last item, we still show a track that fades out to indicate the end of the log
      */}
      <div 
        className={`absolute left-[9px] top-2 w-[2px] bg-slate-800/50 ${isLast ? 'h-16 bg-gradient-to-b from-slate-800/50 to-transparent' : 'bottom-0'}`} 
      />

      {/* 
        Active "Drawn" Line 
        Animates height from 0% to 100% when visible.
        For the last item, it fades from Cyan (matching the node) to transparent.
      */}
      <div 
        className={`absolute left-[9px] top-2 w-[2px] transition-all duration-1000 ease-out origin-top
          ${isLast 
            ? 'bg-gradient-to-b from-accent-cyan to-transparent' 
            : 'bg-gradient-to-b from-accent-cyan to-accent-purple'
          }
        `}
        style={{ height: isVisible ? (isLast ? '4rem' : '100%') : '0%' }}
      />

      {/* 
        The Node/Dot 
        Animates scale and color.
      */}
      <div 
        className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 bg-slate-950 transition-all duration-700 z-10
          ${isVisible 
            ? 'border-accent-cyan scale-100 shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
            : 'border-slate-800 scale-0 opacity-0'
          }`}
      >
        {/* Inner dot pulse */}
        {isVisible && <div className="absolute inset-1 rounded-full bg-accent-cyan animate-pulse" />}
      </div>

      {/* 
        Content Block
        Slides in from the right and fades in.
      */}
      <div 
        className={`transition-all duration-700 ease-out delay-300
          ${isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-10'
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">
            {item.company}
          </h3>
          <span className="font-mono text-xs text-slate-400 bg-slate-900 border border-slate-700 px-2 py-1 rounded">
            {item.period}
          </span>
        </div>
        
        <p className="text-accent-green font-mono text-sm mb-4 flex items-center gap-2">
          <span className="opacity-50">&gt;</span> {item.role}
        </p>
        
        <ul className="space-y-3">
          {item.highlights.map((highlight, hIndex) => (
            <li 
              key={hIndex} 
              className={`text-slate-400 text-sm leading-relaxed flex gap-3 transition-all duration-500`}
              style={{ transitionDelay: `${500 + (hIndex * 100)}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)' }}
            >
              <span className="text-slate-600 select-none mt-1 font-mono">{`//`}</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ items }) => {
  return (
    <div className="relative mt-8">
      {items.map((job, index) => (
        <TimelineItem 
          key={index} 
          item={job} 
          index={index} 
          isLast={index === items.length - 1} 
        />
      ))}
    </div>
  );
};
