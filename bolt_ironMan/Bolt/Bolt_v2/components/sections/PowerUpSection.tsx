"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useEffect, useState } from "react";

const capabilities = [
  "Command an advanced AI creative assistant",
  "Deploy holographic illustration tools",
  "Activate advanced story enhancement protocols",
  "Connect with fellow young inventors",
  "Launch your stories to global audiences",
  "Power up your creative reactor with achievements",
];

export function PowerUpSection() {
  const [loadedItems, setLoadedItems] = useState<number[]>([]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadedItems((prev) => {
        if (prev.length >= capabilities.length) {
          clearInterval(intervalId);
          return prev;
        }
        return [...prev, prev.length];
      });
    }, 400);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <section 
      className="relative min-h-[80vh] bg-cover bg-center py-24 text-white"
      style={{ backgroundImage: "url(/images/07-power-up-background.png)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/90 via-[#121212]/70 to-[#121212]/90"></div>
      
      <Container className="relative z-10">
        <SectionTitle 
          title="Power Up Your Workshop, Young Genius" 
          highlight
          className="text-center"
        />
        
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="mb-8 text-center text-xl font-bold text-[#FFB300] md:text-2xl">
            Workshop Capabilities:
          </h3>
          
          <div className="mb-12 space-y-4">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className={`flex transform items-center rounded-md border border-[#C5C5C5]/20 bg-[#2A2A2A]/40 p-4 backdrop-blur-sm transition-all duration-500 ${
                  loadedItems.includes(index) 
                    ? "translate-x-0 opacity-100" 
                    : "translate-x-8 opacity-0"
                }`}
              >
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#E3000B] to-[#FF4B4B]">
                  <span className="text-white">✓</span>
                </div>
                <p className="text-[#C5C5C5]">{capability}</p>
                
                {/* Animated pulse indicator */}
                <div className={`ml-auto h-3 w-3 animate-pulse rounded-full bg-[#64F3FF] transition-opacity duration-1000 ${
                  loadedItems.includes(index) ? "opacity-100" : "opacity-0"
                }`}></div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="default"
              className="w-full md:w-auto"
            >
              Initialize Workshop
            </Button>
          </div>
        </div>
      </Container>
      
      {/* Tech circuit lines */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="h-px w-full overflow-hidden">
          <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-[#FFB300]/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}