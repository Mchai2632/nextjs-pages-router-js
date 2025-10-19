import { useFormData } from "@/context/FormContext";
import Confirmation from "./Confirmation";
import Payment from "./Payment";
import Summary from "./Summary";
import TourOverview from "./TourOverview";
import Traveller from "./Traveller";
import ProgressBar from "@/components/ui/ProgressBar";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import React, { useEffect, useState } from "react";

// Progress Step List Constant
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
  {
    step: 5,
    name: "Confirmation",
  },
];

export default function Forms() {
  const { formInitialData, formData, step } = useFormData();

  const [isDirty, setIsDirty] = useState(false);

  useBeforeUnload(isDirty);

  useEffect(() => {
    if (formData != formInitialData) {
      setIsDirty(true);
    }
  }, [formData]);

  return (
    <div className="p-4 ">
      <ProgressBar stepList={stepList} step={step} />

      <div>
        {step && <h2>{stepList[step - 1].name}</h2>}
        {step === 1 && <TourOverview />}
        {step === 2 && <Traveller />}
        {step === 3 && <Summary />}
        {step === 4 && <Payment />}
        {step === 5 && <Confirmation />}
      </div>
    </div>
  );
}
