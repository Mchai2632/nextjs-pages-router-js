import { useFormData } from "@/context/FormContext";
import React from "react";
import Button from "./ui/Button";

export default function TourOverview() {
  const { nextStep } = useFormData();
  return (
    <div className="flex flex-col">
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
}
