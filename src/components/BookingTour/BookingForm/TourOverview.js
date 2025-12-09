import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "@/context/FormContext";
import Button from "../../ui/Button/Button";
import { useTourContext } from "@/context/TourContext";
import { useImmer } from "use-immer";
import { cloneDeep } from "lodash";
import useLoading from "@/hooks/useLoading";

export const roomType = [
  { label: "Bilik-Ber-1", value: "FT_SGL" },
  { label: "Bilik-Ber-2", value: "FT_TWN" },
  { label: "Bilik-Ber-3", value: "FT_TRIPLE" },
  { label: "Bilik-Ber-4", value: "FT_QUAD" },
  { label: "Bilik-Ber-5", value: "FT_QUINT" },
];

// general limit
const limit = {
  FT_SGL: 1,
  FT_TWN: 2,
  FT_TRIPLE: 3,
  FT_QUAD: 4,
  FT_QUINT: 5,
};

// 0 = Pay Full Amount, 1 = Pay Deposit Only
export let paymodeList = ["Pay Full Amount", "Pay Deposit Only"];
let paymodeDefault = 0;

export default function TourOverview({ nextStep }) {
  const { formData, setFormData, start: countDownStart } = useFormContext();
  const { tourDepDetail, toyyibConfig, setBookingSummaryData, setGlobalData } = useTourContext();
  const { tourDepItemList, promoCodeList, tourPkg } = tourDepDetail;
  const { deposit } = tourPkg;

  const [promoInput, setPromoInput] = useState("");
  const [promoisApply, setPromoIsApply] = useState(false);
  const [promoCodeIsAvailable, setPromoCodeIsAvailable] = useState(false);
  const [createBookingData, setCreateBookingData] = useState({});

  const [bookingLoading, setBookingLoading] = useState(false);
  const { show: showLoading, hide: hideLoading } = useLoading();
  // const []

  // get default roomType for initial room
  const defaultRoomType = tourDepItemList.filter((item) => {
    if (item.code && item.amount !== 0) return item.code;
  });

  // console.log("tourDepItemList:", tourDepItemList);
  // console.log("defaultRoomType:", defaultRoomType);

  // save data
  const getPreviousData = () => {
    if (formData.step1) return formData.step1;

    return {
      F_NAME: "Tour Overview",
      rooms: [
        {
          room_index: 1,
          totalPeopleNoIncludeInfant: 0,
          totalPeople: 0,
          roomType: defaultRoomType[0].code,
          adult: 0,
          cwb: 0,
          cnb: 0,
          infant: 0,
        },
      ],
      checkbox1: false,
      checkbox2: false,
      paymode: paymodeDefault, // 0 = Pay Full Amount, 1 = Pay Deposit Only
      promocode: "",
    };
  };

  const [step1Data, setStep1Data] = useImmer(getPreviousData());

  console.log(step1Data);

  // Calculate Total
  useEffect(() => {
    const tourDepItemListClone = cloneDeep(tourDepItemList);
    tourDepItemListClone.forEach((item) => (item.quantity = 0));

    // console.log(tourDepItemListClone);

    const summary = [];
    let totalHead = 0;

    for (let i = 0; i < step1Data.rooms.length; i++) {
      const { adult, cwb, cnb, infant } = step1Data.rooms[i];
      const totalPeople = adult + cwb + cnb;
      const room = [];

      // 成人房型邏輯
      if (adult === 1) {
        room.push({ type: "FT_SGL", count: adult, passengerType: "Adult" });
        totalHead += adult;
        tourDepItemListClone.find((item) => {
          if (item.code === "FT_SGL") item.quantity += adult;
        });
      } else if (adult === 2) {
        room.push({ type: "FT_TWN", count: adult, passengerType: "Adult" });
        totalHead += adult;
        tourDepItemListClone.find((item) => {
          if (item.code === "FT_TWN") item.quantity += adult;
        });
      } else if (adult === 3) {
        room.push({ type: "FT_TRIPLE", count: adult, passengerType: "Adult" });
        totalHead += adult;
        tourDepItemListClone.find((item) => {
          if (item.code === "FT_TRIPLE") item.quantity += adult;
        });
      } else if (adult === 4) {
        room.push({ type: "FT_QUAD", count: adult, passengerType: "Adult" });
        totalHead += adult;
        tourDepItemListClone.find((item) => {
          if (item.code === "FT_QUAD") item.quantity += adult;
        });
      }

      // 小孩房型邏輯
      if (cwb > 0) {
        room.push({ type: "FT_CWB", count: cwb, passengerType: "Children With Bed" });
        totalHead += cwb;
        tourDepItemListClone.find((item) => {
          if (item.code === "FT_CWB") item.quantity += cwb;
        });
      }
      if (cnb > 0) {
        room.push({ type: "FT_CNB", count: cnb, passengerType: "Children Without Bed" });
        totalHead += cnb;
        tourDepItemListClone.find((item) => {
          if (item.code === "FT_CNB") item.quantity += cnb;
        });
      }
      if (infant > 0) {
        room.push({ type: "FT_INFT", count: infant, passengerType: "Infant" });
        totalHead += infant;
        tourDepItemListClone.find((item) => {
          if (item.code === "FT_INFT") item.quantity += infant;
        });
      }

      // 只有有房型的才加入 summary
      if (room.length > 0) {
        summary.push({
          roomNo: i + 1,
          roomType: step1Data.rooms[i].roomType,
          details: room,
        });
      }
    }

    const dataToSendBooking = {
      idCompany: tourDepDetail.tourPkg.idCompany,
      idTourDep: tourDepDetail.idBase,
      quantity: totalHead,
      ...(promoCodeIsAvailable ? { promoCode: promoInput } : {}),
      bookingChargeItemList: tourDepItemListClone,
    };

    // console.log(dataToSendBooking);
    setCreateBookingData(dataToSendBooking);

    // calculate overall for summary

    const promoData = promoCodeIsAvailable ? promoCodeList.filter((item) => step1Data.promocode == item.code) : null;
    const promoDiscount = promoData?.[0]?.amount || 0;

    const { beforeDiscount, afterDiscount } = calculateGrandTotal(tourDepItemListClone, promoDiscount);

    setBookingSummaryData({
      beforeDiscount: beforeDiscount,
      afterDiscount: afterDiscount,
      deposit: deposit,
      paymode: step1Data.paymode,
      summary: summary,
      promocode: promoData?.[0]?.code,
      promoCodeDiscountAmount: promoDiscount,
      adminCharges: toyyibConfig?.toyyibpayConfigList[0]?.adminChargesPercentage,
    });

    // console.log(step1Data);
  }, [step1Data]);

  // grand total
  function calculateGrandTotal(tourDepItemListClone, promoDiscount) {
    let totalAmountAllRooms = 0;
    let grandTotal = 0;

    tourDepItemListClone.forEach((item) => {
      totalAmountAllRooms += item.quantity * item.amount;
    });

    grandTotal += totalAmountAllRooms;
    grandTotal += -promoDiscount;

    return { beforeDiscount: totalAmountAllRooms, afterDiscount: grandTotal };
  }

  // ✅ 单个房间的初始值模板（使用函数生成，避免引用共享）
  const createRoom = (index) => {
    return {
      room_index: index + 1,
      totalPeopleNoIncludeInfant: 0,
      totalPeople: 0,
      roomType: defaultRoomType[0].code,
      adult: 0,
      cwb: 0,
      cnb: 0,
      infant: 0,
    };
  };

  // ✅ 统一封装更新函数
  const updateRoomValue = (index, field, values) => {
    if (field == "roomType") {
      setStep1Data((draft) => {
        // if change roomType change set the room data to initial
        draft.rooms[index][field] = values.target.value;
        draft.rooms[index].adult = 0;
        draft.rooms[index].cwb = 0;
        draft.rooms[index].cnb = 0;
        draft.rooms[index].infant = 0;
        draft.rooms[index].totalPeopleNoIncludeInfant = 0;
        draft.rooms[index].totalPeople = 0;
      });
    } else {
      if (step1Data.rooms[index][field] < 1 && values == -1) return; // cannot being minus if field is 0
      setStep1Data((draft) => {
        const currentRoom = draft.rooms[index];
        const value = draft.rooms[index][field] + values;
        if (field != "infant") {
          currentRoom.totalPeopleNoIncludeInfant += values; // calculate current per room total people
        }
        currentRoom.totalPeople += values; // calculate current per room total people

        draft.rooms[index][field] = Math.max(value, 0); // ❗防止变负数
      });
    }
  };

  // ✅ 新增房间
  const handleAddRoom = () => {
    setStep1Data((draft) => {
      const newIndex = draft.rooms.length;
      draft.rooms.push(createRoom(newIndex));
    });
  };

  // ✅ 删除房间
  const handleRemoveRoom = (index) => {
    setStep1Data((draft) => {
      draft.rooms.splice(index, 1);
      // 🔹 重排 room_index（保持编号正确）
      draft.rooms.forEach((r, i) => (r.room_index = i + 1));
    });
  };

  const handleCreateBooking = async () => {
    setBookingLoading(true);

    console.log(createBookingData);
    showLoading({ text: "Create Booking…" });

    try {
      const response = await fetch("/api/makeBookingOnline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createBookingData),
      });

      console.log(response);

      if (!response.ok) {
        alert(`Booking failed (${response.status})`);
        return null; // 明確回傳 null，讓外層知道「失敗」
      }

      const data = await response.json();
      console.log("Booking response:", data);

      // mock data
      // const data = {
      //   idBooking: 423,
      //   promoCode: null,
      //   successful: true,
      // };

      // 若 data.success 為 false，也應中止
      if (!data?.successful) {
        alert(`${data.error}`);
        return null;
      }

      // delete data.bookingChargeItemList;

      setGlobalData({ bookingData: data });

      return data; // ✅ 成功：回傳 booking 結果
    } catch (error) {
      console.error("Booking API error:", error);
      alert("Network error, please try again later.");
      return null; // ✅ 錯誤時回傳 null
    } finally {
      setBookingLoading(false); // 不論成功失敗都關閉 loading
      hideLoading();
    }
  };

  // promoCodeValidation
  const checkPromoCode = (promocode) => {
    setPromoIsApply(true);
    console.log("promoCodeList:", promoCodeList);
    if (promocode == undefined) return;
    const isAvailable = promoCodeList.some((item) => item.code == promocode);
    setPromoCodeIsAvailable(isAvailable); // for UI use

    if (isAvailable)
      setStep1Data((draft) => {
        draft.promocode = promocode;
      });
    else {
      setStep1Data((draft) => {
        draft.promocode = "";
      });
    }

    console.log("Promo Code is ", isAvailable, ":", promocode);
  };

  const anyRoomsIsEmpty = step1Data.rooms.some((room) => room.totalPeopleNoIncludeInfant < 1);
  const anyRoomsIsLackAdult = step1Data.rooms.some((room) => room.adult < 1);
  const checkboxNoTick = !step1Data.checkbox1 || !step1Data.checkbox2;
  const checkMin = step1Data.rooms
    .map((room) => {
      if (room.totalPeopleNoIncludeInfant < limit[room.roomType]) return { room_index: room.room_index, min: limit[room.roomType], roomType: room.roomType };
      // return null;
    })
    .filter((room) => room);

  const next = async () => {
    // const checkM = step1Data.rooms.some((room) => {
    //   return room.totalPeopleNoIncludeInfant < limit[room.roomType];
    // });

    console.log(checkMin);

    try {
      if (anyRoomsIsEmpty) return alert("A Room cannot be empty");
      if (anyRoomsIsLackAdult) return alert("A Room cannot less than 1 adult");
      if (checkboxNoTick) return alert("Please read Terms and Condition before tick");
      if (checkMin.length > 0) {
        const text = checkMin.map((item) => {
          // get the roomType label
          const rType = roomType.find((rType) => rType.value === item.roomType)?.label;

          return `Room ${item.room_index} (${rType}) : minimum pax is ${item.min} (no include infant) \n`;
        });

        return alert(text);
      }

      const bookingResult = await handleCreateBooking();
      // 若 handleCreateBooking 返回 false 或 error，直接中止
      if (!bookingResult) return;

      setFormData({ step1: step1Data });
      // countDownStart();
      nextStep();
    } catch (err) {
      console.error("Booking creation failed:", err);
      alert("Failed to create booking, please try again.");
    }
  };

  const checkIfMaxPeople = (currenttotalPeople, currentRoomType) => {
    return currenttotalPeople >= limit[currentRoomType];
  };

  const NoAvailableUI = <span className="line-through">no available</span>;

  return (
    <div className="flex flex-col gap-6 p-4 rounded-lg ">
      {/* {bookingLoading && <h1 className="fixed top-0 left-0 bg-red-600 text-white w-full p-4">Booking Loading....</h1>} */}
      {/* room list */}
      {/* <Button onClick={() => showLoading({})}>SHow Loading</Button> */}
      {step1Data?.rooms?.map((room, index) => {
        // console.log(room);
        const currentRoom = step1Data.rooms[index];
        const selectedRoomType = roomType.find((r) => r.value === currentRoom.roomType);

        return (
          <div key={currentRoom.room_index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            {/* 房间标题区 */}
            <div className="flex justify-between items-center mb-3">
              <label className="text-lg font-semibold">Room {currentRoom.room_index}</label>
              <div>
                {/* <label htmlFor="roomType">Choose your room type:</label> */}
                <select name="roomType" id="roomType" defaultValue={currentRoom.roomType} onChange={(e) => updateRoomValue(index, "roomType", e)}>
                  <option value="">Choose your room type:</option>

                  {roomType.map((opt, idx) => {
                    // item is available and price not 0
                    const isAvailable = tourDepItemList.some((item) => item.code === opt.value && item.amount !== 0);
                    return (
                      <option key={idx} value={opt.value} disabled={!isAvailable} className="disabled:bg-muted-foreground">
                        {opt.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              {index > 0 && (
                <button type="button" className="text-red-600 hover:text-red-800 font-medium" onClick={() => handleRemoveRoom(index)}>
                  − Remove Room
                </button>
              )}
            </div>
            <hr className="mb-4" />

            {/* 房间人数输入区 */}
            <div className="flex flex-col md:grid grid-cols-3  gap-4">
              {/* Adult */}
              <div className="flex flex-col">
                <label className="font-bold text-sm">Adult</label>
                <div className="flex items-center">
                  <InputButton
                    onClick={() => {
                      updateRoomValue(index, "adult", -1);
                    }}
                  >
                    −
                  </InputButton>
                  <span className=" bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">{currentRoom.adult}</span>
                  <InputButton
                    onClick={() => {
                      if (currentRoom.roomType == "") return alert("Please choose your room type ");

                      if (checkIfMaxPeople(currentRoom.totalPeopleNoIncludeInfant, currentRoom.roomType))
                        return alert(`maximum for ${selectedRoomType.label} is ${limit[currentRoom.roomType]} pax (not include "infant")`);
                      updateRoomValue(index, "adult", 1);
                    }}
                  >
                    +
                  </InputButton>
                </div>
              </div>
              {/* Children With Bed */}
              <div className="flex flex-col">
                <label className="font-bold text-sm">Children With Bed (&lt; 12 yrs)</label>
                {defaultRoomType.some((item) => item.code == "FT_CWB") ? (
                  <div className="flex items-center">
                    <InputButton onClick={() => updateRoomValue(index, "cwb", -1)}>−</InputButton>
                    <span className=" bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">{currentRoom.cwb}</span>
                    <InputButton
                      onClick={() => {
                        if (currentRoom.roomType == "") return alert("Please choose your room type ");
                        if (checkIfMaxPeople(currentRoom.totalPeopleNoIncludeInfant, currentRoom.roomType))
                          return alert(`maximum for ${selectedRoomType.label} is ${limit[currentRoom.roomType]} pax (not include "infant")`);
                        updateRoomValue(index, "cwb", 1);
                      }}
                    >
                      +
                    </InputButton>
                  </div>
                ) : (
                  NoAvailableUI
                )}
              </div>
              {/* Children Without Bed */}
              <div className="flex flex-col">
                <label className="font-bold text-sm">Children Without Bed (&lt; 12 yrs)</label>
                {defaultRoomType.some((item) => item.code == "FT_CNB") ? (
                  <div className="flex items-center">
                    <InputButton onClick={() => updateRoomValue(index, "cnb", -1)}>−</InputButton>
                    <span className=" bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">{currentRoom.cnb}</span>
                    <InputButton
                      onClick={() => {
                        if (currentRoom.roomType == "") return alert("Please choose your room type ");
                        if (checkIfMaxPeople(currentRoom.totalPeopleNoIncludeInfant, currentRoom.roomType))
                          return alert(`maximum for ${selectedRoomType.label} is ${limit[currentRoom.roomType]} pax (not include "infant")`);
                        updateRoomValue(index, "cnb", 1);
                      }}
                    >
                      +
                    </InputButton>
                  </div>
                ) : (
                  NoAvailableUI
                )}
              </div>
              {/* Infant */}
              <div className="flex flex-col">
                <label className="font-bold text-sm">Infant (&lt; 12 yrs)</label>
                {defaultRoomType.some((item) => item.code == "FT_INFT") ? (
                  <div className="flex items-center">
                    <InputButton onClick={() => updateRoomValue(index, "infant", -1)}>−</InputButton>
                    <span className=" bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">{currentRoom.infant}</span>
                    <InputButton
                      onClick={() => {
                        if (currentRoom.roomType == "") return alert("Please choose your room type ");
                        updateRoomValue(index, "infant", 1);
                      }}
                    >
                      +
                    </InputButton>
                  </div>
                ) : (
                  NoAvailableUI
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* 统一“Add Room”按钮 */}
      <div className="flex justify-end">
        <button type="button" onClick={handleAddRoom} className="bg-primary text-white font-semibold px-4 py-2 rounded hover:opacity-90 transition">
          + Add Room
        </button>
      </div>
      {/* checkbox */}
      <div>
        <div>
          <input
            id="checkbox-tourview-1"
            className="mr-2"
            type="checkbox"
            onChange={(e) =>
              setStep1Data((draft) => {
                draft.checkbox1 = !draft.checkbox1;
              })
            }
          />
          <label htmlFor="checkbox-tourview-1">I understand that surcharges and entry visa may be applicable for non-Malaysian passport holder</label>
        </div>
        <div>
          <input
            id="checkbox-tourview-2"
            className="mr-2"
            type="checkbox"
            onChange={(e) =>
              setStep1Data((draft) => {
                draft.checkbox2 = !draft.checkbox2;
              })
            }
          />
          <label htmlFor="checkbox-tourview-2">
            Tour member must ensure he/she is medically and physically fit for travel. Please disclose any physical, medical, or other special needs that
            require special attention at the time of booking.
            <button className="text-blue-600" onClick={() => alert("t&c modal")}>
              T&C Apply
            </button>
          </label>
        </div>
      </div>

      {/* payment mode select */}
      <div>
        <span className="font-bold">Please select your payment mode</span>
        <div className="flex flex-col w-fit">
          {paymodeList.map((mode, idx) => {
            return (
              <label key={idx}>
                <input
                  type="radio"
                  name="payment_mode"
                  value={idx}
                  defaultChecked={idx === paymodeDefault}
                  onChange={(e) =>
                    setStep1Data((draft) => {
                      draft.paymode = e.target.value;
                    })
                  }
                />
                {mode}
              </label>
            );
          })}
        </div>
      </div>

      {/* promo code input */}
      {/* need to do validation  */}
      <div className="flex flex-col">
        <label htmlFor="promo_code_input">Promo Code (Optional)</label>
        <div>
          <input
            id="promo_code_input"
            placeholder="Enter promo code"
            className="border-b-2 py-1 px-2"
            type="text"
            value={promoInput}
            onChange={(e) => {
              setPromoIsApply(false);
              setPromoInput(e.target.value);
            }}
          />
          <Button className="w-fit" onClick={() => checkPromoCode(promoInput)}>
            apply
          </Button>
        </div>

        {promoCodeIsAvailable && promoInput != "" && <span className="text-green-600">Yes</span>}
        {!promoCodeIsAvailable && promoInput != "" && promoisApply && <span className="text-red-600">No</span>}
      </div>

      <hr />

      {/* 下一步 */}
      <div className="flex justify-end">
        <Button onClick={next} disabled={checkboxNoTick}>
          Next
        </Button>
      </div>
    </div>
  );
}

// ✅ 独立 InputButton 组件
const InputButton = ({ children, onClick, props }) => (
  <button className="bg-gray-100 py-1 px-3 border border-gray-400" onClick={onClick} type="button" {...props}>
    {children}
  </button>
);
