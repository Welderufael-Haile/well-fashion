
import { NextResponse } from "next/server";

export function middleware(req) {
  const authToken = req.cookies.get("authToken")?.value; // Check for the authentication token

  const { pathname } = req.nextUrl; // Get the current path

  // If the user is trying to access the "/catagoryll" route
  if (pathname === "/") {
    if (authToken) {
      // If authenticated, redirect to the cart page
      return NextResponse.redirect(new URL("/cart", req.url));
    } else {
      // If not authenticated, redirect to the home page
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
 // matcher: ["/caret"], // Add your protected routes here
};