"use client";

import { PenLine, Palette, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <PenLine className="h-8 w-8" />,
    title: 'Write Your Story',
    description: 'Use our AI-powered writing tools to craft your unique story. Get guidance on plot, characters, and more.',
    color: 'text-enchanted-purple',
    bgColor: 'bg-enchanted-purple',
  },
  {
    number: '02',
    icon: <Palette className="h-8 w-8" />,
    title: 'Design Your Book',
    description: 'Create beautiful illustrations and design your book cover with easy-to-use tools.',
    color: 'text-storybook-blue',
    bgColor: 'bg-storybook-blue',
  },
  {
    number: '03',
    icon: <Rocket className="h-8 w-8" />,
    title: 'Publish & Share',
    description: 'With parent approval, publish your book and share it with the world.',
    color: 'text-creative-coral',
    bgColor: 'bg-creative-coral',
  },
  {
    number: '04',
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Grow Your Business',
    description: 'Track sales, engage with readers, and learn real business skills.',
    color: 'text-imagination-green',
    bgColor: 'bg-imagination-green',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-enchanted-purple mb-4">
            How It Works
          </h2>
          <p className="text-lg text-night-sky/70 max-w-2xl mx-auto">
            From imagination to published author in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-enchanted-purple via-storybook-blue to-imagination-green hidden md:block" />

            {/* Step items */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Step number circle */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full ${step.bgColor} text-white flex items-center justify-center font-bold text-lg z-10`}>
                    {step.number}
                  </div>

                  {/* Step content */}
                  <div className="flex-grow pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={step.color}>{step.icon}</span>
                      <h3 className="text-xl font-bold text-night-sky">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-night-sky/70 text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
