import React, { useState } from "react";
import { useRouter } from "next/router";

// context provider
import { FormProvider } from "@/context/FormContext";
import { TourProvider } from "@/context/TourContext";
// ui
import Loading from "@/components/ui/Loading";

// hooks api
import useTourDepDetail from "@/hooks/api/useTourDepDetail";

// components
import BookingForms from "@/components/BookingTour/BookingForm";
import BookingSummary from "@/components/BookingTour/BookingSummary";
import DetailsCard from "@/components/BookingTour/DetailsCard";
import CountdownHeader from "@/components/ui/CountDownHeader";
import useToyyibPayConfig from "@/hooks/api/useToyyibPayConfig";
import useCountryList from "@/hooks/api/useCountryList";
import useTitleList from "@/hooks/api/useTitleList";
import useStateList from "@/hooks/api/useStateList";
import useEcRelationship from "@/hooks/api/useEcRelationship";

export default function BookingTourPage() {
  const router = useRouter();
  const { idBase, idCompany } = router.query; // access the query parameter "id"
  const isReady = router.isReady;

  const [bookingSummaryData, setBookingSummaryData] = useState({});
  const [globalData, setGlobalData] = useState({}); // global data pass by children

  // ** check toyyibpay status from backend **
  // if success continue, if failed router.back()
  const { data: toyyibConfig } = useToyyibPayConfig();
  const bankSetupStatus = toyyibConfig?.toyyibpayConfigList[0].bankSetupStatus;

  const { tourDepDetail, loading, error, refetch } = useTourDepDetail({
    idBase,
    idCompany,
    enabled: isReady, // optional：confirm that router is ready then execute
  });
  const { countryList } = useCountryList();
  const { titleList } = useTitleList();
  const { stateList } = useStateList();
  const { ecRelationshipList } = useEcRelationship();

  if (!isReady || loading)
    return (
      <div className="w-full h-screen">
        <Loading text="loading tourDepDetail..." />
      </div>
    );

  if (error || !tourDepDetail) {
    return (
      <div className="p-4 text-red-600">
        <p>{error || "No tour details available."}</p>
        <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={refetch}>
          Retry
        </button>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => router.back()}>
          Back
        </button>
      </div>
    );
  }

  // console.log(bankSetupStatus);
  // console.log(globalData);

  return (
    <TourProvider
      value={{
        tourDepDetail,
        toyyibConfig,
        countryList,
        titleList,
        stateList,
        ecRelationshipList,
        setBookingSummaryData,
        bookingSummaryData,
        globalData,
        setGlobalData,
      }}
    >
      {/* {bankSetupStatus != "Y" && (
        <div className="fixed flex justify-center items-center z-200 w-full h-full bg-gray-600/50">
          <div className="h-[50%] w-[50%] bg-white flex flex-col p-4">
            <div>
              <p>BankSetupStatus is 'N'</p>
              <p>You should back to the page</p>
            </div>
            <Button className="w-fit" onClick={() => router.back()}>
              back
            </Button>
          </div>
        </div>
      )} */}

      <FormProvider>
        {/* <BookingProvider> */}
        <div className="px-3 md:px-6 xl:px-20 py-10 relative w-full">
          <CountdownHeader />
          <h1 className="mx-10">Make A Booking</h1>
          <div className="relative flex flex-col lg:grid md:grid-cols-12">
            <div className="col-span-8 flex flex-col flex-2">
              <DetailsCard />
              <BookingForms />
            </div>
            <div className="relative col-span-4">
              <BookingSummary bookingSummaryData={bookingSummaryData} />
            </div>
          </div>
        </div>
        {/* <TermsPopup isOpen={isTermsPopupOpen} onClose={setIsTermsPopupOpen} /> */}
      </FormProvider>
    </TourProvider>
  );
}
