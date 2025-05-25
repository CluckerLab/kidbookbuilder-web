import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PowerUpSection } from "@/components/sections/PowerUpSection";
import { WhySection } from "@/components/sections/WhySection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      
      <div id="hero">
        <HeroSection />
      </div>
      
      <div id="features">
        <FeaturesSection />
      </div>
      
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      
      <div id="power-up">
        <PowerUpSection />
      </div>
      
      <div id="why">
        <WhySection />
      </div>

      <div id="cta">
        <CTA 
          title="Ready to Start Creating?"
          subtitle="Join our community of storytellers and bring your children's books to life"
        />
      </div>
      
      <Footer />
    </main>
  );
}