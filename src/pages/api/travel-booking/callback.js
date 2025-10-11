import multiparty from "multiparty";

// 告诉 Next.js 不要自动处理 body（因为我们要自己解析 multipart/form-data）
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 使用 multiparty 解析 multipart/form-data
    const form = new multiparty.Form();

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields) => {
        if (err) reject(err);
        else {
          // fields 的值是数组形式，例如 { refno: ['123'], status: ['1'] }
          const parsed = Object.fromEntries(
            Object.entries(fields).map(([key, value]) => [key, value[0]])
          );
          resolve(parsed);
        }
      });
    });

    console.log("ToyyibPay callback received:", data);

    const {
      refno,
      status,
      reason,
      billcode,
      order_id,
      amount,
      transaction_time,
    } = data;

    if (!refno || !status || !billcode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    

    

    // TODO: 在这里更新数据库订单状态
    // await updateOrderStatus(order_id || billcode, status, amount, transaction_time);

    return res
      .status(200)
      .json({ success: true, message: "Callback received" });
  } catch (err) {
    console.error("Callback error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
