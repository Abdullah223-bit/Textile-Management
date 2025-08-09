"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const sess = await getSession();
      if (!sess) {
        router.push("/login");
      } else {
        setSession(sess);
      }
    }

    checkSession();
  }, [router]);

  if (!session) return null;

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
      {/* Top right: Welcome and Logout */}
      <div className="absolute top-5 right-5 flex items-center gap-4">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg font-semibold">
          Welcome to Admin Panel!
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 drop-shadow-md">
        Welcome to Textile Management System
      </h1>

      <p className="text-xl text-green-700 font-semibold mb-8">
        Hello, Admin 👋 Glad to see you.
        {/* You can also display name: {session.user?.name} */}
      </p>

      <p className="text-lg text-gray-700 mb-10 max-w-2xl">
        Manage your yarn purchases and sales with ease. Click below to get started.
      </p>

      <div className="flex gap-6 flex-wrap justify-center">
        <Link href="/add-Inventory">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
            Go to Inventory
          </button>
        </Link>
        <Link href="/add-product">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow hover:bg-purple-700 transition">
            Add New Product
          </button>
        </Link>
      </div>
    </div>
  );
}
