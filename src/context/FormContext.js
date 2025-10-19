import { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

const FormContext = createContext();

export const FormProvider = ({ children, formInitialData }) => {
  const [formData, setFormData] = useImmer(formInitialData);
  const [step, setStep] = useState(1);

  const backStep = () => setStep((prev) => prev - 1);
  const nextStep = () => setStep((prev) => prev + 1);
  const clearForm = () => {
    setFormData(formInitialData);
    setStep(1);
  };

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  return (
    <FormContext.Provider
      value={{
        formInitialData,
        formData,
        step,
        backStep,
        nextStep,
        setFormData,
        clearForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
