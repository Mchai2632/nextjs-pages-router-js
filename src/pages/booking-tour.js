import Payment from "@/pages/form/payment";
import Summary from "@/pages/form/summary";
import TourOverview from "@/pages/form/tour-overview";
import Traveller from "@/pages/form/traveller";
import React from "react";

export default function BookingTour() {
  //   const stepList = [
  //     {
  //       step_id: 0,
  //       step_Component,
  //     },
  //   ];

  return (
    <div>
      <TourOverview />
      {/* <TourOverview />
      <Traveller />
      <Summary />
      <Payment /> */}
    </div>
  );
}
