import React from 'react';
import { motion } from 'framer-motion';

// --- #projects Background ---
export const FloatingOrbits: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 select-none">
      <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
        {/* Orbit 1 */}
        <path
          d="M-100,600 C100,400 600,300 900,100"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeDasharray="5, 10"
          className="opacity-30"
        />
        {/* Orbit 2 */}
        <path
          d="M-100,400 C200,300 500,500 900,400"
          fill="none"
          stroke="#c084fc"
          strokeWidth="1"
          strokeDasharray="10, 20"
          className="opacity-20"
        />
        
        {/* Moving Nodes */}
        <motion.circle
          cx="0" cy="0" r="3" fill="#22d3ee"
          initial={{ opacity: 0 }}
          animate={{ x: [0, 800], y: [600, 100], opacity: 1 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
         <motion.circle
          cx="0" cy="0" r="2" fill="#c084fc"
          initial={{ opacity: 0 }}
          animate={{ x: [0, 800], y: [400, 400], opacity: 1 }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </svg>
    </div>
  );
};

// --- #stack Background ---
export const NodeGraphBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 select-none">
      <div className="absolute top-10 right-10 w-64 h-64">
        {/* Static connection lines */}
        <svg className="w-full h-full absolute top-0 left-0">
          <line x1="20%" y1="20%" x2="80%" y2="50%" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="80%" y1="50%" x2="40%" y2="80%" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="20%" y1="20%" x2="40%" y2="80%" stroke="#e2e8f0" strokeWidth="1" />
        </svg>

        {/* Breathing Nodes */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-[20%] left-[20%] w-2 h-2 bg-slate-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-[50%] left-[80%] w-3 h-3 bg-slate-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-[80%] left-[40%] w-2 h-2 bg-slate-400 rounded-full"
        />
      </div>
    </div>
  );
};

// --- #log Background ---
export const DataStreamBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute left-[34px] top-0 bottom-0 w-[1px] bg-transparent">
        {/* Falling Packets */}
        <motion.div
          className="absolute top-0 w-[2px] h-10 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-0 w-[2px] h-6 bg-gradient-to-b from-transparent via-accent-green to-transparent"
          animate={{ top: ['0%', '100%'], opacity: [0, 0.8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
      </div>
    </div>
  );
};