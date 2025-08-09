"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-violet-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Yarn Manufacturing</h2>
            <p className="text-sm text-purple-200 leading-relaxed">
              A modern inventory solution for textile businesses to manage yarn production, sales, and inventory flow seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/User-Admin-Panel"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/all-products"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/user-about"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-6 text-lg">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-purple-700" />

        <div className="text-center text-sm text-purple-300 select-none">
          © {new Date().getFullYear()} Yarn Manufacturing System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
