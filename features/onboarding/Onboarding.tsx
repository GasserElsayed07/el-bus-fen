"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import { MoveRight } from "lucide-react";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  function handleNextStep() {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
    if (currentStep === 2) {
      // go to the map page
    }
  }

  function handleBackStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-between pt-14 min-h-screen">
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
        />
      )}
      {currentStep === 2 && <SecondPage />}
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
