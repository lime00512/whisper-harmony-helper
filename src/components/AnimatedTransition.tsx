
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTransitionProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  duration?: number;
  animationType?: "fade" | "scale" | "slide-up";
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  show,
  children,
  className,
  duration = 300,
  animationType = "fade",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!mounted) return null;

  const animationClasses = {
    fade: show ? "animate-fade-in" : "animate-fade-out",
    scale: show ? "animate-scale-in" : "animate-fade-out scale-95",
    "slide-up": show ? "animate-slide-up" : "animate-fade-out translate-y-2",
  };

  return (
    <div
      className={cn(
        animationClasses[animationType],
        `transition-all duration-${duration}`,
        className
      )}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
