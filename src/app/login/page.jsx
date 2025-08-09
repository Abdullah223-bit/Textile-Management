"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    const res = await signIn("google", {
      callbackUrl: "/home",
    });

    if (!res?.ok) {
      setError("Google sign-in failed. Check configuration.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/cotton.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl px-8 py-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-6 drop-shadow-sm">
          Login
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition pr-12"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200 font-semibold"
          >
            Login
          </button>
        </form>

        {/* Uncomment for Google login */}
        {/* 
        <div className="my-4 text-center text-gray-700 font-semibold">OR</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-3 rounded-xl shadow-md hover:bg-red-700 transition"
        >
          Sign in with Google
        </button>
        */}

        {/* Uncomment for signup link */}
        {/* 
        <p className="text-center text-sm text-gray-700 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 underline font-medium">
            Sign Up
          </Link>
        </p>
        */}
      </motion.div>
    </div>
  );
}
