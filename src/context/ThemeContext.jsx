import { layoutConfig } from "@/config/RootLayoutConfig";
import { createContext, useContext, useEffect, useState } from "react";

const { logoDark, logoLight } = layoutConfig.myBrand;

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [logo, setLogo] = useState(logoLight);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const newTheme = savedTheme || (prefersDark ? "dark" : "light");

    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    setLogo(newTheme === "dark" ? logoDark : logoLight);
    setMounted(true);
  }, []);

  if (!mounted) {
    // 🟣 Splash 畫面（可自訂成動畫）
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);

    setTheme(newTheme);
    setLogo(newTheme === "dark" ? logoDark : logoLight);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme, logo }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
