'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const PowerUpSection = () => {
  return (
    <section className="relative py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/07-power-up-background.png')",
            filter: "brightness(0.4)"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121832] via-[#121832]/70 to-[#121832]/20"></div>
      </div>

      {/* Arc Reactor Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-[#00E5E5]/10 animate-ping"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-[#0066FF]/15"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#0066FF]/10 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#F0F7FF]">
            Be Among the 
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00E5E5] to-[#6B2FD9]">
              First Young Geniuses
            </span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Button 
              variant="primary" 
              size="lg"
              className="group"
            >
              Register for Launch
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};