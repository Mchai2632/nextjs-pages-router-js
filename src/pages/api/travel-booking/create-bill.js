export default async function handler(req, res) {
  const { method } = req;

  // Only allow POST requests
  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, amount } = req.body;

    const body = new URLSearchParams({
      userSecretKey: process.env.DEV_TOYYIBPAY_SECRET_KEY,
      categoryCode: process.env.DEV_TOYYIBPAY_CATEGORY_CODE,
      billName: "Car Rental WXX123",
      billDescription: "Car Rental WXX123 On Sunday",
      billPriceSetting: "0",
      billPayorInfo: "1",
      billAmount: String(amount * 100), // ToyyibPay 以 “分”为单位
      billReturnUrl: "http://localhost:3000/payment/success",
      billCallbackUrl:
        "https://5bf47e7a7cd7.ngrok-free.app/api/travel-booking/callback",
      billExternalReferenceNo: "AFR341DFI",
      billTo: name,
      billEmail: email,
      billPhone: phone,
      billSplitPayment: "0",
      billSplitPaymentArgs: "",
      billPaymentChannel: "0",
      billContentEmail: "Thank you for purchasing our product!",
      billChargeToCustomer: "1",
      billExpiryDate: "17-12-2030 17:00:00", // ✅ 可改成动态
      billExpiryDays: "3",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_TOYYIBPAY_BASE_URL}/index.php/api/createBill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    const raw = await response.text();
    console.log("Raw response:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return res
        .status(400)
        .json({ error: "Invalid response from ToyyibPay", raw });
    }

    // 成功时返回付款页面 URL
    const billCode = data[0]?.BillCode;
    const paymentUrl = `${process.env.NEXT_PUBLIC_DEV_TOYYIBPAY_BASE_URL}/${billCode}`;
    return res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("ToyyibPay Error:", error);
    return res.status(500).json({ error: "Failed to create bill" });
  }
}
