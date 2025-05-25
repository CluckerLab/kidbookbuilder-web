import { cn } from "@/lib/utils";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  emoji?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  emoji,
  className,
}: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg border border-[#C5C5C5]/20 bg-[#2A2A2A]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#64F3FF]/50 hover:shadow-[0_0_20px_rgba(100,243,255,0.3)]", 
        className
      )}
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 md:h-20 md:w-20">
          <Image
            src={icon}
            alt={`${title} icon`}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-[#FFB300] md:text-xl">
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h3>
      </div>
      <p className="text-[#C5C5C5] md:text-base">{description}</p>
      
      {/* Arc reactor glow effect */}
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-r from-[#64F3FF]/5 to-[#0B6FFF]/5 blur-3xl"></div>
    </div>
  );
}