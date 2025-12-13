export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    console.log("req body :", body);

    //  backend auth
    try {
      const response = Mockbackend(body);

      if (response.ok && response.status === 200) {
        res.setHeader("Set-Cookie", "sessionId=abc123; HttpOnly; Path=/; Max-Age=86400;"); // 60 * 60 * 24 = 24 hours
        return res.status(200).json({ message: response.message, ok: true });
      } else {
        return res.status(response.status).json({ message: response.message, ok: false });
      }
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ error: "Failed to load data." });
    }

    // Process a POST request
  } else {
    res.json({ message: "Method not Allow" });
    // Handle any other HTTP method
  }
}

function Mockbackend(body) {
  // step 1
  const res1 = checkUserAvail(body);
  if (!res1.ok) {
    return res1;
  }

  // step 2
  const res2 = checkPasswordIsCorrect(body);
  if (!res2.ok) {
    return res2;
  }

  // step 3

  return res2;
}

function checkUserAvail({ username }) {
  if (username === "admin") return { message: "Username founded", ok: true, status: 200 };
  return { message: "Invalid Username", ok: false, status: 401 };
}

function checkPasswordIsCorrect({ password }) {
  // hash or compare ? bcrypt?
  if (password === "1234") return { message: "Login Successful", ok: true, status: 200 };
  return { message: "Password Invalid", ok: false, status: 401 };
}
