import { useBookingData } from "@/context/BookingContext";
import { useFormData } from "@/context/FormContext";
import React from "react";

export default function BookingSummary() {
  const { total } = useBookingData();
  const { formData } = useFormData();

  return (
    <div className="w-full bg-amber-400 flex-1 p-4">
      <h1>BookingSummary</h1>
      <p>package name</p>
      <p>time date</p>
      <hr />
      {/* add on */}
      
      <div>
        <span>Admin Charges</span>
        <span>0%</span>
      </div>
      <div>
        <span>Discount</span>
        <span>RM 0.00</span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span>Gross Total</span>
        <span>RM {total}</span>
      </div>
      <div>
        <span>After Discount</span>
        <span>RM 0.00</span>
      </div>

      <hr />
      <div>
        <span> Booking deposit </span>
        <span>RM 0.00</span>
      </div>
    </div>
  );
}
