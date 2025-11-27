"use client";

import { Card, CardContent } from '@/components/ui/Card';
import {
  Wand2,
  BarChart,
  ShieldCheck,
  Lightbulb,
  BookHeart,
  Palette,
  TrendingUp,
  Trophy,
  Eye,
} from 'lucide-react';

const features = [
  {
    icon: <Wand2 className="h-8 w-8" />,
    title: 'Creative Tools',
    description: 'AI-powered writing companion, easy-to-use design tools, and character development helpers.',
    color: 'text-enchanted-purple',
    bgColor: 'bg-enchanted-purple/10',
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: 'Business Dashboard',
    description: 'Kid-friendly business metrics, sales tracking, marketing toolkit, and achievement system.',
    color: 'text-storybook-blue',
    bgColor: 'bg-storybook-blue/10',
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Safety & Support',
    description: 'Content oversight, progress monitoring, publishing approval, and family sharing features.',
    color: 'text-creative-coral',
    bgColor: 'bg-creative-coral/10',
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Story Guides',
    description: 'Step-by-step story structure guides to help young writers craft compelling narratives.',
    color: 'text-dream-gold',
    bgColor: 'bg-dream-gold/10',
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: 'Illustration Help',
    description: 'Easy illustration tools and AI assistance to bring stories to life visually.',
    color: 'text-sparkle-pink',
    bgColor: 'bg-sparkle-pink/10',
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Achievements',
    description: 'Milestone tracking and rewards to celebrate every step of the creative journey.',
    color: 'text-imagination-green',
    bgColor: 'bg-imagination-green/10',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-soft-cloud">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-enchanted-purple mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-night-sky/70 max-w-2xl mx-auto">
            Powerful tools designed specifically for young authors and entrepreneurs
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="elevated"
              className="group hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-night-sky mb-2">
                  {feature.title}
                </h3>
                <p className="text-night-sky/70">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
