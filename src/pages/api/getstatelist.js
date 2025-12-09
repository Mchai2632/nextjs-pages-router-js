import api from "@root/api";

export default async function handler(req, res) {
  try {
    const response = await fetch(`${api().getStateList}`, {
      method: "GET",
      headers: {
        "Secret-Key": process.env.AUTH_SECRET_KEY,
      },
    });

    const result = await response.json();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
