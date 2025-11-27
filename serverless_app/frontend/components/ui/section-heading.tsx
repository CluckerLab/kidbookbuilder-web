import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  sparkles?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  sparkles = false,
  className,
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("mb-12", alignmentClasses[align], className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative inline-block text-enchanted-purple">
        {sparkles && (
          <span className="absolute -left-6 top-0">
            <Sparkles className="text-dream-gold w-5 h-5" />
          </span>
        )}
        {title}
        {sparkles && (
          <span className="absolute -right-6 top-0">
            <Sparkles className="text-dream-gold w-5 h-5" />
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-night-sky/80 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};