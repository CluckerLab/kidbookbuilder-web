"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ShoppingBag, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const successSteps = [
  {
    icon: <BookOpen className="h-8 w-8 text-white" />,
    title: "Start with your first story",
    description: "Begin your journey with a simple story using our guided templates",
    color: "bg-enchanted-purple"
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-white" />,
    title: "Publish your first book",
    description: "Transform your story into a beautiful published book",
    color: "bg-storybook-blue"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    title: "Make your first sale",
    description: "Experience the thrill of earning from your creativity",
    color: "bg-creative-coral"
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Grow your readership",
    description: "Build a community of readers who love your stories",
    color: "bg-imagination-green"
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: "Build your author brand",
    description: "Develop your unique voice and style as an author-entrepreneur",
    color: "bg-dream-gold"
  }
];

export default function SuccessPath() {
  return (
    <section className="py-20 bg-soft-cloud relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Building Your Creative Empire" 
          subtitle="Follow our proven path to success for young author-entrepreneurs"
          sparkles={true}
        />
        
        <div className="relative mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-5xl h-60 md:h-[300px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/images/05-success-banner.png"
              alt="Success journey for young authors"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-enchanted-purple/70 to-transparent flex items-center p-8">
              <div className="max-w-md">
                <h3 className="text-3xl font-bold text-white mb-4">
                  From First Word to First Sale
                </h3>
                <p className="text-white/90">
                  Our magical platform guides you through each step of turning your 
                  creative ideas into a thriving business.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-1/2 left-0 w-full h-2 bg-white transform -translate-y-1/2 rounded-full hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {successSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative border-none shadow-lg h-full">
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${step.color} rounded-full p-4 shadow-lg z-10`}>
                    {step.icon}
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dream-gold to-transparent" />
                  <CardContent className="pt-12 pb-6 px-4 text-center">
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-night-sky/70">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <motion.div 
            className="inline-block bg-white p-6 rounded-xl shadow-lg border-2 border-dream-gold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-night-sky">
              Success Metrics for Young Entrepreneurs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-enchanted-purple">100+</div>
                <div className="text-sm text-night-sky/70">Stories Published</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-storybook-blue">84%</div>
                <div className="text-sm text-night-sky/70">Completion Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-creative-coral">$15k+</div>
                <div className="text-sm text-night-sky/70">Earned by Authors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-imagination-green">12</div>
                <div className="text-sm text-night-sky/70">Avg. Reader Age</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}