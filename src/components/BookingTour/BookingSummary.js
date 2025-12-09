import { useFormContext } from "@/context/FormContext";
import { useTourContext } from "@/context/TourContext";
import React from "react";
import Loading from "../ui/Loading";
import { formatPrice } from "@/utils/utils";
import { paymodeList, roomType } from "./BookingForm/TourOverview";

function BookingSummary({ bookingSummaryData }) {
  const { formData } = useFormContext();

  const { tourDepDetail } = useTourContext();
  const { dtDep, tourPkg, code } = tourDepDetail;
  const { nameEn } = tourPkg;

  if (Object.keys(bookingSummaryData).length === 0) return <Loading text="loading summary" />;

  // console.log(formData);
  const { beforeDiscount, afterDiscount, deposit, summary, promocode, promoCodeDiscountAmount, adminCharges, paymode } = bookingSummaryData;

  const remainingBalance = afterDiscount - deposit;
  // console.log("beforeDiscount :", beforeDiscount);
  // console.log("afterDiscount :", afterDiscount);
  // console.log("deposit :", deposit);
  console.log("bookingSummaryData :", bookingSummaryData);
  console.log("summary :", summary);
  // console.log("promoCodeDiscountAmount :", promoCodeDiscountAmount);
  // console.log("adminCharges :", adminCharges);

  return (
    <div className="lg:sticky r-0 top-0 p-10 shadow-xl flex flex-col gap-4 h-screen overflow-y-auto">
      <h4 style={{ fontWeight: "bold" }}>Booking Summary</h4>
      <div>
        <div className="font-bold text-primary-dark">
          <p>{nameEn}</p>
          <p>({code})</p>
        </div>
        <p className="text-sm">Travel Date : {dtDep}</p> <p className="text-sm">{paymodeList[paymode]}</p>
      </div>

      {/* add on */}
      <hr />
      {summary.map((room, i) => (
        <div key={i} className="">
          <span className="text-primary-dark font-bold">
            Room {room.roomNo} ({roomType.find((item) => item.value === room.roomType)?.label})
          </span>

          {room.details.map((detail, j) => (
            <div key={j} className="text-sm">
              <span>
                {detail.passengerType} ({detail.type})
              </span>
              <span> x </span>
              <span>{detail.count}</span>
            </div>
          ))}
        </div>
      ))}

      <hr />

      {/* add on end */}

      {promocode && (
        <>
          <div>
            <span className="font-bold text-primary-dark">Discount</span>
            <div className="flex justify-between text-sm">
              <span>{promocode}</span>
              <span> - {formatPrice(promoCodeDiscountAmount)}</span>
            </div>
          </div>
          <hr />
        </>
      )}

      <div>
        <div className="flex justify-between">
          <span>Admin Charges</span>
          <span>{formatPrice(adminCharges)}</span>
        </div>
        {paymode == 1 && (
          <div className="flex justify-between">
            <span>Deposit (Pay Now) </span>
            <span>{paymode == 0 ? 0 : formatPrice(deposit)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Gross Total </span>
          <span>{formatPrice(beforeDiscount)}</span>
        </div>
      </div>

      <hr />

      <div className="flex flex-row items-center justify-between font-bold">
        <span className="text-primary-dark">Net Total</span>
        <span className="text-xl  text-red-800">{paymode == 0 ? formatPrice(afterDiscount) : formatPrice(deposit)} </span>
      </div>
      {paymode == 1 && remainingBalance > 0 && (
        <div className="flex flex-row items-center justify-between font-bold">
          <span className="text-primary-dark">Remaining Balance</span>
          <span className="text-xl  text-red-800">{formatPrice(remainingBalance)} </span>
        </div>
      )}
    </div>
  );
}

export default React.memo(BookingSummary);
