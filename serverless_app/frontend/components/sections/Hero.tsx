"use client";

import { Button } from '@/components/ui/Button';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('signup-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-enchanted-purple/5 to-white py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-dream-gold/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-enchanted-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-storybook-blue/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-md">
            <div className="text-xl font-bold text-enchanted-purple">KidBookBuilder</div>
            <Button variant="ghost" size="sm" onClick={scrollToForm}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-enchanted-purple leading-tight mb-6">
            Move Over, Lemonade Stands.{' '}
            <span className="text-storybook-blue">Your Kid&apos;s Next Big Idea Is a Book.</span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-night-sky/80">
            Where Young Storytellers Build Their First Business Adventure
          </p>

          <p className="text-lg mb-8 text-night-sky/60 max-w-2xl mx-auto">
            The platform where young writers become young entrepreneurs. Transform imagination into published stories and learn real business skills along the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToForm} className="group">
              Sign Up Your Kid
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-enchanted-purple/50" />
      </div>
    </section>
  );
}
