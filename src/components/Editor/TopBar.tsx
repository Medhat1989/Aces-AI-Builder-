import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Play, ChevronDown, Undo2, Redo2, Github, X, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOGO_URL } from '../../constants';

// Brand Icons with Official Colors
const FigmaIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 25.9 20.05 23.41 21.93 21.57C23.8 19.72 26.34 18.68 29 18.68C31.66 18.68 34.2 19.72 36.07 21.57C37.95 23.41 39 25.9 39 28.5C39 31.1 37.95 33.59 36.07 35.43C34.2 37.28 31.66 38.32 29 38.32C26.34 38.32 23.8 37.28 21.93 35.43C20.05 33.59 19 31.1 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.82C0 42.64 4.2 38.44 9.38 38.44C14.56 38.44 18.76 42.64 18.76 47.82C18.76 53 14.56 57.2 9.38 57.2C4.2 57.2 0 53 0 47.82Z" fill="#0ACF83"/>
    <path d="M0 28.5C0 23.32 4.2 19.12 9.38 19.12H18.76V37.88H9.38C4.2 37.88 0 33.68 0 28.5Z" fill="#A259FF"/>
    <path d="M0 9.18C0 4 4.2 -0.2 9.38 -0.2H18.76V18.56H9.38C4.2 18.56 0 14.36 0 9.18Z" fill="#F24E1E"/>
    <path d="M18.76 -0.2H28.14C33.32 -0.2 37.52 4 37.52 9.18C37.52 14.36 33.32 18.56 28.14 18.56H18.76V-0.2Z" fill="#FF7262"/>
  </svg>
);

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
  const [connectingService, setConnectingService] = useState<string | null>(null);

  const handleConnect = () => {
    const urls: Record<string, string> = {
      'GitHub': 'https://github.com/login',
      'Figma': 'https://www.figma.com/login'
    };
    
    if (connectingService && urls[connectingService]) {
      window.open(urls[connectingService], '_blank', 'width=600,height=800');
    }
    setConnectingService(null);
  };

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

        <div className="flex items-center gap-1 mr-2 ml-2">
          <button 
            onClick={() => setConnectingService('GitHub')}
            className="p-2 rounded-lg hover:bg-white/5 transition-all group"
            title="Connect GitHub"
          >
            <Github size={18} className="text-white group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => setConnectingService('Figma')}
            className="p-2 rounded-lg hover:bg-white/5 transition-all group"
            title="Connect Figma"
          >
            <div className="group-hover:scale-110 transition-transform">
              <FigmaIcon size={18} />
            </div>
          </button>
        </div>
        
        <div className="h-5 w-px bg-white/10 mx-1" />
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-landio-purple blur opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-landio-purple to-aces-blue flex items-center justify-center text-[10px] font-black border border-white/20 text-white shadow-lg relative z-10 transition-transform group-hover:rotate-3">
              MS
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      <AnimatePresence>
        {connectingService && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConnectingService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#0B0B11] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={() => setConnectingService(null)}
                  className="p-2 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                  {connectingService === 'GitHub' && <Github size={32} className="text-white" />}
                  {connectingService === 'Figma' && <FigmaIcon size={32} />}
                </div>
                <h3 className="text-2xl font-display font-black text-white tracking-tight mb-2">Connect to {connectingService}</h3>
                <p className="text-sm text-white/40 font-display">Sign in with your {connectingService} account to sync your projects and assets directly to the Aces Studio workspace.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-landio-purple/20 flex items-center justify-center flex-shrink-0 text-landio-purple font-black text-xs">1</div>
                    <p className="text-xs text-white/60 leading-relaxed font-display">Authorize Aces Ads to access your {connectingService} projects.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-landio-purple/20 flex items-center justify-center flex-shrink-0 text-landio-purple font-black text-xs">2</div>
                    <p className="text-xs text-white/60 leading-relaxed font-display">Select the specific repositories or files you want to import.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleConnect}
                    className="w-full bg-white text-black py-4 rounded-2xl font-display font-black text-xs tracking-[0.2em] uppercase hover:bg-landio-purple hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    Sign in to {connectingService} <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </button>
                  
                  <button 
                    onClick={() => setConnectingService(null)}
                    className="w-full py-4 text-[10px] font-black tracking-widest text-white/20 uppercase hover:text-white/40 transition-colors"
                  >
                    Cancel Connection
                  </button>
                </div>
              </div>

              <p className="text-center text-[10px] text-white/20 uppercase font-black tracking-widest mt-8">
                Secured by Aces Studio Connect • <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

