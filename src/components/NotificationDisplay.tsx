
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "./AnimatedTransition";
import { Advice } from "@/utils/adviceGenerator";

interface NotificationDisplayProps {
  advice: Advice | null;
  onDismiss: () => void;
  className?: string;
}

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({
  advice,
  onDismiss,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (advice) {
      setVisible(true);
    }
  }, [advice]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  if (!advice) return null;

  const typeStyles = {
    warning: "border-l-amber-500",
    suggestion: "border-l-sky-500",
    positive: "border-l-emerald-500",
  };

  const typeIcons = {
    warning: "⚠️",
    suggestion: "💡",
    positive: "✓",
  };

  return (
    <AnimatedTransition
      show={visible}
      animationType="slide-up"
      className={cn(
        "absolute bottom-2 left-2 right-2 p-2 rounded-lg glassmorphism shadow-notification border-l-2",
        typeStyles[advice.type],
        className
      )}
    >
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs">
          <span className={`${advice.type === 'positive' ? 'text-emerald-500' : ''}`}>
            {advice.type === 'warning' && (
              <div className="w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">!</div>
            )}
            {advice.type === 'suggestion' && (
              <div className="w-3 h-3 bg-sky-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">i</div>
            )}
            {advice.type === 'positive' && (
              <div className="w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">✓</div>
            )}
          </span>
        </div>
        <div className="flex-1 text-[10px] text-harmony-light leading-tight">
          {advice.message}
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="w-full text-center text-[10px] text-harmony-accent mt-2 pt-1 border-t border-harmony-light/10"
      >
        Dismiss
      </button>
    </AnimatedTransition>
  );
};

export default NotificationDisplay;
