import { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useFormData } from "./FormContext";

const BookingContext = createContext();

// props explain :
// pricelist : to calculate total

export const BookingProvider = ({ children, priceList }) => {
  const { formData } = useFormData();
  const [total, setTotal] = useState(0);

  const calculatePersons = () => {
    const rooms = formData.step1.rooms; // array of objects

    // rooms.forEach((room) => {
    //   Object.entries(room).reduce((sum, [code, count]) => {
    //     const item = priceList.find((p) => p.code === code);

    //     console.log(item?.code);

    //     summary[code] = item && item.amount * count;
    //     return sum + (item ? item.amount * count : 0);
    //   }, 0);
    // });

    const excludedFields = ["id", "room_index"];

    const summary = rooms.reduce((acc, room) => {
      Object.entries(room).forEach(([key, value]) => {
        // ✅ 排除指定欄位，且只加非 0 的數值
        if (
          !excludedFields.includes(key) &&
          typeof value === "number" &&
          value !== 0
        ) {
          acc[key] = (acc[key] || 0) + value;
        }
      });
      return acc;
    }, {});

    return summary;
  };

  const calculateTotal = () => {
    let total = 0;

    setTotal(total);
    return;
  };

  useEffect(() => {
    // count people -> count total

    console.log(calculatePersons());
  }, [formData]);

  return (
    <BookingContext.Provider value={{ total }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingData = () => useContext(BookingContext);
