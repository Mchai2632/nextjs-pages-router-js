import { layoutConfig } from "@/config/RootLayoutConfig";
import { BrandProvider } from "@/context/BrandContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/variables.scss";
import "@/styles/booking-forms.css";
import "@/styles/animations.css";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import BaseMeta from "@/components/SEO/BaseMeta";

function App({ Component, pageProps }) {
  return (
    <>
      <BaseMeta />
      <ThemeProvider>
        <BrandProvider>
          <LoadingProvider>
            <Component {...pageProps} />
            <LoadingOverlay />
          </LoadingProvider>
        </BrandProvider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
