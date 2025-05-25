'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  { number: 1, title: 'Early Access Registration' },
  { number: 2, title: 'Beta Creator Selection' },
  { number: 3, title: 'Full System Launch' },
];

export const HowItWorksSection = () => {
  return (
    <section className="relative py-20 bg-[#0F142A]">
      {/* Tech pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#121832] opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0066FF_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#F0F7FF]">
            How It Will <span className="text-[#00E5E5]">Work</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#6B2FD9] mx-auto rounded-full"></div>
        </motion.div>

        {/* Launch Protocol Image */}
        <motion.div 
          className="relative w-full h-64 md:h-96 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/06-launch-protocol.png"
            alt="Launch Protocol Visualization"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0066FF]/10 to-transparent mix-blend-overlay"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-[#FFD700]">
            Future Launch Protocol
          </h3>

          <div className="space-y-8 relative">
            {/* Progress Line */}
            <div className="absolute left-[22px] md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0066FF] to-[#6B2FD9]"></div>
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 relative"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0066FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.5)] z-10 font-bold text-lg md:text-xl text-white">
                  {step.number}
                </div>
                <div className="pt-3 md:pt-4">
                  <h4 className="text-xl md:text-2xl font-bold text-[#F0F7FF]">{step.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};