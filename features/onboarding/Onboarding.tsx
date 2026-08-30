"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import { MoveRight } from "lucide-react";
import { useOnboarding } from "./hooks/useOnboardingHook";

export default function Onboarding() {
  const {
    selectedRoute,
    setSelectedRoute,
    selectedStop,
    setSelectedStop,
    name,
    setName,
    currentStep,
    handleNextStep,
    handleBackStep,
  } = useOnboarding();

  // useEffect(() => {
  //   console.log("Detected selectedRoute change:", selectedRoute);
  //   console.log("Detected selectedStop change:", selectedStop);
  // }, [selectedRoute, selectedStop]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between pt-14">
      <div className="flex w-full items-center relative px-8 gap-2">
        <Button
          onClick={handleBackStep}
          disabled={currentStep === 1}
          variant="ghost"
          size="icon"
          className="absolute shrink-0 -left-px rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-300"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Progress value={currentStep * 100} className="w-full" />
        <Progress value={(currentStep - 1) * 100} className="w-full" />
      </div>
      {currentStep === 1 && (
        <FirstPage
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      )}
      {currentStep === 2 && <SecondPage name={name} setName={setName} />}
      <div
        className={`flex w-full h-full gap-0 ${currentStep == 2 && "gap-2"} flex-col items-center mb-5`}
      >
        <Button
          onClick={handleNextStep}
          className="w-full max-w-xs h-14 text-2xl "
        >
          Next
        </Button>
        {currentStep == 2 && (
          <Button
            onClick={handleNextStep}
            className="w-full max-w-xs h-14 text-2xl bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}
