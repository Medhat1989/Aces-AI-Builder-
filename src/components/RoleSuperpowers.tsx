import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  History, 
  Globe, 
  Twitter, 
  Linkedin, 
  Github, 
  TrendingUp, 
  CheckCircle2, 
  Circle 
} from 'lucide-react';

const RoleCard = ({ 
  title, 
  description, 
  label, 
  children, 
  className = "" 
}: { 
  title: string, 
  description: string, 
  label: string, 
  children: React.ReactNode, 
  className?: string 
}) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-[radial-gradient(circle_at_center,_#1a1a24_0%,_#0d0c14_100%)] border border-white/5 rounded-3xl p-8 flex flex-col gap-6 relative group overflow-hidden ${className}`}
  >
    {/* Liquid Glass / Shine Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
       <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-white/5 to-transparent blur-2xl" />
       <motion.div 
          animate={{ 
            x: ['-100%', '100%'],
            y: ['-100%', '100%']
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%] h-[200%] rotate-45"
       />
    </div>

    <div className="space-y-4 relative z-10">
      <div className="space-y-1">
        <h4 className="text-sm font-black text-white/90 uppercase tracking-widest">{label}</h4>
        <p className="text-xs text-white/40 leading-relaxed max-w-[240px] tracking-tight">{description}</p>
      </div>
    </div>
    
    <div className="flex-1 min-h-[160px] rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 overflow-hidden relative z-10">
      {children}
    </div>

    {/* Subtle Glow Enhancement */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Corner Sharp Highlight */}
    <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute top-0 left-0 w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export const RoleSuperpowers = () => {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto w-full space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic opacity-20">Whatever your role</h2>
        <div className="relative inline-block">
          <h3 className="text-5xl md:text-7xl font-black silver-gradient-text tracking-tighter">AcesAds gives you superpowers</h3>
          <div className="absolute -inset-x-8 -top-8 h-24 bg-blue-500/10 blur-[80px] -z-10 rounded-full" />
        </div>
        <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">
          From idea to live product, AcesAds adapts to the way you work turning every vision into something real & fast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Managers */}
        <RoleCard 
          label="Product managers"
          description="Go from insight to prototype in hours and test ideas with your team before the day is over."
          title="Version history"
          className="md:col-span-1"
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-white/60">Version history</span>
              <History size={14} className="text-white/20" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <div className="w-full h-8 bg-white/5 border border-white/10 rounded-lg px-9 flex items-center text-[10px] text-white/20">Search for a version</div>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] text-white/30 font-bold uppercase tracking-wider">Bookmarked Versions (1)</div>
              <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-white">Landing page working</div>
                <div className="flex items-center gap-2 text-[9px] text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Published • Jun 7 8:00PM
                </div>
              </div>
            </div>
          </div>
        </RoleCard>

        {/* Entrepreneurs */}
        <RoleCard 
          label="Entrepreneurs"
          description="Launch a full business in days, not months. From landing page to product, all in one flow."
          title="Publish"
          className="md:col-span-1"
        >
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="text-[10px] font-bold text-white/60">Publish your project</div>
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] text-white/80 font-mono">
                <Globe size={14} className="text-blue-400" />
                https://ais-preview.run.app
              </div>
              <div className="flex items-center gap-2 text-[9px] text-green-400 font-bold">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 Up to date
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="flex gap-2">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
              <button className="px-6 h-9 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-[11px] font-bold text-white transition-colors">
                Update
              </button>
            </div>
          </div>
        </RoleCard>

        {/* Marketers */}
        <RoleCard 
          label="Marketers"
          description="Spin up high-performing campaign pages in hours, with SEO and hosting built in."
          title="Visitors"
          className="md:col-span-1"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Unique visitors</span>
              <TrendingUp size={14} className="text-blue-500" />
            </div>
            <div className="relative h-28 w-full mt-4">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  d="M0,35 Q20,35 30,25 T50,15 T70,25 T100,5"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M0,35 Q20,35 30,25 T50,15 T70,25 T100,5 L100,40 L0,40 Z" fill="url(#chartGradient)" />
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-between py-2 text-[8px] font-bold text-white/10">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
              </div>
            </div>
          </div>
        </RoleCard>

        {/* Agencies */}
        <RoleCard 
          label="Agencies"
          description="Multiply your impact: deliver more projects, faster, without scaling headcount."
          title="Impact"
          className="md:col-span-2"
        >
          <div className="grid grid-cols-2 gap-4 p-4 h-full">
            {[
              { color: 'from-orange-500 to-red-600', text: 'Extraordinary experiences' },
              { color: 'from-blue-500 to-indigo-600', text: 'Smart AI Agent UI' },
              { color: 'from-purple-500 to-pink-600', text: 'Brand Universe' },
              { color: 'from-cyan-500 to-emerald-600', text: 'Hyper-Growth SaaS' }
            ].map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-xl overflow-hidden relative group/img min-h-[120px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-10 group-hover/img:opacity-20 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                   <div className="text-[10px] font-bold text-white/40 text-center uppercase tracking-tighter">{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </RoleCard>

        {/* Students & Builders */}
        <RoleCard 
          label="Students & builders"
          description="Learn by doing: take ideas from class or side projects and turn them into fully working apps."
          title="Plan"
          className="md:col-span-1"
        >
          <div className="p-8 space-y-4">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Plan</div>
            <div className="space-y-4">
              {[
                { text: "Analyze current project structure", done: true },
                { text: "Design todo app component", done: true },
                { text: "Create todo data types", done: true },
                { text: "Implement state management", done: false },
              ].map((task, i) => (
                <div key={i} className={`flex items-center gap-4 text-[11px] font-medium ${task.done ? 'text-white/60' : 'text-white/20'}`}>
                  {task.done ? <CheckCircle2 className="text-blue-500" size={16} /> : <Circle className="text-white/10" size={16} />}
                  <span className={task.done ? 'line-through' : ''}>{task.text}</span>
                </div>
              ))}
            </div>
          </div>
        </RoleCard>
      </div>
    </section>
  );
};
