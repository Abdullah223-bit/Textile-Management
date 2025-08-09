"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AddProduct() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setItemImage(reader.result);
        } else {
          toast.error("Failed to load image");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setItemImage(null);
  };

  const handleSave = async () => {
    if (!itemName || !itemDescription || !purchasePrice || !salePrice) {
      toast.error("Please fill all fields");
      return;
    }

    if (isNaN(Number(purchasePrice)) || isNaN(Number(salePrice))) {
      toast.error("Please enter valid numeric prices");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName,
          itemDescription,
          purchasePrice,
          salePrice,
          itemImage,
        }),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        router.push("/add-product");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div
        className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/cotton.jpg')" }}
      >
        <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <Link href="/add-inventory" className="text-blue-600 hover:underline">← Back</Link>
            <h1 className="text-4xl font-bold text-center text-blue-900 w-full drop-shadow">Add New Product</h1>
            <div className="w-16" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-blue-900 font-semibold mb-1">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-semibold mb-1">Sale Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-semibold mb-1">Purchase Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-blue-900 font-semibold mb-1">Upload Item Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white shadow-inner"
                />
              </div>
              {itemImage && (
                <div className="mt-2 space-y-2">
                  <div className="border rounded-xl overflow-hidden shadow-md bg-white p-3">
                    <img src={itemImage} alt="Preview" className="w-full object-cover max-h-60 rounded-md" />
                  </div>
                  <button
                    onClick={removeImage}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-blue-900 font-semibold mb-1">Item Description</label>
            <textarea
              rows={5}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 shadow-inner focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg"
            >
              Save Product
            </button>
            <Link
              href="/all-products"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
