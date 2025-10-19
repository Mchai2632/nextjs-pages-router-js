import React from "react";
import { useFormData } from "@/context/FormContext";
import Button from "../../ui/Button";

// ✅ 独立 InputButton 组件
const InputButton = ({ children, onClick }) => (
  <button
    className="bg-gray-100 py-1 px-3 border border-gray-400"
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

export default function TourOverview({ priceList }) {
  const { formInitialData, formData, setFormData, nextStep } = useFormData();

  // ✅ 单个房间的初始值模板（使用函数生成，避免引用共享）
  const createRoom = (index) => {
    return {
      ...formInitialData.step1.rooms[0],
      id: crypto.randomUUID(), // 🔹 防止 React key 混乱
      room_index: index + 1,
    };
  };

  // ✅ 统一封装更新函数
  const updateRoomValue = (index, field, delta) => {
    setFormData((draft) => {
      const value = draft.step1.rooms[index][field] + delta;
      draft.step1.rooms[index][field] = Math.max(value, 0); // ❗防止变负数
    });
  };

  // ✅ 新增房间
  const handleAddRoom = () => {
    setFormData((draft) => {
      const newIndex = draft.step1.rooms.length;
      draft.step1.rooms.push(createRoom(newIndex));
    });
  };

  // ✅ 删除房间
  const handleRemoveRoom = (index) => {
    setFormData((draft) => {
      draft.step1.rooms.splice(index, 1);
      // 🔹 重排 room_index（保持编号正确）
      draft.step1.rooms.forEach((r, i) => (r.room_index = i + 1));
    });
  };

  // Create Booking
  const handleCreateBooking = async () => {
    const response = await fetch("/api/create-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: "yes" }),
    });

    // if booking full give alert
    if (!response.ok) {
      alert("booking full");
      return;
    }

    console.log("Create Booking");
    nextStep();
  };

  return (
    <div className="flex flex-col gap-6 border-2 p-4 rounded-lg bg-amber-100">
      {/* 房间列表 */}
      {formData.step1.rooms.map((room, index) => {
        const currentRoom = formData.step1.rooms[index];

        return (
          <div
            key={room.id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            {/* 房间标题区 */}
            <div className="flex justify-between items-center mb-3">
              <label className="text-lg font-semibold">
                Room {room.room_index}
              </label>
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 font-medium"
                  onClick={() => handleRemoveRoom(index)}
                >
                  − Remove Room
                </button>
              )}
            </div>
            <hr className="mb-4" />

            {/* 房间人数输入区 */}
            <div className="grid grid-cols-3 gap-4">
              {/* Adult */}
              <div className="flex flex-col">
                <label className="font-medium">Adult</label>
                <div className="flex items-center">
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_SGL", -1)}
                  >
                    −
                  </InputButton>
                  <span className="bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">
                    {currentRoom.FT_SGL}
                  </span>
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_SGL", 1)}
                  >
                    +
                  </InputButton>
                </div>
              </div>

              {/* Children With Bed */}
              <div className="flex flex-col">
                <label className="font-medium">
                  Children With Bed (&lt; 12 yrs)
                </label>
                <div className="flex items-center">
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_CWB", -1)}
                  >
                    −
                  </InputButton>
                  <span className="bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">
                    {currentRoom.FT_CWB}
                  </span>
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_CWB", 1)}
                  >
                    +
                  </InputButton>
                </div>
              </div>

              {/* Children Without Bed */}
              <div className="flex flex-col">
                <label className="font-medium">
                  Children Without Bed (&lt; 12 yrs)
                </label>
                <div className="flex items-center">
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_CNB", -1)}
                  >
                    −
                  </InputButton>
                  <span className="bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">
                    {currentRoom.FT_CNB}
                  </span>
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_CNB", 1)}
                  >
                    +
                  </InputButton>
                </div>
              </div>

              {/* Infant */}
              <div className="flex flex-col">
                <label className="font-medium">Infant (&lt; 12 yrs)</label>
                <div className="flex items-center">
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_INFT", -1)}
                  >
                    −
                  </InputButton>
                  <span className="bg-gray-100 py-1 px-3 border-y border-gray-400 flex-1 text-center">
                    {currentRoom.FT_INFT}
                  </span>
                  <InputButton
                    onClick={() => updateRoomValue(index, "FT_INFT", 1)}
                  >
                    +
                  </InputButton>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 统一“Add Room”按钮 */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddRoom}
          className="bg-primary text-white font-semibold px-4 py-2 rounded hover:opacity-90 transition"
        >
          + Add Room
        </button>
      </div>
      {/* checkbox */}
      <div>
        <div>
          <input id="checkbox-tourview-1" type="checkbox" />
          <label htmlFor="checkbox-tourview-1">
            I understand that surcharges and entry visa may be applicable for
            non-Malaysian passport holder
          </label>
        </div>
        <div>
          <input id="checkbox-tourview-2" type="checkbox" />
          <label htmlFor="checkbox-tourview-2">
            Tour member must ensure he/she is medically and physically fit for
            travel. Please disclose any physical, medical, or other special
            needs that require special attention at the time of booking.
            <button
              className="text-blue-600"
              onClick={() => alert("t&c modal")}
            >
              {" "}
              T&C Apply
            </button>
          </label>
        </div>
      </div>

      {/* payment mode select */}
      <div>
        <label htmlFor="">Please select your payment mode</label>
        <div className="flex flex-col">
          <label>
            <input type="radio" name="payment_mode" value="male" />
            Pay Full Amount
          </label>

          <label>
            <input type="radio" name="payment_mode" value="female" />
            Pay Deposit Only
          </label>
        </div>
      </div>

      {/* promo code input */}
      {/* need to do validation  */}
      <div className="flex flex-col">
        <label htmlFor="promo_code_input">Promo Code (Optional)</label>
        <input
          id="promo_code_input"
          placeholder="Enter promo code"
          type="text"
        />
      </div>

      <hr />

      {/* 下一步 */}
      <div className="flex justify-end">
        <Button onClick={handleCreateBooking}>Next</Button>
      </div>
    </div>
  );
}
