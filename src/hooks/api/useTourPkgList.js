import { useEffect, useState } from "react";

export default function useTourPkgList() {
  const [tourPkgList, setTourPkgList] = useState([]);
  const [typeCd, setTypeCd] = useState("OUTBOUND");
  const [loading, setLoading] = useState(false);

  //  get all the tour packages list
  const getTourList = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams(); // create URLSearchParams object

      let type;

      if (typeCd == "OUTBOUND") {
        type = "tour";
      } else {
        type = typeCd;
      }

      if (typeCd) params.append("typeCd", type);
      const url = `/api/tourpkglist?${params.toString()}`;

      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      setLoading(false);

      // console.log(data.tourPkgList);

      setTourPkgList(data.tourPkgList);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTourList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeCd]);

  return { tourPkgList, typeCd, setTypeCd, loading };
}
