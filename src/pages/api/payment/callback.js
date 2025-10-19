// pages/api/payment/callback.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 🟢 Step 1. 取得 ToyyibPay POST 回傳的資料
    const {
      refno, // Payment reference no (ToyyibPay 的交易代號)
      status, // 1=success, 2=pending, 3=fail
      reason, // 狀態說明
      billcode, // ToyyibPay 的 bill code
      order_id, // 你的自訂 reference no
      amount, // 實際付款金額
      transaction_time, // 付款時間
    } = req.body;

    console.log("💳 ToyyibPay Callback received:");
    console.log(req.body);

    // 🟢 Step 2. 確認資料格式（可加強）
    if (!refno || !billcode) {
      return res.status(400).json({ message: "Invalid callback data" });
    }

    // 🟢 Step 3. 根據狀態執行你的後端邏輯
    // 這裡你可以選擇：
    // 1️⃣ 儲存到資料庫
    // 2️⃣ 通知你的後端更新訂單狀態

    // 範例：通知 backend 更新付款狀態
    // try {
    //   const backendRes = await fetch(
    //     `${process.env.BACKEND_URL}/api/v1/payment/update`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         paymentGateway: "toyyibpay",
    //         refno,
    //         status,
    //         reason,
    //         billcode,
    //         order_id,
    //         amount,
    //         transaction_time,
    //       }),
    //     }
    //   );

    //   const backendResult = await backendRes.json();
    //   console.log("Backend update result:", backendResult);
    // } catch (err) {
    //   console.error("❌ Failed to notify backend:", err);
    // }

    // 🟢 Step 4. 回覆 200 給 ToyyibPay
    // ToyyibPay 只要收到 HTTP 200 就會視為成功
    return res.status(200).json({
      message: "Callback received successfully",
      data: { refno, status, billcode, order_id },
    });
  } catch (error) {
    console.error("Callback error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
