import { decryptWithAES } from "@/utils/decryptToyyib";
import api from "@root/api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 🟢 Step 1: get payment data from frontend
    const paymentData = req.body[0];
    const dateCode = getCurrentDateTimeCode();

    // 🟢 Step 2: get backend config for ToyyibPay
    const backendUrl = `${api().toyyibpayConfigList}?date=${dateCode}`;
    const backendRes = await fetch(backendUrl);
    const backendConfig = await backendRes.json();

    if (!backendConfig || !backendConfig.toyyibpayConfigList) {
      return res.status(500).json({ message: "Invalid config from backend" });
    }
    // 🟢 Step 3: decrypt ToyyibPay Key（merchantKey : backend encrypted merchant key）
    const decrypted = decryptWithAES(backendConfig.toyyibpayConfigList[0].merchantKey, backendConfig.date);

    const userSecretKey = decrypted.userSecretKey;

    const cfg = backendConfig.toyyibpayConfigList[0];

    console.log("cgf:", cfg);

    console.log("paymentData : ", paymentData);

    // 🟢 Step 4: 建立 ToyyibPay payload #
    const payload = {
      userSecretKey: userSecretKey, // 解密後的 key
      categoryCode: cfg.merchantCode, // 後端的 category code
      // categoryCode: "1ss1b1wz", // 後端的 category code
      billName: "RA Booking Payment",
      billDescription: paymentData.billDescription || "Travel Package Payment",
      billPriceSetting: 1, // 固定金額
      billPayorInfo: 1, // 需要付款人資料
      billAmount: paymentData.billAmount * 100, // 轉換成 ToyyibPay 接受的金額格式
      billReturnUrl: paymentData.billReturnUrl, // frontend url for callback
      billCallbackUrl: `https://0cc2c76a7486.ngrok-free.app/api/payment/callback`, // backend url for callback
      // billCallbackUrl: `${api().toyyibpayCallbackUrl}`, // backend url for callback
      billExternalReferenceNo: paymentData.billExternalReferenceNo,
      billTo: paymentData.billTo,
      billEmail: paymentData.billEmail,
      billPhone: paymentData.billPhone,
      enableFPXB2B: 1,
      chargeFPXB2B: 1,
      billExpiryDays: 3,
    };

    console.log("payload:", payload);

    // send to backend for record
    await sendToBackend(payload);

    // // 🟢 Step 6: 把 ToyyibPay 回傳結果傳回前端
    // return res.status(200).json({
    //   data: response,
    // });
    const formBody = new URLSearchParams(payload).toString();
    // 🟢 Step 5: 呼叫 ToyyibPay createBill API
    const toyRes = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/index.php/api/createBill`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    });

    // console.log("toyRes:", toyRes);

    let toyResult;
    const contentType = toyRes.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      toyResult = await toyRes.json();
      console.log("json:", toyResult);
    } else {
      toyResult = await toyRes.text(); // 對非 JSON 內容用 text()
      console.log("text:", toyResult);
    }

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
 * generate current date time code (YYYYMMDDHHmm)
 * Example: 202510151348 → for backend validation / encryption key
 */
export function getCurrentDateTimeCode() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}${hour}${minute}`;
}

async function sendToBackend(payload) {
  // send to backend to save history

  let url = api().requestToyyibpayJSON;
  // console.log("url:", url);
  // console.log("payload:", JSON.stringify(payload));
  // console.log("authS:", process.env.AUTH_SECRET_KEY);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Secret-Key": process.env.AUTH_SECRET_KEY,
    },
    body: JSON.stringify(payload),
  });

  // console.log(response);

  if (!response.ok) {
    console.error("requestToyyibpayJSON failed:", response);
    return;
  }

  const resJson = await response.json();
  // console.log("resJson:", resJson);

  return response;
}
