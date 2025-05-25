'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121832]/90 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Zap 
              className={`h-7 w-7 ${isScrolled ? 'text-[#00E5E5]' : 'text-[#FFD700]'} mr-2 transition-colors duration-300`} 
            />
            <span className="text-xl font-bold text-[#F0F7FF]">Kid Book Builder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-[#F0F7FF]/80 hover:text-[#00E5E5] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-[#F0F7FF]/80 hover:text-[#00E5E5] transition-colors">
              How It Works
            </a>
            <Button 
              variant="holographic" 
              className="ml-4 font-medium"
            >
              Join Waitlist
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#F0F7FF]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#121832] border-t border-[#00E5E5]/20 mt-3"
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-[#F0F7FF]/80 hover:text-[#00E5E5] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-[#F0F7FF]/80 hover:text-[#00E5E5] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <Button 
                variant="holographic" 
                className="mt-2 w-full font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </Button>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};