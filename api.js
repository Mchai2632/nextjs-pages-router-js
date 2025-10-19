const api = () => {
  const baseHost =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://trevabook.ddns.net/trevabook-admin";

  console.log("baseHost: ", baseHost);

  if (!baseHost) {
    throw new Error("API base URL is not defined");
  }

  // const baseHost = process.env.NEXT_PUBLIC_API_URL;
  const base = baseHost + "/api/v1";
  const base2 = baseHost + "/api/v2";
  const baseweb = baseHost + "/api/web/v1";
  const baseweb2 = baseHost + "/api/web/v2";
  if (process.env.NEXT_PUBLIC_NODE_ENV == "development") {
    return {
      tourpkglist: `${baseweb2}/tourpkglist`, // typeCd=TOUR / UMRAH / WANDERLUST
      tourpkgdetail: `${baseweb2}/tourpkgdetail`, // idTourPkg
      tourdepdetail: `${baseweb2}/tourdepdetail`, // idCompany=1 & idTourDep=101
      makeBookingOnline: `${baseweb2}/makeBookingOnline`,

      // getCarouselList: `${baseweb}/getcarousellist`,
      // referenceList: `${base}/referenceList`,
      // tourPackageWithLocation: `${base}/tourpackagelistwithlocation`,
      // bookingList: `${base}/bookingList`,
      // tourpkgdetail: `${baseweb2}/tourpkgdetail`,
      // tourdepdetail: `${base}/tourdepdetail`,
      // makeBookingOnline: `${base}/makeBookingOnline`,
      // sendCustomerDetails: `${base}/sendCustomerDetails`,
      // cancelBooking: `${base}/cancelBooking`,
      // onlineBookingConfigList: `${base}/onlineBookingConfigList`,
      // iPayConfigList: `${base}/ipayConfigList`,
      // contactUs: `${base}/contactUsV2`,
      // downloadItinerary: `${base}/downloadItinerary`,
      // login: `${base2}/auth/member/login`,
      // register: `${base2}/auth/member/register`,
      // countrylist: `${base}/countrylist`,
      // tourpkglist: `${baseweb2}/tourpkglist?typeCd=TOUR`,
      // tourpkglist_umrah: `${baseweb2}/tourpkglist?typeCd=UMRAH`,
      // tourdepdetailv2: `${baseweb2}/tourdepdetail`,
      // makeBookingOnlinev2: `${baseweb2}/makeBookingOnline`,
      // tourcat: `${baseweb2}/gettourcat`,
    };
  } else if (process.env.NEXT_PUBLIC_NODE_ENV == "acceptance") {
    return {
      referenceList:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/referenceList",
      tourPackageWithLocation:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/tourpackagelistwithlocation",
      bookingList:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/bookingList",
      tourpkgdetail:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/tourpkgdetail",
      tourdepdetail:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/tourdepdetail",
      makeBookingOnline:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/makeBookingOnline",
      sendCustomerDetails:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/sendCustomerDetails",
      cancelBooking:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/cancelBooking",
      onlineBookingConfigList:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/onlineBookingConfigList",
      iPayConfigList:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/ipayConfigList",
      tourpkglist:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/tourpkglist",
      contactUs:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/contactUsV2",
      downloadItinerary:
        "https://trevabook.ddns.net/trevabook-admin/api/v1/downloadItinerary",
      login:
        "https://trevabook.ddns.net/trevabook-admin/api/v2/auth/member/login",
      register:
        "https://trevabook.ddns.net/trevabook-admin/api/v2/auth/member/register",
      countrylist:
        "https://wwmtravel.ddns.net/wwmtravel-admin/api/v1/countrylist",
      tourdepdetailv2: `https://trevabook.ddns.net/trevabook-admin/api/web/v2/tourdepdetail`,
      makeBookingOnlinev2:
        "https://trevabook.ddns.net/trevabook-admin/api/web/v2/makeBookingOnline",
      tourcat: `https://wwmtravel.ddns.net/wwmtravel-admin/api/web/v2/gettourcat`,
    };
  } else if (process.env.NEXT_PUBLIC_NODE_ENV == "production") {
    const base = baseHost + "/api/v1";
    const base2 = baseHost + "/api/v2";
    const baseweb = baseHost + "/api/web/v1";
    const baseweb2 = baseHost + "/api/web/v2";

    return {
      getCarouselList: `${baseweb}/getcarousellist`,
      referenceList: `${base}/referenceList`,
      tourPackageWithLocation: `${base}/tourpackagelistwithlocation`,
      bookingList: `${base}/bookingList`,
      tourpkgdetail: `${baseweb2}/tourpkgdetail`,
      tourdepdetail: `${base}/tourdepdetail`,
      makeBookingOnline: `${base}/makeBookingOnline`,
      sendCustomerDetails: `${base}/sendCustomerDetails`,
      cancelBooking: `${base}/cancelBooking`,
      onlineBookingConfigList: `${base}/onlineBookingConfigList`,
      iPayConfigList: `${base}/ipayConfigList`,
      //"tourpkglist": `${base}/tourpkglist?typeCd=TOUR&themeName=WANDERLUST`,
      contactUs: `${base}/contactUsV2`,
      downloadItinerary: `${base}/downloadItinerary`,
      login: `${base2}/auth/member/login`,
      register: `${base2}/auth/member/register`,
      countrylist: `${base}/countrylist`,
      tourpkglist: `${baseweb2}/tourpkglist?typeCd=TOUR`,
      tourpkglist_umrah: `${baseweb2}/tourpkglist?typeCd=UMRAH`,
      tourdepdetailv2: `${baseweb2}/tourdepdetail`,
      makeBookingOnlinev2: `${baseweb2}/makeBookingOnline`,
      tourcat: `${baseweb2}/gettourcat`,
    };
  }
};

export default api;
