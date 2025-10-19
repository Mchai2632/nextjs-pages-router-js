import { useEffect, useState } from "react";

const typeCdList = ["TOUR", "UMRAH"];

export default function useTourPkgList() {
  const [tourPkgList, setTourPkgList] = useState([]);
  const [typeCd, setTypeCd] = useState(typeCdList[0]);

  //  get all the tour packages list
  const getTourList = async () => {
    try {
      const params = new URLSearchParams(); // create URLSearchParams object
      if (typeCd) params.append("typeCd", typeCd);
      const url = `/api/tourpkglist?${params.toString()}`;

      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      console.log(data.tourPkgList);

      setTourPkgList(data.tourPkgList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTourList();
  }, [typeCd]);

  return { tourPkgList, typeCdList, setTypeCd };
}
