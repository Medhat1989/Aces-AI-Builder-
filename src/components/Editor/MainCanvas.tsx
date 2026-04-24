import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImagePlus, PaintBucket, RefreshCcw, Upload, X, Trash2, ChevronDown, Check } from 'lucide-react';
import { EditableElement } from '../../types';

interface MainCanvasProps {
  elements: Record<string, EditableElement>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  device: 'desktop' | 'tablet' | 'mobile';
  updateElement: (id: string, updates: Partial<EditableElement>) => void;
  mediaLibrary: string[];
  onAddMedia: (type: 'image' | 'video', content: string) => void;
}

export default function MainCanvas({ 
  elements, 
  selectedId, 
  setSelectedId, 
  device, 
  updateElement,
  mediaLibrary,
  onAddMedia 
}: MainCanvasProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [galleryTarget, setGalleryTarget] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resizeRef = useRef<{ id: string, startX: number, startY: number, startWidth: number, startHeight: number } | null>(null);

  const containerWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const handleResizeStart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const el = elements[id];
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    
    resizeRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height
    };
    
    setIsResizing(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;
      const deltaX = moveEvent.clientX - resizeRef.current.startX;
      const deltaY = moveEvent.clientY - resizeRef.current.startY;
      
      const newWidth = Math.max(50, resizeRef.current.startWidth + deltaX);
      const newHeight = Math.max(50, resizeRef.current.startHeight + deltaY);
      
      updateElement(resizeRef.current.id, {
        style: {
          ...elements[resizeRef.current.id].style,
          width: `${newWidth}px`,
          height: `${newHeight}px`
        }
      });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (galleryTarget) {
        updateElement(galleryTarget, { content });
      } else {
        onAddMedia('image', content);
      }
      setShowGallery(false);
      setGalleryTarget(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const renderElements = (elementIds: string[]) => {
    return elementIds.map(id => {
      const el = elements[id];
      if (!el) return null;

      const isSelected = selectedId === id;

      const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedId(id);
      };

      const commonProps = {
        onClick: handleClick,
        className: `relative cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-blue-500/50 hover:ring-offset-1'}`,
        style: el.style,
      };

      if (el.type === 'container') {
        const isWheelGraphic = id === 'wheel-graphic';
        
        return (
          <div key={id} {...commonProps} style={{ ...el.style, width: '100%', position: 'relative' }}>
            {isSelected && (
              <div className="absolute top-0 right-0 -translate-y-full mb-2 flex items-center gap-2 bg-[#0d0d14] border border-white/10 rounded-lg p-1 shadow-2xl z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const color = prompt('Enter background color (hex, rgb, etc.)', el.style.backgroundColor?.toString() || '');
                    if (color) updateElement(id, { style: { ...el.style, backgroundColor: color } });
                  }}
                  className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white rounded transition-all flex items-center gap-2 text-[10px] uppercase font-bold"
                  title="Change Background"
                >
                  <PaintBucket size={14} /> <span className="hidden sm:inline">Background</span>
                </button>
              </div>
            )}
            {el.children && renderElements(el.children)}
            
            {isWheelGraphic && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {/* ... (Wheel implementation remains same) */}
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

      if (el.type === 'image') {
        return (
          <div key={id} {...commonProps} className="relative group">
            <img 
              src={el.content} 
              alt="User Uploaded" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isSelected && (
              <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 flex items-center gap-1 bg-[#0d0d14] border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 whitespace-nowrap overflow-visible">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryTarget(id);
                      setShowGallery(true);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <RefreshCcw size={14} /> Replace
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const color = prompt('Apply overlay color?', '');
                      if (color) updateElement(id, { style: { ...el.style, backgroundColor: color, backgroundBlendMode: 'overlay' } });
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg text-[10px] font-bold uppercase transition-all"
                  >
                    <PaintBucket size={14} /> BG
                  </button>
                </div>
                {/* Resize Handle */}
                <div 
                  onMouseDown={(e) => handleResizeStart(e, id)}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 border-2 border-white rounded-full translate-x-1/2 translate-y-1/2 cursor-nwse-resize z-50 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full opacity-50" />
                </div>
              </>
            )}
          </div>
        );
      }

      if (el.type === 'video') {
        return (
          <video 
            key={id}
            {...commonProps} 
            src={el.content} 
            controls 
            className={`${commonProps.className} w-full h-auto rounded-xl`}
          />
        );
      }

      if (el.type === 'text') {
        return (
          <div 
            key={id}
            {...commonProps} 
            contentEditable={isSelected}
            suppressContentEditableWarning
            onBlur={(e) => updateElement(id, { content: e.currentTarget.textContent || '' })}
            className={`${commonProps.className} font-sans`}
          >
            {el.content}
          </div>
        );
      }

      if (el.type === 'button') {
        return (
          <button key={id} {...commonProps}>
            {el.content}
          </button>
        );
      }

      return null;
    });
  };

  // Find root elements
  const allChildren = Object.values(elements).flatMap(e => e.children || []);
  const rootIds = Object.keys(elements).filter(id => !allChildren.includes(id));

  return (
    <div 
      className="bg-white text-black shadow-2xl transition-all duration-500 overflow-x-hidden min-h-screen" 
      style={{ width: containerWidths[device] }}
      onClick={() => setSelectedId(null)}
    >
      {renderElements(rootIds)}

      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-[#020204]/80 backdrop-blur-xl" onClick={() => setShowGallery(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-2xl bg-[#0d0d14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tighter">Media Assets</h3>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">Select or Upload a new file</p>
                </div>
                <button onClick={() => setShowGallery(false)} className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 grid grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-3 text-white/20 hover:text-blue-400 hover:border-blue-500/50 transition-all group"
                >
                  <div className="p-4 bg-white/[0.02] rounded-full group-hover:bg-blue-500/10 transition-colors">
                    <Upload size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Upload New</span>
                </button>

                {mediaLibrary.map((url, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      if (galleryTarget) updateElement(galleryTarget, { content: url });
                      setShowGallery(false);
                      setGalleryTarget(null);
                    }}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all shadow-lg"
                  >
                    <img src={url} alt="Gallery item" className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <Check size={24} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white/[0.02] border-t border-white/5 flex justify-end">
                  <p className="text-[9px] text-white/10 uppercase font-black tracking-[0.3em]">AcesAds Asset Server v2.0</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload}
        className="hidden" 
        accept="image/*" 
      />
    </div>
  );
}
