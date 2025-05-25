"use client";

import Image from "next/image";
import { ButtonMagic } from "@/components/ui/button-magic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('join-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden bg-gradient-to-b from-enchanted-purple/5 to-white py-16 md:py-24">
      {/* Floating elements animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-dream-gold/30 rounded-full blur-3xl"
            initial={{
              width: 20 + Math.random() * 100,
              height: 20 + Math.random() * 100,
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: 0.1 + Math.random() * 0.2,
            }}
            animate={{
              x: [
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
              ],
              y: [
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
              ],
              opacity: [0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-enchanted-purple leading-tight mb-4">
              Move Over, Lemonade Stands. Your Kid's Next Big Idea Is a Book.
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-night-sky/80">
              Where Young Storytellers Build Their First Business Adventure
            </p>
            <p className="text-lg mb-8 text-night-sky/70">
              The platform where young writers become young entrepreneurs
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonMagic size="lg" sparkles onClick={scrollToForm}>
                Start Your Journey Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </ButtonMagic>
              <ButtonMagic size="lg" variant="purple">
                See How It Works
              </ButtonMagic>
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-enchanted-purple/20 border-4 border-white">
              <div className="aspect-[4/3] relative">
                <Image 
                  src="/images/01-hero-main.png"
                  alt="Young storyteller building their business"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-dream-gold p-4 rounded-tl-2xl rounded-br-md transform rotate-3 shadow-lg">
                <p className="text-night-sky font-bold text-sm">
                  Dreams → Business
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}