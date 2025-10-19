import { useFormData } from "@/context/FormContext";
import React from "react";
import Button from "../../ui/Button";

export default function Summary() {
  const { backStep, nextStep } = useFormData();
  return (
    <div>
      <span>
        Kindly check to ensure all details are accurate before continuing, click
        the <strong>'BACK'</strong> button below to amend.
      </span>

      <div>
        <Button onClick={backStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}
