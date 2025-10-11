import Payment from "@/components/Payment";
import Summary from "@/components/Summary";
import TourOverview from "@/components/TourOverview";
import Traveller from "@/components/Traveller";
import ProgressBar from "@/components/ui/ProgressBar";
import { useFormData } from "@/context/FormContext";
import React from "react";

export default function FormStep() {
  const { step } = useFormData();

  const stepList = [
    {
      step: 1,
      name: "Overview",
    },
    {
      step: 2,
      name: "Traveller",
    },
    {
      step: 3,
      name: "Summary",
    },
    {
      step: 4,
      name: "Payment",
    },
  ];

  return (
    <div className="p-4">
      <ProgressBar stepList={stepList} step={step} />

      <div>
        {step && <h1>{stepList[step - 1].name}</h1>}
        {step === 1 && <TourOverview />}
        {step === 2 && <Traveller />}
        {step === 3 && <Summary />}
        {step === 4 && <Payment />}
      </div>
    </div>
  );
}
