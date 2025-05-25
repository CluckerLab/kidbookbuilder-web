'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FeatureProps {
  icon: string;
  title: string;
  delay: number;
}

const Feature = ({ icon, title, delay }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-[#121832]/80 backdrop-blur-sm p-6 rounded-lg border border-[#00E5E5]/20 hover:border-[#00E5E5]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,229,0.2)]"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#0066FF]/50 shadow-[0_0_15px_rgba(0,102,255,0.3)]">
        <Image
          src={icon}
          alt={title}
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#6B2FD9]/20 to-transparent mix-blend-overlay"></div>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-[#F0F7FF]">{title}</h3>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      icon: '/images/02-quantum-core-icon.png',
      title: '🔷 Quantum Story Core Processor',
    },
    {
      icon: '/images/03-protocols-icon.png',
      title: '⚡️ Mark I-X Enhancement Protocols',
    },
    {
      icon: '/images/04-workshop-interface-icon.png',
      title: '🎯 Holographic Workshop Interface',
    },
    {
      icon: '/images/05-achievement-icon.png',
      title: '🌟 Arc Reactor Achievement System',
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#121832] to-[#0F142A]">
      {/* Tech background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00E5E5]/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#0066FF]/30 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6B2FD9]/30 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00E5E5] to-[#0066FF]">
            Coming to Your Workshop
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#6B2FD9] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};