import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Type, 
  Video, 
  Code, 
  Map as MapIcon, 
  Square, 
  Ghost, 
  Triangle,
  ChevronLeft,
  Search,
  Upload,
  Plus,
  Circle,
  RectangleHorizontal,
  Box,
  Heading1,
  Heading2,
  Type as Paragraph,
  Play,
  Share2,
  Star,
  Heart,
  Smile,
  Settings,
  Info,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Camera,
  Bell,
  User,
  Mail,
  Link as LinkIcon,
  ShoppingBag,
  CreditCard,
  MapPin,
  Laptop,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Cloud,
  Moon,
  Sun,
  Zap,
  Flame,
  Droplets,
  Wind,
  Trophy,
  Target,
  Rocket,
  Shield,
  Lock,
  Unlock,
  Key,
  Globe,
  Compass,
  Navigation,
  Flag,
  Home,
  Briefcase,
  GraduationCap,
  Hammer,
  Palette,
  Music,
  Tv,
  Smartphone,
  Watch,
  Headphones,
  Mic,
  Volume2,
  Battery,
  Wifi,
  Database,
  Cpu,
  Layers,
  Layout,
  Columns,
  Rows,
  Grid,
  Map,
  Navigation2,
  Phone,
  MessageSquare,
  AtSign,
  Briefcase as Business,
  CreditCard as Payment,
  DollarSign,
  Tag,
  Zap as Power,
  Truck,
  Car,
  Fuel,
  Activity,
  Gauge,
  Key as KeyIcon,
  Wrench,
  Cog,
  Dribbble,
  Slack,
  Twitch,
  Music2,
  HardDrive,
  ArrowUp,
  ArrowDown,
  MoveVertical,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditableElement } from '../../types';

interface AddPanelProps {
  onAdd: (type: EditableElement['type'], content: string, style?: React.CSSProperties) => void;
  isOpen: boolean;
  onClose: () => void;
  mediaLibrary: string[];
}

type View = 'main' | 'image' | 'text' | 'media' | 'code' | 'map' | 'placeholder' | 'icons' | 'shapes';

const ICON_COMPONENTS: Record<string, any> = {
  // Navigation & UI
  Star, Heart, Smile, Settings, Info, CheckCircle, AlertTriangle, Calendar, 
  Bell, User, Mail, LinkIcon, Search, Home, Layout, Columns, Rows, Grid,
  Circle, Square, Triangle, Ghost, Box, Navigation2, Compass, Layers, Globe,
  ArrowUp, ArrowDown, MoveVertical, X, Plus, ChevronLeft,

  // Communication
  Phone, MessageSquare, AtSign, Share2,

  // Business & Commerce
  ShoppingBag, CreditCard, DollarSign, Tag, Briefcase, Award: Trophy, Target,
  
  // Tech & Devices
  Laptop, Smartphone, Watch, Headphones, Mic, Volume2, Battery, Wifi, Database, Cpu, HardDrive, TV: Tv,
  
  // Automotive
  Car, Fuel, Activity, Gauge, Key: KeyIcon, Wrench, Cog, Truck, MapPin, 

  // Social & Brands
  Github, Twitter, Linkedin, Facebook, Instagram, Youtube, Dribbble, Slack, Twitch,
  
  // Environment
  Cloud, Moon, Sun, Zap, Flame, Droplets, Wind,

  // Creative
  Palette, Music, Music2, Camera, Play, Rocket 
};

const ICON_NAMES = Object.keys(ICON_COMPONENTS);

export default function AddPanel({ onAdd, isOpen, onClose, mediaLibrary }: AddPanelProps) {
  const [view, setView] = useState<View>('main');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'image', icon: ImageIcon, label: 'Image', description: 'Photos & illustrations' },
    { id: 'text', icon: Type, label: 'Text', description: 'Headings & paragraphs' },
    { id: 'media', icon: Video, label: 'Media', description: 'Videos & social embeds' },
    { id: 'code', icon: Code, label: 'Embedded Code', description: 'Custom HTML & widgets' },
    { id: 'map', icon: MapIcon, label: 'Map', description: 'Dynamic locations' },
    { id: 'placeholder', icon: Square, label: 'Placeholder', description: 'Layout wireframes' },
    { id: 'icons', icon: Ghost, label: 'Icons', description: 'Vector graphics' },
    { id: 'shapes', icon: Triangle, label: 'Shapes', description: 'Geometric elements' },
  ];

  const handleCategoryClick = (id: string) => {
    setView(id as View);
  };

  const back = () => setView('main');

  const filteredIcons = ICON_NAMES.filter(name => name.toLowerCase().includes(search.toLowerCase()));

  const renderContent = () => {
    switch (view) {
      case 'main':
        return (
          <div className="grid grid-cols-1 gap-2 p-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left border border-transparent hover:border-white/10 group"
              >
                <div className="w-12 h-12 rounded-xl bg-landio-purple/10 flex items-center justify-center text-landio-purple group-hover:scale-110 transition-transform">
                  <cat.icon size={22} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-white/90">{cat.label}</div>
                  <div className="text-[10px] text-white/30 font-medium">{cat.description}</div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'image':
        return (
          <div className="flex flex-col gap-6 p-4 overflow-y-auto max-h-screen custom-scrollbar">
            <div className="bg-aces-card p-6 rounded-3xl border border-white/5 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-landio-purple/10 flex items-center justify-center text-landio-purple">
                <Upload size={20} />
              </div>
              <div className="text-xs font-black uppercase text-white/80">Upload local file</div>
              <p className="text-[9px] text-white/20">SVG, PNG, JPG supported</p>
              <button onClick={() => {}} className="mt-2 w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Browse</button>
            </div>

            <div className="space-y-4">
              <div className="text-[9px] font-black uppercase text-white/20 tracking-[0.2em] px-2 font-display">Recent Media</div>
              <div className="grid grid-cols-2 gap-2">
                {mediaLibrary.length > 0 ? mediaLibrary.map((url, i) => (
                  <button 
                    key={i} 
                    onClick={() => { onAdd('image', url); onClose(); }}
                    className="aspect-square rounded-xl overflow-hidden border border-white/5 hover:border-landio-purple/50 transition-all"
                  >
                    <img src={url} className="w-full h-full object-cover" />
                  </button>
                )) : (
                  <div className="col-span-2 py-8 text-center text-white/10 text-[10px] uppercase font-black tracking-widest bg-white/[0.02] rounded-xl border border-dashed border-white/5 italic">Library Empty</div>
                )}
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="flex flex-col gap-4 p-4">
            <button 
              onClick={() => { onAdd('text', 'New Heading', { fontSize: '48px', fontWeight: 'bold' }); onClose(); }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left bg-aces-card/50 border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40"><Heading1 size={20} /></div>
              <div className="text-xs font-black uppercase text-white/80 tracking-widest">Heading 1</div>
            </button>
            <button 
              onClick={() => { onAdd('text', 'Subheading text here', { fontSize: '24px', fontWeight: 'medium' }); onClose(); }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left bg-aces-card/50 border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40"><Heading2 size={20} /></div>
              <div className="text-xs font-black uppercase text-white/80 tracking-widest">Heading 2</div>
            </button>
            <button 
              onClick={() => { onAdd('text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', { fontSize: '16px', lineHeight: '1.6' }); onClose(); }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left bg-aces-card/50 border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40"><Paragraph size={20} /></div>
              <div className="text-xs font-black uppercase text-white/80 tracking-widest">Paragraph</div>
            </button>
            <button 
              onClick={() => { onAdd('button', 'Click Action', {}); onClose(); }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left bg-aces-card/50 border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-landio-purple/20 flex items-center justify-center text-landio-purple"><Plus size={18} /></div>
              <div className="text-xs font-black uppercase text-white/80 tracking-widest">Action Button</div>
            </button>
          </div>
        );

      case 'icons':
        return (
          <div className="flex flex-col gap-4 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input 
                type="text" 
                placeholder="Search Lucide icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-white/10 focus:outline-none focus:border-landio-purple/50 transition-all font-display uppercase tracking-widest"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {filteredIcons.map(name => {
                const Icon = ICON_COMPONENTS[name];
                return (
                  <button 
                    key={name} 
                    onClick={() => { onAdd('icon', name); onClose(); }}
                    className="aspect-square rounded-xl bg-white/[0.02] border border-white/5 hover:border-landio-purple/50 flex items-center justify-center text-white/20 hover:text-white transition-all group"
                    title={name}
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="flex flex-col gap-4 p-4">
             <div className="text-[10px] text-white/20 uppercase font-black tracking-widest px-2 mb-2 font-display">Social/External</div>
             <button 
              onClick={() => { onAdd('video', 'https://www.youtube.com/embed/dQw4w9WgXcQ'); onClose(); }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left bg-aces-card/50 border border-white/5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform"><Video size={18} /></div>
              <div className="text-xs font-black uppercase text-white/80 tracking-widest">YouTube Embed</div>
            </button>
            <button 
              onClick={() => { onClose(); }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed grayscale"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white"><Share2 size={18} /></div>
              <div className="text-xs font-black uppercase text-white/80 tracking-widest">TikTok Card</div>
            </button>
          </div>
        );

      case 'map':
        return (
          <div className="flex flex-col gap-4 p-4">
            <div className="bg-aces-card p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-aces-blue/10 flex items-center justify-center text-aces-blue"><MapPin size={18} /></div>
                <div className="text-xs font-black uppercase text-white tracking-widest">Google Map</div>
              </div>
              <input 
                type="text" 
                placeholder="Enter address or embed URL"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white mb-3 focus:outline-none focus:border-aces-blue/50"
              />
              <button 
                onClick={() => { onAdd('map', ''); onClose(); }}
                className="w-full py-2.5 bg-aces-blue/20 hover:bg-aces-blue/30 text-aces-blue text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
              >
                Insert Map Node
              </button>
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="flex flex-col gap-4 p-4">
            <div className="bg-aces-card p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500"><Code size={18} /></div>
                <div className="text-xs font-black uppercase text-white tracking-widest">HTML Widget</div>
              </div>
              <textarea 
                placeholder="Paste your <iframe> or code here..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-orange-200/50 font-mono mb-3 focus:outline-none focus:border-orange-500/50 resize-none"
              />
              <button 
                onClick={() => { onAdd('code', '<div style="background: linear-gradient(45deg, #7047eb, #00d2ff); height: 100%; border-radius: 20px; display: flex; align-items: center; justify-center: center; color: white;">Custom Widget</div>'); onClose(); }}
                className="w-full py-2.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
              >
                Insert Code
              </button>
            </div>
          </div>
        );

      case 'placeholder':
        return (
          <div className="grid grid-cols-2 gap-4 p-4">
            <button 
              onClick={() => { onAdd('container', '', { backgroundColor: 'rgba(255,255,255,0.05)', height: '200px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '24px' }); onClose(); }}
              className="aspect-video bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all group"
            >
              <Box size={20} className="text-white/10 group-hover:text-white/40 transition-colors" />
              <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Section</span>
            </button>
            <button 
              onClick={() => { onAdd('shape', '', { borderRadius: '100px', width: '200px', height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.1)' }); onClose(); }}
              className="aspect-square bg-white/[0.02] border border-white/5 rounded-full flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all group"
            >
              <Circle size={20} className="text-white/10 group-hover:text-white/40 transition-colors" />
              <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Circle</span>
            </button>
          </div>
        );

      case 'shapes':
        return (
          <div className="grid grid-cols-2 gap-4 p-4">
             <button 
              onClick={() => { onAdd('shape', '', { backgroundColor: '#7047eb', width: '100px', height: '100px' }); onClose(); }}
              className="aspect-square bg-landio-purple/20 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-landio-purple/30 transition-all"
            >
              <RectangleHorizontal size={20} className="text-white" />
              <span className="text-[10px] font-black uppercase text-white tracking-widest">Box</span>
            </button>
            <button 
              onClick={() => { onAdd('shape', '', { backgroundColor: '#00d2ff', width: '100px', height: '100px', borderRadius: '100px' }); onClose(); }}
              className="aspect-square bg-aces-blue/20 border border-white/5 rounded-full flex flex-col items-center justify-center gap-2 hover:bg-aces-blue/30 transition-all font-display"
            >
              <Circle size={20} className="text-white" />
              <span className="text-[10px] font-black uppercase text-white tracking-widest">Circle</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute top-0 left-20 bottom-0 w-80 bg-aces-black border-r border-white/5 z-[60] flex flex-col shadow-[20px_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-3">
              {view !== 'main' && (
                <button onClick={back} className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
                  <ChevronLeft size={18} />
                </button>
              )}
              <h3 className="text-xs font-display font-black uppercase tracking-[0.3em] text-white">
                {view === 'main' ? 'Add Elements' : view.toUpperCase()}
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {renderContent()}
          </div>

          {view === 'main' && (
            <div className="p-6 bg-landio-purple/[0.02] border-t border-white/5 mt-auto">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-3 px-2">
                <Plus size={14} /> Quick Build
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all text-center">Contact Form</button>
                <button className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all text-center">Hero Grid</button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
