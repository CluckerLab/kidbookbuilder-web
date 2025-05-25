"use client";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useEffect, useState } from "react";
import Image from "next/image";

const steps = [
  {
    title: "Initial Power-Up Phase",
    items: [
      "Receive your workshop access credentials",
      "Initialize your personal AI assistant",
      "Begin calibrating your creative reactor core",
    ],
  },
  {
    title: "Beta Testing Protocol",
    items: [
      "Join our elite team of young story engineers",
      "Test experimental storytelling features",
      "Help optimize the story processors",
    ],
  },
  {
    title: "Full Systems Launch",
    items: [
      "All workshop systems online at maximum power",
      "Global story distribution network activated",
      "Young Genius Creator Network goes live",
    ],
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative bg-gradient-to-b from-[#121212] to-[#2A2A2A] py-24">
      {/* Tech circuit lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-[#64F3FF]/30 to-transparent"></div>
        <div className="absolute right-0 top-3/4 h-px w-full bg-gradient-to-r from-transparent via-[#E3000B]/30 to-transparent"></div>
      </div>
      
      <Container className="relative">
        <SectionTitle 
          title="Workshop Activation Protocol" 
          highlight
          className="text-center"
        />
        
        <div className="mt-16">
          <div className="relative mb-16 rounded-lg border border-[#C5C5C5]/20 bg-[#121212]/50 p-2 shadow-lg backdrop-blur-md md:p-4">
            <div className="relative h-[200px] w-full overflow-hidden rounded md:h-[300px] lg:h-[400px]">
              <Image
                src="/images/06-launch-protocol.png"
                alt="Launch protocol visualization"
                fill
                className="object-cover object-center"
              />
              
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#64F3FF]/5 to-transparent"></div>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-lg border p-6 backdrop-blur-sm transition-all duration-500 ${
                  activeStep === index 
                    ? "border-[#64F3FF] bg-[#2A2A2A]/80 shadow-[0_0_20px_rgba(100,243,255,0.3)]" 
                    : "border-[#C5C5C5]/20 bg-[#2A2A2A]/50"
                }`}
              >
                {/* Step number */}
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                    activeStep === index 
                      ? "border-[#FFB300] bg-[#FFB300]/10 text-[#FFB300]" 
                      : "border-[#C5C5C5] bg-transparent text-[#C5C5C5]"
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className={`text-lg font-bold transition-colors duration-500 ${
                    activeStep === index ? "text-[#E3000B]" : "text-[#C5C5C5]"
                  }`}>
                    {step.title}
                  </h3>
                </div>
                
                <ul className="space-y-2">
                  {step.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className={`flex items-start gap-2 transition-opacity duration-500 ${
                        activeStep === index ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      <span className="text-[#64F3FF]">•</span>
                      <span className="text-[#C5C5C5]">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Arc reactor glow effect */}
                <div className={`absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-r from-[#64F3FF]/10 to-[#0B6FFF]/10 blur-3xl transition-opacity duration-500 ${
                  activeStep === index ? "opacity-100" : "opacity-0"
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}