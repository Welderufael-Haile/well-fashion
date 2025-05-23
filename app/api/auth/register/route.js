// import bcrypt from "bcryptjs";
// //import { db } from "../../../lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();

//     // Check if user exists
//     const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//     if (existingUser.length > 0) {
//       return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     }
// const db = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "fashion",
// });
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
//       name,
//       email,
//       hashedPassword,
//     ]);

//     return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';
import { NextResponse } from "next/server";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fashion",
});

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if user exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}