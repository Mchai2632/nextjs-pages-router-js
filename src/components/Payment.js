import { useFormData } from "@/context/FormContext";
import React from "react";
import Button from "./ui/Button";

export default function Payment() {
  const { backStep, nextStep } = useFormData();
  return (
    <div>
      <Button onClick={backStep}>Back</Button>
      <Button onClick={() => alert("Booked!")}>Book</Button>
    </div>
  );
}
