import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Play, Edit3, Globe, Plus, ChevronRight, ArrowUpRight, Zap } from 'lucide-react';
import { HONDA_TEMPLATES, LOGO_URL } from '../constants';

import { BentoFeatures } from '../components/BentoFeatures';
import { RoleSuperpowers } from '../components/RoleSuperpowers';

export default function Gallery() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden flex flex-col relative" style={{ perspective: "2000px" }}>
      {/* Background Ambient Glows / Light Waves */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-white bg-[center_top] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        
        {/* Futuristic Pulsing Radial Gradient */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.1)_0%,_transparent_75%)]"
        />

        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [0.8, 1.1, 0.8],
            x: ['-10%', '10%', '-10%']
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[100%] h-[60%] bg-blue-600/[0.05] rounded-full blur-[150px]"
        />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full h-16 px-8 flex items-center justify-between border-b border-white/10 backdrop-blur-md z-40 bg-black/20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative">
            <img src={LOGO_URL} alt="AcesAds" className="h-10 relative z-10" referrerPolicy="no-referrer" />
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#" className="text-white border-b-2 border-blue-500 pb-1">Templates</a>
          <a href="#" className="hover:text-white transition-colors">Marketplace</a>
          <a href="#" className="hover:text-white transition-colors">Prices</a>
          <a href="#" className="hover:text-white transition-colors">Integrations</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold flex items-center gap-2 hidden sm:flex">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Editor Beta
          </div>
          <button className="px-5 py-2 metallic-radial-gradient text-sm font-bold rounded-full transition-all">Get Started</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-32 flex flex-col gap-12 max-w-7xl mx-auto w-full z-10">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-4 py-8 px-8"
        >
          <div className="relative">
            {/* Soft Ambient Light Glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-4xl relative z-10">
              <span className="silver-gradient-text pb-2">Launch a world-class Car dealership site</span>
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white/70 max-w-2xl">
            with AcesAds AI’s template engine
          </h2>
          <p className="text-white/40 text-base max-w-xl leading-relaxed mt-2">Ultra-modern dealership frameworks engineered for the US market. Powered by AcesAds AI for instant customization.</p>
        </motion.div>

        {/* 3D Template Showcase Section (Orbiting Galaxy Effect) */}
        <section className="relative h-[750px] w-full flex items-center justify-center mt-12 mb-24 perspective-[2000px] overflow-visible">
          {/* Central Galaxy Glow (replacing the ball) */}
          <div className="absolute w-[400px] h-[400px] rounded-full z-10 pointer-events-none">
            <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f630_0%,_transparent_70%)] rounded-full"></div>
            {/* Swirling Galaxy Particles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/5 border-dashed rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 border border-blue-500/10 border-dashed rounded-full"
            />
          </div>

          {/* Orbiting Deck */}
          <div 
            className={`relative w-full h-full flex items-center justify-center transform-style-3d z-20 animate-orbit ${isPaused ? 'pause-animation' : ''}`}
            style={{ 
              animationDuration: '60s' // Slower, more majestic galaxy feel
            }}
          >
            {HONDA_TEMPLATES.map((template, idx) => {
              const total = HONDA_TEMPLATES.length;
              const angle = (idx / total) * 360;
              const radius = 550; // Larger orbit for 6 templates

              return (
                <div 
                  key={template.id}
                  className="absolute transform-style-3d origin-center"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <motion.div
                    className="w-[280px] md:w-[320px] group transition-all duration-700"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    whileHover={{ scale: 1.1, z: 100 }}
                  >
                    <div className="bg-[#08080a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-blue-500/20 hover:border-blue-500/40 transition-all duration-500">
                      <div className="h-44 w-full bg-[#111] relative overflow-hidden">
                        <img 
                          src={template.thumbnail} 
                          alt={template.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10"></div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold tracking-tight">{template.name}</h3>
                          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed max-h-8 overflow-hidden">{template.description}</p>
                        
                        <div className="pt-2 grid grid-cols-2 gap-2">
                           <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/preview/${template.id}`, '_blank');
                            }}
                            className="py-2 bg-white/[0.03] border border-white/5 rounded-lg text-[10px] font-medium hover:bg-white/[0.08] transition-all flex items-center justify-center gap-1.5"
                          >
                            <Globe className="w-3 h-3 opacity-50" />
                            Preview
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/editor/${template.id}`);
                            }}
                            className="py-2 bg-white text-black rounded-lg text-[10px] font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Edit3 className="w-3 h-3" />
                            Use This
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        <BentoFeatures />
        <RoleSuperpowers />
      </main>
    </div>
  );
}

