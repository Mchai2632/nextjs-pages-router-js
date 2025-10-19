import { useFormData } from "@/context/FormContext";
import React from "react";
import Button from "../../ui/Button";

export default function Traveller() {
  const { backStep, nextStep } = useFormData();
  return (
    <div>
      {/* BILLING INFORMATION */}
      <div>
        <h3>BILLING INFORMATION</h3>
        <hr />
        {/* input */}
        <div></div>
      </div>

      <div>
        <Button onClick={backStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}
