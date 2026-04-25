import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, Monitor, Tablet, Smartphone, ExternalLink, 
  MapPin, HelpCircle, Star, Heart, Smile, Settings, Info, 
  CheckCircle, AlertTriangle, Calendar, Camera, Bell, User, 
  Mail, Link as LinkIcon, ShoppingBag, CreditCard, Laptop, 
  Play, Share2, Github, Twitter, Linkedin, Facebook, Instagram, 
  Youtube, Cloud, Moon, Sun, Zap, Flame, Droplets, Wind, 
  Trophy, Target, Rocket, Shield, Lock, Unlock, Key, Globe, 
  Compass, Navigation, Flag, Home, Briefcase, GraduationCap, 
  Hammer, Palette, Music, Tv, Watch, Headphones, Mic, 
  Volume2, Battery, Wifi, Database, Cpu, Layers, Layout, 
  Columns, Rows, Grid, Search, Circle, Square, Triangle, 
  Ghost, Box, Navigation2, ArrowUp, ArrowDown, MoveVertical, 
  X, Plus, Phone, MessageSquare, AtSign, DollarSign, Tag, 
  HardDrive, Car, Fuel, Activity, Gauge, Key as KeyIcon, 
  Wrench, Cog, Truck, Dribbble, Slack, Twitch, Music2,
  Heading1, Heading2
} from 'lucide-react';

const ICON_COMPONENTS: Record<string, any> = {
  Star, Heart, Smile, Settings, Info, CheckCircle, AlertTriangle, Calendar, 
  Camera, Bell, User, Mail, LinkIcon, ShoppingBag, CreditCard,
  MapPin, Laptop, Play, Share2, HelpCircle, Github, Twitter, Linkedin, 
  Facebook, Instagram, Youtube, Cloud, Moon, Sun, Zap, Flame, Droplets, 
  Wind, Trophy, Target, Rocket, Shield, Lock, Unlock, Key, Globe, 
  Compass, Navigation, Flag, Home, Briefcase, GraduationCap, Hammer, 
  Palette, Music, Tv, Smartphone, Watch, Headphones, Mic, Volume2, 
  Battery, Wifi, Database, Cpu, Layers, Layout, Columns, Rows, Grid,
  Search, Circle, Square, Triangle, Ghost, Box, Navigation2, 
  ArrowUp, ArrowDown, MoveVertical, X, Plus, Phone, MessageSquare, 
  AtSign, DollarSign, Tag, HardDrive, Car, Fuel, Activity, Gauge, 
  KeyIcon, Wrench, Cog, Truck, Dribbble, Slack, Twitch, Music2,
  Heading1, Heading2
};
import { HONDA_TEMPLATES } from '../constants';
import { EditableElement } from '../types';
import { getInitialElements } from '../utils/templateUtils';
import Footer from '../components/Footer';

export default function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLiveMode = searchParams.get('mode') === 'live';
  
  const template = HONDA_TEMPLATES.find(t => t.id === id) || HONDA_TEMPLATES[0];
  const [elements, setElements] = useState<Record<string, EditableElement>>({});
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (!id) return;
    try {
      const saved = localStorage.getItem(`preview_data_${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          setElements(parsed);
          return;
        }
      }
      setElements(getInitialElements(id));
    } catch (e) {
      console.error('Error loading preview data:', e);
      setElements(getInitialElements(id));
    }
  }, [id]);

  const containerWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const renderElements = (elementIds: string[]) => {
    if (!elementIds || !elements) return null;
    return elementIds.map(elId => {
      const el = elements[elId];
      if (!el) return null;

      const style = { ...el.style };
      const animationType = el.animation?.type || 'none';
      const animProps = animationType !== 'none' ? {
        initial: animationType === 'fade' ? { opacity: 0 } :
                 animationType === 'slide-up' ? { opacity: 0, y: 20 } :
                 animationType === 'slide-down' ? { opacity: 0, y: -20 } :
                 animationType === 'zoom' ? { opacity: 0, scale: 0.9 } : {},
        whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
        viewport: { once: true },
        transition: { 
          delay: el.animation?.delay || 0, 
          duration: el.animation?.duration || 0.6,
          ease: 'easeOut'
        }
      } : {};
      
      if (el.type === 'container') {
        const isWheelGraphic = elId === 'wheel-graphic';
        return (
          <motion.div key={elId} style={{ width: '100%', position: 'relative', ...style }} {...animProps}>
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
          </motion.div>
        );
      }

      if (el.type === 'image') {
        return (
          <motion.div key={elId} style={style} {...animProps}>
            <img 
              src={el.content} 
              alt="" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        );
      }

      if (el.type === 'video') {
        return (
          <motion.video 
            key={elId} 
            src={el.content} 
            controls 
            style={style}
            {...animProps}
          />
        );
      }

      if (el.type === 'text') {
        return (
          <motion.div key={elId} style={style} {...animProps}>
            {el.content}
          </motion.div>
        );
      }

      if (el.type === 'button') {
        return (
          <motion.button key={elId} style={style} {...animProps}>
            {el.content}
          </motion.button>
        );
      }

      if (el.type === 'icon') {
        const Icon = ICON_COMPONENTS[el.content] || HelpCircle;
        return (
          <motion.div key={elId} style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...animProps}>
            <Icon size="100%" />
          </motion.div>
        );
      }

      if (el.type === 'code') {
        return (
          <motion.div 
            key={elId} 
            style={style}
            dangerouslySetInnerHTML={{ __html: el.content }}
            {...animProps}
          />
        );
      }

      if (el.type === 'map') {
        return (
          <motion.div key={elId} style={style} {...animProps}>
            <iframe 
              title="Map"
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
          <motion.div key={elId} style={style} {...animProps} />
        );
      }

      return null;
    });
  };

  const allChildren = (Object.values(elements) as EditableElement[]).flatMap(e => e.children || []);
  const rootIds = Object.keys(elements).filter(id => !allChildren.includes(id));

  return (
    <div className={`min-h-screen font-sans overflow-hidden ${isLiveMode ? 'bg-white' : 'bg-[#020204]'}`}>
      {/* Floating Control Panel */}
      {!isLiveMode && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-1.5 bg-[#0B0C11]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            <button 
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded-lg transition-all ${device === 'desktop' ? 'bg-white text-black' : 'text-white/20 hover:text-white/40'}`}
              title="Desktop View"
            >
              <Monitor size={14} />
            </button>
            <button 
              onClick={() => setDevice('tablet')}
              className={`p-2 rounded-lg transition-all ${device === 'tablet' ? 'bg-white text-black' : 'text-white/20 hover:text-white/40'}`}
              title="Tablet View"
            >
              <Tablet size={14} />
            </button>
            <button 
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded-lg transition-all ${device === 'mobile' ? 'bg-white text-black' : 'text-white/20 hover:text-white/40'}`}
              title="Mobile View"
            >
              <Smartphone size={14} />
            </button>
          </div>
          
          <div className="h-4 w-px bg-white/10 mx-1" />
          
          <button 
            onClick={() => navigate(`/editor/${id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 group border border-blue-400/20"
          >
            RETURN TO EDITOR <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

      <div className={`h-screen w-full flex flex-col items-center relative overflow-auto scrollbar-hide ${isLiveMode ? 'bg-white' : 'bg-[#020204]'}`}>
        {!isLiveMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        )}

        <motion.div 
          initial={isLiveMode ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ 
            width: isLiveMode ? '100%' : containerWidths[device],
            minHeight: '100%',
            isolation: 'isolate'
          }}
          className={`${isLiveMode ? '' : 'bg-white text-black shadow-2xl my-20 rounded-lg'} transition-all duration-500 overflow-x-hidden relative z-10`}
        >
          {renderElements(rootIds)}
          <Footer />
        </motion.div>
      </div>
    </div>
  );
}
