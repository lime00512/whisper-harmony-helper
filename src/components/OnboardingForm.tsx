
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "./AnimatedTransition";

interface OnboardingFormProps {
  onComplete: (partnerInfo: string[]) => void;
  className?: string;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  onComplete,
  className,
}) => {
  const [step, setStep] = useState(0);
  const [partnerInfo, setPartnerInfo] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const questions = [
    "What upsets your partner?",
    "What calms your partner?",
    "How do they prefer to resolve conflicts?",
  ];

  const handleNext = () => {
    if (currentInput.trim()) {
      const newPartnerInfo = [...partnerInfo, currentInput.trim()];
      setPartnerInfo(newPartnerInfo);
      setCurrentInput("");
      
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        onComplete(newPartnerInfo);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  return (
    <div className={cn("flex flex-col h-full p-2", className)}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <div className="chip text-harmony-light">
          {step + 1}/{questions.length}
        </div>
        
        <AnimatedTransition 
          show={true}
          animationType="slide-up"
          className="text-center"
        >
          <h3 className="text-xs font-medium text-harmony-light mb-3">
            Tell us about your partner
          </h3>
          <p className="text-xs text-harmony-light/90 mb-3">
            {questions[step]}
          </p>
        </AnimatedTransition>
        
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 text-xs rounded-md bg-harmony-light/10 border border-harmony-light/20 text-harmony-light outline-none focus:ring-1 focus:ring-harmony-accent"
          placeholder="Type here..."
          autoFocus
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!currentInput.trim()}
        className={cn(
          "w-full py-1 rounded-full text-xs font-medium transition-all duration-300",
          currentInput.trim()
            ? "bg-harmony-accent text-white"
            : "bg-harmony-neutral/30 text-harmony-light/50"
        )}
      >
        {step < questions.length - 1 ? "Next" : "Complete"}
      </button>
    </div>
  );
};

export default OnboardingForm;
