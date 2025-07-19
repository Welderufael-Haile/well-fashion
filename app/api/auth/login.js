import { queryDatabase } from "../../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const users = await queryDatabase("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, "secretkey", { expiresIn: "1h" });

    return Response.json({ token });
  } catch (error) {
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
