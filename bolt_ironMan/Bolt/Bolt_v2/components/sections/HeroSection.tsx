"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-[#121212] bg-cover bg-center py-16 text-white"
      style={{ backgroundImage: "url(/images/01-hero-background.png)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/70 via-[#121212]/50 to-[#121212]"></div>
      
      {/* Arc reactor glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-[#64F3FF]/20 to-[#0B6FFF]/20 blur-3xl"></div>
      
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 
            className={`mb-6 text-4xl font-extrabold leading-tight transition-all duration-1000 sm:text-5xl md:text-6xl ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="block text-[#FFB300]">Your Story-Building Workshop</span>
            <span className="bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] bg-clip-text text-transparent">
              Awaits, Young Genius
            </span>
          </h1>
          
          <p 
            className={`mb-6 text-xl font-bold text-[#E3000B] transition-all delay-300 duration-1000 sm:text-2xl ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Power Up Your Creativity with Advanced Story Systems
          </p>
          
          <p 
            className={`mb-10 text-base text-[#C5C5C5] transition-all delay-500 duration-1000 md:text-lg ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Step into your personal creative workshop, where young geniuses like you harness 
            advanced AI to build incredible stories. Just as great inventors start in their 
            workshops, crafting innovations that change the world, Kid Book Builder gives you 
            the tools to forge your storytelling empire. Transform your imagination into published 
            stories using arc-reactor-powered creative tech designed for young authors (ages 8-14). 
            Your workshop comes fully equipped with an advanced AI assistant, holographic interfaces, 
            and a story-powering arc reactor core.
          </p>
          
          <div 
            className={`transition-all delay-700 duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Power Up Your Workshop</span>
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#64F3FF]/0 to-[#0B6FFF]/0 transition-all duration-500 group-hover:from-[#64F3FF]/20 group-hover:to-[#0B6FFF]/20"></span>
            </Button>
          </div>
        </div>
      </Container>
      
      {/* Animated tech lines */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 w-full overflow-hidden">
          <div className="animate-pulse-slow h-full w-1/3 bg-gradient-to-r from-[#64F3FF] to-transparent"></div>
        </div>
      </div>
    </section>
  );
}