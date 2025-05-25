import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  className?: string;
  highlight?: boolean;
}

export function SectionTitle({ 
  title, 
  className,
  highlight = false 
}: SectionTitleProps) {
  return (
    <h2 
      className={cn(
        "relative mb-8 text-3xl font-bold md:text-4xl lg:text-5xl",
        {
          "inline-block bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] bg-clip-text text-transparent": highlight,
          "text-[#FFFFFF]": !highlight
        },
        className
      )}
    >
      {title}
      {highlight && (
        <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#E3000B] to-[#FF4B4B]"></span>
      )}
    </h2>
  );
}