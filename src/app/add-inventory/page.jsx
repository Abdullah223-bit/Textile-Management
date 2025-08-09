"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function InventoryPage() {
  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: 0,
    itemQuantity: 0,
    itemTotal: 0,
    itemType: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedValue =
      name === "itemPrice" || name === "itemQuantity" ? Number(value) : value;

    setFormData((prevData) => {
      let updatedData = { ...prevData, [name]: updatedValue };

      if (
        (name === "itemName" || name === "itemType") &&
        updatedData.itemName &&
        updatedData.itemType
      ) {
        const selectedItem = items.find(
          (item) => item.itemName === updatedData.itemName
        );
        if (selectedItem) {
          updatedData.itemPrice =
            updatedData.itemType === "sale"
              ? Number(selectedItem.salePrice)
              : Number(selectedItem.purchasePrice);
        }
      }

      updatedData.itemTotal = updatedData.itemPrice * updatedData.itemQuantity;
      return updatedData;
    });
  };

  const handleSave = async () => {
    const { itemName, itemType, itemPrice, itemQuantity, itemTotal } = formData;

    if (!itemName || !itemType || itemPrice <= 0 || itemQuantity <= 0 || itemTotal <= 0) {
      toast.error("Please fill all the fields correctly.");
      return;
    }

    try {
      const response = await fetch("/api/records", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          itemName: "",
          itemPrice: 0,
          itemQuantity: 0,
          itemTotal: 0,
          itemType: "",
        });
        toast.success("Record created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error", error);
    }
  };

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
        <div className="relative z-10 bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl p-10 border border-white/50">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-blue-600 hover:underline font-semibold">
              Back
            </Link>
            <h1 className="text-5xl font-extrabold text-blue-900 text-center w-full drop-shadow-md">
              Add Yarn Inventory
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Item Selector */}
            <div className="p-6 bg-white/80 rounded-xl shadow-md hover:shadow-xl transition">
              <label className="block mb-2 text-lg font-semibold text-blue-800">Item Name</label>
              <select
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg text-blue-800 font-medium bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Item</option>
                {items.map((item) => (
                  <option key={item._id} value={item.itemName}>
                    {item.itemName}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Selector */}
            <div className="p-6 bg-white/80 rounded-xl shadow-md hover:shadow-xl transition">
              <label className="block mb-2 text-lg font-semibold text-blue-800">Item Type</label>
              <select
                name="itemType"
                value={formData.itemType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg text-blue-800 font-medium bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="purchase">Purchase</option>
                <option value="sale">Sale</option>
              </select>
            </div>

            {/* Price Field */}
            <div className="p-6 bg-white/80 rounded-xl shadow-md">
              <label className="block mb-2 text-lg font-semibold text-blue-800">Price</label>
              <input
                type="number"
                name="itemPrice"
                value={formData.itemPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Quantity Field */}
            <div className="p-6 bg-white/80 rounded-xl shadow-md">
              <label className="block mb-2 text-lg font-semibold text-blue-800">Quantity</label>
              <input
                type="number"
                name="itemQuantity"
                value={formData.itemQuantity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Total Field */}
            <div className="col-span-1 md:col-span-2 p-6 bg-white/80 rounded-xl shadow-md">
              <label className="block mb-2 text-lg font-semibold text-blue-800">Total</label>
              <input
                type="number"
                name="itemTotal"
                value={formData.itemTotal}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-between items-center mt-12 gap-6">
            <Link
              href="/listing"
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
            >
              📋 View Records
            </Link>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              💾 Save Record
            </button>
            <Link
              href="/add-product"
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
            >
              ➕ Add Product
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
