// // app/logout/page.js
// "use client";

// import { useRouter } from "next/navigation";

// export default function Logout() {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       // Call the logout API
//       const res = await fetch("/api/auth/logout", {
//         method: "POST",
//       });

//       if (res.ok) {
//         // Clear client-side authentication state
//         localStorage.removeItem("authToken"); // Example: Remove a token if stored

//         // Redirect to the login page
//         router.push("/login");
//       } else {
//         console.error("Failed to logout");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Are you sure you want to logout?</h1>
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

{/*"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // Properly logs out and redirects
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Are you sure you want to logout?</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
*/}