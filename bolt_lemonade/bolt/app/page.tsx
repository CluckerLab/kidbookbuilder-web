import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import ForWhom from "@/components/sections/ForWhom";
import SuccessPath from "@/components/sections/SuccessPath";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <ForWhom />
      <SuccessPath />
      <div id="join-form">
        <FinalCTA />
      </div>
    </main>
  );
}