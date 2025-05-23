"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="dark:bg-gray-600 dark:text-white flex flex-col items-center justify-center min-h-screen">
     <div className="border rounded-lg shadow-lg p-10">
     <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="font-bold">Full Name:</h1>
        <input type="text" name="name" placeholder="Full Name" required className="w-full dark:text-black p-2 border rounded" onChange={handleChange} />
        <h1 className="font-bold">Email:</h1>
        <input type="email" name="email" placeholder="Email" required className="w-full p-2 dark:text-black border rounded" onChange={handleChange} />
        <h1 className="font-bold">Password :</h1>
        <input type="password" name="password" placeholder="Password" required className="w-full dark:text-black p-2 border rounded" onChange={handleChange} />
        <div className='text-center'>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Register</button>
        </div>
      </form>
      <p>Already have an account? <a href="/login" className="text-blue-500 font-bold">Login</a></p>
     </div>
    </div>
  );
}
