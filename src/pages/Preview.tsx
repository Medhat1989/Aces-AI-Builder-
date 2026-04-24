import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';
import { HONDA_TEMPLATES } from '../constants';

export default function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = HONDA_TEMPLATES.find(t => t.id === id) || HONDA_TEMPLATES[0];
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const containerWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className="min-h-screen bg-[#020204] flex flex-col font-sans">
      {/* Mini Top Bar */}
      <div className="h-16 bg-black border-b border-white/10 px-6 flex items-center justify-between z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.close()}
            className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <span className="text-white text-xs font-black tracking-[0.2em] uppercase">{template.name}</span>
            <span className="text-blue-500/50 text-[9px] font-bold uppercase tracking-[0.3em]">Precision Preview</span>
          </div>
        </div>

        <div className="flex items-center bg-[#0d0d14] border border-white/10 rounded-xl p-1 hidden md:flex">
          <button 
            onClick={() => setDevice('desktop')}
            className={`p-2 rounded-lg transition-all ${device === 'desktop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-white/20 hover:text-white/40'}`}
          >
            <Monitor size={16} />
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={`p-2 rounded-lg transition-all ${device === 'tablet' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-white/20 hover:text-white/40'}`}
          >
            <Tablet size={16} />
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded-lg transition-all ${device === 'mobile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-white/20 hover:text-white/40'}`}
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => navigate(`/editor/${id}`)}
            className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5 flex items-center gap-2"
          >
            EDIT SITE <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-[#0d0d14] overflow-auto flex flex-col items-center p-4 md:p-8 scrollbar-hide relative">
        {/* Ambient Preview Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ width: containerWidths[device] }}
          className="bg-white text-black shadow-2xl transition-all duration-500 min-h-screen overflow-x-hidden relative z-10"
        >
          {/* Mockup of the live site */}
          <div className="bg-black py-4 px-8 border-b border-white/10 flex justify-between items-center sticky top-0 z-40">
             <div className="text-white font-black text-xl italic tracking-tighter">HONDA<span className="text-red-600">.</span></div>
             <div className="flex gap-6 text-[10px] font-bold text-gray-400">
                <span>MODELS</span>
                <span>OFFERS</span>
                <span>SERVICE</span>
                <span>CONTACT</span>
             </div>
          </div>

          <section className="bg-black text-white py-32 px-8 flex flex-col items-center text-center">
              <motion.div
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1.2 }}
                 className="mb-8"
              >
                  <h1 className="text-7xl font-black italic tracking-tighter mb-4 leading-none">THE NEW 2026 TYPE R</h1>
                  <p className="text-gray-500 text-xl font-light tracking-wide">REDESIGNED FOR ULTIMATE PERFORMANCE.</p>
              </motion.div>
              <button className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-full font-black tracking-widest text-sm transition-all hover:scale-105">
                 ORDER YOURS TODAY
              </button>
          </section>

          <section className="bg-white py-24 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=1080" 
                  alt="Car Interior" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
             </div>
             <div>
                <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase">Luxury in the Core</h2>
                <p className="text-gray-600 leading-relaxed mb-8 font-light">Crafted with precision, the new 2026 interior features premium materials and the latest Honda Sensing® technology for a drive like no other.</p>
                <div className="flex gap-4">
                   <div className="bg-black text-white px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest leading-none flex items-center justify-center">Leather Trim</div>
                   <div className="bg-black text-white px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest leading-none flex items-center justify-center">Bose Premium Audio</div>
                </div>
             </div>
          </section>

          {/* Rotating Wheel feature as requested */}
          <section className="bg-black py-20 flex flex-col items-center justify-center overflow-hidden">
              <div className="text-center mb-12">
                 <h2 className="text-white text-4xl font-black uppercase tracking-tighter">Precision in Every Turn</h2>
                 <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">Legendary Honda Performance</p>
              </div>
              
              <div className="relative w-80 h-80 flex items-center justify-center">
                 <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="w-64 h-64 border-[12px] border-[#222] rounded-full relative shadow-2xl flex items-center justify-center"
                 >
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="absolute w-2 h-full bg-[#111] border-x border-white/5" style={{ transform: `rotate(${i * 72}deg)` }}>
                        <div className="h-10 w-full bg-gradient-to-b from-[#333] to-[#111] rounded-full mt-4" />
                      </div>
                    ))}
                    <div className="w-16 h-16 bg-[#111] rounded-full border-4 border-[#333] flex items-center justify-center z-10">
                       <div className="text-white font-bold text-[10px]">H</div>
                    </div>
                    <div className="absolute inset-0 border-4 border-dashed border-[#111]/30 rounded-full" />
                 </motion.div>
                 <div className="absolute w-44 h-44 border-4 border-gray-800 rounded-full opacity-50 z-0 bg-gradient-to-tr from-gray-900 to-transparent" />
              </div>
          </section>

          <footer className="bg-black py-20 px-8 text-center border-t border-white/10">
              <div className="text-white font-black text-4xl italic tracking-tighter mb-4">HONDA<span className="text-red-600">.</span></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                  Join the movement. Follow us for the latest specifications and USA dealer offers.
              </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
