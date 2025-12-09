import useCountdown from "@/hooks/useCountDown";
import { createContext, useContext, useEffect } from "react";
import { useImmer } from "use-immer";

const FormContext = createContext();

const formInitialData = {
  step1: {
    F_NAME: "Tour Overview",
    rooms: [
      {
        id: crypto.randomUUID(),
        room_index: 1,
        // all item list get by API call
        // ...room_code,
      },
    ],

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
      room1_traveller1: {
        given_name: "",
        surname: "",
        nickname: "",
        title: "",
        gender: "",
        ic_no: "",
        date_of_birth: "",
        passport_no: "",
        passport_exp_date: "",
        nationality: "",
        remark: "",
        is_billing_person: "",
      },
    },
  },
  step3: {
    checkbox1: false,
    checkbox2: false,
  },
  step4: {
    payment_method: "",
  },
};

export const FormProvider = ({ children }) => {
  // const [formData, setFormData] = useImmer(formInitialData);
  const [formData, setFormData] = useImmer({});

  const { timeLeft, formatted, start, isActive } = useCountdown(30); // 30mins

  const clearForm = () => {
    // setFormData(formInitialData);
    setStep(1);
  };

  // useEffect(() => {
  //   console.log("formData:", formData);
  // }, [formData]);

  return <FormContext.Provider value={{ formData, setFormData, clearForm, timeLeft, formatted, start, isActive }}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
