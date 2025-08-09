"use client";
import React from "react";
import Header from "@/components/user-header";
import Footer from "@/components/user-footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div
        className="min-h-screen px-6 py-12 flex flex-col items-center justify-center text-gray-900 bg-cover bg-center"
        style={{ backgroundImage: "url('/cotton.jpg')" }}
      >
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-4xl w-full text-center border border-white/50">
          <h1 className="text-4xl font-bold text-purple-800 mb-4 drop-shadow">
            About Yarn Inventory System
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The{" "}
            <span className="font-semibold text-purple-700">
              Yarn Manufacturing Inventory System
            </span>{" "}
            is designed specifically for the textile industry to manage yarn
            stock efficiently, maintain product records, and ensure smooth
            operational flow in yarn production and inventory control.
          </p>

          <div className="text-left space-y-6 text-gray-800 font-medium">
            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-1">
                🔍 Key Features:
              </h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Add and update yarn inventory with ease</li>
                <li>Track purchase and sale prices of yarn products</li>
                <li>View detailed product information</li>
                <li>Manage and delete product records</li>
                <li>Simple and modern user interface</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-1">🏭 Built For:</h2>
              <p>
                Small to medium-sized textile manufacturing companies looking to
                digitize their inventory process and reduce manual record
                keeping.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-1">🧠 Technologies Used:</h2>
              <p>
                This system is developed using{" "}
                <span className="font-semibold">React, Next.js, Tailwind CSS,</span>{" "}
                and <span className="font-semibold">MongoDB</span> for efficient
                and scalable performance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-1">👨‍💻 Developer:</h2>
              <p>
                This project is developed with passion and precision to support
                the evolving needs of textile inventory management.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
