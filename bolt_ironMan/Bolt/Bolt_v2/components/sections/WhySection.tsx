import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const reasons = [
  {
    title: "Genius-Level Interface",
    description: "Designed for brilliant young minds (ages 8-14)",
    icon: "🧠",
  },
  {
    title: "Advanced Safety Protocols",
    description: "Parent-approved security systems",
    icon: "🔒",
  },
  {
    title: "Story Engineering",
    description: "Learn professional-grade narrative construction",
    icon: "⚙️",
  },
  {
    title: "Production-Ready Output",
    description: "Create launch-ready books",
    icon: "📚",
  },
  {
    title: "Arc Reactor Core",
    description: "Advanced tech simplified for young geniuses",
    icon: "⚛️",
  },
  {
    title: "Inventor Network",
    description: "Connect with other young story engineers",
    icon: "🔗",
  },
];

export function WhySection() {
  return (
    <section className="bg-[#121212] py-24">
      <Container>
        <SectionTitle 
          title="Why This Is Your Ultimate Creative Workshop" 
          highlight
          className="text-center"
        />
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg border border-[#C5C5C5]/20 bg-[#2A2A2A]/60 p-6 transition-all duration-300 hover:border-[#FFB300]/50 hover:shadow-[0_0_15px_rgba(255,179,0,0.3)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#E3000B] to-[#FF4B4B]">
                <span className="text-2xl">{reason.icon}</span>
              </div>
              
              <h3 className="mb-2 text-lg font-bold text-[#FFB300] transition-colors duration-300 group-hover:text-[#64F3FF]">
                {reason.title}
              </h3>
              
              <p className="text-[#C5C5C5]">{reason.description}</p>
              
              {/* Tech circuit line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}