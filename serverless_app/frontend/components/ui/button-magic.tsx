"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Sparkles } from "lucide-react";

const buttonMagicVariants = cva(
  "relative overflow-hidden group transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-storybook-blue hover:bg-storybook-blue/90 text-white",
        purple: "bg-enchanted-purple hover:bg-enchanted-purple/90 text-white",
        gold: "bg-dream-gold hover:bg-dream-gold/90 text-night-sky",
        coral: "bg-creative-coral hover:bg-creative-coral/90 text-white",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-xl",
        lg: "h-14 px-8 py-4 rounded-xl text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonMagicProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonMagicVariants> {
  sparkles?: boolean;
}

const ButtonMagic = React.forwardRef<HTMLButtonElement, ButtonMagicProps>(
  ({ className, variant, size, sparkles = false, children, ...props }, ref) => {
    return (
      <Button
        className={cn(buttonMagicVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {sparkles && (
          <span className="absolute right-2 animate-pulse">
            <Sparkles size={16} className="opacity-70" />
          </span>
        )}
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </Button>
    );
  }
);
ButtonMagic.displayName = "ButtonMagic";

export { ButtonMagic, buttonMagicVariants };