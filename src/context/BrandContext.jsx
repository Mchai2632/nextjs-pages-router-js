// context/BrandContext.jsx
import { createContext, useContext, useState } from "react";
import { layoutConfig } from "@/config/RootLayoutConfig";

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const { myBrand: brand } = layoutConfig;

  // console.log("brand :", brand);

  return <BrandContext.Provider value={{ brand }}>{children}</BrandContext.Provider>;
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};
