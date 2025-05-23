// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const res = await signIn("credentials", {
//       ...credentials,
//       redirect: false,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else {
//       router.push("/cart");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" required className="w-full p-2 border rounded" onChange={handleChange} />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
//       </form>
//       <p>Don't have an account? <a href="/register" className="text-blue-500">Sign Up</a></p>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      // Fetch the session to get the user's role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role === "admin") {
        router.push("/admin"); // Redirect admin users
      } else {
        router.push("/cart"); // Redirect regular users
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-700 dark:text-white rounded-lg">
     <div className="border rounded-lg shadow-lg p-10">
     <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className='font-bold'>Email:</h2>
        <input type="email" name="email" placeholder="Enter Email" required className="w-full p-2 dark:text-black border rounded" onChange={handleChange} />
        <h2 className='font-bold'>Password:</h2>
        <input type="password" name="password" placeholder="Enter Password" required className="w-full p-2 dark:text-black border rounded" onChange={handleChange} />
        <div className="text-center pb-5">
        <button type="submit" className="bg-blue-500  text-white px-4 py-2 rounded-lg">Login</button>
        </div>
      </form>
      <p>Don't have an account? <a href="/register" className="text-blue-500 font-bold ">Sign Up</a></p>
     </div>
    </div>
  );
}
