import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, UserCheck, BarChart3, Globe, Zap, Infinity, Lock } from 'lucide-react';

const Card = ({ title, description, children, className = "" }: { title: string, description?: string, children: React.ReactNode, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-[#0d0c14] border border-white/5 rounded-3xl p-8 overflow-hidden relative group ${className}`}
  >
    <div className="relative z-10">
      <h3 className="text-xl font-bold tracking-tight mb-2 text-white/90">{title}</h3>
      {description && <p className="text-sm text-white/40 font-medium">{description}</p>}
    </div>
    <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#3b82f610_0%,_transparent_70%)]" />
    </div>
    {children}
  </motion.div>
);

export const BentoFeatures = () => {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto w-full space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-black silver-gradient-text tracking-tighter">Everything you need to scale</h2>
        <h3 className="text-5xl md:text-7xl font-black text-white">Built in.</h3>
        <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">
          Stop stitching together platforms. AcesAds Cloud gives you enterprise-grade backend infrastructure including hosting, databases, integrations and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1 */}
        <Card title="Unlimited databases" className="md:col-span-1 h-[300px] flex flex-col justify-between">
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full flex justify-center scale-150 text-blue-500/20">
            <Infinity size={200} strokeWidth={1} />
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full" />
          </div>
        </Card>

        <Card title="Enterprise-grade" className="md:col-span-1 h-[300px]">
          <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] stroke-blue-500/20 stroke-[0.5] fill-none">
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,180 Q100,180 180,0" 
              />
              <motion.circle 
                initial={{ cx: 0, cy: 180 }}
                animate={{ cx: [0, 180], cy: [180, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                r="4" fill="white" 
                className="shadow-[0_0_10px_white]"
              />
            </svg>
          </div>
        </Card>

        <Card title="User Management & Authentication" className="md:col-span-1 h-[600px] md:row-span-2">
           <div className="mt-12 flex flex-col items-center justify-center gap-12">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative z-10 w-48 h-48 bg-gradient-to-br from-gray-800 to-black rounded-full border border-white/10 flex items-center justify-center shadow-2xl"
                >
                  <Lock size={60} className="text-blue-500" />
                  <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full blur-[4px]"></div>
                </motion.div>
              </div>
              <div className="w-full space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 2 + i, repeat: Infinity, ease: "linear" }}
                      className="h-full w-1/3 bg-blue-500/40"
                    />
                  </div>
                ))}
              </div>
           </div>
        </Card>

        {/* Row 2 */}
        <Card title="SEO optimization" description="so your project ranks from day one." className="md:col-span-1 h-[280px] bg-gradient-to-br from-[#0d0c14] to-[#08080a]">
           <div className="mt-8 flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[30px] rounded-full" />
                
                {/* 3D Ring */}
                <div className="absolute inset-0 rounded-full border-[8px] border-white/5 shadow-inner" />
                
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                  <motion.circle 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.95 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    cx="64" cy="64" r="56" 
                    className="stroke-blue-500 stroke-[8] fill-none" 
                    style={{ strokeLinecap: 'round' }}
                  />
                </svg>
                
                {/* Center Content */}
                <div className="relative z-10 w-24 h-24 bg-[#0a0a0f] rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
                  <span className="text-4xl font-black text-white tracking-tighter">100</span>
                </div>
              </div>
           </div>
        </Card>

        <Card title="Hosting with analytics & custom domains" className="md:col-span-1 h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <motion.div 
               whileHover={{ scale: 1.05, rotate: -12 }}
               className="relative w-full h-32 bg-blue-600 rounded-[2rem] rotate-[-15deg] shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden border border-blue-400/30"
            >
               {/* Shine Effect */}
               <motion.div 
                 animate={{ x: ['100%', '-100%'] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full skew-x-[-20deg]"
               />
               <span className="text-4xl font-black text-white transform skew-x-[-10deg] italic tracking-tighter">Publish</span>
               
               {/* Glass Reflection */}
               <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
            </motion.div>
          </div>
        </Card>
      </div>

    </section>
  );
};
