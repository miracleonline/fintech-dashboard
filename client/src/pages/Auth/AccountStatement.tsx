// src/pages/Auth/AccountStatement.tsx
import { useState } from "react";

export default function AccountStatement() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/transactions/download?start=${startDate}&end=${endDate}&pages=${pages}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to download the statement");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `account_statement_${startDate}_${endDate}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading statement", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Account Statement</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">Home</a>
            </li>
            <li>/</li>
            <li>Financial Overview</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Account Statement</li>
          </ol>
        </nav>
      </div>

      {/* Card Container */}
      <div className="card bg-white text-gray-800 dark:text-gray-200 dark:bg-gray-900 shadow rounded-xl">
        <div className="card-body p-6">
          <h2 className="text-lg font-semibold mb-4">Generate PDF Statement</h2>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-2xl">
            Download your account statement as a PDF file. The statement includes your transaction history,
            including credits, debits, status, and descriptions. You can filter by date range and select how many pages you want to include.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
            />
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              min="1"
              className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
              placeholder="Pages"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Download Statement"}
          </button>
        </div>
      </div>
    </div>
  );
}
