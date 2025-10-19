import api from "@root/api";

export default async function handler(req, res) {
  try {
    const params = new URLSearchParams(req.query); // 自动处理所有 query 参数
    const response = await fetch(
      `${api().tourpkgdetail}?${params.toString()}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
