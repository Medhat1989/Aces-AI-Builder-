import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ImagePlus, PaintBucket, RefreshCcw, Upload, X, Trash2, 
  ChevronDown, Check, GripVertical, Type, Star, Heart, Smile, 
  Settings, Info, CheckCircle, AlertTriangle, Calendar, Camera, 
  Bell, User, Mail, Link as LinkIcon, ShoppingBag, CreditCard, 
  MapPin, Laptop, Play, Share2, HelpCircle, Github, Twitter, 
  Linkedin, Facebook, Instagram, Youtube, Cloud, Moon, Sun, 
  Zap, Flame, Droplets, Wind, Trophy, Target, Rocket, Shield, 
  Lock, Unlock, Key, Globe, Compass, Navigation, Flag, Home, 
  Briefcase, GraduationCap, Hammer, Palette, Music, Tv, 
  Smartphone, Watch, Headphones, Mic, Volume2, Battery, Wifi, 
  Database, Cpu, Layers, Layout, Columns, Rows, Grid 
} from 'lucide-react';

const ICON_COMPONENTS: Record<string, any> = {
  Star, Heart, Smile, Settings, Info, CheckCircle, AlertTriangle, Calendar, 
  Camera, Bell, User, Mail, LinkIcon, ShoppingBag, CreditCard,
  MapPin, Laptop, Play, Share2, HelpCircle, Github, Twitter, Linkedin, 
  Facebook, Instagram, Youtube, Cloud, Moon, Sun, Zap, Flame, Droplets, 
  Wind, Trophy, Target, Rocket, Shield, Lock, Unlock, Key, Globe, 
  Compass, Navigation, Flag, Home, Briefcase, GraduationCap, Hammer, 
  Palette, Music, Tv, Smartphone, Watch, Headphones, Mic, Volume2, 
  Battery, Wifi, Database, Cpu, Layers, Layout, Columns, Rows, Grid
};

const FONTS = [
  { name: 'Inter', family: 'Inter, sans-serif' },
  { name: 'Space Grotesk', family: 'Space Grotesk, sans-serif' },
  { name: 'Outfit', family: 'Outfit, sans-serif' },
  { name: 'Playfair Display', family: 'Playfair Display, serif' },
  { name: 'JetBrains Mono', family: 'JetBrains Mono, monospace' },
  { name: 'Oswald', family: 'Oswald, sans-serif' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif' },
];
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditableElement } from '../../types';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  key?: string | number;
}

function SortableItem({ id, children, isDisabled }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id, disabled: isDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? 'opacity-50' : ''}>
      {children}
      {!isDisabled && (
        <div 
          {...attributes} 
          {...listeners}
          className="absolute top-2 left-2 p-1 bg-black/50 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-[60]"
        >
          <GripVertical size={12} />
        </div>
      )}
    </div>
  );
}

interface MainCanvasProps {
  elements: Record<string, EditableElement>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  device: 'desktop' | 'tablet' | 'mobile';
  updateElement: (id: string, updates: Partial<EditableElement>) => void;
  deleteElement: (id: string) => void;
  mediaLibrary: string[];
  onAddMedia: (type: 'image' | 'video', content: string) => void;
}

export default function MainCanvas({ 
  elements, 
  selectedId, 
  setSelectedId, 
  device, 
  updateElement,
  deleteElement,
  mediaLibrary,
  onAddMedia 
}: MainCanvasProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [galleryTarget, setGalleryTarget] = useState<string | null>(null);
  const [activeFontPicker, setActiveFontPicker] = useState<string | null>(null);
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent, containerId: string) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const container = elements[containerId];
      if (!container || !container.children) return;

      const oldIndex = container.children.indexOf(active.id.toString());
      const newIndex = container.children.indexOf(over.id.toString());
      
      const newChildren = arrayMove(container.children, oldIndex, newIndex);
      updateElement(containerId, { children: newChildren });
    }
  };

  const renderElements = (elementIds: string[]) => {
    return elementIds.map(id => {
      const el = elements[id];
      if (!el) return null;

      const isSelected = selectedId === id;
      const animProps = el.animation && el.animation.type !== 'none' ? {
        initial: (el.animation.type as string) === 'fade-in' ? { opacity: 0 } :
                 (el.animation.type as string) === 'slide-up' ? { opacity: 0, y: 20 } :
                 (el.animation.type as string) === 'slide-left' ? { opacity: 0, x: -20 } :
                 (el.animation.type as string) === 'slide-right' ? { opacity: 0, x: 20 } :
                 (el.animation.type as string) === 'zoom-in' ? { opacity: 0, scale: 0.9 } : {},
        whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
        viewport: { once: true },
        transition: { 
          delay: el.animation.delay || 0, 
          duration: el.animation.duration || 0.6,
          ease: 'easeOut'
        }
      } : {};

      const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedId(id);
      };

      const commonProps = {
        onClick: handleClick,
        className: `relative cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-blue-500/50 hover:ring-offset-1'}`,
        style: el.style,
        ...animProps
      };

      if (el.type === 'container') {
        const isWheelGraphic = id === 'wheel-graphic';
        
        // Ensure certain styles are consistent but allow overrides
        const containerStyle: React.CSSProperties = {
          width: '100%',
          position: 'relative',
          ...el.style
        };

        const childrenList = el.children || [];

        return (
          <motion.div key={id} {...commonProps} style={containerStyle} className={`${commonProps.className} group`}>
            {isSelected && (
              <div className="absolute top-0 right-0 -translate-y-full mb-2 flex items-center gap-2 bg-[#0d0d14] border border-white/10 rounded-lg p-1 shadow-2xl z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFontPicker(activeFontPicker === id ? null : id);
                  }}
                  className={`p-1.5 hover:bg-white/5 rounded transition-all flex items-center gap-2 text-[10px] uppercase font-bold ${activeFontPicker === id ? 'text-blue-400 bg-blue-500/10' : 'text-white/60 hover:text-white'}`}
                  title="Typography"
                >
                  <Type size={14} /> <span className="hidden sm:inline">Text</span>
                </button>
                <div className="w-px h-4 bg-white/10" />
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
                
                {activeFontPicker === id && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#0d0d14] border border-white/10 rounded-xl p-2 shadow-2xl z-[120] w-48 max-h-64 overflow-y-auto custom-scrollbar">
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest px-2 py-1 mb-2 border-b border-white/5">Select Font</div>
                    {FONTS.map(font => (
                      <button
                        key={font.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateElement(id, { style: { ...el.style, fontFamily: font.family } });
                          setActiveFontPicker(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors flex items-center justify-between group ${el.style.fontFamily === font.family ? 'text-blue-400 bg-blue-500/5' : 'text-white/60'}`}
                        style={{ fontFamily: font.family }}
                      >
                        <span>{font.name}</span>
                        {el.style.fontFamily === font.family && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, id)}
            >
              <SortableContext 
                items={childrenList}
                strategy={verticalListSortingStrategy}
              >
                {childrenList.map(childId => (
                  <SortableItem key={childId} id={childId} isDisabled={!isSelected}>
                    {renderElements([childId])}
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            
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
          </motion.div>
        );
      }

      if (el.type === 'image') {
        return (
          <motion.div key={id} {...commonProps} className="relative group">
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
          </motion.div>
        );
      }

      if (el.type === 'video') {
        return (
          <motion.video 
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
          <motion.div key={id} className="relative group">
            <div 
              {...commonProps} 
              contentEditable={isSelected}
              suppressContentEditableWarning
              onBlur={(e) => updateElement(id, { content: e.currentTarget.textContent || '' })}
              className={`${commonProps.className} outline-none`}
            >
              {el.content}
            </div>
            {isSelected && (
              <div className="absolute top-0 right-0 -translate-y-full mb-2 flex items-center gap-2 bg-[#0d0d14] border border-white/10 rounded-lg p-1 shadow-2xl z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFontPicker(activeFontPicker === id ? null : id);
                  }}
                  className={`p-1.5 hover:bg-white/5 rounded transition-all flex items-center gap-2 text-[10px] uppercase font-bold ${activeFontPicker === id ? 'text-blue-400 bg-blue-500/10' : 'text-white/60 hover:text-white'}`}
                  title="Typography"
                >
                  <Type size={14} /> <span className="hidden sm:inline">Font</span>
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const color = prompt('Enter text color', el.style.color?.toString() || '');
                    if (color) updateElement(id, { style: { ...el.style, color } });
                  }}
                  className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white rounded transition-all flex items-center gap-2 text-[10px] uppercase font-bold"
                  title="Text Color"
                >
                  <PaintBucket size={14} /> <span className="hidden sm:inline">Color</span>
                </button>

                {activeFontPicker === id && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#0d0d14] border border-white/10 rounded-xl p-2 shadow-2xl z-[120] w-48 max-h-64 overflow-y-auto custom-scrollbar">
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest px-2 py-1 mb-2 border-b border-white/5">Select Font</div>
                    {FONTS.map(font => (
                      <button
                        key={font.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateElement(id, { style: { ...el.style, fontFamily: font.family } });
                          setActiveFontPicker(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors flex items-center justify-between group ${el.style.fontFamily === font.family ? 'text-blue-400 bg-blue-500/5' : 'text-white/60'}`}
                        style={{ fontFamily: font.family }}
                      >
                        <span>{font.name}</span>
                        {el.style.fontFamily === font.family && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      }

      if (el.type === 'button') {
        return (
          <motion.div key={id} className="relative group">
            <button {...commonProps}>
              {el.content}
            </button>
            {isSelected && (
              <div className="absolute top-0 right-0 -translate-y-full mb-2 flex items-center gap-2 bg-[#0d0d14] border border-white/10 rounded-lg p-1 shadow-2xl z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFontPicker(activeFontPicker === id ? null : id);
                  }}
                  className={`p-1.5 hover:bg-white/5 rounded transition-all flex items-center gap-2 text-[10px] uppercase font-bold ${activeFontPicker === id ? 'text-blue-400 bg-blue-500/10' : 'text-white/60 hover:text-white'}`}
                  title="Typography"
                >
                  <Type size={14} /> <span className="hidden sm:inline">Font</span>
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const color = prompt('Enter background color', el.style.backgroundColor?.toString() || '');
                    if (color) updateElement(id, { style: { ...el.style, backgroundColor: color } });
                  }}
                  className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white rounded transition-all flex items-center gap-2 text-[10px] uppercase font-bold"
                  title="Background Color"
                >
                  <PaintBucket size={14} /> <span className="hidden sm:inline">BG</span>
                </button>

                {activeFontPicker === id && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#0d0d14] border border-white/10 rounded-xl p-2 shadow-2xl z-[120] w-48 max-h-64 overflow-y-auto custom-scrollbar">
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest px-2 py-1 mb-2 border-b border-white/5">Select Font</div>
                    {FONTS.map(font => (
                      <button
                        key={font.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateElement(id, { style: { ...el.style, fontFamily: font.family } });
                          setActiveFontPicker(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors flex items-center justify-between group ${el.style.fontFamily === font.family ? 'text-blue-400 bg-blue-500/5' : 'text-white/60'}`}
                        style={{ fontFamily: font.family }}
                      >
                        <span>{font.name}</span>
                        {el.style.fontFamily === font.family && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      }

      if (el.type === 'icon') {
        const Icon = ICON_COMPONENTS[el.content] || HelpCircle;
        return (
          <motion.div key={id} {...commonProps} style={{ ...el.style, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={`${commonProps.className} group/icon`}>
            {isSelected && (
              <div className="absolute top-0 right-0 -translate-y-full mb-2 flex items-center gap-2 bg-[#0d0d14] border border-white/10 rounded-lg p-1 shadow-2xl z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const color = prompt('Enter icon color', el.style.color?.toString() || '');
                    if (color) updateElement(id, { style: { ...el.style, color } });
                  }}
                  className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white rounded transition-all flex items-center gap-2 text-[10px] uppercase font-bold"
                  title="Icon Color"
                >
                  <PaintBucket size={14} /> <span className="hidden sm:inline">Color</span>
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(id);
                  }}
                  className="p-1.5 hover:bg-white/5 text-red-500/60 hover:text-red-500 rounded transition-all"
                  title="Delete Icon"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
            <Icon size="100%" />
          </motion.div>
        );
      }

      if (el.type === 'code') {
        return (
          <motion.div 
            key={id} 
            {...commonProps} 
            dangerouslySetInnerHTML={{ __html: el.content }}
            className={`${commonProps.className} overflow-hidden`}
          />
        );
      }

      if (el.type === 'map') {
        return (
          <motion.div key={id} {...commonProps} className={`${commonProps.className} bg-aces-card overflow-hidden group`}>
            <div className="absolute inset-0 bg-blue-500/5 flex flex-col items-center justify-center gap-2 pointer-events-none">
              <MapPin size={32} className="text-aces-blue" />
              <div className="text-[10px] text-white/20 uppercase font-black tracking-widest font-display">Map Component</div>
            </div>
            <iframe 
              title="Google Map"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }}
              src={el.content || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus'}
              allowFullScreen 
            />
          </motion.div>
        );
      }

      if (el.type === 'shape') {
        return (
          <motion.div key={id} {...commonProps} />
        );
      }

      return null;
    });
  };

  // Find root elements
  const allChildren = (Object.values(elements) as EditableElement[]).flatMap(e => e.children || []);
  const rootIds = Object.keys(elements).filter(id => !allChildren.includes(id));

  return (
    <div 
      className="bg-white text-black shadow-2xl transition-all duration-500 min-h-screen relative" 
      style={{ 
        width: containerWidths[device],
        transform: 'translate3d(0,0,0)', // Creates containing block for fixed elements
        isolation: 'isolate' // Prevents z-index leakage
      }}
      onClick={() => setSelectedId(null)}
    >
      <div className="w-full relative overflow-x-hidden">
        {renderElements(rootIds)}
      </div>

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
