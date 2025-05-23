import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Adjust the path based on your project structure

// Database connection
const db = await mysql.createConnection({
  host: "localhost", // XAMPP default
  user: "root", // Default MySQL user
  password: "", // No password by default in XAMPP
  database: "fashion", // Change this to your actual database name
});

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fullName, email, phone, address, paymentMethod, accountNumber, products, total } = await req.json();

    if (!fullName || !email || !phone || !address || !paymentMethod) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Store order in MySQL
    const [result] = await db.execute(
      "INSERT INTO orders (user_id, full_name, email, phone, address, payment_method, account_number, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [session.user.id, fullName, email, phone, address, paymentMethod, accountNumber || "", total]
    );

    const orderId = result.insertId;

    // Store order items
    for (const product of products) {
      await db.execute(
        "INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)",
        [orderId, product.id, product.name, product.price, product.quantity]
      );
    }

    return NextResponse.json({ message: "Order placed successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
