import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { chatWithPortfolio } from '../services/geminiService';
import { SKILLS } from '../constants';
import { ChatMessage, Language } from '../types';

interface ChatInterfaceProps {
  lang: Language;
  labels: any;
  contextData: any; // Localized context data
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ lang, labels, contextData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Initialize chat when lang changes
  useEffect(() => {
    setMessages([
      { id: 'init', role: 'model', text: labels.chatInit, timestamp: Date.now() }
    ]);
  }, [lang, labels.chatInit]);

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Convert internal message format to Gemini history format
    const historyForApi = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // Add current user message
    historyForApi.push({ role: 'user', parts: [{ text: userMsg.text }]});

    const responseText = await chatWithPortfolio(
        historyForApi, 
        userMsg.text, 
        { projects: contextData.projects, experience: contextData.experience, skills: SKILLS },
        lang
    );

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-accent-cyan text-slate-900 p-4 rounded-full shadow-lg hover:bg-accent-cyan/90 transition-all hover:scale-110 group"
      >
        <MessageSquare size={24} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 pointer-events-none">
          {labels.ui.askAi}
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 bg-slate-900 border border-slate-700 shadow-2xl rounded-lg overflow-hidden flex flex-col
      ${isMinimized ? 'w-72 h-14 bottom-6 right-6' : 'w-full md:w-96 h-[500px] bottom-0 right-0 md:bottom-6 md:right-6'}
    `}>
      {/* Header */}
      <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700 cursor-pointer" onClick={() => !isMinimized && setIsMinimized(true)}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
          <span className="text-sm font-mono text-slate-200 font-bold">DevBot_v1.0</span>
        </div>
        <div className="flex items-center gap-2">
           {isMinimized ? (
             <button onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }} className="text-slate-400 hover:text-white"><Maximize2 size={16} /></button>
           ) : (
             <button onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} className="text-slate-400 hover:text-white"><Minimize2 size={16} /></button>
           )}
           <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-slate-400 hover:text-red-400"><X size={18} /></button>
        </div>
      </div>

      {/* Chat Body */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-terminal-bg font-mono text-sm">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-accent-cyan/20 text-accent-cyan'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded max-w-[80%] ${msg.role === 'user' ? 'bg-slate-800 text-slate-200' : 'bg-slate-900 border border-slate-800 text-slate-300'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded bg-accent-cyan/20 text-accent-cyan flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-3 rounded bg-slate-900 border border-slate-800 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my skills..."
              className="flex-1 bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded focus:outline-none focus:border-accent-cyan font-mono text-sm"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-accent-cyan text-slate-900 px-4 py-2 rounded font-bold hover:bg-accent-cyan/90 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};