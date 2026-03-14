import React from "react";
import { motion } from "framer-motion";


const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[rgb(var(--primary)/0.15)] blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgb(var(--secondary)/0.1)] blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 rounded-full bg-[rgb(var(--primary)/0.1)] text-[rgb(var(--primary))] font-bold text-sm mb-6 border border-[rgb(var(--primary)/0.2)]"
          >
            DISCOVER FITBUDDY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl text-[rgb(var(--text-primary))] font-black tracking-tighter mb-8"
          >
            Empowering Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--primary))] via-[rgb(var(--secondary))] to-[rgb(var(--accent))]">
              Fitness Evolution
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-[rgb(var(--text-muted))] leading-relaxed"
          >
            We merge cutting-edge technology with human health to create a seamless fitness ecosystem. 
            From AI guidance to precise tracking, your goals are now within reach.
          </motion.p>
        </div>
      </section>
  );
};

export default Hero;
