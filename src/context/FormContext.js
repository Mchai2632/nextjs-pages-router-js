// context/FormContext.js
import { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    step1: {
      F_NAME: "Tour Overview",
      room1: {
        adult: 0,
        CWB: 0,
        CNB: 0,
        infant: 0,
      },

      checkbox1: false,
      checkbox2: false,
      paymode: "Pay Full Amount",
      promocode: "",
    },

    step2: {
      F_NAME: "Traveller",
      bill_info: {
        first_name: "",
        surname: "",
        nickname: "",
        title: "",
        gender: "",
        contact: "",
        email: "",
        address1: "",
        address2: "",
        postcode: "",
        state: "",
        country_region: "",
        checkbox1: "",
      },
      emer_contact: {
        first_name: "",
        surname: "",
        contact: "",
        email: "",
        relationship: "",
      },
      passenger_details: {
        room1_traveller1: {},
      },
    },
    step3: {
      name: "",
      email: "",
      phone: "",
    },
    step4: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [step, setStep] = useState(1);

  const backStep = () => setStep((prev) => prev - 1);
  const nextStep = () => setStep((prev) => prev + 1);

  useEffect(() => {
    console.log("step:", step);
  }, [step]);

  const updateForm = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  return (
    <FormContext.Provider
      value={{ formData, step, backStep, nextStep, updateForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
