import { useFormContext } from "@/context/FormContext";
import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import { generatePaymentIntent } from "@/utils/toyyibpay";
import { useTourContext } from "@/context/TourContext";

const paymentMethods = [
  {
    id: 1,
    name: "FPX",
  },
];

export default function Payment({ nextStep, backStep }) {
  const { setFormData, formData } = useFormContext();
  const { globalData, bookingSummaryData, tourDepDetail } = useTourContext();

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);

  const step1 = formData.step1;
  const step2 = formData.step2;

  const { givenName, email, contactNo, addressLine1, addressLine2, postcode, state, idCountry, idBooking } = formData.step2.data;
  console.log(step1);
  console.log(step2);
  console.log(globalData);

  console.log(bookingSummaryData);

  const handleCheckout = async () => {
    // create booking

    const totalamount = bookingSummaryData.paymode == 0 ? bookingSummaryData.afterDiscount : bookingSummaryData.deposit;

    const paymentForm = generatePaymentIntent({
      amount: totalamount,
      customer_name: givenName,
      email: email,
      contact_number: contactNo,
      address: `${addressLine1 || ""} ${addressLine2 || ""}`,
      postcode: postcode,
      state: state,
      country: idCountry,
      reference_number: idBooking,
      description: tourDepDetail?.tourPkg.nameEn || "Wanderlust Tour Package",
      return_url: `${window.location.origin}/booking-tour/payment_status`,
    });

    console.log(paymentForm);

    const response = await fetch("/api/payment/createBill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentForm),
    });

    console.log(response);

    const res_json = await response.json();

    console.log(res_json);

    if (res_json?.status === 1 && res_json.data) {
      // for toyyibpay problem
      const raw = res_json.data;
      const jsonPart = raw.substring(raw.lastIndexOf("[{")); // 取最後的 JSON 片段
      const billData = JSON.parse(jsonPart);
      console.log(billData[0].BillCode);
      const billCode = billData[0].BillCode;

      // let billcode = res_json.data.trim();
      // billcode = JSON.parse(billcode);
      // console.log(billcode);
      location.href = `https://dev.toyyibpay.com/${billCode}`;
    } else {
      alert("what happed");
    }
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
                  checked={paymentMethod === method.id || false}
                  onChange={() => setPaymentMethod(() => method.id)}
                />
                <div className="w-10 h-10 bg-amber-600"></div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col w-fit">
        {/* <Button onClick={backStep}>Back</Button> */}
        {/* <Button onClick={nextStep}>Next</Button> */}
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
}
