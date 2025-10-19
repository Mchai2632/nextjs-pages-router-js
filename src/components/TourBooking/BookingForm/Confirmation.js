import React from "react";
import { useRouter } from "next/router";
import { useFormData } from "@/context/FormContext";
import Button from "@/components/ui/Button";

export default function Confirmation() {
  const { clearForm, backStep } = useFormData();
  const router = useRouter();

  const getConfirmation = () => {
    // get status from the backend

    let backendStatus = "success"; // example status

    try {
      if (backendStatus === "success") {
        return "Booking Successful !";
      }
      if (backendStatus === "failed") return "Booking Failed ! ";
      if (backendStatus === "pending") return "Booking Pending..";
    } catch (err) {
      console.error(err);
      return "Booking Failed !";
    }
  };

  return (
    <div>
      <h2>{getConfirmation()}</h2>

      <div>
        <Button onClick={backStep}>Back</Button>
        {/* <Button onClick={() => alert("Booked!")}>Book</Button> */}
        <Button
          onClick={() => {
            clearForm();
            router.push("/");
          }}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
