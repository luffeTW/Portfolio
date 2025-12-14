import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const uniqueId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  // 1. Initialize Observer to detect visibility
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

  // 2. Render the Chart (Hidden initially)
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base', // Use base to allow easier custom styling overrides
      securityLevel: 'loose',
      fontFamily: 'JetBrains Mono',
      themeVariables: {
        primaryColor: '#0f172a', // terminal-bg
        primaryTextColor: '#e2e8f0', // slate-200
        primaryBorderColor: '#334155', // slate-700
        lineColor: '#22d3ee', // accent-cyan (The drawing lines)
        secondaryColor: '#1e293b', // terminal-header
        tertiaryColor: '#0f172a',
      }
    });

    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        // Clear previous content
        containerRef.current.innerHTML = '';
        
        // Render SVG
        const { svg } = await mermaid.render(uniqueId.current, chart);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          
          // PREPARE FOR ANIMATION
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.maxWidth = '100%';
            
            // 1. Handle Paths (The lines connecting nodes)
            const paths = svgEl.querySelectorAll('path, line');
            paths.forEach((path) => {
              const p = path as SVGPathElement;
              // Get length for the drawing effect
              const length = p.getTotalLength ? p.getTotalLength() : 1000;
              
              // Set initial state: Hidden by dash offset
              p.style.strokeDasharray = `${length}`;
              p.style.strokeDashoffset = `${length}`;
              p.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
              p.style.stroke = '#22d3ee'; // Enforce cyan color for connections
              p.style.strokeWidth = '2px';
            });

            // 2. Handle Nodes/Shapes (Rects, Circles, Polygons)
            const shapes = svgEl.querySelectorAll('rect, circle, polygon, ellipse');
            shapes.forEach((shape) => {
              const s = shape as SVGGraphicsElement;
              s.style.opacity = '0';
              s.style.transformBox = 'fill-box';
              s.style.transformOrigin = 'center';
              s.style.transform = 'scale(0.8)';
              s.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
              
              // Add a nice glow to nodes
              s.style.filter = 'drop-shadow(0 0 5px rgba(34, 211, 238, 0.1))';
            });

            // 3. Handle Text (Labels)
            const texts = svgEl.querySelectorAll('text, span, div.nodeLabel');
            texts.forEach((text) => {
               const t = text as HTMLElement;
               t.style.opacity = '0';
               t.style.transition = 'opacity 0.5s ease-out';
            });
            
            // Mark as ready to animate
            setIsRendered(true);
          }
        }
      } catch (error) {
        console.error('Mermaid render error:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = '<div class="text-red-500 font-mono text-sm p-4">// Error rendering architectural diagram</div>';
        }
      }
    };

    renderChart();
  }, [chart]);

  // 3. Trigger Animation when Visible AND Rendered
  useEffect(() => {
    if (isVisible && isRendered && containerRef.current) {
      const svgEl = containerRef.current.querySelector('svg');
      if (!svgEl) return;

      // Animate Paths (Draw lines)
      const paths = svgEl.querySelectorAll('path, line');
      paths.forEach((path) => {
         const p = path as SVGPathElement;
         // Trigger drawing
         setTimeout(() => {
             p.style.strokeDashoffset = '0';
         }, 100);
      });

      // Animate Shapes (Pop in nodes) with Stagger
      const shapes = svgEl.querySelectorAll('rect, circle, polygon, ellipse');
      shapes.forEach((shape, index) => {
        const s = shape as SVGGraphicsElement;
        setTimeout(() => {
          s.style.opacity = '1';
          s.style.transform = 'scale(1)';
        }, 300 + (index * 100)); // Delay start until lines start drawing, then stagger
      });

      // Animate Text (Fade in)
      const texts = svgEl.querySelectorAll('text, span, div.nodeLabel');
      texts.forEach((text, index) => {
        const t = text as HTMLElement;
        setTimeout(() => {
           t.style.opacity = '1';
        }, 500 + (index * 50));
      });
    }
  }, [isVisible, isRendered]);

  return (
    <div 
      ref={containerRef} 
      className="mermaid-container w-full flex justify-center py-8 bg-slate-950/30 rounded border border-slate-800/50 min-h-[200px]"
    >
      <div className="flex items-center justify-center gap-2 text-slate-600 animate-pulse">
        <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
        <span className="font-mono text-xs">Generating schematic...</span>
      </div>
    </div>
  );
};
