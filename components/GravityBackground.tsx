import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const GravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      parallaxFactor: number;

      constructor() {
        // Bias towards right and bottom
        const biasRight = Math.random() > 0.3;
        this.x = biasRight ? Math.random() * (width * 0.6) + (width * 0.4) : Math.random() * width;
        this.y = Math.random() * height;
        
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.parallaxFactor = Math.random() * 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(scrollY: number) {
        if (!ctx) return;
        ctx.beginPath();
        // Parallax offset
        const drawY = this.y - (scrollY * this.parallaxFactor * 0.2);
        // Wrap for parallax
        const wrappedY = ((drawY % height) + height) % height;

        ctx.arc(this.x, wrappedY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${this.alpha})`; // accent-cyan
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = width < 768 ? 30 : 80; // Fewer on mobile
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const scrollY = window.scrollY;

      particles.forEach(p => {
        p.update();
        p.draw(scrollY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Canvas for Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-60 hidden md:block"
      />

      {/* Ambient Blobs using Framer Motion */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 -top-40 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[100px]"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute -left-20 top-[40%] w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px]"
      />

      <motion.div 
         animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-0 bottom-0 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"
      />
    </div>
  );
};