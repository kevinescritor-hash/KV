import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, MessageSquare, 
  Send, X, Printer, Languages, Car, Users, Info, ExternalLink, Briefcase, UserCircle, ChevronDown, ChevronUp, GraduationCap
} from 'lucide-react';
import { CV_DATA, SOFT_SKILLS_ICONS, TECH_SKILLS_ICONS } from './constants';
import { askKevinAI } from './geminiService';
import { Experience } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cv' | 'portfolio'>('cv');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Profesorado: false,
    Fisioterapia: false,
    Otros: false
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const response = await askKevinAI(userMsg);
    setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsTyping(false);
  };

  const sortExperience = (items: Experience[]) => {
    return [...items].sort((a, b) => {
      const getEndYear = (period: string) => {
        if (period.includes('Actualidad')) return 9999;
        const matches = period.match(/\d{4}/g);
        if (!matches) return 0;
        return parseInt(matches[matches.length - 1]);
      };
      const getStartYear = (period: string) => {
        const matches = period.match(/\d{4}/g);
        if (!matches) return 0;
        return parseInt(matches[0]);
      };
      const endA = getEndYear(a.period);
      const endB = getEndYear(b.period);
      if (endB !== endA) return endB - endA;
      return getStartYear(b.period) - getStartYear(a.period);
    });
  };

  return (
    <div className="min-h-screen relative pb-20 md:pb-12 bg-slate-50">
      {/* Background set to very faint blue */}
      <div className="fixed top-0 left-0 w-full h-64 bg-blue-50/80 border-b border-blue-100 -z-10 no-print" />

      <main className="max-w-6xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sidebar Profile & Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card de Datos: Name & Integrated Contact */}
            <section className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0" />
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">{CV_DATA.name}</h2>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-6">Fisioterapia & Docencia</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail size={16} className="text-blue-500" /> {CV_DATA.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone size={16} className="text-blue-500" /> {CV_DATA.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin size={16} className="text-blue-500" /> {CV_DATA.location}
                  </div>
                </div>
              </div>
            </section>

            {/* Card de Perfil: Summary */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-blue-800">
                <Info size={18} /> Perfil Profesional
              </h3>
              <p className="text-slate-600 leading-relaxed italic text-sm mb-6">"{CV_DATA.summary}"</p>
              
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-start gap-3">
                  <Languages className="text-blue-600 w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-700">Idiomas</h4>
                    <p className="text-xs text-slate-500">{CV_DATA.languages.map(l => `${l.name} (${l.level})`).join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="text-blue-600 w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-700">Movilidad</h4>
                    <p className="text-xs text-slate-500">{CV_DATA.extras.join(', ')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Card with light hover animations */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-base font-bold mb-6 text-blue-800 flex items-center gap-2">
                 <GraduationCap size={18} /> Habilidades
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Soft Skills</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {CV_DATA.softSkills.map(skill => (
                      <div 
                        key={skill} 
                        className="flex items-center gap-2 p-2 px-3 bg-blue-50/30 rounded-xl text-blue-800 text-xs font-semibold border border-blue-50 hover:-translate-y-0.5 hover:shadow-sm hover:bg-blue-50/60 transition-all duration-300 cursor-default"
                      >
                        {SOFT_SKILLS_ICONS[skill] || <Users size={14} />}
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Tech Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {CV_DATA.techSkills.map(skill => (
                      <div 
                        key={skill.name} 
                        className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium hover:bg-white hover:shadow-sm hover:-translate-y-0.5 hover:text-blue-600 transition-all duration-300 cursor-default"
                      >
                        {TECH_SKILLS_ICONS[skill.name]}
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Navigation & Content */}
          <div className="lg:col-span-8 space-y-8 animate-in fade-in duration-500">
            
            {/* Icons-only Navigation Card */}
            <section className="bg-white rounded-xl p-3 shadow-xl border border-slate-100 no-print">
              <div className="grid grid-cols-3 gap-3 h-16">
                {/* Experiencia Button */}
                <div className="relative group">
                  <button 
                    onClick={() => setActiveTab('cv')}
                    className={`w-full h-full rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === 'cv' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                  >
                    <UserCircle size={32} />
                  </button>
                  <div className="absolute inset-0 bg-blue-100/95 rounded-xl flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                    <p className="text-[10px] text-blue-900 font-bold leading-tight uppercase tracking-tighter">Experiencia Laboral</p>
                  </div>
                </div>

                {/* Portfolio Button */}
                <div className="relative group">
                  <button 
                    onClick={() => setActiveTab('portfolio')}
                    className={`w-full h-full rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                  >
                    <Briefcase size={32} />
                  </button>
                  <div className="absolute inset-0 bg-blue-100/95 rounded-xl flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                    <p className="text-[10px] text-blue-900 font-bold leading-tight uppercase tracking-tighter">Portfolio & Proyectos</p>
                  </div>
                </div>

                {/* Print Button */}
                <div className="relative group">
                  <button 
                    onClick={handlePrint}
                    className="w-full h-full bg-blue-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                  >
                    <Printer size={32} />
                  </button>
                  <div className="absolute inset-0 bg-blue-100/95 rounded-xl flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                    <p className="text-[10px] text-blue-900 font-bold leading-tight uppercase tracking-tighter">Imprimir currículum</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content Area */}
            {activeTab === 'cv' ? (
              <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
                {(['Profesorado', 'Fisioterapia', 'Otros'] as const).map((category) => {
                  const sortedItems = sortExperience(CV_DATA.experience.filter(item => item.category === category));
                  const isExpanded = expandedCategories[category];
                  
                  const limit = category === 'Otros' ? 1 : category === 'Fisioterapia' ? 2 : 3;
                  const displayedItems = isExpanded ? sortedItems : sortedItems.slice(0, limit);
                  const canExpand = sortedItems.length > limit;

                  return (
                    <section key={category} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 text-xl shadow-inner">
                            {category === 'Fisioterapia' ? '🏥' : category === 'Profesorado' ? '👨‍🏫' : '✨'}
                          </div>
                          <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">{category}</h3>
                        </div>
                        {canExpand && (
                          <button 
                            onClick={() => toggleCategory(category)}
                            className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all border border-blue-100"
                          >
                            {isExpanded ? <><ChevronUp size={14} /> Colapsar</> : <><ChevronDown size={14} /> Ver todo</>}
                          </button>
                        )}
                      </div>

                      <div className="relative border-l-[3px] border-blue-100 ml-[100px] space-y-12 pb-2">
                        {displayedItems.map((item) => (
                          <div key={item.id} className="relative pl-10 group animate-in slide-in-from-top-2 duration-300">
                            <div className="absolute -left-[125px] top-1 w-[95px] text-right">
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter leading-none block">
                                {item.period}
                              </span>
                            </div>

                            <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-[3px] border-white bg-blue-600 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                            
                            <div className="relative">
                              <h4 className="text-lg font-black text-slate-800 group-hover:text-blue-700 transition flex items-center gap-2 tracking-tight">
                                {item.role}
                                {item.hoverText && <Info size={16} className="text-blue-200 group-hover:text-blue-500 transition-colors" />}
                              </h4>
                              <p className="text-blue-600 font-black text-sm mb-4 uppercase tracking-wider">{item.company}</p>
                              
                              {item.details && (
                                <div className="space-y-2 mt-4">
                                  {item.details.map((detail, dIdx) => (
                                    <p key={dIdx} className="text-slate-500 text-[13px] font-medium">• {detail}</p>
                                  ))}
                                </div>
                              )}

                              {item.hoverText && (
                                <div className="mt-4 overflow-hidden max-h-0 group-hover:max-h-48 transition-all duration-700 ease-in-out">
                                  <div className="bg-blue-50 text-blue-900 p-5 rounded-xl shadow-lg border border-blue-100 border-l-4 border-l-blue-500">
                                    <p className="text-xs leading-relaxed font-bold italic">
                                      {item.hoverText}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}

                {/* Teaching Styles Section with Overlay Effect */}
                <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 text-xl shadow-inner">💡</div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Estilo Didáctico</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                    {CV_DATA.teachingStyles.map(style => (
                      <div key={style.name} className="relative group flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 border border-transparent hover:border-blue-300 hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{style.icon}</span>
                        {/* Overlay explanation */}
                        <div className="absolute inset-0 bg-blue-100/95 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                          <p className="text-[10px] text-blue-900 font-bold uppercase tracking-widest leading-tight">
                            {style.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              /* Portfolio Content Area */
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 text-xl shadow-inner">🚀</div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Proyectos Digitales</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CV_DATA.portfolio.map((project, idx) => (
                      <a 
                        key={idx} 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col bg-slate-50 rounded-xl p-8 border border-slate-100 hover:border-blue-400 hover:bg-white hover:shadow-2xl transition-all duration-700 cursor-pointer"
                      >
                        <div className="flex justify-center mb-8">
                          <div className="text-6xl p-6 bg-white rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-slate-100">
                            {project.icon}
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-black text-slate-800 mb-4 text-center group-hover:text-blue-700 transition tracking-tight flex items-center justify-center gap-2">
                          {project.title} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        
                        <p className="text-sm text-slate-500 leading-relaxed text-center line-clamp-3 min-h-[4.5rem]">
                          {project.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16 py-12 text-center no-print border-t border-slate-200 bg-white">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
          Kevin Valcárcel Estévez • {new Date().getFullYear()} • CV Interactivo 
        </p>
      </footer>

      {/* AI Bot */}
      <div className="fixed bottom-6 right-6 z-50 no-print">
        {isChatOpen ? (
          <div className="bg-white rounded-2xl shadow-2xl w-[350px] sm:w-[420px] h-[600px] flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-blue-50 p-6 flex justify-between items-center text-blue-900 border-b border-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-black text-lg text-white shadow-inner">KV</div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tighter leading-none">AI Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-[10px] text-blue-400 font-black tracking-widest uppercase">Online</span></div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-blue-100 p-2.5 rounded-lg transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
              {chatMessages.length === 0 && (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm"><MessageSquare size={32} /></div>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed px-4">¡Hola! Soy tu guía inteligente. ¿Qué te gustaría saber sobre el perfil de Kevin?</p>
                </div>
              )}
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-6 py-4 rounded-xl text-sm leading-relaxed font-medium shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 rounded-tl-none"><div className="flex gap-2 items-center h-4"><div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" /><div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150" /><div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300" /></div></div>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="p-6 bg-white border-t border-slate-100 flex gap-3">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="¿Cuál es su especialidad docente?" className="flex-1 bg-slate-50 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all border border-slate-100 font-medium" />
              <button type="submit" disabled={!chatInput.trim() || isTyping} className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xl"><Send size={24} /></button>
            </form>
          </div>
        ) : (
          <button onClick={() => setIsChatOpen(true)} className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all group relative">
            <MessageSquare size={32} className="group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        )}
      </div>

      {/* Print View */}
      <div className="hidden print-only p-12 bg-white max-w-[21cm] mx-auto text-slate-800 font-sans">
        <div className="flex justify-between items-start mb-12 border-b-8 border-blue-200 pb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter leading-none">{CV_DATA.name}</h1>
            <p className="text-lg text-blue-700 mt-4 font-black uppercase tracking-widest">Fisioterapia & Profesor Sanitario</p>
          </div>
          <div className="text-right text-[10px] font-black space-y-2 text-slate-400 uppercase tracking-[0.2em]">
            <p className="flex items-center justify-end gap-2">{CV_DATA.email} <Mail size={12} /></p>
            <p className="flex items-center justify-end gap-2">{CV_DATA.phone} <Phone size={12} /></p>
            <p className="flex items-center justify-end gap-2">{CV_DATA.location} <MapPin size={12} /></p>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8 space-y-12">
            <div>
              <h2 className="text-lg font-black mb-6 text-slate-800 uppercase tracking-tighter flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-900 flex items-center justify-center text-sm rounded-lg">01</span> Perfil
              </h2>
              <p className="text-sm leading-relaxed italic text-slate-700 border-l-4 border-slate-100 pl-6">"{CV_DATA.summary}"</p>
            </div>

            <div>
              <h2 className="text-lg font-black mb-8 text-slate-800 uppercase tracking-tighter flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-900 flex items-center justify-center text-sm rounded-lg">02</span> Experiencia
              </h2>
              <div className="space-y-10">
                {['Profesorado', 'Fisioterapia'].map(cat => (
                  <div key={cat} className="space-y-6">
                    <h3 className="text-xs font-black text-blue-700 uppercase tracking-[0.3em] bg-blue-50 py-1 px-4 rounded-md">{cat}</h3>
                    <div className="space-y-8 pl-4">
                      {sortExperience(CV_DATA.experience.filter(e => e.category === cat)).map((exp) => (
                        <div key={exp.id} className="relative">
                          <div className="flex justify-between items-baseline mb-2">
                            <h4 className="font-black text-sm text-slate-800">{exp.role}</h4>
                            <span className="text-[10px] font-black text-slate-400">{exp.period}</span>
                          </div>
                          <p className="text-xs text-blue-700 font-bold mb-3">{exp.company}</p>
                          {exp.hoverText && <p className="text-[10px] text-blue-900 mb-2 italic bg-blue-50 p-3 rounded-xl border border-blue-100">Descripción: {exp.hoverText}</p>}
                          {exp.details && exp.details.map(d => <p key={d} className="text-[10px] mt-1 text-slate-600 font-medium">• {d}</p>)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-4 border-l-2 border-slate-50 pl-10 space-y-12">
            <div>
              <h2 className="text-xs font-black mb-6 text-slate-800 uppercase tracking-widest flex items-center gap-2">Habilidades</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-[9px] font-black uppercase text-slate-400 mb-3 tracking-[0.2em]">Idiomas</h3>
                  <ul className="text-[10px] font-bold space-y-2 uppercase text-slate-600">
                    {CV_DATA.languages.map(l => <li key={l.name} className="flex justify-between"><span>{l.name}</span> <span className="text-blue-600">{l.level}</span></li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[9px] font-black uppercase text-slate-400 mb-3 tracking-[0.2em]">Blandas</h3>
                  <p className="text-[10px] font-bold text-slate-600 leading-loose">{CV_DATA.softSkills.join(' / ')}</p>
                </div>
                <div>
                  <h3 className="text-[9px] font-black uppercase text-slate-400 mb-3 tracking-[0.2em]">Técnicas</h3>
                  <p className="text-[10px] font-bold text-slate-600 leading-loose">{CV_DATA.techSkills.map(s => s.name).join(' • ')}</p>
                </div>
                <div>
                  <h3 className="text-[9px] font-black uppercase text-slate-400 mb-3 tracking-[0.2em]">Docencia</h3>
                  <p className="text-[10px] font-bold text-slate-600 leading-loose uppercase tracking-tighter">{CV_DATA.teachingStyles.map(s => s.name).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;