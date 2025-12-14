export type Language = 'en' | 'zh';

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'AI' | 'Tools';
  practical: number; // 0-100: Practical Experience / Execution
  theory: number;    // 0-100: Conceptual Understanding / Theory
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  challenges: string[]; // Key technical challenges solved
  mermaidCode?: string; // Diagram definition
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}