"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wand2, 
  BarChart, 
  ShieldCheck,
  Lightbulb,
  BookHeart,
  Palette,
  Users2,
  BadgePercent,
  Megaphone,
  TrendingUp,
  Trophy,
  Eye,
  Check,
  MessageSquareHeart,
  LineChart,
  LockKeyhole,
  ActivitySquare,
  ThumbsUp,
  Wallet,
  UsersRound
} from "lucide-react";
import { motion } from "framer-motion";

const featureCategories = [
  {
    id: "creative",
    name: "Creative Tools",
    icon: <Wand2 className="h-5 w-5" />,
    color: "text-enchanted-purple",
    features: [
      { icon: <Lightbulb />, title: "AI-powered writing companion" },
      { icon: <Palette />, title: "Easy-to-use book design tools" },
      { icon: <Users2 />, title: "Character development helpers" },
      { icon: <BookHeart />, title: "Story structure guides" },
      { icon: <Wand2 />, title: "Illustration assistance" },
    ]
  },
  {
    id: "business",
    name: "Business Tools",
    icon: <BarChart className="h-5 w-5" />,
    color: "text-storybook-blue",
    features: [
      { icon: <TrendingUp />, title: "Kid-friendly business dashboard" },
      { icon: <LineChart />, title: "Sales tracking and goals" },
      { icon: <Megaphone />, title: "Marketing toolkit" },
      { icon: <MessageSquareHeart />, title: "Reader engagement metrics" },
      { icon: <Trophy />, title: "Achievement system" },
    ]
  },
  {
    id: "safety",
    name: "Safety & Support",
    icon: <ShieldCheck className="h-5 w-5" />,
    color: "text-creative-coral",
    features: [
      { icon: <Eye />, title: "Content oversight controls" },
      { icon: <ActivitySquare />, title: "Progress monitoring" },
      { icon: <ThumbsUp />, title: "Publishing approval system" },
      { icon: <Wallet />, title: "Financial management tools" },
      { icon: <UsersRound />, title: "Family sharing features" },
    ]
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-enchanted-purple/5">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Everything You Need to Succeed" 
          subtitle="Powerful tools designed specifically for young authors and entrepreneurs"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
          >
            <Image
              src="/images/03-features.png"
              alt="KidBookBuilder features"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-enchanted-purple/80 to-transparent flex items-end p-6">
              <h3 className="text-white text-2xl font-bold">
                Magical Tools For Young Creators
              </h3>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="creative" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                {featureCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg flex gap-2 items-center"
                  >
                    <span className={category.color}>{category.icon}</span>
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {featureCategories.map((category) => (
                <TabsContent 
                  key={category.id} 
                  value={category.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className={`text-2xl font-bold mb-6 ${category.color}`}>
                    {category.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-soft-cloud transition-colors"
                      >
                        <div className={`p-2 rounded-full ${category.color} bg-soft-cloud`}>
                          {feature.icon}
                        </div>
                        <span className="font-medium">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-soft-cloud rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Check className="text-imagination-green" />
                      Why {category.name} Matter
                    </h4>
                    <p className="text-night-sky/80">
                      Our {category.name.toLowerCase()} are designed specifically for young creators, 
                      making the journey from imagination to published business intuitive, 
                      fun, and educational.
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}