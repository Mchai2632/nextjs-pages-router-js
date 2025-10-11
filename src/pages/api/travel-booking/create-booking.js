export default async function handler(req, res) {
  const { method } = req;

  // Only allow POST requests
  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
