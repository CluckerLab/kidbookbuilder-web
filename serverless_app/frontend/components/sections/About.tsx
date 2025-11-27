"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { Sparkles, Rocket } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 bg-soft-cloud relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="The Magic That Awaits" 
          sparkles={true} 
          className="mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-soft-cloud relative"
          >
            <div className="absolute -top-5 -left-5 bg-creative-coral rounded-full p-3 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Behold, KidBookBuilder – where young dreams transform into profitable reality! 
              This extraordinary platform, born from an entrepreneurial spark during a magical 
              car ride conversation, transforms children into literary legends and business 
              pioneers through AI wizardry and pure imagination.
            </p>
            <p className="text-lg leading-relaxed">
              Watch as our enchanted digital studio guides young virtuosos from first word 
              to published masterpiece, from creative dreamer to successful entrepreneur, 
              making every child's wildest publishing and business dreams burst into glorious 
              existence. Welcome to KidBookBuilder: Where Young Legends Begin Their Creative Empire!
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-enchanted-purple p-8 rounded-2xl shadow-lg text-white relative"
          >
            <div className="absolute -top-5 -right-5 bg-dream-gold rounded-full p-3 shadow-lg">
              <Rocket className="w-6 h-6 text-night-sky" />
            </div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              Our Mission
            </h3>
            <p className="text-xl leading-relaxed font-medium">
              "To empower young creators to transform their stories into real businesses, 
              teaching entrepreneurship through the joy of creative writing."
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-dream-gold mb-2">Creativity</h4>
                <p className="text-sm">Unleashing imagination through structured storytelling</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-dream-gold mb-2">Business</h4>
                <p className="text-sm">Learning entrepreneurship through publishing</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-dream-gold mb-2">Growth</h4>
                <p className="text-sm">Building confidence through achievement</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-dream-gold mb-2">Skills</h4>
                <p className="text-sm">Developing lifelong creative and business abilities</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}