"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  const router = useRouter();

  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const fetchRecords = async () => {
      const res = await fetch("/api/records", { cache: "no-store" });
      const data = await res.json();
      setRecords(data);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    let data = records;
    if (search) {
      data = data.filter((r) =>
        r.itemName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (type) data = data.filter((r) => r.itemType === type);
    if (startDate)
      data = data.filter((r) => new Date(r.createdAt) >= new Date(startDate));
    if (endDate)
      data = data.filter((r) => new Date(r.createdAt) <= new Date(endDate));

    setFilteredRecords(data);
    setCurrentPage(1);
  }, [search, type, startDate, endDate, records]);

  const salesTotal = filteredRecords
    .filter((r) => r.itemType === "sale")
    .reduce((sum, r) => sum + r.itemTotal, 0);

  const purchaseTotal = filteredRecords
    .filter((r) => r.itemType === "purchase")
    .reduce((sum, r) => sum + r.itemTotal, 0);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this record?")) return;
    try {
      const res = await fetch("/api/records", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        toast.success("Deleted successfully");
        setRecords((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Delete all records? This can't be undone.")) return;
    try {
      const res = await fetch("/api/records", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
      });
      if (res.ok) {
        toast.success("All records deleted");
        setRecords([]);
      }
    } catch (err) {
      toast.error("Failed to delete all");
    }
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearch("");
    setType("");
  };

  const currentRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <>
      <Header />
      <div
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center bg-gradient-to-br from-blue-100 to-white"
        style={{
          backgroundImage: "url('/cotton.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto bg-white bg-opacity-300 shadow-2xl rounded-3xl p-8 border border-blue-200 w-full">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => router.back()}
              className="text-blue-600 font-semibold hover:underline"
            >
              ← Back to Inventory
            </button>
            <h1 className="text-3xl font-bold text-blue-800 text-center flex-grow">
              📄 Inventory Records
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-2xl shadow-inner">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-lg border px-3 py-2"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-lg border px-3 py-2"
              placeholder="End Date"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border px-3 py-2"
            >
              <option value="">All Types</option>
              <option value="sale">Sale</option>
              <option value="purchase">Purchase</option>
            </select>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border px-3 py-2"
            />
            <button
              onClick={clearFilters}
              className="col-span-full bg-red-500 text-white py-2 mt-2 rounded-lg hover:bg-red-600"
            >
              Clear Filters
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleDeleteAll}
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
            >
              🗑 Delete All
            </button>
          </div>

          <div className="overflow-auto mt-4 border rounded-xl shadow-md">
            <table className="min-w-full text-sm text-left text-gray-800">
              <thead className="bg-blue-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Type</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {currentRecords.map((r, i) => (
                  <tr key={r._id} className="hover:bg-blue-50">
                    <td className="px-4 py-2">
                      {i + 1 + (currentPage - 1) * recordsPerPage}
                    </td>
                    <td>{r.createdAt?.slice(0, 10)}</td>
                    <td>{r.itemName}</td>
                    <td>{r.itemPrice}</td>
                    <td>{r.itemQuantity}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          r.itemType === "sale"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {r.itemType}
                      </span>
                    </td>
                    <td>{r.itemTotal}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {Array.from(
              { length: Math.ceil(filteredRecords.length / recordsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>

          <div className="mt-6 text-right text-blue-900 font-semibold">
            <p>
              💰 Sales Total: <span className="font-bold">{salesTotal}</span>
            </p>
            <p>
              📦 Purchases Total: <span className="font-bold">{purchaseTotal}</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
