"use client";

import React, { useState } from "react";
import Link from "next/link";
// import { Menu, X } from "lucide-react"; // Commented out since not in use

const Header = () => {
  // const [menuOpen, setMenuOpen] = useState(false); // Unused due to disabled mobile menu
  // const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-3">
          <img
            src="/yarn-logo.jpg"
            alt="Yarn Logo"
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          />
          <span className="text-2xl font-extrabold text-white drop-shadow-md select-none">
            Textile Management
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-semibold text-white text-lg">
          <Link href="/" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            Home
          </Link>
          <Link href="#" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            Add Product
          </Link>
          <Link href="/all-products" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            Product Details
          </Link>
          <Link href="/user-about" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            About
          </Link>
          <Link href="#" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            All Records
          </Link>
        </nav>

        {/* Mobile Hamburger - Disabled */}
        {/* 
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="text-white hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded md:hidden"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button> 
        */}
      </div>

      {/* Mobile Dropdown Menu - Disabled */}
      {/*
      <div
        className={`transition-max-height overflow-hidden bg-gradient-to-b from-indigo-700 via-purple-700 to-blue-700 text-white border-t border-purple-500 ${
          menuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col space-y-3 px-6">
          {[...].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold hover:text-yellow-300 transition duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div> 
      */}
    </header>
  );
};

export default Header;
