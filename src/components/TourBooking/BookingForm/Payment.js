import { useFormData } from "@/context/FormContext";
import React from "react";
import Button from "../../ui/Button";

export default function Payment() {
  const { backStep, nextStep, setFormData, formData } = useFormData();
  const paymentMethods = [
    {
      id: 1,
      name: "FPX",
    },
    {
      id: 2,
      name: "Credit Card",
    },
    {
      id: 3,
      name: "Debit Card",
    },
  ];

  const handleCheckout = async () => {
    console.log("formData Checkout:", formData);
    // create booking

    const response = await fetch("/api/payment/createBill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    console.log("result：", result);

    if (response.ok) {
      alert("Booking created successfully");

      nextStep();

      // console.log("Booking created successfully");
      return;
    }

    alert("Booking failed");
  };

  return (
    <div>
      {/* Payment Method Select */}
      <div>
        <label htmlFor="">Please select your payment method</label>
        <div className="flex flex-col">
          {paymentMethods.map((method) => (
            <label key={method.id}>
              <span>{method.name}</span>
              <div className="flex">
                <input
                  type="radio"
                  name="payment_method"
                  value={method.name}
                  checked={formData.step4.payment_method === method.name}
                  onChange={(e) =>
                    setFormData((draft) => {
                      draft.step4.payment_method = e.target.value;
                    })
                  }
                />
                <div className="w-10 h-10 bg-amber-600"></div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col">
        <Button onClick={backStep}>Back</Button>
        {/* <Button onClick={nextStep}>Next</Button> */}
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
}
