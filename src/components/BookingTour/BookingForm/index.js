import { useFormContext } from "@/context/FormContext";
import Confirmation from "./Confirmation";
import Payment from "./Payment";
import Summary from "./Summary";
import TourOverview from "./TourOverview";
import Traveller from "./Traveller";
import ProgressBar from "@/components/ui/ProgressBar";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";

// Progress Step List Constant
const stepList = [
  {
    step: 1,
    name: "Overview",
  },
  {
    step: 2,
    name: "Traveller",
  },
  {
    step: 3,
    name: "Summary",
  },
  {
    step: 4,
    name: "Payment",
  },
  {
    step: 5,
    name: "Confirmation",
  },
];

export default function BookingForms() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const isReady = router.isReady;

  // return URL valid
  const { status_id, billcode, order_id } = router.query;
  const returnURL = status_id && billcode && order_id;
  const data = { status_id, billcode, order_id, ...router.query };

  useEffect(() => {
    if (returnURL) setStep(5);
  }, [isReady, returnURL]);

  const backStep = () => setStep((prev) => prev - 1);
  const nextStep = () => setStep((prev) => prev + 1);

  // const [isDirty, setIsDirty] = useState(false);

  // useBeforeUnload(isDirty);

  if (!isReady) return <Loading />;

  // useEffect(() => {
  //   if (formData != formInitialData) {
  //     setIsDirty(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData]);

  return (
    <div className="md:p-10 md:mx-10 md:mt-10 shadow-xl">
      <ProgressBar stepList={stepList} step={step} />

      <div>
        {isReady && !returnURL && (
          <>
            {step === 1 && <TourOverview nextStep={nextStep} />}
            {step === 2 && <Traveller nextStep={nextStep} backStep={backStep} />}
            {step === 3 && <Summary nextStep={nextStep} backStep={backStep} />}
            {step === 4 && <Payment nextStep={nextStep} backStep={backStep} />}
          </>
        )}

        {returnURL && step === 5 && <Confirmation data={data} />}
      </div>
    </div>
  );
}
