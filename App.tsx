import React, { useState, useEffect } from 'react';
import { Typewriter } from './components/Typewriter';
import { ProjectCard } from './components/ProjectCard';
import { ChatInterface } from './components/ChatInterface';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TechScatterPlot } from './components/TechScatterPlot';
import { CONTENT, SKILLS } from './constants';
import { Code, Server, Box, BookOpen, Mail, Github, Linkedin, Twitter, Menu, Globe } from 'lucide-react';
import { Language } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const content = CONTENT[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -50% 0px" }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const navItems = [
    { id: 'home', label: content.nav.home, icon: BookOpen },
    { id: 'projects', label: content.nav.projects, icon: Box },
    { id: 'stack', label: content.nav.stack, icon: Server },
    { id: 'log', label: content.nav.log, icon: Code },
  ];

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-accent-cyan/30 bg-slate-950">
      
      {/* Mobile Header */}
      <div className="md:hidden p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 flex justify-between items-center">
        <span className="font-mono font-bold text-accent-cyan">~/dev/portfolio</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-mono border border-slate-700 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Globe size={14} />
            {lang === 'en' ? '繁中' : 'EN'}
          </button>
          <button className="text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-slate-900/95 backdrop-blur pt-20 px-6">
           <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-3 px-3 py-3 rounded transition-all text-lg font-mono
                  ${activeSection === item.id 
                    ? 'text-accent-cyan' 
                    : 'text-slate-400'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
           </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen">
        
        {/* Sidebar Navigation (Sticky) */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-800/50 p-6 sticky top-0 h-screen overflow-y-auto bg-slate-950/50 backdrop-blur-sm">
          <div className="mb-8">
            <div className="w-12 h-12 rounded bg-gradient-to-br from-accent-cyan to-blue-600 mb-4 opacity-80 shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
            <h1 className="text-xl font-bold text-white tracking-tight">Alex Dev</h1>
            <p className="text-sm text-slate-500 font-mono">Senior Systems Engineer</p>
          </div>

          <div className="mb-8">
            <button 
              onClick={toggleLang}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-white hover:border-slate-600 transition-all text-xs font-mono group"
            >
              <div className="flex items-center gap-2">
                <Globe size={14} className="group-hover:text-accent-cyan transition-colors" />
                <span>Language</span>
              </div>
              <span className="text-accent-cyan">{lang === 'en' ? 'EN' : '繁中'}</span>
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all text-sm font-mono group
                  ${activeSection === item.id 
                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 translate-x-1' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                `}
              >
                <item.icon size={16} className={`transition-transform ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                {item.label}
                {activeSection === item.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
             <div className="flex gap-4">
               <a href="#" className="text-slate-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200"><Github size={20} /></a>
               <a href="#" className="text-slate-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200"><Linkedin size={20} /></a>
               <a href="#" className="text-slate-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200"><Twitter size={20} /></a>
               <a href="#" className="text-slate-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200"><Mail size={20} /></a>
             </div>
          </div>
        </aside>

        {/* Main Content Area - Single Page Scroll */}
        <main className="flex-1 p-6 md:p-12 lg:px-20 lg:py-10 overflow-visible scroll-smooth relative">
          
          {/* Background decoration */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>

          {/* HOME SECTION */}
          <section id="home" className="mb-24 relative z-10 scroll-mt-24 pt-4">
            <div className="max-w-4xl mx-auto border-2 border-dashed border-slate-800 rounded-xl p-6 md:p-10 bg-slate-950/30">
                <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="bg-terminal-header p-2 rounded-t-lg border border-slate-700 flex items-center gap-2 shadow-lg">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-xs text-slate-500 font-mono ml-2 opacity-70">bash — 80x24</span>
                  </div>
                  <div className="bg-black/40 border-x border-b border-slate-700 p-6 md:p-8 rounded-b-lg font-mono text-sm md:text-base leading-relaxed mb-12 shadow-2xl backdrop-blur-sm">
                    {/* Add key=lang to force re-type effect on language change */}
                    <Typewriter key={lang} text={content.heroIntro} speed={30} delay={200} className="text-accent-green" />
                  </div>

                  <div className="prose prose-invert max-w-none">
                     <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                       <span className="text-accent-cyan">#</span> {content.sections.intro}
                     </h2>
                     <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                       {content.sections.introText}
                     </p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors">
                          <h3 className="text-white font-mono mb-2 text-sm uppercase tracking-wider text-accent-purple flex items-center gap-2">
                            <span className="text-accent-purple/50">&gt;</span> {content.sections.coreFocus}
                          </h3>
                          <p className="text-sm text-slate-400">{content.sections.coreFocusText}</p>
                        </div>
                        <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors">
                          <h3 className="text-white font-mono mb-2 text-sm uppercase tracking-wider text-accent-purple flex items-center gap-2">
                            <span className="text-accent-purple/50">&gt;</span> {content.sections.currentStatus}
                          </h3>
                          <p className="text-sm text-slate-400">{content.sections.currentStatusText}</p>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="mb-32 scroll-mt-24 relative z-10">
             <div className="max-w-4xl mx-auto border-2 border-dashed border-slate-800 rounded-xl p-6 md:p-10 bg-slate-950/30">
                <div className="flex items-baseline gap-4 mb-8 border-b border-slate-800 pb-4">
                    <h2 className="text-3xl font-bold text-white font-mono">{content.sections.modules}</h2>
                    <span className="text-slate-500 text-sm font-mono hidden sm:inline-block">{content.sections.featuredOnly}</span>
                </div>

                <div className="space-y-8">
                  {content.projects.map((project, idx) => (
                    <div key={project.id + lang} className="transition-all duration-500">
                        <ProjectCard project={project} lang={lang} labels={content.ui} />
                    </div>
                  ))}
                </div>
             </div>
          </section>

          {/* STACK SECTION */}
          <section id="stack" className="mb-32 scroll-mt-24 relative z-10">
            <div className="max-w-4xl mx-auto border-2 border-dashed border-slate-800 rounded-xl p-6 md:p-10 bg-slate-950/30">
               <h2 className="text-3xl font-bold text-white mb-2 font-mono">{content.sections.dependencies}</h2>
               <p className="text-slate-500 mb-10 border-b border-slate-800 pb-4">
                 {content.sections.stackText}
               </p>
               
               <TechScatterPlot 
                 skills={SKILLS} 
                 labels={content.chartLabels} 
                 categories={content.categories}
               />
            </div>
          </section>

          {/* LOG (Experience) SECTION */}
          <section id="log" className="mb-24 scroll-mt-24 relative z-10">
            <div className="max-w-4xl mx-auto border-2 border-dashed border-slate-800 rounded-xl p-6 md:p-10 bg-slate-950/30">
               <div className="max-w-3xl">
                   <h2 className="text-3xl font-bold text-white mb-2 font-mono">{content.sections.changelog}</h2>
                   <p className="text-slate-500 mb-10 border-b border-slate-800 pb-4">
                     {content.sections.changelogText}
                   </p>

                   {/* Replaced static map with Animated Timeline */}
                   <ExperienceTimeline items={content.experience} />
               </div>
            </div>
          </section>
          
          <footer className="text-center text-slate-600 text-xs font-mono py-10 border-t border-slate-900/50">
            <p>{content.sections.footer}</p>
            <p className="mt-2">EOF</p>
          </footer>

        </main>
      </div>

      <ChatInterface lang={lang} labels={content} contextData={{projects: content.projects, experience: content.experience}} />
    </div>
  );
};

export default App;