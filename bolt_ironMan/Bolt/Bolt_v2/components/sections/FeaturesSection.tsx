import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const features = [
  {
    title: "Arc Reactor Story Core",
    description: "Your workshop's arc-reactor powered core processor serves as your personal creative co-pilot. This advanced assistant analyzes story patterns, suggests creative enhancements, and ensures your narrative flows with perfect energy. You're the genius in charge – your AI assistant amplifies your creative potential with cutting-edge story optimization protocols.",
    icon: "/images/02-quantum-core-icon.png",
    emoji: "🔷",
  },
  {
    title: "Power Enhancement Protocols",
    description: "Level up your storytelling powers through 10 progressive enhancement stages. Each power upgrade unlocks new creative capabilities – from basic story construction to advanced world-building protocols. Watch your creative arsenal grow more sophisticated with each reactor-powered enhancement.",
    icon: "/images/03-protocols-icon.png",
    emoji: "⚡️",
  },
  {
    title: "Holographic Workshop Interface",
    description: "Command your creative workspace with holographic precision. Design book covers and illustrations using advanced projection tech simplified for young inventors. Your 3D workspace lets you manipulate story elements and artwork with the same intuitive control as a master inventor in their workshop.",
    icon: "/images/04-workshop-interface-icon.png",
    emoji: "🎯",
  },
  {
    title: "Arc Reactor Achievement System",
    description: "Power your creative journey with our Arc Reactor achievement core. Each story milestone and writing achievement charges your reactor, unlocking new abilities and rewards. Track your power levels, earn enhancement badges, and showcase your growing creative arsenal to your fellow young geniuses.",
    icon: "/images/05-achievement-icon.png",
    emoji: "🌟",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[#121212] py-24">
      <Container>
        <SectionTitle 
          title="Your Workshop Arsenal" 
          highlight
          className="text-center"
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              emoji={feature.emoji}
              className="transform transition-transform duration-500 hover:-translate-y-2"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}