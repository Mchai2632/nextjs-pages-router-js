const api = () => {
  const baseHost = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  console.log("baseHost: ", baseHost);

  if (!baseHost) {
    throw new Error("API base URL is not defined");
  }

  // const baseHost = process.env.NEXT_PUBLIC_API_URL;
  const base = baseHost + "/api/v1";
  const base2 = baseHost + "/api/v2";
  const baseweb = baseHost + "/api/web/v1";
  const baseweb2 = baseHost + "/api/web/v2";

  console.log(baseweb2);

  if (process.env.NODE_ENV == "development") {
    return {
      tourpkglist: `${baseweb2}/tourpkglist`, // typeCd=TOUR / UMRAH / WANDERLUST
      tourpkgdetail: `${baseweb2}/tourpkgdetail`, // idTourPkg
      tourdepdetail: `${baseweb2}/tourdepdetail`, // idCompany=1 & idTourDep=101
      makeBookingOnline: `${baseweb2}/makeBookingOnline`,
    };
  } else if (process.env.NEXT_PUBLIC_NODE_ENV == "acceptance") {
    return {};
  } else if (process.env.NEXT_PUBLIC_NODE_ENV == "production") {
    return {
      tourpkglist: `${baseweb2}/tourpkglist`, // typeCd=TOUR / UMRAH / WANDERLUST
      tourpkgdetail: `${baseweb2}/tourpkgdetail`, // idTourPkg
      tourdepdetail: `${baseweb2}/tourdepdetail`, // idCompany=1 & idTourDep=101
      makeBookingOnline: `${baseweb2}/makeBookingOnline`,
    };
  }
};

export default api;
