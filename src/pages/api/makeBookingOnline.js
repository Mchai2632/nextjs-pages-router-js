import api from "@root/api";

export default async function handler(req, res) {
  // 只允許 POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 確保 req.body 是物件
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const url = api().makeBookingOnline;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tomcat/Spring 需要這行
      },
      body: JSON.stringify(data),
    });

    const text = await response.text(); // 後端不一定回 JSON，所以用 text()

    if (!response.ok) {
      return res.status(response.status).json({
        status: response.status,
        body: text,
      });
    }

    // 嘗試轉成 JSON 回前端
    try {
      return res.status(200).json(JSON.parse(text));
    } catch {
      // 回傳純文字
      return res.status(200).send(text);
    }
  } catch (err) {
    console.error("API Route Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
