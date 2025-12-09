export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    console.log("req body :", body);

    const { username, password } = body;

    if (username === "admin" && password === "1234") {
      res.status(200).json({ message: "Login Successful", ok: true });
    }

    // throw new Error("cabnnnasodkasd");

    res.status(201).json({ message: "Invalid Username or Password!", ok: false });

    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
