import React from 'react';
import { Monitor, Tablet, Smartphone, Save, Share2, Play, ChevronDown, Undo2, Redo2, Scaling } from 'lucide-react';
import { LOGO_URL } from '../../constants';

interface TopBarProps {
  templateName: string;
  device: 'desktop' | 'tablet' | 'mobile';
  setDevice: (d: 'desktop' | 'tablet' | 'mobile') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onPreview: () => void;
  onPublish: () => void;
  onDashboard: () => void;
}

export default function TopBar({ 
  templateName, 
  device, 
  setDevice, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo, 
  onPreview, 
  onPublish,
  onDashboard
}: TopBarProps) {
  return (
    <div className="h-16 bg-[#0B0C10]/80 border-b border-aces-border flex items-center justify-between px-8 z-50 backdrop-blur-2xl">
      {/* Left: Branding & Page */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={onDashboard}>
              <div className="absolute inset-0 bg-landio-purple blur-md opacity-20 group-hover:opacity-40 rounded-full transition-opacity"></div>
              <img src={LOGO_URL} alt="AcesAds" className="h-6 w-auto relative z-10 brightness-110" referrerPolicy="no-referrer" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 pl-2 pr-2 py-1.5 rounded-lg transition-all group">
                <span className="text-[10px] font-display font-medium text-white/40 uppercase tracking-[0.25em] group-hover:text-white transition-colors">Editor <span className="text-white/10 mx-1">/</span> {templateName}</span>
                <ChevronDown size={12} className="text-white/20 group-hover:text-white/60" />
            </div>
        </div>
      </div>

      {/* Center: Device Management */}
      <div className="flex items-center bg-aces-black/50 rounded-2xl p-1 border border-white/5 shadow-2xl backdrop-blur-md">
        <button 
          onClick={() => setDevice('desktop')}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${device === 'desktop' ? 'bg-landio-purple text-white shadow-[0_0_20px_rgba(112,71,235,0.3)]' : 'text-white/20 hover:text-white/40'}`}
        >
          <Monitor size={17} strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => setDevice('tablet')}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${device === 'tablet' ? 'bg-landio-purple text-white shadow-[0_0_20px_rgba(112,71,235,0.3)]' : 'text-white/20 hover:text-white/40'}`}
        >
          <Tablet size={17} strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => setDevice('mobile')}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${device === 'mobile' ? 'bg-landio-purple text-white shadow-[0_0_20px_rgba(112,71,235,0.3)]' : 'text-white/20 hover:text-white/40'}`}
        >
          <Smartphone size={17} strokeWidth={1.5} />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 mr-2">
          <button 
            disabled={!canUndo}
            onClick={onUndo}
            className={`p-2 rounded-lg transition-all ${canUndo ? 'text-white hover:bg-white/5' : 'text-white/5 cursor-not-allowed'}`}
          >
            <Undo2 size={16} />
          </button>
          <button 
            disabled={!canRedo}
            onClick={onRedo}
            className={`p-2 rounded-lg transition-all ${canRedo ? 'text-white hover:bg-white/5' : 'text-white/5 cursor-not-allowed'}`}
          >
            <Redo2 size={16} />
          </button>
        </div>

        <button 
          onClick={onPreview}
          className="flex items-center gap-2.5 px-5 py-2.5 text-[10px] font-display font-medium text-white/60 border border-white/5 hover:border-white/10 hover:text-white hover:bg-white/5 rounded-full transition-all tracking-[0.15em]"
        >
          <Play size={14} className="text-landio-purple" fill="currentColor" /> PREVIEW
        </button>
        <button 
          onClick={onPublish}
          className="bg-white text-black px-7 py-2.5 rounded-full text-[10px] font-display font-black tracking-[0.15em] hover:bg-landio-purple hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
        >
          PUBLISH
        </button>
        
        <div className="h-5 w-px bg-white/10 mx-1" />
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-landio-purple blur opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-landio-purple to-aces-blue flex items-center justify-center text-[10px] font-black border border-white/20 text-white shadow-lg relative z-10 transition-transform group-hover:rotate-3">
              MS
          </div>
        </div>
      </div>
    </div>
  );
}
