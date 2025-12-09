import { createContext, useContext } from "react";

export const TourContext = createContext();
export const TourProvider = TourContext.Provider;
export const TourConsumer = TourContext.Consumer;

export const useTourContext = () => useContext(TourContext);
