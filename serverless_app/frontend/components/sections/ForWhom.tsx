"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagicCard } from "@/components/ui/magic-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const ageGroups = [
  {
    id: "beginners",
    name: "Beginners (6-8)",
    description: "Simple tools and quick wins",
    features: [
      "Simplified story templates",
      "Voice-to-text for young writers",
      "Picture-focused book creation",
      "Parent collaboration tools",
      "Achievement badges for motivation"
    ]
  },
  {
    id: "growing",
    name: "Growing Writers (9-11)",
    description: "More advanced features",
    features: [
      "Character and plot development tools",
      "Basic editing assistance",
      "Cover design templates",
      "Simple marketing ideas",
      "Reader statistics dashboard"
    ]
  },
  {
    id: "young-pros",
    name: "Young Pros (12-14)",
    description: "Professional-grade tools",
    features: [
      "Advanced story structure guidance",
      "Editorial suggestions",
      "Custom book design tools",
      "Marketing campaign creation",
      "Financial tracking and reporting"
    ]
  }
];

const parentFeatures = [
  "Easy oversight tools for content monitoring",
  "Progress tracking to encourage consistency",
  "Safe creative environment with controlled sharing",
  "Business guidance appropriate for each age level",
  "Family collaboration options for joint projects",
  "Financial management oversight for young entrepreneurs"
];

export default function ForWhom() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Who It's For" 
          subtitle="Designed for young authors ages 6-14 and their supportive parents"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-enchanted-purple">
              Young Authors (Ages 6-14)
            </h3>
            
            <Tabs defaultValue="beginners" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                {ageGroups.map((group) => (
                  <TabsTrigger key={group.id} value={group.id}>
                    {group.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {ageGroups.map((group) => (
                <TabsContent 
                  key={group.id} 
                  value={group.id}
                  className="bg-soft-cloud rounded-xl p-6"
                >
                  <div className="flex gap-4 items-center mb-4">
                    <div className="w-12 h-12 bg-enchanted-purple rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {group.id === "beginners" ? "6-8" : group.id === "growing" ? "9-11" : "12-14"}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{group.name}</h4>
                      <p className="text-night-sky/70">{group.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    {group.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <BadgeCheck className="text-imagination-green flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/04-age-journey.png"
              alt="Age journey for young authors"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
        
        <MagicCard className="bg-gradient-to-r from-storybook-blue to-storybook-blue/80 text-white p-8 border-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-dream-gold" />
                For Parents
              </h3>
              <p className="mb-6">
                KidBookBuilder gives you the tools to guide and support your child's creative and entrepreneurial journey, while maintaining appropriate oversight.
              </p>
              <ul className="space-y-3">
                {parentFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-dream-gold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-4 text-dream-gold">
                Parent Dashboard
              </h4>
              <div className="space-y-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <h5 className="font-medium text-dream-gold/90">Content Review</h5>
                  <p className="text-sm">Approve stories and illustrations before publishing</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <h5 className="font-medium text-dream-gold/90">Progress Tracking</h5>
                  <p className="text-sm">Monitor writing sessions and project completion</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <h5 className="font-medium text-dream-gold/90">Financial Oversight</h5>
                  <p className="text-sm">Manage earnings and teach financial literacy</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <h5 className="font-medium text-dream-gold/90">Learning Reports</h5>
                  <p className="text-sm">Track skills development and achievements</p>
                </div>
              </div>
            </div>
          </div>
        </MagicCard>
      </div>
    </section>
  );
}