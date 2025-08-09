"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    async function fetchUsername() {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUsername(data.name || "User");
      } catch (error) {
        setUsername("User"); // fallback if not logged in
      }
    }
    fetchUsername();
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center"
      style={{
        backgroundImage: "url('/cotton.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg font-semibold">
        Welcome
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 drop-shadow-md">
        Welcome to Textile Management System
      </h1>
      <p className="text-xl text-green-700 font-semibold mb-8">
        Hello, Are your User or Admin ?  Click Below ...!
      </p>

      {/* <p className="text-lg text-gray-700 mb-10 max-w-2xl">
        Manage your yarn purchases and sales with ease. Click below to continue.
      </p> */}

      <div className="flex gap-6 flex-wrap justify-center">
        <Link href="/User-Dashboard">
          <button className="bg-blue-700 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-800 transition">
            User
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-red-700 text-white px-6 py-3 rounded-xl shadow hover:bg-red-800 transition">
            Admin
          </button>
        </Link>
      </div>
    </div>
  );
}
