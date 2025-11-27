"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagicCard } from "@/components/ui/magic-card";
import { 
  BookOpen, 
  Sparkles, 
  Rocket, 
  BarChart4 
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Dream & Create",
    description: [
      "Brainstorm with your AI creative companion",
      "Turn your wildest ideas into structured stories",
      "Watch your story take shape, chapter by chapter",
      "Get smart suggestions while keeping your unique voice"
    ],
    icon: <BookOpen className="w-full h-full text-enchanted-purple" />,
    color: "border-enchanted-purple"
  },
  {
    id: 2,
    title: "Polish & Perfect",
    description: [
      "Transform rough drafts into polished manuscripts",
      "Design your own book cover and illustrations",
      "Get smart feedback and improvements",
      "Preview your book in different formats"
    ],
    icon: <Sparkles className="w-full h-full text-storybook-blue" />,
    color: "border-storybook-blue"
  },
  {
    id: 3,
    title: "Publish & Launch",
    description: [
      "Choose your format and set your price",
      "Create your author brand",
      "Prepare for your book's debut",
      "Set up your author profile"
    ],
    icon: <Rocket className="w-full h-full text-creative-coral" />,
    color: "border-creative-coral"
  },
  {
    id: 4,
    title: "Share & Earn",
    description: [
      "Launch to your built-in first market",
      "Track sales and reader feedback",
      "Grow your business skills",
      "Watch your success metrics"
    ],
    icon: <BarChart4 className="w-full h-full text-imagination-green" />,
    color: "border-imagination-green"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Your Journey from Story Dreamer to Business Leader" 
          subtitle="A magical 4-step process to transform your creative ideas into a thriving business"
        />
        
        <div className="relative mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-3xl h-60 md:h-80"
          >
            <Image
              src="/images/02-journey-icons.png"
              alt="Your Journey from Story Dreamer to Business Leader"
              fill
              className="object-contain"
            />
          </motion.div>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <MagicCard 
              key={step.id} 
              className={`${step.color} border-2 h-full`}
              delay={index * 0.15}
            >
              <div className="p-6 h-[320px] flex flex-col">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-dream-gold flex items-center justify-center font-bold text-night-sky">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{step.title}</h3>
                <ul className="space-y-2 flex-grow">
                  {step.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-dream-gold mr-2">•</span>
                      <span className="text-night-sky/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}