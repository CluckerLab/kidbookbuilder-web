"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { LaptopIcon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Power Up", href: "#power-up" },
  { label: "Why Us", href: "#why" },
  { label: "Join Us", href: "#cta" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-[#121212]/90 backdrop-blur-md" 
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <LaptopIcon className="mr-2 h-8 w-8 text-[#64F3FF]" />
            <span className="text-xl font-bold text-[#FFB300]">Kid Book Builder</span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden space-x-8 md:flex">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="relative text-[#C5C5C5] transition-colors duration-300 hover:text-[#64F3FF]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] transition-all duration-300 hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          {/* CTA Button */}
          <Button 
            variant="default" 
            className="hidden md:inline-flex"
            onClick={() => {
              const element = document.getElementById('cta');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </Button>
          
          {/* Mobile menu button */}
          <button 
            className="flex items-center md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#C5C5C5]" />
            ) : (
              <Menu className="h-6 w-6 text-[#C5C5C5]" />
            )}
          </button>
        </div>
      </Container>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 top-20 z-40 transform bg-[#121212]/95 backdrop-blur-lg transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="py-8">
          <nav className="flex flex-col space-y-6">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="text-lg text-[#C5C5C5] transition-colors duration-300 hover:text-[#64F3FF]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button 
              variant="default" 
              className="mt-4 w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                const element = document.getElementById('cta');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}