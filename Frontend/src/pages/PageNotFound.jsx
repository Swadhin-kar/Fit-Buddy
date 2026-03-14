import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Activity } from 'lucide-react';

const PageNotFound = () => {
  // Utility for cleaner template literals with your RGB variables
  const themeBg = (variable) => `rgb(var(${variable}))`;
  const themeText = (variable) => `rgb(var(${variable}))`;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Background Elements - Using your Brand Blue/Green */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full opacity-[0.08] blur-[100px]" 
           style={{ backgroundColor: themeBg('--primary') }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full opacity-[0.08] blur-[100px]" 
           style={{ backgroundColor: themeBg('--secondary') }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 text-center px-6 max-w-2xl"
      >
        {/* Fitness-themed Visual */}
        <div className="relative inline-block mb-8">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* <Activity size={240} style={{ color: themeBg('--primary') }} strokeWidth={0.5} /> */}
          </motion.div>
          
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter select-none italic"
              style={{ color: themeText('--text-primary'), opacity: 0.1 }}>
            404
          </h1>
        </div>

        <div className="-mt-12 md:-mt-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight"
              style={{ color: themeText('--text-primary') }}>
            Off <span style={{ color: themeText('--primary') }}>Track?</span>
          </h2>
          
          <p className="text-lg md:text-xl mb-10 font-medium"
             style={{ color: themeText('--text-muted') }}>
            Even the best athletes take a wrong turn. <br className="hidden md:block" />
            Let's get you back to your workout.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            {/* Secondary Action: Go Back */}
            <button 
              onClick={() => window.history.back()}
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                backgroundColor: themeBg('--card-depth-1'), 
                color: themeText('--text-primary'),
                border: `1px solid rgb(var(--black) / 0.05)`
              }}
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Previous Step
            </button>
            
            {/* Primary Action: Home */}
            <a 
              href="/"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                backgroundColor: themeBg('--primary'),
                boxShadow: `0 10px 25px -5px rgb(var(--primary) / 0.4)`
              }}
            >
              <Home size={20} />
              Return to Dashboard
            </a>
          </div>
        </div>
      </motion.div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(rgb(var(--text-primary)) 1px, transparent 1px)`,
             backgroundSize: '32px 32px' 
           }} 
      />
    </div>
  );
};

export default PageNotFound;