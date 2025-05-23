// hooks/useAuth.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Example: Check for a token in localStorage

    if (!authToken) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);
}