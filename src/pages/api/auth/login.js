import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export default async function handler(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return NextResponse.json({ message: "username and password required" }, { status: 400 });
    }

    // 查询用户
    const [rows] = await pool.query("SELECT * FROM login WHERE username = ?", [username]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];

    // 比对密码
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password == user.password;

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ⚠️ 实务中这里会建立 session / JWT
    return NextResponse.json({
      message: "Login success",
      user: {
        name: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
