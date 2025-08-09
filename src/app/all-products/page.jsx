"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    startCountdown();
  }

  function startCountdown() {
    let count = 5;
    const interval = setInterval(() => {
      setCountdown(count);
      count -= 1;
      if (count < 0) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 1000);
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showMessage("Product deleted successfully");
    } else {
      alert("Failed to delete product");
    }
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  function handleUpdate(id) {
    router.push(`/updateproduct-detail/${id}`);
  }

  return (
    <>
      <Header />
      <div
        className="relative min-h-screen flex items-center justify-center px-4 py-10"
        style={{
          backgroundImage: "url('/cotton.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl p-10 border border-white/50">
          {/* Toast Message */}
          {message && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold">
              {message}
            </div>
          )}

          {/* Loading Message */}
          {loading ? (
            <div className="text-center text-blue-900 font-semibold text-lg">
              <div className="animate-pulse mb-2">
                ⌛ Loading products... (5 seconds)
              </div>
            </div>
          ) : (
            <>
              {/* Add Product Button */}
              <button
                onClick={() => router.push("/add-product")}
                className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
              >
                ➕ Add Product
              </button>

              <h1 className="text-4xl font-bold text-center text-blue-900 mb-8 drop-shadow">
                All Products
              </h1>

              <ul className="space-y-4">
                {products.map((product, index) => (
                  <li
                    key={product._id}
                    className="flex justify-between items-center bg-white/70 backdrop-blur-sm border border-blue-100 p-5 rounded-xl shadow-md"
                  >
                    <div>
                      <span className="text-blue-700 font-semibold text-lg">
                        #{index + 1}
                      </span>{" "}
                      <span className="text-gray-800 font-medium">
                        {product.itemName}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/product-details/${product._id}?number=${index + 1}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
