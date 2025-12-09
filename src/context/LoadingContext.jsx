import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loadingConfig, setLoadingConfig] = useState({
    isOpen: false,
    text: "Loading…",
    size: 48,
    color: "#ffffff",
  });

  const show = (options = {}) => {
    setLoadingConfig((prev) => ({
      ...prev,
      isOpen: true,
      ...options, // 可覆蓋 text, size, color
    }));
    document.body.style.overflow = "hidden";
  };

  const hide = () => {
    setLoadingConfig((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "auto";
  };

  return <LoadingContext.Provider value={{ loadingConfig, show, hide }}>{children}</LoadingContext.Provider>;
}

export const useLoadingContext = () => useContext(LoadingContext);
