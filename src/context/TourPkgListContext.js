import useTourPkgList from "@/hooks/api/useTourPkgList";
import { createContext, useContext, useEffect, useState } from "react";

const TourPkgListContext = createContext();

export const TourPkgListProvider = ({ children }) => {
  const { tourPkgList, typeCdList, setTypeCd } = useTourPkgList();

  return (
    <TourPkgListContext.Provider value={{ tourPkgList, typeCdList, setTypeCd }}>
      {children}
    </TourPkgListContext.Provider>
  );
};

export const useTourPkgListData = () => useContext(TourPkgListContext);
