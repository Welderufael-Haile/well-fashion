import { NextResponse } from "next/server";
// import multer from "multer";
import path from "path";
import mysql from "mysql2/promise";
import { writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Required for multer
  },
};

// Database connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce_db",
});

// Storage configuration
const uploadDir = path.join(process.cwd(), "public/uploads");

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("nmae");
    const price = formData.get("price");
    // Handling file uploads
    const files = [ "photo"];
    let filePaths = {};

    for (const fileField of files) {
      const file = formData.get(fileField);
      if (file) {
        const buffer = await file.arrayBuffer();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, Buffer.from(buffer));
        filePaths[fileField] = `/uploads/${fileName}`;
      } else {
        filePaths[fileField] = null;
      }
    }

    // Insert into MySQL database
    const query = `
      INSERT INTO products (name,price,photo) 
      VALUES (?, ?, ?,)
    `;
    const values = [
      name,
      price,
      filePaths.photo,
    ];

    await db.execute(query, values);

    return NextResponse.json({ message: "Form submitted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
