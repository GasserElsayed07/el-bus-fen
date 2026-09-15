"use client";

import { ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import { useOnboarding } from "./hooks/useOnboardingHook";

export default function Onboarding() {
  const {
    selectedRoute,
    handleRouteChange,
    selectedStop,
    setSelectedStop,
    name,
    setName,
    currentStep,
    handleNextStep,
    handleBackStep,
    showRouteWarning,
    showStopWarning,
  } = useOnboarding();

  // useEffect(() => {
  //   console.log("Detected selectedRoute change:", selectedRoute);
  //   console.log("Detected selectedStop change:", selectedStop);
  // }, [selectedRoute, selectedStop]);
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-5 py-6 sm:px-8">
      <div className="flex w-full max-w-2xl items-center gap-3">
        <Button
          onClick={handleBackStep}
          disabled={currentStep === 1}
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-300"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Progress
          value={currentStep >= 1 ? 100 : 0}
          className="w-full **:data-[slot=progress-track]:h-1.5 **:data-[slot=progress-indicator]:bg-primary"
        />
        <Progress
          value={currentStep >= 2 ? 100 : 0}
          className="w-full **:data-[slot=progress-track]:h-1.5 **:data-[slot=progress-indicator]:bg-primary"
        />
      </div>
      <main className="flex w-full max-w-2xl flex-1 items-center justify-center">
        {currentStep === 1 && (
          <FirstPage
            selectedStop={selectedStop}
            setSelectedStop={setSelectedStop}
            selectedRoute={selectedRoute}
            setSelectedRoute={handleRouteChange}
            showRouteWarning={showRouteWarning}
            showStopWarning={showStopWarning}
          />
        )}
        {currentStep === 2 && <SecondPage name={name} setName={setName} />}
      </main>
      <div className="flex w-full max-w-xs flex-col items-center gap-2 pb-2">
        <Button onClick={handleNextStep} className="h-12 w-full text-base">
          Next
        </Button>
        {currentStep == 2 && (
          <Button
            onClick={handleNextStep}
            className="h-12 w-full bg-gray-200 text-base text-gray-800 hover:bg-gray-300 hover:text-gray-900"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}
