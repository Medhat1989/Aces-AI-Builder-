import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';
import { HONDA_TEMPLATES } from '../constants';
import { EditableElement } from '../types';
import { getInitialElements } from '../utils/templateUtils';

export default function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = HONDA_TEMPLATES.find(t => t.id === id) || HONDA_TEMPLATES[0];
  const [elements, setElements] = useState<Record<string, EditableElement>>({});
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const saved = localStorage.getItem(`preview_data_${id}`);
    if (saved) {
      setElements(JSON.parse(saved));
    } else {
      setElements(getInitialElements(id || ''));
    }
  }, [id]);

  const containerWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const renderElements = (elementIds: string[]) => {
    return elementIds.map(id => {
      const el = elements[id];
      if (!el) return null;

      const style = { ...el.style };
      
      if (el.type === 'container') {
        const isWheelGraphic = id === 'wheel-graphic';
        return (
          <div key={id} style={{ ...style, width: '100%', position: 'relative' }}>
            {el.children && renderElements(el.children)}
            {isWheelGraphic && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-64 h-64 flex items-center justify-center scale-75 md:scale-100">
                  <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 border-[8px] border-[#222] rounded-full relative shadow-2xl flex items-center justify-center"
                  >
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="absolute w-1.5 h-full bg-[#111] border-x border-white/5" style={{ transform: `rotate(${i * 72}deg)` }}>
                        <div className="h-8 w-full bg-gradient-to-b from-[#333] to-[#111] rounded-full mt-2" />
                      </div>
                    ))}
                    <div className="w-12 h-12 bg-[#111] rounded-full border-2 border-[#333] flex items-center justify-center z-10">
                      <div className="text-white font-bold text-[8px]">H</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        );
      }

      if (el.type === 'image' || el.type === 'video') {
        return (
          <div key={id} style={style}>
            {el.type === 'image' ? (
              <img src={el.content} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <video src={el.content} controls className="w-full h-auto rounded-xl" />
            )}
          </div>
        );
      }

      if (el.type === 'text') {
        return (
          <div key={id} style={style} className="font-sans">
            {el.content}
          </div>
        );
      }

      if (el.type === 'button') {
        return (
          <button key={id} style={style}>
            {el.content}
          </button>
        );
      }

      return null;
    });
  };

  const allChildren = Object.values(elements).flatMap(e => e.children || []);
  const rootIds = Object.keys(elements).filter(id => !allChildren.includes(id));

  return (
    <div className="min-h-screen bg-[#020204] flex flex-col font-sans">
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

      <div className="flex-1 bg-[#0d0d14] overflow-auto flex flex-col items-center p-4 md:p-8 scrollbar-hide relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ width: containerWidths[device] }}
          className="bg-white text-black shadow-2xl transition-all duration-500 min-h-screen overflow-x-hidden relative z-10"
        >
          {renderElements(rootIds)}
        </motion.div>
      </div>
    </div>
  );
}
