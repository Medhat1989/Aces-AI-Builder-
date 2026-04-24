import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Edit3, Globe, Plus } from 'lucide-react';
import { HONDA_TEMPLATES, LOGO_URL } from '../constants';

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020204] text-white font-sans overflow-x-hidden flex flex-col relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-400/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full h-20 px-8 flex items-center justify-between border-b border-white/5 backdrop-blur-xl z-40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 rounded-full"></div>
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
          <button className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all">Dashboard</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-8 pt-32 flex flex-col gap-8 max-w-7xl mx-auto w-full z-10">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight max-w-4xl">
            Launch a world-class <span className="text-landio-purple">Car dealership site</span> with AcesAds AI’s template engine
          </h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">Ultra-modern dealership frameworks engineered for the US market. Powered by AcesAds AI for instant customization.</p>
        </motion.div>

        {/* Template Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HONDA_TEMPLATES.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group relative bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col ${idx === 1 ? 'ring-2 ring-blue-500/30' : ''}`}
            >
              <div className="h-48 w-full bg-[#111] relative overflow-hidden">
                {idx === 1 && (
                  <div className="absolute top-4 right-4 z-20 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-full">MOST POPULAR</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10"></div>
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
                    idx === 0 ? 'bg-red-600' : 
                    idx === 1 ? 'bg-blue-400 text-black' : 
                    idx === 2 ? 'bg-landio-purple text-white' :
                    'bg-green-500 text-black'
                  }`}>
                    {idx === 0 ? 'Sport Series' : idx === 1 ? 'Legend Series' : idx === 2 ? 'Elite Series' : 'Eco Adventure'}
                  </span>
                </div>

                {/* Rotating Wheel Graphic overlay to simulate "motion" - keeping existing functional requirement */}
                <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="w-10 h-10 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                   >
                     <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <div className="w-1 h-3 bg-white/40 rounded-full" />
                     </div>
                   </motion.div>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="text-xl font-bold">{template.name}</h3>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">{template.description}</p>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => window.open(`/preview/${template.id}`, '_blank')}
                    className="py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold hover:bg-white/10 transition-all uppercase tracking-wider"
                  >
                    View Live
                  </button>
                  <button 
                    onClick={() => navigate(`/editor/${template.id}`)}
                    className="py-2.5 bg-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-500 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Open Editor
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Command Center */}
        <div className="mt-auto mb-8 pt-12">
          <div className="max-w-3xl mx-auto w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-[#0d0d14] border border-white/10 rounded-xl p-3 flex items-center gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <input type="text" placeholder="Ask AcesAds AI to modify branding, swap car colors, or rewrite copy..." className="bg-transparent flex-1 outline-none text-sm text-white/80 placeholder:text-white/20" />
              <button className="px-6 py-2 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">Enhance Template</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Mini-Status */}
      <footer className="px-8 py-5 bg-[#050508] border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/30 tracking-widest uppercase gap-4">
        <div className="flex gap-6">
          <span>Wix Studio Engine Integrated</span>
          <span>Honda Authorized Marketplace</span>
        </div>
        <div className="flex gap-6">
          <span>USA Market Region: Global</span>
          <span className="text-blue-500">v2.4.0-AI-READY</span>
        </div>
      </footer>
    </div>
  );
}
