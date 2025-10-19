import {
  decryptToyyibData,
  decryptWithAES,
  getDecryptionKey,
} from "@/utils/decryptToyyib";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 🟢 Step 1: 拿前端传来的付款资料
    const paymentData = req.body;
    console.log("paymentData: ", paymentData);
    const dateCode = getCurrentDateTimeCode();

    // 🟢 Step 2: 向 backend 拿 ToyyibPay 的加密 config
    // const backendUrl = `${process.env.BACKEND_URL}/api/v1/toyyibpayConfigList?date=${dateCode}`;
    const backendUrl = `https://trevabook.ddns.net/trevabook-admin/api/v1/toyyibpayConfigList?date=${dateCode}`;
    const backendRes = await fetch(backendUrl);
    const backendConfig = await backendRes.json();

    if (!backendConfig || !backendConfig.toyyibpayConfigList) {
      return res.status(500).json({ message: "Invalid config from backend" });
    }

    console.log("backendConfig :", backendConfig);

    // get key to decrypt merchantKey
    const key = getDecryptionKey(backendConfig.date);
    const decrypted = decryptWithAES(
      key,
      backendConfig.toyyibpayConfigList[0].merchantKey
    );

    const cfg = backendConfig.toyyibpayConfigList[0];

    console.log("decrypted :", decrypted.userSecretKey);

    // 🟢 Step 4: 建立 ToyyibPay payload
    const payload = {
      userSecretKey: decrypted.userSecretKey, // 解密後的 key
      categoryCode: cfg.catName, // 後端的 category code

      billName: "Tour Booking Payment",
      billDescription: paymentData.billDescription || "Travel Package Payment",
      billPriceSetting: 1, // 固定金額
      billPayorInfo: 1, // 需要付款人資料
      billAmount: paymentData.billAmount, // 單位是分
      billReturnUrl: paymentData.billReturnUrl,
      billCallbackUrl: `${process.env.BACKEND_URL}/api/payment/callback`,
      billExternalReferenceNo: paymentData.billExternalReferenceNo ?? "",

      billTo: paymentData.billTo,
      billEmail: paymentData.billEmail,
      billPhone: paymentData.billPhone,

      enableFPXB2B: 1,
      chargeFPXB2B: 1,
      billExpiryDays: 3,
    };

    // 🟢 Step 5: 呼叫 ToyyibPay createBill API
    const toyRes = await fetch(
      "https://dev.toyyibpay.com/index.php/api/createBill",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const toyResult = await toyRes.json();

    console.log("toyResult :", toyResult);

    // 🟢 Step 6: 把 ToyyibPay 回傳結果傳回前端
    return res.status(200).json({
      status: 1,
      data: toyResult,
      timestamp: dateCode,
    });
  } catch (error) {
    console.error("❌ ToyyibPay createBill error:", error);
    return res.status(500).json({ message: "Payment creation failed" });
  }
}

/**
 * 產生格式化時間代碼 (YYYYMMDDHHmm)
 * Example: 202510151348 → 用於 backend 驗證 / 加密 key
 */
function getCurrentDateTimeCode() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}${hour}${minute}`;
}
