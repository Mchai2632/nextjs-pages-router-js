import Forms from "@/components/TourBooking/BookingForm/Forms";
import BookingSummary from "@/components/TourBooking/BookingSummary";
import { BookingProvider } from "@/context/BookingContext";
import { FormProvider } from "@/context/FormContext";
import useTourDepDetail from "@/hooks/api/useTourDepDetail";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";

export default function BookingTour() {
  const router = useRouter();
  const { idBase, idCompany, idTourPkg } = router.query; // access the query parameter "id"
  const isReady = router.isReady;

  const { tourDepDetail, loading, error } = useTourDepDetail({
    idBase,
    idCompany,
    enabled: isReady, // 選擇性：確保 router ready 才執行
  });

  const priceList = tourDepDetail?.tourDepItemList;
  const room_code = useMemo(() => {
    if (!priceList || priceList.length === 0) return {};
    console.log("You won't let me render it again.");
    return Object.fromEntries(priceList.map((item) => [item.code, 0]));
  }, [priceList]);

  console.log(priceList);

  if (!isReady || loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!tourDepDetail) return <p>No data found</p>;

  const formInitialData = {
    step1: {
      F_NAME: "Tour Overview",
      rooms: [
        {
          id: crypto.randomUUID(),
          room_index: 1,
          // all item list get by API call
          ...room_code,
        },
      ],

      checkbox1: false,
      checkbox2: false,
      paymode: "Pay Full Amount",
      promocode: "",
    },

    step2: {
      F_NAME: "Traveller",
      bill_info: {
        first_name: "",
        surname: "",
        nickname: "",
        title: "",
        gender: "",
        contact: "",
        email: "",
        address1: "",
        address2: "",
        postcode: "",
        state: "",
        country_region: "",
        checkbox1: "",
      },
      emer_contact: {
        first_name: "",
        surname: "",
        contact: "",
        email: "",
        relationship: "",
      },
      passenger_details: {
        room1_traveller1: {
          given_name: "",
          surname: "",
          nickname: "",
          title: "",
          gender: "",
          ic_no: "",
          date_of_birth: "",
          passport_no: "",
          passport_exp_date: "",
          nationality: "",
          remark: "",
          is_billing_person: "",
        },
      },
    },
    step3: {
      checkbox1: false,
      checkbox2: false,
    },
    step4: {
      payment_method: "",
    },
  };

  return (
    <FormProvider priceList={priceList} formInitialData={formInitialData}>
      <BookingProvider priceList={priceList}>
        <div>
          <h1>Make A Booking</h1>
          <div className="flex">
            <div className="flex flex-col flex-2">
              <DetailsCard idTourPkg={idTourPkg} />
              <Forms />
            </div>
            <BookingSummary />
          </div>
        </div>
      </BookingProvider>
    </FormProvider>
  );
}

const DetailsCard = ({ idTourPkg }) => {
  return (
    <div className="flex p-4 bg-white rounded-lg shadow-lg">
      {/* img */}
      <div className="w-40 h-40 bg-gray-300 mr-4"></div>
      <div>
        <h1>Title</h1>
        <span>time</span>
        <div>Selected Date:</div>
        <div>Air lines:</div>
        <Link href={`/wanderlust/${idTourPkg}`} className="text-red-500">
          Change Date
        </Link>
      </div>

      <div>
        <span className="text-gray-400">Category</span>
      </div>
    </div>
  );
};
