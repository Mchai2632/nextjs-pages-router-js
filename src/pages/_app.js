import { FormProvider } from "@/context/FormContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
  );
}
