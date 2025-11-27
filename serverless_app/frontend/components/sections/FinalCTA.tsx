"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonMagic } from "@/components/ui/button-magic";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: '',
    parentEmail: '',
    childName: '',
    childAge: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

      const response = await fetch(`${API_URL}/signups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: formData.name,
          parentEmail: formData.parentEmail,
          childName: formData.childName,
          childAge: parseInt(formData.childAge, 10)
        })
      });

      if (response.ok) {
        console.log("Form successfully submitted");
        setIsSubmitted(true);
        setFormData({ name: '', parentEmail: '', childName: '', childAge: '' });
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="join-form" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/06-cta-background.png"
          alt="Publishing adventure background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-enchanted-purple/70 backdrop-blur-sm" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-dream-gold text-dream-gold" />
            ))}
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Publishing Adventure?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            Join other young authors who are turning their stories into successful businesses
          </p>

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto mb-12"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
              >
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Parent's Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-dream-gold/50 focus:border-dream-gold/50"
                  />
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="Parent's Email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-dream-gold/50 focus:border-dream-gold/50"
                  />
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-dream-gold/30 to-transparent my-4"></div>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="Child's Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-dream-gold/50 focus:border-dream-gold/50"
                  />
                  <input
                    type="number"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Child's Age"
                    required
                    min="0"
                    max="18"
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-dream-gold/50 focus:border-dream-gold/50"
                  />
                  <ButtonMagic
                    type="submit"
                    size="lg"
                    variant="gold"
                    className="w-full text-night-sky font-bold flex items-center justify-center"
                    sparkles
                  >
                    <span className="flex items-center">
                      Begin Your Child's Author Journey
                      <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                    </span>
                  </ButtonMagic>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 mb-12"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-dream-gold/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-dream-gold flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-night-sky" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-dream-gold/20 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-dream-gold/30"></div>
              </div>
              
              <div className="text-xl font-bold mb-2 text-white">Thank You for Joining!</div>
              <p className="text-white/90 mb-6">We'll be in touch with all the details to get your child's publishing journey started.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://app.kidbookbuilder.com/" target="_blank">
                  <ButtonMagic variant="default" className="w-full sm:w-auto flex items-center justify-center">
                    <span className="flex items-center">
                      Access the App
                      <ExternalLink className="ml-2 h-4 w-4 inline-block" />
                    </span>
                  </ButtonMagic>
                </Link>
              </div>
            </motion.div>
          )}
          
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-dream-gold">1,500+</div>
              <div className="text-sm text-white/80">Young Authors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-dream-gold">5,000+</div>
              <div className="text-sm text-white/80">Stories Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-dream-gold">10,000+</div>
              <div className="text-sm text-white/80">Books Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-dream-gold">98%</div>
              <div className="text-sm text-white/80">Happy Parents</div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <TestimonialBadge
              name="Emma, 9"
              quote="I published my first book about dragon princesses and made $50!"
            />
            <TestimonialBadge
              name="Tyler, 12"
              quote="My adventure series has 5 books now and real fans!"
            />
            <TestimonialBadge
              name="Parent"
              quote="The business skills are as valuable as the creative ones."
            />
          </div>

          <div className="mt-12">
            <Link href="https://app.kidbookbuilder.com" target="_blank">
              <ButtonMagic
                size="lg"
                variant="gold"
                className="w-full text-night-sky font-bold flex items-center justify-center"
                sparkles
              >
                <span className="flex items-center">
                  Start Building Your Book
                  <ExternalLink className="ml-2 h-5 w-5 inline-block" />
                </span>
              </ButtonMagic>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialBadge({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center max-w-xs">
      <div className="text-sm">
        <span className="text-dream-gold font-medium">{name}: </span>
        <span className="text-white/90">{quote}</span>
      </div>
    </div>
  );
}