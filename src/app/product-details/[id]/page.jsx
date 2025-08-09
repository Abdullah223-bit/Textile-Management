"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Fetch product function
async function fetchProduct(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Simple fullscreen modal for image preview
function ImageModal({ src, alt, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center cursor-pointer z-50"
    >
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-0.5 hover:bg-opacity-80 transition"
        aria-label="Close image preview"
      >
        &times;
      </button>
    </div>
  );
}

export default function ProductDetailPage({ params, searchParams }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProduct(params.id)
      .then(setProduct)
      .catch(() => setError("Failed to load product"));
  }, [params.id]);

  if (error)
    return (
      <>
        <Header />
        <div className="text-center text-red-600 mt-20">{error}</div>
        <Footer />
      </>
    );

  if (!product)
    return (
      <>
        <Header />
        <div className="text-center mt-20 text-gray-500">Loading...</div>
        <Footer />
      </>
    );

  const productNumber = searchParams?.number ?? "N/A";

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{
          backgroundImage: "url('/cotton.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="relative min-h-screen flex items-center justify-center px-4 py-10"
          style={{
            backgroundImage: "url('/cotton.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-5xl w-full border border-white/50 transition-all duration-300">
            <button
              onClick={() => router.push("/all-products")}
              className="inline-flex items-center mb-8 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              ← Back to Products
            </button>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: Image */}
              <div className="flex flex-col items-center">
                {product.itemImage ? (
                  <>
                    <img
                      src={product.itemImage}
                      alt={product.itemName}
                      className="rounded-2xl shadow-lg max-h-[350px] w-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => setModalOpen(true)}
                    />
                    {modalOpen && (
                      <ImageModal
                        src={product.itemImage}
                        alt={product.itemName}
                        onClose={() => setModalOpen(false)}
                      />
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-2xl italic text-gray-500">
                    No image available.
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xl text-purple-600 font-medium mb-1">
                    Product Number:{" "}
                    <span className="text-gray-900">{productNumber}</span>
                  </p>

                  <h1 className="text-4xl font-extrabold text-purple-900 mb-4">
                    {product.itemName}
                  </h1>

                  <p className="text-lg text-gray-900 mb-6 whitespace-pre-line font-serif leading-relaxed border-l-4 border-purple-400 pl-4">
                    {product.itemDescription || "No description available."}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6 bg-purple-50 rounded-lg p-6 shadow-inner">
                  <div className="text-center flex-1">
                    <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                      Purchase Price
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {product.purchasePrice !== undefined
                        ? `${product.purchasePrice.toFixed(2)}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="border-l border-purple-300 h-12 mx-6"></div>
                  <div className="text-center flex-1">
                    <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                      Sale Price
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {product.salePrice !== undefined
                        ? `${product.salePrice.toFixed(2)}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
