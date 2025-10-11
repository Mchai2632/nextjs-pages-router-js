export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const infoCategory = {
      catname: process.env.DEV_TOYYIBPAY_CATEGORY_NAME, // CATEGORY NAME
      catdescription: "All Travel Booking Payments", // DESCRIPTION
      userSecretKey: process.env.DEV_TOYYIBPAY_SECRET_KEY,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_TOYYIBPAY_BASE_URL}/index.php/api/createCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(infoCategory), // Convert data to URL-encoded string
      }
    );

    const raw = await response.text();
    try {
      const data = JSON.parse(raw);
      res.status(200).json(data);
    } catch {
      res.status(200).json({ raw }); // 或者返回原始文本
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
