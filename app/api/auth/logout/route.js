// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

    // Clear the authentication cookie
    response.cookies.delete("authToken");

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}