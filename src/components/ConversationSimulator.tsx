
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";
import { generateAdvice, Advice } from "@/utils/adviceGenerator";
import NotificationDisplay from "./NotificationDisplay";
import AnimatedTransition from "./AnimatedTransition";

interface ConversationSimulatorProps {
  partnerInfo: string[];
  onReset: () => void;
  className?: string;
}

const ConversationSimulator: React.FC<ConversationSimulatorProps> = ({
  partnerInfo,
  onReset,
  className,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (!isListening) return;

    // This simulates speech recognition by displaying pre-set phrases over time
    const phrases = [
      "Hey, I wanted to talk about yesterday...",
      "I was really annoyed when you didn't call me back.",
      "You never seem to prioritize our plans.",
      "I feel like you're always on your phone when we're together.",
      "Whatever, it doesn't matter anymore.",
    ];

    let currentPhraseIndex = 0;
    let charIndex = 0;
    let currentPhrase = phrases[currentPhraseIndex];

    const typingInterval = setInterval(() => {
      if (charIndex < currentPhrase.length) {
        setTranscript(prev => prev + currentPhrase.charAt(charIndex));
        charIndex++;
      } else if (currentPhraseIndex < phrases.length - 1) {
        // Move to the next phrase after a pause
        setTimeout(() => {
          setTranscript(prev => prev + " ");
          currentPhraseIndex++;
          currentPhrase = phrases[currentPhraseIndex];
          charIndex = 0;
        }, 1000);
      } else {
        // End of all phrases
        clearInterval(typingInterval);
      }
    }, 100);

    // Simulate advice generation after a few seconds
    const adviceDelay = setTimeout(() => {
      const newAdvice = generateAdvice(transcript, partnerInfo);
      if (newAdvice) {
        // Simulate haptic feedback with visual pulse
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 300);
        
        setAdvice(newAdvice);
      }
    }, 3000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(adviceDelay);
    };
  }, [isListening, partnerInfo]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setTranscript("");
      setAdvice(null);
      setIsListening(true);
    }
  };

  const dismissAdvice = () => {
    setAdvice(null);
  };

  return (
    <div className={cn("flex flex-col h-full relative p-2", className)}>
      <div className={cn(
        "absolute inset-0 flex items-center justify-center", 
        pulseAnimation ? "animate-pulse-subtle" : ""
      )}>
        <AnimatedTransition
          show={!isListening && !transcript}
          animationType="fade"
          className="text-center p-4"
        >
          <div className="chip text-harmony-light mb-3">HarmonyAI</div>
          <h3 className="text-xs font-medium text-harmony-light mb-2">Ready to assist</h3>
          <p className="text-[10px] text-harmony-light/70 mb-4">
            Tap the microphone to start analyzing your conversation
          </p>
          <button
            onClick={toggleListening}
            className="w-10 h-10 rounded-full bg-harmony-accent flex items-center justify-center text-white"
          >
            <Mic size={18} />
          </button>
        </AnimatedTransition>
      </div>

      <AnimatedTransition
        show={isListening || !!transcript}
        animationType="fade"
        className="flex flex-col h-full"
      >
        {isListening && (
          <div className="flex justify-between items-center mb-2">
            <div className="chip text-harmony-light">Listening</div>
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 bg-harmony-accent rounded-full animate-pulse"></span>
              <span className="w-1.5 h-1.5 bg-harmony-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-1.5 h-1.5 bg-harmony-accent rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto text-[10px] text-harmony-light/90 mb-2">
          {transcript}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onReset}
            className="px-2 py-1 rounded text-[10px] bg-harmony-light/10 text-harmony-light"
          >
            Reset
          </button>
          
          <button
            onClick={toggleListening}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isListening 
                ? "bg-harmony-accent text-white" 
                : "bg-harmony-light/10 text-harmony-light"
            )}
          >
            {isListening ? <MicOff size={14} /> : <Mic size={14} />}
          </button>
        </div>

        <NotificationDisplay advice={advice} onDismiss={dismissAdvice} />
      </AnimatedTransition>
    </div>
  );
};

export default ConversationSimulator;
