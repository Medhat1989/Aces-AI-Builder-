import React, { useRef } from 'react';
import { Plus, Layout, Layers, Box, MousePointer2, Image, Type, Palette, Puzzle, Search, Share2 } from 'lucide-react';

interface LeftPanelProps {
  onAddMedia?: (type: 'image' | 'video', content: string) => void;
  activeTool: string;
  onToolChange: (tool: string) => void;
}

export default function LeftPanel({ onAddMedia, activeTool, onToolChange }: LeftPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePlusClick = () => {
    onToolChange('Add');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onAddMedia) return;

    const isVideo = file.type.startsWith('video/');
    const type = isVideo ? 'video' : 'image';
    
    // For local preview, we use createObjectURL or FileReader
    // FileReader is better for persistence in this small app's state
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onAddMedia(type, content);
    };
    reader.readAsDataURL(file);
    
    // Reset
    e.target.value = '';
  };

  const tools = [
    { icon: Plus, label: 'Add', onClick: handlePlusClick },
    { icon: Layout, label: 'Pages' },
    { icon: Layers, label: 'Layers' },
    { icon: Palette, label: 'Design' },
    { icon: Puzzle, label: 'Apps' },
    { icon: Share2, label: 'Integrations' },
    { icon: Box, label: 'CMS' },
    { icon: Image, label: 'Media' },
  ];

  return (
    <div className="w-full h-full min-w-[70px] bg-aces-black border-r border-aces-border flex flex-col items-center py-8 gap-10 z-40 backdrop-blur-2xl transition-all duration-500">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*,video/*"
      />
      
      <button 
        onClick={handlePlusClick}
        className="p-4 bg-landio-purple rounded-2xl text-white shadow-[0_10px_30px_rgba(112,71,235,0.4)] hover:bg-[#8259FF] transition-all transform hover:scale-110 active:scale-95 group relative"
      >
        <Plus size={24} strokeWidth={2.5} />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
      </button>

      <div className="flex flex-col gap-4 w-full mt-2">
        {tools.map((tool, idx) => {
          const isActive = activeTool === tool.label;
          return (
            <div 
              key={idx} 
              onClick={() => {
                onToolChange(tool.label);
                if (tool.onClick) tool.onClick();
              }}
              className="group relative flex flex-col items-center py-2 cursor-pointer transition-all"
            >
              <div className={`p-2.5 rounded-xl transition-all ${isActive ? 'bg-landio-purple/10' : 'hover:bg-white/5'}`}>
                <tool.icon 
                  size={18} 
                  className={`${isActive ? 'text-landio-purple' : 'text-white/20'} group-hover:text-white transition-colors`} 
                />
              </div>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-landio-purple rounded-l-full shadow-[0_0_12px_rgba(112,71,235,0.8)]" />
              )}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#0d0d14] text-[10px] font-display font-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-50 border border-white/5 shadow-2xl uppercase tracking-widest">
                  {tool.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-8 items-center pb-2">
          <button className="text-white/10 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"><Search size={20} /></button>
          <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-xs font-display font-medium text-white/20 hover:text-white hover:border-aces-blue/30 transition-all cursor-pointer">
              ?
          </div>
      </div>
    </div>
  );
}
