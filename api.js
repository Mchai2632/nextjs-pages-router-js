const api = () => {
  const baseHost = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  console.log("baseHost: ", baseHost);

  if (!baseHost) {
    throw new Error("API base URL is not defined");
  }

  const base = baseHost + "/api/v1";
  const base2 = baseHost + "/api/v2";
  const base3 = baseHost + "/api/v3";
  const baseweb = baseHost + "/api/web/v1";
  const baseweb2 = baseHost + "/api/web/v2";
  const baseweb3 = baseHost + "/api/web/v3";

  console.log(baseweb2);

  if (process.env.NEXT_PUBLIC_NODE_ENV == "development") {
    return {
      getCarouselList: `${baseweb}/getcarousellist`,
      referenceList: `${base}/referenceList`,
      tourpkglist: `${baseweb2}/tourpkglist`,
      tourpkgdetail: `${baseweb2}/tourpkgdetail`,
      tourdepdetail: `${baseweb2}/tourdepdetail`,
      makeBookingOnline: `${baseweb2}/makeBookingOnline`,
      sendCustomerDetails: `${baseweb3}/sendCustomerDetails`,
      cancelBooking: `${base}/cancelBooking`,
      contactUs: `${base}/contactUsV2`,
      downloadItinerary: `${base}/downloadItinerary`,
      login: `${base2}/auth/member/login`,
      register: `${base2}/auth/member/register`,
      getCountryList: `${base2}/auth/member/getCountryList`,
      getStateList: `${base2}/auth/member/getStateList`,
      getTitleList: `${base2}/auth/member/getTitleList`,
      getEcRelationship: `${base2}/auth/member/getEcRelationship`,
      toyyibpayConfigList: `${base}/toyyibpayConfigList`,
      requestToyyibpayJSON: `${baseHost}/api/gw/tp/requestPayment/v1`,
      toyyibpayCallbackUrl: `${baseHost}/api/gw/tp/capturePayment/v1`,
    };
  } else if (process.env.NEXT_PUBLIC_NODE_ENV == "production") {
    return {
      getCarouselList: `${baseweb}/getcarousellist`,
      referenceList: `${base}/referenceList`,
      tourpkglist: `${baseweb2}/tourpkglist`,
      tourpkgdetail: `${baseweb2}/tourpkgdetail`,
      tourdepdetail: `${baseweb2}/tourdepdetail`,
      makeBookingOnline: `${baseweb2}/makeBookingOnline`,
      sendCustomerDetails: `${baseweb3}/sendCustomerDetails`,
      cancelBooking: `${base}/cancelBooking`,
      contactUs: `${base}/contactUsV2`,
      downloadItinerary: `${base}/downloadItinerary`,
      login: `${base2}/auth/member/login`,
      register: `${base2}/auth/member/register`,
      getCountryList: `${base2}/auth/member/getCountryList`,
      getStateList: `${base2}/auth/member/getStateList`,
      getTitleList: `${base2}/auth/member/getTitleList`,
      getEcRelationship: `${base2}/auth/member/getEcRelationship`,
      toyyibpayConfigList: `${base}/toyyibpayConfigList`,
      requestToyyibpayJSON: `${baseHost}/api/gw/tp/requestPayment/v1`,
      toyyibpayCallbackUrl: `${baseHost}/api/gw/tp/capturePayment/v1`,
    };
  }
};

export default api;
