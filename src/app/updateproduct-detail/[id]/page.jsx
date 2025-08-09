"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

// Header and Footer imports
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UpdateProductDetail() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [itemImage, setItemImage] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        setItemName(data.itemName);
        setItemDescription(data.itemDescription || "");
        setPurchasePrice(data.purchasePrice.toString());
        setSalePrice(data.salePrice.toString());
        setItemImage(data.itemImage || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product data");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setItemImage(reader.result);
      } else {
        toast.error("Failed to load image");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    if (!itemName.trim() || !itemDescription.trim() || !purchasePrice.trim() || !salePrice.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    if (isNaN(Number(purchasePrice)) || isNaN(Number(salePrice))) {
      toast.error("Please enter valid numeric prices");
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName: itemName.trim(),
          itemDescription: itemDescription.trim(),
          purchasePrice: Number(purchasePrice.trim()),
          salePrice: Number(salePrice.trim()),
          itemImage,
        }),
      });

      if (res.ok) {
        toast.success("Product updated successfully");
        router.push("/all-products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen flex flex-col items-center justify-start px-4 py-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/cotton.jpg')" }}
      >
        <div className="relative z-10 w-full max-w-5xl p-10 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-sm flex flex-col gap-10">
          {/* Fields and Image Upload */}
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="text-blue-800 font-semibold">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="border border-blue-300 rounded-xl p-2 w-full bg-white"
                />
              </div>

              <div>
                <label className="text-blue-800 font-semibold">Sale Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="border border-blue-300 rounded-xl p-2 w-full bg-white"
                />
              </div>

              <div>
                <label className="text-blue-800 font-semibold">Purchase Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="border border-blue-300 rounded-xl p-2 w-full bg-white"
                />
              </div>

              <div>
                <label className="text-blue-800 font-semibold">Item Description</label>
                <textarea
                  rows={6}
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  className="border border-blue-300 rounded-xl p-2 w-full resize-none bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-96">
              <label className="text-blue-800 font-semibold">Import Item Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border border-blue-300 rounded-xl p-2 bg-white"
              />

              {itemImage ? (
                <div className="relative mt-2 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={itemImage}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setItemImage(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-sm rounded shadow hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex-1 mt-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-sm h-40">
                  No image selected
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center mt-12">
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-10 py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition"
            >
              Update Product Record
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
