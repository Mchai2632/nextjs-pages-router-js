import React from "react";

// context provider
import { FormProvider } from "@/context/FormContext";
import { TourProvider } from "@/context/TourContext";
// ui
import Loading from "@/components/ui/Loading";

// components
import BookingForms from "@/components/BookingTour/BookingForm";

export default function PaymentStatus() {
  return (
    <FormProvider>
      <div className="px-3 md:px-6 xl:px-20 py-10 relative">
        <h1 className="mx-10">PAYMENT OVERVIEW</h1>
        <div className="relative flex flex-col lg:grid md:grid-cols-12">
          <div className="col-span-8 flex flex-col flex-2">
            <BookingForms />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
