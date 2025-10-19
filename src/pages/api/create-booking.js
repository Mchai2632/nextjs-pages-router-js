import api from "@root/api";

export default async function handler(req, res) {
  const { method } = req;

  // Only allow POST requests
  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    const response = await fetch(`${api().tourpkglist}?TYPE=TOUR`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Do something with the data

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
