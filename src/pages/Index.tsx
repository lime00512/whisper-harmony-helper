
import React, { useState } from "react";
import WatchFrame from "@/components/WatchFrame";
import OnboardingForm from "@/components/OnboardingForm";
import ConversationSimulator from "@/components/ConversationSimulator";
import AnimatedTransition from "@/components/AnimatedTransition";
import { ArrowRight, Info } from "lucide-react";

const Index = () => {
  const [step, setStep] = useState<"intro" | "onboarding" | "simulator">("intro");
  const [partnerInfo, setPartnerInfo] = useState<string[]>([]);

  const handleOnboardingComplete = (info: string[]) => {
    setPartnerInfo(info);
    setStep("simulator");
  };

  const handleReset = () => {
    setStep("intro");
    setPartnerInfo([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full pt-8 pb-6 px-4 sm:px-6 text-center bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-2 py-1 rounded-full bg-harmony-accent/10 text-harmony-accent text-xs font-medium mb-4">
            <Info size={12} className="mr-1" />
            <span>Concept Demo</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
            HeartneyAI
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            An intelligent assistant that helps improve communication in personal relationships
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Watch Preview */}
          <div className="flex flex-col items-center justify-center order-2 md:order-1">
            <WatchFrame size="lg" className="mb-6">
              {step === "intro" && (
                <div className="flex flex-col items-center justify-center h-full p-3 text-center">
                  <div className="chip text-harmony-light mb-2">HarmonyAI</div>
                  <h3 className="text-xs font-medium text-harmony-light mb-2">
                    Welcome
                  </h3>
                  <p className="text-[10px] text-harmony-light/70 mb-4">
                    Improve your communication with real-time analysis and personalized suggestions
                  </p>
                  <button
                    onClick={() => setStep("onboarding")}
                    className="px-3 py-1 rounded-full bg-harmony-accent text-[10px] text-white flex items-center"
                  >
                    Get Started <ArrowRight size={10} className="ml-1" />
                  </button>
                </div>
              )}
              
              {step === "onboarding" && (
                <AnimatedTransition show={true} animationType="fade">
                  <OnboardingForm onComplete={handleOnboardingComplete} />
                </AnimatedTransition>
              )}
              
              {step === "simulator" && (
                <AnimatedTransition show={true} animationType="fade">
                  <ConversationSimulator 
                    partnerInfo={partnerInfo} 
                    onReset={handleReset} 
                  />
                </AnimatedTransition>
              )}
            </WatchFrame>
            
            <div className="text-sm text-gray-500 text-center max-w-xs">
              This is a simulation of how the app would work on an Apple Watch. Try the interactive demo!
            </div>
          </div>

          {/* Information */}
          <div className="space-y-6 order-1 md:order-2">
            <AnimatedTransition show={true} animationType="slide-up" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <ol className="space-y-4 text-gray-600">
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-harmony-accent/10 text-harmony-accent font-medium mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Tell us about your partner</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Share information about your partner's communication preferences and triggers
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-harmony-accent/10 text-harmony-accent font-medium mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Start a conversation</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Activate HarmonyAI to listen when you're having an important conversation
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-harmony-accent/10 text-harmony-accent font-medium mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Receive discreet guidance</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Get subtle, personalized suggestions that help you communicate more effectively
                    </p>
                  </div>
                </li>
              </ol>
            </AnimatedTransition>

            <AnimatedTransition 
              show={true} 
              animationType="slide-up" 
              className="bg-white rounded-xl shadow-sm p-6"
              duration={600}
            >
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <h3 className="font-medium text-gray-900">Real-time Analysis</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Analyze tone, keywords, and context to detect potential conflicts
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <h3 className="font-medium text-gray-900">Personalized Advice</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Tailored suggestions based on your partner's communication style
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <h3 className="font-medium text-gray-900">Discreet Notifications</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Subtle haptic feedback and brief, actionable advice
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <h3 className="font-medium text-gray-900">Privacy-focused</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    All conversation data is processed locally on your device
                  </p>
                </div>
              </div>
            </AnimatedTransition>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 bg-white border-t border-gray-200 mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          <p>HeartneyAI — Improving relationships through better communication</p>
          <p className="mt-1 text-xs text-gray-400">Demo concept • Not for actual use</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
