export default async function handler(req, res) {
  if (req.method !== "POST")
    res.status(405).json({ error: "Cannot call methods other than POST" });

  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    res.status(200).json(await response.json());
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
