import { useFormData } from "@/context/FormContext";
import React from "react";
import Button from "./ui/Button";

export default function Traveller() {
  const { backStep, nextStep } = useFormData();
  return (
    <div>
      <Button onClick={backStep}>Back</Button>
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
}
