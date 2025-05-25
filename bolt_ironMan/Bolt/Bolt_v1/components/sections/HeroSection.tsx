'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/01-hero-background.png')",
            filter: "brightness(0.7)"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#121832]/80 via-[#121832]/50 to-[#121832]"></div>
      </div>

      {/* Floating Arc Reactor Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-[#00E5E5]/20 animate-pulse"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-[#00E5E5]/30 animate-pulse"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-[#0066FF]/40 animate-pulse"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-[#6B2FD9]/50"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#0066FF]/20 animate-ping"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#00E5E5] shadow-[0_0_40px_rgba(0,229,229,0.8)] animate-pulse"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-[#F0F7FF] leading-tight tracking-tight">
            The Ultimate
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00E5E5] to-[#0066FF]">
              Story-Building Workshop
            </span>
          </h1>
          
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-[#FFD700]">
            Coming Soon: Your Creative Reactor Awaits
          </h2>

          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-[#F0F7FF]/90 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Prepare for a revolutionary story-creation platform where cutting-edge AI meets young imagination. 
            Like a genius inventor's workshop, this upcoming app will put quantum storytelling protocols and 
            advanced creative tech at your fingertips. Sign up now to be first in line when we launch your future story empire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="group bg-[#0066FF] text-white font-bold text-lg px-10 py-6 hover:bg-[#0066FF]/90 transition-colors"
            >
              Join the Waitlist
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating tech elements */}
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-20 h-20 md:w-32 md:h-32 border-2 border-[#00E5E5]/30 rounded-md transform rotate-12 animate-float-slow"></div>
      <div className="absolute top-10 right-10 md:top-20 md:right-20 w-16 h-16 md:w-24 md:h-24 border-2 border-[#6B2FD9]/40 rounded-full transform -rotate-12 animate-float"></div>
    </section>
  );
};