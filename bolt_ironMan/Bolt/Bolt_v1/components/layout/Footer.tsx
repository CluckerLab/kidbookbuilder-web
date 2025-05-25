import React from 'react';
import { Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#121832] py-12 text-[#F0F7FF]/70">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Zap className="h-8 w-8 text-[#FFD700] mr-2" />
            <span className="text-xl font-bold text-[#F0F7FF]">Kid Book Builder</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#00E5E5] transition-colors">About</a>
            <a href="#" className="hover:text-[#00E5E5] transition-colors">Features</a>
            <a href="#" className="hover:text-[#00E5E5] transition-colors">Contact</a>
            <a href="#" className="hover:text-[#00E5E5] transition-colors">Privacy</a>
          </div>
        </div>
        <div className="border-t border-[#F0F7FF]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Kid Book Builder. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Powered by <span className="text-[#00E5E5]">Quantum Story Technology</span></p>
        </div>
      </div>
    </footer>
  );
};