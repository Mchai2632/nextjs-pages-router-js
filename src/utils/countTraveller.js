// === 1. 從 API 取得 pricing data ===
async function fetchPricingData() {
  const res = await fetch("/api/pricing"); // 你的 API endpoint
  if (!res.ok) throw new Error("Failed to fetch pricing data");
  const data = await res.json();
  return data; // 假設是 [{ code: 'FT_SGL', amount: 13950 }, ...]
}

// === 2. 依成人數決定房型 ===
function getRoomCode(adults) {
  const mapping = {
    1: "FT_SGL",
    2: "FT_TWN",
    3: "FT_TRIPLE",
    4: "FT_QUAD",
  };
  return mapping[adults] || null;
}

// === 3. 主要計算函數 ===
async function calculateAllRooms(rooms) {
  const pricingData = await fetchPricingData();

  // helper: 根據代碼取金額
  const getAmount = (code) =>
    pricingData.find((p) => p.code === code)?.amount || 0;

  const summary = [];
  let grandTotal = 0;

  for (const room of rooms) {
    const {
      adults,
      childrenWithBed = 0,
      childrenNoBed = 0,
      infants = 0,
    } = room;
    if (adults < 1 || adults > 4) {
      console.warn("Invalid adult count:", adults);
      continue;
    }

    const roomCode = getRoomCode(adults);
    const adultPrice = getAmount(roomCode);
    const childBedPrice = getAmount("CHILD_WITH_BED");
    const childNoBedPrice = getAmount("CHILD_NO_BED");
    const infantPrice = getAmount("INFANT");

    const total =
      adults * adultPrice +
      childrenWithBed * childBedPrice +
      childrenNoBed * childNoBedPrice +
      infants * infantPrice;

    summary.push({
      roomCode,
      adults,
      childrenWithBed,
      childrenNoBed,
      infants,
      total,
    });

    grandTotal += total;
  }

  return { summary, grandTotal };
}

// === 4. 使用範例 ===
// (async () => {
//   const bookingRooms = [
//     { adults: 2, childrenWithBed: 1, childrenNoBed: 1, infants: 1 },
//     { adults: 4, childrenWithBed: 0, childrenNoBed: 2, infants: 0 },
//   ];

//   const result = await calculateAllRooms(bookingRooms);
//   console.log(result);
// })();
