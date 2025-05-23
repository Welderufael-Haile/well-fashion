// // Example: In your navigation component
// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-white text-lg font-bold">
//           My App
//         </Link>
//         <div className="space-x-4">
//           <Link href="/profile" className="text-white">
//             Profile
//           </Link>
//           <Link href="/logout" className="text-white bg-red-500 px-3 py-1 rounded">
//             Logout
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-50 mb-4  w-full p-4  rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-black  text-lg font-bold">
          My Cart
        </Link>
        <div className="relative">
          {session ? (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white bg-gray-700 px-4 py-2 rounded-lg"
            >
              Profile
            </button>
          ) : (
            <Link href="/login" className="text-white bg-blue-500 px-3 py-1 rounded">
              Login
            </Link>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && session && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 dark:text-white rounded-lg shadow-lg py-2">
              <p className="px-4 py-2  font-semibold">
                {session.user?.password}
              </p>
              <p className="px-4 py-2 text-sm">
                {session.user?.email}
              </p>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
