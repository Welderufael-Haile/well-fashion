import { queryDatabase } from "../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await queryDatabase(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return Response.json({ message: "User registered successfully" });
  } catch (error) {
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}

