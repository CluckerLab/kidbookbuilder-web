'use client';

import { useEffect } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PowerUpSection } from '@/components/sections/PowerUpSection';

export default function Home() {
  // Add particle effect to the background
  useEffect(() => {
    // Dynamically import tsparticles to avoid SSR issues
    const loadParticles = async () => {
      try {
        const tsParticles = await import('tsparticles');
        const { loadFull } = await import('tsparticles');
        
        await loadFull(tsParticles.default);
        
        await tsParticles.default.load('tsparticles', {
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#00E5E5"
            },
            opacity: {
              value: 0.2,
              random: true
            },
            size: {
              value: 2,
              random: true
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#0066FF",
              opacity: 0.1,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              out_mode: "out"
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              }
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 0.3
                }
              }
            }
          },
          retina_detect: true
        });
      } catch (error) {
        console.error("Failed to load particles:", error);
      }
    };
    
    loadParticles();
  }, []);
  
  return (
    <>
      <div id="tsparticles" className="fixed inset-0 z-0"></div>
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <PowerUpSection />
    </>
  );
}