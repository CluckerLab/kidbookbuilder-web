"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className,
  hoverEffect = true,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card
        className={cn(
          "overflow-hidden border-2 border-soft-cloud bg-white transition-all duration-300",
          hoverEffect &&
            "hover:shadow-lg hover:shadow-enchanted-purple/10 hover:border-enchanted-purple/20 hover:-translate-y-1",
          className
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
};