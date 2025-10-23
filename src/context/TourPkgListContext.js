import useTourPkgList from "@/hooks/api/useTourPkgList";
import { createContext, useContext, useEffect, useState } from "react";

const TourPkgListContext = createContext();

export const TourPkgListProvider = ({ children }) => {
  const { tourPkgList, typeCdList, typeCd, setTypeCd, loading } =
    useTourPkgList();

  return (
    <TourPkgListContext.Provider
      value={{ tourPkgList, typeCd, typeCdList, setTypeCd, loading }}
    >
      {children}
    </TourPkgListContext.Provider>
  );
};

export const useTourPkgListData = () => useContext(TourPkgListContext);
