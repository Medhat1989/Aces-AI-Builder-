import React, { useState, useRef } from 'react';
import { Settings, Sparkles, X, ChevronRight, Type, Move, Palette, Layout, Send, Bot, MousePointer2, Github, Link2, Image, Search, Upload, Plus, AlignLeft, AlignCenter, AlignRight, AlignJustify, ArrowUp, ArrowDown, MoveVertical, PlayCircle, Zap } from 'lucide-react';
import { EditableElement } from '../../types';
import { GoogleGenAI } from '@google/genai';

interface RightPanelProps {
  selectedId: string | null;
  elements: Record<string, EditableElement>;
  activeTool: string;
  updateElement: (id: string, updates: Partial<EditableElement>) => void;
  deleteElement: (id: string) => void;
  isAIPanelOpen: boolean;
  setIsAIPanelOpen: (open: boolean) => void;
  mediaLibrary?: string[];
  onAddMedia?: (type: 'image' | 'video', content: string) => void;
}

export default function RightPanel({ 
  selectedId, 
  elements, 
  activeTool,
  updateElement, 
  deleteElement,
  isAIPanelOpen, 
  setIsAIPanelOpen,
  mediaLibrary = [],
  onAddMedia
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<'design' | 'ai'>('design');
  const [prompt, setPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedElement = selectedId ? elements[selectedId] : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onAddMedia) return;

    const isVideo = file.type.startsWith('video/');
    const type = isVideo ? 'video' : 'image';
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onAddMedia(type, content);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAiAsk = async () => {
    if (!prompt.trim()) return;
    setIsAiLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = 'gemini-3-flash-preview';
      
      const context = selectedElement 
        ? `The user is editing an element with ID: ${selectedElement.id}, type: ${selectedElement.type}, and content: "${selectedElement.content}".`
        : `The user is editing a Honda car dealer template.`;

      const instruction = `
        You are the AcesAds AI Designer.
        User request: ${prompt}
        Current element content: "${selectedElement?.content || 'Template root'}"
        
        Provide a specific JSON response if you want to update the element.
        Format: { "suggestedContent": "...", "suggestedStyle": { "fontSize": "...", "color": "..." } }
        Or just provide expert design advice.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: `${context}\n\n${instruction}`,
      });

      const text = response.text || '';
      console.log('AI Response:', text);
      
      // Try to parse JSON if AI provided it
      try {
        const jsonMatch = text.match(/\{.*\}/s);
        if (jsonMatch && selectedElement) {
          const data = JSON.parse(jsonMatch[0]);
          if (data.suggestedContent) updateElement(selectedElement.id, { content: data.suggestedContent });
          if (data.suggestedStyle) updateElement(selectedElement.id, { style: { ...selectedElement.style, ...data.suggestedStyle } });
          alert('AI modified your design based on your intent.');
        } else {
          alert('AcesAds AI suggests: ' + text.slice(0, 500) + '...');
        }
      } catch (e) {
        alert('AcesAds AI suggests: ' + text.slice(0, 500) + '...');
      }
      
      setPrompt('');
    } catch (error) {
      console.error('AI Error:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className={`bg-aces-black border-l border-aces-border flex flex-col shrink-0 flex-none z-40 transition-all duration-500 backdrop-blur-2xl ${isAIPanelOpen ? 'w-80' : 'w-12'}`}>
      {/* Header Tabs */}
      <div className="flex h-16 border-b border-aces-border bg-black/20">
        <button 
          onClick={() => { setActiveTab('design'); setIsAIPanelOpen(true); }}
          className={`flex-1 flex flex-col items-center justify-center gap-1.5 text-[9px] font-display font-black tracking-[0.2em] uppercase transition-all ${activeTab === 'design' ? 'text-white bg-white/[0.03]' : 'text-white/10 hover:text-white/40'}`}
        >
          <Settings size={17} strokeWidth={1.5} /> {isAIPanelOpen && 'Design'}
        </button>
        <button 
          onClick={() => { setActiveTab('ai'); setIsAIPanelOpen(true); }}
          className={`flex-1 flex flex-col items-center justify-center gap-1.5 text-[9px] font-display font-black tracking-[0.2em] uppercase transition-all ${activeTab === 'ai' ? 'text-landio-purple bg-landio-purple/[0.03]' : 'text-white/10 hover:text-white/40'}`}
        >
          <Sparkles size={17} strokeWidth={1.5} /> {isAIPanelOpen && 'AI Engine'}
          {activeTab === 'ai' && isAIPanelOpen && <div className="absolute top-0 right-0 w-2 h-2 bg-landio-purple rounded-full animate-pulse m-3 shadow-[0_0_8px_rgba(112,71,235,0.8)]" />}
        </button>
      </div>

      {!isAIPanelOpen ? (
        <div className="flex-1 flex flex-col items-center py-6 gap-6">
            <button onClick={() => setIsAIPanelOpen(true)} className="text-white/10 hover:text-white transition-colors"><ChevronRight size={22} /></button>
        </div>
      ) : activeTab === 'design' ? (
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-10 custom-scrollbar">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,video/*"
          />
          {activeTool === 'Integrations' ? (
             <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <section>
                   <div className="flex items-center gap-3 mb-5 text-[10px] font-display font-black text-white/20 uppercase tracking-[0.3em]">
                      <Bot size={14} className="text-landio-purple" /> AI Models
                   </div>
                   <div className="space-y-4">
                      <div className="bg-aces-card p-6 rounded-3xl border border-white/5 shadow-2xl relative group overflow-hidden">
                         <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D97757] opacity-40"></div>
                         <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-2xl bg-[#D97757]/10 flex items-center justify-center">
                                  <Bot size={20} className="text-[#D97757]" />
                               </div>
                               <div>
                                  <h4 className="text-[11px] font-black text-white uppercase tracking-wider">Claude</h4>
                                  <p className="text-[9px] text-white/20 font-medium">Anthropic</p>
                               </div>
                            </div>
                            <button className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-all">Connect</button>
                         </div>
                         <p className="text-[10px] text-white/30 leading-relaxed font-light">Bring Claude's conversational intelligence directly into your design workflow for superior content generation.</p>
                      </div>
                   </div>
                </section>

                <section>
                   <div className="flex items-center gap-3 mb-5 text-[10px] font-display font-black text-white/20 uppercase tracking-[0.3em]">
                      <Github size={14} className="text-landio-purple" /> Developer Tools
                   </div>
                   <div className="space-y-4">
                      <div className="bg-aces-card p-6 rounded-3xl border border-white/5 shadow-2xl relative group overflow-hidden">
                         <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFFFFF] opacity-10"></div>
                         <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                  <Github size={20} className="text-white" />
                               </div>
                               <div>
                                  <h4 className="text-[11px] font-black text-white uppercase tracking-wider">GitHub</h4>
                                  <p className="text-[9px] text-white/20 font-medium">Version Control</p>
                               </div>
                            </div>
                            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-[9px] font-black text-white uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20">Sign In</button>
                         </div>
                         <p className="text-[10px] text-white/30 leading-relaxed font-light">Sync your dealership platform directly with GitHub repositories for continuous deployment and code sync.</p>
                      </div>
                   </div>
                </section>
             </div>
          ) : activeTool === 'Media' ? (
             <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <section>
                   <div className="flex items-center gap-3 mb-5 text-[10px] font-display font-black text-white/20 uppercase tracking-[0.3em]">
                      <Image size={14} className="text-landio-purple" /> My Media
                   </div>
                   {mediaLibrary.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                         {mediaLibrary.map((url, i) => (
                            <div 
                              key={i} 
                              onClick={() => onAddMedia?.('image', url)}
                              className="aspect-square bg-aces-card rounded-2xl border border-white/5 overflow-hidden group cursor-pointer relative"
                            >
                               <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                               <div className="absolute inset-0 bg-landio-purple/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Plus size={16} className="text-white" />
                               </div>
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="bg-white/[0.02] border border-dashed border-white/5 rounded-3xl p-8 text-center">
                         <Image size={24} className="text-white/5 mx-auto mb-3" />
                         <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Library Empty</p>
                      </div>
                   )}
                </section>

                <section>
                   <div className="flex items-center gap-3 mb-5 text-[10px] font-display font-black text-white/20 uppercase tracking-[0.3em]">
                      <Search size={14} className="text-landio-purple" /> Browser
                   </div>
                   <div className="space-y-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-aces-card border border-white/5 hover:border-landio-purple/30 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all group"
                      >
                         <div className="w-12 h-12 rounded-2xl bg-landio-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload size={20} className="text-landio-purple" />
                         </div>
                         <div className="text-center">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-wider">Upload Local</h4>
                            <p className="text-[9px] text-white/20 font-medium">PNG, JPG, MP4</p>
                         </div>
                      </button>
                      
                      <button className="w-full bg-white/[0.02] border border-white/5 hover:border-white/10 p-4 rounded-2xl flex items-center justify-center gap-3 transition-all grayscale opacity-40 cursor-not-allowed">
                         <div className="text-center">
                            <h4 className="text-[9px] font-black text-white uppercase tracking-widest">Browse Unsplash</h4>
                         </div>
                      </button>
                   </div>
                </section>
             </div>
          ) : selectedElement ? (
            <>
              <section>
                 <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3 text-[10px] font-display font-black text-white/20 uppercase tracking-[0.3em]">
                        <Layout size={14} className="text-landio-purple" /> Context
                    </div>
                    {selectedElement.id !== 'root' && (
                       <button 
                        onClick={() => deleteElement(selectedElement.id)}
                        className="text-[9px] font-black text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                       >
                         <X size={12} /> Delete
                       </button>
                    )}
                 </div>
                 <div className="bg-aces-card p-5 rounded-2xl border border-white/5 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-landio-purple opacity-20 transition-opacity group-hover:opacity-100"></div>
                    <p className="text-[9px] text-white/10 mb-1.5 font-bold uppercase tracking-widest">Node ID</p>
                    <p className="text-xs font-mono text-landio-purple/80 tracking-tight">{selectedElement.id}</p>
                 </div>
              </section>

              <section>
                 <div className="flex items-center gap-3 mb-5 text-[10px] font-display font-black text-white/20 uppercase tracking-[0.3em]">
                    <Type size={14} className="text-landio-purple" /> Content
                 </div>
                 <div className="relative group">
                    <div className="absolute -inset-0.5 bg-landio-purple blur opacity-0 group-focus-within:opacity-10 transition-opacity rounded-2xl"></div>
                    <textarea 
                        value={selectedElement.content}
                        onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                        className="relative w-full bg-aces-black/40 border border-aces-border rounded-2xl p-5 text-sm focus:outline-none focus:border-landio-purple/50 transition-all min-h-[140px] font-sans font-light leading-relaxed text-white/80"
                    />
                 </div>
              </section>

              <section>
                 <div className="flex items-center gap-3 mb-5 text-[10px] font-display font-black text-white/20 uppercase tracking-[0.3em]">
                    <Palette size={14} className="text-landio-purple" /> Aesthetics
                 </div>
                 <div className="space-y-6">
                    <div className="bg-aces-card p-5 rounded-2xl border border-aces-border">
                        <label className="text-[9px] text-white/10 uppercase font-black tracking-[0.2em] block mb-3">Dimensions</label>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Width</p>
                              <input 
                                 type="text" 
                                 value={selectedElement.style.width?.toString() || 'auto'}
                                 onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, width: e.target.value } })}
                                 className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-white/60 focus:outline-none"
                              />
                           </div>
                           <div>
                              <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Height</p>
                              <input 
                                 type="text" 
                                 value={selectedElement.style.height?.toString() || 'auto'}
                                 onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, height: e.target.value } })}
                                 className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-white/60 focus:outline-none"
                              />
                           </div>
                        </div>
                    </div>

                    {selectedElement.type === 'container' && (
                        <div className="bg-aces-card p-5 rounded-2xl border border-aces-border">
                            <label className="text-[9px] text-white/10 uppercase font-black tracking-[0.2em] block mb-3">Container Logic</label>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Item Spacing (Gap)</p>
                                    <input 
                                        type="text" 
                                        value={selectedElement.style.gap?.toString() || '0px'}
                                        onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, display: 'flex', flexDirection: selectedElement.style.flexDirection || 'column', gap: e.target.value } })}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-white/60"
                                    />
                                </div>
                                <div className="flex bg-white/5 rounded-xl p-1">
                                    <button 
                                        onClick={() => updateElement(selectedElement.id, { style: { ...selectedElement.style, display: 'flex', flexDirection: 'row' } })}
                                        className={`flex-1 py-2 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${selectedElement.style.flexDirection === 'row' ? 'bg-landio-purple text-white shadow-lg' : 'text-white/20 hover:text-white/40'}`}
                                    >
                                        Rows
                                    </button>
                                    <button 
                                        onClick={() => updateElement(selectedElement.id, { style: { ...selectedElement.style, display: 'flex', flexDirection: 'column' } })}
                                        className={`flex-1 py-2 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${selectedElement.style.flexDirection === 'column' || !selectedElement.style.flexDirection ? 'bg-landio-purple text-white shadow-lg' : 'text-white/20 hover:text-white/40'}`}
                                    >
                                        Columns
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-aces-card p-5 rounded-2xl border border-aces-border">
                        <label className="text-[9px] text-white/10 uppercase font-black tracking-[0.2em] block mb-3">Font Scale</label>
                        <div className="flex items-center gap-4">
                           <input 
                              type="text" 
                              value={selectedElement.style.fontSize?.toString() || ''}
                              onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, fontSize: e.target.value } })}
                              className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2.5 text-xs font-mono text-white/60 focus:outline-none focus:border-landio-purple/30"
                           />
                           <div className="text-[10px] text-white/10 font-black tracking-widest">PX</div>
                        </div>
                    </div>
                    
                    <div className="bg-aces-card p-5 rounded-2xl border border-aces-border">
                        <label className="text-[9px] text-white/10 uppercase font-black tracking-[0.2em] block mb-3">
                          {selectedElement.type === 'icon' ? 'Icon Color' : 'Color / Text Color'}
                        </label>
                        <div className="flex items-center gap-5">
                           <div className="relative group/color">
                              <input 
                                type="color" 
                                value={String(selectedElement.style.color || '#ffffff')}
                                onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, color: e.target.value } })}
                                className="w-12 h-12 rounded-2xl bg-transparent cursor-pointer border-2 border-white/5 p-0 transform hover:scale-105 transition-all shadow-xl"
                                style={{ backgroundColor: String(selectedElement.style.color || '#ffffff') }}
                              />
                           </div>
                           <div className="flex flex-col gap-1">
                              <span className="text-xs font-mono text-white/90 uppercase tracking-tighter">{selectedElement.style.color || '#ffffff'}</span>
                              <span className="text-[9px] text-white/10 font-black uppercase tracking-widest">Hex Code</span>
                           </div>
                        </div>
                    </div>

                    <div className="bg-aces-card p-5 rounded-2xl border border-aces-border">
                        <label className="text-[9px] text-white/10 uppercase font-black tracking-[0.2em] block mb-3">Background Color</label>
                        <div className="flex items-center gap-5">
                           <div className="relative group/color">
                              <input 
                                type="color" 
                                value={String(selectedElement.style.backgroundColor || 'transparent')}
                                onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, backgroundColor: e.target.value } })}
                                className="w-12 h-12 rounded-2xl bg-transparent cursor-pointer border-2 border-white/5 p-0 transform hover:scale-105 transition-all shadow-xl"
                                style={{ backgroundColor: String(selectedElement.style.backgroundColor || '#000000') }}
                              />
                           </div>
                           <div className="flex flex-col gap-1">
                              <span className="text-xs font-mono text-white/90 uppercase tracking-tighter">{selectedElement.style.backgroundColor || 'transparent'}</span>
                              <span className="text-[9px] text-white/10 font-black uppercase tracking-widest">Hex Code</span>
                           </div>
                        </div>
                    </div>

                    <div className="bg-aces-card p-5 rounded-2xl border border-aces-border">
                        <label className="text-[9px] text-white/10 uppercase font-black tracking-[0.2em] block mb-3 font-display">Layout & Alignment</label>
                        
                        <div className="space-y-6">
                           <div>
                              <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-3">Horizontal Alignment</p>
                              <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                                 {[
                                    { id: 'flex-start', icon: AlignLeft, label: 'Start' },
                                    { id: 'center', icon: AlignCenter, label: 'Center' },
                                    { id: 'flex-end', icon: AlignRight, label: 'End' }
                                 ].map(align => (
                                    <button
                                       key={align.id}
                                       onClick={() => {
                                          const margin = align.id === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : align.id === 'flex-end' ? { marginLeft: 'auto', marginRight: '0' } : { marginLeft: '0', marginRight: 'auto' };
                                          updateElement(selectedElement.id, { style: { ...selectedElement.style, alignSelf: align.id as any, display: 'block', ...margin } });
                                       }}
                                       className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${selectedElement.style.alignSelf === align.id ? 'bg-landio-purple text-white shadow-lg' : 'text-white/20 hover:text-white/40 hover:bg-white/5'}`}
                                    >
                                       <align.icon size={14} />
                                       <span className="text-[7px] uppercase font-black tracking-tighter">{align.label}</span>
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div>
                              <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-3">Text Alignment</p>
                              <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                                 {[
                                    { id: 'left', icon: AlignLeft },
                                    { id: 'center', icon: AlignCenter },
                                    { id: 'right', icon: AlignRight },
                                    { id: 'justify', icon: AlignJustify }
                                 ].map(align => (
                                    <button
                                       key={align.id}
                                       onClick={() => updateElement(selectedElement.id, { style: { ...selectedElement.style, textAlign: align.id as any } })}
                                       className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${selectedElement.style.textAlign === align.id ? 'bg-blue-500 text-white shadow-lg' : 'text-white/20 hover:text-white/40 hover:bg-white/5'}`}
                                    >
                                       <align.icon size={14} />
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div>
                              <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-3">Vertical Distribution</p>
                              <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                                 {[
                                    { id: 'Top', icon: ArrowUp, label: 'Top' },
                                    { id: 'Middle', icon: MoveVertical, label: 'Middle' },
                                    { id: 'Bottom', icon: ArrowDown, label: 'Bottom' }
                                 ].map(dist => (
                                    <button
                                       key={dist.id}
                                       onClick={() => {
                                          let margin = {};
                                          if (dist.label === 'Top') margin = { marginTop: '0', marginBottom: 'auto' };
                                          if (dist.label === 'Middle') margin = { marginTop: 'auto', marginBottom: 'auto' };
                                          if (dist.label === 'Bottom') margin = { marginTop: 'auto', marginBottom: '0' };
                                          updateElement(selectedElement.id, { style: { ...selectedElement.style, ...margin } });
                                       }}
                                       className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-white/20 hover:text-white/40 hover:bg-white/5`}
                                    >
                                       <dist.icon size={14} />
                                       <span className="text-[7px] uppercase font-black tracking-tighter">{dist.label}</span>
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                    </div>

                    <div className="bg-aces-card p-5 rounded-2xl border border-aces-border">
                        <label className="text-[9px] text-white/10 uppercase font-black tracking-[0.2em] block mb-3 font-display">Motion & Entrance</label>
                        <div className="space-y-6">
                           <div>
                              <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-3">Entrance Effect</p>
                              <select 
                                 value={selectedElement.animation?.type || 'none'}
                                 onChange={(e) => updateElement(selectedElement.id, { 
                                    animation: { 
                                       type: e.target.value as any, 
                                       delay: selectedElement.animation?.delay || 0.2,
                                       duration: selectedElement.animation?.duration || 0.6
                                    } 
                                 })}
                                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs text-white/80 focus:outline-none focus:border-landio-purple/30 appearance-none font-display uppercase tracking-wider bg-[#0d0d14]"
                              >
                                 <option value="none">None</option>
                                 <option value="fade-in">Fade In</option>
                                 <option value="slide-up">Slide Up</option>
                                 <option value="slide-left">Slide Left</option>
                                 <option value="slide-right">Slide Right</option>
                                 <option value="zoom-in">Zoom In</option>
                              </select>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-3">Delay (s)</p>
                                 <input 
                                    type="number" 
                                    step="0.1"
                                    min="0"
                                    value={selectedElement.animation?.delay || 0}
                                    onChange={(e) => updateElement(selectedElement.id, { 
                                       animation: { 
                                          ...(selectedElement.animation || { type: 'none', duration: 0.6 }),
                                          delay: parseFloat(e.target.value) 
                                       } 
                                    })}
                                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-white/60"
                                 />
                              </div>
                              <div>
                                 <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-3">Duration (s)</p>
                                 <input 
                                    type="number" 
                                    step="0.1"
                                    min="0.1"
                                    value={selectedElement.animation?.duration || 0.6}
                                    onChange={(e) => updateElement(selectedElement.id, { 
                                       animation: { 
                                          ...(selectedElement.animation || { type: 'none', delay: 0 }),
                                          duration: parseFloat(e.target.value) 
                                       } 
                                    })}
                                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-white/60"
                                 />
                              </div>
                           </div>
                        </div>
                    </div>
                 </div>
              </section>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-white/10 gap-6 border border-aces-border rounded-[2.5rem] p-10 mt-10 shadow-inner">
               <div className="p-5 bg-white/[0.01] rounded-3xl border border-white/5">
                  <MousePointer2 size={48} strokeWidth={0.5} className="text-landio-purple opacity-30" />
               </div>
               <div>
                  <h4 className="text-[11px] font-display font-black uppercase tracking-[0.3em] mb-2 text-white/20">Canvas Idle</h4>
                  <p className="text-xs font-light text-white/10 leading-relaxed">Select a layout node to invoke the design processor.</p>
               </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-8 bg-[#050508] relative overflow-hidden">
          {/* Landio AI Aura */}
          <div className="absolute top-0 left-0 w-full h-[60%] bg-landio-purple/10 blur-[120px] pointer-events-none"></div>

          <div className="flex-1 overflow-y-auto space-y-8 mb-8 pr-2 custom-scrollbar relative z-10">
             <div className="flex gap-5">
                <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-landio-purple to-aces-blue flex items-center justify-center shrink-0 shadow-[0_10px_40px_rgba(112,71,235,0.4)] border border-white/20">
                    <Bot size={22} className="text-white" />
                </div>
                <div className="bg-aces-card border border-aces-border p-5 rounded-3xl rounded-tl-none text-xs leading-relaxed font-light text-white/80 shadow-2xl relative">
                   Engaged. Neural Engine calibrated to Landio aesthetic protocols. How shall we elevate your automotive presence today?
                </div>
             </div>
             
             {prompt && (
               <div className="flex justify-end gap-3 translate-x-1 animate-in slide-in-from-right-2">
                  <div className="bg-landio-purple border border-white/10 p-5 rounded-3xl rounded-tr-none text-xs font-semibold max-w-[85%] text-white shadow-xl shadow-landio-purple/10">
                    {prompt}
                  </div>
               </div>
             )}
          </div>

          <div className="mt-auto relative z-10">
            <div className="w-full relative group">
              <div className="absolute -inset-2 bg-landio-purple blur-[20px] opacity-10 group-focus-within:opacity-20 transition-opacity rounded-3xl"></div>
              <div className="relative bg-aces-black/60 border border-white/10 rounded-[1.5rem] p-4 flex flex-col gap-4 shadow-2xl backdrop-blur-xl">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your design intent..."
                  className="bg-transparent w-full outline-none text-xs text-white/80 placeholder:text-white/10 h-24 resize-none font-light leading-relaxed custom-scrollbar"
                />
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                   <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 bg-landio-purple rounded-full animate-pulse shadow-[0_0_10px_rgba(112,71,235,1)]" />
                      <span className="text-[10px] text-white/10 uppercase font-black tracking-[0.2em]">Processor Online</span>
                   </div>
                   <button 
                    disabled={isAiLoading || !prompt.trim()}
                    onClick={handleAiAsk}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-display font-black tracking-[0.15em] uppercase transition-all flex items-center gap-2 ${!prompt.trim() ? 'bg-white/5 text-white/10' : 'bg-landio-purple text-white hover:bg-[#8259FF] shadow-[0_10px_30px_rgba(112,71,235,0.3)]'}`}
                  >
                    {isAiLoading ? (
                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                       <>Engage <Send size={13} strokeWidth={2.5} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-white/5 mt-6 text-center uppercase tracking-[0.5em] font-black">Landio Neural Link v1.0</p>
          </div>
        </div>
      )}
    </div>
  );
}
