import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { getCurrentUser } from "@/features/shared/apis/getUser";
import { updateUserWithCustomFields } from "@/features/shared/repositories/user-repo";
import { redirect } from "next/navigation";

export function useOnboarding() {
  const user = useUserStore((state) => state.user);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  // I need to add a soft debounce, that will save the current selected options after the user selects them after 1s.
  // timeout 1s -> user.save(currentStateOptions)

  const setUser = useUserStore((state) => state.useUser);

  async function refetchUserAndSaveToUserStore() {
    const refreshedUser = await getCurrentUser();
    setUser(refreshedUser ?? null);
  }

  async function handleNextStep() {
    let fieldsToUpdate;
    if (currentStep == 1) {
      // hard save the current route and stop options
      // currentStep++
      fieldsToUpdate = {
        busRoute: selectedRoute,
        busStopId: selectedStop,
      };
      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep == 2) {
      fieldsToUpdate = {
        name: name,
      };
    }
    const response = await updateUserWithCustomFields(
      fieldsToUpdate ? fieldsToUpdate : {},
      user?._id,
    );
    console.log("the response from updateUserWithCustomFields: ", response);
    await refetchUserAndSaveToUserStore();
    if (currentStep == 2) redirect("/");
  }

  function handleBackStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleSkip() {
    redirect("/");
  }

  return {
    selectedRoute,
    setSelectedRoute,
    selectedStop,
    setSelectedStop,
    name,
    setName,
    currentStep,
    handleNextStep,
    handleBackStep,
  };
}
